import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <span className="text-6xl">💊</span>
      <h1 className="font-display font-800 text-3xl text-gray-900 mt-4 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" className="btn-primary inline-flex">Go Home</Link>
    </div>
  );
}
