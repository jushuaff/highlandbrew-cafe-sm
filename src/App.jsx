import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  ExternalLink,
  Mail,
  MapPinned,
  Menu,
  Phone,
  X,
} from 'lucide-react';

import logo from './assets/logos/highland-brew.png';
import heroImage from './assets/images/highland-brew/highland-brew-cafe.jpg';
import storyImage from './assets/images/highland-brew/highland-brew-sm-baguio.jpg';
import galleryCoffee from './assets/images/highland-brew/highland-brew-cafe.jpg';
import galleryInterior from './assets/images/highland-brew/highland-brew-sm.png';
import galleryMenu from './assets/images/highland-brew/highland-brew-terrace.jpg';
import galleryPastry from './assets/images/highland-brew/highland-brew-dessert.jpg';
import galleryTerrace from './assets/images/highland-brew/highland-brew-terrace.jpg';
import { featureDrinks, galleryImages, siteData } from './data/site';
import { menuCategories } from './data/menu';

const homeNavItems = [
  { label: 'Home', href: '#home' },
  { label: 'Our Coffee', href: '#story' },
  { label: 'Menu', href: '/menu' },
  { label: 'Experience', href: '#experience' },
  { label: 'Locations', href: '#locations' },
  { label: 'Contact', href: '#contact' },
];

