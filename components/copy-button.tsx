"use client"

import { useState } from "react";
import { Button } from "./ui/button"
import { cn } from "@/lib/utils";

export const CopyButton = ({
    text
}: {
    text: string
}) => {
    const [copied, setIsCopied] = useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    }
    return (
        <button  onClick={handleCopy}>
            <div className="relative w-4 h-4">
                <Clippy className={
                    cn(
                        "transition-all duration-300 ease-in-out absolute top-0 left-0 stroke-current",
                        copied ? "opacity-0" : "opacity-100"
                    )
                }
                />
                <Check
                    className={
                        cn(
                            "transition-all duration-300 ease-in-out absolute top-0 left-0 stroke-current text-green-500",
                            copied ? "opacity-100" : "opacity-0"
                        )
                    }
                />
            </div>
        </button>
    )
}


function Clippy(props: any) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M5.75 4.75H10.25V1.75H5.75V4.75Z" />
            <path d="M3.25 2.88379C2.9511 3.05669 2.75 3.37987 2.75 3.75001V13.25C2.75 13.8023 3.19772 14.25 3.75 14.25H12.25C12.8023 14.25 13.25 13.8023 13.25 13.25V3.75001C13.25 3.37987 13.0489 3.05669 12.75 2.88379" />
        </svg>
    );
}

function Check(props: any) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M13.25 4.75L6 12L2.75 8.75" />
        </svg>
    );
}