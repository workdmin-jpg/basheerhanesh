import { useSite } from '@/context/SiteContext';
import { DynamicIcon } from './DynamicIcon';
import { resolveTitleFont, resolveTitleColor, resolveTitleFontSize, resolveBodyColor, resolveBodyFontSize, resolveBgColor, hexToRgba } from '@/lib/styleUtils';

export function About() {
  const { data, t, lang } = useSite();
  const { about, design } = data;

  return (
    <section id="about" className="py-24 relative" style={{ background: resolveBgColor(design, 'about', design.secondaryColor) }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -top-6 -start-6 w-32 h-32 rounded-2xl opacity-20" style={{ background: design.primaryColor }} />
            <div className="absolute -bottom-6 -end-6 w-32 h-32 rounded-full opacity-20" style={{ background: design.accentColor }} />
            <img
              src={about.image}
              alt={t(about.titleAr, about.titleEn)}
              className="relative rounded-2xl shadow-2xl w-full object-cover"
              style={{ maxHeight: '500px' }}
            />
            <div className="absolute bottom-8 start-8 px-6 py-4 rounded-xl shadow-xl backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.95)' }}>
              <div className="text-3xl font-extrabold" style={{ color: design.primaryColor }}>+20</div>
              <div className="text-sm text-slate-600">{t('سنوات خبرة', 'Years Experience')}</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div style={{ textAlign: design.sectionTitleAlign }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-base font-bold mb-4" style={{ background: hexToRgba(design.primaryColor, 0.1), color: design.primaryColor }}>
                {t(about.labelAr, about.labelEn)}
              </span>
              <h2 className="font-extrabold mb-6 leading-tight" style={{ fontSize: resolveTitleFontSize(design, 'about', 2.25), color: resolveTitleColor(design, 'about'), fontFamily: resolveTitleFont(design, 'about', lang) }}>
                {t(about.titleAr, about.titleEn)}
              </h2>
            </div>
            <p className="leading-relaxed mb-8" style={{ textAlign: design.bodyTextAlign, fontSize: resolveBodyFontSize(design, 'about', 1.125), color: resolveBodyColor(design, 'about', '#475569') }}>
              {t(about.textAr, about.textEn)}
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {about.features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl transition-all hover:shadow-lg bg-white border border-slate-100">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hexToRgba(design.primaryColor, 0.1) }}>
                    <DynamicIcon name={f.icon} className="w-6 h-6" style={{ color: design.primaryColor }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{t(f.titleAr, f.titleEn)}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{t(f.textAr, f.textEn)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
