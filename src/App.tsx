import { useEffect, useState } from 'react';
import { SiteProvider, useSite } from '@/context/SiteContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Projects } from '@/components/Projects';
import { News } from '@/components/News';
import { Testimonials } from '@/components/Testimonials';
import { Partners } from '@/components/Partners';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { AdminPanel } from '@/components/AdminPanel';

function Website() {
  const { loading, data } = useSite();
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const checkHash = () => setShowAdmin(window.location.hash === '#admin');
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: data.design.backgroundColor }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl animate-pulse mx-auto mb-4" style={{ background: `linear-gradient(135deg, ${data.design.primaryColor}, ${data.design.accentColor})` }} />
          <p className="text-lg font-bold animate-pulse" style={{ color: data.design.textHeadingColor }}>
            {data.brand.nameEn}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <News />
        <Testimonials />
        <Partners />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      {showAdmin && <AdminPanel />}
    </>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <Website />
    </SiteProvider>
  );
}
