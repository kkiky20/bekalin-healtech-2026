import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { TrustIndicators } from "@/components/landing/TrustIndicators";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { SmartDecision } from "@/components/landing/SmartDecision";
import { AppRoles } from "@/components/landing/AppRoles";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BenefitSection } from "@/components/landing/BenefitSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <TrustIndicators />
        <ProblemSection />
        <SolutionSection />
        <FeatureSection />
        <SmartDecision />
        <AppRoles />
        <ProductShowcase />
        <HowItWorks />
        <BenefitSection />
        <FaqSection />
        <CtaSection />
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
