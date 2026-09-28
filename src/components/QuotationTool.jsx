import React, { useState, useEffect } from 'react';
import { numberToIndianWords, formatIndianCurrency } from '../utils/wordsConverter';

const DEFAULT_QUOTATION = {
  quoteNo: 'QT-2026/092',
  date: new Date().toISOString().split('T')[0],
  validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  subject: 'Commercial Quotation for Heavy Duty Workshop Tooling & Precision CNC Fixtures',
  vendor: {
    name: 'SHAKTI TOOLS & INDUSTRIAL ENTERPRISE',
    address: 'Plot No. 42, Industrial Area, Phase-II, New Delhi - 110020',
    contactPerson: 'Preetam Sinha (Director)',
    phone: '+91 98765 43210',
    email: 'sales@shaktitools.in',
    gstin: '07AAAAA0000A1Z5'
  },
  client: {
    name: 'APEX ENGINEERING & FABRICATORS LTD',
    address: 'Plot 104, Industrial Growth Centre, Bawal, Haryana - 123501',
    contactPerson: 'Mr. Arvind Mehta (Purchase Head)',
    phone: '+91 98112 34567',
    email: 'arvind@apexengg.com',
    gstin: '06AACCA1234A1Z8'
  },
  items: [
    { id: 1, desc: 'High-Precision Tungsten Carbide Milling Cutters', qty: 10, unit: 'Pcs', rate: 1850, gst: 18 },
    { id: 2, desc: 'CNC Quick-Change Tool Post with Holders', qty: 2, unit: 'Sets', rate: 32000, gst: 18 },
    { id: 3, desc: 'Digital Bore Gauge with Dial Indicator (50-160mm)', qty: 1, unit: 'Unit', rate: 8400, gst: 18 },
    { id: 4, desc: 'On-site Installation & Precision Laser Calibration', qty: 1, unit: 'Job', rate: 6500, gst: 18 }
  ],
  terms: '1. Prices quoted are ex-works New Delhi.\n2. Delivery timeline: 7 to 10 days from receipt of confirmed Purchase Order.\n3. Payment Terms: 50% advance along with PO, 50% against delivery.\n4. Warranty: 12 Months standard manufacturer replacement warranty.'
};

