import type { Metadata } from "next";
import { Inter, Poppins, Montserrat_Alternates, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { FooterComponent } from "@/components/footer-component";
import { Navbar } from "@/components/landing-page/navbar";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";


const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: [
    "400",
    "600",
    "700",
    "800",
    "900"
  ],
  variable: "--font-nunito"
});

export const metadata: Metadata = {
  title: "PlatinumJ.dev",
  description: "Personal portfolio website and blog platform built using Next.js, TypeScript, TailwindCSS, and React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(nunito.className, "dark relative")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          <div className="flex flex-col w-full min-h-screen items-center justify-center ">

            <Navbar />
            {children}
          </div>
          <Toaster />
          <FooterComponent />
        </ThemeProvider>
      </body>
    </html>
  );
}
