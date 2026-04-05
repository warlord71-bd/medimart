'use client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { getMedicineBySlug, getAlternatives } from '@/data/medicines';
import MedicineCard from '@/components/medicine/MedicineCard';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice, calcStripPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function MedicineDetailPage({ params }) {
  const medicine = getMedicineBySlug(params.slug);
  if (!medicine) notFound();

  const alternatives = getAlternatives(medicine);
  const { addItem } = useCart();
  const { t } = useLanguage();
  const stripPrice = calcStripPrice(medicine);
  const savings = (medicine.mrp - medicine.price) * medicine.strip;

  function handleAdd() {
    if (!medicine.stock) return;
    addItem(medicine);
    toast.success(`${medicine.name} added to cart`);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/medicines" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-600 mb-6">
        <ArrowLeft size={16} /> Back to Medicines
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: image + badges */}
        <div className="card p-8 flex flex-col items-center justify-center gap-4">
          <span className="text-8xl">{medicine.type === 'Cream' ? '🧴' : medicine.type === 'Nasal' ? '💨' : '💊'}</span>
          <div className="flex flex-wrap gap-2 justify-center">
            {medicine.discount > 0 && (
              <span className="badge-discount text-sm px-3 py-1">{medicine.discount}% OFF</span>
            )}
            {medicine.rx && (
              <span className="badge-rx text-sm px-3 py-1 flex items-center gap-1">
                <AlertCircle size={12} /> Prescription Required
              </span>
            )}
            {medicine.stock
              ? <span className="bg-green-100 text-green-700 text-sm font-600 px-3 py-1 rounded-full flex items-center gap-1"><CheckCircle size={12} /> In Stock</span>
              : <span className="badge-oos text-sm px-3 py-1 flex items-center gap-1"><XCircle size={12} /> Out of Stock</span>
            }
          </div>
        </div>

        {/* Right: details */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-display font-800 text-2xl text-gray-900">{medicine.name}</h1>
            <p className="text-gray-500 mt-1">{medicine.generic}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              [t('manufacturer'), medicine.company],
              ['Type',            medicine.type],
              [t('stripOf'),      `${medicine.strip} tablets`],
              ['Category',        medicine.category],
            ].map(([label, value]) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                <p className="font-600 text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="card p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-800 text-primary-600">{formatPrice(stripPrice)}</p>
                <p className="text-gray-400 text-sm line-through mt-0.5">{t('mrp')}: {formatPrice(medicine.mrp * medicine.strip)}</p>
              </div>
              {savings > 0 && (
                <div className="text-right">
                  <p className="text-accent font-700">{t('youSave')} {formatPrice(savings)}</p>
                  <p className="text-gray-400 text-xs">per strip</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-600 text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{medicine.desc}</p>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button onClick={handleAdd} disabled={!medicine.stock}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400">
              <ShoppingCart size={18} />
              {medicine.stock ? t('addToCart') : t('outOfStock')}
            </button>
            <Link href="/cart" className="btn-outline px-5 py-2.5">View Cart</Link>
          </div>

          {medicine.rx && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex gap-2 text-sm text-yellow-800">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span>This medicine requires a valid prescription from a registered physician. Please upload your prescription when ordering.</span>
            </div>
          )}
        </div>
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <section className="mt-12">
          <h2 className="section-title mb-5">{t('alternatives')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {alternatives.map(alt => (
              <MedicineCard key={alt.id} medicine={alt} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
