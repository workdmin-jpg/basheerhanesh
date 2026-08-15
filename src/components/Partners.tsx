import { useSite } from '@/context/SiteContext';

export function Partners() {
  const { data, t } = useSite();
  const { partners, design } = data;

  if (partners.length === 0) return null;

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-slate-400 font-bold text-sm uppercase tracking-wider mb-10">
          {t('شركاؤنا', 'Our Partners')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partners.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center p-6 rounded-xl hover:shadow-lg transition-all grayscale hover:grayscale-0"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-20 max-w-full object-contain rounded-lg"
                style={{ filter: 'opacity(0.7)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
