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

// Team member images
export const teamImages = [
  '/images/team/team-1.svg',
  '/images/team/team-2.svg',
  '/images/team/team-3.svg',
];

// Blog Posts Data


// Testimonials Data
export const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Project Manager',
    company: 'ABC Construction',
    content: 'Excellent service! Their steel detailing work is accurate and delivered on time. Highly recommended for any construction project.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Architect',
    company: 'Design Studio Inc.',
    content: 'Very professional team. Their cost estimation helped us save significantly on our project. The reports were detailed and easy to understand.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mike Wilson',
    role: 'Contractor',
    company: 'Wilson Builders',
    content: 'The quality of shop drawings is outstanding. They understand complex requirements and deliver exceptional results every time.',
    rating: 5,
  },
];

// Team Members Data
export const teamMembers = [
  {
    id: 1,
    name: 'John Engineer',
    role: 'Founder & CEO',
    bio: '15+ years experience in civil engineering and project management.',
    email: 'john@civilpro.com',
  },
  {
    id: 2,
    name: 'Sarah Designer',
    role: 'Head of Detailing',
    bio: 'Expert in steel detailing and rebar detailing with 10 years of experience.',
    email: 'sarah@civilpro.com',
  },
  {
    id: 3,
    name: 'Mike Estimator',
    role: 'Cost Estimation Lead',
    bio: 'Specialist in construction cost analysis and BOQ preparation.',
    email: 'mike@civilpro.com',
  },
];

// Site Configuration
export const siteConfig = {
  name: 'CivilPro Services',
  description: 'Professional Civil Engineering Services',
  email: 'info@civilpro.com',
  phone: '+1 (555) 123-4567',
  address: '123 Engineering St, City, State 12345',
  social: {
    facebook: 'https://facebook.com/civilpro',
    twitter: 'https://twitter.com/civilpro',
    linkedin: 'https://linkedin.com/company/civilpro',
    instagram: 'https://instagram.com/civilpro',
  },
};

// Default export for backward compatibility
export default {
  services,
  blogPosts,
  testimonials,
  teamMembers,
  siteConfig,
};