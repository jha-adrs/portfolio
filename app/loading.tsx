import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoadingProps {

}

export default function Loading({ }: LoadingProps) {
    return (
        <div className='absolute inset-0 z-500 bg-black/50 flex items-center justify-center w-full h-full'>
            <Loader2 className='w-8 h-8 animate-spin text-muted-foreground' />
        </div>
    )
}