import { useState } from 'react';
import { Lock, X, Save, Plus, Trash2, ChevronDown, ChevronRight, Eye, EyeOff, LogOut, Image as ImageIcon } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import type { SiteData } from '@/types/site';
import { DynamicIcon } from './DynamicIcon';

const ADMIN_PASSWORD = 'basheer-hanesh-2024';

export function AdminPanel() {
  const { data, saveData, isAdmin, setIsAdmin } = useSite();
  const [draft, setDraft] = useState<SiteData>(data);
  const [openSection, setOpenSection] = useState<string>('brand');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  const update = <K extends keyof SiteData>(key: K, value: SiteData[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const ok = await saveData(draft);
    setSaving(false);
    if (ok) {
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    }
  };

  if (!isAdmin) {
    return <LoginGate onLogin={() => setIsAdmin(true)} />;
  }

  const sections: { id: string; label: string; icon: string }[] = [
    { id: 'brand', label: 'Brand & Nav', icon: 'Building2' },
    { id: 'hero', label: 'Hero Section', icon: 'Home' },
    { id: 'about', label: 'About Us', icon: 'Info' },
    { id: 'services', label: 'Services', icon: 'Briefcase' },
    { id: 'projects', label: 'Projects', icon: 'FolderKanban' },
    { id: 'news', label: 'News', icon: 'Newspaper' },
    { id: 'testimonials', label: 'Testimonials', icon: 'Quote' },
    { id: 'partners', label: 'Partners', icon: 'Handshake' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle' },
    { id: 'contact', label: 'Contact & Social', icon: 'Mail' },
    { id: 'footer', label: 'Footer', icon: 'LayoutTemplate' },
    { id: 'design', label: 'Design & Colors', icon: 'Palette' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-slate-100 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-amber-400" />
          <h1 className="text-lg font-bold">Admin Panel — Basheer Hanesh</h1>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-green-400 text-sm font-medium animate-pulse">Saved successfully!</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors font-bold text-sm disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={() => { setIsAdmin(false); window.location.hash = ''; }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-bold text-sm"
          >
            <LogOut className="w-4 h-4" />
            Exit
          </button>
          <button
            onClick={() => { window.location.hash = ''; }}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <p className="text-slate-500 text-sm mb-6 bg-amber-50 border border-amber-200 rounded-lg p-3">
          Edit your website content below. Changes are saved to the database when you click "Save Changes". Both Arabic and English fields are provided for bilingual support.
        </p>

        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenSection(openSection === section.id ? '' : section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                    <DynamicIcon name={section.icon} className="w-5 h-5 text-slate-600" />
                  </div>
                  <span className="font-bold text-slate-800">{section.label}</span>
                </div>
                {openSection === section.id ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
              </button>

              {openSection === section.id && (
                <div className="p-6 border-t border-slate-100">
                  <SectionEditor section={section.id} draft={draft} update={update} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-amber-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Admin Access</h2>
          <p className="text-slate-500 mt-2">Enter your password to edit the website</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
              placeholder="Password"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">Incorrect password. Try again.</p>}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-amber-400 text-white font-bold hover:scale-[1.02] transition-transform"
          >
            Login
          </button>
        </form>
        <p className="text-xs text-slate-400 text-center mt-4">
          Default password: <code className="bg-slate-100 px-2 py-0.5 rounded">basheer-hanesh-2024</code>
        </p>
        <button
          onClick={() => { window.location.hash = ''; }}
          className="w-full text-center text-sm text-slate-500 hover:underline mt-4"
        >
          Back to website
        </button>
      </div>
    </div>
  );
}

type UpdateFn = <K extends keyof SiteData>(key: K, value: SiteData[K]) => void;

function SectionEditor({ section, draft, update }: { section: string; draft: SiteData; update: UpdateFn }) {
  switch (section) {
    case 'brand':
      return <BrandEditor draft={draft} update={update} />;
    case 'hero':
      return <HeroEditor draft={draft} update={update} />;
    case 'about':
      return <AboutEditor draft={draft} update={update} />;
    case 'services':
      return <ServicesEditor draft={draft} update={update} />;
    case 'projects':
      return <ProjectsEditor draft={draft} update={update} />;
    case 'news':
      return <NewsEditor draft={draft} update={update} />;
    case 'testimonials':
      return <TestimonialsEditor draft={draft} update={update} />;
    case 'partners':
      return <PartnersEditor draft={draft} update={update} />;
    case 'faq':
      return <FaqEditor draft={draft} update={update} />;
    case 'contact':
      return <ContactEditor draft={draft} update={update} />;
    case 'footer':
      return <FooterEditor draft={draft} update={update} />;
    case 'design':
      return <DesignEditor draft={draft} update={update} />;
    default:
      return null;
  }
}

/* ---- Reusable field components ---- */

function TextField({ label, value, onChange, dir }: { label: string; value: string; onChange: (v: string) => void; dir?: 'rtl' | 'ltr' }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={dir}
        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, dir }: { label: string; value: string; onChange: (v: string) => void; dir?: 'rtl' | 'ltr' }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={dir}
        rows={3}
        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm resize-y"
      />
    </div>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5">{label}</label>
      <div className="flex gap-3 items-start">
        <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-50">
          {value && <img src={value} alt="" className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            dir="ltr"
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 rounded-lg border border-slate-200 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir="ltr"
          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm font-mono"
        />
      </div>
    </div>
  );
}

function BilingualField({ label, ar, en, onChangeAr, onChangeEn, textarea }: {
  label: string; ar: string; en: string; onChangeAr: (v: string) => void; onChangeEn: (v: string) => void; textarea?: boolean;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {textarea ? (
        <>
          <TextArea label={`${label} (AR)`} value={ar} onChange={onChangeAr} dir="rtl" />
          <TextArea label={`${label} (EN)`} value={en} onChange={onChangeEn} dir="ltr" />
        </>
      ) : (
        <>
          <TextField label={`${label} (AR)`} value={ar} onChange={onChangeAr} dir="rtl" />
          <TextField label={`${label} (EN)`} value={en} onChange={onChangeEn} dir="ltr" />
        </>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100">{children}</h3>;
}

function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const popularIcons = ['Home', 'Building2', 'TrendingUp', 'Ruler', 'PencilRuler', 'Hammer', 'Award', 'Lightbulb', 'ShieldCheck', 'Clock', 'Star', 'Heart', 'MapPin', 'Phone', 'Mail', 'Send', 'Info', 'Briefcase', 'FolderKanban', 'Newspaper', 'Quote', 'Handshake', 'HelpCircle', 'Palette', 'Settings', 'Building', 'Camera', 'CheckCircle', 'Users', 'Zap'];
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5">Icon</label>
      <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-lg max-h-40 overflow-y-auto">
        {popularIcons.map((name) => (
          <button
            key={name}
            onClick={() => onChange(name)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${value === name ? 'bg-blue-600 text-white scale-110' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            title={name}
          >
            <DynamicIcon name={name} className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---- Section editors ---- */

function BrandEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  return (
    <div className="space-y-5">
      <SectionLabel>Brand Name</SectionLabel>
      <BilingualField label="Name" ar={draft.brand.nameAr} en={draft.brand.nameEn} onChangeAr={(v) => update('brand', { ...draft.brand, nameAr: v })} onChangeEn={(v) => update('brand', { ...draft.brand, nameEn: v })} />
      <BilingualField label="Subline" ar={draft.brand.sublineAr} en={draft.brand.sublineEn} onChangeAr={(v) => update('brand', { ...draft.brand, sublineAr: v })} onChangeEn={(v) => update('brand', { ...draft.brand, sublineEn: v })} />

      <SectionLabel>Navigation Tabs</SectionLabel>
      <div className="space-y-2">
        {draft.tabs.map((tab, i) => (
          <div key={tab.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <button
              onClick={() => update('tabs', draft.tabs.map((t, j) => j === i ? { ...t, visible: !t.visible } : t))}
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${tab.visible ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-400'}`}
            >
              {tab.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <span className="text-xs font-mono text-slate-400 w-16">{tab.id}</span>
            <input
              value={tab.nameAr}
              onChange={(e) => update('tabs', draft.tabs.map((t, j) => j === i ? { ...t, nameAr: e.target.value } : t))}
              dir="rtl"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm"
              placeholder="Arabic name"
            />
            <input
              value={tab.nameEn}
              onChange={(e) => update('tabs', draft.tabs.map((t, j) => j === i ? { ...t, nameEn: e.target.value } : t))}
              dir="ltr"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm"
              placeholder="English name"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  const h = draft.hero;
  const setH = (v: Partial<typeof h>) => update('hero', { ...h, ...v });
  return (
    <div className="space-y-5">
      <BilingualField label="Badge" ar={h.badgeAr} en={h.badgeEn} onChangeAr={(v) => setH({ badgeAr: v })} onChangeEn={(v) => setH({ badgeEn: v })} />
      <BilingualField label="Title Line 1" ar={h.line1Ar} en={h.line1En} onChangeAr={(v) => setH({ line1Ar: v })} onChangeEn={(v) => setH({ line1En: v })} />
      <BilingualField label="Title Line 2 (highlighted)" ar={h.line2Ar} en={h.line2En} onChangeAr={(v) => setH({ line2Ar: v })} onChangeEn={(v) => setH({ line2En: v })} />
      <BilingualField label="Title Line 3" ar={h.line3Ar} en={h.line3En} onChangeAr={(v) => setH({ line3Ar: v })} onChangeEn={(v) => setH({ line3En: v })} />
      <BilingualField label="Description" ar={h.descAr} en={h.descEn} onChangeAr={(v) => setH({ descAr: v })} onChangeEn={(v) => setH({ descEn: v })} textarea />
      <BilingualField label="Button 1" ar={h.button1Ar} en={h.button1En} onChangeAr={(v) => setH({ button1Ar: v })} onChangeEn={(v) => setH({ button1En: v })} />
      <BilingualField label="Button 2" ar={h.button2Ar} en={h.button2En} onChangeAr={(v) => setH({ button2Ar: v })} onChangeEn={(v) => setH({ button2En: v })} />

      <SectionLabel>Stats</SectionLabel>
      <div className="space-y-2">
        {h.stats.map((s, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg">
            <TextField label="Value" value={s.value} onChange={(v) => setH({ stats: h.stats.map((st, j) => j === i ? { ...st, value: v } : st) })} />
            <TextField label="Label AR" value={s.labelAr} onChange={(v) => setH({ stats: h.stats.map((st, j) => j === i ? { ...st, labelAr: v } : st) })} />
            <TextField label="Label EN" value={s.labelEn} onChange={(v) => setH({ stats: h.stats.map((st, j) => j === i ? { ...st, labelEn: v } : st) })} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  const a = draft.about;
  const setA = (v: Partial<typeof a>) => update('about', { ...a, ...v });
  return (
    <div className="space-y-5">
      <BilingualField label="Label" ar={a.labelAr} en={a.labelEn} onChangeAr={(v) => setA({ labelAr: v })} onChangeEn={(v) => setA({ labelEn: v })} />
      <BilingualField label="Title" ar={a.titleAr} en={a.titleEn} onChangeAr={(v) => setA({ titleAr: v })} onChangeEn={(v) => setA({ titleEn: v })} />
      <BilingualField label="Text" ar={a.textAr} en={a.textEn} onChangeAr={(v) => setA({ textAr: v })} onChangeEn={(v) => setA({ textEn: v })} textarea />
      <ImageField label="Image URL" value={a.image} onChange={(v) => setA({ image: v })} />

      <SectionLabel>Features</SectionLabel>
      <div className="space-y-3">
        {a.features.map((f, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Feature {i + 1}</span>
              <button onClick={() => setA({ features: a.features.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
            <IconPicker value={f.icon} onChange={(v) => setA({ features: a.features.map((fe, j) => j === i ? { ...fe, icon: v } : fe) })} />
            <BilingualField label="Title" ar={f.titleAr} en={f.titleEn} onChangeAr={(v) => setA({ features: a.features.map((fe, j) => j === i ? { ...fe, titleAr: v } : fe) })} onChangeEn={(v) => setA({ features: a.features.map((fe, j) => j === i ? { ...fe, titleEn: v } : fe) })} />
            <BilingualField label="Text" ar={f.textAr} en={f.textEn} onChangeAr={(v) => setA({ features: a.features.map((fe, j) => j === i ? { ...fe, textAr: v } : fe) })} onChangeEn={(v) => setA({ features: a.features.map((fe, j) => j === i ? { ...fe, textEn: v } : fe) })} />
          </div>
        ))}
        <button onClick={() => setA({ features: [...a.features, { icon: 'Star', titleAr: '', titleEn: '', textAr: '', textEn: '' }] })} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors">
          <Plus className="w-4 h-4" /> Add Feature
        </button>
      </div>
    </div>
  );
}

function ServicesEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  const s = draft.services;
  const setS = (v: typeof s) => update('services', v);
  return (
    <div className="space-y-3">
      {s.map((svc, i) => (
        <div key={i} className="p-4 bg-slate-50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Service {i + 1}</span>
            <button onClick={() => setS(s.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
          </div>
          <IconPicker value={svc.icon} onChange={(v) => setS(s.map((sv, j) => j === i ? { ...sv, icon: v } : sv))} />
          <div className="grid grid-cols-2 gap-3">
            <ColorField label="Color 1" value={svc.color1} onChange={(v) => setS(s.map((sv, j) => j === i ? { ...sv, color1: v } : sv))} />
            <ColorField label="Color 2" value={svc.color2} onChange={(v) => setS(s.map((sv, j) => j === i ? { ...sv, color2: v } : sv))} />
          </div>
          <BilingualField label="Title" ar={svc.titleAr} en={svc.titleEn} onChangeAr={(v) => setS(s.map((sv, j) => j === i ? { ...sv, titleAr: v } : sv))} onChangeEn={(v) => setS(s.map((sv, j) => j === i ? { ...sv, titleEn: v } : sv))} />
          <BilingualField label="Text" ar={svc.textAr} en={svc.textEn} onChangeAr={(v) => setS(s.map((sv, j) => j === i ? { ...sv, textAr: v } : sv))} onChangeEn={(v) => setS(s.map((sv, j) => j === i ? { ...sv, textEn: v } : sv))} textarea />
        </div>
      ))}
      <button onClick={() => setS([...s, { icon: 'Home', color1: '#2563eb', color2: '#1d4ed8', titleAr: '', titleEn: '', textAr: '', textEn: '' }])} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors">
        <Plus className="w-4 h-4" /> Add Service
      </button>
    </div>
  );
}

function ProjectsEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  const p = draft.projects;
  const setP = (v: typeof p) => update('projects', v);
  return (
    <div className="space-y-3">
      {p.map((proj, i) => (
        <div key={proj.id} className="p-4 bg-slate-50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Project {i + 1}</span>
            <button onClick={() => setP(p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
          </div>
          <BilingualField label="Title" ar={proj.titleAr} en={proj.titleEn} onChangeAr={(v) => setP(p.map((pr, j) => j === i ? { ...pr, titleAr: v } : pr))} onChangeEn={(v) => setP(p.map((pr, j) => j === i ? { ...pr, titleEn: v } : pr))} />
          <div className="grid grid-cols-3 gap-3">
            <TextField label="Category" value={proj.category} onChange={(v) => setP(p.map((pr, j) => j === i ? { ...pr, category: v } : pr))} />
            <TextField label="Client" value={proj.client} onChange={(v) => setP(p.map((pr, j) => j === i ? { ...pr, client: v } : pr))} />
            <TextField label="Date" value={proj.date} onChange={(v) => setP(p.map((pr, j) => j === i ? { ...pr, date: v } : pr))} />
          </div>
          <ImageField label="Image" value={proj.image} onChange={(v) => setP(p.map((pr, j) => j === i ? { ...pr, image: v } : pr))} />
          <BilingualField label="Description" ar={proj.descriptionAr} en={proj.descriptionEn} onChangeAr={(v) => setP(p.map((pr, j) => j === i ? { ...pr, descriptionAr: v } : pr))} onChangeEn={(v) => setP(p.map((pr, j) => j === i ? { ...pr, descriptionEn: v } : pr))} textarea />
          <TextField label="Technologies (comma-separated)" value={proj.technologies.join(', ')} onChange={(v) => setP(p.map((pr, j) => j === i ? { ...pr, technologies: v.split(',').map((s) => s.trim()) } : pr))} />
        </div>
      ))}
      <button onClick={() => setP([...p, { id: Date.now(), titleAr: '', titleEn: '', category: '', image: '', descriptionAr: '', descriptionEn: '', client: '', date: '', technologies: [] }])} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors">
        <Plus className="w-4 h-4" /> Add Project
      </button>
    </div>
  );
}

function NewsEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  const n = draft.news;
  const setN = (v: typeof n) => update('news', v);
  return (
    <div className="space-y-3">
      {n.map((item, i) => (
        <div key={item.id} className="p-4 bg-slate-50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">News {i + 1}</span>
            <button onClick={() => setN(n.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
          </div>
          <BilingualField label="Title" ar={item.titleAr} en={item.titleEn} onChangeAr={(v) => setN(n.map((it, j) => j === i ? { ...it, titleAr: v } : it))} onChangeEn={(v) => setN(n.map((it, j) => j === i ? { ...it, titleEn: v } : it))} />
          <TextField label="Date (YYYY-MM-DD)" value={item.date} onChange={(v) => setN(n.map((it, j) => j === i ? { ...it, date: v } : it))} />
          <ImageField label="Image" value={item.image} onChange={(v) => setN(n.map((it, j) => j === i ? { ...it, image: v } : it))} />
          <BilingualField label="Excerpt" ar={item.excerptAr} en={item.excerptEn} onChangeAr={(v) => setN(n.map((it, j) => j === i ? { ...it, excerptAr: v } : it))} onChangeEn={(v) => setN(n.map((it, j) => j === i ? { ...it, excerptEn: v } : it))} textarea />
        </div>
      ))}
      <button onClick={() => setN([...n, { id: Date.now(), titleAr: '', titleEn: '', date: new Date().toISOString().slice(0, 10), image: '', excerptAr: '', excerptEn: '' }])} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors">
        <Plus className="w-4 h-4" /> Add News Item
      </button>
    </div>
  );
}

function TestimonialsEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  const ts = draft.testimonials;
  const setT = (v: typeof ts) => update('testimonials', v);
  return (
    <div className="space-y-3">
      {ts.map((item, i) => (
        <div key={item.id} className="p-4 bg-slate-50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Testimonial {i + 1}</span>
            <button onClick={() => setT(ts.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
          </div>
          <BilingualField label="Name" ar={item.nameAr} en={item.nameEn} onChangeAr={(v) => setT(ts.map((it, j) => j === i ? { ...it, nameAr: v } : it))} onChangeEn={(v) => setT(ts.map((it, j) => j === i ? { ...it, nameEn: v } : it))} />
          <BilingualField label="Role" ar={item.roleAr} en={item.roleEn} onChangeAr={(v) => setT(ts.map((it, j) => j === i ? { ...it, roleAr: v } : it))} onChangeEn={(v) => setT(ts.map((it, j) => j === i ? { ...it, roleEn: v } : it))} />
          <TextField label="Company / Location" value={item.company} onChange={(v) => setT(ts.map((it, j) => j === i ? { ...it, company: v } : it))} />
          <ImageField label="Photo" value={item.image} onChange={(v) => setT(ts.map((it, j) => j === i ? { ...it, image: v } : it))} />
          <BilingualField label="Text" ar={item.textAr} en={item.textEn} onChangeAr={(v) => setT(ts.map((it, j) => j === i ? { ...it, textAr: v } : it))} onChangeEn={(v) => setT(ts.map((it, j) => j === i ? { ...it, textEn: v } : it))} textarea />
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((r) => (
              <button key={r} onClick={() => setT(ts.map((it, j) => j === i ? { ...it, rating: r } : it))} className={`py-2 rounded-lg text-sm font-bold ${item.rating === r ? 'bg-amber-400 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>{r} ★</button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={() => setT([...ts, { id: Date.now(), nameAr: '', nameEn: '', roleAr: '', roleEn: '', company: '', image: '', textAr: '', textEn: '', rating: 5 }])} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors">
        <Plus className="w-4 h-4" /> Add Testimonial
      </button>
    </div>
  );
}

function PartnersEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  const p = draft.partners;
  const setP = (v: typeof p) => update('partners', v);
  return (
    <div className="space-y-3">
      {p.map((partner, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0 bg-white">
            {partner.logo && <img src={partner.logo} alt="" className="w-full h-full object-contain p-1" />}
          </div>
          <input value={partner.name} onChange={(e) => setP(p.map((pr, j) => j === i ? { ...pr, name: e.target.value } : pr))} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="Partner name" />
          <input value={partner.logo} onChange={(e) => setP(p.map((pr, j) => j === i ? { ...pr, logo: e.target.value } : pr))} dir="ltr" className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="Logo URL" />
          <button onClick={() => setP(p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button onClick={() => setP([...p, { name: '', logo: '' }])} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors">
        <Plus className="w-4 h-4" /> Add Partner
      </button>
    </div>
  );
}

function FaqEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  const f = draft.faq;
  const setF = (v: typeof f) => update('faq', v);
  return (
    <div className="space-y-3">
      {f.map((item, i) => (
        <div key={item.id} className="p-4 bg-slate-50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Question {i + 1}</span>
            <button onClick={() => setF(f.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
          </div>
          <BilingualField label="Question" ar={item.questionAr} en={item.questionEn} onChangeAr={(v) => setF(f.map((it, j) => j === i ? { ...it, questionAr: v } : it))} onChangeEn={(v) => setF(f.map((it, j) => j === i ? { ...it, questionEn: v } : it))} />
          <BilingualField label="Answer" ar={item.answerAr} en={item.answerEn} onChangeAr={(v) => setF(f.map((it, j) => j === i ? { ...it, answerAr: v } : it))} onChangeEn={(v) => setF(f.map((it, j) => j === i ? { ...it, answerEn: v } : it))} textarea />
        </div>
      ))}
      <button onClick={() => setF([...f, { id: Date.now(), questionAr: '', questionEn: '', answerAr: '', answerEn: '' }])} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors">
        <Plus className="w-4 h-4" /> Add FAQ
      </button>
    </div>
  );
}

function ContactEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  const c = draft.contact;
  const setC = (v: Partial<typeof c>) => update('contact', { ...c, ...v });
  return (
    <div className="space-y-5">
      <SectionLabel>Contact Info</SectionLabel>
      <TextField label="Email" value={c.email} onChange={(v) => setC({ email: v })} />
      <TextField label="Phone" value={c.phone} onChange={(v) => setC({ phone: v })} />
      <BilingualField label="Address" ar={c.addressAr} en={c.addressEn} onChangeAr={(v) => setC({ addressAr: v })} onChangeEn={(v) => setC({ addressEn: v })} textarea />

      <SectionLabel>Social Media Links</SectionLabel>
      <TextField label="Facebook URL" value={c.facebook} onChange={(v) => setC({ facebook: v })} />
      <TextField label="Instagram URL" value={c.instagram} onChange={(v) => setC({ instagram: v })} />
      <TextField label="TikTok URL" value={c.tiktok} onChange={(v) => setC({ tiktok: v })} />
      <TextField label="Twitter / X URL" value={c.twitter} onChange={(v) => setC({ twitter: v })} />
      <TextField label="LinkedIn URL" value={c.linkedin} onChange={(v) => setC({ linkedin: v })} />

      <SectionLabel>Contact Form</SectionLabel>
      <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
        To receive contact form submissions by email, create a free form at <strong>formspree.io</strong> and paste your form endpoint URL below. If left empty, the form will simulate sending.
      </div>
      <TextField label="Formspree URL" value={c.formspreeUrl} onChange={(v) => setC({ formspreeUrl: v })} />
    </div>
  );
}

function FooterEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  const f = draft.footer;
  const setF = (v: Partial<typeof f>) => update('footer', { ...f, ...v });
  return (
    <div className="space-y-5">
      <BilingualField label="Description" ar={f.descriptionAr} en={f.descriptionEn} onChangeAr={(v) => setF({ descriptionAr: v })} onChangeEn={(v) => setF({ descriptionEn: v })} textarea />
      <BilingualField label="Copyright Text" ar={f.copyrightAr} en={f.copyrightEn} onChangeAr={(v) => setF({ copyrightAr: v })} onChangeEn={(v) => setF({ copyrightEn: v })} />
    </div>
  );
}

function FontField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const fonts = ['Cairo', 'Tajawal', 'Amiri', 'Almarai', 'Inter', 'Roboto', 'Montserrat', 'Playfair Display', 'Lato', 'Oswald'];
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm bg-white">
        {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
      </select>
    </div>
  );
}

function TextAlignField({ label, value, onChange }: { label: string; value: 'start' | 'center' | 'end'; onChange: (v: 'start' | 'center' | 'end') => void }) {
  const options: { v: 'start' | 'center' | 'end'; label: string; icon: string }[] = [
    { v: 'start', label: 'Start', icon: 'AlignStart' },
    { v: 'center', label: 'Center', icon: 'AlignCenter' },
    { v: 'end', label: 'End', icon: 'AlignEnd' },
  ];
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5">{label}</label>
      <div className="flex gap-2">
        {options.map((o) => (
          <button key={o.v} onClick={() => onChange(o.v)} className={`flex-1 py-2.5 rounded-lg text-sm font-bold border transition-all ${value === o.v ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DesignEditor({ draft, update }: { draft: SiteData; update: UpdateFn }) {
  const d = draft.design;
  const setD = (v: Partial<typeof d>) => update('design', { ...d, ...v });
  return (
    <div className="space-y-5">
      <SectionLabel>Colors</SectionLabel>
      <div className="grid sm:grid-cols-2 gap-4">
        <ColorField label="Primary Color" value={d.primaryColor} onChange={(v) => setD({ primaryColor: v })} />
        <ColorField label="Accent Color" value={d.accentColor} onChange={(v) => setD({ accentColor: v })} />
        <ColorField label="Background (Dark)" value={d.backgroundColor} onChange={(v) => setD({ backgroundColor: v })} />
        <ColorField label="Secondary (Light)" value={d.secondaryColor} onChange={(v) => setD({ secondaryColor: v })} />
      </div>

      <SectionLabel>Text Colors</SectionLabel>
      <div className="grid sm:grid-cols-2 gap-4">
        <ColorField label="Main Text" value={d.textMainColor} onChange={(v) => setD({ textMainColor: v })} />
        <ColorField label="Heading Text" value={d.textHeadingColor} onChange={(v) => setD({ textHeadingColor: v })} />
        <ColorField label="Muted Text" value={d.textMutedColor} onChange={(v) => setD({ textMutedColor: v })} />
        <ColorField label="Nav Text" value={d.textNavColor} onChange={(v) => setD({ textNavColor: v })} />
      </div>

      <SectionLabel>Fonts</SectionLabel>
      <div className="grid sm:grid-cols-2 gap-4">
        <FontField label="Arabic Body Font" value={d.fontAr} onChange={(v) => setD({ fontAr: v })} />
        <FontField label="English Body Font" value={d.fontEn} onChange={(v) => setD({ fontEn: v })} />
        <FontField label="Arabic Heading Font" value={d.headingFontAr} onChange={(v) => setD({ headingFontAr: v })} />
        <FontField label="English Heading Font" value={d.headingFontEn} onChange={(v) => setD({ headingFontEn: v })} />
      </div>

      <SectionLabel>Text Alignment</SectionLabel>
      <div className="grid sm:grid-cols-3 gap-4">
        <TextAlignField label="Hero Text" value={d.heroTextAlign} onChange={(v) => setD({ heroTextAlign: v })} />
        <TextAlignField label="Section Titles" value={d.sectionTitleAlign} onChange={(v) => setD({ sectionTitleAlign: v })} />
        <TextAlignField label="Body Text" value={d.bodyTextAlign} onChange={(v) => setD({ bodyTextAlign: v })} />
      </div>

      <SectionLabel>Per-Section Style Overrides</SectionLabel>
      <p className="text-xs text-slate-400 mb-3">Customize font size, color, and background for each section independently. Leave values at 0 or empty to use the global defaults.</p>
      <SectionStyleEditor design={d} setD={setD} />

      <SectionLabel>Hero Background</SectionLabel>
      <ImageField label="Background Image URL" value={d.backgroundImage} onChange={(v) => setD({ backgroundImage: v })} />
      <div>
        <label className="block text-xs font-bold text-slate-600 mb-1.5">Background Overlay: {d.backgroundOverlay}%</label>
        <input type="range" min="0" max="100" value={d.backgroundOverlay} onChange={(e) => setD({ backgroundOverlay: Number(e.target.value) })} className="w-full accent-blue-600" />
      </div>
    </div>
  );
}

function SectionStyleEditor({ design, setD }: { design: SiteData['design']; setD: (v: Partial<SiteData['design']>) => void }) {
  type SectionKey = import('@/types/site').SectionKey;
  const sections: { key: SectionKey; label: string }[] = [
    { key: 'about', label: 'About' },
    { key: 'services', label: 'Services' },
    { key: 'projects', label: 'Projects' },
    { key: 'news', label: 'News' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'partners', label: 'Partners' },
    { key: 'faq', label: 'FAQ' },
    { key: 'contact', label: 'Contact' },
  ];
  const [expanded, setExpanded] = useState<string | null>('about');
  const fonts = ['Cairo', 'Tajawal', 'Amiri', 'Almarai', 'Inter', 'Roboto', 'Montserrat', 'Playfair Display', 'Lato', 'Oswald'];

  const updateStyle = (key: SectionKey, field: string, value: string | number) => {
    const current = design.sectionStyles?.[key] ?? { titleFontSize: 0, titleColor: '', titleFontAr: '', titleFontEn: '', bodyFontSize: 0, bodyColor: '', bgColor: '' };
    setD({ sectionStyles: { ...design.sectionStyles, [key]: { ...current, [field]: value } } });
  };

  return (
    <div className="space-y-2">
      {sections.map((sec) => {
        const ss = design.sectionStyles?.[sec.key] ?? { titleFontSize: 0, titleColor: '', titleFontAr: '', titleFontEn: '', bodyFontSize: 0, bodyColor: '', bgColor: '' };
        const isOpen = expanded === sec.key;
        return (
          <div key={sec.key} className="border border-slate-200 rounded-lg overflow-hidden">
            <button onClick={() => setExpanded(isOpen ? null : sec.key)} className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors">
              <span className="text-sm font-bold text-slate-700">{sec.label}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="p-4 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Title Font Size (rem, 0=default)</label>
                    <input type="number" step="0.1" min="0" max="6" value={ss.titleFontSize || ''} onChange={(e) => updateStyle(sec.key, 'titleFontSize', Number(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="0" />
                  </div>
                  <ColorField label="Title Color (empty=default)" value={ss.titleColor || '#0f172a'} onChange={(v) => updateStyle(sec.key, 'titleColor', v)} />
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Title Font (AR)</label>
                    <select value={ss.titleFontAr || ''} onChange={(e) => updateStyle(sec.key, 'titleFontAr', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                      <option value="">Default</option>
                      {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Title Font (EN)</label>
                    <select value={ss.titleFontEn || ''} onChange={(e) => updateStyle(sec.key, 'titleFontEn', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                      <option value="">Default</option>
                      {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Body Font Size (rem, 0=default)</label>
                    <input type="number" step="0.1" min="0" max="4" value={ss.bodyFontSize || ''} onChange={(e) => updateStyle(sec.key, 'bodyFontSize', Number(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="0" />
                  </div>
                  <ColorField label="Body Color (empty=default)" value={ss.bodyColor || '#64748b'} onChange={(v) => updateStyle(sec.key, 'bodyColor', v)} />
                  <ColorField label="Section Background (empty=default)" value={ss.bgColor || '#f1f5f9'} onChange={(v) => updateStyle(sec.key, 'bgColor', v)} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
