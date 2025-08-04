import { Header } from '@/components/Header';
import { FooterNew as Footer } from '@/components/FooterNew';
import {
  HeroSection,
  TimelinePreviewSection,
  AppPreviewSection,
  FeaturesSection,
  StatsSection,
  SocialProofSection,
  CTASection,
  FAQ,
} from '@/components/home';

export function HomePage() {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TimelinePreviewSection />
      <AppPreviewSection />
      <StatsSection />
      <SocialProofSection />
      <FAQ />


      <CTASection />

      <Footer />
    </div>
  );
}