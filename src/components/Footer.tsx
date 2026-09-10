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
            Everyday fine jewelry, designed in small batches and made to be
            worn — not saved for someday.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-1 font-medium text-ink">Shop</span>
          <Link href="/shop?category=Rings" className="text-ink/60 hover:text-gold">Rings</Link>
          <Link href="/shop?category=Necklaces" className="text-ink/60 hover:text-gold">Necklaces</Link>
          <Link href="/shop?category=Earrings" className="text-ink/60 hover:text-gold">Earrings</Link>
          <Link href="/shop?category=Bracelets" className="text-ink/60 hover:text-gold">Bracelets</Link>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-1 font-medium text-ink">Help</span>
          <span className="text-ink/60">Shipping &amp; Returns</span>
          <span className="text-ink/60">Sizing Guide</span>
          <span className="text-ink/60">Jewelry Care</span>
          <span className="text-ink/60">Contact Us</span>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-1 font-medium text-ink">Brand</span>
          <Link href="/about" className="text-ink/60 hover:text-gold">Our Story</Link>
          <span className="text-ink/60">Sustainability</span>
          <span className="text-ink/60">Instagram</span>
          <span className="text-ink/60">Pinterest</span>
        </div>
      </div>

      <div className="border-t border-ink/10 px-5 py-6 text-center text-xs text-ink/45 md:px-8">
        © {new Date().getFullYear()} Bejeweled Jewelry. All rights reserved.
      </div>
    </footer>
  );
}
