import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import React from 'react';
import { Calendar, ArrowLeft, Github, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { siteConfig } from '@/config/config';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Function to convert title to ID
const titleToId = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-');         // Replace multiple hyphens with single hyphen
};

// Custom components for MDX
const components = {
  img: (props: any) => (
    <div className="my-8">
      <Image 
        {...props} 
        alt={props.alt || "Blog image"} 
        width={props.width || 800}
        height={props.height || 450}
        className="rounded-lg mx-auto max-h-[70vh] object-contain"
      />
    </div>
  ),
  h1: (props: any) => {
    const id = titleToId(props.children);
    return <h1 id={id} className="text-3xl font-bold mt-8 mb-4 scroll-mt-24" {...props} />;
  },
  h2: (props: any) => {
    const id = titleToId(props.children);
    return <h2 id={id} className="text-2xl font-bold mt-8 mb-3 scroll-mt-20" {...props} />;
  },
  h3: (props: any) => {
    const id = titleToId(props.children);
    return <h3 id={id} className="text-xl font-bold mt-6 mb-3 scroll-mt-20" {...props} />;
  },
  p: (props: any) => <p className="mb-5 leading-7" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-5 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-5 space-y-2" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="pl-4 border-l-4 border-accent italic my-5" {...props} />
  ),
  a: (props: any) => {
    // Check if this is an internal anchor link
    if (props.href?.startsWith('#')) {
      return (
        <Link href={props.href} className="text-primary underline hover:text-primary/80 transition-colors">
          {props.children}
        </Link>
      );
    }
    return (
      <a 
        className="text-primary underline hover:text-primary/80 transition-colors" 
        target={props.href?.startsWith('http') ? "_blank" : undefined}
        rel={props.href?.startsWith('http') ? "noopener noreferrer" : undefined}
        {...props} 
      />
    );
  },
  code: (props: any) => (
    <code className="glass-low-blur px-1 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <div className="glass my-5 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-foreground/70">code</div>
      </div>
      <pre className="bg-transparent p-4 overflow-x-auto text-sm font-mono" {...props} />
    </div>
  ),
  // Add table of contents component
  TableOfContents: ({ headings }: { headings: { id: string, title: string, level: number }[] }) => (
    <div className="my-8 p-4 glass rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Table of Contents</h2>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li 
              key={heading.id} 
              className={`${heading.level === 2 ? 'ml-0' : 'ml-4'}`}
            >
              <Link 
                href={`#${heading.id}`}
                className="text-foreground/80 hover:text-foreground transition-colors hover:underline"
              >
                {heading.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), siteConfig.blog.contentPath);
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const files = fs.readdirSync(blogDir);
  const markdownPosts = files.filter((file) => file.endsWith('.md'));
  
  return markdownPosts.map((fileName) => ({
    slug: fileName.replace('.md', ''),
  }));
}

// Function to extract headings from content to build the TOC
function extractHeadings(content: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2];
    const id = titleToId(title);
    
    headings.push({
      level,
      title,
      id
    });
  }
  
  return headings;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), siteConfig.blog.contentPath, `${slug}.md`);
  
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  // Read file content
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Extract metadata and content
  const metadata = fileContent.match(/---\n([\s\S]*?)\n---/);
  
  if (!metadata) {
    notFound();
  }
  
  const metaContent = metadata[1];
  const title = metaContent.match(/title:\s*(.*)/)?.[1] || 'Untitled';
  const date = metaContent.match(/date:\s*(.*)/)?.[1] || new Date().toISOString().split('T')[0];
  const author = metaContent.match(/author:\s*(.*)/)?.[1] || siteConfig.blog.defaultAuthor;
  const image = metaContent.match(/image:\s*(.*)/)?.[1] || siteConfig.blog.defaultCoverImage;
  const imageAlt = metaContent.match(/imageAlt:\s*(.*)/)?.[1] || title;
  const imageCredit = metaContent.match(/imageCredit:\s*(.*)/)?.[1] || '';
  
  // Extract actual content (remove metadata)
  const content = fileContent.replace(/---\n[\s\S]*?\n---/, '').trim();
  
  // Extract headings for table of contents
  const headings = extractHeadings(content);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href="/blog">
          <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
          </Button>
        </Link>
        
        <Link href={`${siteConfig.blog.sourceCodeURL}/blob/main/${siteConfig.blog.contentPath}/${slug}.md`} target="_blank">
          <Button variant="outline" size="sm" className="gap-2 glass-low-blur">
            <Github size={16} />
            <span>View Source</span>
          </Button>
        </Link>
      </div>
      
      <div className="relative w-full h-72 md:h-96 mb-8 rounded-xl overflow-hidden">
        <Image 
          src={image} 
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        
        {imageCredit && (
          <div className="absolute bottom-2 right-2">
            <p className="text-xs text-white/70 bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
              Photo: {imageCredit}
            </p>
          </div>
        )}
      </div>
      
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-border/40">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          
          <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={siteConfig.blog.defaultAuthorImage} alt={author} />
                <AvatarFallback>
                  <User size={16} />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{author}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
        
        <div className="blog-content">
          {/* If there's a table of contents section already in the content, we'll use that
              Otherwise, render our dynamically generated one for headings */}
          {!content.includes('## Table of Contents') && headings.length > 3 && (
            <components.TableOfContents headings={headings} />
          )}
          <MDXRemote source={content} components={components} />
        </div>
      </article>
    </div>
  );
}
