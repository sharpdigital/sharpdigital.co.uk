-- Migration: Create content tables for Sharp Digital website
-- Date: 2025-01-17

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT, -- markdown content
  author TEXT,
  publish_date TIMESTAMP WITH TIME ZONE,
  tags TEXT[], -- PostgreSQL array for tags
  featured_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT, -- markdown content
  features TEXT[], -- PostgreSQL array for features
  icon TEXT,
  color TEXT,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT, -- markdown content
  image_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_publish_date ON blog_posts(publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_index);

CREATE INDEX IF NOT EXISTS idx_team_members_name ON team_members(name);

-- Enable Row Level Security (RLS) for public read access
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a static website)
CREATE POLICY "Enable read access for all users" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON services FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON team_members FOR SELECT USING (true);