import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

export function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="line-clamp-1 font-medium">{product.name}</h3>
              <div className="mt-2 flex items-center">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-xs text-muted-foreground">({product.reviews})</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
              <span className="font-bold">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
