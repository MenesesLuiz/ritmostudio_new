"use client";

import { useEffect, useRef, useState } from "react";
import {
  AboutSection,
  ContactSection,
  GallerySection,
  HeroSection,
  ManifestoSection,
  ReelsSection,
  ServicesSection,
  SiteFooter,
  SiteNavigation,
  VideoLightbox,
  WhatsAppFloat,
  WorksSection,
} from "@/components/ritmo-sections";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Language = "pt" | "en" | "es";

type Translation = {
  n1: string;
  n2: string;
  n3: string;
  n4: string;
  n5: string;
  kicker: string;
  hero_p: string;
  scroll: string;
  manifesto: string;
  mani_l: string;
  mani_r: string;
  w_k: string;
  w_h: string;
  w_p: string;
  r_p1: string;
  r_p2: string;
  s_k: string;
  s_h: string;
  s_p: string;
  s1: string;
  s1d: string;
  s2: string;
  s2d: string;
  s3: string;
  s3d: string;
  s4: string;
  s4d: string;
  s5: string;
  s5d: string;
  f_h: string;
  f_p: string;
  f_cta: string;
  a_h: string;
  a_p: string;
  a_v: string;
  c_h: string;
  c_p: string;
  c_loc: string;
  foot: string;
};

const translations: Record<Language, Translation> = {
  pt: {
    n1: "Trabalhos",
    n2: "Serviços",
    n3: "Fotos",
    n4: "Sobre",
    n5: "Contato",
    kicker: "Audiovisual de impacto · Santa Catarina, Brasil",
    hero_p:
      "Tudo tem seu ritmo. O nosso é criar. Aftermovies, live sets e conteúdo audiovisual para eventos e artistas que querem ser sentidos, não apenas vistos.",
    scroll: "Scroll",
    manifesto:
      "Tudo tem seu ritmo. O nosso é criar. Cada luz, cada batida, cada olhar vira um frame que faz você sentir que estava lá.",
    mani_l: "Captação · Edição · Cor · Som",
    mani_r: "Eventos · Artistas · Marcas",
    w_k: "01 — Portfólio",
    w_h: "Trabalhos<br>selecionados",
    w_p: "Alguns projetos editados e filmados recentemente. Clique para assistir.",
    r_p1: "Direto do",
    r_p2: "Toque para assistir.",
    s_k: "03 — O que eu faço",
    s_h: "Serviços",
    s_p: "Do set à entrega final. Captação, edição, cor e som — tudo com identidade.",
    s1: "Live sets",
    s1d: "Gravação multicâmera e edição sincronizada com o áudio, pronta para YouTube e redes.",
    s2: "Aftermovies",
    s2d: "Festivais, festas e shows resumidos em um vídeo com energia, ritmo e narrativa.",
    s3: "Creative videos",
    s3d: "Reels, teasers e vídeos conceituais pensados para artistas e marcas se destacarem.",
    s4: "Drops multicam",
    s4d: "Os melhores momentos do set em cortes multicâmera rápidos, feitos para viralizar.",
    s5: "Mini documentaries",
    s5d: "Histórias curtas sobre artistas, eventos e bastidores, com olhar cinematográfico.",
    f_h: "Fotos &amp; bastidores",
    f_p: "Frames e registros direto do Instagram",
    f_cta: "Ver mais no Instagram",
    a_h: "Cada frame<br>tem um <span>ritmo</span>",
    a_p: "Ritmo Studio é um estúdio de audiovisual baseado em Santa Catarina, Brasil. Trabalho com música eletrônica, festivais e artistas, capturando a energia do momento e transformando em vídeos que fazem quem assiste sentir que estava lá. Da captação à cor final, cuido de cada etapa do processo.",
    a_v: "Já passou por",
    c_h: "Vamos <span>criar</span><br>algo juntos?",
    c_p: "Conte sobre o seu projeto — evento, live set, clipe ou conteúdo. Respondo rápido pelo WhatsApp.",
    c_loc: "📍 SANTA CATARINA · BRASIL · DISPONÍVEL PARA VIAGENS",
    foot: "Filmmaker · Editor · Brasil",
  },
  en: {
    n1: "Work",
    n2: "Services",
    n3: "Photos",
    n4: "About",
    n5: "Contact",
    kicker: "High-impact audiovisual · Santa Catarina, Brazil",
    hero_p:
      "Everything has its rhythm. Ours is to create. Aftermovies, live sets and audiovisual content for events and artists who want to be felt, not just seen.",
    scroll: "Scroll",
    manifesto:
      "Everything has its rhythm. Ours is to create. Every light, every beat, every glance becomes a frame that makes you feel you were there.",
    mani_l: "Shooting · Editing · Color · Sound",
    mani_r: "Events · Artists · Brands",
    w_k: "01 — Portfolio",
    w_h: "Selected<br>work",
    w_p: "Some recently shot and edited projects. Click to watch.",
    r_p1: "Straight from",
    r_p2: "Tap to watch.",
    s_k: "03 — What we do",
    s_h: "Services",
    s_p: "From the set to final delivery. Shooting, editing, color and sound — all with identity.",
    s1: "Live sets",
    s1d: "Multicam recording and audio-synced editing, ready for YouTube and social media.",
    s2: "Aftermovies",
    s2d: "Festivals, parties and shows condensed into one video full of energy, rhythm and story.",
    s3: "Creative videos",
    s3d: "Reels, teasers and concept videos designed to make artists and brands stand out.",
    s4: "Drops multicam",
    s4d: "The best moments of the set in fast multicam cuts, made to go viral.",
    s5: "Mini documentaries",
    s5d: "Short stories about artists, events and backstage life, with a cinematic eye.",
    f_h: "Photos &amp; backstage",
    f_p: "Frames and moments straight from Instagram",
    f_cta: "See more on Instagram",
    a_h: "Every frame<br>has a <span>rhythm</span>",
    a_p: "Ritmo Studio is an audiovisual studio based in Santa Catarina, Brazil. We work with electronic music, festivals and artists, capturing the energy of the moment and turning it into videos that make viewers feel they were there. From shooting to final color, we handle every step of the process.",
    a_v: "Featured at",
    c_h: "Let's <span>create</span><br>something together?",
    c_p: "Tell us about your project — event, live set, music video or content. We reply fast on WhatsApp.",
    c_loc: "📍 SANTA CATARINA · BRAZIL · AVAILABLE FOR TRAVEL",
    foot: "Filmmaker · Editor · Brazil",
  },
  es: {
    n1: "Trabajos",
    n2: "Servicios",
    n3: "Fotos",
    n4: "Sobre",
    n5: "Contacto",
    kicker: "Audiovisual de impacto · Santa Catarina, Brasil",
    hero_p:
      "Todo tiene su ritmo. El nuestro es crear. Aftermovies, live sets y contenido audiovisual para eventos y artistas que quieren ser sentidos, no solo vistos.",
    scroll: "Scroll",
    manifesto:
      "Todo tiene su ritmo. El nuestro es crear. Cada luz, cada beat, cada mirada se convierte en un frame que te hace sentir que estuviste ahí.",
    mani_l: "Grabación · Edición · Color · Sonido",
    mani_r: "Eventos · Artistas · Marcas",
    w_k: "01 — Portafolio",
    w_h: "Trabajos<br>seleccionados",
    w_p: "Algunos proyectos grabados y editados recientemente. Haz clic para ver.",
    r_p1: "Directo de",
    r_p2: "Toca para ver.",
    s_k: "03 — Lo que hacemos",
    s_h: "Servicios",
    s_p: "Del set a la entrega final. Grabación, edición, color y sonido — todo con identidad.",
    s1: "Live sets",
    s1d: "Grabación multicámara y edición sincronizada con el audio, lista para YouTube y redes.",
    s2: "Aftermovies",
    s2d: "Festivales, fiestas y shows resumidos en un video con energía, ritmo y narrativa.",
    s3: "Creative videos",
    s3d: "Reels, teasers y videos conceptuales pensados para que artistas y marcas destaquen.",
    s4: "Drops multicam",
    s4d: "Los mejores momentos del set en cortes multicámara rápidos, hechos para viralizar.",
    s5: "Mini documentaries",
    s5d: "Historias cortas sobre artistas, eventos y backstage, con mirada cinematográfica.",
    f_h: "Fotos &amp; backstage",
    f_p: "Frames y registros directo de Instagram",
    f_cta: "Ver más en Instagram",
    a_h: "Cada frame<br>tiene un <span>ritmo</span>",
    a_p: "Ritmo Studio es un estudio audiovisual con base en Santa Catarina, Brasil. Trabajamos con música electrónica, festivales y artistas, capturando la energía del momento y transformándola en videos que hacen sentir a quien mira que estuvo ahí. De la grabación al color final, cuidamos cada etapa del proceso.",
    a_v: "Ha pasado por",
    c_h: "¿<span>Creamos</span><br>algo juntos?",
    c_p: "Cuéntanos sobre tu proyecto — evento, live set, clip o contenido. Respondemos rápido por WhatsApp.",
    c_loc: "📍 SANTA CATARINA · BRASIL · DISPONIBLE PARA VIAJAR",
    foot: "Filmmaker · Editor · Brasil",
  },
};

