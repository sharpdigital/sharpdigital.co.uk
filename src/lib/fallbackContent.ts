import { BlogPost, CardSum, TeamMember } from './appwrite';

// Fallback blog posts with Appwrite document structure
export const fallbackBlogPosts: BlogPost[] = [
  {
    $id: '1',
    title: 'AI Strategy Implementation Guide',
    slug: 'ai-strategy-implementation-guide',
    excerpt:
      'A comprehensive guide to implementing AI strategies in your digital transformation journey with proven methodologies.',
    content: `# AI Strategy Implementation Guide

Digital transformation is no longer optional—it's essential for business survival and growth. In this comprehensive guide, we'll explore proven methodologies for implementing AI strategies that drive real business value.

## Understanding Your Business Objectives

The key to successful AI implementation lies in understanding your business objectives first, then identifying the right AI technologies to achieve those goals. We'll cover everything from data preparation to model deployment and ongoing optimization.

## Our Proven Framework

Our proven framework has helped dozens of companies successfully integrate AI into their operations, resulting in:

- Increased efficiency
- Better customer experiences
- Significant cost savings

## Getting Started

Start by assessing your current data infrastructure and identifying clear use cases where AI can provide measurable business impact.`,
    author: 'Loreen',
    publishDate: '2024-03-15T10:00:00Z',
    tags: ['AI', 'Digital Transformation', 'Strategy'],
    featuredImageUrl: '/img/blog_1.jpg',
    $createdAt: '2024-03-15T10:00:00Z',
    $updatedAt: '2024-03-15T10:00:00Z',
  },
  {
    $id: '2',
    title: 'Customer Experience Optimization',
    slug: 'customer-experience-optimization',
    excerpt:
      'How to optimize customer touchpoints for exceptional journeys through strategic digital transformation.',
    content: `# Customer Experience Optimization

Customer experience optimization is at the heart of successful digital transformation. Today's customers expect seamless, personalized interactions across all touchpoints.

## Mapping Customer Journeys

We'll explore proven strategies for mapping customer journeys, identifying pain points, and implementing digital solutions that enhance every interaction. From initial awareness to post-purchase support, every touchpoint is an opportunity to create value.

## Our Approach

Our approach combines:

- Data analytics
- User research
- Cutting-edge technology

This creates experiences that not only meet but exceed customer expectations.

## Key Benefits

- Improved customer satisfaction
- Increased loyalty and retention
- Higher conversion rates
- Better brand perception`,
    author: 'Janos',
    publishDate: '2024-03-10T10:00:00Z',
    tags: ['Customer Experience', 'UX', 'Digital Transformation'],
    featuredImageUrl: '/img/blog_2.jpg',
    $createdAt: '2024-03-10T10:00:00Z',
    $updatedAt: '2024-03-10T10:00:00Z',
  },
  {
    $id: '3',
    title: 'Data-Driven Decision Making',
    slug: 'data-driven-decision-making',
    excerpt:
      'Transform your data into actionable business intelligence with advanced analytics and visualization tools.',
    content: `# Data-Driven Decision Making

In today's data-rich environment, the ability to make informed decisions quickly is a competitive advantage. Data-driven decision making transforms raw information into strategic insights.

## Building Robust Data Pipelines

We'll explore how to build robust data pipelines, implement advanced analytics, and create compelling visualizations that tell your data's story. From predictive modeling to real-time dashboards, we'll cover the tools and techniques that turn data into your most valuable asset.

## Our Methodology

Our methodology helps organizations move from intuition-based to evidence-based decision making, resulting in:

- Better outcomes
- Reduced risk
- Improved operational efficiency
- Strategic competitive advantage

## Key Components

- Data strategy development
- Analytics implementation
- Dashboard creation
- Team training and enablement`,
    author: 'Loreen',
    publishDate: '2024-03-05T10:00:00Z',
    tags: ['Data Analytics', 'Business Intelligence', 'Decision Making'],
    featuredImageUrl: '/img/blog_3.jpg',
    $createdAt: '2024-03-05T10:00:00Z',
    $updatedAt: '2024-03-05T10:00:00Z',
  },
];

//TODO: define news on the backend

