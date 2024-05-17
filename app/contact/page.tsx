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
import { Loader } from 'lucide-react';
interface ContactPageProps {

}



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
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        sendNotification(data).then((res) => {
            setIsLoading(false);
            toast.success(res.message);
        }).catch((err) => {
            toast.error(err?.message || "An error occurred while submitting the form");
            setIsLoading(false);
        })


    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2 '>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={
                        ({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)
                    }
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={
                        ({ field }) => (
                            <FormItem>
                                <FormLabel>Your Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)
                    }
                />
                <div className="flex w-full  py-2 items-center justify-end ">
                    <Button variant={"default"} type='submit' onClick={() => {
                        form.handleSubmit(onSubmit)
                    }}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className='w-4 h-4 animate-spin' /> : "Send"}
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default ContactPage;