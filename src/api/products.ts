// src/api/products.ts
const BASE_URL = import.meta.env.VITE_API_URL;

export interface Certificate {
  id: number;
  name: string;
  url: string;         // backend-dən gələn Cloudinary URL
}

export interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  standards: string[];
  specifications: Record<string, string>;
  certificates: Certificate[];
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return res.json();
}
