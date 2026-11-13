# Hostinger deployment

This repository is a React/Vite static website with three HTML entry points:
`index.html`, `programs.html` and `gallery.html`. It needs no database, API
credentials or persistent Node.js server. Node.js is used to build it.

## Current plan: PHP/HTML Git deployment

On the **Deploy from GitHub** screen showing Branch and a **public_html**
destination (without build settings), use:

| Setting | Value |
| --- | --- |
| Repository | atbtennisacademy/ATB |
| Branch | **hostinger** |
| Root directory on hosting | **public_html** |

Then click **Deploy**. This branch already contains the compiled HTML, JavaScript,
CSS and media. No build command is entered in this Hostinger screen. The branch's
`.htaccess` makes index.html the directory entry point; the three pages remain
directly accessible. The company domain selected in the screenshot is
**atbtennisacademy.com**.

Keep source edits on main. The **Build Hostinger static website** workflow builds
and updates hostinger after each main push, using GitHub's built-in repository
token. With Hostinger auto-deployment enabled for hostinger, that branch update
publishes the new build. If a workflow fails, its previous deployment branch
remains available; check the Actions tab before expecting a new version online.

Manual rebuild/publish is also available from a clean, committed source checkout:

```sh
npm ci
npm run publish:hostinger
```

The script leaves main and its index untouched, checks the compiled pages,
and pushes a fast-forward deployment commit. It can join diverging deployment
histories without overwriting them. `_deployment.json` identifies the source commit.

The alternatives below remain available; no hosting-plan upgrade is required
to serve this compiled static site.

## Option A: Connect GitHub in Hostinger

Use this option when your hosting plan offers **Node.js web apps / Deploy from GitHub**.

1. In hPanel, open **Websites → Create site → Web App**. Some dashboard versions
   show **Add website → Node.js** or **Import website → Deploy from GitHub** instead.
2. Choose **Import your Git repository** and connect GitHub using your own
   account. Allow Hostinger access to `atbtennisacademy/ATB`. If it is
   not listed, the repository owner may need to grant the Hostinger GitHub app
   access; collaborator push access alone may not let you install that app.
   The **Public repository URL** option may also be offered for this public repo.
3. Choose the repository and its `main` branch.
4. Review the detected settings:

   | Setting | Value |
   | --- | --- |
   | Framework | Vite / React static front end |
   | Project root | Repository root (`.`) |
   | Node.js | 22.12 or newer supported version |
   | Package manager | npm |
   | Install command, if requested | `npm ci` |
   | Build command | `npm run build` |
   | Output directory | `dist` |
   | Environment variables | None required |
   | Server start command | Not required for this static front end |

5. Deploy, then check the preview and all three pages. Enable automatic GitHub
   deployments if you want future pushes to publish changes.
6. Assign the domain purchased in Hostinger using the website's domain controls.

Do not choose WordPress or Website Builder for this codebase. Do not use
`npm run dev` or `npm run preview` as the production server.

## Option B: Upload a static build

Use this option when your plan offers Custom PHP/HTML hosting but no Node.js
GitHub build integration.

1. Build locally:

   ```sh
   npm ci
   npm run build
   ```

2. Add a **Custom PHP/HTML** website in hPanel and select your purchased domain
   (or use a temporary domain first).
3. Open the website's **File Manager → public_html**.
4. Upload the **contents of `dist`**, or a ZIP of those contents, and extract
   them directly into `public_html`. Back up any existing website before replacing it.
5. Confirm this structure:

   ```text
   public_html/
     index.html
     programs.html
     gallery.html
     assets/
     images/
     videos/
     fonts/
     favicon.svg
   ```

The existing Netlify deploy ZIP is also static build output and can be extracted
here. Do not upload the source repository or create `public_html/dist/index.html`.
Hostinger's ordinary Git clone feature alone does not build React source.

This is a multi-page website. No blanket single-page-app rewrite is required;
`/programs.html` and `/gallery.html` must remain directly accessible.

## Connect the domain and HTTPS

1. In hPanel, attach the purchased domain to this website. A domain purchased in
   the same Hostinger account normally connects automatically if it still uses
   Hostinger DNS. Check the domain status before changing records.
2. If hPanel reports it is not connected, follow the exact DNS targets or
   nameservers shown for this website. Do not guess IP addresses or nameservers.
   Keep existing email and verification records.
3. Check both the root domain and `www`. Allow time for DNS changes to propagate.
4. Check **Security → SSL**. Hostinger normally installs SSL automatically after
   adding the domain. Once active, use HTTPS and enable the HTTPS redirect if needed.
5. Verify the homepage, Programs, Gallery, photographs, clips, directions and
   WhatsApp draft. Sending a WhatsApp message remains a visitor action.

## Optional: Connect Hostinger to Codex/ChatGPT

Hosting and domain connection work in hPanel without connecting Hostinger to
ChatGPT. The Hostinger Connector is only needed if you want the assistant to
manage the hosting account. Add/enable the Hostinger connector in the app's
connector settings and complete Hostinger sign-in. Never paste API tokens or
account passwords into the chat or commit them to this repository.

## Official guides

- [Add a Node.js web app / GitHub deployment](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
- [Add a website](https://www.hostinger.com/support/1583214-how-to-add-a-website-in-hostinger/)
- [Use File Manager](https://www.hostinger.com/support/4548688-basic-actions-in-the-file-manager-in-hostinger/)
- [Point a domain to Hostinger](https://www.hostinger.com/support/1863967-how-to-point-a-domain-to-hostinger/)
- [SSL setup](https://www.hostinger.com/support/1583258-how-to-install-lifetime-ssl-at-hostinger/)

Checked against Hostinger's guides on 13 November 2026. Menu labels and available
deployment options depend on your hosting plan. No hosting or DNS changes have
been made as part of publishing this repository.
