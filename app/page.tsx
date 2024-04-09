import { Navbar } from "@/components/landing-page/navbar";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/config";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <main className="flex flex-col items-center justify-center h-screen bg-background text-foreground">

        <div className="flex flex-col gap-y-8 items-center">
          <div className="flex flex-col gap-y-2 items-center">
            <Image src={siteConfig.avatarURL} alt="avatar" width={100} height={100} className="rounded-full" />
            <p className="text-2xl font-bold">
              Hi, I&apos;m Aadarsh &#x1F44B;
            </p>
          </div>
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl max-w-lg sm:max-w-xl md:max-w-2xl text-center">
            Building digital products, brands and experience<span className="text-rose-500">.</span>
          </h1>
          <h3 className="font-semibold max-w-md sm:max-w-lg text-xl text-center text-foreground/90">
            I&apos;m a software engineer based in India specializing in building (and occasionally designing) exceptional digital experiences.
          </h3>
          <Link href={"mailto:aadarshjha6783@gmail.com"} target="_blank">
            <Button variant={"bold"} size={"lg"} className="rounded-3xl">
              Connect with me
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
