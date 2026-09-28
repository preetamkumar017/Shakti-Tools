import React from 'react';

export const TOOLS_CONFIG = [
  { id: 'cheque', name: 'Cheque Printer', icon: '🖋️', section: 'banking', badge: 'v1.0 Pro' },
  { id: 'receipt', name: 'Cash Receipt Maker', icon: '💰', section: 'banking', badge: 'Ready' },
  { id: 'calculator', name: 'GST & Margin Calc', icon: '🧮', section: 'banking', badge: 'Ready' },
  { id: 'converter', name: 'Number Words & Till', icon: '🔤', section: 'banking', badge: 'Ready' },

  { id: 'invoice', name: 'GST Tax Invoice', icon: '🧾', section: 'commercial', badge: 'Ready' },
  { id: 'quotation', name: 'Quotation / Estimate', icon: '📋', section: 'commercial', badge: 'Ready' },
  { id: 'challan', name: 'Delivery Challan', icon: '🚚', section: 'commercial', badge: 'Ready' },
  { id: 'salary', name: 'Salary Slip Maker', icon: '📑', section: 'commercial', badge: 'Ready' }
];

export default function Sidebar({
  activeTool,
  onSelectTool,
  onScrollToHistory,
  onOpenCalibration
}) {
  const bankingTools = TOOLS_CONFIG.filter(t => t.section === 'banking');
  const commercialTools = TOOLS_CONFIG.filter(t => t.section === 'commercial');

  return (
    <aside className="sidebar print-hide" id="sidebar">
      <div className="sidebar-header">
        <div className="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M7 15h0M2 9.5h20M7 9.5v5.5"/>
          </svg>
        </div>
        <div className="brand-text">
          <h1>Shakti Tools</h1>
          <span className="brand-tag">Business Suite</span>
        </div>
      </div>

      <div className="sidebar-content">
        {/* Banking & Accounts Section */}
        <div className="nav-section">
          <div className="nav-section-title">Banking & Cash Tools</div>
          <ul className="nav-list">
            {bankingTools.map((t) => (
              <li key={t.id}>
                <a
                  className={`nav-item ${activeTool === t.id ? 'active' : ''}`}
                  onClick={() => onSelectTool(t.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-icon">{t.icon}</span>
                  <span>{t.name}</span>
                  <span className={`nav-badge ${activeTool === t.id ? 'badge-active' : ''}`}>
                    {t.badge}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Commercial & Billing Section */}
        <div className="nav-section">
          <div className="nav-section-title">Billing & Operations</div>
          <ul className="nav-list">
            {commercialTools.map((t) => (
              <li key={t.id}>
                <a
                  className={`nav-item ${activeTool === t.id ? 'active' : ''}`}
                  onClick={() => onSelectTool(t.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-icon">{t.icon}</span>
                  <span>{t.name}</span>
                  <span className={`nav-badge ${activeTool === t.id ? 'badge-active' : ''}`}>
                    {t.badge}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cheque Utilities */}
        {activeTool === 'cheque' && (
          <div className="nav-section">
            <div className="nav-section-title">Cheque Utilities</div>
            <ul className="nav-list">
              <li>
                <a className="nav-item" onClick={onScrollToHistory} style={{ cursor: 'pointer' }}>
                  <span className="nav-icon">📜</span>
                  <span>Cheque Register</span>
                </a>
              </li>
              <li>
                <a className="nav-item" onClick={onOpenCalibration} style={{ cursor: 'pointer' }}>
                  <span className="nav-icon">⚙️</span>
                  <span>Printer Calibration</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="user-mini">
          <div className="user-avatar">ST</div>
          <div className="user-info">
            <p>Admin Workspace</p>
            <span>Shakti Tools Suite</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
