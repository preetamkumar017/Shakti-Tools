import React, { useState, useEffect } from 'react';

const DEFAULT_CHALLAN = {
  challanNo: 'DC-2026/054',
  date: new Date().toISOString().split('T')[0],
  poNo: 'PO-APEX/9921',
  poDate: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
  ewayBillNo: '341098271625',
  transporterName: 'VRL Logistics Express',
  vehicleNo: 'DL 1M AA 4920',
  lrNo: 'VRL/DEL/9021',
  consignor: {
    name: 'SHAKTI TOOLS & INDUSTRIAL ENTERPRISE',
    address: 'Plot No. 42, Industrial Area, Phase-II, New Delhi - 110020',
    gstin: '07AAAAA0000A1Z5',
    phone: '+91 98765 43210'
  },
  consignee: {
    name: 'APEX ENGINEERING & FABRICATORS LTD',
    address: 'Plot 104, Industrial Growth Centre, Bawal, Haryana - 123501',
    gstin: '06AACCA1234A1Z8',
    contactPerson: 'Mr. Arvind Mehta (Store Dept)'
  },
  items: [
    { id: 1, desc: 'Heavy CNC Milling Cutters & Tool Holders', hsn: '8466', qty: 10, unit: 'Sets', packages: '2 Wooden Crates' },
    { id: 2, desc: 'Tungsten Carbide Replacement Inserts', hsn: '8207', qty: 50, unit: 'Pcs', packages: '5 Corrugated Cartons' },
    { id: 3, desc: 'High Pressure Cutting Coolant Fluid', hsn: '3403', qty: 4, unit: 'Drums', packages: '4 Steel Barrels' }
  ],
  remarks: 'Material dispatched for Job Order #481. Handle with care. Fragile precision machine tooling.'
};

