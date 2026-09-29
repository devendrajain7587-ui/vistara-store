"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  badge: string;
  image: string;
  affiliateUrl: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Earbuds",
    category: "Electronics",
    price: 699,
    mrp: 1499,
    rating: 4.8,
    reviews: 128,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "https://dl.flipkart.com/s/C_eDJBNNNN",
  },
  {
    id: 2,
    name: "Smart LED Watch",
    category: "Electronics",
    price: 899,
    mrp: 1999,
    rating: 4.7,
    reviews: 96,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "#",
  },
  {
    id: 3,
    name: "Ladies Handbag",
    category: "Fashion",
    price: 599,
    mrp: 1299,
    rating: 4.6,
    reviews: 74,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "#",
  },
  {
    id: 4,
    name: "Stylish Sunglasses",
    category: "Fashion",
    price: 349,
    mrp: 899,
    rating: 4.7,
    reviews: 61,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "#",
  },
  {
    id: 5,
    name: "Running Sports Shoes",
    category: "Footwear",
    price: 999,
    mrp: 1999,
    rating: 4.8,
    reviews: 143,
    badge: "Hot Deal",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "#",
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 749,
    mrp: 1499,
    rating: 4.7,
    reviews: 89,
    badge: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
    affiliateUrl: "#",
  },
];

