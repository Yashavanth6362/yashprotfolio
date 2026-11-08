import { useEffect, useState, type FormEvent } from 'react';
import { ArrowIcon } from './components/ArrowIcon';
import { SectionHeading } from './components/SectionHeading';
import { articles, type Article } from './data/articles';
import { certificates } from './data/certificates';
import { projects } from './data/projects';
import { navigation, site } from './data/site';
import { skillGroups } from './data/skills';

const opportunityTypes = [
  'Internship opportunity',
  'Entry-level job opportunity',
  'Civil engineering project',
  'GIS / mapping collaboration',
  'Research collaboration',
  'Technical writing',
  'Other professional enquiry',
];

function useRotatingRole() {
  const roles = ['Civil Engineering Student', 'GIS & Geospatial Learner', 'Project-focused Builder'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const timer = window.setInterval(() => setRoleIndex((current) => (current + 1) % roles.length), 2700);
    return () => window.clearInterval(timer);
  }, []);

  return roles[roleIndex];
}

function SocialLink({ label, url }: { label: string; url: string }) {
  if (!url.trim()) return null;
  return (
    <a className="social-link" href={url} target="_blank" rel="noreferrer">
      {label}<ArrowIcon diagonal size={13} />
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [projectExpanded, setProjectExpanded] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(opportunityTypes[0]);
  const role = useRotatingRole();

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nodes = [document.querySelector<HTMLElement>('#home'), ...navigation.map((item) => document.querySelector<HTMLElement>(item.href))]
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.id);
      },
      { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedArticle) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedArticle(null);
    };
    document.body.classList.add('dialog-open');
    window.setTimeout(() => document.querySelector<HTMLElement>('.article-dialog')?.focus(), 0);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.classList.remove('dialog-open');
      window.removeEventListener('keydown', handleEscape);
      previousFocus?.focus();
    };
  }, [selectedArticle]);

  const goToContact = (opportunity: string) => {
    setSelectedOpportunity(opportunity);
    setMenuOpen(false);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const opportunity = String(formData.get('opportunity') ?? selectedOpportunity);

    if (!name || !email || !message) {
      setFormMessage('Please complete your name, email address and message.');
      return;
    }
    if (!site.contactEmail.trim()) {
      setFormMessage('The contact email is not configured yet. Add your email in src/data/site.ts, then rebuild the website.');
      return;
    }

    const subject = encodeURIComponent(`${opportunity} — portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nType: ${opportunity}\n\n${message}`);
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
    setFormMessage('Your email app should open with the message prepared.');
    form.reset();
  };

  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      <header className="site-header">
        <a className="brand" href="#home" aria-label={`${site.name}, home`} onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">YA<span>.</span></span>
          <span className="brand-copy"><strong>Yashavanth AN</strong><small>PERSONAL PORTFOLIO</small></span>
        </a>

        <button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>

        <nav id="primary-navigation" className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              className={activeSection === item.href.slice(1) ? 'active' : ''}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <ArrowIcon diagonal size={13} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <div className="availability-pill">
              <span className="status-pulse" />
              {site.availability ? 'Open to opportunities & collaboration' : 'Portfolio'}
            </div>
            <p className="hero-hello">HELLO, I&apos;M</p>
            <h1>Yashavanth<br /><span>AN.</span></h1>
            <div className="role-line"><span className="role-prefix">I am a</span><span className="role-value" key={role}>{role}</span><span className="typing-caret" aria-hidden="true" /></div>
            <p className="hero-intro">Curious about how places are planned, measured and understood. I&apos;m developing my skills through civil engineering, GIS and practical digital projects.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowIcon /></a>
              <a className="text-link" href="#about">A little about me <ArrowIcon diagonal size={14} /></a>
              {site.resumeUrl ? <a className="text-link" href={site.resumeUrl} target="_blank" rel="noreferrer">View CV <ArrowIcon diagonal size={14} /></a> : null}
            </div>
            <div className="hero-meta">
              <span><span className="meta-dot" />Based in {site.location}</span>
              <span>Learning through practice</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="portrait-frame">
              <img src={site.profileImage} alt="Portrait of Yashavanth AN" fetchPriority="high" />
              <div className="portrait-caption"><span>01 / PROFILE</span><span>PERSONAL · PROFESSIONAL</span></div>
            </div>
            <div className="visual-note visual-note-top"><span className="note-line" />ENGINEERING MINDSET</div>
            <div className="visual-note visual-note-bottom"><span>GIS</span><i>×</i><span>CIVIL</span><i>×</i><span>IDEAS</span></div>
            <div className="visual-orbit" aria-hidden="true" />
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><span className="scroll-cue-line" /></a>
        </section>

        <section className="intro-band">
          <div className="section-shell intro-band-inner">
            <span className="intro-index">A STUDENT. A BUILDER. ALWAYS LEARNING.</span>
            <p>Turning classroom concepts into <em>practical understanding</em> through maps, measurements and digital tools.</p>
            <span className="intro-signature">YA<span>.</span></span>
          </div>
        </section>

        <section className="content-section section-shell" id="about">
          <SectionHeading eyebrow="A BIT ABOUT ME" title="Learning with purpose." description="A growing professional profile built around curiosity, consistency and useful work." />
          <div className="about-grid">
            <div className="about-main">
              <p className="large-copy">I&apos;m a <strong>civil engineering student</strong> interested in the relationship between the built environment and the data that helps us understand it.</p>
              <p className="body-copy">My interests include surveying, soil mechanics, GIS and digital mapping. I enjoy breaking technical topics into clear steps, documenting what I learn and exploring how technology can make engineering information easier to use.</p>
              <p className="body-copy">This portfolio is my evolving record of learning, projects, technical notes and professional milestones. I aim to keep it practical, transparent and updated as I gain experience.</p>
              <div className="about-signoff"><span className="signature-rule" /><span>Yashavanth AN</span></div>
            </div>
            <div className="about-aside">
              <div className="fact-card"><span className="fact-number">01</span><div><strong>Academic focus</strong><p>Civil Engineering</p></div></div>
              <div className="fact-card"><span className="fact-number">02</span><div><strong>Areas of interest</strong><p>GIS · Surveying · Geospatial technology</p></div></div>
              <div className="fact-card"><span className="fact-number">03</span><div><strong>Professional direction</strong><p>Projects · Collaboration · Continuous learning</p></div></div>
              <div className="aside-stamp"><span>STAY</span><strong>CURIOUS</strong><span>KEEP BUILDING ↗</span></div>
            </div>
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-shell content-section">
            <SectionHeading eyebrow="WHAT I'M BUILDING" title="Skills in progress." description="A snapshot of the subjects, tools and workflows I am learning and applying. Skill levels will be updated as experience grows." />
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <article className="skill-card" key={group.title}>
                  <div className="skill-card-top"><span>0{index + 1}</span><span className="skill-symbol">{index === 0 ? '⌂' : index === 1 ? '◎' : '↗'}</span></div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
            <div className="skills-footnote"><span className="footnote-icon">✳</span> These are learning and working areas, not a claim of expert-level proficiency.</div>
          </div>
        </section>

        <section className="content-section section-shell" id="projects">
          <SectionHeading eyebrow="SELECTED WORK" title="Projects with a purpose." description="A place for practical work, experiments and documented learning. Project status is labelled clearly." />
          <div className="projects-list">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-number">{project.number}</div>
                <div className="project-content">
                  <div className="project-label-row"><span className="project-category">{project.category}</span><span className="project-status">{project.status}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  {projectExpanded === project.id ? (
                    <div className="project-details"><strong>Project scope</strong><ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
                  ) : null}
                  <button className="inline-action" type="button" onClick={() => setProjectExpanded((current) => current === project.id ? null : project.id)}>
                    {projectExpanded === project.id ? 'Show less' : 'Explore project scope'} <ArrowIcon diagonal size={14} />
                  </button>
                </div>
                <div className="project-art" aria-label="Abstract illustration representing a digital campus map">
                  <div className="map-grid" />
                  <div className="map-route map-route-one" /><div className="map-route map-route-two" />
                  <div className="map-block map-block-one" /><div className="map-block map-block-two" /><div className="map-block map-block-three" />
                  <span className="map-pin">+</span><span className="map-art-label">CAMPUS / GIS</span>
                </div>
              </article>
            ))}
          </div>
          <div className="future-note"><span className="future-note-mark">+</span><div><strong>More work will be added here.</strong><p>New project entries can be added in <code>src/data/projects.ts</code> as they are completed.</p></div></div>
        </section>

        <section className="journal-section" id="journal">
          <div className="section-shell content-section">
            <div className="journal-heading-row">
              <SectionHeading eyebrow="NOTES & IDEAS" title="The technical journal." description="Short, useful writing about engineering, GIS, surveying and the lessons behind the work." light />
              <div className="journal-count"><strong>{articles.filter((article) => article.status === 'Featured note').length.toString().padStart(2, '0')}</strong><span>FEATURED NOTE</span></div>
            </div>
            <div className="articles-grid">
              {articles.map((article, index) => (
                <article className={`article-card${index === 0 ? ' article-card-featured' : ''}`} key={article.id}>
                  <div className="article-card-meta"><span>{article.category}</span><span>{article.readTime}</span></div>
                  <div className="article-card-index">0{index + 1}</div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="article-card-bottom"><span className={article.status === 'Featured note' ? 'article-status article-status-live' : 'article-status'}>{article.status}</span>
                    <button className="article-open" type="button" onClick={() => setSelectedArticle(article)} disabled={!article.body.length} aria-label={article.body.length ? `Read ${article.title}` : `${article.title} is not published yet`}>
                      {article.body.length ? <>Read note <ArrowIcon diagonal size={14} /></> : <>Coming soon <span aria-hidden="true">↗</span></>}
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="journal-editor-note">New posts are added through <code>src/data/articles.ts</code>. Topic ideas are intentionally marked as unpublished.</p>
          </div>
        </section>

        <section className="content-section section-shell credentials-section" id="credentials">
          <SectionHeading eyebrow="MILESTONES & LEARNING" title="Credentials, honestly presented." description="Certificates and achievements will be displayed here as verified records are added." />
          {certificates.length ? (
            <div className="credentials-grid">{certificates.map((certificate) => <article className="credential-card" key={`${certificate.title}-${certificate.issuer}`}><span className="credential-icon">✳</span><div><h3>{certificate.title}</h3><p>{certificate.issuer} · {certificate.date}</p>{certificate.credentialUrl ? <a href={certificate.credentialUrl} target="_blank" rel="noreferrer">Verify credential <ArrowIcon diagonal size={13} /></a> : null}</div></article>)}</div>
          ) : (
            <div className="empty-credentials"><div className="empty-credential-icon">✳</div><div><span className="eyebrow">YOUR NEXT MILESTONE</span><h3>Earn it. Document it. Share it.</h3><p>There are no certificates listed yet. Add the certificate title, issuing organisation, date and a verification link or image when available.</p></div><span className="empty-credentials-number">01 / —</span></div>
          )}
          <div className="education-strip"><div><span className="eyebrow">EDUCATION</span><h3>Civil Engineering</h3><p>Student · Academic learning and practical coursework</p></div><div className="education-strip-side">Institution and study dates can be added when confirmed.</div></div>
        </section>

        <section className="leadership-section">
          <div className="section-shell leadership-inner">
            <div className="leadership-mark">YA<span>.</span></div>
            <div className="leadership-copy"><span className="eyebrow eyebrow-light">LEADERSHIP & INITIATIVE</span><h2>Think like a founder.<br /><em>Build with responsibility.</em></h2><p>Founder / CEO profile and leadership space for initiatives, ventures and teams. Add the organisation name, mission and verified milestones as they take shape.</p></div>
            <div className="leadership-role"><span>PROFILE</span><strong>Founder<br />& CEO</strong><span>INITIATIVE · OWNERSHIP · GROWTH</span></div>
          </div>
        </section>

        <section className="opportunity-section section-shell" id="opportunities">
          <div className="opportunity-panel">
            <div className="opportunity-copy"><span className="eyebrow eyebrow-light">WORK WITH ME</span><h2>Good work starts<br />with a <em>conversation.</em></h2><p>Open to hearing about internships, entry-level roles, civil engineering projects, GIS collaborations and opportunities to learn from experienced teams.</p></div>
            <div className="opportunity-actions">
              {['Internship opportunity', 'Entry-level job opportunity', 'GIS / mapping collaboration'].map((item) => <button key={item} type="button" onClick={() => goToContact(item)}>{item}<ArrowIcon diagonal size={15} /></button>)}
              <span className="opportunity-footnote">Have a different idea? Start a conversation below.</span>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-shell content-section">
            <div className="contact-layout">
              <div className="contact-copy"><SectionHeading eyebrow="GET IN TOUCH" title="Say hello." description="Have an opportunity, a project idea or a question? Send a note and tell me what you have in mind." light />
                <div className="contact-detail"><span className="contact-detail-icon">↗</span><div><small>PROFESSIONAL ENQUIRIES</small><strong>Internships · Projects · Collaboration</strong></div></div>
                <div className="contact-socials"><SocialLink label="GitHub" url={site.githubUrl} /><SocialLink label="LinkedIn" url={site.linkedinUrl} /></div>
                <p className="profile-link-note">Add your personal GitHub and LinkedIn profile URLs in <code>src/data/site.ts</code> to show them here.</p>
              </div>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row"><label>Your name<input name="name" type="text" autoComplete="name" placeholder="How should I address you?" required /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label></div>
                <label>What is this about?<select name="opportunity" value={selectedOpportunity} onChange={(event) => setSelectedOpportunity(event.target.value)}>{opportunityTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>Your message<textarea name="message" rows={5} placeholder="Tell me a little about the opportunity or idea..." required /></label>
                <div className="form-submit-row"><button className="button button-light" type="submit">Prepare message <ArrowIcon /></button><span>Your details stay in your email app.</span></div>
                {formMessage ? <p className="form-feedback" role="status">{formMessage}</p> : null}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-top"><a className="footer-brand" href="#home">YA<span>.</span></a><p>Curiosity into capability.<br />Learning, building and moving forward.</p><a className="back-top" href="#home">BACK TO TOP ↑</a></div>
        <div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} Yashavanth AN. All rights reserved.</span><span>BUILT WITH INTENTION · {site.headline.toUpperCase()}</span></div>
      </footer>

      {selectedArticle ? (
        <div className="article-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedArticle(null); }}>
          <article className="article-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex={-1}>
            <div className="dialog-topline"><span>{selectedArticle.category} · {selectedArticle.readTime}</span><button type="button" onClick={() => setSelectedArticle(null)} aria-label="Close article">×</button></div>
            <span className="eyebrow">{selectedArticle.dateLabel}</span>
            <h2 id="dialog-title">{selectedArticle.title}</h2>
            <p className="dialog-lede">{selectedArticle.excerpt}</p>
            <div className="dialog-body">{selectedArticle.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="dialog-author">WRITTEN BY <strong>YASHAVANTH AN</strong></div>
          </article>
        </div>
      ) : null}
    </>
  );
}

export default App;
