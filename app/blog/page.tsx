import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Github } from 'lucide-react';
import { siteConfig } from '@/config/config';
import { Button } from '@/components/ui/button';

interface BlogMetadata {
  title: string;
  date: string;
  description: string;
  slug: string;
  featured?: boolean;
  image?: string;
}

function getBlogMetadata(): BlogMetadata[] {
  const blogDir = path.join(process.cwd(), siteConfig.blog.contentPath);
  
  // Check if directory exists
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const files = fs.readdirSync(blogDir);
  const markdownPosts = files.filter((file) => file.endsWith('.md'));
  
  // Read metadata from each file
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(path.join(blogDir, fileName), 'utf8');
    const metadata = fileContents.match(/---\n([\s\S]*?)\n---/);
    
    if (!metadata) return null;
    
    const metaContent = metadata[1];
    const title = metaContent.match(/title:\s*(.*)/)?.[1] || 'Untitled';
    const date = metaContent.match(/date:\s*(.*)/)?.[1] || new Date().toISOString().split('T')[0];
    const description = metaContent.match(/description:\s*(.*)/)?.[1] || 'No description';
    const image = metaContent.match(/image:\s*(.*)/)?.[1] || siteConfig.blog.defaultCoverImage;
    const slug = fileName.replace('.md', '');
    const featured = siteConfig.blog.featuredPosts.includes(slug);
    
    return {
      title,
      date,
      description,
      image,
      slug,
      featured,
    };
  }).filter(Boolean) as BlogMetadata[];
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

interface pageProps {

}

const page = ({ }: pageProps) => {
  const posts = getBlogMetadata();
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);
  
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Blog</h1>
        <Link href={siteConfig.blog.sourceCodeURL} target="_blank">
          <Button variant="ghost" className="gap-2">
            <Github size={18} />
            <span className="hidden sm:inline">Source Code</span>
          </Button>
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl">No blog posts found.</h2>
          <p className="text-muted-foreground mt-2">
            Create your first blog post by adding a markdown file in the {siteConfig.blog.contentPath} directory.
          </p>
        </div>
      ) : (
        <div className="space-y-8 w-full">
          {featuredPosts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Featured Posts</h2>
              <div className="grid grid-cols-1 gap-6 w-full">
                {featuredPosts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.slug} className="block transition-transform hover:scale-[1.01]">
                    <Card className="glass hover:bg-accent/10 transition-colors border-primary/20 overflow-hidden">
                      <div className="relative w-full h-48">
                        <Image 
                          src={post.image || ''} 
                          alt={post.title} 
                          fill 
                          className="object-cover" 
                          priority={featuredPosts.indexOf(post) < 2}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
                      </div>
                      <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{post.description}</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm text-muted-foreground">Read more →</p>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {featuredPosts.length > 0 && <h2 className="text-2xl font-semibold">All Posts</h2>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {regularPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="block transition-transform hover:scale-[1.01]">
                  <Card className="glass hover:bg-accent/10 transition-colors h-full overflow-hidden">
                    <div className="relative w-full h-36">
                      <Image 
                        src={post.image || ''} 
                        alt={post.title} 
                        fill 
                        className="object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2">{post.description}</p>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-muted-foreground">Read more →</p>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;