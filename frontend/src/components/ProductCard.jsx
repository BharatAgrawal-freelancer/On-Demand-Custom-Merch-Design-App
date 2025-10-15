import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product._id}`} className="pb-card p-3 hover:-translate-y-1 transition" data-aos="fade-up">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-800 flex items-center justify-center">
        {product.images?.[0] ? (
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={`/placeholder.svg?height=300&width=400&query=product+image`} alt={product.name} />
        )}
      </div>
      <div className="mt-3 flex items-start justify-between">
        <div>
          <div className="text-xs text-zinc-400">{product.category || "Catalog"}</div>
          <div className="font-semibold">{product.name}</div>
        </div>
        <div className="text-unakite font-semibold">from ₹{product.variants?.[0]?.basePrice || 299}</div>
      </div>
    </Link>
  )
}
