import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, existsSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';

function git(args, { cwd = process.cwd(), env = process.env, input, allowFailure = false } = {}) {
  const result = spawnSync('git', args, { cwd, env, input, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0 && !allowFailure) throw new Error(result.stderr.trim() || `git ${args[0]} failed`);
  return { status: result.status, text: result.stdout.trim() };
}

const root = git(['rev-parse', '--show-toplevel']).text;
const sourceCommit = git(['rev-parse', 'HEAD']).text;
if (git(['status', '--porcelain', '--untracked-files=no']).text) {
  throw new Error('Commit the source changes before publishing the Hostinger build.');
}
if (!process.env.npm_execpath) throw new Error('Run this script with npm run publish:hostinger.');
const build = spawnSync(process.execPath, [process.env.npm_execpath, 'run', 'build'], { cwd: root, stdio: 'inherit' });
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status || 1);

const dist = resolve(root, 'dist');
for (const file of ['index.html', 'programs.html', 'gallery.html']) {
  if (!existsSync(join(dist, file)) || /(?:src=|href=)["'][^"']*\/src\//.test(readFileSync(join(dist, file), 'utf8'))) {
    throw new Error(`Missing or uncompiled page: ${file}`);
  }
}
writeFileSync(join(dist, '.htaccess'), 'DirectoryIndex index.html\n');
writeFileSync(join(dist, '_deployment.json'), `${JSON.stringify({ sourceCommit }, null, 2)}\n`);

// Each origin push destination must receive a fast-forward. Include divergent
// deployment tips as merge parents instead of force-pushing either repository.
const destinations = git(['remote', 'get-url', '--push', '--all', 'origin']).text.split(/\r?\n/).filter(Boolean);
const localTip = git(['rev-parse', '--verify', 'refs/heads/hostinger'], { allowFailure: true });
const tips = localTip.status === 0 ? [localTip.text] : [];
for (const destination of destinations) {
  const remote = git(['ls-remote', '--heads', destination, 'refs/heads/hostinger']).text;
  if (!remote) continue;
  const sha = remote.split(/\s+/)[0];
  git(['fetch', '--no-tags', destination, 'refs/heads/hostinger']);
  tips.push(sha);
}
const uniqueTips = [...new Set(tips)];
const parents = uniqueTips.filter(tip => !uniqueTips.some(other => other !== tip
  && git(['merge-base', '--is-ancestor', tip, other], { allowFailure: true }).status === 0));

// Use a separate index rooted at dist: the checked-out source branch and its
// index stay untouched. Text normalization makes Windows/Linux exports agree.
const temporary = mkdtempSync(join(tmpdir(), 'atb-hostinger-'));
const index = join(temporary, 'index');
const snapshotEnv = {
  ...process.env,
  GIT_DIR: git(['rev-parse', '--absolute-git-dir']).text,
  GIT_WORK_TREE: dist,
  GIT_INDEX_FILE: index,
};
try {
  git(['read-tree', '--empty'], { cwd: dist, env: snapshotEnv });
  git(['-c', 'core.autocrlf=input', 'add', '--all', '--force', '--', '.'], { cwd: dist, env: snapshotEnv });
  const tree = git(['write-tree'], { cwd: dist, env: snapshotEnv }).text;
  const unchanged = parents.length === 1 && git(['rev-parse', `${parents[0]}^{tree}`]).text === tree;
  let deploymentCommit = parents[0];
  if (!unchanged) {
    const sourceDate = git(['show', '-s', '--format=%cI', sourceCommit]).text;
    const authorEnv = { ...process.env, GIT_AUTHOR_DATE: sourceDate, GIT_COMMITTER_DATE: sourceDate };
    deploymentCommit = git(['commit-tree', tree, ...parents.flatMap(parent => ['-p', parent])], {
      env: authorEnv,
      input: `Build Hostinger website from ${sourceCommit}\n`,
    }).text;
  }
  git(['update-ref', 'refs/heads/hostinger', deploymentCommit,
    localTip.status === 0 ? localTip.text : '0'.repeat(40)]);
  const pushed = spawnSync('git', ['push', 'origin', 'hostinger'], { cwd: root, stdio: 'inherit' });
  if (pushed.error) throw pushed.error;
  if (pushed.status !== 0) process.exitCode = pushed.status || 1;
  else console.log(`Hostinger branch published: ${deploymentCommit}\nSource: ${sourceCommit}`);
} finally {
  for (const file of [index, `${index}.lock`]) if (existsSync(file)) unlinkSync(file);
  rmdirSync(temporary);
}
