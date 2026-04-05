import React, { createContext, useContext, useReducer, useMemo } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const med = action.med;
      const existing = state.find(i => i.id === med.id);
      if (existing) {
        return state.map(i => i.id === med.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...state, { id: med.id, name: med.name, generic: med.generic, company: med.company, type: med.type, price: med.price, mrp: med.mrp, strip: med.strip, img: med.img, qty: 1 }];
    }
    case 'REMOVE': return state.filter(i => i.id !== action.id);
    case 'UPDATE_QTY':
      if (action.qty <= 0) return state.filter(i => i.id !== action.id);
      return state.map(i => i.id === action.id ? { ...i, qty: action.qty } : i);
    case 'CLEAR': return [];
    default: return state;
  }
};

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, []);
  const addToCart = (med) => dispatch({ type: 'ADD', med });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', id });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const cartTotal = useMemo(() => items.reduce((s, i) => s + i.price * i.strip * i.qty, 0), [items]);
  const cartCount = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be within CartProvider');
  return ctx;
};
