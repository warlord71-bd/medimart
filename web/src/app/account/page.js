'use client';
import { useState } from 'react';
import { User, MapPin, Bell, Globe, ChevronRight, LogOut, ShoppingBag, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function AccountPage() {
  const { lang, toggleLang, t } = useLanguage();
  const [notifications, setNotifications] = useState(true);

  const menuItems = [
    { icon: ShoppingBag, label: 'My Orders',          href: '/orders'  },
    { icon: MapPin,      label: 'Saved Addresses',    href: '#'        },
    { icon: Heart,       label: 'Wishlist',           href: '#'        },
    { icon: Bell,        label: 'Notifications',      href: '#', toggle: true, value: notifications, onToggle: () => setNotifications(n => !n) },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display font-700 text-2xl text-gray-900 mb-6">{t('account')}</h1>

      {/* Profile card */}
      <div className="card p-6 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
          <User size={28} className="text-primary-600" />
        </div>
        <div>
          <p className="font-700 text-gray-900 text-lg">Guest User</p>
          <p className="text-gray-500 text-sm">Sign in for order history & faster checkout</p>
          <button className="btn-primary text-sm py-1.5 px-4 mt-2">Sign In / Register</button>
        </div>
      </div>

      {/* Menu */}
      <div className="card divide-y divide-border">
        {menuItems.map(({ icon: Icon, label, href, toggle, value, onToggle }) => (
          toggle ? (
            <div key={label} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-gray-500" />
                <span className="text-sm font-500 text-gray-800">{label}</span>
              </div>
              <button onClick={onToggle}
                className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-primary-600' : 'bg-gray-300'}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ) : (
            <Link key={label} href={href}
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-gray-500" />
                <span className="text-sm font-500 text-gray-800">{label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          )
        ))}

        {/* Language toggle */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-gray-500" />
            <span className="text-sm font-500 text-gray-800">Language</span>
          </div>
          <button onClick={toggleLang}
            className="text-sm font-600 text-primary-600 bg-primary-50 px-3 py-1 rounded-lg hover:bg-primary-100">
            {lang === 'en' ? '🇧🇩 বাংলা' : '🇬🇧 English'}
          </button>
        </div>

        <div className="px-5 py-4">
          <button className="flex items-center gap-3 text-red-500 hover:text-red-600 text-sm font-500">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* App download */}
      <div className="card p-5 mt-6 bg-primary-50 border border-primary-200">
        <p className="font-700 text-gray-900 mb-1">📱 Download the MediMart App</p>
        <p className="text-sm text-gray-600 mb-4">Better experience, faster checkout, real-time tracking.</p>
        <div className="flex gap-3 flex-wrap">
          <button className="bg-gray-900 text-white text-sm font-600 px-4 py-2.5 rounded-xl flex items-center gap-2">
            🍎 App Store
          </button>
          <button className="bg-gray-900 text-white text-sm font-600 px-4 py-2.5 rounded-xl flex items-center gap-2">
            🤖 Google Play
          </button>
        </div>
      </div>
    </div>
  );
}
