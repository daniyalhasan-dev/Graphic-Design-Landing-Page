import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import paypalQr from "@/assets/paypal-qr.png";
import { InlinePortfolioVideo } from "@/components/InlinePortfolioVideo";
import { Button } from "@/components/ui/button";
import { portfolioCollections, projects } from "@/data/projects";

const LazyHeroFilmReel = lazy(() =>
  import("@/components/HeroFilmReel").then(({ HeroFilmReel: component }) => ({
    default: component,
  })),
);

function HeroFilmReelPlaceholder() {
  return (
    <div className="hero-reel" aria-hidden="true">
      <div className="hero-reel-orbit" />
      <div className="hero-reel-canvas" />
    </div>
  );
}

function DeferredHeroFilmReel() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShouldLoad(true), 1000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!shouldLoad) return <HeroFilmReelPlaceholder />;

  return (
    <Suspense fallback={<HeroFilmReelPlaceholder />}>
      <LazyHeroFilmReel />
    </Suspense>
  );
}

const PAYPAL_URL = "https://www.paypal.com/qrcodes/managed/11d670dc-a53c-4a2a-933f-c102175b77d7?utm_source=consapp_download";
const CASH_APP_URL = "https://cash.app/$SyedAbdullah16";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Video Editing & Motion Design Portfolio" },
      { name: "description", content: "A curated portfolio of reels, short-form and long-form edits, and motion graphics." },
      { property: "og:title", content: "Video Editing & Motion Design Portfolio" },
      { property: "og:description", content: "Selected video editing and motion design work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-shell">
      <nav className={`site-nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Main navigation">
        <a href="#top" className="wordmark" aria-label="Portfolio, home">PORTFOLIO<span>.</span></a>
        <div className={`nav-links ${mobileOpen ? "is-open" : ""}`}>
          <a href="#work" onClick={() => setMobileOpen(false)}>Work</a>
          <a href="#payments" onClick={() => setMobileOpen(false)}>Payments</a>
        </div>
        <Button className="mobile-menu" variant="ghost" size="icon" type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen((open) => !open)}>
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </nav>

      <header id="top" className="portfolio-intro">
        <div className="intro-copy hero-sequence">
          <p className="hero-kicker">GRAPHIC DESIGN / VISUAL IDENTITY</p>
          <h1>DESIGN. CREATE.<br />AND <em>inspire.</em></h1>
          <p className="intro-note">Bold visuals and creative designs that leave a lasting impression.</p>
        </div>
        <DeferredHeroFilmReel />
        <a className="scroll-cue" href="#work"><span>Explore work</span><ArrowDown aria-hidden="true" /></a>
      </header>

      <main id="work" className="portfolio-work">
        <header className="archive-header reveal-on-scroll">
          <p>Selected work / 2026</p>
          <h2>Watch the work.<br /><em>Feel the cut.</em></h2>
          <span>{String(projects.length).padStart(2, "0")} films</span>
        </header>

        {portfolioCollections.map((collection, collectionIndex) => (
          <section className="work-collection reveal-on-scroll" key={collection.title}>
            <header className="collection-header">
              <span>{collection.number}</span>
              <h2>{collection.title}</h2>
              <p>{collection.note}</p>
            </header>
            <div className={`collection-grid ${collection.projects[0]?.aspectRatio === "landscape" ? "is-landscape" : ""}`}>
              {collection.projects.map((project, projectIndex) => (
                <InlinePortfolioVideo key={project.id} project={project} priority={collectionIndex === 0 && projectIndex < 2} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <section id="payments" className="paypal-section reveal-on-scroll">
        <div className="paypal-copy">
          <span className="eyebrow">Payment methods</span>
          <h2>Scan.<br /><em>Pay. Go.</em></h2>
          <p>Scan the code for PayPal, or choose a secure payment link.</p>
          <div className="payment-links">
            <a className="paypal-link" href={PAYPAL_URL} target="_blank" rel="noreferrer">Open PayPal <ArrowUpRight aria-hidden="true" /></a>
            <a className="paypal-link" href={CASH_APP_URL} target="_blank" rel="noreferrer">Open Cash App <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <a className="paypal-qr" href={PAYPAL_URL} target="_blank" rel="noreferrer" aria-label="Open PayPal payment link">
          <img src={paypalQr} alt="PayPal QR code" />
        </a>
      </section>

      <footer className="site-footer reveal-on-scroll">
        <strong>PORTFOLIO.</strong>
        <a href="#top">Back to top <ArrowUpRight aria-hidden="true" /></a>
        <span>© 2026</span>
      </footer>
    </div>
  );
}