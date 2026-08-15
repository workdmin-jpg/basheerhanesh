import { useSite } from '@/context/SiteContext';
import { DynamicIcon } from './DynamicIcon';
import { resolveTitleFont, resolveTitleColor, resolveTitleFontSize, resolveBodyColor, resolveBodyFontSize, resolveBgColor, hexToRgba } from '@/lib/styleUtils';

export function Services() {
  const { data, t, lang } = useSite();
  const { services, design } = data;

  return (
    <section id="services" className="py-24" style={{ background: resolveBgColor(design, 'services', '#f1f5f9') }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16" style={{ textAlign: design.sectionTitleAlign }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: hexToRgba(design.primaryColor, 0.1), color: design.primaryColor }}>
            {t('خدماتنا', 'Our Services')}
          </span>
          <h2 className="font-extrabold mb-4" style={{ fontSize: resolveTitleFontSize(design, 'services', 2.5), color: resolveTitleColor(design, 'services'), fontFamily: resolveTitleFont(design, 'services', lang) }}>
            {t('ماذا نقدم لكم', 'What We Offer')}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto" style={{ fontSize: resolveBodyFontSize(design, 'services', 1.125), color: resolveBodyColor(design, 'services', '#64748b') }}>
            {t('نقدم باقة متكاملة من خدمات المقاولات والاستيراد لتلبية جميع احتياجاتكم', 'We offer an integrated suite of contracting and import services to meet all your needs')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="group relative bg-white rounded-2xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl border border-slate-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 -translate-y-20 translate-x-20" style={{ background: `linear-gradient(135deg, ${s.color1}, ${s.color2})` }} />
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3" style={{ background: `linear-gradient(135deg, ${s.color1}, ${s.color2})` }}>
                <DynamicIcon name={s.icon} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t(s.titleAr, s.titleEn)}</h3>
              <p className="text-slate-500 leading-relaxed">{t(s.textAr, s.textEn)}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: s.color1 }}>
                {t('اعرف المزيد', 'Learn More')}
                <span className="rtl:rotate-180">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
