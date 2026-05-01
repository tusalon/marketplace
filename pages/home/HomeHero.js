function HomeHero({ initialParams }) {
  try {
    const businesses = MockData.listBusinesses();
    const totalBusinesses = businesses.length;
    const totalServices = businesses.reduce((sum, business) => {
      const count = (business.categoriasCatalogo || []).reduce((innerSum, section) => innerSum + (section.items?.length || 0), 0);
      return sum + count;
    }, 0);
    const showcase = businesses.slice(0, 5);
    const categories = Array.from(new Set(businesses.map((business) => business.categoria).filter(Boolean))).slice(0, 8);

    return (
      <section className="pt-6 md:pt-10" data-name="home-hero" data-file="pages/home/HomeHero.js">
        <div className="container-rr" data-name="home-hero-inner" data-file="pages/home/HomeHero.js">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 lg:gap-10 items-center" data-name="home-hero-grid" data-file="pages/home/HomeHero.js">
            <div data-name="home-hero-copy" data-file="pages/home/HomeHero.js">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-color)]" data-name="hero-kicker" data-file="pages/home/HomeHero.js">
                RservasRoma Marketplace
              </p>

              <h1 className="mt-4 text-5xl md:text-7xl font-semibold tracking-tight leading-[0.96]" data-name="hero-title" data-file="pages/home/HomeHero.js">
                Tu negocio puede verse así.
              </h1>
              <p className="mt-5 text-base md:text-lg text-[var(--text-muted)] leading-relaxed max-w-[680px]" data-name="hero-sub" data-file="pages/home/HomeHero.js">
                Un escaparate premium para salones, manicuristas, barberos y especialistas. Clientes ven servicios, precios, reseñas y reservan directo.
              </p>

              <div className="mt-8 max-w-[820px]" data-name="hero-search" data-file="pages/home/HomeHero.js">
                <SearchBar
                  initialServicio={initialParams?.servicio || ''}
                  initialUbicacion={initialParams?.ubicacion || ''}
                  compact={false}
                  data-name="hero-searchbar"
                  data-file="pages/home/HomeHero.js"
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3" data-name="hero-actions" data-file="pages/home/HomeHero.js">
                <button className="btn-rr btn-primary-rr flex items-center justify-center gap-2" onClick={() => Navigation.goToSearch('', '')} data-name="hero-explore" data-file="pages/home/HomeHero.js">
                  Explorar negocios
                  <div className="icon-arrow-right text-xl text-white" data-name="hero-explore-i" data-file="pages/home/HomeHero.js"></div>
                </button>
                <a className="btn-rr btn-ghost-rr flex items-center justify-center gap-2" href="https://wa.me/5353066647?text=Hola,%20quiero%20listar%20mi%20negocio%20en%20RservasRoma" target="_blank" rel="noreferrer" data-name="hero-list" data-file="pages/home/HomeHero.js">
                  Quiero listar mi negocio
                  <div className="icon-sparkles text-xl text-[var(--primary-color)]" data-name="hero-list-i" data-file="pages/home/HomeHero.js"></div>
                </a>
              </div>

              <div className="mt-7 grid grid-cols-3 max-w-[560px] border border-[var(--border)] rounded-lg overflow-hidden bg-white" data-name="hero-stats" data-file="pages/home/HomeHero.js">
                <div className="p-4 border-r border-[var(--border)]" data-name="stat-businesses" data-file="pages/home/HomeHero.js">
                  <p className="text-xl md:text-2xl font-semibold" data-name="stat-businesses-value" data-file="pages/home/HomeHero.js">{totalBusinesses}</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1" data-name="stat-businesses-label" data-file="pages/home/HomeHero.js">negocios</p>
                </div>
                <div className="p-4 border-r border-[var(--border)]" data-name="stat-services" data-file="pages/home/HomeHero.js">
                  <p className="text-xl md:text-2xl font-semibold" data-name="stat-services-value" data-file="pages/home/HomeHero.js">{totalServices}</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1" data-name="stat-services-label" data-file="pages/home/HomeHero.js">servicios</p>
                </div>
                <div className="p-4" data-name="stat-booking" data-file="pages/home/HomeHero.js">
                  <p className="text-xl md:text-2xl font-semibold" data-name="stat-booking-value">WA</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1" data-name="stat-booking-label" data-file="pages/home/HomeHero.js">reserva</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[460px] lg:min-h-[560px]" data-name="home-hero-showcase" data-file="pages/home/HomeHero.js">
              {showcase.map((business, index) => {
                const initials = String(business.nombre || 'N').trim().slice(0, 2).toUpperCase();
                const positions = [
                  'left-0 top-8 rotate-[-4deg] z-[4]',
                  'right-0 top-0 rotate-[5deg] z-[3]',
                  'left-12 top-[190px] rotate-[3deg] z-[5]',
                  'right-8 top-[300px] rotate-[-3deg] z-[2]',
                  'left-2 bottom-0 rotate-[2deg] z-[1]'
                ];
                return (
                  <button
                    key={business.id}
                    className={`absolute w-[250px] md:w-[280px] surface-rr overflow-hidden text-left shadow-[0_24px_80px_rgba(11,18,32,0.14)] hover:-translate-y-2 hover:rotate-0 transition-transform duration-300 ${positions[index] || positions[0]}`}
                    onClick={() => Navigation.goToBusiness(business.id)}
                    data-name="hero-showcase-card"
                    data-file="pages/home/HomeHero.js"
                  >
                    <div className="h-28 bg-[#F9FAFB] flex items-center justify-center p-7" data-name="hero-showcase-media" data-file="pages/home/HomeHero.js">
                      {business.logoUrl ? (
                        <img src={business.logoUrl} alt={`Logo de ${business.nombre}`} className="max-w-full max-h-full object-contain" data-name="hero-showcase-logo" data-file="pages/home/HomeHero.js" />
                      ) : (
                        <div className="text-3xl font-semibold text-[var(--primary-color)]" data-name="hero-showcase-initials" data-file="pages/home/HomeHero.js">{initials}</div>
                      )}
                    </div>
                    <div className="p-4" data-name="hero-showcase-body" data-file="pages/home/HomeHero.js">
                      <p className="text-sm font-semibold truncate" data-name="hero-showcase-name" data-file="pages/home/HomeHero.js">{business.nombre}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-1 truncate" data-name="hero-showcase-meta" data-file="pages/home/HomeHero.js">{business.categoria} · {business.ubicacion?.zona}</p>
                      <div className="mt-3 flex items-center justify-between gap-3" data-name="hero-showcase-bottom" data-file="pages/home/HomeHero.js">
                        <span className="text-xs text-[var(--text-muted)]" data-name="hero-showcase-services" data-file="pages/home/HomeHero.js">{(business.categoriasCatalogo?.[0]?.items || []).length} servicios</span>
                        <span className="text-xs font-semibold text-[var(--primary-color)]" data-name="hero-showcase-action" data-file="pages/home/HomeHero.js">Ver perfil</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2" data-name="hero-categories" data-file="pages/home/HomeHero.js">
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
      </section>
    );
  } catch (error) {
    console.error('HomeHero component error:', error);
    return null;
  }
}
