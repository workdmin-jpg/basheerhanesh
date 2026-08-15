import type { Design, SectionKey, SectionStyle, Lang } from '@/types/site';

export function getSectionStyle(design: Design, key: SectionKey): SectionStyle {
  return design.sectionStyles?.[key] ?? { titleFontSize: 0, titleColor: '', titleFontAr: '', titleFontEn: '', bodyFontSize: 0, bodyColor: '', bgColor: '' };
}

export function resolveTitleFont(design: Design, key: SectionKey, lang: Lang): string {
  const ss = getSectionStyle(design, key);
  const font = lang === 'ar' ? (ss.titleFontAr || design.headingFontAr) : (ss.titleFontEn || design.headingFontEn);
  return `'${font}', sans-serif`;
}

export function resolveTitleColor(design: Design, key: SectionKey): string {
  const ss = getSectionStyle(design, key);
  return ss.titleColor || '#0f172a';
}

export function resolveTitleFontSize(design: Design, key: SectionKey, defaultRem: number): string {
  const ss = getSectionStyle(design, key);
  const size = ss.titleFontSize > 0 ? ss.titleFontSize : defaultRem;
  return `${size}rem`;
}

export function resolveBodyColor(design: Design, key: SectionKey, fallback: string): string {
  const ss = getSectionStyle(design, key);
  return ss.bodyColor || fallback;
}

export function resolveBodyFontSize(design: Design, key: SectionKey, defaultRem: number): string {
  const ss = getSectionStyle(design, key);
  const size = ss.bodyFontSize > 0 ? ss.bodyFontSize : defaultRem;
  return `${size}rem`;
}

export function resolveBgColor(design: Design, key: SectionKey, fallback: string): string {
  const ss = getSectionStyle(design, key);
  return ss.bgColor || fallback;
}

export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
