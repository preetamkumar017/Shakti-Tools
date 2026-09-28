import React, { useState, useEffect } from 'react';
import { numberToIndianWords, formatIndianCurrency } from '../utils/wordsConverter';

const DEFAULT_RECEIPT = {
  voucherType: 'receipt', // 'receipt' or 'payment'
  voucherNo: 'REC-2026/089',
  date: new Date().toISOString().split('T')[0],
  companyName: 'SHAKTI TOOLS & INDUSTRIAL ENTERPRISE',
  companyAddress: 'Plot No. 42, Industrial Area, Phase-II, New Delhi - 110020',
  companyPhone: '+91 98765 43210',
  partyName: 'M/s Global Tech Automation',
  amount: '45000',
  paymentMode: 'cheque', // 'cash', 'cheque', 'upi', 'neft'
  chequeNo: '004812',
  chequeDate: new Date().toISOString().split('T')[0],
  bankName: 'HDFC Bank Ltd, Sector 15 Branch',
  utrNo: 'UPI/291823719283',
  particulars: 'Being partial payment towards Machine Tooling Invoice #ST-2026/038',
  receiverName: 'Ramesh Kumar (Accounts Dept)'
};

export default function ReceiptTool() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('shakti_tools_receipt_data');
    return saved ? JSON.parse(saved) : DEFAULT_RECEIPT;
  });

  useEffect(() => {
    localStorage.setItem('shakti_tools_receipt_data', JSON.stringify(data));
  }, [data]);

  const update = (field, val) => setData(p => ({ ...p, [field]: val }));
  const numAmount = parseFloat(data.amount) || 0;
  const words = numberToIndianWords(numAmount);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm('Reset voucher to default sample?')) {
      setData(DEFAULT_RECEIPT);
    }
  };

  const isReceipt = data.voucherType === 'receipt';

  return (
    <div className="tool-view-container">
      {/* Form Pane */}
      <div className="tool-editor-pane print-hide">
        <div className="pane-header">
          <div>
            <h3>💰 Cash Receipt & Payment Voucher Maker</h3>
            <p>Official Indian Receipts with Revenue Stamp Box & Auto-Words</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleReset}>🔄 Reset</button>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>🖨️ Print / Save PDF</button>
          </div>
        </div>

        {/* Voucher Mode */}
        <div className="form-card">
          <div className="form-card-title">1. Voucher Type & Number</div>
          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Type</label>
              <select
                className="form-input"
                value={data.voucherType}
                onChange={(e) => update('voucherType', e.target.value)}
              >
                <option value="receipt">📥 Cash / Payment Receipt (रसीद)</option>
                <option value="payment">📤 Payment Voucher (भुगतान वाउचर)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Voucher / Receipt No</label>
              <input
                type="text"
                className="form-input"
                value={data.voucherNo}
                onChange={(e) => update('voucherNo', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={data.date}
                onChange={(e) => update('date', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="form-card">
          <div className="form-card-title">2. Organization / Issuer Details</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Company / Firm Name</label>
              <input
                type="text"
                className="form-input"
                value={data.companyName}
                onChange={(e) => update('companyName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input
                type="text"
                className="form-input"
                value={data.companyPhone}
                onChange={(e) => update('companyPhone', e.target.value)}
              />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Full Address</label>
              <input
                type="text"
                className="form-input"
                value={data.companyAddress}
                onChange={(e) => update('companyAddress', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Payment Particulars */}
        <div className="form-card">
          <div className="form-card-title">3. Transaction Details</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">{isReceipt ? 'Received with thanks from' : 'Paid to (Party Name)'}</label>
              <input
                type="text"
                className="form-input"
                value={data.partyName}
                onChange={(e) => update('partyName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                className="form-input"
                value={data.amount}
                onChange={(e) => update('amount', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Payment Mode</label>
              <select
                className="form-input"
                value={data.paymentMode}
                onChange={(e) => update('paymentMode', e.target.value)}
              >
                <option value="cash">💵 Cash</option>
                <option value="cheque">🖋️ Cheque / DD</option>
                <option value="upi">📱 UPI / Online Transfer</option>
                <option value="neft">🏦 NEFT / RTGS</option>
              </select>
            </div>

            {data.paymentMode === 'cheque' && (
              <>
                <div className="form-group">
                  <label className="form-label">Cheque / DD No</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.chequeNo}
                    onChange={(e) => update('chequeNo', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Cheque Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={data.chequeDate}
                    onChange={(e) => update('chequeDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Bank Name & Branch</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.bankName}
                    onChange={(e) => update('bankName', e.target.value)}
                  />
                </div>
              </>
            )}

            {(data.paymentMode === 'upi' || data.paymentMode === 'neft') && (
              <div className="form-group">
                <label className="form-label">Transaction / UTR Reference No</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.utrNo}
                  onChange={(e) => update('utrNo', e.target.value)}
                />
              </div>
            )}

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">On Account of / Being Payment For (Particulars)</label>
              <textarea
                className="form-input"
                rows="2"
                value={data.particulars}
                onChange={(e) => update('particulars', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Receiver / Handover By</label>
              <input
                type="text"
                className="form-input"
                value={data.receiverName}
                onChange={(e) => update('receiverName', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="tool-preview-pane">
        <div className="a4-print-document" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Main Voucher Leaf */}
          <div style={{ border: '2px solid #0f172a', padding: '22px', borderRadius: '8px', background: '#ffffff', position: 'relative' }}>
            {/* Top Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0f172a', paddingBottom: '12px', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                  {data.companyName}
                </h2>
                <p style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{data.companyAddress}</p>
                <p style={{ fontSize: '11px', color: '#0f172a', fontWeight: '600' }}>Phone: {data.companyPhone}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'inline-block', background: isReceipt ? '#059669' : '#d97706', color: '#ffffff', padding: '5px 14px', borderRadius: '4px', fontWeight: '800', fontSize: '13px', letterSpacing: '1px' }}>
                  {isReceipt ? 'RECEIPT VOUCHER' : 'PAYMENT VOUCHER'}
                </span>
                <p style={{ fontSize: '12px', marginTop: '6px' }}><strong>No:</strong> {data.voucherNo}</p>
                <p style={{ fontSize: '12px' }}><strong>Date:</strong> {data.date}</p>
              </div>
            </div>

            {/* Receipt Body Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px', color: '#1e293b' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', borderBottom: '1px dotted #94a3b8', paddingBottom: '4px' }}>
                <span style={{ color: '#475569', fontWeight: '600', minWidth: '160px' }}>
                  {isReceipt ? 'Received with thanks from:' : 'Paid to Mr./Ms./M/s:'}
                </span>
                <strong style={{ fontSize: '14px', color: '#0f172a', flex: 1 }}>{data.partyName}</strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', borderBottom: '1px dotted #94a3b8', paddingBottom: '4px' }}>
                <span style={{ color: '#475569', fontWeight: '600', minWidth: '160px' }}>The Sum of Rupees:</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', flex: 1, textTransform: 'capitalize' }}>
                  {words}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#475569', fontWeight: '600' }}>By:</span>
                  <span style={{ textTransform: 'uppercase', fontWeight: '700', background: '#f1f5f9', padding: '3px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    {data.paymentMode}
                  </span>
                </div>

                {data.paymentMode === 'cheque' && (
                  <>
                    <div><span>Cheque No: </span><strong>{data.chequeNo}</strong></div>
                    <div><span>Dated: </span><strong>{data.chequeDate}</strong></div>
                    <div><span>Drawn on: </span><strong>{data.bankName}</strong></div>
                  </>
                )}

                {(data.paymentMode === 'upi' || data.paymentMode === 'neft') && (
                  <div><span>Ref / UTR: </span><strong>{data.utrNo}</strong></div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', borderBottom: '1px dotted #94a3b8', paddingBottom: '4px' }}>
                <span style={{ color: '#475569', fontWeight: '600', minWidth: '160px' }}>On Account of:</span>
                <span style={{ flex: 1, color: '#334155' }}>{data.particulars}</span>
              </div>
            </div>

            {/* Bottom Row: Amount Box, Revenue Stamp & Signatures */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
              {/* Big Amount Box */}
              <div style={{ border: '2px solid #0f172a', padding: '8px 18px', borderRadius: '6px', background: '#f8fafc', display: 'inline-flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#475569' }}>₹</span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', fontFamily: "'JetBrains Mono', monospace" }}>
                  {numAmount.toLocaleString('en-IN')}/-
                </span>
              </div>

              {/* Revenue Stamp */}
              {isReceipt && (
                <div style={{ width: '70px', height: '80px', border: '1px dashed #ef4444', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontSize: '9px', textAlign: 'center', padding: '4px', background: 'rgba(239, 68, 68, 0.04)' }}>
                  <span style={{ fontWeight: '800', fontSize: '10px' }}>₹ 1</span>
                  <span>REVENUE STAMP</span>
                </div>
              )}

              {/* Signatures */}
              <div style={{ display: 'flex', gap: '30px', textAlign: 'center' }}>
                <div>
                  <div style={{ borderTop: '1px dashed #94a3b8', width: '130px', paddingTop: '4px', fontSize: '10px', color: '#64748b', marginTop: '40px' }}>
                    Receiver's Signature
                  </div>
                </div>
                <div>
                  <div style={{ borderTop: '1px dashed #94a3b8', width: '150px', paddingTop: '4px', fontSize: '10px', color: '#64748b', marginTop: '40px' }}>
                    Authorized Signatory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
