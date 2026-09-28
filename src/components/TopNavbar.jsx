import React from 'react';
import { BANK_CATEGORIES } from '../utils/presets';
import { TOOLS_CONFIG } from './Sidebar';

export default function TopNavbar({
  activeTool = 'cheque',
  banks,
  activeBankId,
  onSelectBank,
  onOpenCalibration,
  onResetCoords,
  onPrintCheque,
  theme,
  onToggleTheme
}) {
  const activeBank = banks?.[activeBankId] || banks?.['sbi'] || {};
  const currentTool = TOOLS_CONFIG.find(t => t.id === activeTool) || TOOLS_CONFIG[0];

  // Group banks by category for Cheque tool
  const categories = Object.values(BANK_CATEGORIES);
  const groupedBanks = categories.reduce((acc, cat) => {
    acc[cat] = Object.values(banks || {}).filter((b) => (b.category || BANK_CATEGORIES.CUSTOM) === cat);
    return acc;
  }, {});

  const isCheque = activeTool === 'cheque';
  const isPrintableDoc = ['invoice', 'receipt', 'salary', 'quotation', 'challan'].includes(activeTool);

  return (
    <header className="top-navbar print-hide">
      <div className="top-nav-left">
        <div className="tool-indicator">
          <div className="tool-icon-pill">{currentTool.icon}</div>
          <div className="tool-title-group">
            <h2>{currentTool.name}</h2>
            <p>
              {isCheque
                ? `Indian CTS-2010 Precision Layouts (${Object.keys(banks || {}).length} Banks Supported)`
                : `Shakti Tools Enterprise Suite — Pro Business Utility`}
            </p>
          </div>
        </div>
      </div>

      <div className="top-nav-right">
        {isCheque ? (
          <>
            {/* Bank Layout Selector */}
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
              <span>📏</span> Test Sheet
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
          </>
        ) : isPrintableDoc ? (
          <button
            className="btn btn-primary"
            onClick={() => window.print()}
            title="Print or Save PDF"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print / Save PDF
          </button>
        ) : null}

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
