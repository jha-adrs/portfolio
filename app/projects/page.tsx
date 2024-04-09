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
        <div className='flex flex-col items-center'>
            <Navbar />
            <main className='flex flex-col items-center justify-center mt-8 h-full bg-background text-foreground'>

                <div className="flex flex-col gap-y-6  px-6 ">
                    <div className='gap-x-2 inline-flex items-center'>
                        <Link href={"/"}>
                            <Button variant={"outline"} size={"icon"} className='h-8 w-8'>
                                <ChevronLeft className='w-4 h-4' />
                            </Button>
                        </Link>
                        <p className='font-semibold text-xl'>
                            Projects
                        </p>
                    </div>
                    <MainCard />
                </div>
            </main>
        </div>
    )
}

export default ProjectsPage;