# Contentful to Supabase Migration Plan

## **Migration Overview**
- **Complexity**: Medium (2-3 days)
- **Content Types**: 4 → 3 (eliminate Page type)
- **Architecture**: Headless CMS → PostgreSQL database
- **Rich Text**: Contentful Document → Markdown
- **Development**: Local Supabase CLI + seeded data

## **Phase 1: Supabase Setup & Schema Design (Day 1)**

### 1.1 Supabase Project Setup
- Create Supabase cloud project
- Install Supabase CLI locally
- Initialize local development environment (`supabase init`, `supabase start`)
- Configure environment variables (local + production)

### 1.2 Database Schema Creation
Create 3 PostgreSQL tables with simplified structure:

```sql
-- blog_posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT, -- markdown instead of Contentful Document
  author TEXT,
  publish_date TIMESTAMP WITH TIME ZONE,
  tags TEXT[], -- PostgreSQL array
  featured_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- services table  
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT, -- markdown
  features TEXT[], -- PostgreSQL array
  icon TEXT,
  color TEXT,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- team_members table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT, -- markdown
  image_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 1.3 Data Migration & Seeding
- Export current fallback content to SQL seed files
- Create seed scripts for local development
- Populate production database with existing content

## **Phase 2: Code Migration (Day 2)**

### 2.1 Dependencies Update
```bash
# Remove Contentful packages
npm uninstall contentful @contentful/rich-text-react-renderer @contentful/rich-text-types

# Add Supabase
npm install @supabase/supabase-js

# Add markdown renderer (replace rich text)
npm install react-markdown remark-gfm
```

### 2.2 Replace Core Files

**A. Create `src/lib/supabase.ts`** (replace contentful.ts)
- Supabase client configuration
- New TypeScript interfaces (simplified, no sys/fields nesting)
- 7 API functions (remove getPage, getAllTags can query blog_posts.tags)

**B. Update `src/lib/contentService.ts`**
- Replace Contentful imports with Supabase imports
- Update function implementations to use Supabase queries
- Keep same function signatures for minimal breaking changes
- Update fallback mechanism for local development

**C. Update `src/lib/fallbackContent.ts`**
- Convert rich text Documents to markdown strings
- Simplify data structures (remove sys/fields nesting)
- Match new Supabase table schema

### 2.3 Component Updates

**A. Replace `src/components/RichTextRenderer.tsx`**
- Replace Contentful rich text renderer with react-markdown
- Add support for remark-gfm (GitHub Flavored Markdown)
- Keep same props interface for compatibility

**B. Update `src/app/about/page.tsx`**
- Remove `getPage('about')` call entirely
- Use hardcoded content instead of dynamic Page content
- Simplify component logic

## **Phase 3: Environment & Development Workflow (Day 3)**

### 3.1 Environment Configuration
```bash
# Local development (.env.local)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=local_anon_key

# Production (.env.production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3.2 Development Workflow Setup
- Document local development process:
  1. `supabase start` (starts local stack)
  2. `supabase db reset` (applies migrations + seeds)
  3. `npm run dev` (Next.js development)
- Create npm scripts for database management
- Update documentation for team onboarding

### 3.3 Testing & Quality Assurance
- Test all content fetching functions
- Verify static generation works correctly
- Test fallback mechanisms
- Run `npm run build` and fix any TypeScript errors
- Compare rendered output with current Contentful version

## **Phase 4: Deployment & Documentation (Half Day)**

### 4.1 Production Database Setup
- Configure production Supabase project
- Run migrations and seed production data
- Set up Row Level Security (RLS) policies if needed

### 4.2 Build Process Updates
- Update GitHub Actions (if any) with Supabase environment variables
- Test production build and deployment
- Verify static generation works with production database

### 4.3 Documentation
- Create migration documentation file
- Update development setup instructions
- Document new database schema and API changes

## **Key Benefits of This Migration**

1. **Simplified Data Structure**: No more Contentful's complex sys/fields nesting
2. **Better Development Experience**: Local database with instant resets
3. **More Flexible**: Custom PostgreSQL schema vs rigid CMS structure  
4. **Cost Effective**: Supabase free tier vs Contentful pricing
5. **Performance**: Direct SQL queries vs API rate limits
6. **Rich Text Simplified**: Standard markdown vs Contentful Document format

## **Risk Mitigation**

1. **Maintain Fallback System**: Ensure graceful degradation if database unavailable
2. **Incremental Migration**: Test each phase thoroughly before proceeding
3. **Content Backup**: Export all existing Contentful content before migration
4. **Rollback Plan**: Keep Contentful integration until migration fully verified

**Total Effort**: 2.5-3 days
**Risk Level**: Low-Medium (well-planned with fallbacks)