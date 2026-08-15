import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { SiteData, Lang } from '@/types/site';
import { defaultSiteData } from '@/data/defaultSiteData';
import { supabase } from '@/lib/supabase';

interface SiteContextValue {
  data: SiteData;
  lang: Lang;
  setLang: (lang: Lang) => void;
  loading: boolean;
  saveData: (newData: SiteData) => Promise<boolean>;
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
  t: (ar: string, en: string) => string;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [lang, setLangState] = useState<Lang>('ar');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: row } = await supabase
        .from('site_content')
        .select('data')
        .eq('key', 'main')
        .maybeSingle();
      if (!cancelled) {
        if (row?.data) {
          const merged = deepMerge(defaultSiteData, row.data as Partial<SiteData>);
          setData(merged as SiteData);
        } else {
          await supabase.from('site_content').insert({ key: 'main', data: defaultSiteData });
        }
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const saveData = useCallback(async (newData: SiteData): Promise<boolean> => {
    const { error } = await supabase
      .from('site_content')
      .update({ data: newData, updated_at: new Date().toISOString() })
      .eq('key', 'main');
    if (error) {
      const { error: insertError } = await supabase
        .from('site_content')
        .insert({ key: 'main', data: newData });
      if (insertError) return false;
    }
    setData(newData);
    return true;
  }, []);

  useEffect(() => {
    const d = data.design;
    const root = document.documentElement;
    root.style.setProperty('--font-ar', `'${d.fontAr}', sans-serif`);
    root.style.setProperty('--font-en', `'${d.fontEn}', sans-serif`);
    root.style.setProperty('--font-heading-ar', `'${d.headingFontAr}', sans-serif`);
    root.style.setProperty('--font-heading-en', `'${d.headingFontEn}', sans-serif`);
  }, [data.design]);

  const t = useCallback((ar: string, en: string) => (lang === 'ar' ? ar : en), [lang]);

  return (
    <SiteContext.Provider value={{ data, lang, setLang, loading, saveData, isAdmin, setIsAdmin, t }}>
      {children}
    </SiteContext.Provider>
  );
}

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (typeof base !== 'object' || base === null || Array.isArray(base)) {
    return (override ?? base) as T;
  }
  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const key of Object.keys(override as Record<string, unknown>)) {
    const bVal = (base as Record<string, unknown>)[key];
    const oVal = (override as Record<string, unknown>)[key];
    if (oVal === undefined || oVal === null) continue;
    if (typeof bVal === 'object' && bVal !== null && !Array.isArray(bVal) && typeof oVal === 'object' && oVal !== null) {
      result[key] = deepMerge(bVal, oVal as Record<string, unknown>);
    } else {
      result[key] = oVal;
    }
  }
  return result as T;
}
