"use client";

import Link from "next/link";
import Image from "next/image";
import logoImage from "../../../logo/favicon-radius.png";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [note, setNote] = useState("");
  const prompts = [
    "whats on your mind?",
    "what are you working on?",
  ];

  const [title, setTitle] = useState("");

  useEffect(() => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setTitle(randomPrompt);
  }, []);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("notes") : null;
    if (saved) setNote(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", note);
  }, [note]);

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
              href="/tools/settings"
              className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-90"
            >
              Settings
            </Link>
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

        <section className="flex flex-1 py-16 sm:py-20 items-start justify-center">
          <div className="flex w-full max-w-6xl flex-col items-center">
            <h1 className="text-6xl font-bold tracking-tight text-black text-center max-w-5xl mx-auto break-words">
              {title || "Whats on your mind today?"}
            </h1>

            <textarea
              className="mt-8 min-h-[60vh] w-full rounded-xl bg-zinc-200 p-6 text-black outline-none resize-y overflow-auto max-w-full"
              placeholder="write here ...."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
