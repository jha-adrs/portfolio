"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "right",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        src: string;
        alt: string;
        text: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Pause the animation when the tab is not visible
                if (scrollerRef.current) {
                    scrollerRef.current.style.animationPlayState = 'paused';
                }
            } else {
                // Resume the animation when the tab becomes visible again
                if (scrollerRef.current) {
                    scrollerRef.current.style.animationPlayState = 'running';
                }
                console.log("resumed");
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-9xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >

                {items.map((item, idx) => (
                    <li
                        className="w-16 h-16 max-w-full relative  flex-shrink-0   md:w-24 md:h-24"

                        key={idx}
                    >
                        <div className="flex flex-col items-center justify-center gap-y-2">
                            <Image src={item.src} alt={item.alt} width={32} height={32} />
                            <p className="text-xs text-center text-white">
                                {item.text}
                            </p>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};
