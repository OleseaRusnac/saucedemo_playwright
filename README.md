# Sauce Demo — Playwright Tests

## Overview

This repository contains Playwright end-to-end tests for the Sauce Demo example webapp. Tests cover login, inventory, cart, and checkout flows and are written in JavaScript.

## Prerequisites

- Node.js (>=14) and npm
- Playwright (browsers can be installed via Playwright)

## Setup

Install dependencies and Playwright browsers:

```bash
npm install
npx playwright install
```

## Run tests

Run the full test suite:

```bash
npx playwright test
```

Run a single test file:

```bash
npx playwright test tests/Inventory.spec.js
```

Generate and view the HTML report (after tests run):

```bash
npx playwright show-report
# or open the generated report file
open playwright-report/index.html
```

## Project Structure

- package.json — project metadata + scripts
- playwright.config.js — Playwright configuration
- Common/ — test utilities and data (TestData.js, URLs.js)
- PageObjects/ — page object classes (LoginPage.js, InventoryPage.js, CartPage.js, CheckoutPage.js)
- tests/ — Playwright test specs (Login.spec.js, Inventory.spec.js)
- playwright-report/ — generated HTML reports

## Notes

- Tests assume the Sauce Demo site URLs configured in `Common/URLs.js`.
- If you change browsers or Playwright config, run `npx playwright install` again.

## Contact

For issues or questions, open an issue in the repository.
