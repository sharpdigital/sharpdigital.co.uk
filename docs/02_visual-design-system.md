# Visual Design System
## #sharp - Digital Transformation Consultancy

---

## Overview

This document defines the comprehensive visual design system for #sharp's digital transformation consultancy website. The system ensures consistent, accessible, and professional visual communication across all digital touchpoints while supporting the brand's positioning as a leading AI-powered digital transformation partner.

**Design Philosophy**: Clean, professional, and trustworthy with strategic use of color to communicate innovation and reliability.

---

## Color Palette

### Primary Colors

#### Core Brand Colors
- **Primary Red**: `#ED2224` 
  - Usage: Primary CTAs, links, accent elements
  - Contrast: White text (#FFFFFF)
  - WCAG AA: 4.5:1 contrast ratio
  - Hex: #ED2224 | RGB: 237, 34, 36 | HSL: 359, 85%, 53%
  - **Tailwind**: `bg-primary`, `text-primary`, `border-primary`

- **Charcoal Text**: `#333333`
  - Usage: Primary text, headings, body copy
  - Contrast: White background (#FFFFFF)
  - WCAG AA: 12.6:1 contrast ratio
  - Hex: #333333 | RGB: 51, 51, 51 | HSL: 0, 0%, 20%
  - **Tailwind**: `bg-charcoal`, `text-charcoal`, `border-charcoal`

- **Pure White**: `#FFFFFF`
  - Usage: Background, card backgrounds, contrast text
  - Contrast: Works with all dark colors
  - Hex: #FFFFFF | RGB: 255, 255, 255 | HSL: 0, 0%, 100%
  - **Tailwind**: `bg-white`, `text-white`, `border-white`

### Extended Color Palette

#### Warm Spectrum
- **Orange**: `#ED8421` - Contrast: Dark text (#333333)
  - **Tailwind**: `bg-orange-sharp`, `text-orange-sharp`
- **Yellow**: `#EDEA21` - Contrast: Dark text (#333333)
  - **Tailwind**: `bg-yellow-sharp`, `text-yellow-sharp`
- **Yellow-Green**: `#8BED21` - Contrast: Dark text (#333333)
  - **Tailwind**: `bg-lime-sharp`, `text-lime-sharp`
- **Green**: `#25ED21` - Contrast: Dark text (#333333)
  - **Tailwind**: `bg-green-sharp`, `text-green-sharp`

#### Cool Spectrum
- **Mint**: `#21ED84` - Contrast: Dark text (#333333)
  - **Tailwind**: `bg-mint-sharp`, `text-mint-sharp`
- **Cyan**: `#21EDEA` - Contrast: Dark text (#333333)
  - **Tailwind**: `bg-cyan-sharp`, `text-cyan-sharp`
- **Sky Blue**: `#218BED` - Contrast: Dark text (#333333)
  - **Tailwind**: `bg-sky-sharp`, `text-sky-sharp`
- **Blue**: `#2125ED` - Contrast: White text (#FFFFFF)
  - **Tailwind**: `bg-blue-sharp`, `text-blue-sharp`

#### Deep Spectrum
- **Purple**: `#8421ED` - Contrast: White text (#FFFFFF)
  - **Tailwind**: `bg-purple-sharp`, `text-purple-sharp`
- **Magenta**: `#EA21ED` - Contrast: White text (#FFFFFF)
  - **Tailwind**: `bg-magenta-sharp`, `text-magenta-sharp`
- **Pink**: `#ED218B` - Contrast: White text (#FFFFFF)
  - **Tailwind**: `bg-pink-sharp`, `text-pink-sharp`

### Functional Colors

#### Semantic Colors
- **Success**: `#25ED21` (Green) - Form success, positive status
  - **Tailwind**: `bg-success`, `text-success`, `border-success`
- **Warning**: `#EDEA21` (Yellow) - Caution, pending status
  - **Tailwind**: `bg-warning`, `text-warning`, `border-warning`
- **Error**: `#ED2224` (Primary Red) - Error states, required fields
  - **Tailwind**: `bg-error`, `text-error`, `border-error`
- **Info**: `#218BED` (Sky Blue) - Informational content
  - **Tailwind**: `bg-info`, `text-info`, `border-info`

#### Neutral Colors
- **Light Gray**: `#F8F9FA` - Background sections, card backgrounds
  - **Tailwind**: `bg-gray-50`, `text-gray-50`
- **Medium Gray**: `#6C757D` - Secondary text, placeholders
  - **Tailwind**: `bg-gray-500`, `text-gray-500`
- **Dark Gray**: `#495057` - Tertiary text, borders
  - **Tailwind**: `bg-gray-600`, `text-gray-600`
- **Border Gray**: `#DEE2E6` - Borders, dividers
  - **Tailwind**: `bg-gray-200`, `border-gray-200`

### Accessibility Compliance

#### WCAG 2.1 AA Standards
- **Minimum Contrast**: 4.5:1 for normal text
- **Large Text**: 3:1 for text 18pt+ or 14pt+ bold
- **Non-text Elements**: 3:1 for UI components and graphics

#### Color Usage Guidelines
- Never rely solely on color to convey information
- Provide alternative indicators (icons, text, patterns)
- Test all color combinations with accessibility tools
- Ensure sufficient contrast in all interactive states

---

## Typography

### Font Hierarchy

#### Primary Font: Frutiger45Light
- **Source**: Local font files in `/font/` directory
- **Type**: Sans-serif
- **Usage**: Headlines, titles, navigation, CTAs
- **Fallback**: `'Frutiger45Light', 'Helvetica Neue', Arial, sans-serif`

#### Secondary Font: Georgia
- **Type**: Serif
- **Usage**: Body text, paragraphs, long-form content
- **Fallback**: `Georgia, 'Times New Roman', serif`

#### Monospace Font: Fira Code
- **Type**: Monospace
- **Usage**: Code snippets, technical content
- **Fallback**: `'Fira Code', 'Courier New', monospace`

### Typography Scale

#### Desktop Typography Scale
- **H1**: 48px / 3rem - Frutiger45Light - Line height: 1.2
  - **Tailwind**: `text-5xl font-heading leading-tight`
- **H2**: 40px / 2.5rem - Frutiger45Light - Line height: 1.3
  - **Tailwind**: `text-4xl font-heading leading-tight`
- **H3**: 32px / 2rem - Frutiger45Light - Line height: 1.4
  - **Tailwind**: `text-3xl font-heading leading-snug`
- **H4**: 24px / 1.5rem - Frutiger45Light - Line height: 1.5
  - **Tailwind**: `text-2xl font-heading leading-snug`
- **H5**: 20px / 1.25rem - Frutiger45Light - Line height: 1.6
  - **Tailwind**: `text-xl font-heading leading-normal`
- **H6**: 16px / 1rem - Frutiger45Light - Line height: 1.6
  - **Tailwind**: `text-lg font-heading leading-normal`

#### Body Text Scale
- **Body Large**: 18px / 1.125rem - Georgia - Line height: 1.7
  - **Tailwind**: `text-lg font-body leading-relaxed`
- **Body Regular**: 16px / 1rem - Georgia - Line height: 1.6
  - **Tailwind**: `text-base font-body leading-normal`
- **Body Small**: 14px / 0.875rem - Georgia - Line height: 1.5
  - **Tailwind**: `text-sm font-body leading-snug`
- **Caption**: 12px / 0.75rem - Georgia - Line height: 1.4
  - **Tailwind**: `text-xs font-body leading-snug`

#### Mobile Typography Scale
- **H1**: 36px / 2.25rem - Frutiger45Light - Line height: 1.2
  - **Tailwind**: `text-4xl md:text-5xl font-heading leading-tight`
- **H2**: 30px / 1.875rem - Frutiger45Light - Line height: 1.3
  - **Tailwind**: `text-3xl md:text-4xl font-heading leading-tight`
- **H3**: 24px / 1.5rem - Frutiger45Light - Line height: 1.4
  - **Tailwind**: `text-2xl md:text-3xl font-heading leading-snug`
- **H4**: 20px / 1.25rem - Frutiger45Light - Line height: 1.5
  - **Tailwind**: `text-xl md:text-2xl font-heading leading-snug`
- **H5**: 18px / 1.125rem - Frutiger45Light - Line height: 1.6
  - **Tailwind**: `text-lg md:text-xl font-heading leading-normal`
- **H6**: 16px / 1rem - Frutiger45Light - Line height: 1.6
  - **Tailwind**: `text-base md:text-lg font-heading leading-normal`

### Typography Usage Guidelines

#### Headings
- Use sentence case for all headings
- Maximum 2-3 heading levels per page
- Maintain consistent hierarchy
- Add appropriate margins (top: 2rem, bottom: 1rem)
- **Tailwind**: `mt-8 mb-4` for standard heading margins

#### Body Text
- Use Georgia for readability and professionalism
- Maintain 16px minimum font size
- Use 1.6 line height for optimal readability
- Paragraph spacing: 1rem bottom margin
- **Tailwind**: `mb-4` for paragraph spacing

#### Links
- Primary Red (#ED2224) color
- Underline on hover state
- Focus states with outline
- Visited links: slightly darker shade
- **Tailwind**: `text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`

---

## Component Library

### Buttons

#### Primary Button
- **Background**: Primary Red (#ED2224)
- **Text**: White (#FFFFFF)
- **Font**: Frutiger45Light, 16px
- **Padding**: 12px 24px
- **Border Radius**: 6px
- **Hover**: Darken 10% (#D41E20)
- **Active**: Darken 15% (#C01A1C)
- **Disabled**: 50% opacity
- **Tailwind**: `bg-primary text-white font-heading text-base px-6 py-3 rounded-md hover:bg-primary-hover active:bg-primary-active disabled:opacity-50 transition-colors duration-200`

#### Secondary Button
- **Background**: Transparent
- **Text**: Primary Red (#ED2224)
- **Border**: 2px solid Primary Red
- **Font**: Frutiger45Light, 16px
- **Padding**: 10px 22px
- **Border Radius**: 6px
- **Hover**: Primary Red background, White text
- **Active**: Darken 15% (#C01A1C)
- **Tailwind**: `bg-transparent text-primary border-2 border-primary font-heading text-base px-6 py-2.5 rounded-md hover:bg-primary hover:text-white active:bg-primary-active transition-colors duration-200`

#### Tertiary Button
- **Background**: Transparent
- **Text**: Charcoal (#333333)
- **Border**: None
- **Font**: Frutiger45Light, 16px
- **Padding**: 8px 16px
- **Hover**: Light Gray background (#F8F9FA)
- **Active**: Medium Gray background (#E9ECEF)
- **Tailwind**: `bg-transparent text-charcoal font-heading text-base px-4 py-2 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200`

#### Button Sizes
- **Large**: 16px font, 16px 32px padding
  - **Tailwind**: `text-lg px-8 py-4`
- **Regular**: 14px font, 12px 24px padding
  - **Tailwind**: `text-base px-6 py-3`
- **Small**: 12px font, 8px 16px padding
  - **Tailwind**: `text-sm px-4 py-2`

### Form Elements

#### Input Fields
- **Background**: White (#FFFFFF)
- **Border**: 1px solid Border Gray (#DEE2E6)
- **Border Radius**: 4px
- **Padding**: 12px 16px
- **Font**: Georgia, 16px
- **Focus**: Primary Red border, box-shadow
- **Error**: Primary Red border and text
- **Placeholder**: Medium Gray (#6C757D)
- **Tailwind**: `bg-white border border-gray-200 rounded px-4 py-3 font-body text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`
- **Error State**: `border-error text-error focus:ring-error focus:border-error`

#### Select Dropdowns
- **Background**: White (#FFFFFF)
- **Border**: 1px solid Border Gray (#DEE2E6)
- **Border Radius**: 4px
- **Padding**: 12px 16px
- **Font**: Georgia, 16px
- **Arrow**: Custom SVG icon
- **Focus**: Primary Red border
- **Tailwind**: `bg-white border border-gray-200 rounded px-4 py-3 font-body text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none`

#### Checkboxes & Radio Buttons
- **Size**: 18px x 18px
- **Border**: 2px solid Border Gray (#DEE2E6)
- **Border Radius**: 3px (checkbox), 50% (radio)
- **Checked**: Primary Red background and checkmark
- **Focus**: Primary Red outline
- **Tailwind Checkbox**: `w-4 h-4 border-2 border-gray-200 rounded text-primary focus:ring-primary focus:ring-2`
- **Tailwind Radio**: `w-4 h-4 border-2 border-gray-200 rounded-full text-primary focus:ring-primary focus:ring-2`

#### Labels
- **Font**: Frutiger45Light, 14px
- **Color**: Charcoal (#333333)
- **Weight**: Semi-bold
- **Margin**: 0 0 8px 0
- **Required**: Red asterisk (*)
- **Tailwind**: `block font-heading text-sm font-semibold text-charcoal mb-2`
- **Required Asterisk**: `text-error`

### Cards

#### Basic Card
- **Background**: White (#FFFFFF)
- **Border**: 1px solid Border Gray (#DEE2E6)
- **Border Radius**: 8px
- **Padding**: 24px
- **Shadow**: 0 2px 4px rgba(0,0,0,0.1)
- **Hover**: Slight shadow increase
- **Tailwind**: `bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200`

#### Service Card
- **Background**: White (#FFFFFF)
- **Border**: 1px solid Border Gray (#DEE2E6)
- **Border Radius**: 8px
- **Padding**: 32px 24px
- **Icon**: 48px x 48px
- **Title**: H4 styling
- **Description**: Body Regular
- **CTA**: Primary Button
- **Tailwind**: `bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200`
- **Icon**: `w-12 h-12 mb-4`
- **Title**: `text-2xl font-heading leading-snug text-charcoal mb-4`
- **Description**: `text-base font-body leading-normal text-charcoal mb-6`

#### Blog Card
- **Background**: White (#FFFFFF)
- **Border Radius**: 8px
- **Image**: 16:9 aspect ratio
- **Padding**: 24px
- **Title**: H5 styling
- **Excerpt**: Body Small
- **Meta**: Caption styling
- **Tailwind**: `bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden`
- **Image**: `w-full aspect-video object-cover`
- **Content**: `p-6`
- **Title**: `text-xl font-heading leading-normal text-charcoal mb-2`
- **Excerpt**: `text-sm font-body leading-snug text-charcoal mb-4`
- **Meta**: `text-xs font-body leading-snug text-gray-500`

### Navigation

#### Header Navigation
- **Background**: White (#FFFFFF)
- **Border**: 1px solid Border Gray (#DEE2E6)
- **Height**: 80px
- **Logo**: 40px height
- **Links**: Frutiger45Light, 16px
- **Active**: Primary Red color
- **Hover**: Primary Red underline
- **Tailwind**: `bg-white border-b border-gray-200 h-20 flex items-center justify-between px-6 lg:px-8`
- **Logo**: `h-10 w-auto`
- **Nav Links**: `hidden md:flex space-x-8`
- **Link**: `font-heading text-base text-charcoal hover:text-primary transition-colors duration-200`
- **Active Link**: `font-heading text-base text-primary`
- **Mobile Menu**: `md:hidden`

#### Footer Navigation
- **Background**: Light Gray (#F8F9FA)
- **Padding**: 48px 0
- **Links**: Georgia, 14px
- **Color**: Dark Gray (#495057)
- **Hover**: Primary Red color
- **Tailwind**: `bg-gray-50 py-12 px-6 lg:px-8`
- **Links**: `font-body text-sm text-gray-600 hover:text-primary transition-colors duration-200`

### Alerts & Messages

#### Success Message
- **Background**: Light Green (#D4EDDA)
- **Border**: 1px solid Success (#25ED21)
- **Text**: Dark Green (#155724)
- **Icon**: Checkmark
- **Padding**: 16px 20px
- **Tailwind**: `bg-green-50 border border-success text-green-800 px-5 py-4 rounded-md flex items-center space-x-3`
- **Icon**: `w-5 h-5 text-success`

#### Warning Message
- **Background**: Light Yellow (#FFF3CD)
- **Border**: 1px solid Warning (#EDEA21)
- **Text**: Dark Yellow (#856404)
- **Icon**: Warning triangle
- **Padding**: 16px 20px
- **Tailwind**: `bg-yellow-50 border border-warning text-yellow-800 px-5 py-4 rounded-md flex items-center space-x-3`
- **Icon**: `w-5 h-5 text-warning`

#### Error Message
- **Background**: Light Red (#F8D7DA)
- **Border**: 1px solid Error (#ED2224)
- **Text**: Dark Red (#721C24)
- **Icon**: X mark
- **Padding**: 16px 20px
- **Tailwind**: `bg-red-50 border border-error text-red-800 px-5 py-4 rounded-md flex items-center space-x-3`
- **Icon**: `w-5 h-5 text-error`

---

## Spacing & Grid System

### Spacing Scale

#### Base Unit: 4px
- **4px**: 0.25rem - xs - **Tailwind**: `1`
- **8px**: 0.5rem - sm - **Tailwind**: `2`
- **12px**: 0.75rem - md - **Tailwind**: `3`
- **16px**: 1rem - base - **Tailwind**: `4`
- **20px**: 1.25rem - lg - **Tailwind**: `5`
- **24px**: 1.5rem - xl - **Tailwind**: `6`
- **32px**: 2rem - 2xl - **Tailwind**: `8`
- **40px**: 2.5rem - 3xl - **Tailwind**: `10`
- **48px**: 3rem - 4xl - **Tailwind**: `12`
- **64px**: 4rem - 5xl - **Tailwind**: `16`
- **80px**: 5rem - 6xl - **Tailwind**: `20`

#### Common Spacing Patterns
- **Component Padding**: 16px-24px - **Tailwind**: `p-4` to `p-6`
- **Section Padding**: 48px-80px - **Tailwind**: `py-12` to `py-20`
- **Element Margins**: 16px-32px - **Tailwind**: `mb-4` to `mb-8`
- **Card Gaps**: 24px-32px - **Tailwind**: `gap-6` to `gap-8`

### Grid System

#### Desktop Grid (1200px+)
- **Columns**: 12
- **Gutter**: 24px
- **Margins**: 24px
- **Max Width**: 1200px
- **Breakpoints**: 
  - xl: 1200px+ - **Tailwind**: `xl:`
  - lg: 992px-1199px - **Tailwind**: `lg:`
  - md: 768px-991px - **Tailwind**: `md:`
  - sm: 576px-767px - **Tailwind**: `sm:`
  - xs: <576px - **Tailwind**: default
- **Tailwind Grid**: `grid grid-cols-12 gap-6`

#### Container Widths
- **Full Width**: 100% - **Tailwind**: `w-full`
- **Constrained**: 1200px max-width - **Tailwind**: `max-w-7xl mx-auto`
- **Narrow**: 800px max-width - **Tailwind**: `max-w-4xl mx-auto`
- **Text**: 600px max-width - **Tailwind**: `max-w-2xl mx-auto`

#### Layout Patterns
- **Two Column**: 8/4 or 6/6 split - **Tailwind**: `grid grid-cols-1 lg:grid-cols-3 gap-6` (8/4) or `grid grid-cols-1 lg:grid-cols-2 gap-6` (6/6)
- **Three Column**: 4/4/4 split - **Tailwind**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Four Column**: 3/3/3/3 split - **Tailwind**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
- **Sidebar**: 8/4 or 9/3 split - **Tailwind**: `grid grid-cols-1 lg:grid-cols-4 gap-6` with `lg:col-span-3` and `lg:col-span-1`

### Responsive Breakpoints

#### Mobile First Approach
```css
/* Mobile: 320px+ */
@media (min-width: 320px) { } /* Tailwind: default */

/* Tablet: 768px+ */
@media (min-width: 768px) { } /* Tailwind: md: */

/* Desktop: 1024px+ */
@media (min-width: 1024px) { } /* Tailwind: lg: */

/* Large Desktop: 1200px+ */
@media (min-width: 1200px) { } /* Tailwind: xl: */
```

#### Component Responsive Behavior
- **Typography**: Scale down 15-20% on mobile
  - **Tailwind**: `text-2xl md:text-3xl lg:text-4xl` (responsive sizing)
- **Buttons**: Full width on mobile
  - **Tailwind**: `w-full md:w-auto`
- **Cards**: Stack vertically on mobile
  - **Tailwind**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Navigation**: Hamburger menu on mobile
  - **Tailwind**: `hidden md:flex` for desktop nav, `md:hidden` for mobile menu

---

## Brand Application Guidelines

### Logo Usage

#### Logo Specifications
- **File Format**: SVG (scalable vector)
- **Location**: `img/sharp_logo.svg`
- **Minimum Size**: 120px width
- **Clear Space**: 2x logo height on all sides
- **Backgrounds**: White or very light backgrounds only

#### Logo Variations
- **Primary**: Full color logo
- **Monochrome**: Black version for print
- **Reverse**: White version for dark backgrounds
- **Simplified**: Icon-only version for small spaces

### Brand Voice & Tone

#### Professional Attributes
- **Authoritative**: Industry expertise and thought leadership
- **Trustworthy**: Reliable partner for transformation
- **Innovative**: AI-first approach and cutting-edge solutions
- **Results-Focused**: Measurable impact and ROI

#### Communication Style
- **Clear**: Straightforward, jargon-free communication
- **Confident**: Assertive without being aggressive
- **Helpful**: Educational and supportive approach
- **Strategic**: Big-picture thinking with practical application

### Visual Hierarchy

#### Content Priority
1. **Hero Message**: Largest, most prominent
2. **Service CTAs**: Secondary prominence
3. **Supporting Content**: Balanced emphasis
4. **Legal/Footer**: Minimal emphasis

#### Page Layout Principles
- **F-Pattern**: Important content follows reading pattern
- **White Space**: Generous spacing for clarity
- **Focal Points**: Strategic use of color and size
- **Visual Flow**: Logical progression through content

### Imagery Guidelines

#### Photography Style
- **Professional**: High-quality, business-focused
- **Authentic**: Real people, genuine interactions
- **Modern**: Contemporary office and technology settings
- **Diverse**: Inclusive representation

#### Iconography
- **Style**: Minimalist, geometric
- **Weight**: Consistent stroke width
- **Size**: 24px, 32px, 48px standard sizes
- **Color**: Primary Red or Charcoal

### Accessibility Standards

#### Universal Design Principles
- **Keyboard Navigation**: All interactive elements
- **Screen Readers**: Proper ARIA labels and structure
- **Color Blindness**: Information not solely color-dependent
- **Motor Impairments**: Large touch targets (44px minimum)

#### Testing Requirements
- **WAVE**: Web accessibility evaluation
- **axe**: Automated accessibility testing
- **Manual Testing**: Keyboard and screen reader testing
- **User Testing**: Include users with disabilities

---

## Implementation Guidelines

### TailwindCSS Configuration

#### Custom Colors
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#ED2224',
        'primary-hover': '#D41E20',
        'primary-active': '#C01A1C',
        charcoal: '#333333',
        // Extended palette
        'orange-sharp': '#ED8421',
        'yellow-sharp': '#EDEA21',
        'lime-sharp': '#8BED21',
        'green-sharp': '#25ED21',
        'mint-sharp': '#21ED84',
        'cyan-sharp': '#21EDEA',
        'sky-sharp': '#218BED',
        'blue-sharp': '#2125ED',
        'purple-sharp': '#8421ED',
        'magenta-sharp': '#EA21ED',
        'pink-sharp': '#ED218B',
        // Semantic colors
        success: '#25ED21',
        warning: '#EDEA21',
        error: '#ED2224',
        info: '#218BED',
      }
    }
  }
}
```

#### Custom Typography
```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Frutiger45Light', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'body': ['Georgia', 'Times New Roman', 'serif'],
        'mono': ['Fira Code', 'Courier New', 'monospace']
      }
    }
  }
}
```

### Shadcn/UI Customization

#### Component Theme Configuration
```javascript
// components.json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

#### CSS Variables for Theme
```css
/* globals.css */
:root {
  --primary: #ED2224;
  --primary-hover: #D41E20;
  --primary-active: #C01A1C;
  --charcoal: #333333;
  --success: #25ED21;
  --warning: #EDEA21;
  --error: #ED2224;
  --info: #218BED;
}
```

#### Component Customization Examples
- **Button**: Override default primary color with `bg-primary hover:bg-primary-hover`
- **Input**: Use `border-gray-200 focus:border-primary focus:ring-primary`
- **Card**: Apply `bg-white border-gray-200 shadow-sm hover:shadow-md`
- **Badge**: Use semantic colors `bg-success text-white` or `bg-warning text-charcoal`

#### Component Consistency
- Use consistent spacing and sizing across all components
- Apply brand colors to all interactive elements
- Ensure accessibility standards in all custom components
- Maintain Shadcn/UI component functionality while updating appearance

### Quality Assurance

#### Design Review Checklist
- [ ] Brand colors used correctly
- [ ] Typography hierarchy followed
- [ ] Spacing system applied consistently
- [ ] Accessibility standards met
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility tested

#### Performance Considerations
- **Font Loading**: Optimize web font loading
- **Color Optimization**: Use efficient color formats
- **Component Bundle**: Tree-shake unused components
- **Image Optimization**: Compress and optimize imagery

---

This visual design system provides the foundation for creating a cohesive, professional, and accessible digital experience for #sharp's digital transformation consultancy. The system should be referenced throughout the development process to ensure consistency and brand alignment across all digital touchpoints.