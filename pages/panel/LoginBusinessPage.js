function LoginBusinessPage() {
  try {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [plan, setPlan] = React.useState('vip');
    const [error, setError] = React.useState('');

    const submit = (event) => {
      try {
        event.preventDefault();
        if (!email.trim() || !password.trim()) {
          setError('Escribe correo y contrasena para continuar.');
          return;
        }
        const params = new URLSearchParams({ plan });
        window.location.href = `panel.html?${params.toString()}`;
      } catch (err) {
        console.error('LoginBusinessPage.submit error:', err);
      }
    };

    return (
      <section className="pt-6 md:pt-10" data-name="login-business-page" data-file="pages/panel/LoginBusinessPage.js">
        <div className="container-rr" data-name="login-container" data-file="pages/panel/LoginBusinessPage.js">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-10 items-start" data-name="login-grid" data-file="pages/panel/LoginBusinessPage.js">
            <div data-name="login-copy" data-file="pages/panel/LoginBusinessPage.js">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-color)]" data-name="login-kicker" data-file="pages/panel/LoginBusinessPage.js">
                Panel de negocios
              </p>
              <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[0.98]" data-name="login-title" data-file="pages/panel/LoginBusinessPage.js">
                Gestiona tu espacio en RservasRoma.
              </h1>
              <p className="mt-5 text-base md:text-lg text-[var(--text-muted)] leading-relaxed max-w-[700px]" data-name="login-subtitle" data-file="pages/panel/LoginBusinessPage.js">
                Esta entrada queda lista para conectar Supabase Auth. Por ahora permite revisar el flujo del panel sin cargar librerias extra.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3" data-name="login-benefits" data-file="pages/panel/LoginBusinessPage.js">
                {[
                  ['icon-store', 'Perfil', 'Datos, fotos y contacto.'],
                  ['icon-shopping-bag', 'Tienda', 'Productos, cursos y carrito.'],
                  ['icon-map-pin', 'Mapa', 'Provincia y ubicacion publica.']
                ].map((item) => (
                  <div key={item[1]} className="surface-rr p-4" data-name="login-benefit" data-file="pages/panel/LoginBusinessPage.js">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--secondary-color)]" data-name="benefit-icon-wrap" data-file="pages/panel/LoginBusinessPage.js">
                      <div className={`${item[0]} text-xl text-[var(--primary-color)]`} data-name="benefit-icon" data-file="pages/panel/LoginBusinessPage.js"></div>
                    </div>
                    <p className="mt-3 text-sm font-semibold" data-name="benefit-title" data-file="pages/panel/LoginBusinessPage.js">{item[1]}</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed" data-name="benefit-desc" data-file="pages/panel/LoginBusinessPage.js">{item[2]}</p>
                  </div>
                ))}
              </div>
            </div>

            <form className="surface-rr p-5 md:p-6" onSubmit={submit} data-name="login-form" data-file="pages/panel/LoginBusinessPage.js">
              <h2 className="text-xl font-semibold tracking-tight" data-name="form-title" data-file="pages/panel/LoginBusinessPage.js">Acceso de negocio</h2>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed" data-name="form-subtitle" data-file="pages/panel/LoginBusinessPage.js">
                Flujo preparado para cuenta de negocio.
              </p>

              <label className="block mt-5" data-name="email-field" data-file="pages/panel/LoginBusinessPage.js">
                <span className="text-xs font-semibold text-[var(--text-muted)]">Correo</span>
                <input className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-sm" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="correo@negocio.com" data-name="email-input" data-file="pages/panel/LoginBusinessPage.js" />
              </label>

              <label className="block mt-4" data-name="password-field" data-file="pages/panel/LoginBusinessPage.js">
                <span className="text-xs font-semibold text-[var(--text-muted)]">Contrasena</span>
                <input className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-sm" type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} placeholder="Contrasena del negocio" data-name="password-input" data-file="pages/panel/LoginBusinessPage.js" />
              </label>

              <div className="mt-4 grid grid-cols-2 gap-2" data-name="plan-toggle" data-file="pages/panel/LoginBusinessPage.js">
                <button type="button" className={`rounded-lg border px-4 py-3 text-sm font-medium ${plan === 'vip' ? 'border-[var(--primary-color)] bg-[var(--secondary-color)] text-[var(--primary-color)]' : 'border-[var(--border)] bg-white'}`} onClick={() => setPlan('vip')} data-name="plan-vip" data-file="pages/panel/LoginBusinessPage.js">VIP</button>
                <button type="button" className={`rounded-lg border px-4 py-3 text-sm font-medium ${plan === 'basico' ? 'border-[var(--primary-color)] bg-[var(--secondary-color)] text-[var(--primary-color)]' : 'border-[var(--border)] bg-white'}`} onClick={() => setPlan('basico')} data-name="plan-basic" data-file="pages/panel/LoginBusinessPage.js">Basico</button>
              </div>

              {error ? <p className="mt-3 text-xs text-red-600" data-name="login-error" data-file="pages/panel/LoginBusinessPage.js">{error}</p> : null}

              <button className="mt-5 btn-rr btn-primary-rr w-full flex items-center justify-center gap-2" type="submit" data-name="login-submit" data-file="pages/panel/LoginBusinessPage.js">
                Entrar al panel
                <div className="icon-arrow-right text-xl text-white" data-name="login-submit-icon" data-file="pages/panel/LoginBusinessPage.js"></div>
              </button>

              <a className="mt-3 btn-rr btn-ghost-rr w-full flex items-center justify-center gap-2" href="register.html" data-name="register-link" data-file="pages/panel/LoginBusinessPage.js">
                Registrar mi negocio
              </a>
            </form>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('LoginBusinessPage component error:', error);
    return null;
  }
}
