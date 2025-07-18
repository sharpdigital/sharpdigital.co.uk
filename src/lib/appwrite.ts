import { Client, Databases, Query } from 'appwrite';

// Appwrite client configuration
const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const appwriteProjectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const appwriteDatabaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

export const client = appwriteEndpoint && appwriteProjectId 
  ? new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(appwriteProjectId)
  : null;

export const databases = client ? new Databases(client) : null;

// Collection IDs (will be set when Appwrite collections are created)
export const COLLECTIONS = {
  BLOG_POSTS: 'blog_posts',
  SERVICES: 'services',
  TEAM_MEMBERS: 'team_members',
} as const;

// Appwrite document type definitions
export interface BlogPost {
  $id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null; // markdown content
  author?: string | null;
  publishDate?: string | null; // ISO date string
  tags: string[];
  featuredImageUrl?: string | null;
  $createdAt: string;
  $updatedAt: string;
}

export interface Service {
  $id: string;
  title: string;
  slug: string;
  description?: string | null;
  content?: string | null; // markdown content
  features: string[];
  icon?: string | null;
  color?: string | null;
  orderIndex?: number | null;
  $createdAt: string;
}

export interface TeamMember {
  $id: string;
  name: string;
  role?: string | null;
  bio?: string | null; // markdown content
  imageUrl?: string | null;
  linkedinUrl?: string | null;
  email?: string | null;
  $createdAt: string;
}

// API functions
export async function getBlogPosts(limit = 100): Promise<BlogPost[]> {
  if (!databases || !appwriteDatabaseId) {
    throw new Error('Appwrite client not configured');
  }
  
  try {
    const response = await databases.listDocuments(
      appwriteDatabaseId,
      COLLECTIONS.BLOG_POSTS,
      [
        Query.orderDesc('publishDate'),
        Query.limit(limit)
      ]
    );

    return response.documents as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!databases || !appwriteDatabaseId) {
    throw new Error('Appwrite client not configured');
  }
  
  try {
    const response = await databases.listDocuments(
      appwriteDatabaseId,
      COLLECTIONS.BLOG_POSTS,
      [
        Query.equal('slug', slug),
        Query.limit(1)
      ]
    );

    if (response.documents.length > 0) {
      return response.documents[0] as unknown as BlogPost;
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getBlogPostsByTag(tag: string, limit = 10): Promise<BlogPost[]> {
  if (!databases || !appwriteDatabaseId) {
    throw new Error('Appwrite client not configured');
  }
  
  try {
    const response = await databases.listDocuments(
      appwriteDatabaseId,
      COLLECTIONS.BLOG_POSTS,
      [
        Query.search('tags', tag),
        Query.orderDesc('publishDate'),
        Query.limit(limit)
      ]
    );

    return response.documents as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts by tag:', error);
    return [];
  }
}

export async function getServices(): Promise<Service[]> {
  if (!databases || !appwriteDatabaseId) {
    throw new Error('Appwrite client not configured');
  }
  
  try {
    const response = await databases.listDocuments(
      appwriteDatabaseId,
      COLLECTIONS.SERVICES,
      [
        Query.orderAsc('orderIndex')
      ]
    );

    return response.documents as unknown as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getService(slug: string): Promise<Service | null> {
  if (!databases || !appwriteDatabaseId) {
    throw new Error('Appwrite client not configured');
  }
  
  try {
    const response = await databases.listDocuments(
      appwriteDatabaseId,
      COLLECTIONS.SERVICES,
      [
        Query.equal('slug', slug),
        Query.limit(1)
      ]
    );

    if (response.documents.length > 0) {
      return response.documents[0] as unknown as Service;
    }
    return null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!databases || !appwriteDatabaseId) {
    throw new Error('Appwrite client not configured');
  }
  
  try {
    const response = await databases.listDocuments(
      appwriteDatabaseId,
      COLLECTIONS.TEAM_MEMBERS,
      [
        Query.orderAsc('name')
      ]
    );

    return response.documents as unknown as TeamMember[];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  if (!databases || !appwriteDatabaseId) {
    throw new Error('Appwrite client not configured');
  }
  
  try {
    const response = await databases.listDocuments(
      appwriteDatabaseId,
      COLLECTIONS.BLOG_POSTS
    );

    // Extract all tags from all posts and get unique values
    const allTags = (response.documents as unknown as BlogPost[])
      .flatMap((post: BlogPost) => post.tags || [])
      .filter((tag, index, array) => array.indexOf(tag) === index) // unique
      .sort();

    return allTags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export default client;