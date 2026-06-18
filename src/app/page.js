import Link from "next/link";
import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const heroProduct = products.find((p) => p.image) ?? null;
  const heroSrc = heroProduct
    ? `/images/products/${heroProduct.image}`
    : null;

  return (
    <main className="bg-black">
      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <div className="absolute inset-0 overflow-hidden">
          <video
            src="/videos/porscheHero.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster={heroSrc}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/25 to-transparent" />
        </div>

        <div className="relative z-10 px-12 pb-24 max-w-3xl">
          <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase mb-5">
            Ingenieria sin limites
          </p>
          <h1 className="text-white text-6xl font-thin leading-[1.05] mb-8">
            Diseñado para<br />los que conducen
          </h1>
          <Link
            href="/categories"
            className="inline-block border border-white/40 text-white text-[11px] tracking-[0.3em] uppercase px-8 py-3.5 hover:bg-white hover:text-black transition-all duration-300"
          >
            Explorar modelos
          </Link>
        </div>
      </section>

      {/* Models section */}
      <section className="bg-[#111] px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-white/35 text-[10px] tracking-[0.5em] uppercase mb-3">
            Coleccion 2025
          </p>
          <h2 className="text-white text-3xl font-thin mb-12">
            Nuestros modelos
          </h2>
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
