import { BlogPost, Service, TeamMember, Page } from './contentful';
import { Document, BLOCKS } from '@contentful/rich-text-types';

// Helper function to create a basic rich text document
function createRichTextDocument(content: string): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: 'text',
            value: content,
            marks: [],
            data: {},
          },
        ],
      },
    ],
  };
}

// Fallback blog posts
export const fallbackBlogPosts: BlogPost[] = [
  {
    sys: {
      id: '1',
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-15T10:00:00Z',
    },
    fields: {
      title: 'AI Strategy Implementation Guide',
      slug: 'ai-strategy-implementation-guide',
      excerpt: 'A comprehensive guide to implementing AI strategies in your digital transformation journey with proven methodologies.',
      content: createRichTextDocument('Digital transformation is no longer optional—it\'s essential for business survival and growth. In this comprehensive guide, we\'ll explore proven methodologies for implementing AI strategies that drive real business value.\n\nThe key to successful AI implementation lies in understanding your business objectives first, then identifying the right AI technologies to achieve those goals. We\'ll cover everything from data preparation to model deployment and ongoing optimization.\n\nOur proven framework has helped dozens of companies successfully integrate AI into their operations, resulting in increased efficiency, better customer experiences, and significant cost savings.'),
      author: 'Loreen',
      publishDate: '2024-03-15T10:00:00Z',
      tags: ['AI', 'Digital Transformation', 'Strategy'],
    },
  },
  {
    sys: {
      id: '2',
      createdAt: '2024-03-10T10:00:00Z',
      updatedAt: '2024-03-10T10:00:00Z',
    },
    fields: {
      title: 'Customer Experience Optimization',
      slug: 'customer-experience-optimization',
      excerpt: 'How to optimize customer touchpoints for exceptional journeys through strategic digital transformation.',
      content: createRichTextDocument('Customer experience optimization is at the heart of successful digital transformation. Today\'s customers expect seamless, personalized interactions across all touchpoints.\n\nWe\'ll explore proven strategies for mapping customer journeys, identifying pain points, and implementing digital solutions that enhance every interaction. From initial awareness to post-purchase support, every touchpoint is an opportunity to create value.\n\nOur approach combines data analytics, user research, and cutting-edge technology to create experiences that not only meet but exceed customer expectations.'),
      author: 'Janos',
      publishDate: '2024-03-10T10:00:00Z',
      tags: ['Customer Experience', 'UX', 'Digital Transformation'],
    },
  },
  {
    sys: {
      id: '3',
      createdAt: '2024-03-05T10:00:00Z',
      updatedAt: '2024-03-05T10:00:00Z',
    },
    fields: {
      title: 'Data-Driven Decision Making',
      slug: 'data-driven-decision-making',
      excerpt: 'Transform your data into actionable business intelligence with advanced analytics and visualization tools.',
      content: createRichTextDocument('In today\'s data-rich environment, the ability to make informed decisions quickly is a competitive advantage. Data-driven decision making transforms raw information into strategic insights.\n\nWe\'ll explore how to build robust data pipelines, implement advanced analytics, and create compelling visualizations that tell your data\'s story. From predictive modeling to real-time dashboards, we\'ll cover the tools and techniques that turn data into your most valuable asset.\n\nOur methodology helps organizations move from intuition-based to evidence-based decision making, resulting in better outcomes and reduced risk.'),
      author: 'Loreen',
      publishDate: '2024-03-05T10:00:00Z',
      tags: ['Data Analytics', 'Business Intelligence', 'Decision Making'],
    },
  },
];

