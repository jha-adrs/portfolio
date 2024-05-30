import Image from 'next/image';
import React, { Children } from 'react';

interface BloglayoutProps {
    children: React.ReactNode;
}

const Bloglayout = ({children }: BloglayoutProps) => {
    return (
        <>
            <div className="flex flex-col h-64 w-64 items-center glass-dark">
                <Image src={"/bg.svg"} alt='Background' layout="fill" objectFit="cover" className="absolute  h-full w-full opacity-50 " />
                {children}
            </div>
            
        </>
    )
}

export default Bloglayout;