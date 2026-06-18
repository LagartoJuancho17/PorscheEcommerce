import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <p className="text-white/30 text-sm text-center py-16 tracking-widest uppercase">
        No hay modelos disponibles.
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-3 bg-white/5">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
