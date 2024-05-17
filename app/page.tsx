import { Navbar } from "@/components/landing-page/navbar";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/config";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  await wait(1000);
  return (

    <main className="flex flex-col py-4 space-y-2 h-full bg-background text-foreground relative">
      <div className="fixed right-3/4 top-1/2 h-0 w-0 glow"/>
      <div className="fixed left-3/4 top-3/4 h-0 w-0 glow"/>
      <div className="flex flex-col gap-y-8 items-center">
        <div className="flex flex-col gap-y-2 items-center">
          <Image src={siteConfig.avatarURL} alt="avatar" width={100} height={100} className="rounded-full" />
          <p className="text-2xl font-bold">
            Hi, I&apos;m Aadarsh &#x1F44B;
          </p>
        </div>
        <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl max-w-lg sm:max-w-xl md:max-w-2xl text-center p-2">
          Building digital products, brands and experience<span className="text-rose-500">.</span>
        </h1>
        <h3 className="font-semibold max-w-md sm:max-w-lg text-xl text-center text-foreground/90 p-2">
          I&apos;m a software engineer based in India specializing in building (and occasionally designing) exceptional digital experiences.
        </h3>
        <Link href={"/contact"} target="_blank">
          <Button variant={"bold"} size={"lg"} className="rounded-3xl">
            Connect with me
          </Button>
        </Link>
      </div>
      
    </main>
  );
}
