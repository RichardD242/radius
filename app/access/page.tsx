import Link from "next/link";
import Image from "next/image";
import logoImage from "../../logo/favicon-radius.png";

export default function AccessPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-5 sm:px-10 lg:px-12">
        <header className="relative flex items-center border-b border-black py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src={logoImage}
                alt="Radius logo"
                width={36}
                height={36}
                priority
                className="h-9 w-9 rounded-full object-cover cursor-pointer"
              />
            </Link>
          </div>

          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold tracking-[0.28em] text-black">
            system
            <a href="https://github.com/richardD242" target="_blank" rel="noopener noreferrer" className="ml-2 no-underline italic text-black hover:opacity-70">
              by richardD242
            </a>
          </span>

          <nav className="ml-auto hidden items-center gap-8 text-sm text-black md:flex">
            <Link href="/" className="transition-opacity hover:opacity-70">
              Home
            </Link>
            <a href="https://github.com/richardD242/radius" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
              Code
            </a>
          </nav>
        </header>

        {/* MAIN CONTENT AREA - Edit your content here */}
        <section className="flex flex-1 items-center justify-center py-16 sm:py-20">
          <div className="flex w-full max-w-4xl flex-col items-center text-center">
            <Image src={logoImage} alt="Logo" className = "w-32 h-32 mb-4 object-contain" />
            <h1 className="text-5xl font-bold mb-6">Access Page</h1>
            <p className="text-lg text-gray-600 mb-8">
              To continue, please sign in
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
                <a href = {`https://auth.hackclub.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_HACKCLUB_CLIENT_ID}&redirect_uri=${encodeURIComponent("http://localhost:3000/api/auth/callback")}&response_type=code&scope=openid profile email`} className = "infine-flex h-12 items-center justify-center rounded-full bg-[#ec3750] px-7 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-90">
                  Sign in with HackClub
                </a>
                

                <Link href="/" className = "inline-flex h-12 items-center justify-center rounded-full bg-black px-7 text-sm font-medium text-white transition-transform duration-200 hover: -translate-y-0.5 hover:bg-zinc-800">
                    Back Home
                </Link>
            </div>
            </div>
        </section>
      </div>
    </main>
  );
}