export const fallbackBlogCards: CardSum[] = [
  {
    $id: '1',
    title: 'AI Strategy Implementation Guide',
    slug: 'ai-strategy-implementation-guide',
    image: '/img/blog_1.jpg',
    description:
      'A comprehensive guide to implementing AI strategies in your digital transformation journey with proven methodologies.',
    /* features: ['Journey Mapping', 'Touchpoint Optimization', 'Personalization'], */
    orderIndex: 1,
    author: 'Loreen',
    $createdAt: '2024-03-01T10:00:00Z',
    buttonText: 'Read More',
  },
  {
    $id: '2',
    title: 'Customer Experience Optimization',
    slug: 'customer-experience-optimization',
    image: '/img/blog_2.jpg',
    description:
      'How to optimize customer touchpoints for exceptional journeys through strategic digital transformation.',
    /* features: ['Customer Journey Design', 'Experience Mapping', 'Service Design'], */
    orderIndex: 2,
    author: 'Janos',
    $createdAt: '2024-03-10T10:00:00Z',
    buttonText: 'Read More',
  },
  {
    $id: '3',
    title: 'Data-Driven Decision Making',
    slug: 'data-driven-decision-making',
    image: '/img/blog_3.jpg',
    description:
      'Transform your data into actionable business intelligence with advanced analytics and visualization tools.',
    /* features: ['Analytics', 'Data Visualization', 'Insights Automation'], */
    orderIndex: 3,
    author: 'Loreen',
    $createdAt: '2024-03-15T10:00:00Z',
    buttonText: 'Read More',
  },
];

// Fallback services with Appwrite document structure
export const fallbackServices: CardSum[] = [
  {
    $id: '1',
    title: 'Customer Experience',
    slug: 'customer-experience',
    image: '/img/service_1.jpg',
    description:
      'Optimize every touchpoint for exceptional customer journeys through digital transformation, user journey mapping, and personalization strategies.',
    content: `# Customer Experience Transformation

Customer experience transformation is about creating seamless, personalized interactions that delight customers at every touchpoint. We help organizations map their customer journeys, identify pain points, and implement digital solutions that enhance satisfaction and loyalty.

## Our Approach

Our comprehensive approach includes:

- **User Research**: Deep understanding of customer needs and behaviors
- **Journey Mapping**: Visualizing the complete customer experience
- **Touchpoint Optimization**: Enhancing every interaction point
- **Personalization Technologies**: Implementing AI-driven personalization

## Outcomes

We work with you to create experiences that not only meet but exceed customer expectations, resulting in:

- Increased customer satisfaction scores
- Higher retention rates
- Improved brand loyalty
- Better customer lifetime value`,
    features: ['Journey Mapping', 'Touchpoint Optimization', 'Personalization'],
    orderIndex: 1,
  },
  {
    $id: '2',
    title: 'Operational Efficiency',
    slug: 'operational-efficiency',
    image: '/img/service_2.jpg',
    description:
      'Streamline processes through intelligent automation, workflow optimization, and digital tool integration to improve efficiency.',
    content: `# Operational Efficiency Transformation

Operational efficiency transformation focuses on streamlining processes, eliminating waste, and leveraging technology to maximize productivity. We help organizations identify bottlenecks, implement automation solutions, and optimize workflows for peak performance.

## Our Methodology

Our proven methodology includes:

- **Process Analysis**: Comprehensive review of current operations
- **Automation Implementation**: Smart automation for repetitive tasks
- **Workflow Optimization**: Redesigning processes for efficiency
- **Change Management**: Ensuring sustainable adoption

## Key Benefits

- Reduced operational costs
- Faster process execution
- Improved accuracy and quality
- Enhanced employee satisfaction
- Better resource utilization`,
    features: ['Process Automation', 'Workflow Optimization', 'Digital Tools'],
    orderIndex: 2,
  },
  {
    $id: '3',
    title: 'Data & Analytics',
    slug: 'data-and-analytics',
    image: '/img/service_3.jpg',
    description:
      'Transform data into actionable business intelligence through BI dashboards, predictive analytics, and data visualization.',
    content: `# Data & Analytics Transformation

Data and analytics transformation enables organizations to make informed decisions based on insights rather than intuition. We help businesses build robust data pipelines, implement advanced analytics, and create compelling visualizations that drive strategic decision-making.

## Our Approach

Our comprehensive data strategy includes:

- **Data Strategy Development**: Aligning data initiatives with business goals
- **Analytics Implementation**: Advanced analytics and machine learning
- **Dashboard Creation**: Interactive business intelligence dashboards
- **Team Training**: Enabling your team to leverage data effectively

## Delivered Value

- Real-time business insights
- Predictive analytics capabilities
- Data-driven decision making
- Competitive advantage through analytics
- Improved ROI on data investments`,
    features: ['BI Dashboards', 'Predictive Analytics', 'Data Visualization'],
    orderIndex: 3,
  },
];

