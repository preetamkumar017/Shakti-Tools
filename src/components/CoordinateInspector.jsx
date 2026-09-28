import React from 'react';

const ELEMENT_LABELS = {
  payee: 'Payee Name',
  date: 'Cheque Date (8-Box Grid)',
  wordsLine1: 'Amount in Words (Line 1)',
  wordsLine2: 'Amount in Words (Line 2)',
  amountNum: 'Amount in Figures (₹)',
  crossing: 'A/C Payee Crossing',
  bearerStrike: 'Strike Or Bearer',
  signatory: 'Authorized Signatory'
};

export default function CoordinateInspector({
  activeBank,
  selectedKey,
  coordinates,
  onNudge,
  onUpdateCoordField,
  onSavePreset
}) {
  const coord = coordinates[selectedKey] || { x: 0, y: 0 };
  const label = ELEMENT_LABELS[selectedKey] || selectedKey;
  const isDate = selectedKey === 'date';

  return (
    <div className="coordinates-bar print-hide" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div className="coord-indicator">
          <div className="coord-item">
            <span>Selected:</span>
            <strong>{label}</strong>
          </div>
          <div className="coord-item">
            <span>X:</span>
            <strong>{coord.x?.toFixed(1) || '0.0'} mm</strong>
            <button
              className="coord-nudge-btn"
              onClick={() => onNudge(selectedKey, -0.5, 0)}
              title="Move Left 0.5mm"
            >
              ◀
            </button>
            <button
              className="coord-nudge-btn"
              onClick={() => onNudge(selectedKey, 0.5, 0)}
              title="Move Right 0.5mm"
            >
              ▶
            </button>
          </div>
          <div className="coord-item">
            <span>Y:</span>
            <strong>{coord.y?.toFixed(1) || '0.0'} mm</strong>
            <button
              className="coord-nudge-btn"
              onClick={() => onNudge(selectedKey, 0, -0.5)}
              title="Move Up 0.5mm"
            >
              ▲
            </button>
            <button
              className="coord-nudge-btn"
              onClick={() => onNudge(selectedKey, 0, 0.5)}
              title="Move Down 0.5mm"
            >
              ▼
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="dimension-badge" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            Leaf: {activeBank?.chequeWidth}mm × {activeBank?.chequeHeight}mm
          </span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={onSavePreset}
            title="Save fine-tuned coordinates for this bank"
          >
            💾 Save Preset
          </button>
        </div>
      </div>

      {/* Special Date Grid Fine-Tuning Drawer when Date is selected */}
      {isDate && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            paddingTop: '8px',
            borderTop: '1px solid var(--border-glass)',
            flexWrap: 'wrap',
            fontSize: '12px',
            color: 'var(--text-muted)'
          }}
        >
          <span style={{ fontWeight: '700', color: '#60a5fa' }}>📅 Date Box Settings:</span>

          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Box Width:</span>
            <input
              type="number"
              step="0.1"
              value={coord.boxWidth || 4.5}
              onChange={(e) => onUpdateCoordField('date', 'boxWidth', parseFloat(e.target.value) || 4.5)}
              style={{
                width: '56px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-main)',
                padding: '3px 6px',
                borderRadius: '4px'
              }}
            />
            <span>mm</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Digit Gap:</span>
            <input
              type="number"
              step="0.1"
              value={coord.boxGap || 0.8}
              onChange={(e) => onUpdateCoordField('date', 'boxGap', parseFloat(e.target.value) || 0.8)}
              style={{
                width: '56px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-main)',
                padding: '3px 6px',
                borderRadius: '4px'
              }}
            />
            <span>mm</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Month Gap (DD-MM):</span>
            <input
              type="number"
              step="0.1"
              value={coord.groupGap || 2.5}
              onChange={(e) => onUpdateCoordField('date', 'groupGap', parseFloat(e.target.value) || 2.5)}
              style={{
                width: '52px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-main)',
                padding: '3px 6px',
                borderRadius: '4px'
              }}
            />
            <span>mm</span>
          </label>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.12)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.35)', flexWrap: 'wrap' }}>
            <span style={{ color: '#60a5fa', fontWeight: '700' }}>Only Year Text Shift:</span>
            <input
              type="number"
              step="0.1"
              value={(coord.yearGap !== undefined && coord.yearGap <= 4.5) ? coord.yearGap : 3.0}
              onChange={(e) => onUpdateCoordField('date', 'yearGap', parseFloat(e.target.value) || 3.0)}
              style={{
                width: '54px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(59, 130, 246, 0.5)',
                color: '#ffffff',
                fontWeight: '700',
                padding: '3px 6px',
                borderRadius: '4px',
                textAlign: 'center',
                fontFamily: "'JetBrains Mono', monospace"
              }}
            />
            <span style={{ color: 'var(--text-muted)' }}>mm</span>
            <button
              className="coord-nudge-btn"
              onClick={() => {
                const cur = (coord.yearGap !== undefined && coord.yearGap <= 4.5) ? coord.yearGap : 3.0;
                onUpdateCoordField('date', 'yearGap', Math.max(0.5, parseFloat((cur - 0.2).toFixed(1))));
              }}
              title="Shift Year Text Left 0.2mm"
            >
              ◀
            </button>
            <button
              className="coord-nudge-btn"
              onClick={() => {
                const cur = (coord.yearGap !== undefined && coord.yearGap <= 4.5) ? coord.yearGap : 3.0;
                onUpdateCoordField('date', 'yearGap', parseFloat((cur + 0.2).toFixed(1)));
              }}
              title="Shift Year Text Right 0.2mm"
            >
              ▶
            </button>
            <div style={{ display: 'flex', gap: '4px', marginLeft: '4px' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ padding: '2px 6px', fontSize: '10px' }}
                onClick={() => onUpdateCoordField('date', 'yearGap', 2.5)}
                title="Normal gap (2.5mm)"
              >
                2.5mm
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ padding: '2px 6px', fontSize: '10px', borderColor: '#3b82f6', color: '#60a5fa' }}
                onClick={() => onUpdateCoordField('date', 'yearGap', 3.0)}
                title="Subtle shift (3.0mm)"
              >
                3.0mm
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ padding: '2px 6px', fontSize: '10px' }}
                onClick={() => onUpdateCoordField('date', 'yearGap', 3.2)}
                title="Wider shift (3.2mm)"
              >
                3.2mm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
