type Translation = Record<string, string>;

type Language = "pt" | "en" | "es";

type WorkItem = {
  id: string;
  type: string;
  title: string;
  alt: string;
  big: boolean;
};

type GalleryItem = readonly [string, string, string];

type SiteSectionsProps = {
  t: Translation;
  language: Language;
  onLanguageChange: (language: Language) => void;
  manifestoWords: string[];
  workItems: WorkItem[];
  reels: string[];
  services: readonly (readonly [string, string])[];
  gallery: readonly GalleryItem[];
  venues: string[];
  onOpenVideo: (videoId: string) => void;
};

function RichText({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function SiteNavigation({
  language,
  onLanguageChange,
  t,
}: Pick<SiteSectionsProps, "language" | "onLanguageChange" | "t">) {
  return (
    <nav>
      <a href="#top" className="logo">
        <img src="/fotos/ritmo_perfil.jpg" alt="" className="logo-img" />
        RITMO<b>.</b>STUDIO
      </a>
      <ul>
        <li><a href="#trabalhos">{t.n1}</a></li>
        <li><a href="#servicos">{t.n2}</a></li>
        <li><a href="#fotos">{t.n3}</a></li>
        <li><a href="#sobre">{t.n4}</a></li>
        <li><a href="#contato">{t.n5}</a></li>
      </ul>
      <div className="lang">
        {(["pt", "en", "es"] as Language[]).map((item) => (
          <button
            key={item}
            type="button"
            className={language === item ? "on" : ""}
            onClick={() => onLanguageChange(item)}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function HeroSection({ t }: { t: Translation }) {
  return (
    <header className="hero" id="top">
      <div className="hero-bg"><img src="/fotos/ritmo_warung_01.jpg" alt="" /></div>
      <div className="frame" />
      <div className="rec"><i /> REC 00:00:00:00</div>
      <div className="hero-content">
        <div className="kicker">{t.kicker}</div>
        <h1>
          <span className="line"><span>RITMO</span></span>
          <span className="line"><span><em>STUDIO</em></span></span>
        </h1>
        <div className="hero-meta">
          <p>{t.hero_p}</p>
          <div className="scroll-hint"><span>{t.scroll}</span><i /></div>
        </div>
      </div>
    </header>
  );
}

export function ManifestoSection({ t, manifestoWords }: Pick<SiteSectionsProps, "t" | "manifestoWords">) {
  return (
    <section className="manifesto" id="manifesto">
      <div className="wave" aria-hidden="true">
        {Array.from({ length: 90 }, (_, index) => (
          <i
            key={index}
            style={{
              "--h": `${20 + Math.abs(Math.sin(index * 0.35)) * 75}%`,
              animationDelay: `${index * 0.045}s`,
              animationDuration: `${1 + ((index * 7) % 10) / 10}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <p className="mani-text">
        {manifestoWords.map((word, index) => {
          const cleanWord = word.toLowerCase().replace(/[.,]/g, "");
          const highlighted = ["ritmo", "criar", "frame", "rhythm", "create", "crear"].includes(cleanWord);
          return (
            <span className={`w${highlighted ? " hi" : ""}`} key={`${word}-${index}`}>
              {word}
            </span>
          );
        })}
      </p>
      <div className="mani-meta"><span>{t.mani_l}</span><span>{t.mani_r}</span></div>
    </section>
  );
}

export function WorksSection({ t, workItems, onOpenVideo }: Pick<SiteSectionsProps, "t" | "workItems" | "onOpenVideo">) {
  return (
    <section id="trabalhos">
      <div className="section-head reveal">
        <h2><small>{t.w_k}</small><RichText html={t.w_h} /></h2>
        <p>{t.w_p}</p>
      </div>
      <div className="works-scroll">
        <div className="works-stage">
          <div className="works works-stack">
            {workItems.map((work, index) => (
              <button
                className={`work ${work.big ? "big" : ""}`}
                data-id={work.id}
                key={work.id}
                type="button"
                onClick={() => onOpenVideo(work.id)}
              >
                <span className="num">{String(index + 1).padStart(2, "0")}</span>
                <img
                  src={`https://img.youtube.com/vi/${work.id}/sddefault.jpg`}
                  alt={work.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  onError={(event) => {
                    const image = event.currentTarget;
                    if (image.dataset.fallback) return;
                    image.dataset.fallback = "true";
                    image.src = `https://img.youtube.com/vi/${work.id}/hqdefault.jpg`;
                  }}
                />
                <span className="info">
                  <span><small>{work.type}</small><strong>{work.title}</strong></span>
                  <span className="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReelsSection({ t, reels }: Pick<SiteSectionsProps, "t" | "reels">) {
  return (
    <section id="reels" className="reels">
      <div className="section-head reveal">
        <h2><small>02 — Instagram</small>Reels</h2>
        <p>{t.r_p1} <a href="https://www.instagram.com/ritmostudio___/" target="_blank" rel="noreferrer">@ritmostudio___</a>. {t.r_p2}</p>
      </div>
      <div className="reel-grid">
        {reels.map((src) => (
          <div className="reel reveal" key={src}>
            <iframe src={src} loading="lazy" allowFullScreen scrolling="no" allow="encrypted-media" title="Ritmo Studio reel" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection({ t, services }: Pick<SiteSectionsProps, "t" | "services">) {
  return (
    <section className="services" id="servicos">
      <div className="section-head reveal">
        <h2><small>{t.s_k}</small><span>{t.s_h}</span></h2>
        <p>{t.s_p}</p>
      </div>
      <div className="svc-list">
        {services.map(([titleKey, descriptionKey], index) => (
          <a className="svc reveal" href="#contato" key={titleKey}>
            <span className="n">{String(index + 1).padStart(2, "0")}</span>
            <h3>{t[titleKey]}</h3>
            <p>{t[descriptionKey]}</p>
            <span className="arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function GallerySection({ t, gallery }: Pick<SiteSectionsProps, "t" | "gallery">) {
  return (
    <section id="fotos">
      <div className="section-head reveal">
        <h2><small>04 — Frames</small><RichText html={t.f_h} /></h2>
        <p>{t.f_p} <a href="https://www.instagram.com/ritmostudio___/" target="_blank" rel="noreferrer">@ritmostudio___</a>.</p>
      </div>
      <div className="gallery">
        {gallery.map(([file, alt, layout]) => (
          <div className={`item ${layout} reveal`} key={file}>
            <img src={`/fotos/${file}`} alt={alt} />
          </div>
        ))}
      </div>
      <a className="ig-cta reveal" href="https://www.instagram.com/ritmostudio___/" target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
        <span>{t.f_cta}</span>
      </a>
    </section>
  );
}

export function AboutSection({ t, venues }: Pick<SiteSectionsProps, "t" | "venues">) {
  return (
    <section id="sobre">
      <div className="about">
        <div>
          <h2 className="reveal"><RichText html={t.a_h} /></h2>
          <p className="reveal">{t.a_p}</p>
          <div className="venues reveal"><small>{t.a_v}</small>{venues.map((venue) => <span key={venue}>{venue}</span>)}</div>
        </div>
        <div className="about-visual reveal">
          <img src="/fotos/ritmo_aloha_03.jpg" alt="Ritmo Studio" className="main" />
          <span className="tag">SANTA CATARINA · BR</span>
          <img src="/fotos/ritmo_perfil.jpg" alt="" className="about-logo" />
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ t }: { t: Translation }) {
  return (
    <section className="contact" id="contato">
      <h2 className="reveal"><RichText html={t.c_h} /></h2>
      <p className="reveal">{t.c_p}</p>
      <div className="contact-links reveal">
        <a className="btn wa" href="https://wa.me/5591989032895?text=Ol%C3%A1!%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto." target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3z" /></svg>
          <span>WhatsApp</span>
        </a>
        <a className="btn" href="mailto:dedeptj@outlook.com">
          <svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>
          <span>dedeptj@outlook.com</span>
        </a>
        <a className="btn" href="https://www.instagram.com/ritmostudio___/" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-2.6-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z" /></svg>
          <span>@ritmostudio___</span>
        </a>
      </div>
      <div className="location">{t.c_loc}</div>
    </section>
  );
}

export function VideoLightbox({ videoId, onClose }: { videoId: string | null; onClose: () => void }) {
  if (!videoId) return null;

  return (
    <div className="lb open" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <button className="close" type="button" aria-label="Fechar" onClick={onClose}>✕</button>
      <div className="box">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="Ritmo Studio video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export function SiteFooter({ t }: { t: Translation }) {
  return (
    <footer>
      <span>© 2026 Ritmo Studio</span>
      <span>{t.foot}</span>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a className="wa-float" href="https://wa.me/5591989032895" target="_blank" rel="noreferrer" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3z" /></svg>
    </a>
  );
}
