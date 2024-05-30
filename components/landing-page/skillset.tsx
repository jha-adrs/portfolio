"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";

export function Skillset() {
  const randomSkills1 = skills.sort(() => Math.random() - 0.5);
  const randomSkills2 = skills.sort(() => Math.random() - 0.5);
  return (
    <div className="h-[20rem] py-8 space-y-6 rounded-md flex flex-col antialiased bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden w-screen">
        
        <h3 className="text-3xl font-bold">
            Tech Stack I&apos;ve worked with ⚒️
        </h3>
      <InfiniteMovingCards
        items={randomSkills1}
        direction="right"
        speed="slow"
      />
      <InfiniteMovingCards
        items={randomSkills2}
        direction="left"
        speed="slow"
      />
    </div>
  );
}

const skills = [
  {
    src : "/techstack/aws.svg",
    alt : "AWS",
    text: "AWS",
  },
  {
    src : "/techstack/azure.svg",
    alt : "Azure",
    text: "Azure",
  },
  {
    src : "/techstack/cpp.svg",
    alt : "C++",
    text: "C++",
  },
  {
    src: "/techstack/docker.svg",
    alt: "Docker",
    text: "Docker",
  },
  {
    src : "/techstack/elastic.svg",
    alt : "Elasticsearch",
    text: "Elasticsearch",
  },
  {
    src : "/techstack/figma.svg",
    alt : "Figma",
    text: "Figma",
  },
  {
    src : "/techstack/firebase.svg",
    alt : "Firebase",
    text: "Firebase",
  },
  {
    src : "/techstack/gcp.svg",
    alt : "Google Cloud",
    text: "Google Cloud",
  },
  {
    src : "/techstack/git.svg",
    alt : "Git",
    text: "Git",
  },
  {
    src : "/techstack/go.svg",
    alt : "Golang",
    text: "Golang",
  },
  {
    src : "/techstack/graphql.svg",
    alt : "GraphQL",
    text: "GraphQL",
  },
  {
    src : "/techstack/html.svg",
    alt : "HTML5",
    text: "HTML5",
  },
  {
    src : "/techstack/java.svg",
    alt : "Java",
    text: "Java",
  },
  {
    src : "/techstack/javascript.svg",
    alt : "JavaScript",
    text: "JavaScript",
  },
  {
    src : "/techstack/kubernetes.svg",
    alt : "Kubernetes",
    text: "Kubernetes",
  },
  {
    src : "/techstack/mongodb.svg",
    alt : "MongoDB",
    text: "MongoDB",
  },
  {
    src : "/techstack/mysql.svg",
    alt : "MySQL",
    text: "MySQL",
  },
  {
    src : "/techstack/nodejs.svg",
    alt : "Node.js",
    text: "Node.js",
  },
  {
    src : "/techstack/postgres.svg",
    alt : "PostgreSQL",
    text: "PostgreSQL",
  },
  {
    src : "/techstack/prisma.svg",
    alt : "Prisma",
    text: "Prisma",
  },
  {
    src : "/techstack/python.svg",
    alt : "Python",
    text: "Python",
  },
  {
    src : "/techstack/react.svg",
    alt : "React",
    text: "React",
  },
  {
    src : "/techstack/redis.svg",
    alt : "Redis",
    text: "Redis",
  },
  {
    src : "/techstack/typescript.svg",
    alt : "TypeScript",
    text: "TypeScript",
  },
  
  {
    src : "/techstack/tailwind.svg",
    alt : "Tailwind CSS",
    text: "Tailwind CSS",
  }
]