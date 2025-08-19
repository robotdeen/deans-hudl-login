# deans-hudl-test

End-to-end tests for Hudl login using **Cypress**.

---

### TL;DR quick start

```bash
nvm install 22.7.0 && nvm use 22.7.0
npm install
echo '{ "VALID_EMAIL":"...", "VALID_PASSWORD":"...", "RECORD_KEY":"..." }' > cypress.env.json
npm run cy:open         # debug locally
npm run cy:run          # headless run
```  

---

## 1) Install & use NVM (Node Version Manager)

```bash
# macOS / Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# load nvm into the current shell
source ~/.nvm/nvm.sh
```

> NVM lets you install/switch Node versions per project without touching the system Node.

---

## 2) Node versions for this project

```bash
# install and select project version
nvm install 22.7.0
nvm use 22.7.0

# optional: create .nvmrc so `nvm use` auto-picks the version
echo "22.7.0" > .nvmrc
```

If you prefer LTS instead:
```bash
nvm install --lts
nvm use --lts
```

---

## 3) Install Cypress & run with the provided **npm scripts**



Install dependencies (from `package.json`):

```bash
npm install
```

Your custom scripts:

```json
"scripts": {
  "cy:open": "npx cypress open",
  "cy:run": "npx cypress run",
  "cy:run:chrome": "npx cypress run --browser chrome"
}
```

### What’s the difference?

- **`cypress open`** (via `npm run cy:open`)  
  Launches the **interactive Runner**. Great for local debugging; shows the browser UI, time-travel snapshots, command log.

- **`cypress run`** (via `npm run cy:run`)  
  Runs tests **headlessly** (no visible browser window). This is what you’ll use in CI.

- **`cy:run:chrome`**  
  Same as headless, but explicitly uses **Chrome** (handy if your CI/locally installed default is different).

Examples:

```bash
npm run cy:open          # interactive mode
npm run cy:run           # headless run (default browser)
npm run cy:run:chrome    # headless run in Chrome
```

---

## 4) Local secrets — `cypress.env.json`

Create **`cypress.env.json`** in the project root (and add it to `.gitignore`):

```json
{
  "RECORD_KEY": "<Cypress dashboard record key>",
  "VALID_EMAIL": "<Hudl test account email>",
  "VALID_PASSWORD": "<Hudl test account password>"
}
```

Use them in tests:

```ts
const email = Cypress.env('VALID_EMAIL');
const password = Cypress.env('VALID_PASSWORD');
```

### 🔒 CI/CD note
For GitHub Actions, the relevant secrets (`CYPRESS_RECORD_KEY`, `CYPRESS_VALID_EMAIL`, `CYPRESS_VALID_PASSWORD`) have already been added under **GitHub repository secrets**, so they will be injected automatically during CI runs.  

Cypress automatically strips the `CYPRESS_` prefix, so in tests you still call `Cypress.env('VALID_EMAIL')` / `Cypress.env('VALID_PASSWORD')`.

---

## 5) Record runs to **Cypress Cloud** (Dashboard)

**What it is:** a hosted dashboard that stores run history, screenshots, videos, flaky-test insights, and links runs to your commits/PRs.

From your machine:

```bash
# export the key once per shell
export CYPRESS_RECORD_KEY="<your-record-key>"

# run headless and record to Cloud
npm run cy:run -- --record --key "$CYPRESS_RECORD_KEY"
# or explicitly in Chrome:
npm run cy:run:chrome -- --record --key "$CYPRESS_RECORD_KEY"
```

---

## 6) Helpful links

- **Cypress Cloud**: https://cloud.cypress.io  
- **Cypress Docs**: https://docs.cypress.io


