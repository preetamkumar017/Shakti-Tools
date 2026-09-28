import React, { useState, useEffect } from 'react';
import { numberToIndianWords, formatIndianCurrency } from '../utils/wordsConverter';

const INDIAN_STATES = [
  { code: '01', name: 'Jammu & Kashmir' },
  { code: '02', name: 'Himachal Pradesh' },
  { code: '03', name: 'Punjab' },
  { code: '04', name: 'Chandigarh' },
  { code: '05', name: 'Uttarakhand' },
  { code: '06', name: 'Haryana' },
  { code: '07', name: 'Delhi' },
  { code: '08', name: 'Rajasthan' },
  { code: '09', name: 'Uttar Pradesh' },
  { code: '10', name: 'Bihar' },
  { code: '19', name: 'West Bengal' },
  { code: '20', name: 'Jharkhand' },
  { code: '21', name: 'Odisha' },
  { code: '22', name: 'Chhattisgarh' },
  { code: '23', name: 'Madhya Pradesh' },
  { code: '24', name: 'Gujarat' },
  { code: '27', name: 'Maharashtra' },
  { code: '29', name: 'Karnataka' },
  { code: '32', name: 'Kerala' },
  { code: '33', name: 'Tamil Nadu' },
  { code: '36', name: 'Telangana' },
  { code: '37', name: 'Andhra Pradesh' },
];

const DEFAULT_INVOICE = {
  invoiceNo: 'ST-2026/041',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
  seller: {
    name: 'SHAKTI TOOLS & INDUSTRIAL ENTERPRISE',
    address: 'Plot No. 42, Industrial Area, Phase-II, New Delhi - 110020',
    gstin: '07AAAAA0000A1Z5',
    pan: 'AAAAA0000A',
    stateCode: '07',
    stateName: 'Delhi',
    phone: '+91 98765 43210',
    email: 'billing@shaktitools.in'
  },
  buyer: {
    name: 'BHARAT MANUFACTURING PVT LTD',
    address: 'Sector 18, Udyog Vihar, Gurugram, Haryana - 122015',
    gstin: '06BBBBB1111B1Z2',
    stateCode: '06',
    stateName: 'Haryana',
    phone: '+91 91234 56789'
  },
  items: [
    { id: 1, desc: 'Heavy Duty CNC Lathe Tooling Kit (Grade A)', hsn: '8466', qty: 2, unit: 'Set', rate: 24500, gstRate: 18 },
    { id: 2, desc: 'Precision Carbide End Mill Inserts (Pack of 10)', hsn: '8207', qty: 5, unit: 'Box', rate: 3200, gstRate: 18 },
    { id: 3, desc: 'Industrial Synthetic Cutting Coolant (20L Drum)', hsn: '3403', qty: 1, unit: 'Drum', rate: 5800, gstRate: 18 }
  ],
  bankDetails: {
    bankName: 'State Bank of India',
    accountNo: '30291827461',
    ifsc: 'SBIN0001234',
    branch: 'Okhla Industrial Estate Branch, New Delhi'
  },
  terms: '1. Payment due within 15 days of invoice date.\n2. Goods once sold will not be taken back without prior inspection.\n3. Subject to Delhi Jurisdiction only.'
};

