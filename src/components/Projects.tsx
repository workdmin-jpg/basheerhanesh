import { useState } from 'react';
import { X, Calendar, User, Wrench } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { resolveTitleFont, resolveTitleColor, resolveTitleFontSize, resolveBgColor, hexToRgba } from '@/lib/styleUtils';

export function Projects() {
  const { data, t, lang } = useSite();
  const { projects, design } = data;
  const [selected, setSelected] = useState<number | null>(null);

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const project = selected !== null ? projects.find((p) => p.id === selected) : null;

  return (
    <section id="projects" className="py-24" style={{ background: resolveBgColor(design, 'projects', '#ffffff') }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12" style={{ textAlign: design.sectionTitleAlign }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: hexToRgba(design.primaryColor, 0.1), color: design.primaryColor }}>
            {t('مشاريعنا', 'Our Projects')}
          </span>
          <h2 className="font-extrabold mb-4" style={{ fontSize: resolveTitleFontSize(design, 'projects', 2.5), color: resolveTitleColor(design, 'projects'), fontFamily: resolveTitleFont(design, 'projects', lang) }}>
            {t('أحدث مشاريعنا المميزة', 'Our Latest Featured Projects')}
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className="px-5 py-2 rounded-full text-sm font-bold transition-all"
              style={filter === cat ? { background: design.primaryColor, color: '#fff' } : { background: '#f1f5f9', color: '#64748b' }}>
              {cat === 'all' ? t('الكل', 'All') : cat}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((p) => (
            <div key={p.id} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all hover:shadow-2xl" onClick={() => setSelected(p.id)}>
              <img src={p.image} alt={t(p.titleAr, p.titleEn)} className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: design.accentColor, color: '#0f172a' }}>{p.category}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{t(p.titleAr, p.titleEn)}</h3>
                <p className="text-white/70 text-sm line-clamp-2">{t(p.descriptionAr, p.descriptionEn)}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: design.accentColor }}>
                  {t('عرض التفاصيل', 'View Details')}<span className="rtl:rotate-180">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {project && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={project.image} alt={t(project.titleAr, project.titleEn)} className="w-full h-72 object-cover rounded-t-2xl" />
              <button onClick={() => setSelected(null)} className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>
            <div className="p-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: hexToRgba(design.primaryColor, 0.1), color: design.primaryColor }}>{project.category}</span>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{t(project.titleAr, project.titleEn)}</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">{t(project.descriptionAr, project.descriptionEn)}</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">
                  <User className="w-5 h-5 text-slate-400" />
                  <div><div className="text-xs text-slate-400">{t('العميل', 'Client')}</div><div className="font-bold text-slate-700">{project.client}</div></div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div><div className="text-xs text-slate-400">{t('التاريخ', 'Date')}</div><div className="font-bold text-slate-700">{project.date}</div></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: hexToRgba(design.primaryColor, 0.08), color: design.primaryColor }}>
                    <Wrench className="w-3.5 h-3.5" />{tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
