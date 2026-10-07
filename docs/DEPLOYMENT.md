# Deployment (Vercel + GitHub)

Repository: [sapphireprod/Sapphire-web-templates](https://github.com/sapphireprod/Sapphire-web-templates)

## Automatic deploys (Git integration)

When the Vercel project is linked to this repo, every push to `main` triggers a production deployment. Pull requests receive preview URLs from Vercel without waiting on the GitHub Action deploy job.

## GitHub Actions pipeline

Workflow: `.github/workflows/vercel-deploy.yml`

| Job | When | What |
| --- | --- | --- |
| `quality` | Every push and PR | `npm ci`, `lint`, `build` |
| `deploy-preview` | Pull requests | `vercel build` + `vercel deploy --prebuilt` |
| `deploy-production` | Push to `main` | `vercel build --prod` + `vercel deploy --prebuilt --prod` |

### Required GitHub secrets

Add these under **Settings → Secrets and variables → Actions** for `Sapphire-web-templates`:

| Secret | Value |
| --- | --- |
| `VERCEL_TOKEN` | Vercel account or team token ([Account tokens](https://vercel.com/account/tokens)) |
| `VERCEL_ORG_ID` | Team ID from `.vercel/project.json` after linking the project (`orgId`) |
| `VERCEL_PROJECT_ID` | Project ID from `.vercel/project.json` (`projectId`) |

If you rely on Vercel’s native Git integration only, you can omit the deploy jobs and keep the `quality` job as a gate. The deploy jobs are optional when Vercel already builds on push.

## Local preview

```bash
npm install
npm run dev -- -p 43123
```

Production build:

```bash
npm run build
npm run start
```
