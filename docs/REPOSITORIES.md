# Company repository and agency copy

- Primary company repository: https://github.com/atbtennisacademy/ATB
- Agency copy: https://github.com/QuantumWeaveDev26/Client-ATB
- Production branch: `main`

Both repositories contain the complete source, runtime assets and existing commit
history. Author names and emails remain unchanged. Connect Hostinger to the
company repository when setting up deployment.

## This workspace

The local `origin` remote fetches from the company repository. It has two push
destinations: the company repository and the agency copy. A second remote,
`agency`, points directly to the agency repository.

After committing updates on `main`, this command pushes the same commit to both:

```sh
git push origin main
```

A normal `git push` also uses both configured destinations when `main` tracks
`origin/main`. Read the output for both destinations: pushes to two repositories
are separate operations, so one can succeed while the other fails. If that
happens, resolve the reported access/network/history issue and push again.
Do not use a force push to resolve diverging copies.

Before starting new work, fetch the company repository and incorporate any
changes made by teammates. Changes committed directly through GitHub or another
computer do **not** automatically copy themselves to the other repository.
This setup synchronizes pushes made from this configured workspace; it is not a
scheduled GitHub-to-GitHub mirror.

## Set up another clone

Remote configuration stays on each computer and is not part of Git history.
For a fresh clone, run:

```sh
git clone https://github.com/atbtennisacademy/ATB.git
cd ATB
git remote add agency https://github.com/QuantumWeaveDev26/Client-ATB.git
git remote set-url --add --push origin https://github.com/atbtennisacademy/ATB.git
git remote set-url --add --push origin https://github.com/QuantumWeaveDev26/Client-ATB.git
```

Use a GitHub account with write access to both repositories. Keep credentials out
of remote URLs and source files. Commit identity is configured independently from
repository ownership; this project's authorized author email remains
`naveenreddy95190@gmail.com`.
