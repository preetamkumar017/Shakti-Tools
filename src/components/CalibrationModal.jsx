import React from 'react';

export default function CalibrationModal({
  isOpen,
  onClose,
  offsetX,
  offsetY,
  onChangeOffset,
  onPrintTestSheet
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active print-hide">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3>📏 Printer Calibration & Test Sheet</h3>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
            Bina kisi real cheque ko waste kiye apne printer ka alignment test karein!
          </p>
          <div className="calibration-preview-box">
            <svg viewBox="0 0 400 180" width="100%" height="160">
              <rect x="10" y="10" width="380" height="160" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4"/>
              <text x="200" y="45" fontFamily="'Inter', sans-serif" fontSize="12" fill="#93c5fd" textAnchor="middle" fontWeight="700">
                TEST PRINT SHEET (203mm x 89mm)
              </text>
              <line x1="30" y1="90" x2="370" y2="90" stroke="#3b82f6" strokeWidth="1"/>
              <text x="200" y="115" fontFamily="'Inter', sans-serif" fontSize="11" fill="#cbd5e1" textAnchor="middle">
                Is page ko standard A4 paper par print karein
              </text>
              <text x="200" y="135" fontFamily="'Inter', sans-serif" fontSize="10" fill="#94a3b8" textAnchor="middle">
                aur apne real physical cheque ko upar rakhkar lines verify karein.
              </text>
            </svg>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '8px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="offset-x">Global Horizontal Offset (mm)</label>
              <input
                type="number"
                id="offset-x"
                className="form-input"
                value={offsetX}
                onChange={(e) => onChangeOffset('x', parseFloat(e.target.value) || 0)}
                step="0.5"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="offset-y">Global Vertical Offset (mm)</label>
              <input
                type="number"
                id="offset-y"
                className="form-input"
                value={offsetY}
                onChange={(e) => onChangeOffset('y', parseFloat(e.target.value) || 0)}
                step="0.5"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={onPrintTestSheet}>
            🖨️ Print Test Sheet
          </button>
        </div>
      </div>
    </div>
  );
}
