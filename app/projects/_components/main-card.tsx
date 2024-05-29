import { TechTag } from '@/components/tag';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { siteConfig } from '@/config/config';
import { TagsEnum } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Link1Icon } from '@radix-ui/react-icons';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MainCardProps {

}

export const MainCard = ({ }: MainCardProps) => {
    return (
        <div className='flex flex-col gap-y-8  min-h-[500px] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl no-scrollbar '>
            {
                siteConfig.projects.map((project, index) => {

                    return (
                        <ProjectComponent key={index} project={{ ...project, tags: project.tags.map(tag => TagsEnum[tag as keyof typeof TagsEnum]) }} />
                    )
                })
            }
        </div>
    )
}

type ProjectType = {
    title: string;
    description: string;
    href: string;
    tags: TagsEnum[];
    imageURL: string;
    detailedDescription: string;
}
function ProjectComponent({
    project: { title,
        description,
        href,
        tags,
        imageURL,
        detailedDescription
    }
}: { project: ProjectType }) {
    return (
        <Card className='glass bg-white/10'>
            <CardHeader>
                <CardTitle className='relative'>
                    <p className='text-xl font-bold'>
                        {title}
                    </p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className='absolute top-0 right-0'>
                                <Link href={href} target='_blank' className="">
                                    <Link1Icon className='w-4 h-4 ' />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='top' align='center'>
                                <p>
                                    See Live Demo
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
                <CardDescription className='space-y-4'>
                    {
                        description
                    }

                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-y-4">

                    <p className="text-sm font-light">
                        {detailedDescription}
                    </p>
                    <div id='tags' className='flex flex-wrap gap-x-2 gap-y-2 '>
                        {
                            tags.map((tag, index) => {
                                return (
                                    <TechTag key={index} tag={siteConfig.tech[tag]} />
                                )
                            })
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
