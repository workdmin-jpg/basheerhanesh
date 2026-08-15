import { useState, useEffect } from 'react';
import { Menu, X, Globe, Building2, Settings } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export function Navbar() {
  const { data, lang, setLang, t, isAdmin } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visibleTabs = data.tabs.filter((tab) => tab.visible);
  const primary = data.design.primaryColor;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${primary}, ${data.design.accentColor})` }}
              >
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-start">
                <div className="text-white font-bold text-lg tracking-wide leading-tight">
                  {t(data.brand.nameAr, data.brand.nameEn)}
                </div>
                <div className="text-xs leading-tight" style={{ color: data.design.textMutedColor }}>
                  {t(data.brand.sublineAr, data.brand.sublineEn)}
                </div>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {visibleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollTo(tab.id)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
                  style={{ color: data.design.textNavColor }}
                >
                  {t(tab.nameAr, tab.nameEn)}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
                style={{ color: data.design.textNavColor }}
              >
                <Globe className="w-4 h-4" />
                {lang === 'ar' ? 'EN' : 'ع'}
              </button>
              <button
                onClick={() => { window.location.hash = 'admin'; }}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
                style={{ color: data.design.textNavColor }}
                title="Admin"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
                style={{ color: data.design.textNavColor }}
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(15, 23, 42, 0.98)' }}>
          <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                className="text-2xl font-bold text-white py-3 px-8 rounded-xl hover:bg-white/10 transition-all"
              >
                {t(tab.nameAr, tab.nameEn)}
              </button>
            ))}
            <button
              onClick={() => { setOpen(false); window.location.hash = 'admin'; }}
              className="text-lg text-white/60 py-2"
            >
              {isAdmin ? 'Admin Panel' : 'Admin'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
