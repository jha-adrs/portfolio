
import React from 'react';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TechTagProps {
    text: string;
    color: string;
    logo: string;
}

export const TechTag = ({tag}: {tag:TechTagProps}) => {
    return (
        <Badge variant={"secondary"} className='gap-x-2 bg-white/20 glass' >
            <Image src={tag.logo} height={15} width={15} alt='Technology Logo' /> 
            {tag.text}
        </Badge>
    )
}