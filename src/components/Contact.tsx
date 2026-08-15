import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { resolveTitleFont, resolveTitleColor, resolveTitleFontSize, resolveBodyColor, resolveBodyFontSize, resolveBgColor, hexToRgba } from '@/lib/styleUtils';

export function Contact() {
  const { data, t, lang } = useSite();
  const { contact, design } = data;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      if (contact.formspreeUrl) {
        const res = await fetch(contact.formspreeUrl, { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error('Failed to send');
      } else {
        await new Promise((r) => setTimeout(r, 800));
      }
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError(t('حدث خطأ، يرجى المحاولة مرة أخرى', 'An error occurred, please try again'));
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { icon: Facebook, url: contact.facebook, label: 'Facebook' },
    { icon: Instagram, url: contact.instagram, label: 'Instagram' },
    { icon: Twitter, url: contact.twitter, label: 'Twitter' },
    { icon: Linkedin, url: contact.linkedin, label: 'LinkedIn' },
  ].filter((s) => s.url);

  return (
    <section id="contact" className="py-24" style={{ background: resolveBgColor(design, 'contact', '#f1f5f9') }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16" style={{ textAlign: design.sectionTitleAlign }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: hexToRgba(design.primaryColor, 0.1), color: design.primaryColor }}>
            {t('تواصل معنا', 'Contact Us')}
          </span>
          <h2 className="font-extrabold mb-4" style={{ fontSize: resolveTitleFontSize(design, 'contact', 2.5), color: resolveTitleColor(design, 'contact'), fontFamily: resolveTitleFont(design, 'contact', lang) }}>
            {t('نحن هنا لمساعدتك', 'We Are Here to Help')}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto" style={{ fontSize: resolveBodyFontSize(design, 'contact', 1.125), color: resolveBodyColor(design, 'contact', '#64748b') }}>
            {t('تواصل معنا للحصول على استشارة مجانية', 'Contact us for a free consultation')}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hexToRgba(design.primaryColor, 0.1) }}>
                <MapPin className="w-6 h-6" style={{ color: design.primaryColor }} />
              </div>
              <div><h3 className="font-bold text-slate-900 mb-1">{t('العنوان', 'Address')}</h3><p className="text-slate-500 leading-relaxed">{t(contact.addressAr, contact.addressEn)}</p></div>
            </div>
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hexToRgba(design.primaryColor, 0.1) }}>
                <Phone className="w-6 h-6" style={{ color: design.primaryColor }} />
              </div>
              <div><h3 className="font-bold text-slate-900 mb-1">{t('الهاتف', 'Phone')}</h3><a href={`tel:${contact.phone}`} className="text-slate-500 hover:underline" dir="ltr">{contact.phone}</a></div>
            </div>
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hexToRgba(design.primaryColor, 0.1) }}>
                <Mail className="w-6 h-6" style={{ color: design.primaryColor }} />
              </div>
              <div><h3 className="font-bold text-slate-900 mb-1">{t('البريد الإلكتروني', 'Email')}</h3><a href={`mailto:${contact.email}`} className="text-slate-500 hover:underline">{contact.email}</a></div>
            </div>
            {socials.length > 0 && (
              <div className="flex gap-3 pt-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{ background: hexToRgba(design.primaryColor, 0.1), color: design.primaryColor }} aria-label={s.label}>
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: hexToRgba(design.primaryColor, 0.1) }}>
                  <Send className="w-8 h-8" style={{ color: design.primaryColor }} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('تم إرسال رسالتك بنجاح', 'Your Message Was Sent Successfully')}</h3>
                <p className="text-slate-500">{t('سنرد عليك في أقرب وقت ممكن', 'We will reply as soon as possible')}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t('الاسم', 'Name')}</label>
                    <input name="name" required className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-transparent focus:ring-2 outline-none transition-all" style={{ '--tw-ring-color': design.primaryColor } as React.CSSProperties} placeholder={t('أدخل اسمك', 'Enter your name')} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t('الهاتف', 'Phone')}</label>
                    <input name="phone" required dir="ltr" className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-transparent focus:ring-2 outline-none transition-all" style={{ '--tw-ring-color': design.primaryColor } as React.CSSProperties} placeholder="+967 1 000 0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('البريد الإلكتروني', 'Email')}</label>
                  <input name="email" type="email" required dir="ltr" className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-transparent focus:ring-2 outline-none transition-all" style={{ '--tw-ring-color': design.primaryColor } as React.CSSProperties} placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('الرسالة', 'Message')}</label>
                  <textarea name="message" required rows={5} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-transparent focus:ring-2 outline-none transition-all resize-none" style={{ '--tw-ring-color': design.primaryColor } as React.CSSProperties} placeholder={t('اكتب رسالتك هنا...', 'Write your message here...')} />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60" style={{ background: `linear-gradient(135deg, ${design.primaryColor}, ${design.accentColor})` }}>
                  {sending ? <span className="animate-pulse">{t('جاري الإرسال...', 'Sending...')}</span> : <><Send className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />{t('إرسال الرسالة', 'Send Message')}</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
