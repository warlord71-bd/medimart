'use client';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice, calcStripPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, cartCount, subtotal, delivery, total, updateQty, removeItem } = useCart();
  const { t } = useLanguage();

  if (cartCount === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={56} className="text-gray-300 mx-auto mb-4" />
        <h2 className="font-display font-700 text-2xl text-gray-700 mb-2">{t('emptyCart')}</h2>
        <p className="text-gray-400 mb-6">Add medicines to your cart to proceed with checkout.</p>
        <Link href="/medicines" className="btn-primary inline-flex items-center gap-2">
          Browse Medicines <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-display font-700 text-2xl text-gray-900 mb-6">
        {t('cart')} <span className="text-primary-600">({cartCount} items)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => {
            const linePrice = item.price * item.strip * item.qty;
            return (
              <div key={item.id} className="card p-4 flex gap-4 items-center">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                  {item.type === 'Cream' ? '🧴' : '💊'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-600 text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.generic}</p>
                  <p className="text-xs text-gray-400">{item.company} · Strip of {item.strip}</p>
                  <p className="text-primary-600 font-700 text-sm mt-1">
                    {formatPrice(linePrice)}
                    <span className="text-gray-400 font-400 text-xs ml-1">
                      ({formatPrice(item.price * item.strip)}/strip)
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-gray-100">
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-600">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-gray-100">
                    <Plus size={14} />
                  </button>
                </div>

                <button onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-600 p-2 flex-shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="card p-5 space-y-3">
            <h3 className="font-700 text-gray-900">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('subtotal')}</span>
                <span className="font-600">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('delivery')}</span>
                <span className={delivery === 0 ? 'text-primary-600 font-600' : 'font-600'}>
                  {delivery === 0 ? t('freeDelivery') : formatPrice(delivery)}
                </span>
              </div>
              {delivery > 0 && (
                <p className="text-xs text-gray-400">Add {formatPrice(500 - subtotal)} more for free delivery</p>
              )}
              <div className="border-t border-border pt-2 flex justify-between font-700">
                <span>{t('total')}</span>
                <span className="text-primary-600 text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {t('checkout')} <ArrowRight size={16} />
            </Link>
          </div>

          {/* Payment icons */}
          <div className="card p-4">
            <p className="text-xs text-gray-500 mb-3 font-600">ACCEPTED PAYMENTS</p>
            <div className="flex flex-wrap gap-2">
              {['bKash', 'Nagad', 'Rocket', 'Visa/MC', 'COD'].map(p => (
                <span key={p} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg font-500">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
