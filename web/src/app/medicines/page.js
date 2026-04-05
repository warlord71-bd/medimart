'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, Upload } from 'lucide-react';
import MedicineCard from '@/components/medicine/MedicineCard';
import { medicines, categories, companies } from '@/data/medicines';
import { useLanguage } from '@/context/LanguageContext';
import { Suspense } from 'react';

function MedicinesContent() {
  const params = useSearchParams();
  const { t } = useLanguage();

  const [query,   setQuery]   = useState(params.get('q') || '');
  const [cat,     setCat]     = useState(params.get('cat') || '');
  const [company, setCompany] = useState('');
  const [sort,    setSort]    = useState('name');
  const [inStock, setInStock] = useState(false);
  const [rxOnly,  setRxOnly]  = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = medicines.filter(m => {
      const q = query.toLowerCase();
      const matchQ = !q || m.name.toLowerCase().includes(q) || m.generic.toLowerCase().includes(q) || m.company.toLowerCase().includes(q);
      const matchCat = !cat || m.category === cat;
      const matchCo  = !company || m.company === company;
      const matchStk = !inStock || m.stock;
      const matchRx  = !rxOnly || m.rx;
      return matchQ && matchCat && matchCo && matchStk && matchRx;
    });

    return list.sort((a, b) => {
      if (sort === 'price_asc')  return (a.price * a.strip) - (b.price * b.strip);
      if (sort === 'price_desc') return (b.price * b.strip) - (a.price * a.strip);
      if (sort === 'discount')   return b.discount - a.discount;
      return a.name.localeCompare(b.name);
    });
  }, [query, cat, company, sort, inStock, rxOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-700 text-2xl text-gray-900">
            {cat || 'All Medicines'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} products found</p>
        </div>
        <button onClick={() => setFilterOpen(o => !o)}
          className="flex items-center gap-2 btn-outline text-sm py-2 px-4">
          <SlidersHorizontal size={16} />
          Filters {(cat || company || inStock || rxOnly) && <span className="bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">!</span>}
        </button>
      </div>

      {/* Search bar */}
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="input mb-5 max-w-xl"
      />

      {/* Filters panel */}
      {filterOpen && (
        <div className="card p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category */}
          <div>
            <label className="text-xs font-600 text-gray-600 mb-1 block">Category</label>
            <select value={cat} onChange={e => setCat(e.target.value)} className="input py-2">
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="text-xs font-600 text-gray-600 mb-1 block">Company</label>
            <select value={company} onChange={e => setCompany(e.target.value)} className="input py-2">
              <option value="">All Companies</option>
              {companies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-xs font-600 text-gray-600 mb-1 block">Sort By</label>
            <select value={sort} onChange={e => setSort(e.target.value)} className="input py-2">
              <option value="name">Name A–Z</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="discount">Best Discount</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-3 justify-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)}
                className="accent-primary-600 w-4 h-4" />
              <span className="text-sm text-gray-700">In Stock Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rxOnly} onChange={e => setRxOnly(e.target.checked)}
                className="accent-primary-600 w-4 h-4" />
              <span className="text-sm text-gray-700">Prescription Medicines</span>
            </label>
            <button onClick={() => { setCat(''); setCompany(''); setInStock(false); setRxOnly(false); setQuery(''); }}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 font-600">
              <X size={12} /> Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Active filter chips */}
      {(cat || company) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {cat && (
            <span className="bg-primary-100 text-primary-700 text-xs font-600 px-3 py-1 rounded-full flex items-center gap-1">
              {cat}
              <button onClick={() => setCat('')}><X size={11} /></button>
            </span>
          )}
          {company && (
            <span className="bg-primary-100 text-primary-700 text-xs font-600 px-3 py-1 rounded-full flex items-center gap-1">
              {company}
              <button onClick={() => setCompany('')}><X size={11} /></button>
            </span>
          )}
        </div>
      )}

      {/* Upload prescription banner */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-700 font-500">Can't find your medicine? Upload a prescription and we'll prepare it for you.</p>
        <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 flex-shrink-0">
          <Upload size={14} /> Upload Rx
        </button>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">💊</span>
          <p className="text-gray-500 mt-4 font-500">No medicines found. Try a different search.</p>
          <button onClick={() => { setQuery(''); setCat(''); }} className="btn-outline mt-4 text-sm">Clear Search</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(med => (
            <MedicineCard key={med.id} medicine={med} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MedicinesPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading...</div>}>
      <MedicinesContent />
    </Suspense>
  );
}
