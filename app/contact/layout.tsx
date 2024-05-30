import Image from 'next/image';
import React from 'react';

interface ContactLayoutProps {
    children: React.ReactNode;
}

const ContactLayout = ({ children }: ContactLayoutProps) => {
    return (
        <>
            <div className=' w-full h-[85vh] flex flex-col items-center justify-center p-4'>
                <div className='absolute left-0 top-0 w-full h-full bg-gradient  -z-10 blur-sm' />
                <div className="flex flex-col col-span-2 space-y-3 lg:cols-span-5 p-6 h-full w-full items-center glass bg-transparent justify-center ">
                        <h1 className="text-2xl lg:text-3xl font-bold">
                            Let&apos;s get in touch
                        </h1>
                        <p className="text-sm text-muted-foreground text-center">
                            Feel free to reach out for collaborations, questions, or just to say hi! 😃
                        </p>
                        {children}

                    </div>
            </div>
        </>
    )
}

export default ContactLayout;