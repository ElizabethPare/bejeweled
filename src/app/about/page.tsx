import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductArt from "@/components/ProductArt";
import { ArrowRightIcon, SparkleIcon } from "@/components/icons";
import { getCatalog } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Story — Bejeweled",
  description:
    "Bejeweled is a small jewelry studio designing everyday fine jewelry, handcrafted in small batches.",
};

const values = [
  {
    title: "Made to be worn",
    body: "No piece leaves the studio until it can survive a full day — dishes, workouts, naps and all.",
  },
  {
    title: "Small batches, always",
    body: "We design and finish jewelry in limited runs so every piece gets real attention, not a factory line.",
  },
  {
    title: "Kind to skin, kind to earth",
    body: "Nickel-free, tarnish-resistant, and packaged in recyclable materials from day one.",
  },
];

export default async function AboutPage() {
  const products = await getCatalog();
  const heroProduct = products[4] ?? products[0];

  return (
    <div className="pb-24">
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pt-14 md:grid-cols-2 md:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-ink/70">
            <SparkleIcon className="h-3 w-3 text-gold" /> Our story
          </span>
          <h1 className="font-script mt-6 text-balance text-4xl leading-tight text-ink sm:text-5xl">
            Jewelry for the life you&apos;re already living
          </h1>
          <p className="mt-6 text-ink/65">
            Bejeweled started with a simple annoyance: most &ldquo;fine&rdquo; jewelry
            felt too precious to actually wear. So we set out to make pieces
            with the polish of fine jewelry and the durability to survive
            real, everyday life — the commute, the gym bag, the good and the
            ordinary days alike.
          </p>
          <p className="mt-4 text-ink/65">
            Every design starts as a sketch in our studio, gets prototyped by
            hand, and is finished in small batches by artisans we&apos;ve worked
            with for years. Nothing is mass-produced, and nothing ships until
            it meets the standard we&apos;d want for ourselves.
          </p>
        </Reveal>
        {heroProduct && (
          <Reveal delay={0.15}>
            <div className="aspect-square overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-20px_rgba(46,27,59,0.3)]">
              <ProductArt
                category={heroProduct.category}
                colorway={heroProduct.colorway}
                accent={heroProduct.accent}
                image={heroProduct.image}
                size="lg"
              />
            </div>
          </Reveal>
        )}
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="font-script text-center text-3xl text-ink md:text-4xl">
            What we stand for
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-ink/8 bg-white/50 p-6">
                <SparkleIcon className="h-5 w-5 text-gold" />
                <h3 className="mt-4 font-medium text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <p className="font-script text-2xl leading-relaxed text-ink sm:text-3xl">
            &ldquo;We&apos;re not trying to make you buy more jewelry. We&apos;re trying to
            make the pieces you do buy the ones you never take off.&rdquo;
          </p>
          <span className="mt-4 block text-xs uppercase tracking-[0.2em] text-ink/45">
            — Founder, Bejeweled
          </span>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft"
          >
            Shop the collection <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
