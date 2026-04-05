/**
 * WooCommerce REST API client
 * Falls back to local data when API is unavailable or keys not set.
 */

const WC_URL = process.env.NEXT_PUBLIC_WC_URL || 'https://medimart.com.bd';
const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;

const isConfigured = Boolean(WC_KEY && WC_SECRET && WC_KEY !== 'ck_xxxxxxxxxxxxxxxxxxxxxxxx');

async function wcFetch(endpoint, params = {}) {
  if (!isConfigured) return null;

  const url = new URL(`${WC_URL}/wp-json/wc/v3/${endpoint}`);
  url.searchParams.set('consumer_key', WC_KEY);
  url.searchParams.set('consumer_secret', WC_SECRET);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts({ page = 1, per_page = 20, category = '', search = '' } = {}) {
  return wcFetch('products', { page, per_page, category, search, status: 'publish' });
}

export async function getProductBySlug(slug) {
  const results = await wcFetch('products', { slug });
  return results?.[0] || null;
}

export async function getCategories() {
  return wcFetch('products/categories', { per_page: 50, hide_empty: true });
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function createOrder(orderData) {
  if (!isConfigured) return null;

  const url = `${WC_URL}/wp-json/wc/v3/orders`;
  const credentials = btoa(`${WC_KEY}:${WC_SECRET}`);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) throw new Error('Order creation failed');
  return res.json();
}

export async function getOrder(orderId) {
  return wcFetch(`orders/${orderId}`);
}

// ─── Helper: map WC product to app format ────────────────────────────────────

export function mapWcProduct(p) {
  if (!p) return null;
  const salePrice = parseFloat(p.sale_price || p.regular_price || 0);
  const regularPrice = parseFloat(p.regular_price || 0);
  const discount = regularPrice > 0 ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0;

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    generic: p.short_description?.replace(/<[^>]+>/g, '') || '',
    company: p.attributes?.find(a => a.name === 'Company')?.options?.[0] || '',
    type: p.attributes?.find(a => a.name === 'Type')?.options?.[0] || 'Tablet',
    price: salePrice,
    mrp: regularPrice,
    strip: parseInt(p.attributes?.find(a => a.name === 'Strip')?.options?.[0] || '10'),
    category: p.categories?.[0]?.name || '',
    rx: p.attributes?.find(a => a.name === 'Prescription')?.options?.[0] === 'Yes',
    stock: p.stock_status === 'instock',
    discount,
    desc: p.description?.replace(/<[^>]+>/g, '') || '',
    image: p.images?.[0]?.src || null,
  };
}
