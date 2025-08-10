import { Header } from '@/components/Header';
import { FooterNew as Footer } from '@/components/FooterNew';
import {
  HeroSection,
  CozyMemoryBook,
  AppPreviewSection,
  FeaturesSection,
  StatsSection,
  SocialProofSection,
  CTASection,
  FAQ,
} from '@/components/home';

export function HomePage() {
  return (
    <div style={{ backgroundColor: '#faf9f5' }}>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CozyMemoryBook />


      <CTASection />

      <Footer />
    </div>
  );
}