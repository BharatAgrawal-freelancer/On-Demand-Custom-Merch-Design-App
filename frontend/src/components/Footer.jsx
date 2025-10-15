export default function Footer() {
  return (
    <footer className="mt-12 border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src="/assets/logo.png" alt="brand" className="w-8 h-8 rounded-lg" />
            <span className="font-semibold">PrintBazaar</span>
          </div>
          <p className="text-zinc-400">Custom merch, on-demand. Sustainable and expressive by design.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Links</h4>
          <ul className="space-y-2 text-zinc-400">
            <li>
              <a href="/products" className="hover:text-zima">
                Products
              </a>
            </li>
            <li>
              <a href="/community" className="hover:text-zima">
                Community
              </a>
            </li>
            <li>
              <a href="/trending" className="hover:text-zima">
                Trending
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-zinc-400">
            <li>
              <a href="#" className="hover:text-zima">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zima">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zima">
                Returns
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Follow</h4>
          <div className="flex items-center gap-4 text-zinc-400">
            <i className="fa-brands fa-instagram hover:text-zima" aria-hidden />
            <i className="fa-brands fa-x-twitter hover:text-zima" aria-hidden />
            <i className="fa-brands fa-youtube hover:text-zima" aria-hidden />
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-800 text-xs text-zinc-500 py-4 text-center">
        © {new Date().getFullYear()} PrintBazaar. All rights reserved.
      </div>
    </footer>
  )
}
