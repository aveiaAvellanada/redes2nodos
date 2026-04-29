// Main App — landing portal for the community mesh node "Travesías"

const { useState, useEffect, useRef } = React;

// =============================================================================
// TWEAK DEFAULTS — persisted via EDITMODE block
// =============================================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "claro",
  "density": "spacious",
  "showTicker": true,
  "nodeName": "TRAVESÍAS"
}/*EDITMODE-END*/;

const THEMES = {
  claro: {
    name: 'Claro',
    '--bg':           '#F5F5F5',
    '--paper':        '#FFFFFF',
    '--ink':          '#0F422C',
    '--ink-soft':     'color-mix(in oklch, #0F422C 65%, transparent)',
    '--ink-faint':    'color-mix(in oklch, #0F422C 40%, transparent)',
    '--line':         'color-mix(in oklch, #0F422C 15%, transparent)',
    '--forest':       '#34AF72',
    '--forest-deep':  '#208251',
    '--terracotta':   '#208251',
    '--olive':        '#34AF72',
    '--alert':        'oklch(53% 0.180 38)',
    '--card':         '#FFFFFF',
    '--clay-border':  'color-mix(in oklch, #0F422C 12%, transparent)',
  },
  kraft: {
    name: 'Kraft',
    '--bg':           'oklch(91% 0.042 72)',
    '--paper':        'oklch(96% 0.028 72)',
    '--ink':          'oklch(22% 0.040 55)',
    '--ink-soft':     'oklch(42% 0.038 58)',
    '--ink-faint':    'oklch(60% 0.030 62)',
    '--line':         'oklch(80% 0.038 72)',
    '--forest':       'oklch(42% 0.100 142)',
    '--forest-deep':  'oklch(30% 0.075 142)',
    '--terracotta':   'oklch(56% 0.180 44)',
    '--olive':        'oklch(63% 0.090 112)',
    '--alert':        'oklch(52% 0.195 34)',
    '--card':         'oklch(97% 0.022 72)',
    '--clay-border':  'oklch(73% 0.065 66)',
  },
  tinta: {
    name: 'Tinta (oscuro)',
    '--bg':           'oklch(18% 0.018 140)',
    '--paper':        'oklch(22% 0.020 140)',
    '--ink':          'oklch(94% 0.012 85)',
    '--ink-soft':     'oklch(78% 0.015 85)',
    '--ink-faint':    'oklch(55% 0.015 85)',
    '--line':         'oklch(30% 0.022 140)',
    '--forest':       'oklch(72% 0.120 140)',
    '--forest-deep':  'oklch(82% 0.100 140)',
    '--terracotta':   'oklch(72% 0.145 50)',
    '--olive':        'oklch(74% 0.075 118)',
    '--alert':        'oklch(72% 0.185 36)',
    '--card':         'oklch(24% 0.020 140)',
    '--clay-border':  'oklch(11% 0.010 140)',
  },
};

function applyTheme(themeKey) {
  const theme = THEMES[themeKey] || THEMES.claro;
  const root = document.documentElement;
  Object.entries(theme).forEach(([k, v]) => {
    if (k.startsWith('--')) root.style.setProperty(k, v);
  });
}

const THEME_ORDER = ['claro', 'kraft', 'tinta'];

// =============================================================================
// Sub-components
// =============================================================================

