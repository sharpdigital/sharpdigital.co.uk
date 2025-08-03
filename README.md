# #sharp Digital Website

This is the website for #sharp (https://sharpdigital.co.uk/), a digital agency specialized in digital transformation consultancy. Built with [Next.js](https://nextjs.org) and [Appwrite](https://appwrite.io/) for content management.

## Tech Stack

- **Framework**: Next.js (static generation)
- **CMS**: Appwrite (headless NoSQL database)
- **Package Manager**: Bun (fast, efficient)
- **Styling**: TailwindCSS with Shadcn/UI components
- **Deployment**: GitHub Actions → GitHub Pages

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Variables

For production deployment, configure:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id  
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
