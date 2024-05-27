import React, { Children } from 'react';

interface BloglayoutProps {
    children: React.ReactNode;
}

const Bloglayout = ({children }: BloglayoutProps) => {
    return (
        <>
            <div className="flex flex-col h-64 w-64 items-center glass-dark">
                {children}
            </div>
            
        </>
    )
}

export default Bloglayout;