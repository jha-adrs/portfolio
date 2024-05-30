import { Navbar } from '@/components/landing-page/navbar';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { MainCard } from './_components/main-card';
import Link from 'next/link';

interface ProjectsPageProps {

}

const ProjectsPage = ({ }: ProjectsPageProps) => {
    return (
           <div className="flex h-full w-full items-center justify-center pt-6 ">
            <div className="absolute left-0 top-0 w-full h-full bg-gradient2 opacity-80 -z-10 blur-sm" />
                <div className="flex flex-col gap-y-6 px-2 overflow-y-auto no-scrollbar">
                    <div className='gap-x-2 inline-flex items-center'>
                        <Link href={"/"}>
                            <Button variant={"outline"} size={"icon"} className='h-8 w-8 glass bg-transparent'>
                                <ChevronLeft className='w-4 h-4' />
                            </Button>
                        </Link>
                        <p className='font-semibold text-xl'>
                            Projects
                        </p>
                    </div>
                    <MainCard />
                </div>
           </div>
    )
}

export default ProjectsPage;