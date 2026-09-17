"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/lib/products";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0] || "/products/ivory-pave-gold-1.jpg",
        material: product.material,
      });
    }

    setAdded(true);
    openDrawer();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-6">
        <label
          htmlFor="quantity"
          className="text-xs tracking-wider uppercase font-medium text-warm-charcoal/70"
        >
          Quantity
        </label>
        <div className="flex items-center border border-warm-charcoal/30">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={isOutOfStock || quantity <= 1}
            className="w-9 h-9 flex items-center justify-center text-warm-charcoal hover:bg-obsidian hover:text-porcelain transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-12 text-center text-sm font-medium text-warm-charcoal">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              setQuantity((prev) => Math.min(product.stock, prev + 1))
            }
            disabled={isOutOfStock || quantity >= product.stock}
            className="w-9 h-9 flex items-center justify-center text-warm-charcoal hover:bg-obsidian hover:text-porcelain transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart CTA */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className="w-full py-4 px-8 bg-obsidian text-porcelain text-sm font-medium border border-obsidian hover:bg-obsidian/90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isOutOfStock
          ? "Out of stock"
          : added
          ? "Added to cart"
          : "Add to cart"}
      </button>
    </div>
  );
}
