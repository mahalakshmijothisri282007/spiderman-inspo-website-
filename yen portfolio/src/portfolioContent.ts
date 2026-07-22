/** Mirrors copy & structure from [MJ Portfolio live site](https://mjportfoliodev.vercel.app/). */

export const LIVE_SITE_URL = 'https://mjportfoliodev.vercel.app/' as const

export const SITE_META = {
  title: 'mj portfolio',
  roleLine: 'Fullstack Engineer & AI Specialty',
  heroHeadline: 'Creative Engineer & Designer.',
  heroIntro:
    'I love coding, reading, browsing the internet, designing, editing, and exploring data science.',
} as const

export const ABOUT = {
  eyebrow: 'Who we are',
  statsLine: '32 Members. 30+ Tools Each.',
  paragraphs: [
    'My team and I build, design, and materialize modern digital experiences. As a Data Scientist and UI/UX Designer, I bring logic to the canvas and art to the database.',
    'Beyond teamwork, I am a creative soul continuously pushing boundaries in both front-end engineering and artificial intelligence.',
  ],
} as const

export const FULLSTACK_SKILLS = ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'SQL', 'AWS'] as const

export const AI_TOOLS_SECTION = {
  title: '50+ AI Tools Stack',
  subtitle: 'A complete ecosystem rotating around my workflow. (Hover to pause)',
} as const

/** Tool names as listed on the live portfolio */
export const AI_TOOLS = [
  'GitHub Copilot',
  'Cursor',
  'Windsurf',
  'Lovable.dev',
  'Codeium',
  'Wix ADI',
  '10Web',
  'Claude Code',
  'Relume AI',
  'Framer AI',
  'Tabnine',
  'Snyk',
  'Applitools',
  'Mintlify',
  'Uizard',
  'Sketch2Code',
  'Appy Pie',
  'Mixo',
  'CodeT5',
  'OpenAI Codex',
  'TensorFlow',
  'PyTorch',
  'Google AutoML',
  'SageMaker',
  'DataRobot',
  'Keras',
  'H2O.ai',
  'Vertex AI',
  'PandasAI',
  'KNIME',
  'IBM Watson',
  'MonkeyLearn',
  'BigML',
  'Azure ML',
  'Weka',
  'ChatGPT 4o',
  'Perplexity',
  'Claude 3',
  'Notion AI',
  'Gamma',
  'Harpa AI',
  'ElevenLabs',
  'Runway Gen-3',
  'Midjourney',
  'Opus Clip',
  'Otter.ai',
  'Zapier AI',
  'Descript',
  'Grammarly',
  'Scaler',
] as const

export const CONTACT = {
  title: "Let's Talk.",
  whatsappHref: 'https://wa.me/message/ZGE25LT2HIVEK1',
  whatsappLabel: 'Contact me on WhatsApp',
  fields: {
    name: 'Your Name',
    email: 'Your Email Address',
    message: 'Tell me about your vision...',
    submit: 'Send Message',
  },
} as const

/** Editorial rhythm inspired by minimalist agency sites (e.g. hki.paris contact). */
export const EDITORIAL = {
  taglineLines: ['bright space', 'for bright ideas'] as const,
  heroLineParts: ['You are the ', 'Hello', ' before our ', 'brainstorm.'] as const,
  carouselSlides: ['thinkers · and makers', 'coders · and shippers', 'studio · CREAGENZ'] as const,
  formHeadline: 'Do you want to make breathtaking project together?',
  sentTitle: 'Sent !',
  thankYouLine: "Thank you — we'll get back to you shortly.",
  footerPrideLine: `CREATE WITH CARE • ALL RIGHTS RESERVED ${new Date().getFullYear()} · mj creative engineer · CREAGENZ`,
  legalHint: 'Legal / privacy on request via portfolio.',
  addressBlock: ['mj creative engineer studio · CREAGENZ', 'Hybrid modular workspace · 3D tour & live portfolio', LIVE_SITE_URL],
  channels: [
    { heading: 'General contact', hint: 'New projects & intros', href: CONTACT.whatsappHref, label: 'WhatsApp mj' },
    { heading: 'Portfolio', hint: 'Case studies · live demos', href: LIVE_SITE_URL, label: LIVE_SITE_URL.replace('https://', '') },
    { heading: 'Recruitment · collab', hint: 'Roles · partnerships', href: LIVE_SITE_URL, label: 'Open portfolio →' },
  ] as const,
} as const

export const PROJECTS_BLURB = {
  title: 'Digital experiences',
  body:
    'From UI systems to AI-assisted pipelines — shipped products, prototypes, and internal tools that blend research with execution. Explore the standalone portfolio for interactive showcases.',
} as const
