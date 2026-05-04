function MapSplitView({ businesses, selectedProvince, onProvinceSelect }) {
  try {
    const list = businesses || [];
    const provinces = [
      { name: 'Pinar del Río', x: 11, y: 45 },
      { name: 'Artemisa', x: 21, y: 43 },
      { name: 'La Habana', x: 25, y: 39 },
      { name: 'Mayabeque', x: 29, y: 44 },
      { name: 'Matanzas', x: 36, y: 47 },
      { name: 'Cienfuegos', x: 45, y: 58 },
      { name: 'Villa Clara', x: 49, y: 47 },
      { name: 'Sancti Spíritus', x: 57, y: 55 },
      { name: 'Ciego de Ávila', x: 65, y: 52 },
      { name: 'Camagüey', x: 72, y: 57 },
      { name: 'Las Tunas', x: 81, y: 58 },
      { name: 'Holguín', x: 87, y: 51 },
      { name: 'Granma', x: 86, y: 70 },
      { name: 'Santiago de Cuba', x: 92, y: 70 },
      { name: 'Guantánamo', x: 96, y: 64 },
      { name: 'Isla de la Juventud', x: 29, y: 74 }
    ];

    const normalize = (value) => String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const selected = normalize(selectedProvince);
    const provinceByKey = provinces.reduce((acc, province) => {
      acc[normalize(province.name)] = province;
      return acc;
    }, {});

    const counts = list.reduce((acc, business) => {
      const province = business.ubicacion?.provincia || business.ubicacion?.ciudad || 'La Habana';
      acc[normalize(province)] = (acc[normalize(province)] || 0) + 1;
      return acc;
    }, {});

    const activeProvince = provinces.find((province) => normalize(province.name) === selected)
      || provinces.find((province) => counts[normalize(province.name)] > 0)
      || provinces[2];

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const provinceIndexes = {};
    const markers = list.map((business) => {
      const provinceName = business.ubicacion?.provincia || business.ubicacion?.ciudad || 'La Habana';
      const key = normalize(provinceName);
      const province = provinceByKey[key] || provinces[2];
      const index = provinceIndexes[key] || 0;
      provinceIndexes[key] = index + 1;
      const ring = Math.floor(index / 8);
      const angle = (index % 8) * 0.785;
      const radius = index === 0 ? 0 : 2.8 + ring * 1.5;
      return {
        business,
        provinceName,
        x: clamp(province.x + Math.cos(angle) * radius, 5, 97),
        y: clamp(province.y + Math.sin(angle) * radius, 18, 80)
      };
    });

    return (
      <div className="relative w-full h-full overflow-hidden bg-[#F7FBF8]" data-name="map-split-view" data-file="components/MapSplitView.js">
        <div
          className="absolute inset-0"
          data-name="map-gradient"
          data-file="components/MapSplitView.js"
          style={{
            background: 'linear-gradient(145deg, #F9FAFB 0%, #F3FFF8 45%, #FFF7FC 100%)'
          }}
        ></div>
        <div
          className="absolute inset-0 opacity-70"
          data-name="map-texture"
          data-file="components/MapSplitView.js"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(11,18,32,0.09) 1px, transparent 0)',
            backgroundSize: '26px 26px'
          }}
        ></div>

        <div className="absolute top-4 left-4 right-4 z-30" data-name="map-hint" data-file="components/MapSplitView.js">
          <div className="surface-rr p-3 flex items-center gap-3 bg-white/92 backdrop-blur" data-name="map-hint-inner" data-file="components/MapSplitView.js">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--primary-color)] shadow-[0_14px_34px_rgba(216,27,96,0.20)]" data-name="map-hint-iw" data-file="components/MapSplitView.js">
              <span className="text-xs font-bold text-white" data-name="map-hint-logo" data-file="components/MapSplitView.js">RR</span>
            </div>
            <div className="min-w-0" data-name="map-hint-text" data-file="components/MapSplitView.js">
              <p className="text-sm font-semibold" data-name="map-hint-title" data-file="components/MapSplitView.js">RservasRoma en Cuba</p>
              <p className="text-xs text-[var(--text-muted)]" data-name="map-hint-sub" data-file="components/MapSplitView.js">
                Cada marcador representa un negocio activo.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-3 top-[100px] bottom-[116px] z-10 flex items-center" data-name="real-cuba-map-stage" data-file="components/MapSplitView.js">
          <div className="relative w-full" style={{ aspectRatio: '1018.2939 / 342.2775' }} data-name="real-cuba-map-frame" data-file="components/MapSplitView.js">
            <img
              src="assets/cuba-provinces.svg"
              alt="Mapa de Cuba dividido por provincias"
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_24px_42px_rgba(11,18,32,0.16)]"
              data-name="real-cuba-map-image"
              data-file="components/MapSplitView.js"
            />
            <div className="absolute inset-0 rounded-[24px] pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(216,27,96,0.08), rgba(22,163,106,0.08))', mixBlendMode: 'multiply' }} data-name="real-cuba-map-tint" data-file="components/MapSplitView.js"></div>

            <div className="absolute inset-0 z-20" data-name="business-markers" data-file="components/MapSplitView.js">
              {markers.map(({ business, provinceName, x, y }, index) => {
                const isSelected = selected && normalize(provinceName) === selected;
                return (
                  <button
                    key={`${business.id}-${index}`}
                    className={`absolute -translate-x-1/2 -translate-y-full group transition-transform ${isSelected ? 'scale-110 z-30' : 'z-20 hover:scale-110'}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => onProvinceSelect?.(provinceName)}
                    title={`${business.nombre} - ${provinceName}`}
                    aria-label={`Filtrar por ${provinceName}: ${business.nombre}`}
                    data-name="business-map-marker"
                    data-file="components/MapSplitView.js"
                  >
                    <span className="relative flex flex-col items-center" data-name="business-marker-wrap" data-file="components/MapSplitView.js">
                      <span className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border-2 border-[var(--primary-color)] shadow-[0_12px_26px_rgba(11,18,32,0.22)] flex items-center justify-center overflow-hidden" data-name="business-marker-dot" data-file="components/MapSplitView.js">
                        {business.logoUrl ? (
                          <img src={business.logoUrl} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" data-name="business-marker-logo" data-file="components/MapSplitView.js" />
                        ) : (
                          <span className="text-[10px] font-bold text-[var(--primary-color)]" data-name="business-marker-rr" data-file="components/MapSplitView.js">RR</span>
                        )}
                      </span>
                      <span className="w-2.5 h-2.5 -mt-1 rotate-45 bg-[var(--primary-color)] border-r border-b border-[var(--primary-color)]" data-name="business-marker-tip" data-file="components/MapSplitView.js"></span>
                      <span className="pointer-events-none absolute left-1/2 top-[-38px] hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-2 py-1 text-[10px] font-semibold shadow-lg border border-[var(--border)] group-hover:block" data-name="business-marker-label" data-file="components/MapSplitView.js">
                        {business.nombre}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="absolute inset-0 z-10" data-name="province-hit-areas" data-file="components/MapSplitView.js">
              {provinces.map((province) => {
                const key = normalize(province.name);
                const count = counts[key] || 0;
                const isSelected = selected && key === selected;
                return count ? (
                  <button
                    key={province.name}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[10px] font-semibold border transition-colors ${isSelected ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)]' : 'bg-white/88 text-[var(--text)] border-white/90'}`}
                    style={{ left: `${province.x}%`, top: `${province.y + 8}%` }}
                    onClick={() => onProvinceSelect?.(province.name)}
                    data-name="province-count-pill"
                    data-file="components/MapSplitView.js"
                  >
                    {province.name} · {count}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        </div>
        <div className="absolute left-4 right-4 bottom-4 z-30" data-name="province-summary" data-file="components/MapSplitView.js">
          <div className="card-rr p-4 flex items-center justify-between gap-3 bg-white/94 backdrop-blur" data-name="province-summary-card" data-file="components/MapSplitView.js">
            <div className="min-w-0" data-name="province-summary-copy" data-file="components/MapSplitView.js">
              <p className="text-sm font-semibold truncate" data-name="province-summary-title" data-file="components/MapSplitView.js">{selected ? activeProvince.name : 'Negocios activos en Cuba'}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1" data-name="province-summary-sub" data-file="components/MapSplitView.js">
                {selected ? `${counts[normalize(activeProvince.name)] || 0} negocios activos en esta provincia.` : `${list.length} marcadores de RservasRoma en el mapa.`}
              </p>
            </div>
            {selected ? (
              <button
                className="btn-rr btn-ghost-rr py-2 px-3 text-xs"
                onClick={() => onProvinceSelect?.('')}
                data-name="province-clear"
                data-file="components/MapSplitView.js"
              >
                Ver Cuba
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('MapSplitView component error:', error);
    return null;
  }
}

