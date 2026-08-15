import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { resolveTitleFont, resolveTitleColor, resolveTitleFontSize, resolveBodyColor, resolveBodyFontSize, resolveBgColor, hexToRgba } from '@/lib/styleUtils';

export function FAQ() {
  const { data, t, lang } = useSite();
  const { faq, design } = data;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24" style={{ background: resolveBgColor(design, 'faq', '#ffffff') }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12" style={{ textAlign: design.sectionTitleAlign }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: hexToRgba(design.primaryColor, 0.1), color: design.primaryColor }}>
            {t('الأسئلة الشائعة', 'FAQ')}
          </span>
          <h2 className="font-extrabold mb-4" style={{ fontSize: resolveTitleFontSize(design, 'faq', 2.5), color: resolveTitleColor(design, 'faq'), fontFamily: resolveTitleFont(design, 'faq', lang) }}>
            {t('إجابات على استفساراتكم', 'Answers to Your Questions')}
          </h2>
        </div>
        <div className="space-y-4">
          {faq.map((item) => {
            const isOpen = open === item.id;
            return (
              <div key={item.id} className="rounded-2xl border-2 transition-all overflow-hidden"
                style={{ borderColor: isOpen ? design.primaryColor : '#e2e8f0', background: isOpen ? hexToRgba(design.primaryColor, 0.03) : '#fff' }}>
                <button onClick={() => setOpen(isOpen ? null : item.id)} className="w-full flex items-center justify-between gap-4 p-5 text-start">
                  <span className="font-bold text-slate-900 text-lg">{t(item.questionAr, item.questionEn)}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} style={{ color: design.primaryColor }} />
                </button>
                <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? '300px' : '0px' }}>
                  <p className="px-5 pb-5 leading-relaxed" style={{ fontSize: resolveBodyFontSize(design, 'faq', 1.125), color: resolveBodyColor(design, 'faq', '#475569') }}>{t(item.answerAr, item.answerEn)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
