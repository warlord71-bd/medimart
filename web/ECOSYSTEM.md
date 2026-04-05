# MediMart Ecosystem Architecture

## Stack Decision

```
┌─────────────────────────────────────────────────────────────────┐
│                      MEDIMART ECOSYSTEM                          │
├──────────────┬──────────────────┬─────────────────┬─────────────┤
│  Web (Next)  │  Mobile (Expo)   │  Backend (WP)   │ Automation  │
│  medimart.   │  iOS + Android   │  medimart.com.  │  n8n self-  │
│  com.bd/web  │  App Store/Play  │  bd (WooComm)   │  hosted     │
└──────┬───────┴────────┬─────────┴────────┬────────┴──────┬──────┘
       │                │                  │               │
       └────────────────┴──────────────────┘               │
                        WooCommerce REST API                │
                        /wp-json/wc/v3/                    │
                                                            │
                        n8n Webhook Triggers ───────────────┘
```

## Why This Stack

| Layer     | Choice          | Why                                              |
|-----------|-----------------|--------------------------------------------------|
| Web front | Next.js 14      | SSR for SEO, same React skills as mobile app     |
| Mobile    | Expo (RN)       | Already built, cross-platform                    |
| Backend   | WordPress + WooCommerce | Already live at medimart.com.bd, huge plugin eco |
| Automation| n8n (self-host) | Free, visual workflows, 400+ integrations        |
| Hosting   | Vercel          | Free tier, instant Next.js deploys               |
| Payments  | SSLCommerz + bKash | BD-native, instant settlement                 |
| CDN/DNS   | Cloudflare      | Free DDoS protection, fast DNS                   |

---

## n8n Automation Workflows

Install n8n on your server:
```bash
docker run -d --name n8n -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=yourpassword \
  n8nio/n8n
```

### Workflow 1: New Order → SMS + WhatsApp

**Trigger:** WooCommerce "Order Created" webhook  
**Actions:**
1. Send SMS to customer via SSL Wireless: "Your MediMart order #XX is confirmed. Delivery in 2-6 hours."
2. Send WhatsApp via Twilio/Meta API with order details
3. Notify delivery team via Telegram bot
4. Update Google Sheet "Orders Log"

### Workflow 2: Prescription Upload → Pharmacist Alert

**Trigger:** HTTP webhook from web app  
**Actions:**
1. Save prescription image to Google Drive folder
2. Notify pharmacist via Telegram: "New Rx from [name] - [phone]"
3. Create WooCommerce draft order
4. Send WhatsApp to customer: "Your prescription is received. We'll call you in 15 mins."

### Workflow 3: Low Stock Alert

**Trigger:** WooCommerce "Low Stock" webhook  
**Actions:**
1. Send Telegram alert to admin
2. Log to Google Sheet "Inventory"
3. Create reorder task in Trello/Notion

### Workflow 4: Order Status → Customer Notification

**Trigger:** WooCommerce "Order Status Changed"  
**Actions:**
1. Map status: processing → confirmed, on-hold → preparing, completed → delivered
2. Send SMS to customer with status update
3. Update order in Google Sheet

### Workflow 5: Daily Sales Report

**Trigger:** Cron — every day at 9 PM  
**Actions:**
1. Fetch today's WooCommerce orders via API
2. Calculate revenue, top products, new customers
3. Send summary to WhatsApp Business or Telegram channel

---

## WordPress / WooCommerce Setup

### Must-have plugins
```
- WooCommerce (core)
- WooCommerce REST API (built-in)
- JWT Authentication for WP REST API
- WP Mail SMTP (email reliability)
- WooCommerce PDF Invoices
- Dokan (if multi-vendor needed)
- WPML or Polylang (for Bangla support)
```

### Custom Product Attributes (for API mapping)
Add these in WooCommerce > Attributes:
- `Company` (Square Pharma, Beximco, etc.)
- `Type` (Tablet, Capsule, Cream, etc.)
- `Strip` (number of units)
- `Prescription` (Yes / No)
- `Generic` (generic drug name)

### WooCommerce API Keys
Dashboard > WooCommerce > Settings > Advanced > REST API  
Create key with Read/Write permissions → add to `.env`

---

## Deployment Checklist

### Vercel (Next.js web)
```bash
npm install -g vercel
cd web/
vercel --prod
# Set env vars in Vercel dashboard
```

### Environment variables to set in Vercel:
```
NEXT_PUBLIC_WC_URL        = https://medimart.com.bd
WC_CONSUMER_KEY           = ck_...
WC_CONSUMER_SECRET        = cs_...
SSLCOMMERZ_STORE_ID       = ...
SSLCOMMERZ_STORE_PASS     = ...
BKASH_APP_KEY             = ...
N8N_ORDER_WEBHOOK         = https://n8n.medimart.com.bd/webhook/new-order
```

### Cloudflare DNS
```
medimart.com.bd       → WordPress server (A record)
www.medimart.com.bd   → Vercel (CNAME)
n8n.medimart.com.bd   → n8n server (A record)
```

---

## Business Ecosystem Integration Points

| System          | Integration Method         | Use Case                        |
|-----------------|---------------------------|---------------------------------|
| Google Sheets   | n8n Google Sheets node    | Sales reports, inventory logs   |
| WhatsApp        | n8n WhatsApp Business     | Order confirmations, marketing  |
| Telegram        | n8n Telegram Bot          | Internal team alerts            |
| Facebook/IG     | WooCommerce FB integration| Product catalog sync            |
| bKash           | SSLCommerz gateway        | Mobile payments                 |
| SSL Wireless    | n8n HTTP node             | SMS notifications               |
| Google Analytics| Next.js gtag integration  | Web traffic analytics           |
| Firebase        | Push notifications        | Mobile app notifications        |

---

## Scaling Path

1. **Now**: Next.js + WooCommerce headless (free/cheap)
2. **Later**: Add Redis for cart sessions, ElasticSearch for fast medicine search
3. **Scale**: Decouple into microservices only when you hit 1000+ orders/day
