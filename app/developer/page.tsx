"use client";

import { ArrowLeft, Mail, Code, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Custom GitHub SVG as it was removed in recent brand-less lucide versions
const Github = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full z-10 glass-panel border border-white/10 rounded-3xl p-10 relative overflow-hidden group shadow-2xl">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6 hover:bg-white/10 text-muted-foreground hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-[#0A0A0B] ring-2 ring-primary/30 relative z-10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600" 
                alt="Dhavala V D M Adithya Naidu" 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
              Dhavala V D M Adithya Naidu
            </h1>
            <p className="text-primary font-bold tracking-wider uppercase text-sm flex items-center justify-center gap-2">
              <Code className="h-4 w-4" /> Lead Developer & Architect
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-lg text-sm md:text-base">
            Creator of CrowdPulse X. Passionate about leveraging artificial intelligence, real-time data, and modern web technologies to build intuitive and scalable platforms for physical event experiences.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6 w-full sm:w-auto">
            <a href="mailto:adithyadvdm456@gmail.com" className="w-full sm:w-auto">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-8 font-bold tracking-wide">
                <Mail className="mr-2 h-4 w-4" /> Contact via Email
              </Button>
            </a>
            <div className="flex space-x-4 justify-center">
              <a href="https://github.com/AdithyaD56" target="_blank" rel="noreferrer">
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl h-12 w-12 p-0 flex items-center justify-center transition-all hover:scale-105">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <Link href="/dashboard">
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl h-12 w-12 p-0 flex items-center justify-center transition-all hover:scale-105" title="View Project Dashboard">
                  <LayoutDashboard className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
