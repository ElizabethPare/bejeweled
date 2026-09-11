import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import ProductArt from "@/components/ProductArt";
import { ArrowRightIcon, SparkleIcon } from "@/components/icons";
import { categories, getCatalog } from "@/lib/products";

export const revalidate = 0;

export default async function Home() {
  const products = await getCatalog();
  const bestsellers = (
    products.filter((p) => p.isBestseller).length
      ? products.filter((p) => p.isBestseller)
      : products
  ).slice(0, 4);
  const newArrivals = (
    products.filter((p) => p.isNew).length
      ? products.filter((p) => p.isNew)
      : [...products].reverse()
  ).slice(0, 4);

  if (products.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 px-5 py-32 text-center">
        <h1 className="font-script text-3xl text-ink">No hay productos todavía</h1>
        <p className="text-ink/60">
          Cargá tu primer producto desde{" "}
          <Link href="/admin" className="text-gold underline">
            /admin
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <HeroSection showcase={bestsellers.slice(0, 3)} />

      {/* Category tiles */}
      <section className="mx-auto max-w-7xl px-5 pt-16 md:px-8">
        <Reveal>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-script text-3xl text-ink md:text-4xl">
              Shop by category
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((cat, i) => {
            const sample = products.find((p) => p.category === cat) ?? products[0];
            if (!sample) return null;
            return (
              <Reveal key={cat} delay={i * 0.08}>
                <Link
                  href={`/shop?category=${cat}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-3xl"
                >
                  <ProductArt
                    category={cat}
                    colorway={sample.colorway}
                    accent={sample.accent}
                    image={sample.image}
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 via-ink/0 to-ink/0 p-4">
                    <span className="text-lg font-medium text-pearl transition-transform duration-300 group-hover:translate-x-1">
                      {cat}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-5 pt-24 md:px-8">
        <Reveal>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                Loved by many
              </span>
              <h2 className="font-script text-3xl text-ink md:text-4xl">
                Bestsellers
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1.5 text-sm text-ink/70 hover:text-gold md:flex"
            >
              View all <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {bestsellers.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Brand story band */}
      <section className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-blush px-6 py-16 text-center sm:px-12">
            <SparkleIcon className="absolute left-[8%] top-[20%] h-5 w-5 text-gold/70 animate-sparkle-float" />
            <SparkleIcon
              className="absolute right-[10%] bottom-[22%] h-4 w-4 text-ink/30 animate-sparkle-float"
              style={{ animationDelay: "1s" }}
            />
            <p className="font-script mx-auto max-w-2xl text-2xl leading-relaxed text-ink sm:text-3xl">
              &ldquo;Jewelry shouldn&apos;t wait for a special occasion. Every piece we
              make is meant for a Tuesday as much as a wedding.&rdquo;
            </p>
            <span className="mt-4 block text-xs uppercase tracking-[0.2em] text-ink/50">
              — The Bejeweled Studio
            </span>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft"
            >
              Our story <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-5 pt-24 md:px-8">
        <Reveal>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                Just landed
              </span>
              <h2 className="font-script text-3xl text-ink md:text-4xl">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1.5 text-sm text-ink/70 hover:text-gold md:flex"
            >
              View all <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {newArrivals.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
