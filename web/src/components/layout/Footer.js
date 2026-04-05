import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-display font-800 text-lg">M</div>
            <span className="text-white font-display font-700 text-xl">MediMart</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Bangladesh's trusted online pharmacy. Genuine medicines, fast delivery, 24/7 support.
          </p>
          <p className="text-sm text-gray-400 mt-3">মেডিমার্ট — আপনার বিশ্বস্ত অনলাইন ফার্মেসি</p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-600 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/',            label: 'Home'              },
              { href: '/medicines',   label: 'All Medicines'     },
              { href: '/cart',        label: 'My Cart'           },
              { href: '/orders',      label: 'Track Order'       },
              { href: '/account',     label: 'My Account'        },
            ].map(({ href, label }) => (
              <li key={href}><Link href={href} className="hover:text-primary-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-600 mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            {['Pain Relief','Gastric','Antibiotic','Blood Pressure','Vitamins','Diabetes'].map(cat => (
              <li key={cat}>
                <Link href={`/medicines?cat=${encodeURIComponent(cat)}`}
                  className="hover:text-primary-400 transition-colors">{cat}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-600 mb-3">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone size={15} className="mt-0.5 text-primary-400 flex-shrink-0" /> Hotline: 16516</li>
            <li className="flex items-start gap-2"><Mail size={15} className="mt-0.5 text-primary-400 flex-shrink-0" /> info@medimart.com.bd</li>
            <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 text-primary-400 flex-shrink-0" /> Dhaka, Bangladesh</li>
          </ul>
          <div className="mt-4 flex gap-2 flex-wrap">
            {['bKash', 'Nagad', 'SSLCommerz', 'Cash on Delivery'].map(p => (
              <span key={p} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-lg">{p}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2">
        <span>© {new Date().getFullYear()} MediMart. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
          <Link href="/terms"   className="hover:text-gray-300">Terms of Use</Link>
          <Link href="/refund"  className="hover:text-gray-300">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}
