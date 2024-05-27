import { title } from "process";
// For Techstack also need to add in types.ts
export const siteConfig = {
    disableThemeToggle: true
    ,
    navItems: [
        {
            label: "Home",
            href: "/",
            newTab: false
        },
        {
            label: "Resume",
            href: "https://utfs.io/f/210079eb-7f74-4734-9618-6290e39a5517-v3yfv7.pdf",
            newTab: true
        },
        {
            label: "Blog",
            href: "/blog",
            newTab: false
        },
        {
            label: "Projects",
            href: "/projects",
            newTab:false,
        },
        {
            label: "Contact",
            href: "/contact",
            newTab: false
        },
    ],
    email: "aadarshjha6783@gmail.com",
    // avatarURL: "https://utfs.io/f/2dfeeeb7-b9f5-4aef-85ac-22507e10d36d-wmljsp.png",
    avatarURL: "https://utfs.io/f/ee3ecf64-633b-4a0f-bbba-f97403272dde-9cuaf6.57.11_a5daf2b0.jpg",
    resumeURL: "https://utfs.io/f/210079eb-7f74-4734-9618-6290e39a5517-v3yfv7.pdf",
    projects: [
        {
            title: "Portfolio",
            description: "Personal portfolio website",
            href: "https://platinumj.dev",
            imageURL : "https://utfs.io/f/afa57efc-bf9e-4a68-ae39-e12481e35992-iiqo62.png",

            tags: ["nextjs", "typescript", "tailwindcss", "react", "markdown"],
            detailedDescription: "Personal portfolio website andblog platform built using Next.js, TypeScript, TailwindCSS, and React.",
        },
        {
            title: "Snapsite",
            description: "Professional archiving tool for the web",
            href: "https://snapsite-ui.vercel.app",
            tags: ["nextjs", "typescript", "tailwindcss", "nodejs", "sql", "react", "javascript"],
            imageURL : "https://utfs.io/f/afa57efc-bf9e-4a68-ae39-e12481e35992-iiqo62.png",
            detailedDescription: "Snapsite is a professional archiving tool for the web. It allows users to archive web pages and view them later. It is built using Next.js, TypeScript, TailwindCSS, Node.js, SQL, React, and JavaScript."
        },
        {
            title: "Universe",
            description: "A social media platform based chatbot for college students.",
            href: "https://universe-flax.vercel.app",
            tags: ["nextjs", "javascript", "tailwindcss", "sql", "react", "javascript", "prisma"],
            imageURL: "https://utfs.io/f/2dfeeeb7-b9f5-4aef-85ac-22507e10d36d-wmljsp.png",
            detailedDescription: "Universe is a social media platform based chatbot for college students. With fully customizable chatbot based on RAG and GPT3.5. It is built using Next.js, JavaScript, TailwindCSS, SQL, React, JavaScript, and Prisma."
        },
        {
            title: "Re-Twitch",
            description: "A live streaming clone of Twitch.",
            href: "https://re-twitch.vercel.app",
            tags: ["nextjs", "typescript", "tailwindcss", "nodejs", "sql", "react", "javascript"],
            imageURL: "https://utfs.io/f/2dfeeeb7-b9f5-4aef-85ac-22507e10d36d-wmljsp.png",
            detailedDescription: "Re-Twitch is a live streaming clone of Twitch. It is built using Next.js, TypeScript, TailwindCSS, Node.js, SQL, React, and JavaScript."
        }
    ],
    socials: {
        github: {
            label: "GitHub",
            href: "https://github.com/jha-adrs",
        },
        linkedin: {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/jha-aadarsh",
        },
        twitter: {
            label: "Twitter",
            href: "https://x.com/junior_dev_69",
        }
    },
    tech: {
        nextjs: {
            text: "Next.js",
            color: "gray",
            logo: "/techstack/nextjs.svg"
        },
        typescript : {
            text: "TypeScript",
            color: "blue",
            logo: "/techstack/typescript.svg"
        },
        tailwindcss: {
            text: "TailwindCSS",
            color: "cyan",
            logo: "/techstack/tailwind.svg"
        },
        react: {
            text: "React",
            color: "blue",
            logo: "/techstack/react.svg"
        },
        nodejs: {
            text: "Node.js",
            color: "green",
            logo: "/techstack/nodejs.svg"
        },
        graphql: {
            text: "GraphQL",
            color: "pink",
            logo: "https://utfs.io/f/5e0b8b9b-6c0b-4e3f-8f8d-7b5a0b5d7b1e-5p2v6u.png"
        },
        mongodb: {
            text: "MongoDB",
            color: "green",
            logo: "https://utfs.io/f/5e0b8b9b-6c0b-4e3f-8f8d-7b5a0b5d7b1e-5p2v6u.png"
        },
        postgresql: {
            text: "PostgreSQL",
            color: "blue",
            logo: "https://utfs.io/f/5e0b8b9b-6c0b-4e3f-8f8d-7b5a0b5d7b1e-5p2v6u.png"
        },
        docker: {
            text: "Docker",
            color: "blue",
            logo: "https://utfs.io/f/5e0b8b9b-6c0b-4e3f-8f8d-7b5a0b5d7b1e-5p2v6u.png"
        },
        python: {
            text: "Python",
            color: "blue",
            logo: "https://utfs.io/f/5e0b8b9b-6c0b-4e3f-8f8d-7b5a0b5d7b1e-5p2v6u.png"
        },
        sql :{
            text: "MySQL",
            color: "blue",
            logo: "/techstack/mysql.svg"
        },
        javascript : {
            text: "JavaScript",
            color: "yellow",
            logo: "/techstack/javascript.svg"
        },
        prisma: {
            text: "Prisma",
            color: "blue",
            logo: "/techstack/prisma.svg"
        },
        openai : {
            text: "OpenAI",
            color: "blue",
            logo: "/techstack/openai.svg"
        },
        markdown : {
            text: "Markdown",
            color: "blue",
            logo: "/techstack/markdown.svg"
        }

    }
};