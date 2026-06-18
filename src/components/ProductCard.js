import Image from "next/image";
import Link from "next/link";

function getImageSrc(image) {
  if (!image) return "";
  if (image.startsWith("/")) return image;
  return `/images/products/${image}`;
}

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product._id}`}
      className="group relative aspect-4/3 bg-[#1a1a1a] overflow-hidden block"
    >
      {product.image ? (
        <Image
          alt={product.name}
          className="object-contain transition-transform duration-700 group-hover:scale-105 p-4"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          src={getImageSrc(product.image)}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-white/20 text-sm">
          Sin imagen
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        {product.categories?.[0]?.name && (
          <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-1">
            {product.categories[0].name}
          </p>
        )}
        <h3 className="text-white text-lg font-light">{product.name}</h3>
        <p className="text-white/55 text-sm mt-0.5">
          Desde USD {product.price.toLocaleString()}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </Link>
  );
}
