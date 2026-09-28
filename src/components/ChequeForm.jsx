import React from 'react';

export default function ChequeForm({
  formData,
  onChange,
  activeBankName,
  wordsPreview
}) {
  return (
    <section className="card print-hide">
      <div className="card-header">
        <div className="card-title">
          <span>✍️</span> Cheque Details
        </div>
        <span className="dimension-badge">{activeBankName}</span>
      </div>

      <div className="card-body">
        {/* Cheque No & Date */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="input-cheque-no">Cheque Number</label>
            <input
              type="text"
              id="input-cheque-no"
              className="form-input"
              placeholder="e.g. 000124"
              value={formData.chequeNo}
              onChange={(e) => onChange('chequeNo', e.target.value)}
            />
          </div>
          <div className="form-group">
            <div className="form-label-row">
              <label className="form-label" htmlFor="input-date">Cheque Date</label>
              <span className="field-hint">DD/MM/YYYY</span>
            </div>
            <input
              type="date"
              id="input-date"
              className="form-input"
              value={formData.date}
              onChange={(e) => onChange('date', e.target.value)}
            />
          </div>
        </div>

        {/* Payee Name */}
        <div className="form-group">
          <div className="form-label-row">
            <label className="form-label" htmlFor="input-payee">Payee Name</label>
            <span className="field-hint">Security Stars (***) Auto-applied</span>
          </div>
          <div className="input-with-icon">
            <span className="input-icon-left">👤</span>
            <input
              type="text"
              id="input-payee"
              className="form-input"
              placeholder="e.g. M/S HINDUSTAN SUPPLIERS"
              value={formData.payee}
              onChange={(e) => onChange('payee', e.target.value)}
            />
          </div>
        </div>

        {/* Amount in Figures */}
        <div className="form-group">
          <div className="form-label-row">
            <label className="form-label" htmlFor="input-amount">Amount (in Figures ₹)</label>
            <span className="field-hint">Auto Indian formatting</span>
          </div>
          <div className="input-with-icon">
            <span className="input-icon-left">₹</span>
            <input
              type="number"
              id="input-amount"
              className="form-input"
              placeholder="e.g. 125450"
              value={formData.amount}
              onChange={(e) => onChange('amount', e.target.value)}
              step="any"
            />
          </div>
        </div>

        {/* Auto-generated Amount in Words */}
        <div className="words-output-box">
          <div className="words-label">Amount in Words (Auto-Converted):</div>
          <div className="words-preview">
            {wordsPreview ? `*** ${wordsPreview} ***` : 'Enter an amount to see conversion'}
          </div>
        </div>

        {/* Security Crossings & Bearer Toggles */}
        <div className="toggle-row">
          <div className="toggle-info">
            <h4>A/C PAYEE ONLY Crossing</h4>
            <p>Stamp double diagonal lines on top-left</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={formData.acPayee}
              onChange={(e) => onChange('acPayee', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-info">
            <h4>Strike 'OR BEARER'</h4>
            <p>Draw line over 'Or Bearer' to enforce order payment</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={formData.strikeBearer}
              onChange={(e) => onChange('strikeBearer', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-info">
            <h4>NOT NEGOTIABLE Label</h4>
            <p>Add not-negotiable restriction to stamp</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={formData.notNegotiable}
              onChange={(e) => onChange('notNegotiable', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Signatory / Company Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="input-signatory">Signatory / Entity Name</label>
          <input
            type="text"
            id="input-signatory"
            className="form-input"
            placeholder="For YOUR COMPANY NAME"
            value={formData.signatoryText}
            onChange={(e) => onChange('signatoryText', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
