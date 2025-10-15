import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="text-zinc-400 mt-3">We couldn’t find that page.</p>
      <Link to="/" className="btn btn-primary mt-6">
        Go Home
      </Link>
    </div>
  )
}
