---
title: How I Built My Portfolio Website with Next.js
date: 2023-07-20
description: A detailed walkthrough of how I designed and built my portfolio website using Next.js, TypeScript, and Tailwind CSS
image: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop
imageAlt: Computer with code on the screen
imageCredit: Clement Helardot on Unsplash
---

# Building My Portfolio Website with Next.js

In this post, I'll walk through the process of how I built this very portfolio website using modern web technologies. I'll share my thinking process, technical decisions, and some lessons learned along the way.

## Tech Stack

For this project, I used:

- **Next.js 13** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn/UI** for UI components
- **Markdown** for blog content


## Key Features

### 1. Dynamic Project Showcase

The projects section pulls data from a configuration file, making it easy to add new projects as I create them.

```typescript
// Example of project configuration
{
  title: "Portfolio",
  description: "Personal portfolio website",
  href: "https://platinumj.dev",
  imageURL: "https://example.com/image.png",
  tags: ["nextjs", "typescript", "tailwindcss"],
  detailedDescription: "Personal portfolio website and blog platform..."
}
```

### 2. Responsive Design

The site is fully responsive, working well on devices of all sizes from mobile phones to large desktop screens.

### 3. Dark/Light Mode

I implemented a theme switcher using TailwindCSS and CSS variables, allowing users to choose their preferred viewing experience.

### 4. Blog with Markdown

The blog you're reading right now is written in Markdown and rendered using MDX, making it easy to write and maintain content.

## Challenges and Solutions

One of the biggest challenges was implementing the glass-like UI effects. I wanted a modern, translucent look without sacrificing performance or accessibility.

The solution involved careful use of backdrop filters and color overlays, tested across different browsers to ensure consistency.

## Performance Considerations

Performance was a priority from the start. I used Next.js's static generation for fast page loads and implemented lazy loading for images.

## Deployment

I deployed the site on Vercel, which integrates seamlessly with Next.js and provides excellent analytics and performance monitoring tools.

## Lessons Learned

1. Start with a clear design concept before coding
2. Component-based architecture saves time in the long run
3. Accessibility should be considered from the beginning
4. Performance optimization is an ongoing process

## What's Next?

I plan to continue improving this site by:

- Adding more interactive elements
- Expanding the blog section
- Implementing analytics to understand user behavior
- Adding a contact form with email integration

I hope you found this walkthrough helpful! Feel free to check out the [source code](https://github.com/yourusername/portfolio) if you're interested in how it all works behind the scenes.

Happy coding!
