import { BlogPost, CardSum, Service, TeamMember } from './appwrite';

// Fallback blog posts with Appwrite document structure
export const fallbackBlogPosts: BlogPost[] = [
  {
    $id: '4',
    title:
      'The OpenClaw Paradox: Hype in China, Caution in Policy and What It Means for AI Governance',
    slug: 'openclaw-paradox-china-ai-governance',
    excerpt:
      'China is not rejecting AI agents, but its OpenClaw guidance treats them as high-risk operational systems. What the policy signal means for agentic AI governance.',
    content: `# The OpenClaw Paradox: Hype in China, Caution in Policy and What It Means for AI Governance

China is not rejecting AI agents, but it is making clear that agent deployment must be controlled like a high-risk operational system, not treated like an ordinary chatbot tool.

## When agents stop answering and start acting

What happens when an AI tool stops answering questions and starts taking action on its own? That is the real concern around the rapid rise in the use of OpenClaw in China. Official Chinese state security reports estimate that there are more than 200,000 active OpenClaw internet assets globally, including around 23,000 in China alone.

Much of the public discussion has focused on speed, automation and productivity. But recent guidance from Chinese authorities is steering users in a different direction. The message is not that AI agents should be avoided. It is that once an agent can access files, leverage system tools and act across systems, it creates a different level of risk. At that point, it should no longer be treated like an ordinary chatbot, but as a high-risk operational system that needs clear controls, limited permissions and ongoing oversight.

## What China's March 2026 advisory said

China's policy signal has been much more cautious than the market excitement. In March 2026, the MIIT-run National Vulnerability Database issued a "six dos and six don'ts" style advisory for OpenClaw users. The guidance did not frame the tool as an ordinary productivity assistant. Instead, it focused on operational safeguards such as:

- Using the latest official version
- Limiting internet exposure
- Applying least privilege
- Using third-party skill markets carefully
- Guarding against browser hijacking
- Checking regularly for security patches

Users were also warned not to expose instances directly to the internet, not to deploy with administrator accounts, and not to disable detailed log auditing.

## A second wave of operational guidance

That message became even clearer in the next wave of guidance. China's security alerts described risks not only in OpenClaw's default configuration and vulnerability management, but also in its plugin ecosystem and behaviour control mechanisms. State media reporting on the later CNCERT and Cyber Security Association guidance said individual users should run OpenClaw only on dedicated devices, virtual machines or containers, avoid administrator privileges, and keep sensitive personal data out of the OpenClaw environment.

The more technical recommendations went further, covering IP allowlisting (also known as white-listing), VPN-only remote access, detailed logging, strict filesystem controls, third-party skill review, cloud IAM (Identity and Access Management) controls, supply chain checks and stronger data protection in cloud deployments.

## Why this matters for AI governance

This is why the OpenClaw story matters for AI governance. China is not rejecting AI agents. It is recognising that once a model can take actions, call tools, interact with external systems and operate with elevated permissions, the governance question changes. The issue is no longer only whether an answer is wrong. It is whether an agent can delete files, leak credentials, misuse permissions or trigger wider system disruption. That is much closer to operational risk than to ordinary chatbot risk.

## Treating agentic AI as a governance question

The wider issue is one of effective guardrailing. As AI tools move from generating content to taking action, governance must move with them. Businesses should not assess agentic AI only through an innovation lens. They should also look carefully at access rights, system boundaries, monitoring, human checkpoints and incident response.

In practice, that means treating deployment as a governance issue from the start, not as a technical experiment to fix later. Where agents may interact with sensitive data or critical systems, early input from privacy, legal and security professionals will often be essential.`,
    author: '#sharp Security Expert',
    publishDate: '2026-05-15T10:00:00Z',
    tags: ['AI', 'AI Governance', 'Strategy', 'China', 'OpenClaw', 'Agents', 'Harness'],
    featuredImageUrl: '/img/blog_openclaw.jpg',
    $createdAt: '2026-05-15T10:00:00Z',
    $updatedAt: '2026-05-15T10:00:00Z',
  },
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
    $id: '4',
    title:
      'The OpenClaw Paradox: Hype in China, Caution in Policy and What It Means for AI Governance',
    slug: 'openclaw-paradox-china-ai-governance',
    image: '/img/blog_1.jpg',
    description:
      'China is not rejecting AI agents, but its OpenClaw guidance treats them as high-risk operational systems. What the policy signal means for agentic AI governance.',
    orderIndex: 0,
    author: '#sharp Security Expert',
    $createdAt: '2026-05-15T10:00:00Z',
    buttonText: 'Read More',
  },
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
export const fallbackServices: Service[] = [
  {
    $id: '1',
    title: 'Customer Experience',
    slug: 'customer-experience',
    imageUrl: '/img/service_1.jpg',
    description:
      'We help organisations optimise every touchpoint to create seamless customer experiences that drive loyalty, engagement, and growth.',
    content: `In today's competitive landscape, customer experience is a key differentiator. We map your customer journeys to identify friction points, uncover opportunities, and implement smarter, more personalised digital experiences across web, mobile, email, and in-app interactions.

By combining user journey strategy with data-driven personalisation, we help turn disconnected interactions into meaningful customer relationships that increase conversion, reduce churn, and strengthen brand loyalty.

Whether improving an existing platform or launching new digital services, we work with your team to create experiences that not only perform better, but leave a lasting impression.`,
    features: ['Journey Mapping', 'Touchpoint Optimization', 'Personalization'],
    orderIndex: 1,
    $createdAt: '2024-03-01T10:00:00Z',
    $updatedAt: '2026-05-11T10:00:00Z',
  },
  {
    $id: '2',
    title: 'Operational Efficiency',
    slug: 'operational-efficiency',
    imageUrl: '/img/service_2.jpg',
    description:
      'Streamlining processes through intelligent automation, workflow optimisation, and digital tool integration to improve efficiency.',
    content: `Inefficient processes drain resources, frustrate teams, and hold back growth. We help organisations identify where automation, workflow optimisation, and strategic tool integration can deliver immediate wins, freeing your people to focus on high-value work that actually drives business results.

Our approach begins with clarity. We audit your current operations to understand where bottlenecks exist, where manual work dominates, and where the right technology can create meaningful impact. From there, we design and implement solutions that connect your systems, automate repetitive tasks, and create seamless workflows that your teams actually want to use. Whether it's automating customer onboarding, streamlining internal approvals, or integrating disparate tools into a unified ecosystem, we ensure every change delivers both efficiency gains and improved user experience.

The payoff is significant: faster turnaround times, reduced operational costs, fewer errors, and teams with the bandwidth to innovate.`,
    features: ['Process Automation', 'Workflow Optimization', 'Digital Tools'],
    orderIndex: 2,
    $createdAt: '2024-03-01T10:00:00Z',
    $updatedAt: '2026-05-11T10:00:00Z',
  },
  {
    $id: '3',
    title: 'Data & Analytics',
    slug: 'data-and-analytics',
    imageUrl: '/img/service_3.jpg',
    description:
      'Transforming data into actionable business intelligence through BI dashboards, predictive analytics, and data visualisation.',
    content: `Most organisations have data but lack the capability to see the stories the data is telling, spot opportunities, or make confident decisions fast. We build custom BI solutions that give your leadership team and frontline managers the insights they need, in real time. From revenue trends and customer behaviour to operational performance and market opportunities, we design dashboards and analytics that answer your toughest questions.

Beyond reporting the past, we help you anticipate the future. Our predictive analytics capabilities identify emerging patterns and potential risks before they impact your business, giving you the foresight to stay ahead.

The impact is immediate and measurable: faster decision-making, reduced risk, improved resource allocation, and growth fuelled by genuine market insight rather than guesswork. Your data becomes your competitive edge.`,
    features: ['BI Dashboards', 'Predictive Analytics', 'Data Visualization'],
    orderIndex: 3,
    $createdAt: '2024-03-01T10:00:00Z',
    $updatedAt: '2026-05-11T10:00:00Z',
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
      'Loreen is a strategic communications expert and partnerships specialist with deep expertise in positioning, AI implementation, and stakeholder engagement. She has decades experience in guiding organisations through complex commercial and digital change, leading to measurable business impact. Loreen combines deep expertise in AI strategy, data analytics, and change management with a sharp focus on strategic communications and market growth to deliver outcomes that last.',
    bio: `# About Loreen

Loreen is a strategic communications expert and partnerships specialist with deep expertise in positioning, AI implementation, and stakeholder engagement. She has decades experience in guiding organisations through complex commercial and digital change, leading to measurable business impact. Loreen combines deep expertise in AI strategy, data analytics, and change management with a sharp focus on strategic communications and market growth to deliver outcomes that last.

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
      'Janos is a senior full-stack creative engineer and digital systems specialist with deep expertise in scalable web platforms, modern product architecture, and AI-enabled platform optimisation. As a key co-founder of #sharp, Janos brings rare technical depth combined with strategic systems-level thinking, enabling organisations to balance innovation with reliability across complex digital challenges.',
    bio: `# About Janos

Janos is a senior full-stack creative engineer and digital systems specialist with deep expertise in scalable web platforms, modern product architecture, and AI-enabled platform optimisation. As a key co-founder of #sharp, Janos brings rare technical depth combined with strategic systems-level thinking, enabling organisations to balance innovation with reliability across complex digital challenges.

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

export function getFallbackServices(): Service[] {
  return fallbackServices;
}

export function getFallbackService(slug: string): Service | null {
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
