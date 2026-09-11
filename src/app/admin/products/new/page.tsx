import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <h1 className="font-script mb-8 text-3xl text-ink md:text-4xl">
        Nuevo producto
      </h1>
      <ProductForm />
    </div>
  );
}
