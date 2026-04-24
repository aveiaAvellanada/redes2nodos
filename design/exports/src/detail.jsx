// Service detail view — slides in from right when a card is clicked

const ServiceDetail = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="detail-scrim" onClick={onClose}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose} aria-label="Cerrar">
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 5 L15 15 M15 5 L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>

        <div className="detail-hero">
          <div className="detail-glyph">
            <Glyph name={service.glyph} size={72} color="var(--forest)" accent="var(--terracotta)" />
          </div>
          <div className="detail-meta">
            <div className="mono tag">{service.category.toUpperCase()}</div>
            <h1 className="detail-title">{service.name}</h1>
            <p className="detail-tagline">{service.tagline}</p>
          </div>
        </div>

        <p className="detail-desc">{service.desc}</p>

        <div className="detail-stats">
          <div className="stat">
            <div className="mono stat-label">Tamaño</div>
            <div className="stat-val">{service.size}</div>
          </div>
          <div className="stat">
            <div className="mono stat-label">Offline</div>
            <div className="stat-val">{service.offline ? 'Sí' : 'Requiere red'}</div>
          </div>
          <div className="stat">
            <div className="mono stat-label">Actividad 7d</div>
            <div className="stat-val">{service.activity}</div>
          </div>
          <div className="stat">
            <div className="mono stat-label">Sinc.</div>
            <div className="stat-val">hace 12 min</div>
          </div>
        </div>

        <div className="detail-section">
          <div className="section-title">
            <span className="mono section-label">◎ Lo último</span>
            <span className="mono section-count">{service.highlights.length}</span>
          </div>
          <ul className="highlight-list">
            {service.highlights.map((h, i) => (
              <li key={i} className="highlight-item">
                <div className="highlight-main">
                  <div className="highlight-label">{h.label}</div>
                  <div className="highlight-meta">{h.by}</div>
                </div>
                <div className="mono highlight-when">{h.when}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-actions">
          <button className="btn btn-primary">Abrir {service.name.toLowerCase()}</button>
          <button className="btn btn-ghost">Guardar offline</button>
          <button className="btn btn-ghost">Compartir con vecino</button>
        </div>

        <div className="detail-foot mono">
          NODO · TRAVESÍAS &nbsp;·&nbsp; módulo <b>{service.id}</b> &nbsp;·&nbsp; v1.4.2 &nbsp;·&nbsp; mantenido por la junta
        </div>
      </div>
    </div>
  );
};

window.ServiceDetail = ServiceDetail;
