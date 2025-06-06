import Image from 'next/image';
import React from 'react';
import { Navbar } from '@/components/landing-page/navbar';

interface BloglayoutProps {
    children: React.ReactNode;
}

const Bloglayout = ({ children }: BloglayoutProps) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start">
            <div className="absolute left-0 top-0 w-full h-full bg-gradient opacity-80 -z-10 blur-sm" />
            <Image src={"/bg.svg"} alt='Background' fill className="absolute object-cover h-full w-full opacity-50 -z-20" />
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
                {children}
            </div>
        </main>
    )
}

export default Bloglayout;