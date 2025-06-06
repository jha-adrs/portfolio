"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { formSchema } from '@/lib/schema';
import { sendNotification } from '@/actions/fill-form';
import { 
    AtSign, 
    CheckCircle2, 
    Github, 
    Linkedin, 
    Loader, 
    Mail, 
    MessageSquare, 
    Send, 
    Twitter, 
    User 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/config';

interface ContactPageProps {}

// Helper function to get the appropriate icon component
const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
        case 'github':
            return <Github className="w-5 h-5" />;
        case 'linkedin':
            return <Linkedin className="w-5 h-5" />;
        case 'twitter':
            return <Twitter className="w-5 h-5" />;
        case 'mail':
            return <Mail className="w-5 h-5" />;
        default:
            return <AtSign className="w-5 h-5" />;
    }
};

const ContactPage = ({ }: ContactPageProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        }
    });
    
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        sendNotification(data).then((res) => {
            setIsLoading(false);
            setIsSubmitted(true);
            form.reset();
            toast.success(res.message);
        }).catch((err) => {
            toast.error(err?.message || "An error occurred while submitting the form");
            setIsLoading(false);
        });
    }
    
    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 text-center p-8 h-full">
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                    <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Message Sent!</h2>
                <p className="text-muted-foreground max-w-md">
                    Thank you for reaching out! I'll get back to you as soon as possible.
                </p>
                <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4"
                >
                    Send Another Message
                </Button>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
            <Card className="shadow-md bg-white/5 backdrop-blur-sm border-muted">
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Mail className="h-5 w-5" /> 
                            Get In Touch
                        </h2>
                        <p className="text-muted-foreground">
                            Have a project in mind or just want to say hello? Fill out the form and I'll get back to you shortly.
                        </p>
                        
                        <div className="pt-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <a href={`mailto:${siteConfig.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {siteConfig.email}
                                    </a>
                                </div>
                            </div>
                            
                            <div className="border-t border-border pt-4 mt-4">
                                <p className="text-sm font-medium mb-3">Connect with me</p>
                                <div className="flex gap-3">
                                    {siteConfig.socialLinks?.map((link, index) => (
                                        <a 
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-muted hover:bg-muted/80 p-2 rounded-full transition-colors"
                                            aria-label={link.label}
                                        >
                                            {getSocialIcon(link.icon)}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card className="shadow-md bg-white/5 backdrop-blur-sm border-muted">
                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <User className="h-4 w-4" /> Name
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input 
                                                    placeholder="Your name" 
                                                    className='bg-white/10 pl-10 focus-visible:ring-primary' 
                                                    {...field} 
                                                />
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <AtSign className="h-4 w-4" /> Email
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input 
                                                    placeholder="Your email" 
                                                    className='bg-white/10 pl-10 focus-visible:ring-primary' 
                                                    {...field} 
                                                />
                                                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4" /> Message
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Textarea 
                                                    placeholder="Your thoughts..." 
                                                    className='bg-white/10 min-h-[120px] pl-10 focus-visible:ring-primary' 
                                                    {...field} 
                                                />
                                                <MessageSquare className="absolute left-3 top-6 h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-2">
                                <Button 
                                    variant="default" 
                                    type='submit'
                                    className="w-full group"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader className='w-4 h-4 animate-spin' />
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Send Message <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ContactPage;