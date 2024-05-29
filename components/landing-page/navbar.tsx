"use client"
import { siteConfig } from '@/config/config';
import { cn } from '@/lib/utils';
import { ArrowUpRight, LucideMail, MailIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { ModeToggle } from '../mode-toggle';
import { Menu } from './menu';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { CalendarIcon, ClipboardCopyIcon } from '@radix-ui/react-icons';
import { CopyButton } from '../copy-button';

interface NavbarProps {

}

export const Navbar = ({ }: NavbarProps) => {
    const path = usePathname();
    return (
        <nav className="flex fixed top-2 px-4 flex-row h-16 w-full  max-w-lg md:max-w-2xl lg:max-w-4xl border-b  items-center justify-between z-50 glass bg-transparent rounded-lg">
            <div className="inline-flex items-center gap-x-2">
                <Link href={path === "/" ? "mailto:aadarshjha6783@gmail.com" : "/"} target='blank' className="">
                    <div className={
                        cn("rounded-full border border-foreground ", path === "/" ? "p-2" : "p-0")
                    }>
                        {
                            path === "/" ? <LucideMail size={24} /> : <Avatar>
                                <AvatarImage src={siteConfig.avatarURL} alt="avatar" />
                                <AvatarFallback>
                                    AJ
                                </AvatarFallback>
                            </Avatar>
                        }
                    </div>

                </Link>
                <div className='flex items-center'>
                    <p className={
                        cn("text-nowrap font-semibold text-sm", buttonVariants({ variant: "link" }))
                    }>
                        {siteConfig.email}
                    </p>
                     <CopyButton text={siteConfig.email} />
                </div>
            </div>

            <div className=" hidden md:flex flex-row items-center ">
                {siteConfig.navItems.map((item, index) => (
                    <Link href={item.href} key={index} className={cn(buttonVariants({ variant: "link" }), "")} target={item.newTab ? '_blank' : ''}>
                        <p>{
                            item.label
                        }
                        </p>
                    </Link>
                ))}
                {
                    siteConfig.disableThemeToggle ? null : <ModeToggle />
                }
            </div>
            <div className='flex md:hidden'>
                <Menu />
            </div>
        </nav>
    )
}