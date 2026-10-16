import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'

/* ── Primary Match Weapon (Walther LG400 — Real Athlete Equipment) ─ */
import waltherLg400 from './assets/images/walther_lg400_actual.jpg'
import waltherLg400Stand from './assets/images/walther_lg400_stand.jpg'

/* ── Authentic Athlete Photography (Aadya Baiswar) ──────── */
import aadyaPortraitWalther from './assets/images/athlete/aadya_portrait_walther.jpg'
import aadyaKneelingRange from './assets/images/athlete/aadya_kneeling_range.jpg'
import aadyaProneClose from './assets/images/athlete/aadya_prone_close.jpg'
import aadyaStanding10m from './assets/images/athlete/aadya_standing_10m.jpg'
import aadyaRangeWide from './assets/images/athlete/aadya_range_wide.jpg'
import aadya50mOutdoorProne from './assets/images/athlete/aadya_50m_outdoor_prone.jpg'
import aadyaNationalGamesKneeling from './assets/images/athlete/aadya_national_games_kneeling.jpg'

/* ── Authentic Athlete Medal Images (Real Awards) ───────── */
import bareillyMedals from './assets/images/medals/bareilly_medals_2026.jpg'
import prayagrajMedals from './assets/images/medals/prayagraj_medals_2023.jpg'
import shauryaMedals from './assets/images/medals/shaurya_medals_2023.jpg'
import upState46th from './assets/images/medals/up_state_46th_2023.jpg'
import preUpState14th from './assets/images/medals/pre_up_state_14th_2022.jpg'
import shootingChamps from './assets/images/medals/shooting_champs_2023.jpg'
import upState49thSilver from './assets/images/medals/up_state_49th_silver_2026.jpg'
import upState49thGold from './assets/images/medals/up_state_49th_gold_2026.jpg'

/* ── Athlete Data ──────────────────────────────────────── */
const ATHLETE = {
  name: 'Aadya Baiswar',
  discipline: '10m Air Rifle · 50m Rifle Prone · 50m Rifle 3P',
  bio: [
    'A competitive shooter who picked up the rifle in 2022 and hasn\'t looked down since. Starting with 10m Air Rifle and expanding into 50m Rifle Prone and Three Positions by 2025, Aadya\'s trajectory has been defined by rapid progression and relentless consistency.',
    'With 15 medals across state, national, and international competitions — including two Champions of Champions trophies and back-to-back Renowned Shooter recognition at the National Shooting Championship — every shot reflects years of discipline, mental fortitude, and an unwavering pursuit of precision.',
  ],
  email: 'aadyabaiswar@gmail.com',
  instagram: 'https://www.instagram.com/its_aadya_baiswar/',
  instagramHandle: 'its_aadya_baiswar',
}

const STATS = [
  { number: '15+', label: 'Medals' },
  { number: '2', label: 'CoC Trophies' },
  { number: '3', label: 'Disciplines' },
  { number: '4', label: 'Years Active' },
]

/*
 * Medal data — RANKED by what actually makes someone care.
 * Rank 1–2: hero/featured treatment (large cards)
 * Rank 3–4: featured (medium)
 * Rank 5–8: standard (compact)
 */
/*
 * Authentic Medal Data — Real Framed Awards
 * 8 Official Championship Medals directly provided by Aadya Baiswar
 */
