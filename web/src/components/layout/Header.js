'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Search, Globe, Menu, X, Upload, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { cartCount } = useCart();
  const { lang, t, toggleLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/medicines?q=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-primary-600 shadow-md">
      {/* Top bar */}
      <div className="hidden md:flex bg-primary-700 text-white text-xs px-4 py-1 justify-between items-center max-w-7xl mx-auto">
        <span className="flex items-center gap-1"><Phone size={10} /> Hotline: 16516</span>
        <span>Free delivery on orders above ৳500 | Open 24/7</span>
        <button onClick={toggleLang} className="flex items-center gap-1 hover:text-green-200">
          <Globe size={12} /> {lang === 'en' ? 'বাংলা' : 'English'}
        </button>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary-600 font-display font-800 text-lg">M</div>
          <span className="text-white font-display font-700 text-xl hidden sm:block">MediMart</span>
        </Link>

        {/* Search — desktop */}
        <form onSubmit={handleSearch} className="flex-1 hidden md:flex max-w-xl">
          <div className="relative w-full">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-4 pr-12 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/40 text-gray-800"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-600">
              <Search size={18} />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-2 ml-auto">
          {/* Mobile search toggle */}
          <button onClick={() => setSearchOpen(s => !s)} className="md:hidden text-white p-2 rounded-lg hover:bg-primary-700">
            <Search size={20} />
          </button>

          {/* Upload Rx */}
          <Link href="/medicines?upload=1" className="hidden sm:flex items-center gap-1.5 text-white bg-primary-700 hover:bg-primary-800 px-3 py-2 rounded-xl text-sm font-600 transition-colors">
            <Upload size={15} /> {t('uploadPrescription')}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative text-white p-2 rounded-xl hover:bg-primary-700 transition-colors">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-700 w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>

          {/* Lang toggle mobile */}
          <button onClick={toggleLang} className="md:hidden text-white/80 hover:text-white p-2 rounded-lg text-xs font-600">
            {lang === 'en' ? 'বাং' : 'EN'}
          </button>

          {/* Menu toggle mobile */}
          <button onClick={() => setMenuOpen(o => !o)} className="md:hidden text-white p-2 rounded-lg hover:bg-primary-700">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Desktop nav links */}
      <nav className="hidden md:flex bg-primary-700 max-w-7xl mx-auto px-4 pb-1 gap-1">
        {[
          { href: '/',                  label: t('home')        },
          { href: '/medicines',         label: t('medicines')   },
          { href: '/medicines?cat=Pain Relief',     label: 'Pain Relief'   },
          { href: '/medicines?cat=Antibiotic',      label: 'Antibiotics'   },
          { href: '/medicines?cat=Vitamins',        label: 'Vitamins'      },
          { href: '/medicines?cat=Gastric',         label: 'Gastric'       },
          { href: '/orders',            label: t('orders')      },
        ].map(({ href, label }) => (
          <Link key={href} href={href}
            className="text-white/80 hover:text-white hover:bg-primary-600 px-3 py-1.5 rounded-lg text-sm font-500 transition-colors">
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile search */}
      {searchOpen && (
        <form onSubmit={handleSearch} className="md:hidden px-4 pb-3">
          <div className="relative">
            <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl text-sm focus:outline-none" />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search size={17} />
            </button>
          </div>
        </form>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-primary-700 px-4 pb-4 flex flex-col gap-1">
          {[
            { href: '/',          label: t('home')      },
            { href: '/medicines', label: t('medicines') },
            { href: '/cart',      label: t('cart')      },
            { href: '/orders',    label: t('orders')    },
            { href: '/account',   label: t('account')   },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              className="text-white hover:bg-primary-600 px-3 py-2.5 rounded-xl text-sm font-500">
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
