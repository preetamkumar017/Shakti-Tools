import React, { useState } from 'react';
import { TOOLS_CONFIG } from './Sidebar';

export default function DashboardView({
  onSelectTool,
  chequeHistoryCount = 0,
  banksCount = 30
}) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toolDetails = {
    cheque: {
      category: 'banking',
      title: 'Universal Cheque Printer',
      tagline: 'Physical Indian CTS-2010 Cheque Printing with Millimeter Calibration',
      icon: '🖋️',
      color: '#3b82f6',
      badge: 'v1.0 Pro',
      features: ['30+ Indian Banks Pre-calibrated', '0.2mm Year Text Shift Nudge', 'Zero-Waste Test Sheet', 'Offline Cheque Register'],
      actionText: 'Open Cheque Studio'
    },
    invoice: {
      category: 'commercial',
      title: 'GST Tax Invoice Maker',
      tagline: 'Professional Indian B2B & B2C Tax Invoices with Automatic Tax Split',
      icon: '🧾',
      color: '#06b6d4',
      badge: 'GST Ready',
      features: ['Auto Intra (CGST+SGST) vs Inter (IGST)', 'HSN/SAC Codes & 0-28% Slabs', 'Auto-Words & Bank QR Details', 'A4 Print / Save PDF'],
      actionText: 'Create GST Invoice'
    },
    receipt: {
      category: 'banking',
      title: 'Cash Receipt & Voucher',
      tagline: 'Official Receipt & Payment Vouchers with Classical Revenue Stamp',
      icon: '💰',
      color: '#10b981',
      badge: 'Cash / Bank',
      features: ['Cash, Cheque, UPI & NEFT Modes', '₹1 Revenue Stamp Box', 'Indian Currency Words Format', 'Instant 1-Click Print'],
      actionText: 'Create Receipt'
    },
    salary: {
      category: 'commercial',
      title: 'Salary Slip / Payslip',
      tagline: 'Corporate Standard Monthly Employee Payslips with EPF & ESIC',
      icon: '📑',
      color: '#8b5cf6',
      badge: 'HR & Payroll',
      features: ['EPF, ESIC, PT & TDS Deductions', 'Working & Present Days Attendance', 'Dual Signatures (HR & Employee)', 'Net Pay Auto-Calculated'],
      actionText: 'Generate Payslip'
    },
    quotation: {
      category: 'commercial',
      title: 'Commercial Quotation',
      tagline: 'Itemized Business Estimates with Scope of Work, Terms & Approvals',
      icon: '📋',
      color: '#0284c7',
      badge: 'B2B Sales',
      features: ['Scope & Unit Rates Table', 'Delivery & Commercial Terms', 'Dual Approval Signatures', 'Clean A4 Print Format'],
      actionText: 'Create Quotation'
    },
    challan: {
      category: 'commercial',
      title: 'Delivery Challan & Gate Pass',
      tagline: 'Goods Dispatch Slips, Transport Gate Passes & Receiving Receipts',
      icon: '🚚',
      color: '#f59e0b',
      badge: 'Logistics',
      features: ['Vehicle, E-Way Bill & PO Details', 'Packaging & Box Breakdown', 'Dispatcher, Driver & Receiver Signs', 'Material Inspection Declaration'],
      actionText: 'Make Challan'
    },
    calculator: {
      category: 'banking',
      title: 'GST & Margin Calculator',
      tagline: 'Forward & Reverse GST Tax Breakdown and Profit Markup Engine',
      icon: '🧮',
      color: '#ec4899',
      badge: 'Calculator',
      features: ['Add GST (Exclusive to Inclusive)', 'Extract GST (From MRP Price)', 'Cost Margin & Markup Analysis', '1-Click Copy Results'],
      actionText: 'Open Calculator'
    },
    converter: {
      category: 'banking',
      title: 'Number Words & Cash Till',
      tagline: 'Convert Financial Figures to Indian Words & Cashier Till Note Counter',
      icon: '🔤',
      color: '#14b8a6',
      badge: 'Banking',
      features: ['Lakhs & Crores Words Format', 'Cheque 2-Line Split with Char Count', '₹500 to ₹1 Note Counting Tally', 'Copy Cash Closing Slip'],
      actionText: 'Count & Convert'
    }
  };

  const toolsList = Object.entries(toolDetails).map(([id, info]) => ({
    id,
    ...info
  }));

  const filteredTools = toolsList.filter(t => {
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="dashboard-container" style={{ padding: '28px 36px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Hero Welcome Banner */}
      <div
        className="dashboard-hero"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid var(--border-glass-hover)',
          borderRadius: '20px',
          padding: '28px 36px',
          marginBottom: '28px',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#60a5fa', marginBottom: '12px' }}>
            <span>⚡</span> SHAKTI TOOLS BUSINESS SUITE
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px', marginBottom: '8px' }}>
            Daily Business & Banking Productivity Suite
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '720px', lineHeight: '1.6' }}>
            Designed specifically for Indian MSMEs, shop owners, accountants, and office managers. Print CTS-2010 bank cheques, generate GST invoices, vouchers, salary slips, and manage daily cash tallies with millimeter accuracy.
          </p>
        </div>

        {/* Quick Metrics Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-glass)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              🛠️
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>8 Ready Tools</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Banking, GST & Commercial</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              🏦
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#34d399' }}>{banksCount}+ Indian Banks</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>PSB, Private & MNC Presets</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              📜
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#fbbf24' }}>{chequeHistoryCount} Cheques Logged</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Local Offline Register</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              🔒
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#c084fc' }}>100% Offline & Private</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Zero cloud data leakage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn ${filterCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterCategory('all')}
          >
            All Tools ({toolsList.length})
          </button>
          <button
            className={`btn ${filterCategory === 'banking' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterCategory('banking')}
          >
            💳 Banking & Cash (4)
          </button>
          <button
            className={`btn ${filterCategory === 'commercial' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterCategory('commercial')}
          >
            🧾 Billing & Operations (4)
          </button>
        </div>

        {/* Search */}
        <div style={{ minWidth: '280px', maxWidth: '360px', flex: 1 }}>
          <div className="input-with-icon">
            <span className="input-icon">🔍</span>
            <input
              type="text"
              placeholder="Search tools by name, features..."
              className="form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '34px', fontSize: '13px' }}
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '22px'
        }}
      >
        {filteredTools.map((t) => (
          <div
            key={t.id}
            className="dashboard-tool-card"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glass)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              cursor: 'pointer'
            }}
            onClick={() => onSelectTool(t.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = t.color;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 12px 28px ${t.color}25`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-glass)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            <div>
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: `${t.color}18`,
                    border: `1px solid ${t.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px'
                  }}
                >
                  {t.icon}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: t.color,
                    background: `${t.color}15`,
                    border: `1px solid ${t.color}35`,
                    padding: '3px 10px',
                    borderRadius: '12px'
                  }}
                >
                  {t.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '6px' }}>
                {t.title}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', minHeight: '36px', marginBottom: '16px' }}>
                {t.tagline}
              </p>

              {/* Features List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                {t.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-dim)' }}>
                    <span style={{ color: t.color, fontSize: '12px' }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Button */}
            <button
              className="btn btn-primary"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: `linear-gradient(135deg, ${t.color}dd, ${t.color})`,
                borderColor: t.color
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectTool(t.id);
              }}
            >
              <span>{t.actionText}</span>
              <span>→</span>
            </button>
          </div>
        ))}
      </div>

      {/* Suggested Future Roadmap Showcase */}
      <div
        style={{
          marginTop: '36px',
          background: 'rgba(17, 24, 39, 0.4)',
          border: '1px dashed var(--border-glass)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center'
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#60a5fa', letterSpacing: '0.8px' }}>
          💡 Upcoming Tools Expansion Roadmap
        </span>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px', marginBottom: '8px' }}>
          More Indian Business Tools Being Crafted
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto 16px', lineHeight: '1.5' }}>
          Bank Deposit Slip (बैंक जमा पर्ची), RTGS/NEFT Form Auto-Filler, Official Company Letterhead, Purchase Order (PO), and QR/Barcode Asset Label Generator.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>💳 Bank Pay-in Slip</span>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>📄 RTGS / NEFT Form</span>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>📝 Company Letterhead</span>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>🛍️ Purchase Order (PO)</span>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>🏠 Rent Receipt (HRA)</span>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>🏷️ Barcode / QR Label</span>
        </div>
      </div>
    </div>
  );
}