const MEDALS = [
  {
    id: 1,
    rank: 'hero',
    category: 'national',
    type: 'Gold · Silver · Bronze + CoC Trophy',
    event: 'Prayagraj Open Shooting Championship',
    year: '2023',
    venue: 'Eagle Eye Shooting Sports Academy · All India',
    discipline: '10m Air Rifle',
    detail: 'Complete Podium Sweep & Champions of Champions Trophy',
    excerpt: 'Authentic 3-medal framed collection: Gold, Silver, and Bronze won in a single All India championship, capped with the Champions of Champions (CoC) Trophy.',
    image: prayagrajMedals,
    aspect: 'wide',
  },
  {
    id: 2,
    rank: 'featured',
    category: 'national',
    type: '2× Gold · 1× Bronze',
    event: '1st Bareilly Smart City Shooting Championship',
    year: '2026',
    venue: 'Accurate Aim Arena · All India Open',
    discipline: '.22 Rifle / 50m Rifle',
    detail: 'Two Gold Medals and One Bronze Medal',
    excerpt: 'Framed tri-medal achievement in .22 Rifle events at the Bareilly Smart City All India Championship.',
    image: bareillyMedals,
    aspect: 'wide',
  },
  {
    id: 3,
    rank: 'featured',
    category: 'national',
    type: '2× Gold · 1× Silver + CoC Trophy',
    event: 'Shaurya Shooting Championship',
    year: '2023',
    venue: 'First TIG Shooters Open Championship · Lucknow',
    discipline: '10m Air Rifle',
    detail: 'Two Gold Medals, One Silver & CoC Trophy',
    excerpt: 'Multi-medal sweep featuring two Gold medals and a Silver medal, alongside the Champions of Champions trophy.',
    image: shauryaMedals,
    aspect: 'wide',
  },
  {
    id: 4,
    rank: 'featured',
    category: 'national',
    type: '2× Gold Medals',
    event: '5th Shooting Champs Open Championship',
    year: '2023',
    venue: 'Shooting Champs Academy · Lucknow',
    discipline: '10m Air Rifle',
    detail: 'Double Gold Performance',
    excerpt: 'Clean double Gold medal finish in 10m Air Rifle at the 5th Shooting Champs Open Championship in Lucknow.',
    image: shootingChamps,
    aspect: 'wide',
  },
  {
    id: 5,
    rank: 'standard',
    category: 'state',
    type: 'Gold Medal',
    event: '49th UP State Shooting Championship',
    year: '2026',
    venue: 'UP State Rifle Association (21st–30th June 2026)',
    discipline: '.22 Rifle · Kneeling Position',
    detail: 'State Championship Gold',
    excerpt: 'Gold medal in Kneeling Position with the .22 Rifle at the prestigious 49th UP State Shooting Championship.',
    image: upState49thGold,
    aspect: 'tall',
  },
  {
    id: 6,
    rank: 'standard',
    category: 'state',
    type: 'Silver Medal',
    event: '49th UP State Shooting Championship',
    year: '2026',
    venue: 'UP State Rifle Association (21st–30th June 2026)',
    discipline: '.22 Rifle · Prone Position',
    detail: 'State Championship Silver',
    excerpt: 'Silver medal in Prone Position with the .22 Rifle at the 49th UP State Shooting Championship.',
    image: upState49thSilver,
    aspect: 'tall',
  },
  {
    id: 7,
    rank: 'standard',
    category: 'state',
    type: 'Bronze Medal',
    event: '46th UP State Shooting Championship',
    year: '2023',
    venue: 'UP State Rifle Association (18th–26th July 2023)',
    discipline: '10m Air Rifle',
    detail: 'State Championship Podium',
    excerpt: 'Official Bronze medal under the UP State Rifle Association at the 46th State Championship.',
    image: upState46th,
    aspect: 'tall',
  },
  {
    id: 8,
    rank: 'standard',
    category: 'state',
    type: 'Silver Medal',
    event: '14th Pre-UP State Shooting Competition',
    year: '2022',
    venue: 'Conducted by UPSRA · Noida (20th–26th May 2022)',
    discipline: '10m Air Rifle',
    detail: 'Debut Season Milestone',
    excerpt: 'Career-launching Silver medal in the 14th Pre-UP State Competition (Air Weapon) in Noida.',
    image: preUpState14th,
    aspect: 'tall',
  },
]

