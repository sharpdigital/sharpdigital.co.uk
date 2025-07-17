import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Contentful client configuration
const client = process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN 
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    })
  : null;

// Content type definitions
export interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: Document;
    author: string;
    publishDate: string;
    tags: string[];
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
        title: string;
      };
    };
  };
}

export interface Service {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    description: string;
    content: Document;
    features: string[];
    icon: string;
    color: string;
    order: number;
  };
}

export interface TeamMember {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    role: string;
    bio: Document;
    image?: {
      fields: {
        file: {
          url: string;
        };
        title: string;
      };
    };
    linkedIn?: string;
    email?: string;
  };
}

export interface Page {
  sys: {
    id: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    content: Document;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

// API functions
export async function getBlogPosts(limit = 100): Promise<BlogPost[]> {
  if (!client) {
    throw new Error('Contentful client not configured');
  }
  
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishDate'],
      limit,
    });

    return response.items as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!client) {
    throw new Error('Contentful client not configured');
  }
  
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length > 0) {
      return response.items[0] as unknown as BlogPost;
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getBlogPostsByTag(tag: string, limit = 10): Promise<BlogPost[]> {
  if (!client) {
    throw new Error('Contentful client not configured');
  }
  
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.tags[in]': tag,
      order: ['-fields.publishDate'],
      limit,
    });

    return response.items as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts by tag:', error);
    return [];
  }
}

export async function getServices(): Promise<Service[]> {
  if (!client) {
    throw new Error('Contentful client not configured');
  }
  
  try {
    const response = await client.getEntries({
      content_type: 'service',
      order: ['fields.order'],
    });

    return response.items as unknown as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getService(slug: string): Promise<Service | null> {
  if (!client) {
    throw new Error('Contentful client not configured');
  }
  
  try {
    const response = await client.getEntries({
      content_type: 'service',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length > 0) {
      return response.items[0] as unknown as Service;
    }
    return null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!client) {
    throw new Error('Contentful client not configured');
  }
  
  try {
    const response = await client.getEntries({
      content_type: 'teamMember',
      order: ['fields.name'],
    });

    return response.items as unknown as TeamMember[];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function getPage(slug: string): Promise<Page | null> {
  if (!client) {
    throw new Error('Contentful client not configured');
  }
  
  try {
    const response = await client.getEntries({
      content_type: 'page',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length > 0) {
      return response.items[0] as unknown as Page;
    }
    return null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function getAllTags(): Promise<string[]> {
  if (!client) {
    throw new Error('Contentful client not configured');
  }
  
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      select: ['fields.tags'],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allTags = response.items.flatMap((item: any) => item.fields.tags || []);
    return [...new Set(allTags)].sort();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export default client;