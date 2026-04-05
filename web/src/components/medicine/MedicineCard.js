'use client';
import Link from 'next/link';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice, calcStripPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function MedicineCard({ medicine, compact = false }) {
  const { addItem } = useCart();
  const { t } = useLanguage();

  function handleAdd(e) {
    e.preventDefault();
    if (!medicine.stock) return;
    addItem(medicine);
    toast.success(`${medicine.name} added to cart`);
  }

  const stripPrice = calcStripPrice(medicine);
  const savings = (medicine.mrp - medicine.price) * medicine.strip;

  return (
    <Link href={`/medicines/${medicine.slug}`}
      className="card flex flex-col group overflow-hidden hover:border-primary-200 border border-transparent">
      {/* Badges */}
      <div className="relative bg-gray-50 p-4 flex items-center justify-center min-h-[90px]">
        <span className="text-5xl">{medicine.type === 'Cream' ? '🧴' : medicine.type === 'Nasal' ? '💨' : '💊'}</span>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {medicine.discount > 0 && (
            <span className="badge-discount">{medicine.discount}% {t('discount')}</span>
          )}
          {medicine.rx && (
            <span className="badge-rx flex items-center gap-0.5"><AlertCircle size={10} /> Rx</span>
          )}
        </div>
        {!medicine.stock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="badge-oos">{t('outOfStock')}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-600 text-gray-900 text-sm leading-tight line-clamp-1 group-hover:text-primary-600">
          {medicine.name}
        </h3>
        {!compact && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{medicine.generic}</p>
        )}
        <p className="text-xs text-gray-400 mt-0.5">{medicine.company}</p>

        <div className="mt-2 flex items-end justify-between gap-1">
          <div>
            <p className="text-primary-600 font-700 text-sm">{formatPrice(stripPrice)}</p>
            <p className="text-gray-400 text-xs line-through">{formatPrice(medicine.mrp * medicine.strip)}</p>
          </div>
          <p className="text-gray-400 text-xs">{t('stripOf')} {medicine.strip}</p>
        </div>

        {savings > 0 && (
          <p className="text-accent text-xs font-600 mt-1">{t('youSave')} {formatPrice(savings)}</p>
        )}

        <button
          onClick={handleAdd}
          disabled={!medicine.stock}
          className="mt-3 w-full btn-primary text-xs py-2 flex items-center justify-center gap-1.5
                     disabled:bg-gray-200 disabled:text-gray-400">
          <ShoppingCart size={13} />
          {medicine.stock ? t('addToCart') : t('outOfStock')}
        </button>
      </div>
    </Link>
  );
}
