# Project Specifications

## Overview

The goal is to transform the #sharp website into a Next.js based statically generated website. The static website is content managed in the way that the content is fetched at the time of generation. The website using [Contentful](https://www.contentful.com/) for headless CMS.

**Tech Stack:**
- Next.js 14 with App Router
- TailwindCSS with Shadcn/UI
- Contentful headless CMS
- GitHub Pages hosting
- GitHub Actions for deployment

## Design System

### Visual Identity
- **Logo**: Use `img/sharp_logo.svg`
- **Background**: Clean white background
- **Style**: Professional and clean design

### Typography
- **Headings and titles**: Frutiger45Light (sans-serif) from `font` folder
- **Paragraphs and body text**: Web-safe serif font

### Colors
 - Primary / Text: #333333
 - Background: #FFFFFF
 - Highlight / Accent / link: #ED2224
 - Other colors:
   - #ED2224 (contrast: #FFFFFF)
   - #ED8421 (contrast: #333333)
   - #EDEA21 (contrast: #333333)
   - #8BED21 (contrast: #333333)
   - #25ED21 (contrast: #333333)
   - #21ED84 (contrast: #333333)
   - #21EDEA (contrast: #333333)
   - #218BED (contrast: #333333)
   - #2125ED (contrast: #FFFFFF)
   - #8421ED (contrast: #FFFFFF)
   - #EA21ED (contrast: #FFFFFF)
   - #ED218B (contrast: #FFFFFF)

### Layout Structure
- **Header**: Logo and navigation menu
- **Body**: Page-specific content
- **Footer**: Copyright and links (T&C, privacy policy, llm.txt)

### Navigation Menu
1. Home
2. About
3. Services
4. Blog
5. Contact

## Site Structure & Content

Elements from top to bottom for each page mentioned.


### Home Page (/)
1. **Carousel hero**: Highlighting each service with CTA to service page
2. **#sharp statement**: "#sharp helps companies walking on the road of digital transformation" with CTA for contact form
3. **Latest blog articles**: Recent blog posts

### About Page (/about)
1. **#sharp statement**: More elaborate than homepage
2. **Our story**: Company background and mission
3. **Meet the team**:
   - Loreen: Role, expertise, background, contact
   - Janos: Role, expertise, background, contact

### Services Pages

#### Main Services Page (/services)
1. **What is Digital Transformation**: Overview and explanation
2. **Our approach**: AI Transformation methodology
3. **Service areas**: Customer Experience, Operational Efficiency, Data and Analytics

#### Individual Service Pages
- **Customer Experience** (/services/customer-experience): Digital touchpoint optimization, user journey mapping, personalization strategies
- **Operational Efficiency** (/services/operational-efficiency): Process automation, workflow optimization, digital tool integration
- **Data and Analytics** (/services/data-and-analytics): Business intelligence, predictive analytics, data visualization dashboards

### Blog Section

#### Blog Listing (/blog)
- Recent blog entries listing
- Tag-based filtering
- Search functionality
- Pagination for blog listing

#### Filtered Blog (/blog/tag/[tag])
- All blog entries tagged with specific tag

#### Individual Blog Post (/blog/[slug])
- Blog post content with unique slug
- Social sharing buttons
- Related posts based on tags

### Contact Page
- Contact form with validation
- Company information display

## Content Management (Contentful)

### Content Models

**Page**
- title (Short text)
- slug (Short text)
- content (Rich text)
- meta description (Short text)
- featured image (Media)

**Service**
- title (Short text)
- slug (Short text)
- description (Short text)
- detailed content (Rich text)
- icon (Media)
- CTA text (Short text)

**Blog Post**
- title (Short text)
- slug (Short text)
- content (Rich text)
- excerpt (Short text)
- featured image (Media)
- tags (References, multiple)
- author (Reference)
- published date (Date & time)

**Team Member**
- name (Short text)
- role (Short text)
- bio (Rich text)
- photo (Media)
- social links (JSON object)

**Site Settings**
- company info (Rich text)
- contact details (JSON object)
- social media links (JSON object)

## Technical Requirements

### Performance & SEO
- Meta tags and Open Graph for all pages
- Sitemap generation
- Image optimization (Next.js Image component)
- Core Web Vitals optimization
- Lazy loading for images and content

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Alt text for all images
- Proper heading hierarchy

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Touch-friendly interface

## Functional Requirements

### Forms & Interactions
- **Contact form fields**:
  - Name (required)
  - Email (required)
  - Company
  - Phone
  - Service interest (dropdown)
  - Message (required)
  - Privacy policy consent
- Form validation and error handling
- Loading states and success/error messages
- Form submissions via Netlify Forms or similar
- Newsletter signup functionality

### Analytics & Tracking
- Google Analytics 4 integration
- Cookie consent banner
- Performance monitoring

### Footer Links
- **T&C**: Terms and conditions page
- **Privacy Policy**: GDPR compliant privacy policy
- **llm.txt**: AI disclosure file

## Development & Deployment

### Environment Setup
- Node.js 18+
- Next.js 14 with App Router
- TypeScript configuration
- ESLint and Prettier setup

### Build Configuration
- Static export for GitHub Pages
- Image optimization settings
- Font loading optimization
- Bundle analysis tools

### GitHub Actions Workflow
- Build on push to main branch
- Run tests and linting
- Deploy to GitHub Pages
- Cache dependencies for faster builds

### Environment Variables
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_TOKEN`
- `GOOGLE_ANALYTICS_ID`