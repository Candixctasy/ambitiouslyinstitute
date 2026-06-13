# CLAUDE.md — Ambitiously Institute

## Project Overview

This is a **Wix Velo** site for Ambitiously Institute — a coaching/education business platform. The codebase lives in GitHub and syncs to the live Wix editor via Wix Git Integration. It is **not** a traditional Node.js app; all runtime execution happens inside the Wix platform.

**Site ID:** `72e8e964-badd-46c8-9266-666a67bcfc00`

---

## Repository Structure

```
/
├── src/
│   ├── backend/          # Server-side web modules (run on Wix servers)
│   ├── pages/            # Per-page JavaScript (43 pages)
│   └── public/           # Shared utility modules (importable from any page)
├── .github/workflows/    # CI (node.js.yml) and release (npm-publish) pipelines
├── .eslintrc.json        # ESLint config — uses @wix/eslint-plugin-cli
├── package.json          # Dev dependencies only; no app bundle
├── wix.config.json       # Site ID and UI version for Wix CLI sync
└── wix.lock              # Wix dependency lock file
```

### src/backend/
Server-side code. Files ending in `.web.js` (web modules) expose functions callable from page code. Other special filenames Wix recognizes:
- `data.js` — Wix Data hooks
- `routers.js` — custom URL routing
- `events.js` — Wix app event handlers
- `http-functions.js` — custom HTTP endpoints
- `jobs.config` — scheduled jobs
- `permissions.json` — access control for all web module functions

### src/pages/
One JS file per page, named `{PageName}.{wixInternalID}.js`. The internal ID is assigned by Wix; **do not rename these files** — it breaks the editor sync. `masterPage.js` runs on every page load (global code).

### src/public/
Utility modules shared across pages and backend. Import with:
```js
import { myUtil } from 'public/myFile';
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Platform | Wix Velo (proprietary JS runtime) |
| Language | JavaScript ES6+ |
| Package manager | npm |
| Linter | ESLint 8.25.0 + @wix/eslint-plugin-cli |
| CI | GitHub Actions (Node 18/20/22 matrix) |
| Local dev | `wix dev` (Wix CLI) |

**No traditional database, server, or build output.** Data is stored in Wix Collections and accessed via `wix-data` APIs.

---

## Development Workflow

### Prerequisites
- Node.js 14.8+
- Wix CLI: `npm install -g @wix/cli`
- Wix account with access to the site

### Local Setup
```bash
npm install          # installs deps + runs `wix sync-types` (generates TS types)
wix login            # authenticate with Wix
wix dev              # open local editor synced to this repo
```

### Making Changes
1. Edit files in `src/` locally
2. Test with `wix dev` — the local editor reflects changes in real time
3. Commit and push; CI runs lint
4. Use `wix preview` to create a shareable preview before publishing
5. Use `wix publish` to push changes live

### Linting
```bash
npm run lint         # eslint on all files
```

### Testing
No test suite is currently configured. CI uses `npm test --if-present` (a no-op). If adding tests, use a framework compatible with Wix's Node environment (Jest works for pure utility functions in `src/public/`).

---

## Key Code Patterns

### Page initialization
Every page file wraps logic in `$w.onReady`:
```js
$w.onReady(async function () {
    // DOM is ready; bind elements and load data here
});
```

### Selecting elements
```js
$w('#elementID').text = 'Hello';
$w('#buttonID').onClick(() => { /* ... */ });
```

### Web modules (backend)
Expose server-side functions to page code using `webMethod`:
```js
import { Permissions, webMethod } from 'wix-web-module';

export const myFunction = webMethod(
  Permissions.Anyone,        // Anyone | SiteMember | SiteOwner
  async (param) => {
    return result;
  }
);
```
Call from a page with `import { myFunction } from 'backend/myModule.web'`.

### Permissions
`src/backend/permissions.json` grants `invoke` rights per function and per tier:
```json
{
  "functionName": {
    "siteOwner": { "invoke": true },
    "siteMember": { "invoke": true },
    "anonymous":  { "invoke": false }
  }
}
```

### Wix Data queries
```js
import wixData from 'wix-data';

const results = await wixData.query('CollectionName')
  .ge('dateField', new Date())
  .ascending('dateField')
  .find();
```

### Current member
```js
import { currentMember } from 'wix-members';
const member = await currentMember.getMember();
```

### Repeaters (dynamic lists)
```js
$w('#myRepeater').onItemReady(($item, itemData) => {
    $item('#title').text = itemData.title;
});
$w('#myRepeater').data = myArray;
```

---

## Naming Conventions

- **Functions/variables:** camelCase
- **Imports:** PascalCase for class-like imports (`Permissions`, `wixData`)
- **Element IDs in code:** camelCase prefixed with `#` (e.g., `$w('#submitButton')`)
- **Page files:** `{PageName}.{wixInternalID}.js` — never rename the ID portion
- **Web module files:** must end in `.web.js`

---

## Pages Inventory (43 pages)

Notable pages with real implementation:
- **Events.nywia.js** — event listing, filtering (all/upcoming/past), RSVP with login redirect
- **masterPage.js** — global site initialization, runs on every page
- **Home.c1dmp.js** — homepage

Feature areas covered by pages:
- Bookings (Book Online, Booking Calendar, Booking Form)
- E-commerce (Cart, Product, Checkout, Thank You)
- Community (Forum, Forum Posts, Forum Comments, Groups, Group Page)
- Members (My Account, Addresses, Orders, Subscriptions, Wallet, Profile, Settings)
- Content (Gallery, Shared Gallery, File Share)
- Other (Schedule, Notifications, Paywall, Plans & Pricing, Category)

---

## CI/CD

### `.github/workflows/node.js.yml`
Runs on push/PR to `main`:
1. Checkout
2. Setup Node (18, 20, 22 matrix)
3. `npm install --ignore-scripts` (skips `wix sync-types` to avoid auth)
4. `npm run build --if-present`
5. `npm test --if-present`

### `.github/workflows/npm-publish-github-packages.yml`
Triggers on GitHub Release creation — builds and publishes to GitHub Packages.

---

## Important Constraints

- **Do not rename page files** — the `{wixInternalID}` suffix is how Wix maps the file to a page. Renaming breaks the sync.
- **No `require()`** — Wix Velo uses ES module syntax (`import`/`export`) only.
- **No Node built-ins** — `fs`, `path`, `http`, etc. are not available. Use Wix APIs instead.
- **Backend files run server-side** — they cannot access browser globals (`window`, `document`).
- **`wix-web-module` is the only way** to call backend code from page code; direct `import` of backend files from pages is blocked.
- **Wix editor is the source of truth for element IDs** — always check the Wix editor for the exact `#elementID` strings before referencing them in code.

---

## Error Handling Style

The existing codebase uses:
- `.catch(() => null)` for non-critical async failures
- `try/catch` for async functions where error state affects UI
- Optional chaining (`?.`) for nested data access (e.g., `item.location?.address?.formatted`)

Follow the same lightweight approach — only handle errors when the failure mode matters to the user.
