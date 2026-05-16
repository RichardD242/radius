"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">Loading...</main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Not signed in</h1>
          <Link href="/access" className="text-blue-600 underline">
            Sign in with Hack Club
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome {session.user.name ?? session.user.id}</h1>
        {session.user.email && <p className="mb-4">{session.user.email}</p>}
        <a href="/api/auth/logout" className="inline-block rounded bg-gray-900 text-white px-4 py-2">Log out</a>
      </div>
    </main>
  );
}