const galleryLayout = ['grid-wide', 'grid-tall', 'grid-wide', 'grid-wide', 'grid-tall', 'grid-wide'];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand-lockup" aria-label="Highland Brew home">
          <img src={logo} alt="Highland Brew logo" className="brand-lockup__logo" />
        </Link>

        <button
          type="button"
          className="mobile-menu-button"
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav id="primary-navigation" className={`main-nav ${mobileOpen ? 'is-open' : ''}`}>
          {homeNavItems.map((item) =>
            item.href.startsWith('/') ? (
              <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </a>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}

function SectionIntro({ label, title, copy }) {
  return (
    <div>
      <span className="section-label">{label}</span>
      <h2 className="section-heading">{title}</h2>
      {copy ? <p className="lead">{copy}</p> : null}
    </div>
  );
}

function ContactForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      subject: formValues.subject.trim(),
      message: formValues.message.trim(),
    };

    if (trimmed.name.length < 2) {
      setStatus({ type: 'error', message: 'Please enter your name.' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      setStatus({ type: 'error', message: 'Please provide a valid email address.' });
      return;
    }

    if (trimmed.subject.length < 3) {
      setStatus({ type: 'error', message: 'Please add a subject.' });
      return;
    }

    if (trimmed.message.length < 10) {
      setStatus({ type: 'error', message: 'Your message should be at least 10 characters long.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmed),
      });

      const result = await response.json();

      if (!response.ok || result.ok === false) {
        throw new Error(result.message || 'Unable to send the message right now.');
      }

      setStatus({
        type: 'success',
        message:
          result.demo === true
            ? 'Demo mode is active. Message delivery will be enabled after deployment and environment configuration.'
            : 'Thank you. Your message has been sent successfully.',
      });
      setFormValues({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus({
        type: 'success',
        message:
          'Demo mode is active. Message delivery will be enabled after deployment and environment configuration.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={formValues.name} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formValues.email} onChange={handleChange} />
        </div>
      </div>

      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" value={formValues.phone} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="subject">Subject</label>
          <input id="subject" name="subject" type="text" value={formValues.subject} onChange={handleChange} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={formValues.message} onChange={handleChange} />
      </div>

      <button className="button button--primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send inquiry'}
      </button>

      {status.message ? (
        <p className={`form-status ${status.type === 'error' ? 'is-error' : ''}`}>{status.message}</p>
      ) : null}
    </form>
  );
}

function HomePage() {
  return (
    <>
      <section id="home" className="page-shell">
        <div className="container hero topographic-grid">
          <div className="hero__content">
            <span className="hero__eyebrow">Highland Brew Cafe · Baguio</span>
            <h1 className="hero__title">
              Coffee raised in <em>the highlands.</em>
            </h1>
            <p className="hero__copy">
              A premium Cordilleran coffee experience shaped by mountain air, Baguio weather, and
              the warmth of local café culture at SM City Baguio.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#story">
                Explore the Menu <ArrowRight size={18} />
              </a>
              <a className="button button--secondary" href={siteData.directionsUrl} target="_blank" rel="noreferrer">
                Visit Highland Brew
              </a>
            </div>
          </div>

          <div className="hero__visual" aria-label="Featured Highland Brew café hero image">
            <div className="hero__panel">
              <img src={heroImage} alt="Highland Brew coffee scene inspired by the Cordillera" />
            </div>
            <div className="hero__badge">
              <strong>SM City Baguio</strong>
              <span>Sky Terrace / Level 3</span>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="story-section">
        <div className="container story-layout">
          <div className="story-card story-card__image">
            <img src={storyImage} alt="Terrace and mountain landscape capturing the Highland Brew identity" />
          </div>

          <div className="story-copy">
            <SectionIntro
              label="Our Coffee"
              title="Baguio and the Cordillera in every cup."
              copy="Highland Brew celebrates premium Cordilleran coffee and the city’s cool highland identity. A café shaped by local coffee culture, mountain air, and a warm, welcoming Baguio experience."
            />

            <div className="statistics-row">
              <div className="stat">
                <strong>Highland</strong>
                <span>coffee culture</span>
              </div>
              <div className="stat">
                <strong>Cordillera</strong>
                <span>roots</span>
              </div>
              <div className="stat">
                <strong>Baguio</strong>
                <span>cool weather</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="container">
          <SectionIntro
            label="Signature Highland Adventure"
            title="Drinks built for mountain moods."
            copy="A selection of café signatures inspired by the names and energy of the Cordillera, presented in a warmer, more adventurous way than a typical café grid."
          />

          <div className="feature-grid">
            {featureDrinks.map((drink) => (
              <article className="feature-card" key={drink.name}>
                <div className="feature-card__media">
                  <img
                    src={
                      drink.accent === 'cloud'
                        ? galleryCoffee
                        : drink.accent === 'mist'
                          ? galleryCoffee
                          : drink.accent === 'pine'
                            ? galleryInterior
                            : drink.accent === 'ember'
                              ? galleryMenu
                              : drink.accent === 'terrain'
                                ? galleryTerrace
                                : drink.accent === 'sunrise'
                                  ? galleryPastry
                                  : galleryCoffee
                    }
                    alt={`${drink.name} signature beverage`}
                  />
                </div>
                <div className="feature-card__content">
                  <h3>{drink.name}</h3>
                  <p>{drink.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section">
        <div className="container">
          <SectionIntro
            label="Sky Terrace Experience"
            title="The open-air Baguio atmosphere, elevated."
            copy="Highland Brew at SM City Baguio brings together local coffee, mountain views, and the cool-weather energy of a terrace café set above the city."
          />

          <div className="experience-layout">
            <div className="experience-visual">
              <img src={galleryTerrace} alt="Open-air terrace at Highland Brew in SM City Baguio" />
            </div>

            <div className="experience-copy">
              <div>
                <p className="lead">
                  From the terrace level to the warm interior, the experience is deliberate: scenic,
                  relaxed, and distinctly Baguio.
                </p>
              </div>

              <ul className="experience-list">
                <li>
                  <span>01</span>
                  <div>
                    <strong>Level 3 / Sky Terrace</strong>
                    <p>Open-air, elevated, and designed for a cool mountain café moment.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>SM City Baguio</strong>
                    <p>A convenient, social setting that fits the energy of Baguio’s café culture.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>Local identity</strong>
                    <p>Premium coffee and warm food served with a distinctly highland mood.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="container">
          <SectionIntro
            label="Local Flavors"
            title="Pastries and sweets worth slowing down for."
            copy="A few confirmed Highland Brew favorites highlight the café’s local comfort-food side without inventing a menu larger than the verified references."
          />

          <div className="feature-grid">
            {[
              { title: 'Bibingka Cheesecake Espesyal', image: galleryPastry },
              { title: 'Baguio Ube Cake', image: galleryPastry },
              { title: 'Egg Pie', image: galleryPastry },
            ].map((item) => (
              <article className="feature-card" key={item.title}>
                <div className="feature-card__media">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="feature-card__content">
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="container">
          <SectionIntro
            label="Gallery"
            title="A closer look at the Highland Brew mood."
            copy="Real café references, Baguio atmosphere, and brand touchpoints pulled into a cohesive editorial gallery."
          />

          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <figure className={`gallery-item ${galleryLayout[index] || ''}`} key={image.title}>
                <img src={image.image} alt={image.alt} />
                <figcaption className="gallery-item__caption">
                  <strong>{image.title}</strong>
                  <span>{image.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="locations-section">
        <div className="container">
          <SectionIntro
            label="Locations"
            title="Find your Highland."
            copy="The flagship branch in Baguio continues to anchor the experience, with directions and local context built directly into the design."
          />

          <div className="locations-grid">
            <div className="location-card">
              <span className="section-label">Primary Branch</span>
              <h3 className="section-heading" style={{ fontSize: '2.1rem', margin: '0.8rem 0' }}>
                Highland Brew Cafe – SM City Baguio
              </h3>
              <p className="lead">Sky Terrace / Level 3 · SM City Baguio · Luneta Hill Drive · Baguio City, Benguet 2600</p>

              <div className="map-frame">
                <iframe
                  title="Highland Brew Cafe map"
                  src={siteData.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <aside className="location-card">
              <span className="section-label">Visit</span>
              <div className="location-meta">
                <div className="location-meta__item">
                  <MapPinned size={18} />
                  <span>{siteData.address}</span>
                </div>
                <div className="location-meta__item">
                  <Phone size={18} />
                  <a href={siteData.phoneHref}>{siteData.phone}</a>
                </div>
                <div className="location-meta__item">
                  <Mail size={18} />
                  <a href={siteData.emailHref}>{siteData.email}</a>
                </div>
              </div>

              <div className="hero__actions" style={{ marginTop: '1.5rem' }}>
                <a className="button button--primary" href={siteData.directionsUrl} target="_blank" rel="noreferrer">
                  Get Directions <ExternalLink size={18} />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <aside className="contact-panel">
            <span className="section-label">Contact</span>
            <h2 className="section-heading" style={{ fontSize: '2.5rem' }}>Plan your next Highland stop.</h2>
            <p className="lead">
              For sample inquiries and partnership conversations, use the contact form or reach out directly.
            </p>

            <div className="contact-list">
              <div className="location-meta__item">
                <Phone size={18} />
                <a href={siteData.phoneHref}>{siteData.phone}</a>
              </div>
              <div className="location-meta__item">
                <Mail size={18} />
                <a href={siteData.emailHref}>{siteData.email}</a>
              </div>
              <div className="location-meta__item">
                <Compass size={18} />
                <span>SM City Baguio · Sky Terrace / Level 3</span>
              </div>
            </div>
          </aside>

          <div className="contact-panel">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function MenuPage() {
  return (
    <section className="menu-section page-shell">
      <div className="container">
        <div className="page-header">
          <span className="section-label">Menu</span>
          <h1 className="page-header__title">Highland Brew menu</h1>
        </div>

        <div className="menu-grid">
          {menuCategories.map((category) => (
            <article className="menu-card" key={category.title}>
              <h3>{category.title}</h3>
              <ul>
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <img src={logo} alt="Highland Brew logo" className="footer__logo" />
          <p>
            Website concept prepared for Highland Brew Cafe.
          </p>
        </div>

        <div>
          <h3 className="footer__title">Navigate</h3>
          <div className="footer__list">
            <a href="#home">Home</a>
            <a href="#story">Our Coffee</a>
            <Link to="/menu">Menu</Link>
            <a href="#locations">Locations</a>
          </div>
        </div>

        <div>
          <h3 className="footer__title">Visit</h3>
          <div className="footer__list">
            <span>{siteData.address}</span>
            <a href={siteData.phoneHref}>{siteData.phone}</a>
            <a href={siteData.emailHref}>{siteData.email}</a>
          </div>
        </div>

        <div>
          <h3 className="footer__title">Follow</h3>
          <div className="footer__list">
            {siteData.socialLinks.map((item) => (
              <a href={item.href} key={item.label} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <span>© Highland Brew Cafe concept website</span>
          <span>Demo mode · noindex · nofollow</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <Header />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
