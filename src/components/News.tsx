import { Calendar, ArrowRight } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { resolveTitleFont, resolveTitleColor, resolveTitleFontSize, resolveBodyColor, resolveBodyFontSize, resolveBgColor, hexToRgba } from '@/lib/styleUtils';

export function News() {
  const { data, t, lang } = useSite();
  const { news, design } = data;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="news" className="py-24" style={{ background: resolveBgColor(design, 'news', '#f1f5f9') }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16" style={{ textAlign: design.sectionTitleAlign }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: hexToRgba(design.primaryColor, 0.1), color: design.primaryColor }}>
            {t('الأخبار', 'News')}
          </span>
          <h2 className="font-extrabold mb-4" style={{ fontSize: resolveTitleFontSize(design, 'news', 2.5), color: resolveTitleColor(design, 'news'), fontFamily: resolveTitleFont(design, 'news', lang) }}>
            {t('أحدث الأخبار والفعاليات', 'Latest News & Events')}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative overflow-hidden h-56">
                <img src={item.image} alt={t(item.titleAr, item.titleEn)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 start-4 px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5" style={{ background: hexToRgba(design.primaryColor, 0.9), backdropFilter: 'blur(4px)' }}>
                  <Calendar className="w-3.5 h-3.5" />{formatDate(item.date)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug" style={{ color: design.primaryColor }}>{t(item.titleAr, item.titleEn)}</h3>
                <p className="text-slate-500 leading-relaxed mb-4 line-clamp-3" style={{ fontSize: resolveBodyFontSize(design, 'news', 1), color: resolveBodyColor(design, 'news', '#64748b') }}>{t(item.excerptAr, item.excerptEn)}</p>
                <button className="flex items-center gap-2 text-sm font-bold transition-all" style={{ color: design.primaryColor }}>
                  {t('اقرأ المزيد', 'Read More')}
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
