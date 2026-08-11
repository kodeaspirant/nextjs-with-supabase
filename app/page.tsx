import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// AcidSquares uses ogl (WebGL) and touches the DOM directly in useEffect,
// so it must be client-only — dynamic import with ssr:false keeps it out
// of the server render entirely.
const AcidSquares = dynamic(() => import("@/components/AcidSquares"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 relative z-10 bg-background">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Next.js Supabase Starter</Link>
              <div className="flex items-center gap-2">
                <DeployButton />
              </div>
            </div>
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>

        <div className="relative w-full max-w-5xl p-5">
          {/* Background layer, scoped to this box only (600px tall, matches
              the wrapper AcidSquares was designed for). z-index kept below
              the content below so links/buttons stay clickable. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 overflow-hidden rounded-xl"
            style={{ height: 600 }}
          >
            <AcidSquares
              color1="#5227FF"
              color2="#A855F7"
              color3="#FFFFFF"
              detail="medium"
              speed={0.7}
              waveDepth={1}
              zoom={1.3}
              density={10}
              glow={1}
              exposure={2700}
              spread={0.3}
              stepSize={0.002}
              colorShift={0}
              contrast={1}
              brightness={1}
              opacity={1}
              mouseInteraction
              mouseStrength={0.1}
              mouseRadius={0.35}
              blur={0}
              grain
              grainIntensity={0.05}
            />
          </div>

          <div className="flex flex-col gap-20 py-10">
            <Hero />
          </div>
        </div>

        <main className="flex-1 flex flex-col gap-6 px-4 w-full max-w-5xl">
          <h2 className="font-medium text-xl mb-4">Next steps</h2>
          {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </main>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
