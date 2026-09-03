"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/lib/products";
import Button from "@/components/ui/Button";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0],
        material: product.material,
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center space-x-4">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantity:
        </label>
        <div className="flex items-center border border-antique-brass">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={isOutOfStock}
            className="px-4 py-2 hover:bg-ink-green hover:text-khaddar-ivory transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Math.min(
                  product.stock,
                  Math.max(1, parseInt(e.target.value) || 1)
                )
              )
            }
            disabled={isOutOfStock}
            className="w-16 text-center border-x border-antique-brass py-2 focus:outline-none focus:ring-1 focus:ring-ink-green disabled:opacity-30 disabled:cursor-not-allowed bg-transparent"
          />
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={isOutOfStock}
            className="px-4 py-2 hover:bg-ink-green hover:text-khaddar-ivory transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        {product.stock < 5 && product.stock > 0 && (
          <span className="text-sm text-maroon">
            Only {product.stock} left in stock
          </span>
        )}
      </div>

      {/* Add to cart button */}
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        variant="primary"
        className="w-full sm:w-auto"
      >
        {isOutOfStock
          ? "Out of stock"
          : added
          ? "Added to cart ✓"
          : "Add to cart"}
      </Button>

      {/* Stock status */}
      {isOutOfStock && (
        <p className="text-sm text-maroon">
          This item is currently out of stock. Contact us for availability.
        </p>
      )}
    </div>
  );
}
