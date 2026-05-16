"use client";

import Link from "next/link";
import Image from "next/image";
import logoImage from "../../../logo/favicon-radius.png";

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-5 sm:px-10 lg:px-12">
        <header className="relative flex items-center border-b border-black py-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Image
                src={logoImage}
                alt="Radius logo"
                width={36}
                height={36}
                priority
                className="h-9 w-9 rounded-full object-cover cursor-pointer hover:opacity-70 transition-opacity"
              />
            </Link>
          </div>

          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold tracking-[0.28em] text-black">
            system
            <a
              href="https://github.com/richardD242"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 no-underline italic text-black hover:opacity-70"
            >
              by richardD242
            </a>
          </span>

          <nav className="ml-auto hidden items-center gap-4 text-sm text-black md:flex">
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-90"
            >
              Dashboard
            </Link>
            <a
              href="/api/auth/logout"
              className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-90"
            >
              Logout
            </a>
          </nav>
        </header>

        <section className="flex flex-1 items-center justify-center py-16 sm:py-20">
          <div className="flex w-full max-w-4xl flex-col items-center text-center">
            <h1 className="text-6xl font-bold tracking-tight">Notes</h1>
          </div>
        </section>
      </div>
    </main>
  );
}
