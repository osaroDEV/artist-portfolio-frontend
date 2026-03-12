export default function Loading() {
  return (
    <div className="fixed inset-0 bg-brand-cream z-100 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-light italic animate-pulse opacity-40">Ella Becker</h2>
        <div className="h-px w-12 bg-brand-charcoal opacity-10" />
      </div>
    </div>
  );
}
