# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for #sharp (https://sharpdigital.co.uk/), a digital agency specialized in digital transformation consultancy. The project is migrating from a static HTML site to a Next.js-based statically generated website with Contentful headless CMS.

## Migration Goal

**Target Architecture**: Next.js static site generation with Contentful CMS, TailwindCSS + Shadcn/UI, deployed via GitHub Actions to GitHub Pages.

## Tech Stack

- **Framework**: Next.js (static generation)
- **CMS**: Contentful (headless)
- **Styling**: TailwindCSS with Shadcn/UI components
- **Deployment**: GitHub Actions → GitHub Pages

## Development Commands

Currently no build process exists. Future Next.js implementation will need:
- `npm run dev` - Development server
- `npm run build` - Static site generation
- `npm run start` - Production preview

## Design System Requirements

### Typography
- **Headings/Titles**: Frutiger45Light (sans-serif) from `/font/` directory
- **Body/Paragraphs**: Web-safe serif font
- **Logo**: Use `img/sharp_logo.svg`

### Layout
- **Background**: White (clean, professional)
- **Components**: Shadcn/UI with TailwindCSS
- **Navigation**: Home, About, Services, Blog, Contact

## Site Structure & Content

### Layout Components
- **Header**: Logo + navigation menu
- **Body**: Page-specific content
- **Footer**: Copyright, links (T&C, privacy policy, llm.txt)

### Pages & Routes

**Home (/)**: Carousel hero for services, #sharp statement with CTA, latest blog articles

**About (/about)**: Expanded #sharp statement, our story, meet the team (Loreen, Janos)

**Services (/services)**: What is Digital Transformation, AI Transformation approach, service areas
- `/services/customer-experience`
- `/services/operational-efficiency` 
- `/services/data-and-analytics`

**Blog (/blog)**: Recent blog entries
- `/blog/tag/[tag]` - Filtered by tag
- `/blog/[slug]` - Individual posts with related articles

**Contact**: Contact form

## Key Files

- `docs/specifications.md`: Complete project requirements and design specs
- `img/sharp_logo.svg`: Brand logo for new design
- `font/`: Frutiger font files for headings/titles
- `index.html`: Current implementation (will be replaced with Next.js)

## Content Management

Content managed through Contentful CMS and fetched at build time for static generation.