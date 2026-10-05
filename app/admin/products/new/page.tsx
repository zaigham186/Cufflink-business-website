import ProductForm from "@/backend/admin-components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-champagne-brass/20">
        <h1 className="text-3xl font-display text-porcelain tracking-tight">
          Add New Product
        </h1>
        <p className="text-xs text-porcelain/60 uppercase tracking-widest font-sans mt-1">
          Catalog addition with automatic slug and SKU generation
        </p>
      </div>

      <ProductForm />
    </div>
  );
}
