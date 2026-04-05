import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount) {
  return `৳${Number(amount).toFixed(2)}`;
}

export function calcStripPrice(medicine) {
  return medicine.price * medicine.strip;
}

export function calcTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.strip * item.qty, 0);
}

export function calcDelivery(subtotal) {
  if (subtotal === 0) return 0;
  if (subtotal >= 500) return 0;   // free above ৳500
  return 60;                        // flat ৳60
}
