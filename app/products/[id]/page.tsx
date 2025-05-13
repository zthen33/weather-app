import { Button } from "@/components/ui/button"
import { getProductById, getRelatedProducts } from "@/lib/products"
import { Star } from "lucide-react"
import { notFound } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-gray-100 p-4">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="mx-auto h-[400px] w-full object-contain"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>
          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
          <p className="text-gray-700">{product.description}</p>
          <div className="space-y-2">
            <h3 className="font-semibold">Available Colors:</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <div key={color} className="h-8 w-8 rounded-full border" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <div className="pt-4">
            <Button size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold">Product Details</h2>
        <div className="rounded-lg border p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Features</h3>
              <ul className="list-inside list-disc space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2">
                    <span className="font-medium">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  )
}
