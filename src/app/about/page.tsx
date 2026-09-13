import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductArt from "@/components/ProductArt";
import { ArrowRightIcon, SparkleIcon } from "@/components/icons";
import { getCatalog } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nuestra historia — Bejeweled",
  description:
    "Bejeweled es una tienda de joyas seleccionadas para usar todos los días: anillos, collares, aros y pulseras elegidos uno por uno.",
};

const values = [
  {
    title: "Para usar de verdad",
    body: "Ninguna pieza entra al catálogo si no aguanta un día entero: la ducha apurada, el gimnasio, la siesta y todo lo demás.",
  },
  {
    title: "Selección, no cantidad",
    body: "Traemos pocas piezas por vez. Probamos cada modelo antes de sumarlo, y lo que no nos convence simplemente no llega a la tienda.",
  },
  {
    title: "Buenas con tu piel",
    body: "Sin níquel, con terminaciones antimanchas y packaging reciclable desde el primer día.",
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
            <SparkleIcon className="h-3 w-3 text-gold" /> Nuestra historia
          </span>
          <h1 className="font-script font-script-display mt-6 text-balance text-4xl text-ink sm:text-5xl">
            Joyas para la vida que ya estás viviendo
          </h1>
          <p className="mt-6 text-ink/65">
            Bejeweled empezó con una molestia simple: casi toda la joyería
            &ldquo;linda&rdquo; parecía demasiado delicada para usarla en serio. Así
            que salimos a buscar piezas que tuvieran la terminación de una
            joya y la resistencia para bancarse el día a día — el colectivo,
            el bolso del gimnasio, los días especiales y los comunes.
          </p>
          <p className="mt-4 text-ink/65">
            No fabricamos: elegimos. Trabajamos con proveedores que ya
            conocemos, pedimos muestras antes de comprar y probamos cada
            modelo nosotras mismas. Si una pieza se descascara, se pone verde
            o molesta después de unas horas, no entra al catálogo.
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
            Lo que nos importa
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
          <p className="font-script text-2xl text-ink sm:text-3xl">
            &ldquo;No queremos que compres más joyas. Queremos que las que
            compres sean esas que no te sacás nunca.&rdquo;
          </p>
          <span className="mt-4 block text-xs uppercase tracking-[0.2em] text-ink/45">
            — Fundadora de Bejeweled
          </span>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft"
          >
            Ver la colección <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
