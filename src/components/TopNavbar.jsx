import React from 'react';
import { BANK_CATEGORIES } from '../utils/presets';

export default function TopNavbar({
  banks,
  activeBankId,
  onSelectBank,
  onOpenCalibration,
  onResetCoords,
  onPrintCheque,
  theme,
  onToggleTheme
}) {
  const activeBank = banks[activeBankId] || banks['sbi'];

  // Group banks by category
  const categories = Object.values(BANK_CATEGORIES);
  const groupedBanks = categories.reduce((acc, cat) => {
    acc[cat] = Object.values(banks).filter((b) => (b.category || BANK_CATEGORIES.CUSTOM) === cat);
    return acc;
  }, {});

  return (
    <header className="top-navbar print-hide">
      <div className="top-nav-left">
        <div className="tool-indicator">
          <div className="tool-icon-pill">🖋️</div>
          <div className="tool-title-group">
            <h2>Universal Cheque Book Printer</h2>
            <p>Indian CTS-2010 Precision Layouts ({Object.keys(banks).length} Banks Supported)</p>
          </div>
        </div>
      </div>

      <div className="top-nav-right">
        {/* Bank Layout Selector with Categorized Optgroups */}
        <div className="bank-select-wrapper">
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: activeBank.themeColor || '#3b82f6',
              display: 'inline-block',
              marginRight: '2px',
              boxShadow: `0 0 6px ${activeBank.themeColor || '#3b82f6'}`
            }}
          />
          <label htmlFor="bank-selector">Bank:</label>
          <select
            id="bank-selector"
            className="styled-select"
            value={activeBankId}
            onChange={(e) => onSelectBank(e.target.value)}
          >
            {categories.map((category) => {
              const bankList = groupedBanks[category];
              if (!bankList || bankList.length === 0) return null;
              return (
                <optgroup key={category} label={category}>
                  {bankList.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        </div>

        <button
          className="btn btn-secondary"
          onClick={onOpenCalibration}
          title="Print a zero-waste calibration sheet on plain paper to verify printer margins"
        >
          <span>📏</span> Test Calibration Sheet
        </button>

        <button
          className="btn btn-secondary"
          onClick={onResetCoords}
          title="Reset layout coordinates to default"
        >
          <span>🔄</span> Reset
        </button>

        <button
          className="btn btn-primary"
          onClick={onPrintCheque}
          title="Print physical cheque leaf"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print Cheque
        </button>

        <button
          className="btn-icon"
          onClick={onToggleTheme}
          title="Toggle Light/Dark Theme"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
