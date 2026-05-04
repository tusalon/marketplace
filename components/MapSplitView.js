function MapSplitView({ businesses, selectedProvince, onProvinceSelect }) {
  try {
    const mapRef = React.useRef(null);
    const layerRef = React.useRef(null);
    const containerRef = React.useRef(null);
    const list = businesses || [];

    const provinceCenters = [
      { name: 'Pinar del Río', lat: 22.42, lng: -83.70 },
      { name: 'Artemisa', lat: 22.82, lng: -82.76 },
      { name: 'La Habana', lat: 23.11, lng: -82.36 },
      { name: 'Mayabeque', lat: 22.96, lng: -82.15 },
      { name: 'Matanzas', lat: 22.58, lng: -81.34 },
      { name: 'Cienfuegos', lat: 22.15, lng: -80.44 },
      { name: 'Villa Clara', lat: 22.49, lng: -79.95 },
      { name: 'Sancti Spíritus', lat: 21.93, lng: -79.44 },
      { name: 'Ciego de Ávila', lat: 21.84, lng: -78.76 },
      { name: 'Camagüey', lat: 21.38, lng: -77.91 },
      { name: 'Las Tunas', lat: 20.96, lng: -76.95 },
      { name: 'Holguín', lat: 20.78, lng: -76.26 },
      { name: 'Granma', lat: 20.30, lng: -76.86 },
      { name: 'Santiago de Cuba', lat: 20.02, lng: -75.82 },
      { name: 'Guantánamo', lat: 20.14, lng: -75.21 },
      { name: 'Isla de la Juventud', lat: 21.75, lng: -82.85 }
    ];

    const normalize = (value) => String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const selected = normalize(selectedProvince);
    const centerByKey = provinceCenters.reduce((acc, province) => {
      acc[normalize(province.name)] = province;
      return acc;
    }, {});

    const counts = list.reduce((acc, business) => {
      const province = business.ubicacion?.provincia || business.ubicacion?.ciudad || 'La Habana';
      const key = normalize(province);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const activeProvince = provinceCenters.find((province) => normalize(province.name) === selected)
      || provinceCenters.find((province) => counts[normalize(province.name)] > 0)
      || provinceCenters[2];

    const escapeHtml = (value) => String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const hasRealCoords = (coords) => {
      const lat = Number(coords?.lat);
      const lng = Number(coords?.lng);
      return Number.isFinite(lat) && Number.isFinite(lng) && lat >= 19.4 && lat <= 23.6 && lng >= -85.5 && lng <= -73.8;
    };

    const markerPoints = React.useMemo(() => {
      const provinceIndexes = {};
      return list.map((business) => {
        const provinceName = business.ubicacion?.provincia || business.ubicacion?.ciudad || 'La Habana';
        const key = normalize(provinceName);
        const fallback = centerByKey[key] || provinceCenters[2];
        const index = provinceIndexes[key] || 0;
        provinceIndexes[key] = index + 1;
        const angle = (index % 10) * 0.628;
        const ring = Math.floor(index / 10);
        const radius = index === 0 ? 0 : 0.045 + ring * 0.025;
        const point = hasRealCoords(business.coordenadas)
          ? { lat: Number(business.coordenadas.lat), lng: Number(business.coordenadas.lng) }
          : { lat: fallback.lat + Math.sin(angle) * radius, lng: fallback.lng + Math.cos(angle) * radius };
        return { business, provinceName, point };
      });
    }, [list]);

    React.useEffect(() => {
      try {
        if (!containerRef.current || !window.L || mapRef.current) return;
        const map = window.L.map(containerRef.current, {
          zoomControl: true,
          attributionControl: false,
          scrollWheelZoom: false,
          zoomSnap: 0.25
        }).setView([21.75, -79.45], 6.25);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 5
        }).addTo(map);

        mapRef.current = map;
        layerRef.current = window.L.layerGroup().addTo(map);
      } catch (error) {
        console.error('MapSplitView.init error:', error);
      }
    }, []);

    React.useEffect(() => {
      try {
        const map = mapRef.current;
        const layer = layerRef.current;
        if (!window.L || !map || !layer) return;
        layer.clearLayers();

        markerPoints.forEach(({ business, provinceName, point }) => {
          const isSelected = selected && normalize(provinceName) === selected;
          const icon = window.L.divIcon({
            className: `rr-map-pin ${isSelected ? 'is-selected' : ''}`,
            html: '<span>RR</span>',
            iconSize: [34, 42],
            iconAnchor: [17, 42],
            popupAnchor: [0, -38]
          });
          const popup = `
            <div class="rr-map-popup">
              <strong>${escapeHtml(business.nombre)}</strong>
              <span>${escapeHtml(provinceName)}</span>
            </div>
          `;
          window.L.marker([point.lat, point.lng], { icon })
            .addTo(layer)
            .bindPopup(popup)
            .on('click', () => onProvinceSelect?.(provinceName));
        });

        if (selected && activeProvince) {
          map.setView([activeProvince.lat, activeProvince.lng], 7.25, { animate: true });
        } else {
          map.setView([21.75, -79.45], 6.25, { animate: true });
        }
      } catch (error) {
        console.error('MapSplitView.markers error:', error);
      }
    }, [markerPoints, selectedProvince]);

    if (!window.L) {
      return (
        <div className="relative w-full h-full bg-[#F7FBF8] flex items-center justify-center p-5" data-name="map-fallback" data-file="components/MapSplitView.js">
          <div className="surface-rr p-5 text-center max-w-[360px]" data-name="map-fallback-card" data-file="components/MapSplitView.js">
            <p className="text-sm font-semibold" data-name="map-fallback-title" data-file="components/MapSplitView.js">Mapa no disponible</p>
            <p className="text-xs text-[var(--text-muted)] mt-2" data-name="map-fallback-copy" data-file="components/MapSplitView.js">
              La conexión no cargó el mapa. Usa los filtros por provincia para explorar negocios.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full overflow-hidden bg-[#F7FBF8]" data-name="map-split-view" data-file="components/MapSplitView.js">
        <div ref={containerRef} className="absolute inset-0 rr-leaflet-map" data-name="leaflet-map" data-file="components/MapSplitView.js"></div>

        <div className="absolute top-4 left-4 right-4 z-[500]" data-name="map-hint" data-file="components/MapSplitView.js">
          <div className="surface-rr p-3 flex items-center gap-3 bg-white/92 backdrop-blur" data-name="map-hint-inner" data-file="components/MapSplitView.js">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--primary-color)] shadow-[0_14px_34px_rgba(216,27,96,0.20)]" data-name="map-hint-iw" data-file="components/MapSplitView.js">
              <span className="text-xs font-bold text-white" data-name="map-hint-logo" data-file="components/MapSplitView.js">RR</span>
            </div>
            <div className="min-w-0" data-name="map-hint-text" data-file="components/MapSplitView.js">
              <p className="text-sm font-semibold" data-name="map-hint-title" data-file="components/MapSplitView.js">Mapa real de Cuba</p>
              <p className="text-xs text-[var(--text-muted)]" data-name="map-hint-sub" data-file="components/MapSplitView.js">
                {list.length} negocios activos ubicados por provincia.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute left-4 right-4 bottom-4 z-[500]" data-name="province-summary" data-file="components/MapSplitView.js">
          <div className="card-rr p-4 flex items-center justify-between gap-3 bg-white/94 backdrop-blur" data-name="province-summary-card" data-file="components/MapSplitView.js">
            <div className="min-w-0" data-name="province-summary-copy" data-file="components/MapSplitView.js">
              <p className="text-sm font-semibold truncate" data-name="province-summary-title" data-file="components/MapSplitView.js">{selected ? activeProvince.name : 'Negocios activos en Cuba'}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1" data-name="province-summary-sub" data-file="components/MapSplitView.js">
                {selected ? `${counts[normalize(activeProvince.name)] || 0} negocios activos en esta provincia.` : 'Toca un marcador para filtrar por provincia.'}
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
