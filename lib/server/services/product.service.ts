import { productRepository } from "@/lib/server/repositories/product.repository";
import type {
  Product,
  CollectionCategory,
  CollectionSlug,
  StockStatus,
  CategoryInfo,
} from "@/types/product";

export const CATEGORIES: CategoryInfo[] = [
  {
    name: "Classical",
    slug: "classical",
    description: "Essential formal cufflinks with a clean finish and timeless proportions.",
    priceRange: "Rs. 700–800",
  },
  {
    name: "Signature",
    slug: "signature",
    description: "Refined details, rich mineral enamel, and subtle surface textures.",
    priceRange: "Rs. 1,000–1,400",
  },
  {
    name: "Premium",
    slug: "premium",
    description: "Artisanal pieces featuring fine engraving, crystal pavé, and stone detailing.",
    priceRange: "Rs. 1,500–2,500",
  },
];

export class ProductService {
  getCategories(): CategoryInfo[] {
    return CATEGORIES;
  }

  async getAllProducts(sortOption?: any): Promise<Product[]> {
    return productRepository.findAll({}, sortOption || { createdAt: -1 });
  }

  async queryProducts(params: {
    category?: string | null;
    featured?: string | null;
    search?: string | null;
    sort?: string | null;
  }): Promise<Product[]> {
    const query: Record<string, any> = {};
    if (params.category && params.category !== "all") query.categorySlug = params.category.toLowerCase().trim();
    if (params.featured === "true") query.featured = true;
    if (params.search) {
      query.$or = [
        { name: { $regex: params.search, $options: "i" } },
        { material: { $regex: params.search, $options: "i" } },
        { color: { $regex: params.search, $options: "i" } },
        { finish: { $regex: params.search, $options: "i" } },
        { description: { $regex: params.search, $options: "i" } },
      ];
    }

    const sortMap: Record<string, Record<string, 1 | -1>> = {
      newest: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      name: { name: 1 },
    };

    const sortOption = (params.sort && sortMap[params.sort]) || { createdAt: -1 };
    return productRepository.findAll(query, sortOption);
  }

  async getFeaturedProducts(limit = 6): Promise<Product[]> {
    return productRepository.findFeatured(limit);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return productRepository.findBySlug(slug);
  }

  async getProductById(id: string): Promise<Product | null> {
    return productRepository.findById(id);
  }

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    return productRepository.findByCategory(categorySlug);
  }

  async searchProducts(query: string): Promise<Product[]> {
    return productRepository.search(query);
  }

  async filterProducts(filters: {
    category?: string;
    color?: string;
    finish?: string;
    pattern?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> {
    return productRepository.filter(filters);
  }

  async createProduct(data: any): Promise<{ product?: Product; error?: string; status?: number }> {
    const exists = await productRepository.checkExisting(data.slug, data.sku);
    if (exists) {
      return { error: "A product with this Slug or SKU already exists", status: 409 };
    }

    const stockCount = typeof data.stockCount === "number" ? data.stockCount : 0;
    const stockStatus: StockStatus =
      data.stock || (stockCount === 0 ? "out-of-stock" : stockCount <= 5 ? "low-stock" : "in-stock");

    const created = await productRepository.create({
      ...data,
      stock: stockStatus,
      stockCount,
    });

    return { product: created, status: 201 };
  }

  async updateProduct(id: string, data: any): Promise<{ product?: Product; error?: string; status?: number }> {
    const updateData: any = { ...data };
    if (typeof updateData.stockCount === "number" && !updateData.stock) {
      updateData.stock =
        updateData.stockCount === 0
          ? "out-of-stock"
          : updateData.stockCount <= 5
          ? "low-stock"
          : "in-stock";
    }

    const updated = await productRepository.update(id, updateData);
    if (!updated) {
      return { error: "Product not found", status: 404 };
    }

    return { product: updated, status: 200 };
  }

  async deleteProduct(id: string): Promise<boolean> {
    return productRepository.delete(id);
  }

  async count(query: Record<string, any> = {}): Promise<number> {
    return productRepository.count(query);
  }
}

export const productService = new ProductService();

// Standalone exports for storefront backward-compatibility
export const getAllProducts = (sort?: any) => productService.getAllProducts(sort);
export const getFeaturedProducts = (limit?: number) => productService.getFeaturedProducts(limit);
export const getProductBySlug = (slug: string) => productService.getProductBySlug(slug);
export const getProductsByCategory = (cat: string) => productService.getProductsByCategory(cat);
export const searchProducts = (q: string) => productService.searchProducts(q);
export const filterProducts = (f: any) => productService.filterProducts(f);
export const categories = CATEGORIES;
