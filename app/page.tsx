export default function Home() {
  return (
    <main className="mx-auto flex min-h-full max-w-2xl flex-col gap-8 px-4 py-10">
      <header className="text-center">
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          Restaurant name
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Menu</h1>
      </header>

      <nav
        className="flex flex-wrap justify-center gap-2"
        aria-label="Categories"
      >
        {["Starters", "Mains", "Desserts", "Drinks"].map((category) => (
          <button
            key={category}
            type="button"
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm"
          >
            {category}
          </button>
        ))}
      </nav>

      <section className="flex flex-col gap-6" aria-label="Menu items">
        <article className="flex items-baseline justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <h2 className="font-medium">Dish name</h2>
            <p className="mt-1 text-sm text-zinc-500">Short description</p>
          </div>
          <p className="shrink-0 font-medium">0.00</p>
        </article>
      </section>
    </main>
  );
}
