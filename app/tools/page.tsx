import Link from "next/link";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Tools</h1>
        <p className="mt-4 text-lg text-zinc-600">Simple tools page for now.</p>
        <Link href="/dashboard" className="mt-8 inline-flex rounded-full border border-black px-6 py-3 text-sm font-medium transition hover:bg-zinc-100">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
