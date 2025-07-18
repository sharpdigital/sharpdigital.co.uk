import {
  getBlogPosts as appwriteGetBlogPosts,
  getBlogPost as appwriteGetBlogPost,
  getBlogPostsByTag as appwriteGetBlogPostsByTag,
  getServices as appwriteGetServices,
  getService as appwriteGetService,
  getTeamMembers as appwriteGetTeamMembers,
  getAllTags as appwriteGetAllTags,
} from './appwrite';

import {
  getFallbackBlogPosts,
  getFallbackBlogPost,
  getFallbackServices,
  getFallbackService,
  getFallbackTeamMembers,
  getFallbackTags,
} from './fallbackContent';

import type { BlogPost, Service, TeamMember } from './appwrite';

// Check if Appwrite is configured
const isAppwriteConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT && 
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
  );
};

// Content service functions that use Appwrite when available, fallback content otherwise
export async function getBlogPosts(limit = 100): Promise<BlogPost[]> {
  if (isAppwriteConfigured()) {
    try {
      return await appwriteGetBlogPosts(limit);
    } catch (error) {
      console.warn('Appwrite not available, using fallback content', error);
      return getFallbackBlogPosts();
    }
  }
  return getFallbackBlogPosts();
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (isAppwriteConfigured()) {
    try {
      return await appwriteGetBlogPost(slug);
    } catch (error) {
      console.warn('Appwrite not available, using fallback content', error);
      return getFallbackBlogPost(slug);
    }
  }
  return getFallbackBlogPost(slug);
}

export async function getBlogPostsByTag(tag: string, limit = 10): Promise<BlogPost[]> {
  if (isAppwriteConfigured()) {
    try {
      return await appwriteGetBlogPostsByTag(tag, limit);
    } catch (error) {
      console.warn('Appwrite not available, using fallback content', error);
      const allPosts = getFallbackBlogPosts();
      return allPosts.filter(post => post.tags.includes(tag)).slice(0, limit);
    }
  }
  const allPosts = getFallbackBlogPosts();
  return allPosts.filter(post => post.tags.includes(tag)).slice(0, limit);
}

export async function getServices(): Promise<Service[]> {
  if (isAppwriteConfigured()) {
    try {
      return await appwriteGetServices();
    } catch (error) {
      console.warn('Appwrite not available, using fallback content', error);
      return getFallbackServices();
    }
  }
  return getFallbackServices();
}

export async function getService(slug: string): Promise<Service | null> {
  if (isAppwriteConfigured()) {
    try {
      return await appwriteGetService(slug);
    } catch (error) {
      console.warn('Appwrite not available, using fallback content', error);
      return getFallbackService(slug);
    }
  }
  return getFallbackService(slug);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (isAppwriteConfigured()) {
    try {
      return await appwriteGetTeamMembers();
    } catch (error) {
      console.warn('Appwrite not available, using fallback content', error);
      return getFallbackTeamMembers();
    }
  }
  return getFallbackTeamMembers();
}

export async function getAllTags(): Promise<string[]> {
  if (isAppwriteConfigured()) {
    try {
      return await appwriteGetAllTags();
    } catch (error) {
      console.warn('Appwrite not available, using fallback content', error);
      return getFallbackTags();
    }
  }
  return getFallbackTags();
}