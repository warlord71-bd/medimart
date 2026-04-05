'use client';
import { useState } from 'react';
import { Search, Package, CheckCircle, Truck, Clock } from 'lucide-react';

const MOCK_ORDERS = [
  {
    id: 'MM-2024-0042', date: '2024-12-10', status: 'delivered', total: 245,
    items: [{ name: 'Napa Extra', qty: 2 }, { name: 'Seclo 20', qty: 1 }],
    steps: [
      { label: 'Order Placed',   done: true,  time: '10:05 AM' },
      { label: 'Confirmed',      done: true,  time: '10:12 AM' },
      { label: 'Out for Delivery', done: true, time: '01:30 PM' },
      { label: 'Delivered',      done: true,  time: '03:45 PM' },
    ],
  },
  {
    id: 'MM-2024-0041', date: '2024-12-09', status: 'out_for_delivery', total: 120,
    items: [{ name: 'Ciprocin 500', qty: 1 }],
    steps: [
      { label: 'Order Placed',   done: true,  time: '09:00 AM' },
      { label: 'Confirmed',      done: true,  time: '09:15 AM' },
      { label: 'Out for Delivery', done: true, time: '12:00 PM' },
      { label: 'Delivered',      done: false, time: null },
    ],
  },
];

const STATUS_STYLES = {
  delivered:        { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Delivered'         },
  out_for_delivery: { bg: 'bg-blue-100',   text: 'text-blue-700',   label: 'Out for Delivery'  },
  confirmed:        { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Confirmed'         },
  placed:           { bg: 'bg-gray-100',   text: 'text-gray-700',   label: 'Order Placed'      },
};

export default function OrdersPage() {
  const [trackId, setTrackId] = useState('');
  const [tracked, setTracked] = useState(null);
  const [notFound, setNotFound] = useState(false);

  function handleTrack(e) {
    e.preventDefault();
    const found = MOCK_ORDERS.find(o => o.id.toLowerCase() === trackId.trim().toLowerCase());
    if (found) { setTracked(found); setNotFound(false); }
    else { setTracked(null); setNotFound(true); }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-display font-700 text-2xl text-gray-900 mb-6">Track My Order</h1>

      {/* Track by ID */}
      <form onSubmit={handleTrack} className="card p-5 mb-8">
        <label className="text-sm font-600 text-gray-700 mb-2 block">Enter Order ID</label>
        <div className="flex gap-3">
          <input
            value={trackId}
            onChange={e => setTrackId(e.target.value)}
            placeholder="e.g. MM-2024-0042"
            className="input flex-1"
          />
          <button type="submit" className="btn-primary flex items-center gap-2 px-5 flex-shrink-0">
            <Search size={16} /> Track
          </button>
        </div>
        {notFound && <p className="text-red-500 text-sm mt-2">Order not found. Please check your order ID.</p>}
      </form>

      {/* Tracked order */}
      {tracked && (
        <div className="card p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-700 text-gray-900 text-lg">{tracked.id}</p>
              <p className="text-gray-500 text-sm">{tracked.date}</p>
            </div>
            <span className={`text-sm font-600 px-3 py-1 rounded-full ${STATUS_STYLES[tracked.status]?.bg} ${STATUS_STYLES[tracked.status]?.text}`}>
              {STATUS_STYLES[tracked.status]?.label}
            </span>
          </div>

          {/* Step tracker */}
          <div className="relative">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200" />
            <div className="space-y-4">
              {tracked.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10
                    ${step.done ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {i === 0 ? <Package size={14} /> : i === 2 ? <Truck size={14} /> : i === 3 ? <CheckCircle size={14} /> : <Clock size={14} />}
                  </div>
                  <div className="pt-1">
                    <p className={`text-sm font-600 ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                    {step.time && <p className="text-xs text-gray-400 mt-0.5">{step.time}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent orders */}
      <h2 className="font-700 text-gray-900 mb-4">Recent Orders</h2>
      <div className="space-y-4">
        {MOCK_ORDERS.map(order => {
          const s = STATUS_STYLES[order.status];
          return (
            <div key={order.id} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-700 text-gray-900">{order.id}</p>
                  <p className="text-gray-500 text-xs">{order.date}</p>
                </div>
                <span className={`text-xs font-600 px-2.5 py-1 rounded-full ${s?.bg} ${s?.text}`}>{s?.label}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {order.items.map(i => `${i.name} ×${i.qty}`).join(', ')}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-700 text-primary-600">৳{order.total}</span>
                <button onClick={() => setTracked(order)} className="text-sm text-primary-600 hover:text-primary-700 font-600">
                  Track Order →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
