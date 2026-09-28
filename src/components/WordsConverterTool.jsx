import React, { useState } from 'react';
import { numberToIndianWords, splitChequeWords, formatIndianCurrency } from '../utils/wordsConverter';

const DENOMINATIONS = [500, 200, 100, 50, 20, 10, 5, 2, 1];

export default function WordsConverterTool() {
  const [amount, setAmount] = useState('184750');
  const [denominations, setDenominations] = useState({
    500: 300,
    200: 120,
    100: 80,
    50: 40,
    20: 35,
    10: 50,
    5: 0,
    2: 0,
    1: 0
  });

  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const words = numberToIndianWords(amount);
  const wordsSplit = splitChequeWords(words, 48);

  // Cash Tally calculations
  const totalCashNotes = Object.entries(denominations).reduce((acc, [note, count]) => {
    return acc + (Number(count) || 0);
  }, 0);

  const totalCashAmount = Object.entries(denominations).reduce((acc, [note, count]) => {
    return acc + (Number(note) * (Number(count) || 0));
  }, 0);

  const cashWords = numberToIndianWords(totalCashAmount);

  const handleDenomChange = (denom, val) => {
    setDenominations(p => ({ ...p, [denom]: Math.max(0, parseInt(val) || 0) }));
  };

  const handleResetCash = () => {
    setDenominations({ 500: 0, 200: 0, 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 });
  };

  return (
    <div className="tool-view-container" style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🔤</span> Number to Indian Words & Cash Denomination Counter
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
          Convert financial amounts into standard Indian words (Lakhs & Crores) and count daily cashier cash closing tally.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Section 1: Number to Words */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
              1. Convert Figure to Words
            </h3>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Enter Numeric Amount (₹)</label>
              <div className="input-with-icon">
                <span className="input-icon">₹</span>
                <input
                  type="number"
                  className="form-input"
                  style={{ fontSize: '20px', fontWeight: '800', paddingLeft: '32px' }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#60a5fa' }}>Standard Banking Words Format:</span>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '2px 8px', fontSize: '11px' }}
                  onClick={() => copyToClipboard(words, 'main-words')}
                >
                  {copiedKey === 'main-words' ? '✅ Copied' : '📋 Copy Words'}
                </button>
              </div>
              <p style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.4', textTransform: 'capitalize' }}>
                {words}
              </p>
            </div>

            {/* Cheque 2-Line Split */}
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Cheque Leaf 2-Line Print Split:
              </span>
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '6px 10px', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Line 1:</span>
                  <strong style={{ color: '#38bdf8' }}>{wordsSplit.line1 || '—'}</strong>
                </div>
                {wordsSplit.line2 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '6px 10px', borderRadius: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Line 2:</span>
                    <strong style={{ color: '#38bdf8' }}>{wordsSplit.line2}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Cash Denomination Calculator */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
              2. Cash Register & Note Counter
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={handleResetCash}>Clear</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            {DENOMINATIONS.map((denom) => {
              const count = denominations[denom] || 0;
              const subtotal = denom * count;
              return (
                <div key={denom} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px', gap: '10px', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '6px' }}>
                  <span style={{ fontWeight: '800', color: '#10b981', fontFamily: "'JetBrains Mono', monospace" }}>
                    ₹ {denom} ×
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Count"
                    className="form-input"
                    style={{ padding: '4px 8px', fontSize: '13px', textAlign: 'center' }}
                    value={count || ''}
                    onChange={(e) => handleDenomChange(denom, e.target.value)}
                  />
                  <span style={{ textAlign: 'right', fontWeight: '700', color: 'var(--text-main)', fontFamily: "'JetBrains Mono', monospace" }}>
                    ₹ {subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Cash Total Summary */}
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', padding: '14px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Notes: {totalCashNotes} Pcs</span>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#10b981', fontFamily: "'JetBrains Mono', monospace" }}>
                  ₹ {totalCashAmount.toLocaleString('en-IN')}/-
                </div>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  const summary = `CASH CLOSING SUMMARY\nTotal Notes: ${totalCashNotes}\nTotal Amount: ₹ ${totalCashAmount}\nWords: ${cashWords}`;
                  copyToClipboard(summary, 'cash-summary');
                }}
              >
                {copiedKey === 'cash-summary' ? '✅ Copied' : '📋 Copy Slip'}
              </button>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'capitalize' }}>
              {cashWords}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