const workItems = [
  {
    id: "fqnLcRUlqmU",
    type: "Live Set · Camboriú, SC",
    title: "Riascode @ Green Valley Carnival '26",
    alt: "Riascode at Green Valley Carnival",
    big: true,
  },
  {
    id: "BYkAcokuBk0",
    type: "DJ Set · Urubici, SC",
    title: "and[R]e — Golden Hour",
    alt: "Golden hour DJ set Urubici",
    big: false,
  },
  {
    id: "LNMlb-RkVS8",
    type: "Live Set · No Class",
    title: "Schillist @ Boiler Room",
    alt: "Schillist Boiler Room",
    big: false,
  },
];

const reels = [
  "https://www.instagram.com/reel/DVy17AhjurA/embed/",
  "https://www.instagram.com/reel/DPx4m85jfJc/embed/",
  "https://www.instagram.com/p/DVcANIPj7t2/embed/",
  "https://www.instagram.com/p/DUWyoReD3Se/embed/",
];

const services = [
  ["s1", "s1d"],
  ["s2", "s2d"],
  ["s3", "s3d"],
  ["s4", "s4d"],
  ["s5", "s5d"],
] as const;

const gallery = [
  ["ritmo_aloha_01.jpg", "Aloha Beach Club", "tall"],
  ["ritmo_aloha_04.jpg", "DJ set", ""],
  ["ritmo_warung_01.jpg", "Warung Beach Club", "wide"],
  ["ritmo_aloha_07.jpg", "Aloha Beach Club", ""],
  ["ritmo_dksdj_01.jpg", "DKS DJ", "tall"],
  ["ritmo_aloha_05.jpg", "Aloha Beach Club", ""],
  ["ritmo_aloha_02.jpg", "DJ Aloha", ""],
  ["ritmo_warung_02.jpg", "Warung Beach Club", "wide"],
  ["ritmo_aloha_08.jpg", "Aloha Beach Club", ""],
  ["ritmo_aloha_09.jpg", "Aloha Beach Club", ""],
  ["ritmo_aloha_03.jpg", "Aloha Beach Club", ""],
  ["ritmo_aloha_06.jpg", "Aloha Beach Club", ""],
] as const;

