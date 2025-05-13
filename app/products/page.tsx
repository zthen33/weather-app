import { ProductGrid } from "@/components/product-grid"
import { SearchBar } from "@/components/search-bar"
import { getProducts } from "@/lib/products"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { query?: string; category?: string }
}) {
  const query = searchParams.query || ""
  const category = searchParams.category || ""
  const products = await getProducts(query, category)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500 dark:text-gray-400">Browse our collection of products</p>
        </div>
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">Categories</h2>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-primary hover:underline">
                  All Products
                </a>
              </li>
              <li>
                <a href="/products?category=electronics" className="hover:text-primary hover:underline">
                  Electronics
                </a>
              </li>
              <li>
                <a href="/products?category=clothing" className="hover:text-primary hover:underline">
                  Clothing
                </a>
              </li>
              <li>
                <a href="/products?category=home" className="hover:text-primary hover:underline">
                  Home & Kitchen
                </a>
              </li>
              <li>
                <a href="/products?category=books" className="hover:text-primary hover:underline">
                  Books
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">Price Range</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <input id="price-1" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="price-1" className="ml-2 text-sm">
                  Under $25
                </label>
              </div>
              <div className="flex items-center">
                <input id="price-2" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="price-2" className="ml-2 text-sm">
                  $25 to $50
                </label>
              </div>
              <div className="flex items-center">
                <input id="price-3" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="price-3" className="ml-2 text-sm">
                  $50 to $100
                </label>
              </div>
              <div className="flex items-center">
                <input id="price-4" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="price-4" className="ml-2 text-sm">
                  $100 to $200
                </label>
              </div>
              <div className="flex items-center">
                <input id="price-5" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="price-5" className="ml-2 text-sm">
                  $200 & Above
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="flex h-40 items-center justify-center rounded-lg border">
              <p className="text-gray-500">No products found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