export default function ChallanTool() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('shakti_tools_challan_data');
    return saved ? JSON.parse(saved) : DEFAULT_CHALLAN;
  });

  useEffect(() => {
    localStorage.setItem('shakti_tools_challan_data', JSON.stringify(data));
  }, [data]);

  const updateConsignor = (f, v) => setData(p => ({ ...p, consignor: { ...p.consignor, [f]: v } }));
  const updateConsignee = (f, v) => setData(p => ({ ...p, consignee: { ...p.consignee, [f]: v } }));

  const addItem = () => {
    setData(p => ({
      ...p,
      items: [...p.items, { id: Date.now(), desc: '', hsn: '', qty: 1, unit: 'Nos', packages: '1 Box' }]
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

  const handlePrint = () => window.print();
  const handleReset = () => {
    if (confirm('Reset challan to default sample?')) setData(DEFAULT_CHALLAN);
  };

  return (
    <div className="tool-view-container">
      {/* Editor Pane */}
      <div className="tool-editor-pane print-hide">
        <div className="pane-header">
          <div>
            <h3>🚚 Delivery Challan & Dispatch Note</h3>
            <p>Generate Goods Dispatch Slips, Transport Gate Passes & Receiving Receipts</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleReset}>🔄 Reset</button>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>🖨️ Print / Save PDF</button>
          </div>
        </div>

        {/* Challan Meta */}
        <div className="form-card">
          <div className="form-card-title">1. Challan & Dispatch Info</div>
          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Challan Number</label>
              <input type="text" className="form-input" value={data.challanNo} onChange={(e) => setData({ ...data, challanNo: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Challan Date</label>
              <input type="date" className="form-input" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">E-Way Bill No</label>
              <input type="text" className="form-input" value={data.ewayBillNo} onChange={(e) => setData({ ...data, ewayBillNo: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">PO Reference No</label>
              <input type="text" className="form-input" value={data.poNo} onChange={(e) => setData({ ...data, poNo: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Vehicle Number</label>
              <input type="text" className="form-input" value={data.vehicleNo} onChange={(e) => setData({ ...data, vehicleNo: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Transporter Name & LR No</label>
              <input type="text" className="form-input" value={`${data.transporterName} (${data.lrNo})`} onChange={(e) => setData({ ...data, transporterName: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Consignor & Consignee */}
        <div className="form-card">
          <div className="form-card-title">2. Consignee (Delivered To)</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Consignee Name</label>
              <input type="text" className="form-input" value={data.consignee.name} onChange={(e) => updateConsignee('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Consignee GSTIN</label>
              <input type="text" className="form-input" value={data.consignee.gstin} onChange={(e) => updateConsignee('gstin', e.target.value)} />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Delivery Address</label>
              <input type="text" className="form-input" value={data.consignee.address} onChange={(e) => updateConsignee('address', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Attention / Contact Person</label>
              <input type="text" className="form-input" value={data.consignee.contactPerson} onChange={(e) => updateConsignee('contactPerson', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Dispatched Items */}
        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div className="form-card-title" style={{ margin: 0 }}>3. Goods Dispatched</div>
            <button className="btn btn-secondary btn-sm" onClick={addItem}>➕ Add Item</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.items.map((it) => (
              <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr 2fr auto', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px' }}>
                <input type="text" placeholder="Description" className="form-input" value={it.desc} onChange={(e) => updateItem(it.id, 'desc', e.target.value)} />
                <input type="text" placeholder="HSN" className="form-input" value={it.hsn} onChange={(e) => updateItem(it.id, 'hsn', e.target.value)} />
                <input type="number" placeholder="Qty" className="form-input" value={it.qty} onChange={(e) => updateItem(it.id, 'qty', e.target.value)} />
                <input type="text" placeholder="Unit" className="form-input" value={it.unit} onChange={(e) => updateItem(it.id, 'unit', e.target.value)} />
                <input type="text" placeholder="Packaging (e.g. 2 Boxes)" className="form-input" value={it.packages} onChange={(e) => updateItem(it.id, 'packages', e.target.value)} />
                <button type="button" onClick={() => removeItem(it.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>🗑️</button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-title">4. Remarks / Dispatch Instructions</div>
          <textarea className="form-input" rows="2" value={data.remarks} onChange={(e) => setData({ ...data, remarks: e.target.value })} />
        </div>
      </div>

      {/* Preview Pane */}
      <div className="tool-preview-pane">
        <div className="a4-print-document" style={{ border: '2px solid #0f172a', padding: '24px', borderRadius: '6px', background: '#ffffff' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f172a', paddingBottom: '14px', marginBottom: '14px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase' }}>{data.consignor.name}</h2>
              <p style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{data.consignor.address}</p>
              <p style={{ fontSize: '11px', color: '#0f172a', fontWeight: '600' }}>GSTIN: {data.consignor.gstin} | Phone: {data.consignor.phone}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-block', background: '#059669', color: '#ffffff', padding: '6px 14px', borderRadius: '4px', fontWeight: '800', fontSize: '14px', letterSpacing: '1px' }}>
                DELIVERY CHALLAN
              </div>
              <div style={{ marginTop: '8px', fontSize: '12px' }}>
                <p><strong>Challan No:</strong> {data.challanNo}</p>
                <p><strong>Date:</strong> {data.date}</p>
                <p><strong>E-Way Bill:</strong> {data.ewayBillNo}</p>
              </div>
            </div>
          </div>

          {/* Transport & PO Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '10px 14px', fontSize: '11px' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Delivered To (Consignee):</span>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginTop: '2px' }}>{data.consignee.name}</h3>
              <p style={{ color: '#475569' }}>{data.consignee.address}</p>
              <p style={{ fontWeight: '600', marginTop: '2px' }}>Attn: {data.consignee.contactPerson} | GSTIN: {data.consignee.gstin}</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '10px 14px', fontSize: '11px' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Dispatch & Transport Details:</span>
              <p style={{ marginTop: '4px' }}><strong>Vehicle No:</strong> {data.vehicleNo}</p>
              <p><strong>Transporter:</strong> {data.transporterName}</p>
              <p><strong>PO Reference:</strong> {data.poNo} (Dated: {data.poDate})</p>
            </div>
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '14px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderTop: '1px solid #cbd5e1', borderBottom: '2px solid #0f172a' }}>
                <th style={{ padding: '8px 6px', textAlign: 'center', width: '30px' }}>#</th>
                <th style={{ padding: '8px 6px', textAlign: 'left' }}>Item Description</th>
                <th style={{ padding: '8px 6px', textAlign: 'center', width: '70px' }}>HSN</th>
                <th style={{ padding: '8px 6px', textAlign: 'center', width: '70px' }}>Quantity</th>
                <th style={{ padding: '8px 6px', textAlign: 'left', width: '160px' }}>Packaging Details</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((it, idx) => (
                <tr key={it.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 6px', textAlign: 'center', color: '#64748b' }}>{idx + 1}</td>
                  <td style={{ padding: '8px 6px', fontWeight: '600', color: '#0f172a' }}>{it.desc}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', color: '#475569' }}>{it.hsn}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700' }}>{it.qty} {it.unit}</td>
                  <td style={{ padding: '8px 6px', color: '#475569' }}>{it.packages}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Remarks */}
          <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '11px', marginBottom: '20px' }}>
            <strong>Remarks / Special Instructions:</strong>
            <p style={{ color: '#475569', marginTop: '2px' }}>{data.remarks}</p>
          </div>

          {/* Declaration */}
          <p style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic', marginBottom: '35px' }}>
            Declaration: Certified that the goods mentioned above have been inspected, packed, and dispatched in sound commercial condition as per agreed terms.
          </p>

          {/* 3-Column Signatures: Prepared By, Driver, Receiver */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', textAlign: 'center', fontSize: '10px', color: '#475569' }}>
            <div>
              <div style={{ borderTop: '1px dashed #94a3b8', width: '140px', margin: '0 auto', paddingTop: '4px' }}>
                Prepared & Dispatched By
              </div>
            </div>
            <div>
              <div style={{ borderTop: '1px dashed #94a3b8', width: '140px', margin: '0 auto', paddingTop: '4px' }}>
                Driver / Transporter Signature
              </div>
            </div>
            <div>
              <div style={{ borderTop: '1px dashed #94a3b8', width: '150px', margin: '0 auto', paddingTop: '4px', fontWeight: '700', color: '#0f172a' }}>
                Received in Good Condition<br />
                <span style={{ fontSize: '9px', fontWeight: '400', color: '#64748b' }}>(Signature & Company Seal)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
