function HomeHero({ initialParams }) {
  try {
    const businesses = MockData.listBusinesses();
    const totalBusinesses = businesses.length;
    const totalServices = businesses.reduce((sum, business) => {
      const count = (business.categoriasCatalogo || []).reduce((innerSum, section) => innerSum + (section.items?.length || 0), 0);
      return sum + count;
    }, 0);
    const categories = Array.from(new Set(businesses.map((business) => business.categoria).filter(Boolean))).slice(0, 7);

    return (
      <section className="pt-8 md:pt-14" data-name="home-hero" data-file="pages/home/HomeHero.js">
        <div className="container-rr" data-name="home-hero-inner" data-file="pages/home/HomeHero.js">
          <div className="max-w-[980px] mx-auto text-center" data-name="home-hero-content" data-file="pages/home/HomeHero.js">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-color)]" data-name="hero-kicker" data-file="pages/home/HomeHero.js">
              Marketplace de belleza en Cuba
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-balance leading-[1.02]" data-name="hero-title" data-file="pages/home/HomeHero.js">
              Reserva servicios de belleza cerca de ti
            </h1>
            <p className="mt-4 text-base md:text-lg text-[var(--text-muted)] leading-relaxed max-w-[720px] mx-auto" data-name="hero-sub" data-file="pages/home/HomeHero.js">
              Encuentra salones, manicuristas, barberos y especialistas disponibles. Compara servicios, precios y contacta por WhatsApp en segundos.
            </p>

            <div className="mt-8" data-name="hero-search" data-file="pages/home/HomeHero.js">
              <SearchBar
                initialServicio={initialParams?.servicio || ''}
                initialUbicacion={initialParams?.ubicacion || ''}
                compact={false}
                data-name="hero-searchbar"
                data-file="pages/home/HomeHero.js"
              />
            </div>

            <div className="mt-7 grid grid-cols-3 max-w-[560px] mx-auto border border-[var(--border)] rounded-lg overflow-hidden bg-white" data-name="hero-stats" data-file="pages/home/HomeHero.js">
              <div className="p-4 border-r border-[var(--border)]" data-name="stat-businesses" data-file="pages/home/HomeHero.js">
                <p className="text-xl md:text-2xl font-semibold" data-name="stat-businesses-value" data-file="pages/home/HomeHero.js">{totalBusinesses}</p>
                <p className="text-[11px] text-[var(--text-muted)] mt-1" data-name="stat-businesses-label" data-file="pages/home/HomeHero.js">negocios</p>
              </div>
              <div className="p-4 border-r border-[var(--border)]" data-name="stat-services" data-file="pages/home/HomeHero.js">
                <p className="text-xl md:text-2xl font-semibold" data-name="stat-services-value" data-file="pages/home/HomeHero.js">{totalServices}</p>
                <p className="text-[11px] text-[var(--text-muted)] mt-1" data-name="stat-services-label" data-file="pages/home/HomeHero.js">servicios</p>
              </div>
              <div className="p-4" data-name="stat-booking" data-file="pages/home/HomeHero.js">
                <p className="text-xl md:text-2xl font-semibold" data-name="stat-booking-value" data-file="pages/home/HomeHero.js">WA</p>
                <p className="text-[11px] text-[var(--text-muted)] mt-1" data-name="stat-booking-label" data-file="pages/home/HomeHero.js">reserva directa</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2" data-name="hero-categories" data-file="pages/home/HomeHero.js">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border border-[var(--border)] bg-white text-sm hover:border-[rgba(216,27,96,0.35)] hover:text-[var(--primary-color)] transition-colors"
                  onClick={() => Navigation.goToSearch(category, '')}
                  data-name="hero-category"
                  data-file="pages/home/HomeHero.js"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('HomeHero component error:', error);
    return null;
  }
}
