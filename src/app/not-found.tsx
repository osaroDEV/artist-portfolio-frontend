import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center">
      <h2 className="text-6xl md:text-8xl font-light italic opacity-20">404</h2>
      <div className="space-y-4">
        <p className="text-xl font-serif">Page not found.</p>
        <Link 
          href="/" 
          className="inline-block text-[10px] uppercase tracking-widest border-b border-brand-charcoal/40 pb-1 hover:border-brand-charcoal transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