export default function InvoiceTool() {
  const [invoice, setInvoice] = useState(() => {
    const saved = localStorage.getItem('shakti_tools_invoice_data');
    return saved ? JSON.parse(saved) : DEFAULT_INVOICE;
  });

  useEffect(() => {
    localStorage.setItem('shakti_tools_invoice_data', JSON.stringify(invoice));
  }, [invoice]);

  const updateSeller = (field, val) => setInvoice(p => ({ ...p, seller: { ...p.seller, [field]: val } }));
  const updateBuyer = (field, val) => setInvoice(p => ({ ...p, buyer: { ...p.buyer, [field]: val } }));

  const isInterState = invoice.seller.stateCode !== invoice.buyer.stateCode;

  const addItem = () => {
    setInvoice(p => ({
      ...p,
      items: [
        ...p.items,
        { id: Date.now(), desc: '', hsn: '', qty: 1, unit: 'Nos', rate: 0, gstRate: 18 }
      ]
    }));
  };

  const updateItem = (id, field, val) => {
    setInvoice(p => ({
      ...p,
      items: p.items.map(it => it.id === id ? { ...it, [field]: val } : it)
    }));
  };

  const removeItem = (id) => {
    if (invoice.items.length <= 1) return;
    setInvoice(p => ({ ...p, items: p.items.filter(it => it.id !== id) }));
  };

  // Calculations
  const calculatedItems = invoice.items.map(it => {
    const taxable = (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0);
    const gstRate = parseFloat(it.gstRate) || 0;
    const taxAmt = (taxable * gstRate) / 100;
    return {
      ...it,
      taxable,
      taxAmt,
      total: taxable + taxAmt
    };
  });

  const totalTaxable = calculatedItems.reduce((acc, it) => acc + it.taxable, 0);
  const totalTax = calculatedItems.reduce((acc, it) => acc + it.taxAmt, 0);
  const grandTotal = totalTaxable + totalTax;
  const roundedGrandTotal = Math.round(grandTotal);
  const roundOff = (roundedGrandTotal - grandTotal).toFixed(2);
  const words = numberToIndianWords(roundedGrandTotal);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm('Reset invoice to default sample template?')) {
      setInvoice(DEFAULT_INVOICE);
    }
  };

  return (
    <div className="tool-view-container">
      {/* Left Form Panel */}
      <div className="tool-editor-pane print-hide">
        <div className="pane-header">
          <div>
            <h3>🧾 GST Tax Invoice Maker</h3>
            <p>Generate B2B / B2C GST Compliant Invoices with Auto-Taxation</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleReset}>🔄 Reset</button>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>🖨️ Print / Save PDF</button>
          </div>
        </div>

        {/* Invoice Metadata */}
        <div className="form-card">
          <div className="form-card-title">1. Invoice Details</div>
          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Invoice Number</label>
              <input
                type="text"
                className="form-input"
                value={invoice.invoiceNo}
                onChange={(e) => setInvoice({ ...invoice, invoiceNo: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Invoice Date</label>
              <input
                type="date"
                className="form-input"
                value={invoice.date}
                onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-input"
                value={invoice.dueDate}
                onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="form-card">
          <div className="form-card-title">2. Seller Details (Your Company)</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-input"
                value={invoice.seller.name}
                onChange={(e) => updateSeller('name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Seller GSTIN</label>
              <input
                type="text"
                className="form-input"
                value={invoice.seller.gstin}
                onChange={(e) => updateSeller('gstin', e.target.value.toUpperCase())}
              />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Full Address</label>
              <input
                type="text"
                className="form-input"
                value={invoice.seller.address}
                onChange={(e) => updateSeller('address', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <select
                className="form-input"
                value={invoice.seller.stateCode}
                onChange={(e) => {
                  const st = INDIAN_STATES.find(s => s.code === e.target.value);
                  updateSeller('stateCode', e.target.value);
                  if (st) updateSeller('stateName', st.name);
                }}
              >
                {INDIAN_STATES.map(s => (
                  <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Phone / Email</label>
              <input
                type="text"
                className="form-input"
                value={invoice.seller.phone}
                onChange={(e) => updateSeller('phone', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Buyer Info */}
        <div className="form-card">
          <div className="form-card-title">3. Buyer / Bill To</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Client / Buyer Name</label>
              <input
                type="text"
                className="form-input"
                value={invoice.buyer.name}
                onChange={(e) => updateBuyer('name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Buyer GSTIN (Optional for B2C)</label>
              <input
                type="text"
                className="form-input"
                value={invoice.buyer.gstin}
                onChange={(e) => updateBuyer('gstin', e.target.value.toUpperCase())}
              />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Billing Address</label>
              <input
                type="text"
                className="form-input"
                value={invoice.buyer.address}
                onChange={(e) => updateBuyer('address', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Buyer State</label>
              <select
                className="form-input"
                value={invoice.buyer.stateCode}
                onChange={(e) => {
                  const st = INDIAN_STATES.find(s => s.code === e.target.value);
                  updateBuyer('stateCode', e.target.value);
                  if (st) updateBuyer('stateName', st.name);
                }}
              >
                {INDIAN_STATES.map(s => (
                  <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Supply Type Detected</label>
              <div style={{ padding: '8px 12px', background: isInterState ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)', borderRadius: '6px', color: isInterState ? '#fbbf24' : '#34d399', fontWeight: '700', fontSize: '13px' }}>
                {isInterState ? '⚡ Inter-State (IGST Applied)' : '🔹 Intra-State (CGST + SGST Split)'}
              </div>
            </div>
          </div>
        </div>

        {/* Item Rows */}
        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div className="form-card-title" style={{ margin: 0 }}>4. Itemized Goods & Services</div>
            <button className="btn btn-secondary btn-sm" onClick={addItem}>➕ Add Item</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {invoice.items.map((it, idx) => (
              <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.2fr 1fr auto', gap: '8px', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                <input
                  type="text"
                  placeholder="Item Description"
                  className="form-input"
                  style={{ fontSize: '12px' }}
                  value={it.desc}
                  onChange={(e) => updateItem(it.id, 'desc', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="HSN/SAC"
                  className="form-input"
                  style={{ fontSize: '12px' }}
                  value={it.hsn}
                  onChange={(e) => updateItem(it.id, 'hsn', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Qty"
                  className="form-input"
                  style={{ fontSize: '12px' }}
                  value={it.qty}
                  onChange={(e) => updateItem(it.id, 'qty', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Unit"
                  className="form-input"
                  style={{ fontSize: '12px' }}
                  value={it.unit}
                  onChange={(e) => updateItem(it.id, 'unit', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Rate (₹)"
                  className="form-input"
                  style={{ fontSize: '12px' }}
                  value={it.rate}
                  onChange={(e) => updateItem(it.id, 'rate', e.target.value)}
                />
                <select
                  className="form-input"
                  style={{ fontSize: '12px' }}
                  value={it.gstRate}
                  onChange={(e) => updateItem(it.id, 'gstRate', e.target.value)}
                >
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeItem(it.id)}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px' }}
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bank & Terms */}
        <div className="form-card">
          <div className="form-card-title">5. Bank Details & Terms</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Bank Name & Branch</label>
              <input
                type="text"
                className="form-input"
                value={invoice.bankDetails.bankName}
                onChange={(e) => setInvoice({ ...invoice, bankDetails: { ...invoice.bankDetails, bankName: e.target.value } })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Account Number</label>
              <input
                type="text"
                className="form-input"
                value={invoice.bankDetails.accountNo}
                onChange={(e) => setInvoice({ ...invoice, bankDetails: { ...invoice.bankDetails, accountNo: e.target.value } })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">IFSC Code</label>
              <input
                type="text"
                className="form-input"
                value={invoice.bankDetails.ifsc}
                onChange={(e) => setInvoice({ ...invoice, bankDetails: { ...invoice.bankDetails, ifsc: e.target.value.toUpperCase() } })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Terms & Notes</label>
              <textarea
                className="form-input"
                rows="2"
                value={invoice.terms}
                onChange={(e) => setInvoice({ ...invoice, terms: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Live Print Preview Pane */}
      <div className="tool-preview-pane">
        <div className="a4-print-document invoice-sheet">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f172a', paddingBottom: '14px', marginBottom: '14px' }}>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                {invoice.seller.name}
              </h1>
              <p style={{ fontSize: '11px', color: '#475569', maxWidth: '380px', lineHeight: '1.4' }}>{invoice.seller.address}</p>
              <p style={{ fontSize: '11px', color: '#0f172a', fontWeight: '700', marginTop: '4px' }}>
                GSTIN: {invoice.seller.gstin} | PAN: {invoice.seller.pan} | State: {invoice.seller.stateName} ({invoice.seller.stateCode})
              </p>
              <p style={{ fontSize: '11px', color: '#475569' }}>Phone: {invoice.seller.phone} | Email: {invoice.seller.email}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-block', background: '#0f172a', color: '#ffffff', padding: '6px 14px', borderRadius: '4px', fontWeight: '800', fontSize: '14px', letterSpacing: '1px' }}>
                TAX INVOICE
              </div>
              <div style={{ marginTop: '8px', fontSize: '12px' }}>
                <p><strong>Invoice No:</strong> {invoice.invoiceNo}</p>
                <p><strong>Date:</strong> {invoice.date}</p>
                <p><strong>Due Date:</strong> {invoice.dueDate}</p>
                <p><strong>Place of Supply:</strong> {invoice.buyer.stateName} ({invoice.buyer.stateCode})</p>
              </div>
            </div>
          </div>

          {/* Billed To Box */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '10px 14px', marginBottom: '16px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.8px' }}>Billed To / Consignee:</span>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginTop: '2px' }}>{invoice.buyer.name}</h3>
            <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.3' }}>{invoice.buyer.address}</p>
            <p style={{ fontSize: '11px', color: '#0f172a', fontWeight: '600', marginTop: '2px' }}>
              GSTIN: {invoice.buyer.gstin || 'URP (Unregistered Person)'} | State: {invoice.buyer.stateName} ({invoice.buyer.stateCode})
            </p>
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '14px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderTop: '1px solid #cbd5e1', borderBottom: '2px solid #0f172a' }}>
                <th style={{ padding: '8px 6px', textAlign: 'center', width: '32px' }}>#</th>
                <th style={{ padding: '8px 6px', textAlign: 'left' }}>Item Description</th>
                <th style={{ padding: '8px 6px', textAlign: 'center', width: '60px' }}>HSN</th>
                <th style={{ padding: '8px 6px', textAlign: 'center', width: '50px' }}>Qty</th>
                <th style={{ padding: '8px 6px', textAlign: 'right', width: '70px' }}>Rate (₹)</th>
                <th style={{ padding: '8px 6px', textAlign: 'right', width: '80px' }}>Taxable (₹)</th>
                <th style={{ padding: '8px 6px', textAlign: 'center', width: '50px' }}>GST</th>
                <th style={{ padding: '8px 6px', textAlign: 'right', width: '80px' }}>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {calculatedItems.map((it, idx) => (
                <tr key={it.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '7px 6px', textAlign: 'center', color: '#64748b' }}>{idx + 1}</td>
                  <td style={{ padding: '7px 6px', fontWeight: '600', color: '#0f172a' }}>{it.desc || 'Untitled Product/Service'}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'center', color: '#475569' }}>{it.hsn}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'center' }}>{it.qty} {it.unit}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'right' }}>{parseFloat(it.rate).toFixed(2)}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'right' }}>{it.taxable.toFixed(2)}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'center' }}>{it.gstRate}%</td>
                  <td style={{ padding: '7px 6px', textAlign: 'right', fontWeight: '700' }}>{it.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals & Tax Breakup Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px', marginBottom: '14px' }}>
            <div>
              {/* Words */}
              <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b' }}>Invoice Value (in words):</span>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a', marginTop: '2px', textTransform: 'capitalize' }}>
                  {words}
                </p>
              </div>

              {/* Bank Details Box */}
              <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '11px' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Bank Payment Details:</span>
                <p style={{ marginTop: '2px' }}><strong>Bank:</strong> {invoice.bankDetails.bankName}</p>
                <p><strong>A/C No:</strong> {invoice.bankDetails.accountNo}</p>
                <p><strong>IFSC:</strong> {invoice.bankDetails.ifsc}</p>
              </div>
            </div>

            {/* Calculations Table */}
            <div style={{ fontSize: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Total Taxable Amount:</span>
                <strong>₹ {totalTaxable.toFixed(2)}</strong>
              </div>

              {isInterState ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}>
                  <span>Integrated GST (IGST):</span>
                  <strong>₹ {totalTax.toFixed(2)}</strong>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #e2e8f0' }}>
                    <span>Central GST (CGST):</span>
                    <strong>₹ {(totalTax / 2).toFixed(2)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #e2e8f0' }}>
                    <span>State GST (SGST):</span>
                    <strong>₹ {(totalTax / 2).toFixed(2)}</strong>
                  </div>
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <span>Round Off:</span>
                <span>₹ {roundOff}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '2px solid #0f172a', borderBottom: '2px solid #0f172a', marginTop: '6px', fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                <span>Grand Total:</span>
                <span>₹ {roundedGrandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms & Signatures */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #e2e8f0', fontSize: '10px' }}>
            <div>
              <strong>Terms & Conditions:</strong>
              <p style={{ whiteSpace: 'pre-line', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>{invoice.terms}</p>
            </div>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
              <p style={{ fontWeight: '700', color: '#0f172a', marginBottom: '45px' }}>For {invoice.seller.name}</p>
              <div style={{ borderTop: '1px dashed #94a3b8', width: '160px', paddingTop: '4px', color: '#64748b' }}>
                Authorized Signatory
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
