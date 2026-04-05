'use client';
import { createContext, useContext, useState } from 'react';

const strings = {
  en: {
    siteName: 'MediMart',
    tagline: 'Your trusted online pharmacy',
    searchPlaceholder: 'Search medicines, generics, companies...',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    outOfStock: 'Out of Stock',
    prescription: 'Prescription Required',
    discount: 'OFF',
    viewAll: 'View All',
    categories: 'Categories',
    featuredMeds: 'Featured Medicines',
    topDeals: 'Top Deals',
    uploadPrescription: 'Upload Prescription',
    cart: 'Cart',
    checkout: 'Checkout',
    orders: 'My Orders',
    account: 'Account',
    home: 'Home',
    medicines: 'Medicines',
    subtotal: 'Subtotal',
    delivery: 'Delivery',
    freeDelivery: 'Free Delivery',
    total: 'Total',
    placeOrder: 'Place Order',
    orderSuccess: 'Order Placed Successfully!',
    emptyCart: 'Your cart is empty',
    alternatives: 'Alternatives',
    genericName: 'Generic Name',
    manufacturer: 'Manufacturer',
    stripOf: 'Strip of',
    mrp: 'MRP',
    youSave: 'You Save',
  },
  bn: {
    siteName: 'মেডিমার্ট',
    tagline: 'আপনার বিশ্বস্ত অনলাইন ফার্মেসি',
    searchPlaceholder: 'ওষুধ, জেনেরিক, কোম্পানি খুঁজুন...',
    addToCart: 'কার্টে যোগ করুন',
    buyNow: 'এখনই কিনুন',
    outOfStock: 'স্টক নেই',
    prescription: 'প্রেসক্রিপশন প্রয়োজন',
    discount: 'ছাড়',
    viewAll: 'সব দেখুন',
    categories: 'ক্যাটাগরি',
    featuredMeds: 'বিশেষ ওষুধ',
    topDeals: 'সেরা অফার',
    uploadPrescription: 'প্রেসক্রিপশন আপলোড',
    cart: 'কার্ট',
    checkout: 'চেকআউট',
    orders: 'আমার অর্ডার',
    account: 'অ্যাকাউন্ট',
    home: 'হোম',
    medicines: 'ওষুধ',
    subtotal: 'সাবটোটাল',
    delivery: 'ডেলিভারি',
    freeDelivery: 'বিনামূল্যে ডেলিভারি',
    total: 'মোট',
    placeOrder: 'অর্ডার করুন',
    orderSuccess: 'অর্ডার সফল হয়েছে!',
    emptyCart: 'কার্ট খালি',
    alternatives: 'বিকল্প ওষুধ',
    genericName: 'জেনেরিক নাম',
    manufacturer: 'নির্মাতা',
    stripOf: 'স্ট্রিপে',
    mrp: 'সর্বোচ্চ মূল্য',
    youSave: 'আপনি বাঁচাচ্ছেন',
  },
};

const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = (key) => strings[lang][key] ?? key;
  const toggleLang = () => setLang(l => l === 'en' ? 'bn' : 'en');

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
}
