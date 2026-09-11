import { notFound } from "next/navigation";
import { dbGetProductById, isDbReady } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isDbReady()) notFound();
  const product = await dbGetProductById(Number(id));
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <h1 className="font-script mb-8 text-3xl text-ink md:text-4xl">
        Editar producto
      </h1>
      <ProductForm product={product} />
    </div>
  );
}
