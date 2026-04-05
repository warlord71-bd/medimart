import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: { default: 'MediMart — Online Pharmacy Bangladesh', template: '%s | MediMart' },
  description: 'Order genuine medicines online in Bangladesh. Fast delivery, bilingual support. Powered by medimart.com.bd',
  keywords: ['online pharmacy', 'medicine', 'Bangladesh', 'Dhaka', 'মেডিমার্ট'],
  openGraph: {
    title: 'MediMart — Online Pharmacy Bangladesh',
    description: 'Order genuine medicines online. Fast delivery across Bangladesh.',
    url: 'https://medimart.com.bd',
    siteName: 'MediMart',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 2500,
                style: { fontFamily: 'Inter, sans-serif', fontSize: 14 },
                success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
              }}
            />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