/* Complete Competition Ledger */
const COMPETITION_LEDGER = [
  { year: '2026', championship: '49th UP State Shooting Championship', discipline: '.22 Rifle', event: 'Kneeling Position & Prone Position', result: 'Gold Medal (Kneeling) · Silver Medal (Prone)', level: 'State' },
  { year: '2026', championship: '1st Bareilly Smart City Shooting Championship', discipline: '.22 Rifle', event: 'All India Championship', result: 'Two Gold Medals · One Bronze Medal', level: 'All India' },
  { year: '2024', championship: 'National Shooting Championship (NSCC)', discipline: '10m Air Rifle', event: 'National Level Selection', result: 'Achieved Renowned Shooter Status', level: 'National' },
  { year: '2024', championship: 'All India Open Shooting Championship — Goa', discipline: '10m Air Rifle', event: 'All India Open Championship', result: 'National Open Competitor', level: 'All India' },
  { year: '2023', championship: 'National Shooting Championship (NSCC)', discipline: '10m Air Rifle', event: 'National Level Selection', result: 'Achieved Renowned Shooter Status', level: 'National' },
  { year: '2023', championship: 'IRS-Cup International Shooting Competition', discipline: '10m Air Rifle', event: 'Genk, Belgium · Organised by RSSF', result: 'Selected & Invited International Representative', level: 'International' },
  { year: '2023', championship: 'Prayagraj Open Shooting Championship', discipline: '10m Air Rifle', event: 'All India Championship', result: 'One Gold, One Silver, One Bronze & CoC Trophy', level: 'All India' },
  { year: '2023', championship: 'Shaurya Shooting Championship', discipline: '10m Air Rifle', event: 'Open Shooting Championship', result: 'Two Gold Medals, One Silver Medal & CoC Trophy', level: 'Open' },
  { year: '2023', championship: 'Shooting Champs Open Shooting Championship', discipline: '10m Air Rifle', event: 'Open Championship', result: 'Two Gold Medals', level: 'Open' },
  { year: '2023', championship: '46th UP State Shooting Championship', discipline: '10m Air Rifle', event: 'State Championship', result: 'Bronze Medal', level: 'State' },
  { year: '2023', championship: 'All India Open Shooting Championship — Bhopal', discipline: '10m Air Rifle', event: 'All India Open Championship', result: 'National Open Competitor', level: 'All India' },
  { year: '2022', championship: '14th Pre-UP State Shooting Championship', discipline: '10m Air Rifle', event: 'State Championship (Debut Year)', result: 'Silver Medal', level: 'State' },
]

/* Timeline for the career progression section */
const TIMELINE = [
  { year: '2022', event: 'Started competitive shooting — 10m Air Rifle', highlight: false },
  { year: '2023', event: 'Breakthrough year — 10+ medals, 2 CoC trophies, Belgium selection', highlight: true },
  { year: '2024', event: 'Back-to-back NSCC Renowned Shooter recognition', highlight: false },
  { year: '2025', event: 'Expanded to 50m Rifle Prone & Three Positions', highlight: false },
  { year: '2026', event: 'Dominated .22 Rifle events — State & All India gold', highlight: true },
]

const GALLERY_IMAGES = [
  { id: 1, src: aadyaNationalGamesKneeling, alt: 'Aadya Baiswar', aspect: 'tall' },
  { id: 2, src: aadyaProneClose, alt: 'Aadya Baiswar', aspect: 'wide' },
  { id: 3, src: aadyaStanding10m, alt: 'Aadya Baiswar', aspect: 'tall' },
  { id: 4, src: aadya50mOutdoorProne, alt: 'Aadya Baiswar', aspect: 'wide' },
  { id: 5, src: aadyaKneelingRange, alt: 'Aadya Baiswar', aspect: 'wide' },
  { id: 6, src: aadyaRangeWide, alt: 'Aadya Baiswar', aspect: 'wide' },
  { id: 7, src: waltherLg400Stand, alt: 'Walther LG400', aspect: 'wide' },
]

