// Services Data
export const services = [
  {
    id: 1,
    slug: 'steel-detailing',
    title: 'Steel Detailing',
    icon: '🏗️',
    image: '/images/services/steel-detailing.svg',
    shortDescription: 'Precise steel detailing services including connection design and erection drawings.',
    description: 'Our steel detailing services include comprehensive structural steel drawings, connection details, anchor bolt plans, and material lists. We use industry-standard software to ensure accuracy and compliance with building codes.',
    features: [
      'Structural steel shop drawings',
      'Connection design and detailing',
      'Anchor bolt plans',
      'Material lists and BOM',
      'Erection drawings',
      '3D modeling and visualization'
    ],
    price: 'Starting from $199',
    timeline: '3-5 business days',
  },
  {
    id: 2,
    slug: 'rebar-detailing',
    title: 'Rebar Detailing',
    icon: '🔩',
    image: '/images/services/rebar-detailing.svg',
    shortDescription: 'Detailed reinforcement bar schedules and placement drawings for concrete structures.',
    description: 'Complete rebar detailing services including bar bending schedules, placement drawings, and reinforcement details for all types of concrete structures.',
    features: [
      'Bar bending schedules',
      'Rebar placement drawings',
      'Reinforcement details',
      'Quantity calculations',
      'Site support drawings',
      'Development length calculations'
    ],
    price: 'Starting from $149',
    timeline: '2-4 business days',
  },
  {
    id: 6,
    slug: 'shop-drawings',
    title: 'Shop Drawings',
    icon: '📐',
    image: '/images/services/shop-drawings.svg',
    shortDescription: 'Detailed shop drawings for fabrication and construction.',
    description: 'Comprehensive shop drawing services including fabrication drawings, installation drawings, and as-built drawings for various construction components.',
    features: [
      'Fabrication drawings',
      'Installation drawings',
      'As-built drawings',
      'Assembly details',
      'Technical specifications',
      'Material schedules'
    ],
    price: 'Starting from $179',
    timeline: '4-6 business days',
  },
  {
    id: 3,
    slug: 'quantity-takeoff',
    title: 'Quantity Takeoff',
    icon: '📏',
    image: '/images/services/quantity-takeoff.svg',
    shortDescription: 'Accurate quantity takeoff services for all construction materials and components.',
    description: 'We provide accurate quantity takeoff services using advanced software and methodologies to ensure precise material quantities for your projects.',
    features: [
      'Material quantity calculations',
      'Area and volume calculations',
      'Component counting',
      'Waste factor analysis',
      'Digital takeoff reports',
      'Excel and PDF formats'
    ],
    price: 'Starting from $99',
    timeline: '1-3 business days',
  },
  {
    id: 4,
    slug: 'cost-estimation',
    title: 'Cost Estimation',
    icon: '💰',
    image: '/images/services/cost-estimation.svg',
    shortDescription: 'Detailed cost estimation services to help you plan and budget your construction projects.',
    description: 'Comprehensive cost estimation services including material costs, labor costs, equipment costs, and overhead calculations for accurate project budgeting.',
    features: [
      'Material cost estimation',
      'Labor cost calculation',
      'Equipment cost analysis',
      'Overhead and profit margins',
      'Budget planning',
      'Cost comparison reports'
    ],
    price: 'Starting from $199',
    timeline: '4-7 business days',
  },
  {
    id: 5,
    slug: 'boq-preparation',
    title: 'BOQ Preparation',
    icon: '📋',
    image: '/images/services/boq-preparation.svg',
    shortDescription: 'Professional Bill of Quantities preparation for tendering and procurement.',
    description: 'Detailed Bill of Quantities preparation services for tendering, procurement, and contract management. We ensure accurate and comprehensive BOQ documents.',
    features: [
      'Tender BOQ preparation',
      'Item descriptions and specifications',
      'Unit rate analysis',
      'Quantity verification',
      'Contract documentation',
      'Cost breakdown structures'
    ],
    price: 'Starting from $149',
    timeline: '3-6 business days',
  },
];

// Blog posts with images
export const blogPosts = [
  {
    id: 1,
    slug: 'importance-of-steel-detailing',
    title: 'The Importance of Accurate Steel Detailing in Construction',
    excerpt: 'Learn why precise steel detailing is crucial for the success of your construction projects.',
    category: 'Steel Detailing',
    date: '2024-01-15',
    author: 'John Engineer',
    readTime: '5 min read',
    image: '/images/blog/steel-detailing-blog.svg',
    content: `
      <h2>Why Steel Detailing Matters</h2>
      <p>Accurate steel detailing is the backbone of any successful construction project involving structural steel...</p>
    `,
  },
  // Add more blog posts with images
];

// Hero images
export const heroImages = {
  main: '/images/hero/hero-main.svg',
  background: '/images/hero/hero-bg.svg',
};

// Project/Portfolio images
export const projectImages = [
  '/images/projects/project-1.svg',
  '/images/projects/project-2.svg',
  '/images/projects/project-3.svg',
  '/images/projects/project-4.svg',
];

// Site Configuration
export const siteConfig = {
  name: 'Precon Detailing',
  description: 'Steel & Rebar Detailing & Estimation Services',
  email: 'info@precondetailing.com',
  phone: '+92 317 7194108',
  address: 'Pakistan — Serving Clients Worldwide',
  social: {
    facebook: 'https://www.facebook.com/precondetailing',
    twitter: 'https://x.com/precondetailing',
    linkedin: '',
    instagram: 'https://www.instagram.com/precondetailing/',
    youtube: 'https://www.youtube.com/@precondetailing',
    tiktok: 'https://www.tiktok.com/@precon.detailing',
  },
};

// Default export for backward compatibility
export default {
  services,
  blogPosts,
  siteConfig,
};