import Image from 'next/image';
import React from 'react';

interface ContactLayoutProps {
    children: React.ReactNode;
}

const ContactLayout = ({ children }: ContactLayoutProps) => {
    return (
        <>
            <div className=' w-full h-[85vh] flex flex-col items-center justify-center p-4'>
                <div className='grid grid-cols-1 lg:grid-cols-5 w-full h-full p-4 max-w-[85%] border rounded-md'>
                    <div className="flex flex-col col-span-2 space-y-3 lg:cols-span-3 p-6 h-full  items-center  justify-center">
                        <h1 className="text-2xl lg:text-3xl font-bold">
                            Let&apos;s get in touch
                        </h1>
                        <p className="text-sm text-muted-foreground text-center">
                            Feel free to reach out for collaborations, questions, or just to say hi! 😃
                        </p>
                        {children}

                    </div>
                    <div className="hidden lg:flex flex-col col-span-3 items-center justify-center border-l">
                        {/* <h1 className="text-3xl font-bold">
                    Let&apos;s talk!
                </h1> */}
                        <Image src="/contact.svg" width={400} height={400} alt="Contact us" />

                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactLayout;