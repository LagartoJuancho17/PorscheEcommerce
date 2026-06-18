import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import CarConfigurator from "@/components/CarConfigurator";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return <CarConfigurator product={product} />;
}
