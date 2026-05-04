function BusinessPanelPage() {
  try {
    const params = new URLSearchParams(window.location.search);
    const plan = (params.get('plan') || 'vip').toLowerCase();
    const isVip = plan !== 'basico';

    const modules = [
      { title: 'Perfil', desc: 'Logo, portada, descripcion y redes.', icon: 'icon-store', plans: ['vip', 'basico'], status: 'Listo para conectar' },
      { title: 'Servicios', desc: 'Servicios con precios y duracion.', icon: 'icon-list', plans: ['vip'], status: 'VIP' },
      { title: 'Productos', desc: 'Mini tienda con fotos, stock y precios.', icon: 'icon-shopping-bag', plans: ['vip', 'basico'], status: 'Tienda' },
      { title: 'Cursos', desc: 'Cursos, talleres, modalidad y precio.', icon: 'icon-graduation-cap', plans: ['vip', 'basico'], status: 'Cursos' },
      { title: 'Ubicacion', desc: 'Provincia, zona y direccion publica.', icon: 'icon-map-pin', plans: ['vip', 'basico'], status: 'Mapa' },
      { title: 'Pedidos', desc: 'Pedidos enviados por WhatsApp.', icon: 'icon-receipt-text', plans: ['vip', 'basico'], status: 'Proximo' },
      { title: 'Resenas', desc: 'Valoraciones y comentarios de clientes.', icon: 'icon-star', plans: ['vip'], status: 'VIP' },
      { title: 'Estadisticas', desc: 'Vistas, reservas y rendimiento.', icon: 'icon-chart-no-axes-column', plans: ['vip'], status: 'VIP' }
    ];

    const canUse = (module) => module.plans.includes(isVip ? 'vip' : 'basico');

    return (
      <div className="container-rr pt-6 md:pt-10" data-name="business-panel-page" data-file="pages/panel/BusinessPanelPage.js">
        <section className="surface-rr p-5 md:p-7" data-name="panel-hero" data-file="pages/panel/BusinessPanelPage.js">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5" data-name="panel-hero-row" data-file="pages/panel/BusinessPanelPage.js">
            <div data-name="panel-copy" data-file="pages/panel/BusinessPanelPage.js">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-color)]" data-name="panel-kicker" data-file="pages/panel/BusinessPanelPage.js">
                Panel de negocio
              </p>
              <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight" data-name="panel-title" data-file="pages/panel/BusinessPanelPage.js">
                Gestion de contenido
              </h1>
              <p className="mt-3 text-sm md:text-base text-[var(--text-muted)] max-w-[720px] leading-relaxed" data-name="panel-subtitle" data-file="pages/panel/BusinessPanelPage.js">
                Estructura inicial para que negocios VIP y basicos organicen perfil, tienda, cursos y ubicacion.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2" data-name="panel-actions" data-file="pages/panel/BusinessPanelPage.js">
              <span className="chip-rr px-3 py-2 text-xs text-[var(--text-muted)]" data-name="plan-chip" data-file="pages/panel/BusinessPanelPage.js">
                Plan: {isVip ? 'VIP' : 'Basico'}
              </span>
              <a className="btn-rr btn-ghost-rr flex items-center justify-center gap-2" href="login.html" data-name="logout-link" data-file="pages/panel/BusinessPanelPage.js">
                Salir
              </a>
            </div>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4" data-name="panel-modules" data-file="pages/panel/BusinessPanelPage.js">
          {modules.map((module) => {
            const enabled = canUse(module);
            return (
              <button
                key={module.title}
                className={`surface-rr p-5 text-left transition-all ${enabled ? 'hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(11,18,32,0.08)]' : 'opacity-55'}`}
                disabled={!enabled}
                data-name="panel-module"
                data-file="pages/panel/BusinessPanelPage.js"
              >
                <div className="flex items-start justify-between gap-3" data-name="module-top" data-file="pages/panel/BusinessPanelPage.js">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[var(--secondary-color)]" data-name="module-icon-wrap" data-file="pages/panel/BusinessPanelPage.js">
                    <div className={`${module.icon} text-xl text-[var(--primary-color)]`} data-name="module-icon" data-file="pages/panel/BusinessPanelPage.js"></div>
                  </div>
                  <span className="chip-rr px-2.5 py-1 text-[11px] text-[var(--text-muted)]" data-name="module-status" data-file="pages/panel/BusinessPanelPage.js">
                    {enabled ? module.status : 'No incluido'}
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold" data-name="module-title" data-file="pages/panel/BusinessPanelPage.js">{module.title}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed" data-name="module-desc" data-file="pages/panel/BusinessPanelPage.js">{module.desc}</p>
              </button>
            );
          })}
        </section>

        <section className="mt-5 surface-rr p-5 md:p-6" data-name="panel-next" data-file="pages/panel/BusinessPanelPage.js">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" data-name="panel-next-row" data-file="pages/panel/BusinessPanelPage.js">
            <div data-name="panel-next-copy" data-file="pages/panel/BusinessPanelPage.js">
              <p className="text-sm font-semibold" data-name="next-title" data-file="pages/panel/BusinessPanelPage.js">Siguiente conexion</p>
              <p className="text-sm text-[var(--text-muted)] mt-1" data-name="next-desc" data-file="pages/panel/BusinessPanelPage.js">
                Conectar Supabase Auth, asociar usuario con negocio_id y guardar cambios por modulo.
              </p>
            </div>
            <a className="btn-rr btn-primary-rr flex items-center justify-center gap-2" href="register.html" data-name="panel-register" data-file="pages/panel/BusinessPanelPage.js">
              Solicitar acceso
              <div className="icon-arrow-right text-xl text-white" data-name="panel-register-icon" data-file="pages/panel/BusinessPanelPage.js"></div>
            </a>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('BusinessPanelPage component error:', error);
    return null;
  }
}
