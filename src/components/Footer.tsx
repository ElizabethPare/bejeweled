import Link from "next/link";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="mt-24 bg-blush-soft">
      <div className="mx-auto max-w-7xl px-5 pt-16 md:px-8">
        <Newsletter />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 py-16 md:grid-cols-5 md:px-8">
        <div className="col-span-2">
          <span className="font-script text-3xl text-ink">Bejeweled</span>
          <p className="mt-3 max-w-xs text-sm text-ink/60">
            Joyas elegidas para usar todos los días — no para guardar
            esperando una ocasión especial.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-1 font-medium text-ink">Tienda</span>
          <Link href="/shop?category=Anillos" className="text-ink/60 hover:text-gold">Anillos</Link>
          <Link href="/shop?category=Collares" className="text-ink/60 hover:text-gold">Collares</Link>
          <Link href="/shop?category=Aros" className="text-ink/60 hover:text-gold">Aros</Link>
          <Link href="/shop?category=Pulseras" className="text-ink/60 hover:text-gold">Pulseras</Link>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-1 font-medium text-ink">Ayuda</span>
          <span className="text-ink/60">Envíos y cambios</span>
          <span className="text-ink/60">Guía de talles</span>
          <span className="text-ink/60">Cuidado de las joyas</span>
          <span className="text-ink/60">Contacto</span>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-1 font-medium text-ink">Marca</span>
          <Link href="/about" className="text-ink/60 hover:text-gold">Nuestra historia</Link>
          <span className="text-ink/60">Sustentabilidad</span>
          <span className="text-ink/60">Instagram</span>
          <span className="text-ink/60">Pinterest</span>
        </div>
      </div>

      <div className="border-t border-ink/10 px-5 py-6 text-center text-xs text-ink/45 md:px-8">
        © {new Date().getFullYear()} Bejeweled Jewelry. Todos los derechos reservados. ·{" "}
        <Link href="/admin" className="hover:text-gold">
          Admin
        </Link>
      </div>
    </footer>
  );
}
