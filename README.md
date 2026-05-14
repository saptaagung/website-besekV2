# Besek Artisanal

Premium, deployable marketing site and Supabase-backed admin for **Besek Artisanal** — built with **Next.js (App Router)**, **Tailwind CSS v4**, and **Supabase** (Postgres + Auth).

## Requirements

- Node.js 20+
- npm (or pnpm/yarn)
- A [Supabase](https://supabase.com/) project

## Environment variables

Copy `.env.example` to `.env.local` and fill in values from the Supabase project settings (**Project URL** and **anon public** key):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

No secrets should be committed. For production on Vercel, add the same variables in the project dashboard.

## Database setup

1. In the Supabase SQL editor, run `supabase/schema.sql` once to create tables, triggers, and RLS policies.
2. Optionally run `supabase/seed.sql` for starter `site_content` rows (and example gallery URLs).
3. In **Authentication → Providers**, enable **Email**. Create an admin user (sign up once, or invite via dashboard). Use that email and password at `/admin/login`.

Row-level security:

- Public **read** on `products`, `site_content`, `contact_info`, and `gallery`.
- Public **insert** on `contact_messages` (contact form).
- Authenticated users (**admin**) can **read/write** all managed tables and **read** `contact_messages`.

## Local development

```bash
git init
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without Supabase env vars, the storefront still renders using built-in demo content.

## Admin routes

| Route | Purpose |
| --- | --- |
| `/admin/login` | Supabase email/password login |
| `/admin/dashboard` | Summary + recent contact messages |
| `/admin/products` | Product CRUD (feeds `/produk` and `/produk/[id]`) |
| `/admin/site-content` | Editable sections for Home / About / Contact copy |
| `/admin/contact-info` | Workshop address, WhatsApp, email, hours, map JSON |
| `/admin/gallery` | Mosaic images for About (`AboutMosaic_*` section names) |

## Linting & git hooks

- `npm run lint` — ESLint (Next core-web-vitals + TypeScript).
- After `git init`, `npm install` runs **Husky** + **lint-staged** so commits run ESLint on staged `*.{js,jsx,ts,tsx}` files.

## Deployment (Vercel)

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the repo in Vercel; framework preset **Next.js**.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel **Environment Variables** (Production + Preview as needed).
4. Redeploy.

### Remote images

`next.config.ts` allows `images.unsplash.com` for demo assets. If you host images on **Supabase Storage** or another domain, add a matching `images.remotePatterns` entry for that hostname.

## Content model (summary)

- **products** — catalog, signature flag, gallery URLs array, spec fields for detail table.
- **site_content** — keyed by `page_name` + `section_name` (e.g. `Home` / `Hero`, `About` / `Mission`).
- **contact_info** — single workshop record (+ JSON for map metadata).
- **gallery** — arbitrary rows; About page resolves `AboutMosaic_Left`, `AboutMosaic_RightTop`, `AboutMosaic_RightBottom`.
- **contact_messages** — submissions from `/kontak` (view in admin dashboard).

## Legal placeholders

`/privacy`, `/terms`, and `/faq` ship with short placeholder copy — replace with counsel-approved text before launch.

## Push to GitHub (`website-besekV2`)

Git is not available inside every Cursor agent shell, so run these on your PC where **Git** is installed (Git for Windows, etc.).

Remote: [https://github.com/saptaagung/website-besekV2.git](https://github.com/saptaagung/website-besekV2.git)

The `.git` URL is the **repository**, not a branch. GitHub’s default branch is usually **`main`** (sometimes **`master`**). Replace `main` below if yours differs.

### Choose the branch you push to

**Script (recommended):** default is `main`. Override:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\push-to-github.ps1 -Branch main
# example for another branch:
powershell -ExecutionPolicy Bypass -File .\scripts\push-to-github.ps1 -Branch develop
```

Or one-off env: `$env:GIT_BRANCH = "develop"; powershell -ExecutionPolicy Bypass -File .\scripts\push-to-github.ps1`

**Manual:** use the same branch name in `git branch -M …`, `git merge origin/…`, and `git push -u origin …`.

### Repo already has a (possibly empty) `README.md` on GitHub

GitHub’s first commit and your local folder do not share history, so you **merge once**, then push. Prefer your local `README.md` (full project docs) if Git reports a conflict:

```bash
cd d:\Website-besek
git init
git add .
git commit -m "Initial commit: Besek Artisanal site and admin"
git branch -M main
git remote add origin https://github.com/saptaagung/website-besekV2.git
# If remote already exists: git remote set-url origin https://github.com/saptaagung/website-besekV2.git

git fetch origin
git merge origin/main --allow-unrelated-histories --no-edit -X ours -m "Merge remote main with local project"
git push -u origin main
```

For branch **`master`** instead of `main`, use `git branch -M master`, `git merge origin/master …`, `git push -u origin master`.

- **`-X ours`**: on conflicts, keep **your** version (e.g. your real `README.md` instead of GitHub’s empty stub). If Git still stops for a conflict, open the listed files, save the version you want, then `git add .` and `git commit`.
- If `remote origin already exists`, use: `git remote set-url origin https://github.com/saptaagung/website-besekV2.git`
- HTTPS push usually asks for credentials: use a [Personal Access Token](https://github.com/settings/tokens) as the password (not your GitHub account password), or set up SSH and use `git@github.com:saptaagung/website-besekV2.git` as `origin`.

### Fresh empty repo (no commits on GitHub)

```bash
cd d:\Website-besek
git init
git add .
git commit -m "Initial commit: Besek Artisanal site and admin"
git branch -M main
git remote add origin https://github.com/saptaagung/website-besekV2.git
git push -u origin main
```

You can also run `powershell -ExecutionPolicy Bypass -File scripts\push-to-github.ps1` (optional `-Branch main`) from this folder after reviewing the script.

**`git` is not recognized:** install [Git for Windows](https://git-scm.com/download/win) and select **“Git from the command line and also from 3rd-party software”** so `git` is on your `PATH`. Close and reopen the terminal (or Cursor), then run the script again. The script also tries common install paths under `Program Files` and `%LOCALAPPDATA%\Programs\Git` automatically.
