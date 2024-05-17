import { siteConfig } from '@/config/config';
import { cn } from '@/lib/utils';
import { ArrowUpRight, LucideMail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { ModeToggle } from '../mode-toggle';
import { Menu } from './menu';

interface NavbarProps {

}

export const Navbar = ({ }: NavbarProps) => {
    return (
        <nav className="flex  px-4 flex-row h-16 w-full  max-w-lg md:max-w-2xl lg:max-w-4xl bg-transparent border-b items-center justify-between">
            <Link href={"mailto:aadarshjha6783@gmail.com"} target='blank' className="inline-flex items-center gap-x-2">
                <div className="rounded-full border border-foreground p-2 ">
                    <LucideMail className='w-6 h-6 stroke-1' />

                </div>
                <p className={
                    cn("text-nowrap font-semibold text-sm", buttonVariants({ variant: "link" }))
                }>
                    {siteConfig.email}
                </p>
            </Link>
            <div className=" hidden md:flex flex-row items-center ">
                {siteConfig.navItems.map((item, index) => (
                    <Link href={item.href} key={index} className={cn(buttonVariants({variant: "link"}),"")} target={item.newTab ? '_blank' : ''}>
                        <p>{
                            item.label
                        }
                        </p>
                    </Link>
                ))}
                <ModeToggle />
            </div>
            <div className='flex md:hidden'>
                    <Menu />
            </div>
        </nav>
    )
}