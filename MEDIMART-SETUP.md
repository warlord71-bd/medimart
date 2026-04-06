# MediMart — Full Stack Setup Reference

> **Owner:** Hasan Tarafder (HGC.bd71@gmail.com, @Warlord_71)
> **Domain:** medimart.com.bd
> **VPS:** Contabo — 5.189.188.229 (Ubuntu 24.04)
> **Git branch:** `claude/activate-memory-debug-g1mhc`
> **Repo:** https://github.com/warlord71-bd/medimart

---

## Stack Overview

| Layer | Technology | URL |
|---|---|---|
| Mobile App | React Native / Expo | — |
| Web Frontend | Next.js 16.2.2 (App Router) | https://medimart.com.bd |
| Backend CMS | WordPress + WooCommerce | https://medimart.com.bd/wp-admin |
| Automation | n8n v2.14.2 | https://n8n.medimart.com.bd |
| Process Manager | PM2 | port 3002 (web), 5678 (n8n) |
| Reverse Proxy | Nginx | /etc/nginx/sites-available/medimart |
| DNS | Cloudflare | augustus + luciana nameservers |
| Database | MySQL 8.0 (WordPress), SQLite (n8n) |

---

## VPS Directory Structure

```
/var/www/
├── medimart-web/          ← Git repo (Next.js + shared data + n8n workflows)
│   ├── web/               ← Next.js app (pm2: medimart-web, port 3002)
│   ├── shared/data/       ← Shared medicine data source
│   └── web/n8n-workflows/ ← n8n workflow JSON files
├── medimart/              ← WordPress root
│   └── wp-content/
└── emart/                 ← Separate emart site (untouched)
```

---

## WooCommerce API Keys

| Key | Value |
|---|---|
| Consumer Key | `ck_7160f02a4d41e1599ce72b911a8f0dff8d5b4c3d` |
| Consumer Secret | `cs_c909b61a2dd8f27112cefde3b98e228b378ae3ca` |
| Base URL | `https://medimart.com.bd/wp-json/wc/v3` |

Stored in:
- **Mobile app:** `src/config/api.js` (gitignored)
- **Web:** `web/.env.local` (gitignored)

---

## Telegram Bot

| Field | Value |
|---|---|
| Bot Token | `8368208521:AAEh0nzqx4ydbx_tN4zcW8Zbq2g9ELCLOzQ` |
| Chat ID | `6639867372` |

> **Action needed:** Revoke this token via @BotFather → `/mybots` → Revoke, then update the 3 workflow JSONs and re-import.

---

## n8n Workflows

All 3 workflows are in `web/n8n-workflows/` and imported via REST API.

| # | Workflow Name | Trigger | Webhook Path |
|---|---|---|---|
| 1 | MediMart - New Order → Telegram | WooCommerce webhook (Order created) | `/webhook/medimart-new-order` |
| 2 | MediMart - Prescription Upload → Telegram | Next.js checkout page POST | `/webhook/medimart-prescription` |
| 3 | MediMart - Daily 9PM Sales Report → Telegram | Cron: `0 21 * * *` (Asia/Dhaka) | — |

**Import command (if re-importing):**
```bash
API_KEY="<your-n8n-api-key>"
BASE="https://n8n.medimart.com.bd/api/v1/workflows"
DIR="/var/www/medimart-web/web/n8n-workflows"

for f in 1-order-notification.json 2-prescription-alert.json 3-daily-sales-report.json; do
  curl -s -X POST "$BASE" \
    -H "X-N8N-API-KEY: $API_KEY" \
    -H "Content-Type: application/json" \
    -d @"$DIR/$f"
done
```

---

## WooCommerce Webhook (Order Notification)

Go to: WP Admin → WooCommerce → Settings → Advanced → Webhooks

| Field | Value |
|---|---|
| Name | medimartneworder |
| Status | Active |
| Topic | Order created |
| Delivery URL | `https://n8n.medimart.com.bd/webhook/medimart-new-order` |
| API Version | WP REST API Integration v3 |

---

## Nginx Config

File: `/etc/nginx/sites-available/medimart`

- `/wp-admin`, `/wp-json`, `/wp-content`, `/wp-includes` → PHP-FPM (WordPress at `/var/www/medimart`)
- `/` → Next.js proxy at `127.0.0.1:3002`
- SSL via Let's Encrypt (Certbot)

---

## PM2 Processes

```bash
pm2 list          # view all processes
pm2 logs medimart-web   # Next.js logs
pm2 logs n8n            # n8n logs
pm2 restart medimart-web
```

| App Name | Port | Directory |
|---|---|---|
| medimart-web | 3002 | /var/www/medimart-web/web |
| n8n | 5678 | — |
| emartweb | 3000 | /var/www/emart-web |
| emartappup | 3001 | /var/www/emart-appup |

---

## Medicine Data

Single source of truth: `web/src/data/medicines.js`
- 25 Bangladeshi medicines
- Fields: id, slug, name, generic, company, type, price, mrp, strip, category, rx, stock, discount, desc, dosage, alternatives
- Helper functions: `getMedicineBySlug`, `getMedicineById`, `getAlternatives`, `searchMedicines`, `getDeals`, `getFeatured`, `getPopular`

---

## Web App Pages

| Route | Page |
|---|---|
| `/` | Home (hero, categories, deals, featured) |
| `/medicines` | Browse + filter + search |
| `/medicines/[slug]` | Medicine detail |
| `/cart` | Cart with delivery threshold |
| `/checkout` | Order form + 4 payment methods |
| `/orders` | Order tracking |
| `/account` | Profile + settings |

---

## Key Files

| File | Purpose |
|---|---|
| `web/src/context/CartContext.js` | localStorage cart, delivery calc |
| `web/src/context/LanguageContext.js` | EN/BN bilingual toggle |
| `web/src/lib/woocommerce.js` | WC REST API client with local fallback |
| `web/src/components/layout/Header.js` | Sticky header, search, cart badge |
| `web/.env.example` | Template for all environment variables |
| `web/jsconfig.json` | `@/` path alias for Next.js |
| `web/tailwind.config.js` | Custom colors + fontWeight extension |
| `src/config/api.js` | Mobile app WC config (gitignored) |

---

## Pending Tasks

- [ ] Revoke exposed Telegram bot token → generate new one → update workflow JSONs
- [ ] Disable "Coming Soon" mode on medimart.com.bd WordPress
- [ ] Add medicines to WooCommerce as products (for live app/web sync)
- [ ] Set up SSLCommerz / bKash payment gateway credentials in `web/.env.local`
- [ ] Add SMS gateway config for order confirmations

---

## Deploy / Update Commands

```bash
# On VPS — pull latest and restart web
cd /var/www/medimart-web
git pull origin claude/activate-memory-debug-g1mhc
pm2 restart medimart-web

# Check site status
pm2 list
curl -I https://medimart.com.bd
```