/* ── Animation Variants ────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: 'easeOut',
    },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

/* ── Navigation Component ──────────────────────────────── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const links = [
    { href: '#about', label: 'About' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#journey', label: 'Journey' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} id="main-nav">
        <div className="nav__inner">
          <a href="#" className="nav__logo">
            Aadya<span>.</span>
          </a>
          <ul className="nav__links">
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} className="nav__link">{link.label}</a>
              </li>
            ))}
          </ul>
          <button
            className="nav__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            <span style={mobileOpen ? { transform: 'rotate(45deg) translate(4px, 4px)' } : {}} />
            <span style={mobileOpen ? { opacity: 0 } : {}} />
            <span style={mobileOpen ? { transform: 'rotate(-45deg) translate(4px, -4px)' } : {}} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav__mobile-menu active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Hero Section ──────────────────────────────────────── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section className="hero" ref={ref} id="hero">
      <div className="hero__inner">
        <motion.div
          className="hero__content"
          style={{ opacity: textOpacity }}
        >
          <motion.p
            className="hero__eyebrow"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Competitive Shooter · India
          </motion.p>
          <motion.h1
            className="hero__name"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {ATHLETE.name}
          </motion.h1>
          <motion.p
            className="hero__discipline"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {ATHLETE.discipline}
          </motion.p>
          <motion.a
            href="#achievements"
            className="hero__cta"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            View Achievements
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>

        <motion.div
          className="hero__image-wrapper"
          style={{ y: imageY }}
        >
          <motion.img
            src={waltherLg400}
            alt="Walther LG400 — 10m Olympic competition match air rifle"
            className="hero__image"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="hero__image-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ── Stats Bar ─────────────────────────────────────────── */
function StatsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section className="stats" ref={ref} id="stats">
      <div className="stats__inner">
        {STATS.map((stat, i) => (
          <React.Fragment key={stat.label}>
            {i > 0 && <div className="stats__divider" />}
            <motion.div
              className="stats__item"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i}
            >
              <div className="stats__number">{stat.number}</div>
              <div className="stats__label">{stat.label}</div>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

/* ── About Section ─────────────────────────────────────── */
function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="about" id="about">
      <div className="about__inner" ref={ref}>
        <div className="about__content">
          <motion.div
            className="about__accent-line"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
          />
          <motion.p
            className="about__label"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            About
          </motion.p>
          <motion.h2
            className="about__heading"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            Every shot is a conversation
            between patience and precision.
          </motion.h2>
          {ATHLETE.bio.map((para, i) => (
            <motion.p
              key={i}
              className="about__text"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i + 2}
            >
              {para}
            </motion.p>
          ))}

          <motion.div
            className="about__disciplines"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={4}
          >
            <div className="discipline-tag">10m Air Rifle</div>
            <div className="discipline-tag">50m Rifle Prone</div>
            <div className="discipline-tag">50m Rifle 3P</div>
          </motion.div>

          <motion.div
            className="about__equipment"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={5}
          >
            <div className="equipment-card">
              <div className="equipment-card__badge">Primary Competition Rifle</div>
              <h4 className="equipment-card__name">Walther LG400</h4>
              <p className="equipment-card__spec">
                10m Olympic Match System · Caliber 4.5 mm (.177) · EQUALIZER Magnetic Absorber · VARIO Match Trigger · Carbon Fiber Shroud & Precision Diopter Sights
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="about__image-wrapper"
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={2}
        >
          <div className="about__athlete-frame">
            <img
              src={aadyaPortraitWalther}
              alt="Aadya Baiswar"
              className="about__image"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Achievements Section (Authentic Framed Awards + Honors) ─── */
function Achievements() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showLedger, setShowLedger] = useState(false)
  const [selectedMedal, setSelectedMedal] = useState(null)
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' })

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedMedal(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedMedal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedMedal])

  const filters = [
    { id: 'all', label: 'All Medals (8)' },
    { id: 'national', label: 'All India Championships (4)' },
    { id: 'state', label: 'State Championships (4)' },
  ]

  const filteredMedals = activeFilter === 'all'
    ? MEDALS
    : MEDALS.filter(m => m.category === activeFilter)

  const getMedalBadgeClass = (type) => {
    const t = type.toLowerCase()
    if (t.includes('gold') && t.includes('silver')) return 'medal-badge--multi'
    if (t.includes('gold')) return 'medal-badge--gold'
    if (t.includes('silver')) return 'medal-badge--silver'
    if (t.includes('bronze')) return 'medal-badge--bronze'
    return 'medal-badge--default'
  }

  const getBentoClass = (rank, aspect) => {
    if (rank === 'hero') return 'bento__item--hero'
    if (rank === 'featured') return 'bento__item--featured'
    if (aspect === 'tall') return 'bento__item--tall'
    return 'bento__item--standard'
  }

  return (
    <section className="achievements" id="achievements">
      <div className="achievements__header" ref={headerRef}>
        <motion.p
          className="achievements__label"
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          custom={0}
        >
          Competitive Record
        </motion.p>
        <motion.h2
          className="achievements__title"
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          custom={1}
        >
          Authentic Medals & Milestones
        </motion.h2>
        <motion.p
          className="achievements__subtitle"
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          custom={2}
        >
          Photographs of official framed awards and medals won across state, national, and international competitions.
        </motion.p>

        {/* National & International Accreditation Cards */}
        <motion.div
          className="achievements__honors"
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          custom={3}
        >
          <div className="honor-card honor-card--international">
            <div className="honor-card__header">
              <span className="honor-card__badge">International Milestone</span>
              <span className="honor-card__year">2023</span>
            </div>
            <h3 className="honor-card__title">IRS-Cup International · Genk, Belgium</h3>
            <p className="honor-card__desc">
              Selected and invited by the Reflex Sport Shooting Foundation (RSSF) to compete internationally in Genk, Belgium representing India in 10m Air Rifle.
            </p>
          </div>

          <div className="honor-card honor-card--national">
            <div className="honor-card__header">
              <span className="honor-card__badge honor-card__badge--national">National Level Status</span>
              <span className="honor-card__year">2023 & 2024</span>
            </div>
            <h3 className="honor-card__title">National Shooting Championship (NSCC)</h3>
            <p className="honor-card__desc">
              Achieved back-to-back <strong>Renowned Shooter</strong> status at the National Shooting Championship Competitions (NSCC) organized by NRAI.
            </p>
          </div>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          className="achievements__filters"
          variants={fadeUp}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          custom={4}
        >
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`achievements__filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Bento Grid with Museum Frame Mounts */}
      <div className="bento">
        <AnimatePresence mode="popLayout">
          {filteredMedals.map((medal) => (
            <motion.div
              layout
              key={medal.id}
              className={getBentoClass(medal.rank, medal.aspect)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="medal-card"
                onClick={() => setSelectedMedal(medal)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedMedal(medal) }}
                aria-label={`View award details for ${medal.event}`}
              >
                <div className="medal-card__frame-wrap">
                  <img
                    src={medal.image}
                    alt={`${medal.event} — official medal frame`}
                    className="medal-card__image"
                    loading="lazy"
                  />
                  <div className="medal-card__inspect-btn">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                    <span>Inspect</span>
                  </div>
                </div>

                <div className="medal-card__body">
                  <span className={`medal-badge ${getMedalBadgeClass(medal.type)}`}>
                    {medal.type}
                  </span>
                  <h3 className="medal-card__event">{medal.event}</h3>
                  <p className="medal-card__year">{medal.year} · {medal.discipline}</p>
                  <p className="medal-card__detail">{medal.detail}</p>
                  <p className="medal-card__venue">{medal.venue}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Ledger Action Toggle */}
      <div className="achievements__ledger-cta">
        <button
          onClick={() => setShowLedger(!showLedger)}
          className="ledger-toggle-btn"
          id="ledger-toggle"
        >
          <span>{showLedger ? 'Close Full Competition Ledger' : 'View Full Competition Ledger (12 Events)'}</span>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: showLedger ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      {/* Collapsible Ledger Drawer */}
      <AnimatePresence>
        {showLedger && (
          <motion.div
            className="ledger-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ledger-drawer__inner">
              <div className="ledger-table-wrap">
                <table className="ledger-table">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Level</th>
                      <th>Championship & Event</th>
                      <th>Discipline</th>
                      <th>Result / Recognition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPETITION_LEDGER.map((row, idx) => (
                      <tr key={idx}>
                        <td className="ledger-table__year">{row.year}</td>
                        <td>
                          <span className={`ledger-badge ledger-badge--${row.level.toLowerCase().replace(/[^a-z]/g, '')}`}>
                            {row.level}
                          </span>
                        </td>
                        <td className="ledger-table__champ">
                          <strong>{row.championship}</strong>
                          <span className="ledger-table__sub">{row.event}</span>
                        </td>
                        <td className="ledger-table__disc">{row.discipline}</td>
                        <td className="ledger-table__result">{row.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Medal Inspection Modal */}
      <AnimatePresence>
        {selectedMedal && (
          <motion.div
            className="medal-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedal(null)}
          >
            <motion.div
              className="medal-modal-content"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="medal-modal-close"
                onClick={() => setSelectedMedal(null)}
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="medal-modal-media">
                <img
                  src={selectedMedal.image}
                  alt={selectedMedal.event}
                  className="medal-modal-img"
                />
              </div>

              <div className="medal-modal-info">
                <span className={`medal-badge ${getMedalBadgeClass(selectedMedal.type)}`}>
                  {selectedMedal.type}
                </span>
                <h3 className="medal-modal-title">{selectedMedal.event}</h3>
                <p className="medal-modal-subtitle">{selectedMedal.year} · {selectedMedal.discipline}</p>
                <div className="medal-modal-highlight">{selectedMedal.detail}</div>
                <p className="medal-modal-excerpt">{selectedMedal.excerpt}</p>

                <div className="medal-modal-meta-grid">
                  <div className="medal-modal-meta-item">
                    <span className="medal-modal-meta-label">Organizer / Venue</span>
                    <span className="medal-modal-meta-val">{selectedMedal.venue}</span>
                  </div>
                  <div className="medal-modal-meta-item">
                    <span className="medal-modal-meta-label">Discipline</span>
                    <span className="medal-modal-meta-val">{selectedMedal.discipline}</span>
                  </div>
                  <div className="medal-modal-meta-item">
                    <span className="medal-modal-meta-label">Record Verification</span>
                    <span className="medal-modal-meta-val" style={{ color: '#0d6fbe', fontWeight: 600 }}>Official Physical Award</span>
                  </div>
                  <div className="medal-modal-meta-item">
                    <span className="medal-modal-meta-label">Athlete</span>
                    <span className="medal-modal-meta-val">Aadya Baiswar</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ── Career Journey / Timeline ─────────────────────────── */
function Journey() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="journey" id="journey">
      <div className="journey__inner" ref={ref}>
        <div className="journey__text">
          <motion.p
            className="journey__label"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            The Journey
          </motion.p>
          <motion.h2
            className="journey__heading"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            From first shot to international stage — in four years.
          </motion.h2>
        </div>

        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              className={`timeline__item ${item.highlight ? 'timeline__item--highlight' : ''}`}
              variants={slideInLeft}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i}
            >
              <div className="timeline__year">{item.year}</div>
              <div className="timeline__line">
                <div className={`timeline__dot ${item.highlight ? 'timeline__dot--active' : ''}`} />
              </div>
              <div className="timeline__content">
                <p className="timeline__event">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Gallery Section (Clean Photography Exhibition) ─────── */
function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null)
      if (selectedPhoto) {
        if (e.key === 'ArrowRight') {
          const currentIndex = GALLERY_IMAGES.findIndex(p => p.id === selectedPhoto.id)
          const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length
          setSelectedPhoto(GALLERY_IMAGES[nextIndex])
        }
        if (e.key === 'ArrowLeft') {
          const currentIndex = GALLERY_IMAGES.findIndex(p => p.id === selectedPhoto.id)
          const prevIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
          setSelectedPhoto(GALLERY_IMAGES[prevIndex])
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto])

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedPhoto])

  return (
    <section className="gallery" id="gallery">
      <div className="gallery__header" ref={ref}>
        <motion.p
          className="gallery__label"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
        >
          Gallery
        </motion.p>
        <motion.h2
          className="gallery__title"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={1}
        >
          On the Range
        </motion.h2>
      </div>

      <div className="gallery__container">
        <div className="gallery__mosaic">
          {GALLERY_IMAGES.map((photo, i) => (
            <motion.div
              key={photo.id}
              className={`gallery__card gallery__card--${photo.aspect}`}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              custom={i}
              onClick={() => setSelectedPhoto(photo)}
              role="button"
              tabIndex={0}
              aria-label="View photo"
              onKeyDown={(e) => { if (e.key === 'Enter') setSelectedPhoto(photo) }}
            >
              <div className="gallery__card-media">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="gallery__card-img"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Clean Fullscreen Photo Modal — No captions */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="gallery-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="gallery-modal-content gallery-modal-content--clean"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="gallery-modal-close"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
              >
                ✕
              </button>

              <div className="gallery-modal-media-wrap gallery-modal-media-wrap--clean">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="gallery-modal-img"
                />

                <button
                  className="gallery-modal-nav gallery-modal-nav--prev"
                  onClick={() => {
                    const currentIndex = GALLERY_IMAGES.findIndex(p => p.id === selectedPhoto.id)
                    const prevIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
                    setSelectedPhoto(GALLERY_IMAGES[prevIndex])
                  }}
                  aria-label="Previous photo"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  className="gallery-modal-nav gallery-modal-nav--next"
                  onClick={() => {
                    const currentIndex = GALLERY_IMAGES.findIndex(p => p.id === selectedPhoto.id)
                    const nextIndex = (currentIndex + 1) % GALLERY_IMAGES.length
                    setSelectedPhoto(GALLERY_IMAGES[nextIndex])
                  }}
                  aria-label="Next photo"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <div className="gallery-modal-counter-badge">
                  {GALLERY_IMAGES.findIndex(p => p.id === selectedPhoto.id) + 1} / {GALLERY_IMAGES.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ── Contact Section ───────────────────────────────────── */
function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="contact" id="contact">
      <div className="contact__inner" ref={ref}>
        <motion.p
          className="contact__label"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
        >
          Get in Touch
        </motion.p>
        <motion.h2
          className="contact__heading"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={1}
        >
          Let's Connect
        </motion.h2>
        <motion.p
          className="contact__text"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={2}
        >
          Open to sponsorship enquiries, coaching collaborations, and media features.
          Reach out — I'd love to hear from you.
        </motion.p>

        <motion.div
          className="contact__actions"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={3}
        >
          <a
            href={`mailto:${ATHLETE.email}`}
            className="contact__action-btn contact__action-btn--email"
            id="contact-email-btn"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 6L2 7" />
            </svg>
            <span>{ATHLETE.email}</span>
          </a>

          <a
            href={ATHLETE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__action-btn contact__action-btn--instagram"
            id="contact-instagram-btn"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>@{ATHLETE.instagramHandle}</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Footer ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <p className="footer__text">
          © {new Date().getFullYear()} Aadya Baiswar · Competitive Shooting Athlete
        </p>
        <div className="footer__links">
          <a href={`mailto:${ATHLETE.email}`} className="footer__link">{ATHLETE.email}</a>
          <span className="footer__sep">·</span>
          <a href={ATHLETE.instagram} target="_blank" rel="noopener noreferrer" className="footer__link">
            Instagram @{ATHLETE.instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ── Main App ──────────────────────────────────────────── */
function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Achievements />
        <Journey />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
