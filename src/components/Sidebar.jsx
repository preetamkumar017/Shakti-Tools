import React from 'react';

export default function Sidebar({ onScrollToHistory, onOpenCalibration }) {
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
        <div className="nav-section">
          <div className="nav-section-title">Active Tools</div>
          <ul className="nav-list">
            <li>
              <a className="nav-item active">
                <span className="nav-icon">🖋️</span>
                <span>Cheque Printer</span>
                <span className="nav-badge badge-active">v1.0 Ready</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Upcoming Business Tools</div>
          <ul className="nav-list">
            <li>
              <a className="nav-item">
                <span className="nav-icon">🧾</span>
                <span>Invoice Generator</span>
                <span className="nav-badge badge-soon">Soon</span>
              </a>
            </li>
            <li>
              <a className="nav-item">
                <span className="nav-icon">💰</span>
                <span>Cash Receipt Maker</span>
                <span className="nav-badge badge-soon">Soon</span>
              </a>
            </li>
            <li>
              <a className="nav-item">
                <span className="nav-icon">📑</span>
                <span>Salary Slip Maker</span>
                <span className="nav-badge badge-soon">Soon</span>
              </a>
            </li>
            <li>
              <a className="nav-item">
                <span className="nav-icon">📋</span>
                <span>Quotation Maker</span>
                <span className="nav-badge badge-soon">Soon</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Cheque Utilities</div>
          <ul className="nav-list">
            <li>
              <a className="nav-item" onClick={onScrollToHistory}>
                <span className="nav-icon">📜</span>
                <span>Cheque Register</span>
              </a>
            </li>
            <li>
              <a className="nav-item" onClick={onOpenCalibration}>
                <span className="nav-icon">⚙️</span>
                <span>Printer Calibration</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-mini">
          <div className="user-avatar">ST</div>
          <div className="user-info">
            <p>Admin Workspace</p>
            <span>CTS-2010 Precision</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