const categories = [
  { name: "Electronics", icon: "🎧" },
  { name: "Fashion", icon: "👕" },
  { name: "Footwear", icon: "👟" },
  { name: "Beauty", icon: "💄" },
  { name: "Home", icon: "🏠" },
  { name: "Accessories", icon: "👜" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  function addToCart(id: number) {
    setCart((current) => [...current, id]);
  }

  function scrollToProducts() {
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" });

    setMenuOpen(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6">

          {/* LOGO */}
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearch("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="min-w-fit text-left"
          >
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl">
              VISTAARA
            </div>

            <div className="text-[10px] font-semibold tracking-widest text-slate-500 sm:text-xs">
              SMART SHOPPING
            </div>
          </button>

          {/* DESKTOP SEARCH */}
          <div className="relative mx-auto hidden w-full max-w-2xl md:block">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 pr-12 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />

            <span className="absolute right-4 top-3 text-xl">
              🔍
            </span>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-2 lg:flex">
            <button
              onClick={scrollToProducts}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-violet-50 hover:text-violet-600"
            >
              Products
            </button>

            <button
              onClick={() => {
                setSelectedCategory("All");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-violet-50 hover:text-violet-600"
            >
              Categories
            </button>
          </nav>

          {/* CART */}
          <button
            onClick={() =>
              alert(`Your cart has ${cart.length} item(s).`)
            }
            className="relative rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
          >
            🛒
            <span className="ml-1 hidden sm:inline">Cart</span>

            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {cart.length}
              </span>
            )}
          </button>

          {/* MOBILE MENU */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-slate-200 px-3 py-3 text-xl lg:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE SEARCH */}
        <div className="px-4 pb-4 md:hidden">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 pr-12 outline-none focus:border-violet-500 focus:bg-white"
            />

            <span className="absolute right-4 top-3 text-xl">
              🔍
            </span>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t bg-white px-4 py-4 lg:hidden">
            <div className="grid gap-2">
              <button
                onClick={scrollToProducts}
                className="rounded-xl bg-slate-50 px-4 py-3 text-left font-semibold hover:bg-violet-50 hover:text-violet-600"
              >
                🛍️ Products
              </button>

              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-xl bg-slate-50 px-4 py-3 text-left font-semibold hover:bg-violet-50 hover:text-violet-600"
              >
                📂 Categories
              </button>

              <button
                onClick={() =>
                  alert(`Your cart has ${cart.length} item(s).`)
                }
                className="rounded-xl bg-slate-50 px-4 py-3 text-left font-semibold hover:bg-violet-50 hover:text-violet-600"
              >
                🛒 Cart ({cart.length})
              </button>

              <button
                onClick={() => alert("Account section coming soon.")}
                className="rounded-xl bg-slate-50 px-4 py-3 text-left font-semibold hover:bg-violet-50 hover:text-violet-600"
              >
                👤 Account
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 px-6 py-14 text-white shadow-2xl sm:px-10 md:px-14 md:py-20">

          <div className="relative z-10 max-w-2xl">

            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              🔥 Today's Best Deals
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl md:text-7xl">
              Shop Smart.
              <br />
              Save More.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg md:text-xl">
              Discover trending products, attractive prices and
              convenient shopping — all in one place.
            </p>

            <button
              onClick={scrollToProducts}
              className="mt-8 rounded-2xl bg-white px-7 py-4 font-black text-violet-700 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              Shop Now →
            </button>
          </div>

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 right-10 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">

        <div className="mb-7">
          <p className="text-sm font-black tracking-widest text-violet-600">
            EXPLORE
          </p>

          <h2 className="mt-1 text-3xl font-black sm:text-4xl">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">

          {/* ALL */}
          <button
            onClick={() => setSelectedCategory("All")}
            className={`rounded-2xl border p-4 transition hover:-translate-y-1 ${
              selectedCategory === "All"
                ? "border-violet-500 bg-violet-600 text-white shadow-lg"
                : "border-slate-200 bg-white hover:border-violet-300"
            }`}
          >
            <div className="text-3xl">🛍️</div>
            <div className="mt-2 text-sm font-bold">All</div>
          </button>

          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`rounded-2xl border p-4 transition hover:-translate-y-1 ${
                selectedCategory === category.name
                  ? "border-violet-500 bg-violet-600 text-white shadow-lg"
                  : "border-slate-200 bg-white hover:border-violet-300"
              }`}
            >
              <div className="text-3xl">{category.icon}</div>

              <div className="mt-2 text-xs font-bold sm:text-sm">
                {category.name}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section
        id="products"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6"
      >

        <div className="mb-7 flex items-end justify-between">

          <div>
            <p className="text-sm font-black tracking-widest text-violet-600">
              TRENDING NOW
            </p>

            <h2 className="mt-1 text-3xl font-black sm:text-4xl">
              Popular Products
            </h2>
          </div>

          <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-500 shadow-sm sm:block">
            {filteredProducts.length} products
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white p-16 text-center shadow-sm">
            <div className="text-5xl">🔎</div>

            <h3 className="mt-4 text-xl font-bold">
              No products found
            </h3>

            <p className="mt-2 text-slate-500">
              Try another product or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => {

              const discount = Math.round(
                ((product.mrp - product.price) / product.mrp) * 100
              );

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >

                  {/* IMAGE */}
                  <div className="relative h-64 overflow-hidden bg-slate-100">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1.5 text-xs font-black text-white shadow-lg">
                      {product.badge}
                    </span>

                    <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-black text-white shadow-lg">
                      {discount}% OFF
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    <p className="text-xs font-black uppercase tracking-wider text-violet-600">
                      {product.category}
                    </p>

                    <h3 className="mt-1 line-clamp-2 text-lg font-black">
                      {product.name}
                    </h3>

                    {/* RATING */}
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="font-bold text-amber-500">
                        ⭐ {product.rating}
                      </span>

                      <span className="text-slate-400">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* PRICE */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-2xl font-black">
                        ₹{product.price}
                      </span>

                      <span className="text-sm text-slate-400 line-through">
                        ₹{product.mrp}
                      </span>
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-5 grid grid-cols-2 gap-2">

                      <button
                        onClick={() => addToCart(product.id)}
                        className="rounded-xl bg-slate-950 py-3 font-black text-white transition hover:bg-violet-600"
                      >
                        🛒 Cart
                      </button>

                      {product.affiliateUrl !== "#" ? (
                        <a
                          href={product.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl bg-orange-500 py-3 text-center font-black text-white transition hover:bg-orange-600"
                        >
                          Buy on Flipkart
                        </a>
                      ) : (
                        <button
                          onClick={() =>
                            alert(
                              "Affiliate link is not added for this product yet."
                            )
                          }
                          className="rounded-xl bg-slate-200 py-3 text-center font-black text-slate-500"
                        >
                          Coming Soon
                        </button>
                      )}

                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-3">

          <div className="rounded-3xl bg-slate-50 p-7">
            <div className="text-4xl">🚚</div>

            <h3 className="mt-4 text-xl font-black">
              Easy Shopping
            </h3>

            <p className="mt-2 leading-6 text-slate-500">
              Find useful products quickly from our curated collection.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-7">
            <div className="text-4xl">💰</div>

            <h3 className="mt-4 text-xl font-black">
              Great Deals
            </h3>

            <p className="mt-2 leading-6 text-slate-500">
              Discover attractive prices and selected offers.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-7">
            <div className="text-4xl">🔒</div>

            <h3 className="mt-4 text-xl font-black">
              Trusted Shopping
            </h3>

            <p className="mt-2 leading-6 text-slate-500">
              Product purchases are completed on the linked shopping platform.
            </p>
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-white">

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">

          <div className="grid gap-10 md:grid-cols-3">

            <div>
              <div className="text-3xl font-black text-violet-400">
                VISTAARA
              </div>

              <p className="mt-3 max-w-sm leading-6 text-slate-400">
                Smart shopping, useful products and attractive deals —
                all in one place.
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                Quick Links
              </h3>

              <div className="mt-4 grid gap-3 text-sm text-slate-400">
                <button
                  onClick={scrollToProducts}
                  className="text-left hover:text-white"
                >
                  Products
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-left hover:text-white"
                >
                  Categories
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold">
                Vistaara Store
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Product information and affiliate shopping links.
              </p>
            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">
            © 2026 Vistaara Store. All rights reserved.
          </div>

        </div>
      </footer>

    </main>
  );
}