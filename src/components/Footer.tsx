import { Building2, Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export function Footer() {
  const { data, t } = useSite();
  const { footer, brand, contact, tabs, design } = data;
  const visibleTabs = tabs.filter((tab) => tab.visible);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socials = [
    { icon: Facebook, url: contact.facebook },
    { icon: Instagram, url: contact.instagram },
    { icon: Twitter, url: contact.twitter },
    { icon: Linkedin, url: contact.linkedin },
  ].filter((s) => s.url);

  return (
    <footer style={{ background: design.backgroundColor }} className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${design.primaryColor}, ${design.accentColor})` }}
              >
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg" style={{ color: design.textHeadingColor }}>
                  {t(brand.nameAr, brand.nameEn)}
                </div>
                <div className="text-xs" style={{ color: design.textMutedColor }}>
                  {t(brand.sublineAr, brand.sublineEn)}
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: design.textMutedColor }}>
              {t(footer.descriptionAr, footer.descriptionEn)}
            </p>
            {socials.length > 0 && (
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.1)', color: design.textMainColor }}
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: design.textHeadingColor }}>
              {t('روابط سريعة', 'Quick Links')}
            </h4>
            <ul className="space-y-3">
              {visibleTabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => scrollTo(tab.id)}
                    className="text-sm transition-colors hover:translate-x-1 rtl:hover:-translate-x-1 duration-200"
                    style={{ color: design.textMutedColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = design.accentColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = design.textMutedColor)}
                  >
                    {t(tab.nameAr, tab.nameEn)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: design.textHeadingColor }}>
              {t('معلومات التواصل', 'Contact Info')}
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: design.textMutedColor }}>
              <li className="flex items-start gap-2">
                <span className="mt-1">{t('📍', '📍')}</span>
                <span>{t(contact.addressAr, contact.addressEn)}</span>
              </li>
              <li>
                <a href={`tel:${contact.phone}`} className="hover:underline" dir="ltr" style={{ color: design.textMutedColor }}>
                  📞 {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:underline" style={{ color: design.textMutedColor }}>
                  ✉️ {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <p className="text-sm text-center" style={{ color: design.textMutedColor }}>
            {t(footer.copyrightAr, footer.copyrightEn)} © {new Date().getFullYear()}
          </p>
          <p className="text-sm flex items-center gap-1.5" style={{ color: design.textMutedColor }}>
            {t('صُنع بـ', 'Made with')} <Heart className="w-4 h-4" style={{ color: design.accentColor, fill: design.accentColor }} /> {t('في مصر', 'in Egypt')}
          </p>
        </div>
      </div>
    </footer>
  );
}
