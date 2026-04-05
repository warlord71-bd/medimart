'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

const PAYMENT_METHODS = [
  { id: 'bkash',  label: 'bKash',             icon: '💳' },
  { id: 'nagad',  label: 'Nagad',             icon: '💳' },
  { id: 'ssl',    label: 'Card (SSLCommerz)', icon: '💳' },
  { id: 'cod',    label: 'Cash on Delivery',  icon: '🤝' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, delivery, total, clearCart } = useCart();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', area: '', city: 'Dhaka', notes: '',
  });
  const [payment, setPayment] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    // Simulate order placement (replace with real WC API call)
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    clearCart();

    // Trigger n8n webhook in background
    try {
      fetch(process.env.NEXT_PUBLIC_N8N_ORDER_WEBHOOK || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: form, items, total, payment }),
      }).catch(() => {});
    } catch {}
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <CheckCircle size={64} className="text-primary-500 mx-auto mb-5" />
        <h2 className="font-display font-800 text-2xl text-gray-900 mb-2">{t('orderSuccess')}</h2>
        <p className="text-gray-500 mb-6">
          We'll call you on <strong>{form.phone}</strong> to confirm your order.<br />
          Delivery within 2–6 hours in Dhaka.
        </p>
        <button onClick={() => router.push('/orders')} className="btn-primary">Track Your Order</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-display font-700 text-2xl text-gray-900 mb-6">{t('checkout')}</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: delivery + payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery details */}
            <div className="card p-6">
              <h3 className="font-700 text-gray-900 mb-4">Delivery Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-600 text-gray-600 mb-1 block">Full Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="Your full name" className="input" required />
                </div>
                <div>
                  <label className="text-xs font-600 text-gray-600 mb-1 block">Phone Number *</label>
                  <input value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="01XXXXXXXXX" className="input" required />
                </div>
                <div>
                  <label className="text-xs font-600 text-gray-600 mb-1 block">Email (optional)</label>
                  <input value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="you@email.com" className="input" type="email" />
                </div>
                <div>
                  <label className="text-xs font-600 text-gray-600 mb-1 block">Area / Thana</label>
                  <input value={form.area} onChange={e => set('area', e.target.value)}
                    placeholder="Gulshan, Dhanmondi..." className="input" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-600 text-gray-600 mb-1 block">Full Address *</label>
                  <textarea value={form.address} onChange={e => set('address', e.target.value)}
                    placeholder="House/flat number, road, area..." rows={3}
                    className="input resize-none" required />
                </div>
                <div>
                  <label className="text-xs font-600 text-gray-600 mb-1 block">City</label>
                  <select value={form.city} onChange={e => set('city', e.target.value)} className="input py-3">
                    {['Dhaka','Chittagong','Sylhet','Rajshahi','Khulna','Barishal','Comilla','Mymensingh'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-600 text-gray-600 mb-1 block">Order Notes</label>
                  <input value={form.notes} onChange={e => set('notes', e.target.value)}
                    placeholder="Any special instructions..." className="input" />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="card p-6">
              <h3 className="font-700 text-gray-900 mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PAYMENT_METHODS.map(pm => (
                  <label key={pm.id}
                    className={`border-2 rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer transition-colors
                      ${payment === pm.id ? 'border-primary-500 bg-primary-50' : 'border-border hover:border-primary-300'}`}>
                    <input type="radio" name="payment" value={pm.id} checked={payment === pm.id}
                      onChange={() => setPayment(pm.id)} className="hidden" />
                    <span className="text-xl">{pm.icon}</span>
                    <span className="text-xs font-600 text-gray-700 text-center">{pm.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-700 text-gray-900 mb-3">Order Summary</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate mr-2">{item.name} × {item.qty}</span>
                    <span className="font-600 flex-shrink-0">{formatPrice(item.price * item.strip * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-3 pt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span className={delivery === 0 ? 'text-primary-600 font-600' : ''}>
                    {delivery === 0 ? 'Free' : formatPrice(delivery)}
                  </span>
                </div>
                <div className="flex justify-between font-800 text-base pt-1 border-t border-border">
                  <span>Total</span><span className="text-primary-600">{formatPrice(total)}</span>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Placing Order...</> : t('placeOrder')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
