import { Button, Typography } from "poyraz-ui/atoms";
import { PatternGrid } from "poyraz-ui/atoms";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background Pattern */}
      <PatternGrid overlay color="#dc2626" opacity={0.04} size={40} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* ── Text Block ── */}
        <div className="text-center max-w-3xl mx-auto">
          <Typography variant="h1">
            Hi, I&apos;m{" "}
            <span className="text-red-600 font-secondary">Poyraz</span>
          </Typography>

          <Typography variant="lead" className="mt-4 text-slate-500">
            A young person exploring technology..
          </Typography>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a href="/client/proposal">Start a Project</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              asChild
            >
              <a href="/products">Browse Store</a>
            </Button>
          </div>
        </div>

        {/* ── Dashboard Preview ── */}
        <div className="mt-8 md:mt-16">
          <div className="mx-auto max-w-4xl">
            <Image
              src="/images/herosection.png"
              alt="Poyraz Avsever — Dashboard Preview"
              width={1200}
              height={750}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
