"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../../logo/favicon-radius.png";

type Session = {
  user: {
    id: string;
    name?: string;
    email?: string;
  };
};

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setSession(data.session ?? null);
      })
      .catch(() => setSession(null))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-5 sm:px-10 lg:px-12">
        <header className="relative flex items-center border-b border-black py-4">
          <div className="flex items-center gap-3">
            <Image src={logoImage} alt="Radius logo" width={36} height={36} priority className="h-9 w-9 rounded-full object-cover" />
          </div>

          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold tracking-[0.28em] text-black">
            system
            <a href="https://github.com/richardD242" target="_blank" rel="noopener noreferrer" className="ml-2 no-underline italic text-black hover:opacity-70">
              by richardD242
            </a>
          </span>

          <nav className="ml-auto hidden items-center gap-8 text-sm text-black md:flex">
            <Link href="/tools" className="transition-opacity hover:opacity-70">
              Tools
            </Link>
            <a href="/api/auth/logout" className="transition-opacity hover:opacity-70">
              Logout
            </a>
          </nav>
        </header>

        <section className="flex flex-1 items-center justify-center py-16 sm:py-20">
          <div className="flex w-full max-w-4xl flex-col items-center text-center">
            <Image
              src={logoImage}
              alt="Radius logo"
              width={220}
              height={220}
              priority
              className="h-auto w-full max-w-[220px] rounded-full object-cover"
            />

            <div className="mt-10">
              {loading ? (
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Loading...</h1>
              ) : session ? (
                <>
                  <h1 className="text-4xl tracking-tight sm:text-6xl">
                    <span className="font-bold">Hello</span>
                    <span className="ml-3 text-6xl">{session.user.name ?? session.user.id}</span>
                  </h1>
                  {session.user.email && (
                    <p className="mt-4 text-lg text-zinc-600">{session.user.email}</p>
                  )}
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Not signed in</h1>
                  <Link href="/access" className="mt-4 inline-flex text-lg text-black underline underline-offset-4">
                    Sign in with Hack Club
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
