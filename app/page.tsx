import Image from "next/image";
import bannerImage from "../logo/radius-banner.png";
import logoImage from "../logo/favicon-radius.png";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-5 sm:px-10 lg:px-12">
        <header className="relative flex items-center border-b border-black py-4">
          <div className="flex items-center gap-3">
            <Image
              src={logoImage}
              alt="Radius logo"
              width={36}
              height={36}
              priority
              className="h-9 w-9 rounded-full object-cover"
            />
          </div>

          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold tracking-[0.28em] text-black">
            system
            <a href="https://github.com/richardD242" target="_blank" rel="noopener noreferrer" className="ml-2 no-underline italic text-black hover:opacity-70">
              by richardD242
            </a>
          </span>

          <nav className="ml-auto hidden items-center gap-8 text-sm text-black md:flex">
            <a className="transition-opacity hover:opacity-70" href="#access">
              Access
            </a>
            <a className="transition-opacity hover:opacity-70" href="#code">
              Code
            </a>
          </nav>
        </header>

        <section className="flex flex-1 items-center justify-center py-16 sm:py-20">
          <div className="flex w-full max-w-4xl flex-col items-center text-center">
            <Image
              src={bannerImage}
              alt="Radius banner"
              width={1400}
              height={520}
              priority
              className="h-auto w-full max-w-4xl object-contain"
            />
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                id="access"
                href="#access"
                className="inline-flex h-12 items-center justify-center rounded-full bg-black px-7 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-zinc-800"
              >
                Access
              </a>
              <a
                id="code"
                href="#code"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black bg-white px-7 text-sm font-medium text-black transition-transform duration-200 hover:-translate-y-0.5 hover:bg-zinc-100"
              >
                Code
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
