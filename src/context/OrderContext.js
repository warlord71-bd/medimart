import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const placeOrder = (cartItems, total) => {
    const order = {
      id: 'MM-' + (1000 + orders.length + 1),
      items: cartItems,
      total,
      status: 'confirmed',
      date: new Date().toISOString(),
      steps: ['confirmed', 'preparing', 'onTheWay', 'delivered'],
      currentStep: 0,
    };
    setOrders(prev => [order, ...prev]);
    return order;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be within OrderProvider');
  return ctx;
};
