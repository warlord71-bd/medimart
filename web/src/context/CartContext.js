'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { calcTotal, calcDelivery } from '@/lib/utils';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mm_cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('mm_cart', JSON.stringify(items)); } catch {}
  }, [items]);

  const cartCount = items.reduce((s, i) => s + i.qty, 0);
  const subtotal  = calcTotal(items);
  const delivery  = calcDelivery(subtotal);
  const total     = subtotal + delivery;

  function addItem(medicine, qty = 1) {
    setItems(prev => {
      const existing = prev.find(i => i.id === medicine.id);
      if (existing) return prev.map(i => i.id === medicine.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...medicine, qty }];
    });
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function updateQty(id, qty) {
    if (qty <= 0) return removeItem(id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  function clearCart() { setItems([]); }

  return (
    <CartContext.Provider value={{ items, cartCount, subtotal, delivery, total, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
