# Contact form Worker

Cloudflare Worker at `https://impactmediagroup.ca/api/contact`. The website's contact form posts JSON here; the Worker validates it, filters bots (Origin check + hidden honeypot field, optional Turnstile), and sends an instant **Pushover** notification to the owner's iPhone. The notification's link opens a reply email to the lead.

## Deploy

`.github/workflows/deploy-worker.yml` runs the tests and deploys on every push that touches `worker/`, or manually from **Actions → Deploy contact Worker → Run workflow**. It skips the deploy step (with a notice) until these repository secrets exist:

| Secret | Where it comes from |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → Create token → **Edit Cloudflare Workers** template, scoped to your account and the `impactmediagroup.ca` zone |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → any domain → Overview, right-hand column → **Account ID** |
| `PUSHOVER_TOKEN` | pushover.net → **Create an Application/API Token** |
| `PUSHOVER_USER` | pushover.net dashboard → **Your User Key** |

Add them at **GitHub → repo → Settings → Secrets and variables → Actions → New repository secret**. Secrets are uploaded to Cloudflare as Worker secrets at deploy time and never appear in the code.

## Optional: Turnstile

Set a `TURNSTILE_SECRET` Worker secret and every submission must carry a valid `turnstileToken`. The website does not render the Turnstile widget yet, so leave this unset until it does.

## Test locally

```bash
cd worker && npm test
```

## Behaviour

| Request | Response |
|---|---|
| Valid lead from the site | `200 {"ok":true}` + Pushover message |
| Honeypot filled | `200 {"ok":true}`, nothing sent |
| Missing/foreign `Origin` | `403` |
| Missing name/email/message, bad email | `422 {"fields":[...]}` |
| Pushover secrets missing | `500` |
| Pushover rejects | `502` |