// Fallback services
export const fallbackServices: Service[] = [
  {
    sys: { id: '1' },
    fields: {
      title: 'Customer Experience',
      slug: 'customer-experience',
      description: 'Optimize every touchpoint for exceptional customer journeys through digital transformation, user journey mapping, and personalization strategies.',
      content: createRichTextDocument('Customer experience transformation is about creating seamless, personalized interactions that delight customers at every touchpoint. We help organizations map their customer journeys, identify pain points, and implement digital solutions that enhance satisfaction and loyalty.\n\nOur approach includes user research, journey mapping, touchpoint optimization, and the implementation of personalization technologies. We work with you to create experiences that not only meet but exceed customer expectations.'),
      features: ['Journey Mapping', 'Touchpoint Optimization', 'Personalization'],
      icon: 'customer-experience',
      color: 'orange-sharp',
      order: 1,
    },
  },
  {
    sys: { id: '2' },
    fields: {
      title: 'Operational Efficiency',
      slug: 'operational-efficiency',
      description: 'Streamline processes through intelligent automation, workflow optimization, and digital tool integration to improve efficiency.',
      content: createRichTextDocument('Operational efficiency transformation focuses on streamlining processes, eliminating waste, and leveraging technology to maximize productivity. We help organizations identify bottlenecks, implement automation solutions, and optimize workflows for peak performance.\n\nOur methodology includes process analysis, automation implementation, workflow optimization, and change management to ensure sustainable improvements in operational efficiency.'),
      features: ['Process Automation', 'Workflow Optimization', 'Digital Tools'],
      icon: 'operational-efficiency',
      color: 'sky-sharp',
      order: 2,
    },
  },
  {
    sys: { id: '3' },
    fields: {
      title: 'Data & Analytics',
      slug: 'data-and-analytics',
      description: 'Transform data into actionable business intelligence through BI dashboards, predictive analytics, and data visualization.',
      content: createRichTextDocument('Data and analytics transformation enables organizations to make informed decisions based on insights rather than intuition. We help businesses build robust data pipelines, implement advanced analytics, and create compelling visualizations that drive strategic decision-making.\n\nOur approach includes data strategy development, analytics implementation, dashboard creation, and training to ensure your team can leverage data effectively for competitive advantage.'),
      features: ['BI Dashboards', 'Predictive Analytics', 'Data Visualization'],
      icon: 'data-analytics',
      color: 'purple-sharp',
      order: 3,
    },
  },
];

// Fallback team members
export const fallbackTeamMembers: TeamMember[] = [
  {
    sys: { id: '1' },
    fields: {
      name: 'Loreen',
      role: 'Digital Transformation Strategist',
      bio: createRichTextDocument('Loreen is a seasoned digital transformation expert with over 10 years of experience helping organizations navigate their digital evolution. She specializes in AI strategy implementation and data-driven decision making.'),
      linkedIn: 'https://linkedin.com/in/loreen',
      email: 'loreen@sharp.com',
    },
  },
  {
    sys: { id: '2' },
    fields: {
      name: 'Janos',
      role: 'Customer Experience Lead',
      bio: createRichTextDocument('Janos brings deep expertise in customer experience optimization and user research. With a background in both technology and psychology, he helps organizations create truly user-centered digital experiences.'),
      linkedIn: 'https://linkedin.com/in/janos',
      email: 'janos@sharp.com',
    },
  },
];

// Fallback pages
export const fallbackPages: { [key: string]: Page } = {
  about: {
    sys: {
      id: 'about',
      updatedAt: '2024-03-01T10:00:00Z',
    },
    fields: {
      title: 'About #sharp',
      slug: 'about',
      content: createRichTextDocument('#sharp is a leading digital transformation consultancy that helps companies navigate their digital evolution with confidence. We combine deep business acumen with cutting-edge technical expertise to deliver solutions that drive real business value.\n\nOur mission is to make digital transformation accessible and successful for organizations of all sizes. We believe that every company deserves to thrive in the digital age, and we\'re here to make that happen.\n\nWith proven methodologies and a track record of success, we guide organizations through every aspect of their digital journey, from strategy development to implementation and optimization.'),
      metaDescription: 'Learn about #sharp, a leading digital transformation consultancy helping companies navigate their digital evolution with proven methodologies and measurable results.',
      metaKeywords: 'digital transformation, consultancy, about sharp, company story, team',
    },
  },
};

// Helper functions that return fallback content
export function getFallbackBlogPosts(): BlogPost[] {
  return fallbackBlogPosts;
}

export function getFallbackBlogPost(slug: string): BlogPost | null {
  return fallbackBlogPosts.find(post => post.fields.slug === slug) || null;
}

export function getFallbackServices(): Service[] {
  return fallbackServices;
}

export function getFallbackService(slug: string): Service | null {
  return fallbackServices.find(service => service.fields.slug === slug) || null;
}

export function getFallbackTeamMembers(): TeamMember[] {
  return fallbackTeamMembers;
}

export function getFallbackPage(slug: string): Page | null {
  return fallbackPages[slug] || null;
}

export function getFallbackTags(): string[] {
  const allTags = fallbackBlogPosts.flatMap(post => post.fields.tags);
  return [...new Set(allTags)].sort();
}