const venues = [
  "Aloha Beach Club",
  "Warung Beach Club",
  "Green Valley",
  "Boiler Room · No Class",
  "Urubici, SC",
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function RichText({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function RitmoStudio() {
  const [language, setLanguage] = useState<Language>("pt");
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const t = translations[language];

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("rs_lang") as Language | null;
      if (savedLanguage && savedLanguage in translations) {
        setLanguage(savedLanguage);
      }
    } catch {
      // localStorage can be unavailable in restricted browser contexts.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
    try {
      localStorage.setItem("rs_lang", language);
    } catch {
      // Keep the language working even when persistence is unavailable.
    }
  }, [language]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cursor = root.querySelector<HTMLElement>(".cursor");
    const cursorRing = root.querySelector<HTMLElement>(".cursor-ring");
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let cursorFrame = 0;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (cursor) {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      }
    };

    const animateCursor = () => {
      ringX = lerp(ringX, mouseX, 0.15);
      ringY = lerp(ringY, mouseY, 0.15);
      if (cursorRing) {
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
      }
      cursorFrame = requestAnimationFrame(animateCursor);
    };

    const interactiveElements = root.querySelectorAll<HTMLElement>("a, .work, .spec");
    const onHoverStart = () => document.body.classList.add("hovering");
    const onHoverEnd = () => document.body.classList.remove("hovering");

    const loader = root.querySelector<HTMLElement>(".loader");
    const loaderTitle = loader?.querySelector<HTMLElement>(".display span");
    const loaderBar = loader?.querySelector<HTMLElement>(".bar i");
    const heroLines = root.querySelectorAll<HTMLElement>(".hero h1 .line span");
    const heroIntro = root.querySelectorAll<HTMLElement>(".hero .kicker, .hero-meta > *, .rec");
    const timers: number[] = [];
    const loaderFrame = requestAnimationFrame(() => {
      if (!loader || !loaderTitle || !loaderBar) return;

      loaderTitle.style.transition = "transform .9s cubic-bezier(.2,.8,.2,1)";
      loaderBar.style.transition = "width 1s ease-in-out";
      loader.style.transition = "transform .9s cubic-bezier(.7,0,.2,1)";
      heroIntro.forEach((element) => {
        element.style.opacity = "0";
        element.style.translate = "0 30px";
      });

      requestAnimationFrame(() => {
        loaderTitle.style.transform = "translateY(0)";
        timers.push(
          window.setTimeout(() => {
            loaderBar.style.width = "100%";
          }, 250),
          window.setTimeout(() => {
            loader.style.transform = "translateY(-100%)";
            heroLines.forEach((element, index) => {
              element.style.transition = `transform 1.1s cubic-bezier(.2,.8,.2,1) ${index * 0.12 + 0.4}s`;
              element.style.transform = "translateY(0)";
            });
            heroIntro.forEach((element, index) => {
              element.style.transition = `all .8s ease ${index * 0.1 + 0.8}s`;
              element.style.opacity = "1";
              element.style.translate = "0 0";
            });
          }, 1100),
          window.setTimeout(() => {
            loader.style.display = "none";
          }, 1800),
        );
      });
    });

    const rec = root.querySelector<HTMLElement>(".rec");
    let frameCount = 0;
    const timecode = window.setInterval(() => {
      frameCount += 6;
      const seconds = Math.floor(frameCount / 24);
      const minutes = Math.floor(seconds / 60);
      if (rec?.lastChild) {
        rec.lastChild.textContent = ` REC 00:${String(minutes).padStart(2, "0")}:${String(
          seconds % 60,
        ).padStart(2, "0")}:${String(frameCount % 24).padStart(2, "0")}`;
      }
    }, 250);

    if (hasFinePointer) {
      window.addEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", onHoverStart);
        element.addEventListener("mouseleave", onHoverEnd);
      });
      cursorFrame = requestAnimationFrame(animateCursor);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.clearInterval(timecode);
      cancelAnimationFrame(cursorFrame);
      cancelAnimationFrame(loaderFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", onHoverStart);
        element.removeEventListener("mouseleave", onHoverEnd);
      });
      document.body.classList.remove("hovering");
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const hero = root.querySelector<HTMLElement>(".hero");
    const heroImage = root.querySelector<HTMLElement>(".hero-bg img");
    const heroContent = root.querySelector<HTMLElement>(".hero-content");
    const headers = [...root.querySelectorAll<HTMLElement>(".section-head h2")];
    const worksScroll = root.querySelector<HTMLElement>(".works-scroll");
    const worksStack = root.querySelector<HTMLElement>(".works-stack");
    const stackCards = worksStack ? [...worksStack.querySelectorAll<HTMLElement>(".work")] : [];

    const onLenisScroll = () => ScrollTrigger.update();

    lenis.on("scroll", onLenisScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      if (hero && heroImage && heroContent) {
        gsap.fromTo(
          heroImage,
          { scale: 1.15, y: "0%" },
          {
            scale: 1,
            y: "20%",
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          heroContent,
          { y: "0%", opacity: 1 },
          {
            y: "-30%",
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      headers.forEach((header) => {
        gsap.fromTo(
          header,
          { x: -40 },
          {
            x: 40,
            ease: "none",
            scrollTrigger: {
              trigger: header,
              start: "bottom bottom",
              end: "top top",
              scrub: true,
            },
          },
        );
      });

      if (worksScroll && stackCards.length > 1) {
        gsap.set(stackCards, { yPercent: (index) => (index === 0 ? 0 : 110) });
        const stackTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: worksScroll,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        stackTimeline
          .to(stackCards[0], { scale: 0.9, yPercent: -8, opacity: 0.58, ease: "none", duration: 0.32 }, 0.08)
          .to(stackCards[1], { yPercent: 0, ease: "none", duration: 0.48 }, 0.24)
          .to(stackCards[1], { scale: 0.9, yPercent: -8, opacity: 0.58, ease: "none", duration: 0.3 }, 0.67)
          .to(stackCards[2], { yPercent: 0, ease: "none", duration: 0.48 }, 0.8);
      }
    }, root);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const manifesto = root.querySelector<HTMLElement>(".mani-text");
    if (!manifesto) return;

    gsap.registerPlugin(ScrollTrigger);
    const words = [...manifesto.querySelectorAll<HTMLElement>(".w")];
    const trigger = ScrollTrigger.create({
      trigger: manifesto,
      start: "top 85%",
      end: "bottom 45%",
      scrub: true,
      onUpdate: (self) => {
        const visibleWords = Math.round(self.progress * words.length);
        words.forEach((word, index) => word.classList.toggle("on", index < visibleWords));
      },
    });

    ScrollTrigger.refresh();
    return () => trigger.kill();
  }, [language]);

  useEffect(() => {
    document.body.style.overflow = lightboxVideo ? "hidden" : "";
    if (lightboxVideo) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    };
  }, [lightboxVideo]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxVideo(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const changeLanguage = (nextLanguage: Language) => setLanguage(nextLanguage);
  const manifestoWords = t.manifesto.trim().split(/\s+/);

  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <div className="cursor" />
      <div className="cursor-ring" />

      <div className="loader">
        <div className="display">
          <span>RITMO STUDIO</span>
        </div>
        <div className="bar">
          <i />
        </div>
      </div>

      <SiteNavigation
        language={language}
        onLanguageChange={changeLanguage}
        t={t}
      />
      <main id="main-content">
        <HeroSection t={t} />
        <ManifestoSection t={t} manifestoWords={manifestoWords} />
        <WorksSection
          t={t}
          workItems={workItems}
          onOpenVideo={setLightboxVideo}
        />
        <ReelsSection t={t} reels={reels} />
        <ServicesSection t={t} services={services} />
        <GallerySection t={t} gallery={gallery} />
        <AboutSection t={t} venues={venues} />
        <ContactSection t={t} />
      </main>
      <VideoLightbox videoId={lightboxVideo} onClose={() => setLightboxVideo(null)} />
      <SiteFooter t={t} />
      <WhatsAppFloat />
    </div>
  );
}
