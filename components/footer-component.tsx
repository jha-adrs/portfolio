
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { siteConfig } from '@/config/config';

interface FooterComponentProps {

}

export const FooterComponent = ({ }: FooterComponentProps) => {
    return (
        <div className='w-full min-h-36 '>
            <Separator />
            <footer className='flex flex-col items-center justify-center h-36 bg-background text-foreground gap-y-4'>
                <div className="gap-x-2">
                    <Link href={siteConfig.socials.linkedin.href}>
                        <Button className="" size={"icon"} variant={"ghost"}>
                            <LinkedInLogoIcon className='w-6 h-6 text-muted-foreground' />
                        </Button>
                    </Link>

                    <Link href={siteConfig.socials.github.href}>
                        <Button className="" size={"icon"} variant={"ghost"}>
                            <GitHubLogoIcon className='w-6 h-6 text-muted-foreground' />
                        </Button>
                    </Link>

                    <Link href={siteConfig.socials.twitter.href}>
                        <Button className="" size={"icon"} variant={"ghost"}>
                            <TwitterLogoIcon className='w-6 h-6 text-muted-foreground' />
                        </Button>
                    </Link>

                </div>

                <p className="text-sm font-semibold">Made with ❤️ by Aadarsh</p>
            </footer>

        </div>
    )
}