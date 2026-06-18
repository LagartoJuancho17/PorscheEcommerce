import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import HeroVideo from "@/components/HeroVideo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const heroProduct = products.find((p) => p.image) ?? null;
  const heroSrc = heroProduct
    ? `/images/products/${heroProduct.image}`
    : null;

  return (
    <main className="bg-black">
      <HeroVideo poster={heroSrc} />

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
