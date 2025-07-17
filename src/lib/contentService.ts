import {
  getBlogPosts as contentfulGetBlogPosts,
  getBlogPost as contentfulGetBlogPost,
  getBlogPostsByTag as contentfulGetBlogPostsByTag,
  getServices as contentfulGetServices,
  getService as contentfulGetService,
  getTeamMembers as contentfulGetTeamMembers,
  getPage as contentfulGetPage,
  getAllTags as contentfulGetAllTags,
} from './contentful';

import {
  getFallbackBlogPosts,
  getFallbackBlogPost,
  getFallbackServices,
  getFallbackService,
  getFallbackTeamMembers,
  getFallbackPage,
  getFallbackTags,
} from './fallbackContent';

import type { BlogPost, Service, TeamMember, Page } from './contentful';

// Check if Contentful is configured
const isContentfulConfigured = () => {
  return !!(
    process.env.CONTENTFUL_SPACE_ID && 
    process.env.CONTENTFUL_ACCESS_TOKEN
  );
};

// Content service functions that use Contentful when available, fallback content otherwise
export async function getBlogPosts(limit = 100): Promise<BlogPost[]> {
  if (isContentfulConfigured()) {
    try {
      return await contentfulGetBlogPosts(limit);
    } catch (error) {
      console.warn('Contentful not available, using fallback content', error);
      return getFallbackBlogPosts();
    }
  }
  return getFallbackBlogPosts();
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (isContentfulConfigured()) {
    try {
      return await contentfulGetBlogPost(slug);
    } catch (error) {
      console.warn('Contentful not available, using fallback content', error);
      return getFallbackBlogPost(slug);
    }
  }
  return getFallbackBlogPost(slug);
}

export async function getBlogPostsByTag(tag: string, limit = 10): Promise<BlogPost[]> {
  if (isContentfulConfigured()) {
    try {
      return await contentfulGetBlogPostsByTag(tag, limit);
    } catch (error) {
      console.warn('Contentful not available, using fallback content', error);
      const allPosts = getFallbackBlogPosts();
      return allPosts.filter(post => post.fields.tags.includes(tag)).slice(0, limit);
    }
  }
  const allPosts = getFallbackBlogPosts();
  return allPosts.filter(post => post.fields.tags.includes(tag)).slice(0, limit);
}

export async function getServices(): Promise<Service[]> {
  if (isContentfulConfigured()) {
    try {
      return await contentfulGetServices();
    } catch (error) {
      console.warn('Contentful not available, using fallback content', error);
      return getFallbackServices();
    }
  }
  return getFallbackServices();
}

export async function getService(slug: string): Promise<Service | null> {
  if (isContentfulConfigured()) {
    try {
      return await contentfulGetService(slug);
    } catch (error) {
      console.warn('Contentful not available, using fallback content', error);
      return getFallbackService(slug);
    }
  }
  return getFallbackService(slug);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (isContentfulConfigured()) {
    try {
      return await contentfulGetTeamMembers();
    } catch (error) {
      console.warn('Contentful not available, using fallback content', error);
      return getFallbackTeamMembers();
    }
  }
  return getFallbackTeamMembers();
}

export async function getPage(slug: string): Promise<Page | null> {
  if (isContentfulConfigured()) {
    try {
      return await contentfulGetPage(slug);
    } catch (error) {
      console.warn('Contentful not available, using fallback content', error);
      return getFallbackPage(slug);
    }
  }
  return getFallbackPage(slug);
}

export async function getAllTags(): Promise<string[]> {
  if (isContentfulConfigured()) {
    try {
      return await contentfulGetAllTags();
    } catch (error) {
      console.warn('Contentful not available, using fallback content', error);
      return getFallbackTags();
    }
  }
  return getFallbackTags();
}