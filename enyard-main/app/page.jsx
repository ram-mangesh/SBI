import AboutPage from "@/components/About/About";
import ContactPage from "@/components/Contact/Contact";
import CoursesSection from "@/components/Courses/Courses";
import FAQSection from "@/components/Faqsection/Faq";
import CyberFooter from "@/components/Footer/Footer";
import HeroPage from "@/components/HeroPage/HeroPage";
import PricingSection from "@/components/Pricing/Pricing";
import TestimonialsSection from "@/components/Testimonial/Testimonial";

export default function Home() {
  return (
    <>
      <HeroPage />
      <FAQSection />
      <TestimonialsSection />
      <CoursesSection />
      <PricingSection />

      <AboutPage />
      <ContactPage />
      <CyberFooter />
    </>
  );
}
