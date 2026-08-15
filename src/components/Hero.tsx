import { ArrowRight, Play } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export function Hero() {
  const { data, lang, t } = useSite();
  const { hero, design } = data;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={design.backgroundImage}
          alt="hero bg"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${hexToRgba(design.backgroundColor, design.backgroundOverlay / 100)} 0%, ${hexToRgba(design.primaryColor, 0.5)} 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl" style={{ textAlign: design.heroTextAlign }}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-[fadeInUp_0.6s_ease-out]"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: `1px solid ${hexToRgba(design.accentColor, 0.4)}`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: design.accentColor }} />
            <span className="text-sm font-medium" style={{ color: design.textMainColor }}>
              {t(hero.badgeAr, hero.badgeEn)}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 animate-[fadeInUp_0.8s_ease-out]"
            style={{ color: design.textHeadingColor }}
          >
            {t(hero.line1Ar, hero.line1En)}{' '}
            <span style={{ color: design.accentColor }}>
              {t(hero.line2Ar, hero.line2En)}
            </span>{' '}
            {t(hero.line3Ar, hero.line3En)}
          </h1>

          {/* Description */}
          <p
            className="text-lg sm:text-xl mb-8 max-w-2xl leading-relaxed animate-[fadeInUp_1s_ease-out]"
            style={{ color: design.textMainColor }}
          >
            {t(hero.descAr, hero.descEn)}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-16 animate-[fadeInUp_1.2s_ease-out]" style={{ justifyContent: design.heroTextAlign === 'center' ? 'center' : design.heroTextAlign === 'end' ? 'flex-end' : 'flex-start' }}>
            <button
              onClick={() => scrollTo('projects')}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${design.primaryColor}, ${design.accentColor})` }}
            >
              {t(hero.button1Ar, hero.button1En)}
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: design.textHeadingColor,
                backdropFilter: 'blur(8px)',
              }}
            >
              <Play className="w-5 h-5" />
              {t(hero.button2Ar, hero.button2En)}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-[fadeInUp_1.4s_ease-out]">
            {hero.stats.map((stat, i) => (
              <div key={i} style={{ textAlign: design.heroTextAlign }}>
                <div className="text-4xl font-extrabold mb-1" style={{ color: design.accentColor }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: design.textMutedColor }}>
                  {t(stat.labelAr, stat.labelEn)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
