import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { resolveTitleFont, resolveTitleColor, resolveTitleFontSize, resolveBodyColor, resolveBodyFontSize, resolveBgColor, hexToRgba } from '@/lib/styleUtils';

export function Testimonials() {
  const { data, t, lang } = useSite();
  const { testimonials, design } = data;
  const [active, setActive] = useState(0);

  if (testimonials.length === 0) return null;

  const next = () => setActive((active + 1) % testimonials.length);
  const prev = () => setActive((active - 1 + testimonials.length) % testimonials.length);
  const current = testimonials[active];

  const bg = resolveBgColor(design, 'testimonials', '');
  const sectionBg = bg || `linear-gradient(135deg, ${design.backgroundColor}, ${hexToRgba(design.primaryColor, 0.8)})`;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden" style={{ background: sectionBg }}>
      <div className="absolute top-10 start-10 opacity-10">
        <Quote className="w-32 h-32 text-white" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12" style={{ textAlign: design.sectionTitleAlign }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
            {t('آراء العملاء', 'Testimonials')}
          </span>
          <h2 className="font-extrabold mb-4" style={{ fontSize: resolveTitleFontSize(design, 'testimonials', 2.5), color: resolveTitleColor(design, 'testimonials') || '#fff', fontFamily: resolveTitleFont(design, 'testimonials', lang) }}>
            {t('ماذا يقول عملاؤنا', 'What Our Clients Say')}
          </h2>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="flex gap-1 mb-6 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-6 h-6" style={{ color: i < current.rating ? design.accentColor : 'rgba(255,255,255,0.2)', fill: i < current.rating ? design.accentColor : 'transparent' }} />
            ))}
          </div>
          <p className="text-center leading-relaxed mb-8 italic" style={{ fontSize: resolveBodyFontSize(design, 'testimonials', 1.25), color: resolveBodyColor(design, 'testimonials', 'rgba(255,255,255,0.9)') }}>
            "{t(current.textAr, current.textEn)}"
          </p>
          <div className="flex items-center justify-center gap-4">
            <img src={current.image} alt={t(current.nameAr, current.nameEn)} className="w-16 h-16 rounded-full object-cover border-2" style={{ borderColor: design.accentColor }} />
            <div className="text-center">
              <div className="font-bold text-white text-lg">{t(current.nameAr, current.nameEn)}</div>
              <div className="text-sm text-white/60">{t(current.roleAr, current.roleEn)} — {current.company}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
            {lang === 'ar' ? <ChevronRight className="w-5 h-5 text-white" /> : <ChevronLeft className="w-5 h-5 text-white" />}
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className="transition-all rounded-full"
                style={{ width: i === active ? '32px' : '8px', height: '8px', background: i === active ? design.accentColor : 'rgba(255,255,255,0.3)' }} />
            ))}
          </div>
          <button onClick={next} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
            {lang === 'ar' ? <ChevronLeft className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>
    </section>
  );
}
