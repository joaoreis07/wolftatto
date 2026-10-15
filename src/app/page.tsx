import { ArtistSection } from "@/components/ArtistSection";
import { BookingProcess } from "@/components/BookingProcess";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InfinitePortfolioGallery } from "@/components/InfinitePortfolioGallery";
import { Lightbox } from "@/components/Lightbox";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { SiteProvider } from "@/components/SiteProvider";
import { TattooStyles } from "@/components/TattooStyles";

export default function Page() {
  return (
    <SiteProvider>
      <a className="skip-link" href="#inicio">
        Ir para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <InfinitePortfolioGallery />
        <ArtistSection />
        <TattooStyles />
        <BookingProcess />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBookingBar />
      <Lightbox />
    </SiteProvider>
  );
}
