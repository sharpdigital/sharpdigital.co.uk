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
      'We help organisations optimise every touchpoint to create seamless customer experiences that drive loyalty, engagement, and growth.',
    content: `# Customer Experience Transformation

In today's competitive landscape, customer experience is a key differentiator. We map your customer journeys to identify friction points, uncover opportunities, and implement smarter, more personalised digital experiences across web, mobile, email, and in-app interactions.

By combining user journey strategy with data-driven personalisation, we help turn disconnected interactions into meaningful customer relationships that increase conversion, reduce churn, and strengthen brand loyalty.

Whether improving an existing platform or launching new digital services, we work with your team to create experiences that not only perform better, but leave a lasting impression.`,
    features: ['Journey Mapping', 'Touchpoint Optimization', 'Personalization'],
    orderIndex: 1,
  },
  {
    $id: '2',
    title: 'Operational Efficiency',
    slug: 'operational-efficiency',
    image: '/img/service_2.jpg',
    description:
      'Streamlining processes through intelligent automation, workflow optimisation, and digital tool integration to improve efficiency.',
    content: `# Operational Efficiency Transformation

Inefficient processes drain resources, frustrate teams, and hold back growth. We help organisations identify where automation, workflow optimisation, and strategic tool integration can deliver immediate wins, freeing your people to focus on high-value work that actually drives business results.

Our approach begins with clarity. We audit your current operations to understand where bottlenecks exist, where manual work dominates, and where the right technology can create meaningful impact. From there, we design and implement solutions that connect your systems, automate repetitive tasks, and create seamless workflows that your teams actually want to use. Whether it's automating customer onboarding, streamlining internal approvals, or integrating disparate tools into a unified ecosystem, we ensure every change delivers both efficiency gains and improved user experience.

The payoff is significant: faster turnaround times, reduced operational costs, fewer errors, and teams with the bandwidth to innovate.`,
    features: ['Process Automation', 'Workflow Optimization', 'Digital Tools'],
    orderIndex: 2,
  },
  {
    $id: '3',
    title: 'Data & Analytics',
    slug: 'data-and-analytics',
    image: '/img/service_3.jpg',
    description:
      'Transforming data into actionable business intelligence through BI dashboards, predictive analytics, and data visualisation.',
    content: `# Data & Analytics Transformation

Most organisations have data but lack the capability to see the stories the data is telling, spot opportunities, or make confident decisions fast. We build custom BI solutions that give your leadership team and frontline managers the insights they need, in real time. From revenue trends and customer behaviour to operational performance and market opportunities, we design dashboards and analytics that answer your toughest questions.

Beyond reporting the past, we help you anticipate the future. Our predictive analytics capabilities identify emerging patterns and potential risks before they impact your business, giving you the foresight to stay ahead.

The impact is immediate and measurable: faster decision-making, reduced risk, improved resource allocation, and growth fuelled by genuine market insight rather than guesswork. Your data becomes your competitive edge.`,
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
