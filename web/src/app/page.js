import Link from 'next/link';
import { ArrowRight, Truck, Shield, Clock, Upload, Star } from 'lucide-react';
import MedicineCard from '@/components/medicine/MedicineCard';
import { medicines, categories } from '@/data/medicines';

export const metadata = {
  title: 'MediMart — Online Pharmacy Bangladesh | মেডিমার্ট',
};

const featuredMeds  = medicines.filter(m => m.stock && m.discount >= 11).slice(0, 8);
const topDeals      = [...medicines].sort((a, b) => b.discount - a.discount).slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-white/20 text-white text-xs font-600 px-3 py-1 rounded-full mb-4">
              Bangladesh's #1 Online Pharmacy 🇧🇩
            </span>
            <h1 className="font-display font-800 text-3xl md:text-5xl leading-tight mb-4">
              Genuine Medicines<br />Delivered to Your Door
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-lg">
              Order from 10,000+ medicines. Free delivery above ৳500. Bilingual support in English & বাংলা.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link href="/medicines" className="bg-white text-primary-700 hover:bg-gray-50 font-700 px-6 py-3 rounded-xl flex items-center gap-2 transition-colors">
                Shop Medicines <ArrowRight size={16} />
              </Link>
              <Link href="/medicines?upload=1" className="bg-primary-500 hover:bg-primary-400 text-white font-600 px-6 py-3 rounded-xl flex items-center gap-2 transition-colors">
                <Upload size={16} /> Upload Prescription
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 mt-10 justify-center md:justify-start text-white/80 text-sm">
              <span className="flex items-center gap-2"><Truck size={16} className="text-green-300" /> Same Day Delivery</span>
              <span className="flex items-center gap-2"><Shield size={16} className="text-green-300" /> 100% Genuine</span>
              <span className="flex items-center gap-2"><Clock size={16} className="text-green-300" /> 24/7 Support</span>
              <span className="flex items-center gap-2"><Star size={16} className="text-yellow-300" /> 4.8 ★ Rating</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden md:flex flex-col gap-3 flex-shrink-0">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5 w-64 border border-white/20">
              <p className="text-white/60 text-xs mb-2">Quick Stats</p>
              {[['10,000+', 'Medicines'], ['50,000+', 'Happy Customers'], ['Free', 'Delivery above ৳500']].map(([v, l]) => (
                <div key={l} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                  <span className="text-white/70 text-sm">{l}</span>
                  <span className="text-white font-700">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Payment methods ── */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-4 justify-center items-center text-sm text-gray-500">
          {['💳 bKash', '💳 Nagad', '💳 Rocket', '💳 Card (SSL)', '🤝 Cash on Delivery'].map(p => (
            <span key={p} className="font-500 text-gray-600">{p}</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">

        {/* ── Categories ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">Shop by Category</h2>
            <Link href="/medicines" className="text-primary-600 text-sm font-600 flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map(cat => (
              <Link key={cat.id} href={`/medicines?cat=${encodeURIComponent(cat.name)}`}
                className={`card p-4 flex flex-col items-center gap-2 text-center hover:border-primary-300 border-2 border-transparent ${cat.color}`}>
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-600 text-gray-700 leading-tight">{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.count}+</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Top deals banner ── */}
        <section className="bg-gradient-to-r from-accent to-orange-400 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white text-center md:text-left">
            <p className="text-white/80 text-sm font-500 mb-1">Limited Time Offers</p>
            <h3 className="font-display font-800 text-2xl md:text-3xl">Up to 20% OFF</h3>
            <p className="text-white/80 mt-1">On selected medicines today only!</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {topDeals.map(med => (
              <Link key={med.id} href={`/medicines/${med.slug}`}
                className="bg-white rounded-xl p-3 flex items-center gap-3 hover:shadow-md transition-shadow min-w-[180px]">
                <span className="text-2xl">💊</span>
                <div>
                  <p className="font-600 text-gray-900 text-sm">{med.name}</p>
                  <p className="text-accent font-700 text-sm">{med.discount}% OFF</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Featured medicines ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">Featured Medicines</h2>
            <Link href="/medicines" className="text-primary-600 text-sm font-600 flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {featuredMeds.map(med => (
              <MedicineCard key={med.id} medicine={med} />
            ))}
          </div>
        </section>

        {/* ── Upload prescription CTA ── */}
        <section className="bg-primary-50 border border-primary-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-700 text-xl text-gray-900 mb-2">Have a Prescription? 📋</h3>
            <p className="text-gray-600 text-sm max-w-md">
              Upload your prescription and our pharmacists will prepare and deliver your medicines. Safe, fast, and easy.
            </p>
          </div>
          <Link href="/medicines?upload=1"
            className="bg-primary-600 hover:bg-primary-700 text-white font-700 px-8 py-3.5 rounded-xl flex items-center gap-2 transition-colors flex-shrink-0">
            <Upload size={18} /> Upload Prescription
          </Link>
        </section>

        {/* ── Why MediMart ── */}
        <section>
          <h2 className="section-title text-center mb-8">Why Choose MediMart?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🏥', title: 'Licensed Pharmacy', desc: 'All medicines sourced from licensed manufacturers and distributors.' },
              { icon: '🚚', title: 'Fast Delivery',     desc: 'Same-day delivery in Dhaka. Next-day delivery across Bangladesh.' },
              { icon: '💰', title: 'Best Prices',       desc: 'Up to 20% discount on medicines. Free delivery above ৳500.' },
              { icon: '📱', title: 'Mobile App',        desc: 'Download our app on Android & iOS for the best experience.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-5 text-center">
                <span className="text-4xl block mb-3">{icon}</span>
                <h4 className="font-600 text-gray-900 mb-1">{title}</h4>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
