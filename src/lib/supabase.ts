import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Simplified content type definitions (no more sys/fields nesting)
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null; // markdown content
  author: string | null;
  publish_date: string | null;
  tags: string[];
  featured_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null; // markdown content
  features: string[];
  icon: string | null;
  color: string | null;
  order_index: number | null;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  bio: string | null; // markdown content
  image_url: string | null;
  linkedin_url: string | null;
  email: string | null;
  created_at: string;
}

// API functions
export async function getBlogPosts(limit = 100): Promise<BlogPost[]> {
  if (!supabase) {
    throw new Error('Supabase client not configured');
  }
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('publish_date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!supabase) {
    throw new Error('Supabase client not configured');
  }
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getBlogPostsByTag(tag: string, limit = 10): Promise<BlogPost[]> {
  if (!supabase) {
    throw new Error('Supabase client not configured');
  }
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .contains('tags', [tag])
      .order('publish_date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching blog posts by tag:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts by tag:', error);
    return [];
  }
}

export async function getServices(): Promise<Service[]> {
  if (!supabase) {
    throw new Error('Supabase client not configured');
  }
  
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getService(slug: string): Promise<Service | null> {
  if (!supabase) {
    throw new Error('Supabase client not configured');
  }
  
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching service:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!supabase) {
    throw new Error('Supabase client not configured');
  }
  
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching team members:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  if (!supabase) {
    throw new Error('Supabase client not configured');
  }
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('tags');

    if (error) {
      console.error('Error fetching tags:', error);
      return [];
    }

    // Flatten all tags from all posts and get unique values
    const allTags = data
      ?.flatMap(post => post.tags || [])
      .filter((tag, index, array) => array.indexOf(tag) === index) // unique
      .sort() || [];

    return allTags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export default supabase;