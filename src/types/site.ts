export interface Tab {
  id: string;
  nameAr: string;
  nameEn: string;
  visible: boolean;
}

export interface HeroStat {
  value: string;
  labelAr: string;
  labelEn: string;
}

export interface Hero {
  badgeAr: string;
  badgeEn: string;
  line1Ar: string;
  line1En: string;
  line2Ar: string;
  line2En: string;
  line3Ar: string;
  line3En: string;
  descAr: string;
  descEn: string;
  button1Ar: string;
  button1En: string;
  button2Ar: string;
  button2En: string;
  stats: HeroStat[];
}

export interface AboutFeature {
  icon: string;
  titleAr: string;
  titleEn: string;
  textAr: string;
  textEn: string;
}

export interface About {
  labelAr: string;
  labelEn: string;
  titleAr: string;
  titleEn: string;
  textAr: string;
  textEn: string;
  image: string;
  features: AboutFeature[];
}

export interface Service {
  icon: string;
  color1: string;
  color2: string;
  titleAr: string;
  titleEn: string;
  textAr: string;
  textEn: string;
}

export interface Project {
  id: number;
  titleAr: string;
  titleEn: string;
  category: string;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
  client: string;
  date: string;
  technologies: string[];
}

export interface NewsItem {
  id: number;
  titleAr: string;
  titleEn: string;
  date: string;
  image: string;
  excerptAr: string;
  excerptEn: string;
}

export interface Testimonial {
  id: number;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  company: string;
  image: string;
  textAr: string;
  textEn: string;
  rating: number;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface FaqItem {
  id: number;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export interface Contact {
  email: string;
  phone: string;
  addressAr: string;
  addressEn: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  twitter: string;
  linkedin: string;
  formspreeUrl: string;
}

export interface Footer {
  descriptionAr: string;
  descriptionEn: string;
  copyrightAr: string;
  copyrightEn: string;
}

export interface SectionStyle {
  titleFontSize: number;
  titleColor: string;
  titleFontAr: string;
  titleFontEn: string;
  bodyFontSize: number;
  bodyColor: string;
  bgColor: string;
}

export type SectionKey = 'about' | 'services' | 'projects' | 'news' | 'testimonials' | 'partners' | 'faq' | 'contact';

export interface Design {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  backgroundImage: string;
  backgroundSize: string;
  backgroundOverlay: number;
  textMainColor: string;
  textHeadingColor: string;
  textMutedColor: string;
  textNavColor: string;
  fontAr: string;
  fontEn: string;
  headingFontAr: string;
  headingFontEn: string;
  heroTextAlign: 'start' | 'center' | 'end';
  sectionTitleAlign: 'start' | 'center' | 'end';
  bodyTextAlign: 'start' | 'center' | 'end';
  sectionStyles: Record<SectionKey, SectionStyle>;
}

export interface Brand {
  nameAr: string;
  nameEn: string;
  sublineAr: string;
  sublineEn: string;
}

export interface SiteData {
  brand: Brand;
  tabs: Tab[];
  hero: Hero;
  about: About;
  services: Service[];
  projects: Project[];
  news: NewsItem[];
  testimonials: Testimonial[];
  partners: Partner[];
  faq: FaqItem[];
  contact: Contact;
  footer: Footer;
  design: Design;
}

export type Lang = 'ar' | 'en';

export const DEFAULT_SECTION_STYLE: SectionStyle = {
  titleFontSize: 0,
  titleColor: '',
  titleFontAr: '',
  titleFontEn: '',
  bodyFontSize: 0,
  bodyColor: '',
  bgColor: '',
};
