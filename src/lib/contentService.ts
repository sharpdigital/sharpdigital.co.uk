import {
  getBlogPosts as supabaseGetBlogPosts,
  getBlogPost as supabaseGetBlogPost,
  getBlogPostsByTag as supabaseGetBlogPostsByTag,
  getServices as supabaseGetServices,
  getService as supabaseGetService,
  getTeamMembers as supabaseGetTeamMembers,
  getAllTags as supabaseGetAllTags,
} from './supabase';

import {
  getFallbackBlogPosts,
  getFallbackBlogPost,
  getFallbackServices,
  getFallbackService,
  getFallbackTeamMembers,
  getFallbackTags,
} from './fallbackContent';

import type { BlogPost, Service, TeamMember } from './supabase';

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};

// Content service functions that use Supabase when available, fallback content otherwise
export async function getBlogPosts(limit = 100): Promise<BlogPost[]> {
  if (isSupabaseConfigured()) {
    try {
      return await supabaseGetBlogPosts(limit);
    } catch (error) {
      console.warn('Supabase not available, using fallback content', error);
      return getFallbackBlogPosts();
    }
  }
  return getFallbackBlogPosts();
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (isSupabaseConfigured()) {
    try {
      return await supabaseGetBlogPost(slug);
    } catch (error) {
      console.warn('Supabase not available, using fallback content', error);
      return getFallbackBlogPost(slug);
    }
  }
  return getFallbackBlogPost(slug);
}

export async function getBlogPostsByTag(tag: string, limit = 10): Promise<BlogPost[]> {
  if (isSupabaseConfigured()) {
    try {
      return await supabaseGetBlogPostsByTag(tag, limit);
    } catch (error) {
      console.warn('Supabase not available, using fallback content', error);
      const allPosts = getFallbackBlogPosts();
      return allPosts.filter(post => post.tags.includes(tag)).slice(0, limit);
    }
  }
  const allPosts = getFallbackBlogPosts();
  return allPosts.filter(post => post.tags.includes(tag)).slice(0, limit);
}

export async function getServices(): Promise<Service[]> {
  if (isSupabaseConfigured()) {
    try {
      return await supabaseGetServices();
    } catch (error) {
      console.warn('Supabase not available, using fallback content', error);
      return getFallbackServices();
    }
  }
  return getFallbackServices();
}

export async function getService(slug: string): Promise<Service | null> {
  if (isSupabaseConfigured()) {
    try {
      return await supabaseGetService(slug);
    } catch (error) {
      console.warn('Supabase not available, using fallback content', error);
      return getFallbackService(slug);
    }
  }
  return getFallbackService(slug);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (isSupabaseConfigured()) {
    try {
      return await supabaseGetTeamMembers();
    } catch (error) {
      console.warn('Supabase not available, using fallback content', error);
      return getFallbackTeamMembers();
    }
  }
  return getFallbackTeamMembers();
}

export async function getAllTags(): Promise<string[]> {
  if (isSupabaseConfigured()) {
    try {
      return await supabaseGetAllTags();
    } catch (error) {
      console.warn('Supabase not available, using fallback content', error);
      return getFallbackTags();
    }
  }
  return getFallbackTags();
}