const ThemeSwitcher = ({ currentTheme, onSwitch }) => {
  const nextIdx = (THEME_ORDER.indexOf(currentTheme) + 1) % THEME_ORDER.length;
  const nextTheme = THEMES[THEME_ORDER[nextIdx]];
  const isDark = currentTheme === 'tinta';

  return (
    <button
      className="theme-switcher"
      data-dark={isDark ? '1' : '0'}
      onClick={onSwitch}
      title={`Cambiar a paleta: ${nextTheme.name}`}
      aria-label={`Paleta actual: ${THEMES[currentTheme].name}. Cambiar a ${nextTheme.name}`}
    >
      <span className="theme-switcher-swatches">
        {THEME_ORDER.map((key) => (
          <span
            key={key}
            className="theme-switcher-dot"
            data-active={key === currentTheme ? '1' : '0'}
            style={{ background: THEMES[key]['--terracotta'] }}
          />
        ))}
      </span>
      <span className="theme-switcher-label mono">
        {THEMES[currentTheme].name.toUpperCase()}
      </span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
           style={{ flexShrink: 0, opacity: 0.7 }}>
        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};

const Ticker = ({ items }) => {
  const doubled = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-label mono">EN VIVO</div>
      <div className="ticker-track">
        <div className="ticker-inner">
          {doubled.map((t, i) => (
            <span key={i} className="ticker-item mono">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatusStrip = ({ nodeName }) => {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const hh = time.getHours().toString().padStart(2, '0');
  const mm = time.getMinutes().toString().padStart(2, '0');

  return (
    <div className="status-strip mono">
      <div className="status-item">
        <span className="dot dot-on" /> NODO <b>{nodeName}</b>
      </div>
      <div className="status-sep">·</div>
      <div className="status-item"><span className="dot dot-on" /> 43 VECINOS CONECTADOS</div>
      <div className="status-sep">·</div>
      <div className="status-item">SEÑAL FUERTE · 2.4 GHz</div>
      <div className="status-sep">·</div>
      <div className="status-item">{hh}:{mm} COL</div>
      <div className="status-sep">·</div>
      <div className="status-item">SINC. hace 12 min</div>
    </div>
  );
};

const Masthead = ({ nodeName }) => (
  <header className="masthead">
    <div className="masthead-top">
      <div className="mono kicker">RED COMUNITARIA · AMAZONÍA</div>
      <div className="mono kicker right">AÑO III · ED. 84</div>
    </div>
    <div className="masthead-title">
      <div className="masthead-mark">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="34" stroke="var(--ink)" strokeWidth="1.5"/>
          <circle cx="36" cy="36" r="4" fill="var(--terracotta)"/>
          <circle cx="12" cy="24" r="3" fill="var(--forest)"/>
          <circle cx="60" cy="20" r="3" fill="var(--forest)"/>
          <circle cx="14" cy="54" r="3" fill="var(--forest)"/>
          <circle cx="58" cy="56" r="3" fill="var(--forest)"/>
          <circle cx="36" cy="8" r="3" fill="var(--forest)"/>
          <line x1="36" y1="36" x2="12" y2="24" stroke="var(--ink)" strokeWidth="0.8"/>
          <line x1="36" y1="36" x2="60" y2="20" stroke="var(--ink)" strokeWidth="0.8"/>
          <line x1="36" y1="36" x2="14" y2="54" stroke="var(--ink)" strokeWidth="0.8"/>
          <line x1="36" y1="36" x2="58" y2="56" stroke="var(--ink)" strokeWidth="0.8"/>
          <line x1="36" y1="36" x2="36" y2="8" stroke="var(--ink)" strokeWidth="0.8"/>
        </svg>
      </div>
      <div className="masthead-text">
        <h1 className="wordmark">Nodo <em>{nodeName}</em></h1>
        <div className="wordmark-sub">Una red que hicimos entre vecinos.</div>
      </div>
      <div className="masthead-meta mono">
        <div>Lat. 01° 36′ N</div>
        <div>Long. 75° 36′ O</div>
        <div>Alt. 240 m</div>
      </div>
    </div>
    <div className="masthead-rule" />
  </header>
);

const ServiceCard = ({ service, onOpen, density }) => {
  const big = density === 'spacious';
  return (
    <button className={`card ${big ? 'card-big' : 'card-compact'}`} onClick={() => onOpen(service)}>
      <div className="card-head">
        <div className="card-glyph">
          <Glyph name={service.glyph} size={big ? 44 : 32} color="var(--forest-deep)" accent="var(--terracotta)" />
        </div>
        <div className="mono card-cat">{service.category}</div>
      </div>
      <div className="card-body">
        <div className="card-name">{service.name}</div>
        <div className="card-tagline">{service.tagline}</div>
      </div>
      <div className="card-foot">
        <div className="mono card-size">{service.size}</div>
        <div className="card-signals">
          {service.offline && <span className="chip chip-offline mono">OFFLINE</span>}
          {service.live && <span className="chip chip-live mono"><span className="pulse"/>EN VIVO</span>}
        </div>
      </div>
      <div className="card-hover mono">
        ABRIR <span className="arrow">→</span>
      </div>
    </button>
  );
};

const AlertsBanner = ({ alerts }) => {
  const urgent = alerts.highlights[0];
  return (
    <div className="alerts-banner">
      <div className="alerts-mark">
        <Glyph name="bell" size={40} color="var(--alert)" accent="var(--alert)" />
      </div>
      <div className="alerts-body">
        <div className="mono alerts-kicker">
          <span className="pulse-big"/> ALERTA ACTIVA · {urgent.when}
        </div>
        <div className="alerts-title">{urgent.label}</div>
        <div className="alerts-meta">{urgent.by} — reportado por un vecino vía radio comunitaria</div>
      </div>
      <button className="btn btn-alert">Ver todas las alertas</button>
    </div>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-col">
      <div className="mono footer-label">CÓMO CONECTARSE</div>
      <ol className="footer-list">
        <li>Busca la red Wi-Fi <b>nodo-travesias</b></li>
        <li>Sin clave — abre cualquier navegador</li>
        <li>Te redirige a esta página</li>
      </ol>
    </div>
    <div className="footer-col">
      <div className="mono footer-label">EL NODO FUNCIONA</div>
      <div className="footer-tech mono">
        <div>· 1 antena direccional 5 GHz</div>
        <div>· 2 puntos de acceso 2.4 GHz</div>
        <div>· 1 servidor reciclado · 64 GB</div>
        <div>· Panel solar 80 W · 1 batería</div>
      </div>
    </div>
    <div className="footer-col">
      <div className="mono footer-label">MANTENIMIENTO</div>
      <div className="footer-body">
        La red la cuida la <b>Junta del Nodo</b>, elegida cada año en asamblea. Escribe a la Caseta si algo falla.
      </div>
    </div>
    <div className="footer-col">
      <div className="mono footer-label">LICENCIA</div>
      <div className="footer-body">
        Abierta y libre. Cualquier comunidad puede copiar este nodo. Los contenidos son <b>CC BY-SA</b>.
      </div>
    </div>
    <div className="footer-rule" />
    <div className="footer-mini mono">
      NODO TRAVESÍAS · RED COMUNITARIA · PROYECTO SIN ÁNIMO DE LUCRO · HECHO ENTRE VECINOS · 2026
    </div>
  </footer>
);

// =============================================================================
// Tweaks
// =============================================================================

const TweaksUI = ({ tweaks, setTweak }) => (
  <TweaksPanel title="Tweaks">
    <TweakSection label="Tema visual">
      <TweakSelect
        label="Paleta"
        value={tweaks.theme}
        onChange={(v) => setTweak('theme', v)}
        options={[
          { value: 'claro', label: 'Claro — blancos y verdes' },
          { value: 'kraft', label: 'Kraft — papel campesino' },
          { value: 'tinta', label: 'Tinta — modo oscuro' },
        ]}
      />
    </TweakSection>
    <TweakSection label="Densidad">
      <TweakRadio
        label="Tarjetas"
        value={tweaks.density}
        onChange={(v) => setTweak('density', v)}
        options={[
          { value: 'spacious', label: 'Espaciosa' },
          { value: 'compact', label: 'Compacta' },
        ]}
      />
    </TweakSection>
    <TweakSection label="Módulos">
      <TweakToggle label="Ticker en vivo" value={tweaks.showTicker} onChange={(v) => setTweak('showTicker', v)} />
    </TweakSection>
    <TweakSection label="Identidad">
      <TweakText label="Nombre del nodo" value={tweaks.nodeName} onChange={(v) => setTweak('nodeName', v)} />
    </TweakSection>
  </TweaksPanel>
);

// =============================================================================
// Root App
// =============================================================================

const BottomNav = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'servicios', label: 'Servicios', icon: 'grid' },
    { id: 'red', label: 'Red', icon: 'signal' },
    { id: 'ajustes', label: 'Ajustes', icon: 'gear' }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          className={`bottom-nav-item ${currentTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          aria-label={tab.label}
        >
          <div className="bottom-nav-icon">
            <Glyph name={tab.icon} size={28} color="currentColor" />
          </div>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

const InicioTab = ({ tweaks, alertsService }) => (
  <div className="tab-content">
    <Masthead nodeName={tweaks.nodeName} />

    <section className="welcome">
      <div className="welcome-body">
        <div className="mono welcome-kicker">◎ BIENVENIDO</div>
        <h2 className="welcome-title">
          Esta es la red que <em>tejemos</em> entre vecinos.
        </h2>
        <p className="welcome-sub">
          11 servicios que funcionan en el territorio, aún cuando se cae el internet. Explora en la pestaña de Servicios.
        </p>
      </div>
    </section>

    <AlertsBanner alerts={alertsService} />

    <section className="quote-block">
      <div className="mono quote-kicker">§ 02 · DEL TERRITORIO</div>
      <blockquote>
        “Antes había que bajar al pueblo para mandar un recado. Ahora lo escribimos aquí y <em>todos</em> los vecinos se enteran.”
      </blockquote>
      <div className="quote-by">— Doña Evelia, Vereda Alto Bonito</div>
    </section>
  </div>
);

const ServiciosTab = ({ density, onOpen }) => (
  <div className="tab-content" style={{ paddingTop: '24px' }}>
    <section className="grid-section">
      <div className="section-head">
        <div className="mono section-kicker">§ 01</div>
        <h3 className="section-title-big">Servicios del nodo</h3>
        <div className="section-rule"/>
        <div className="mono section-count-big">{SERVICES.length} módulos</div>
      </div>

      <div className={`grid grid-${density}`}>
        {SERVICES.map((s) => (
          <ServiceCard key={s.id} service={s} onOpen={onOpen} density={density} />
        ))}
      </div>
    </section>
  </div>
);

const RedTab = () => (
  <div className="tab-content" style={{ paddingTop: '24px' }}>
    <div className="section-head">
      <div className="mono section-kicker">ESTADO</div>
      <h3 className="section-title-big">La Red Comunitaria</h3>
      <div className="section-rule"/>
    </div>

    <div className="welcome-stats" style={{ marginBottom: '32px' }}>
      <div className="wstat">
        <div className="wstat-num">43</div>
        <div className="mono wstat-label">EN LÍNEA</div>
      </div>
      <div className="wstat">
        <div className="wstat-num">7</div>
        <div className="mono wstat-label">VEREDAS</div>
      </div>
      <div className="wstat">
        <div className="wstat-num">11</div>
        <div className="mono wstat-label">MÓDULOS</div>
      </div>
    </div>
    
    <Footer />
  </div>
);

const AjustesTab = ({ tweaks, setTweak }) => (
  <div className="tab-content" style={{ paddingTop: '24px' }}>
    <div className="section-head">
      <div className="mono section-kicker">CONFIG</div>
      <h3 className="section-title-big">Ajustes</h3>
      <div className="section-rule"/>
    </div>
    
    <div className="card" style={{ marginBottom: '32px', minHeight: 'auto', padding: '16px 20px' }}>
      <div className="card-body" style={{ marginTop: 0 }}>
        <div className="card-name" style={{ fontSize: '18px', marginBottom: '8px' }}>Mi Cuenta</div>
        <div className="card-tagline" style={{ marginBottom: '16px' }}>Inicia sesión para gestionar el nodo o publicar en servicios.</div>
        <button className="btn btn-primary" style={{ width: '100%' }}>Iniciar Sesión</button>
      </div>
    </div>

    <TweaksUI tweaks={tweaks} setTweak={setTweak} />

    <div style={{ marginTop: '48px', marginBottom: '24px', display: 'flex', justifyContent: 'space-around', opacity: 0.6 }}>
      <div style={{ textAlign: 'center' }}>
        <Glyph name="university" size={48} color="var(--ink-soft)" />
        <div className="mono" style={{ fontSize: '10px', marginTop: '8px', letterSpacing: '0.1em' }}>UNIVERSIDAD</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Glyph name="group" size={48} color="var(--ink-soft)" />
        <div className="mono" style={{ fontSize: '10px', marginTop: '8px', letterSpacing: '0.1em' }}>SEMILLERO</div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeService, setActiveService] = useState(null);
  const [currentTab, setCurrentTab] = useState('inicio');

  const cycleTheme = () => {
    const idx = THEME_ORDER.indexOf(tweaks.theme);
    const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    setTweak('theme', next);
  };

  useEffect(() => {
    applyTheme(tweaks.theme);
  }, [tweaks.theme]);

  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeService]);

  const alertsService = SERVICES.find((s) => s.id === 'alertas');
  const density = tweaks.density;

  return (
    <div className="app" data-density={density}>
      {/* Top Status Indicators */}
      {currentTab !== 'ajustes' && <ThemeSwitcher currentTheme={tweaks.theme} onSwitch={cycleTheme} />}
      <StatusStrip nodeName={tweaks.nodeName} />
      {tweaks.showTicker && <Ticker items={TICKER} />}

      {/* Main Content Area */}
      <main className="container">
        {currentTab === 'inicio' && <InicioTab tweaks={tweaks} alertsService={alertsService} />}
        {currentTab === 'servicios' && <ServiciosTab density={density} onOpen={setActiveService} />}
        {currentTab === 'red' && <RedTab />}
        {currentTab === 'ajustes' && <AjustesTab tweaks={tweaks} setTweak={setTweak} />}
      </main>

      {/* Overlays */}
      <ServiceDetail service={activeService} onClose={() => setActiveService(null)} />
      
      {/* Bottom Navigation */}
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