// Fallback team members with Appwrite document structure
export const fallbackTeamMembers: TeamMember[] = [
  {
    $id: '1',
    name: 'Loreen',
    slug: 'loreen',
    role: 'Business Transformation Strategist',
    description:
      'Strategic digital strategist and partnerships specialist with deep expertise in brand positioning, AI implementation, and stakeholder engagement. Expertise in guiding organisations through complex commercial and digital change, driving measurable business impact. She combines deep expertise in AI strategy, data analytics, and change management with a sharp focus on strategic communications and market growth to deliver outcomes that last.',
    bio: `# About Loreen

Strategic digital strategist and partnerships specialist with deep expertise in brand positioning, AI implementation, and stakeholder engagement. Expertise in guiding organisations through complex commercial and digital change, driving measurable business impact. She combines deep expertise in AI strategy, data analytics, and change management with a sharp focus on strategic communications and market growth to deliver outcomes that last.

## Expertise

- AI Strategy & Implementation
- Digital Transformation Leadership
- Data Analytics & Business Intelligence
- Change Management & Market Growth
- Strategic Communications`,
    features: [
      'AI Strategy & Implementation',
      'Digital Transformation Leadership',
      'Data Analytics & Business Intelligence',
      'Change Management & Market Growth',
      'Strategic Communications',
    ],
    imageUrl: '/img/team_loreen.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/loreen-fraser-owusu/',
    email: 'loreen@sharpdigital.co.uk',
    $createdAt: '2024-03-01T10:00:00Z',
    $updatedAt: '2024-03-01T10:00:00Z',
  },
  {
    $id: '2',
    name: 'Janos',
    slug: 'janos',
    role: 'Principal Full Stack Architect',
    description:
      'Senior full-stack creative engineer and digital systems specialist with deep expertise in scalable web platforms, modern product architecture, and AI-enabled platform optimisation. As a key co-founder of #sharp, Janos brings rare technical depth combined with strategic systems-level thinking, enabling organisations to balance innovation with reliability across complex digital challenges.',
    bio: `# About Janos

Senior full-stack creative engineer and digital systems specialist with deep expertise in scalable web platforms, modern product architecture, and AI-enabled platform optimisation. As a key co-founder of #sharp, Janos brings rare technical depth combined with strategic systems-level thinking, enabling organisations to balance innovation with reliability across complex digital challenges.

## Expertise

- Full-Stack Architecture & AI-powered Platform Engineering
- Scalable Web Systems & Performance Optimisation
- Product Engineering & Digital Strategy
- Legacy System Modernisation
- Next-Generation Web Technologies`,
    features: [
      'Full-Stack Architecture & AI-powered Platform Engineering',
      'Scalable Web Systems & Performance Optimisation',
      'Product Engineering & Digital Strategy',
      'Legacy System Modernisation',
      'Next-Generation Web Technologies',
    ],
    imageUrl: '/img/team_janos.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/janos-csikos/',
    email: 'janos@sharpdigital.co.uk',
    $createdAt: '2024-03-01T10:00:00Z',
    $updatedAt: '2024-03-01T10:00:00Z',
  },
  {
    $id: '3',
    name: 'David',
    slug: 'david',
    role: 'Creative Technology Director',
    description:
      'David is an intuitive digital experience specialist bringing deep expertise in web development, creative direction, branding, AI-enabled application development, and immersive digital technologies. Known for bridging technical execution with strategic thinking, delivering high-performance digital products that balance creative excellence with commercial impact.',
    bio: `# About David

David is an intuitive digital experience specialist bringing deep expertise in web development, creative direction, branding, AI-enabled application development, and immersive digital technologies. Known for bridging technical execution with strategic thinking, delivering high-performance digital products that balance creative excellence with commercial impact.

## Expertise

- Creative Application Architecture
- Digital Experience & User Experience Design
- Mobile & Immersive Technologies
- High-Performance Development
- Technical Problem-Solving & Innovation`,
    features: [
      'Creative Application Architecture',
      'Digital Experience & User Experience Design',
      'Mobile & Immersive Technologies',
      'High-Performance Development',
      'Technical Problem-Solving & Innovation',
    ],
    imageUrl: '/img/team_david.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/davidszucs/',
    email: 'david@sharpdigital.co.uk',
    $createdAt: '2026-05-10T10:00:00Z',
    $updatedAt: '2026-05-10T10:00:00Z',
  },
];

// Helper functions that return fallback content
export function getFallbackBlogPosts(): BlogPost[] {
  return fallbackBlogPosts;
}

export function getFallbackBlogPost(slug: string): BlogPost | null {
  return fallbackBlogPosts.find((post) => post.slug === slug) || null;
}

export function getFallbackServices(): CardSum[] {
  return fallbackServices;
}

export function getFallbackService(slug: string): CardSum | null {
  return fallbackServices.find((service) => service.slug === slug) || null;
}

export function getFallbackTeamMembers(): TeamMember[] {
  return fallbackTeamMembers;
}

export function getFallbackTeamMember(slug: string): TeamMember | null {
  return fallbackTeamMembers.find((m) => m.slug === slug) ?? null;
}

export function getFallbackTags(): string[] {
  const allTags = fallbackBlogPosts.flatMap((post) => post.tags);
  return [...new Set(allTags)].sort();
}