export default function QuotationTool() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('shakti_tools_quote_data');
    return saved ? JSON.parse(saved) : DEFAULT_QUOTATION;
  });

  useEffect(() => {
    localStorage.setItem('shakti_tools_quote_data', JSON.stringify(data));
  }, [data]);

  const updateVendor = (f, v) => setData(p => ({ ...p, vendor: { ...p.vendor, [f]: v } }));
  const updateClient = (f, v) => setData(p => ({ ...p, client: { ...p.client, [f]: v } }));

  const addItem = () => {
    setData(p => ({
      ...p,
      items: [...p.items, { id: Date.now(), desc: '', qty: 1, unit: 'Nos', rate: 0, gst: 18 }]
    }));
  };

  const updateItem = (id, f, v) => {
    setData(p => ({
      ...p,
      items: p.items.map(it => it.id === id ? { ...it, [f]: v } : it)
    }));
  };

  const removeItem = (id) => {
    if (data.items.length <= 1) return;
    setData(p => ({ ...p, items: p.items.filter(it => it.id !== id) }));
  };

  // Calculations
  const calculatedItems = data.items.map(it => {
    const taxable = (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0);
    const gstRate = parseFloat(it.gst) || 0;
    const taxAmt = (taxable * gstRate) / 100;
    return { ...it, taxable, taxAmt, total: taxable + taxAmt };
  });

  const subtotal = calculatedItems.reduce((a, b) => a + b.taxable, 0);
  const totalTax = calculatedItems.reduce((a, b) => a + b.taxAmt, 0);
  const grandTotal = subtotal + totalTax;
  const words = numberToIndianWords(Math.round(grandTotal));

  const handlePrint = () => window.print();
  const handleReset = () => {
    if (confirm('Reset quotation to default sample?')) setData(DEFAULT_QUOTATION);
  };

  return (
    <div className="tool-view-container">
      {/* Editor Pane */}
      <div className="tool-editor-pane print-hide">
        <div className="pane-header">
          <div>
            <h3>📋 Commercial Quotation & Estimate Maker</h3>
            <p>Create Professional B2B Quotes with Deliverables, Terms & Approvals</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleReset}>🔄 Reset</button>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>🖨️ Print / Save PDF</button>
          </div>
        </div>

        {/* Metadata */}
        <div className="form-card">
          <div className="form-card-title">1. Quotation Details & Subject</div>
          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Quotation Number</label>
              <input type="text" className="form-input" value={data.quoteNo} onChange={(e) => setData({ ...data, quoteNo: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Quotation Date</label>
              <input type="date" className="form-input" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Valid Until</label>
              <input type="date" className="form-input" value={data.validUntil} onChange={(e) => setData({ ...data, validUntil: e.target.value })} />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 3' }}>
              <label className="form-label">Quotation Title / Subject</label>
              <input type="text" className="form-input" value={data.subject} onChange={(e) => setData({ ...data, subject: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Vendor & Client */}
        <div className="form-card">
          <div className="form-card-title">2. Client (Prepared For) Details</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Client Company Name</label>
              <input type="text" className="form-input" value={data.client.name} onChange={(e) => updateClient('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Attention / Contact Person</label>
              <input type="text" className="form-input" value={data.client.contactPerson} onChange={(e) => updateClient('contactPerson', e.target.value)} />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Client Address</label>
              <input type="text" className="form-input" value={data.client.address} onChange={(e) => updateClient('address', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Client Phone / Email</label>
              <input type="text" className="form-input" value={data.client.phone} onChange={(e) => updateClient('phone', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Client GSTIN</label>
              <input type="text" className="form-input" value={data.client.gstin} onChange={(e) => updateClient('gstin', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div className="form-card-title" style={{ margin: 0 }}>3. Scope of Work / Products & Rates</div>
            <button className="btn btn-secondary btn-sm" onClick={addItem}>➕ Add Item</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.items.map((it) => (
              <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1.2fr 1fr auto', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px' }}>
                <input type="text" placeholder="Description" className="form-input" value={it.desc} onChange={(e) => updateItem(it.id, 'desc', e.target.value)} />
                <input type="number" placeholder="Qty" className="form-input" value={it.qty} onChange={(e) => updateItem(it.id, 'qty', e.target.value)} />
                <input type="text" placeholder="Unit" className="form-input" value={it.unit} onChange={(e) => updateItem(it.id, 'unit', e.target.value)} />
                <input type="number" placeholder="Rate (₹)" className="form-input" value={it.rate} onChange={(e) => updateItem(it.id, 'rate', e.target.value)} />
                <select className="form-input" value={it.gst} onChange={(e) => updateItem(it.id, 'gst', e.target.value)}>
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
                <button type="button" onClick={() => removeItem(it.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>🗑️</button>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="form-card">
          <div className="form-card-title">4. Terms & Conditions</div>
          <textarea className="form-input" rows="3" value={data.terms} onChange={(e) => setData({ ...data, terms: e.target.value })} />
        </div>
      </div>

      {/* Preview Pane */}
      <div className="tool-preview-pane">
        <div className="a4-print-document" style={{ border: '2px solid #0f172a', padding: '24px', borderRadius: '6px', background: '#ffffff' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f172a', paddingBottom: '14px', marginBottom: '14px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase' }}>{data.vendor.name}</h2>
              <p style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{data.vendor.address}</p>
              <p style={{ fontSize: '11px', color: '#0f172a', fontWeight: '600' }}>Phone: {data.vendor.phone} | Email: {data.vendor.email}</p>
              <p style={{ fontSize: '11px', color: '#0f172a' }}>GSTIN: {data.vendor.gstin}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-block', background: '#0284c7', color: '#ffffff', padding: '6px 14px', borderRadius: '4px', fontWeight: '800', fontSize: '14px', letterSpacing: '1px' }}>
                COMMERCIAL ESTIMATE / QUOTATION
              </div>
              <div style={{ marginTop: '8px', fontSize: '12px' }}>
                <p><strong>Quote No:</strong> {data.quoteNo}</p>
                <p><strong>Date:</strong> {data.date}</p>
                <p><strong>Valid Until:</strong> {data.validUntil}</p>
              </div>
            </div>
          </div>

          {/* Quotation For */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '10px 14px', marginBottom: '14px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Quotation Prepared For:</span>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginTop: '2px' }}>{data.client.name}</h3>
            <p style={{ fontSize: '11px', color: '#475569' }}>{data.client.address}</p>
            <p style={{ fontSize: '11px', color: '#0f172a', fontWeight: '600' }}>Attn: {data.client.contactPerson} | Phone: {data.client.phone} | GSTIN: {data.client.gstin}</p>
          </div>

          {/* Subject Line */}
          <div style={{ borderLeft: '3px solid #0284c7', padding: '6px 12px', background: '#f0f9ff', marginBottom: '14px', fontSize: '12px', fontWeight: '700', color: '#0369a1' }}>
            Subject: {data.subject}
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '14px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderTop: '1px solid #cbd5e1', borderBottom: '2px solid #0f172a' }}>
                <th style={{ padding: '8px 6px', textAlign: 'center', width: '30px' }}>#</th>
                <th style={{ padding: '8px 6px', textAlign: 'left' }}>Item / Work Description</th>
                <th style={{ padding: '8px 6px', textAlign: 'center', width: '60px' }}>Qty</th>
                <th style={{ padding: '8px 6px', textAlign: 'right', width: '80px' }}>Unit Rate (₹)</th>
                <th style={{ padding: '8px 6px', textAlign: 'center', width: '50px' }}>GST</th>
                <th style={{ padding: '8px 6px', textAlign: 'right', width: '90px' }}>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {calculatedItems.map((it, idx) => (
                <tr key={it.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '7px 6px', textAlign: 'center', color: '#64748b' }}>{idx + 1}</td>
                  <td style={{ padding: '7px 6px', fontWeight: '600', color: '#0f172a' }}>{it.desc || 'Item'}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'center' }}>{it.qty} {it.unit}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'right' }}>{parseFloat(it.rate).toFixed(2)}</td>
                  <td style={{ padding: '7px 6px', textAlign: 'center' }}>{it.gst}%</td>
                  <td style={{ padding: '7px 6px', textAlign: 'right', fontWeight: '700' }}>{it.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px', marginBottom: '14px' }}>
            <div>
              <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b' }}>Estimated Amount (in words):</span>
                <p style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a', textTransform: 'capitalize', marginTop: '2px' }}>{words}</p>
              </div>
            </div>
            <div style={{ fontSize: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Subtotal (Excl. Tax):</span>
                <strong>₹ {subtotal.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Estimated Taxes (GST):</span>
                <strong>₹ {totalTax.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '2px solid #0f172a', borderBottom: '2px solid #0f172a', marginTop: '6px', fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                <span>Grand Total:</span>
                <span>₹ {Math.round(grandTotal).toLocaleString('en-IN')}/-</span>
              </div>
            </div>
          </div>

          {/* Terms & Dual Signatures */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', fontSize: '10px' }}>
            <div>
              <strong>Commercial Terms & Conditions:</strong>
              <p style={{ whiteSpace: 'pre-line', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>{data.terms}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <p style={{ fontWeight: '700', color: '#0f172a' }}>For {data.vendor.name}</p>
                <div style={{ borderTop: '1px dashed #94a3b8', width: '150px', margin: '30px auto 0', paddingTop: '4px', color: '#64748b' }}>
                  Authorized Signatory
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: '700', color: '#0f172a' }}>Client Acceptance & Approval</p>
                <div style={{ borderTop: '1px dashed #94a3b8', width: '150px', margin: '30px auto 0', paddingTop: '4px', color: '#64748b' }}>
                  Signature & Seal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
