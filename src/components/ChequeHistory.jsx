import React from 'react';

export default function ChequeHistory({
  records,
  onReload,
  onDelete,
  onClear,
  onExportCsv
}) {
  return (
    <section className="history-section print-hide" id="section-history">
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>📜</span> Cheque Print Register & Records
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm" onClick={onExportCsv}>
              📥 Export CSV
            </button>
            <button className="btn btn-secondary btn-sm" onClick={onClear}>
              🗑️ Clear History
            </button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="custom-table" id="cheque-history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Cheque No</th>
                <th>Bank Preset</th>
                <th>Payee</th>
                <th>Amount (₹)</th>
                <th>A/C Payee</th>
                <th>Printed At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '30px' }}>
                    No cheques printed yet. All printed cheques will appear in this register.
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.date}</strong></td>
                    <td><code>{r.chequeNo}</code></td>
                    <td><span className="dimension-badge">{r.bank}</span></td>
                    <td>{r.payee}</td>
                    <td>
                      <strong>
                        ₹ {parseFloat(r.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </strong>
                    </td>
                    <td>{r.acPayee ? '✅ Yes' : '❌ No'}</td>
                    <td style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                      {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onReload(r)}
                          title="Load this cheque back into editor"
                        >
                          🔄 Re-load
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onDelete(r.id)}
                          title="Delete record"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
