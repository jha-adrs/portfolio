"use client"
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button, buttonVariants } from '../ui/button';
import Link from 'next/link';
import { siteConfig } from '@/config/config';
import { cn } from '@/lib/utils';
import { AlignCenter } from 'lucide-react';
import { ModeToggleText } from '../mode-toggle-text';

interface MenuProps {

}

export const Menu = ({ }: MenuProps) => {
    return (
        <Sheet >
            <SheetTrigger>
                <Button variant={"ghost"} size={"icon"} className="">
                    <AlignCenter className="w-6 h-6 text-foreground/70 hover:text-foreground" />
                </Button>
            </SheetTrigger>
            
            <SheetContent side={"top"}>
            <SheetTitle>
                Menu
            </SheetTitle>
            <SheetDescription>
                Where to go next?
            </SheetDescription>
            <div className="flex flex-col items-center mt-4">
                {siteConfig.navItems.map((item, index) => (
                    <Link href={item.href} key={index} className={cn(buttonVariants({variant: "link"}),"")} target={item.newTab ? '_blank' : ''}>
                        <p>{
                            item.label
                        }
                        </p>
                    </Link>
                ))}
                {
                    siteConfig.disableThemeToggle ? null : <ModeToggleText />
                }
            </div>
            </SheetContent>
        </Sheet>
    )
}