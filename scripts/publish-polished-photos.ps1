$ErrorActionPreference = 'Stop'
$project = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$work = Join-Path $project 'research/photo-polish-2026-11-11'
$records = Get-Content -LiteralPath (Join-Path $work 'exports.json') -Raw | ConvertFrom-Json
$embed = Join-Path $project '.tools/impeccable/.agents/skills/impeccable/scripts/impeccable.cmd'
$env:IMPECCABLE_HOME = Join-Path $project '.tools/impeccable-cache'
$count = 0
foreach ($record in $records) {
  foreach ($relative in @($record.regular, $record.full)) {
    $staged = Join-Path (Join-Path $work 'stage') $relative
    $target = Join-Path (Join-Path $project 'public') $relative
    $backup = Join-Path (Join-Path $work 'before') $relative
    if ((Test-Path -LiteralPath $target) -and -not (Test-Path -LiteralPath $backup)) {
      New-Item -ItemType Directory -Path (Split-Path $backup) -Force | Out-Null
      Copy-Item -LiteralPath $target -Destination $backup
    }
    New-Item -ItemType Directory -Path (Split-Path $target) -Force | Out-Null
    Copy-Item -LiteralPath $staged -Destination $target -Force
    $metadata = Get-Content -LiteralPath ($staged + '.json') -Raw | ConvertFrom-Json
    & $embed embed-prompt $target --prompt $metadata.prompt | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "Provenance embedding failed: $relative" }
    $count++
  }
}
& $embed embed-prompt --scan (Join-Path $project 'public/images/enhanced') (Join-Path $project 'public/images/gallery') (Join-Path $project 'public/images/polished') (Join-Path $project 'public/images/polished-4k') | Set-Content -LiteralPath (Join-Path $work 'raster-provenance.txt') -Encoding utf8
if ($LASTEXITCODE -ne 0) { throw 'Raster provenance scan failed' }
Write-Output "Published $count non-generatively enhanced exports."
