export const ROUTES = {
  // Storefront
  HOME: "/",
  ABOUT: "/about",
  SHOP: "/shop",
  SHOP_CATEGORY: (category: string) => `/shop/${category}`,
  PRODUCT: (slug: string) => `/product/${slug}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  CONTACT: "/contact",

  // Admin
  ADMIN: "/admin",
  ADMIN_LOGIN: "/admin/login",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_PRODUCTS_NEW: "/admin/products/new",
  ADMIN_PRODUCT_EDIT: (id: string) => `/admin/products/${id}/edit`,
  ADMIN_COLLECTIONS: "/admin/collections",
  ADMIN_CONTENT: "/admin/content",
  ADMIN_ORDERS: "/admin/orders",

  // API
  API: {
    AUTH_LOGIN: "/api/auth/login",
    AUTH_LOGOUT: "/api/auth/logout",
    LEGACY_ADMIN_LOGIN: "/api/admin-login",
    PRODUCTS: "/api/products",
    PRODUCT_BY_ID: (id: string) => `/api/products/${id}`,
    ORDERS: "/api/orders",
    ORDER_BY_ID: (id: string) => `/api/orders/${id}`,
    COLLECTIONS: "/api/collections",
    CONTENT: "/api/content",
  },
} as const;
