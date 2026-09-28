import React, { useState } from 'react';
import { formatIndianCurrency, numberToIndianWords } from '../utils/wordsConverter';

export default function GstCalculatorTool() {
  const [calcType, setCalcType] = useState('add'); // 'add', 'remove', 'margin'
  const [amount, setAmount] = useState('10000');
  const [gstRate, setGstRate] = useState('18');
  const [copiedKey, setCopiedKey] = useState(null);

  // Margin Calculator states
  const [costPrice, setCostPrice] = useState('5000');
  const [marginPercent, setMarginPercent] = useState('25');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const numAmt = parseFloat(amount) || 0;
  const rate = parseFloat(gstRate) || 0;

  // Add GST calculations
  const addGstTax = (numAmt * rate) / 100;
  const addGstTotal = numAmt + addGstTax;

  // Remove GST calculations (Reverse extraction)
  // Base = Gross / (1 + Rate/100)
  const removeGstBase = numAmt / (1 + rate / 100);
  const removeGstTax = numAmt - removeGstBase;

  // Margin calculations
  const cp = parseFloat(costPrice) || 0;
  const mp = parseFloat(marginPercent) || 0;
  // Selling Price with Margin: SP = CP / (1 - Margin/100) or Markup: CP * (1 + Markup/100)
  const marginProfit = (cp * mp) / (100 - mp);
  const sellingPriceMargin = cp + (mp < 100 ? marginProfit : 0);
  const markupProfit = (cp * mp) / 100;
  const sellingPriceMarkup = cp + markupProfit;

  return (
    <div className="tool-view-container" style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🧮</span> Indian GST & Business Profit Margin Calculator
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
          Instant Forward & Reverse GST Tax Breakdown with CGST/SGST Split and Commercial Profit Margins
        </p>
      </div>

      {/* Mode Switch Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <button
          className={`btn ${calcType === 'add' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCalcType('add')}
        >
          ➕ Add GST (Exclusive to Inclusive)
        </button>
        <button
          className={`btn ${calcType === 'remove' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCalcType('remove')}
        >
          ➖ Extract / Remove GST (From MRP)
        </button>
        <button
          className={`btn ${calcType === 'margin' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCalcType('margin')}
        >
          📈 Profit Margin & Markup
        </button>
      </div>

      {/* Main Calculator Body */}
      {calcType !== 'margin' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
          {/* Inputs Card */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
              {calcType === 'add' ? '1. Enter Base / Net Amount' : '1. Enter Total MRP / Gross Amount'}
            </h3>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">
                {calcType === 'add' ? 'Initial Net Amount (₹)' : 'Total Gross Amount including GST (₹)'}
              </label>
              <div className="input-with-icon">
                <span className="input-icon">₹</span>
                <input
                  type="number"
                  className="form-input"
                  style={{ fontSize: '18px', fontWeight: '700', paddingLeft: '32px' }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Select Standard GST Slab Rate (%)</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {[0, 5, 12, 18, 28].map((slab) => (
                  <button
                    key={slab}
                    type="button"
                    className={`btn ${rate === slab ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: '1', minWidth: '60px', padding: '8px 12px' }}
                    onClick={() => setGstRate(String(slab))}
                  >
                    {slab}%
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Or Custom Rate:</span>
                <input
                  type="number"
                  className="form-input"
                  style={{ width: '80px' }}
                  value={gstRate}
                  onChange={(e) => setGstRate(e.target.value)}
                />
                <span>%</span>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--primary-glow)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>Detailed Tax Breakdown</h3>
                <span className="badge badge-active">{rate}% GST</span>
              </div>

              {calcType === 'add' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-glass)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Net Base Amount:</span>
                    <strong style={{ fontSize: '16px' }}>₹ {numAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-glass)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>CGST ({(rate / 2).toFixed(1)}%):</span>
                    <span style={{ color: '#38bdf8' }}>₹ {(addGstTax / 2).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-glass)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>SGST / UTGST ({(rate / 2).toFixed(1)}%):</span>
                    <span style={{ color: '#38bdf8' }}>₹ {(addGstTax / 2).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-glass)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Total GST Tax Amount:</span>
                    <strong style={{ color: '#f59e0b' }}>₹ {addGstTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '2px solid var(--primary)', marginTop: '8px', fontSize: '18px' }}>
                    <span style={{ fontWeight: '800' }}>Gross Amount (Payable):</span>
                    <strong style={{ color: '#10b981', fontFamily: "'JetBrains Mono', monospace" }}>
                      ₹ {addGstTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-glass)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Gross Amount (MRP):</span>
                    <strong style={{ fontSize: '16px' }}>₹ {numAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-glass)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Extracted CGST ({(rate / 2).toFixed(1)}%):</span>
                    <span style={{ color: '#38bdf8' }}>₹ {(removeGstTax / 2).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-glass)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Extracted SGST ({(rate / 2).toFixed(1)}%):</span>
                    <span style={{ color: '#38bdf8' }}>₹ {(removeGstTax / 2).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-glass)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Total Embedded Tax:</span>
                    <strong style={{ color: '#f59e0b' }}>₹ {removeGstTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '2px solid var(--primary)', marginTop: '8px', fontSize: '18px' }}>
                    <span style={{ fontWeight: '800' }}>Actual Net Base Price:</span>
                    <strong style={{ color: '#10b981', fontFamily: "'JetBrains Mono', monospace" }}>
                      ₹ {removeGstBase.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            <button
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: '20px' }}
              onClick={() => {
                const total = calcType === 'add' ? addGstTotal.toFixed(2) : removeGstBase.toFixed(2);
                copyToClipboard(total, 'result');
              }}
            >
              {copiedKey === 'result' ? '✅ Copied to Clipboard!' : '📋 Copy Final Amount'}
            </button>
          </div>
        </div>
      ) : (
        /* Margin & Markup Calculator */
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
              1. Cost Price & Target Margin %
            </h3>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Cost Price / Purchase Price (CP)</label>
              <div className="input-with-icon">
                <span className="input-icon">₹</span>
                <input
                  type="number"
                  className="form-input"
                  style={{ fontSize: '18px', fontWeight: '700', paddingLeft: '32px' }}
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Target Margin / Markup (%)</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {[10, 15, 20, 25, 30, 40, 50].map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`btn ${mp === m ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: '1', minWidth: '55px', padding: '6px 10px' }}
                    onClick={() => setMarginPercent(String(m))}
                  >
                    {m}%
                  </button>
                ))}
              </div>
              <input
                type="number"
                className="form-input"
                value={marginPercent}
                onChange={(e) => setMarginPercent(e.target.value)}
              />
            </div>
          </div>

          <div className="card" style={{ padding: '24px', border: '1px solid var(--primary-glow)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)', marginBottom: '16px' }}>
              Pricing Comparison
            </h3>

            <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', color: '#60a5fa' }}>Option A: Gross Margin ({mp}%)</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>% of Selling Price</span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#10b981', margin: '6px 0', fontFamily: "'JetBrains Mono', monospace" }}>
                ₹ {sellingPriceMargin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Profit: ₹ {marginProfit.toFixed(2)} | Revenue Share: {mp}%
              </p>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', color: '#34d399' }}>Option B: Cost Markup ({mp}%)</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>% on Cost Price</span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#34d399', margin: '6px 0', fontFamily: "'JetBrains Mono', monospace" }}>
                ₹ {sellingPriceMarkup.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Profit: ₹ {markupProfit.toFixed(2)} | Added to Cost: {mp}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
