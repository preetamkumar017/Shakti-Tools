import React, { useState, useEffect } from 'react';
import { numberToIndianWords, formatIndianCurrency } from '../utils/wordsConverter';

const DEFAULT_SALARY = {
  companyName: 'SHAKTI TOOLS & INDUSTRIAL ENTERPRISE',
  companyAddress: 'Plot No. 42, Industrial Area, Phase-II, New Delhi - 110020',
  slipMonth: 'September',
  slipYear: '2026',
  employee: {
    name: 'Vikram Singh',
    empId: 'STE-042',
    designation: 'Senior CNC Lathe Operator',
    department: 'Tooling & Production',
    doj: '2022-04-15',
    pan: 'ABCDE1234F',
    uan: '100928374615',
    esic: '110029384756',
    bankName: 'HDFC Bank Ltd',
    accountNo: '50100293847561',
    ifsc: 'HDFC0001234'
  },
  attendance: {
    totalDays: 30,
    workingDays: 26,
    presentDays: 25,
    leaveDays: 1,
    lopDays: 0
  },
  earnings: {
    basic: 24000,
    hra: 12000,
    conveyance: 2500,
    specialAllowance: 6500,
    overtime: 3000
  },
  deductions: {
    epf: 1800,
    esic: 360,
    professionalTax: 200,
    tds: 1000,
    advanceLoan: 0
  }
};

export default function SalarySlipTool() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('shakti_tools_salary_data');
    return saved ? JSON.parse(saved) : DEFAULT_SALARY;
  });

  useEffect(() => {
    localStorage.setItem('shakti_tools_salary_data', JSON.stringify(data));
  }, [data]);

  const updateEmp = (field, val) => setData(p => ({ ...p, employee: { ...p.employee, [field]: val } }));
  const updateAtt = (field, val) => setData(p => ({ ...p, attendance: { ...p.attendance, [field]: Number(val) || 0 } }));
  const updateEarn = (field, val) => setData(p => ({ ...p, earnings: { ...p.earnings, [field]: parseFloat(val) || 0 } }));
  const updateDed = (field, val) => setData(p => ({ ...p, deductions: { ...p.deductions, [field]: parseFloat(val) || 0 } }));

  // Totals
  const grossEarnings = Object.values(data.earnings).reduce((a, b) => a + (parseFloat(b) || 0), 0);
  const totalDeductions = Object.values(data.deductions).reduce((a, b) => a + (parseFloat(b) || 0), 0);
  const netSalary = Math.max(0, grossEarnings - totalDeductions);
  const words = numberToIndianWords(netSalary);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm('Reset salary slip to default sample?')) {
      setData(DEFAULT_SALARY);
    }
  };

  return (
    <div className="tool-view-container">
      {/* Form Pane */}
      <div className="tool-editor-pane print-hide">
        <div className="pane-header">
          <div>
            <h3>📑 Salary Slip / Payslip Generator</h3>
            <p>Generate Standard Indian Monthly Payslips with EPF, ESIC & Net Salary</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleReset}>🔄 Reset</button>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>🖨️ Print / Save PDF</button>
          </div>
        </div>

        {/* Company & Month */}
        <div className="form-card">
          <div className="form-card-title">1. Company & Payslip Period</div>
          <div className="form-grid-3">
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-input"
                value={data.companyName}
                onChange={(e) => setData({ ...data, companyName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Month & Year</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  className="form-input"
                  value={data.slipMonth}
                  onChange={(e) => setData({ ...data, slipMonth: e.target.value })}
                />
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '80px' }}
                  value={data.slipYear}
                  onChange={(e) => setData({ ...data, slipYear: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Employee Details */}
        <div className="form-card">
          <div className="form-card-title">2. Employee Information</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Employee Name</label>
              <input
                type="text"
                className="form-input"
                value={data.employee.name}
                onChange={(e) => updateEmp('name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Employee ID</label>
              <input
                type="text"
                className="form-input"
                value={data.employee.empId}
                onChange={(e) => updateEmp('empId', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Designation</label>
              <input
                type="text"
                className="form-input"
                value={data.employee.designation}
                onChange={(e) => updateEmp('designation', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-input"
                value={data.employee.department}
                onChange={(e) => updateEmp('department', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bank A/C No</label>
              <input
                type="text"
                className="form-input"
                value={data.employee.accountNo}
                onChange={(e) => updateEmp('accountNo', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bank Name & IFSC</label>
              <input
                type="text"
                className="form-input"
                value={`${data.employee.bankName} (${data.employee.ifsc})`}
                onChange={(e) => updateEmp('bankName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">PF / UAN No</label>
              <input
                type="text"
                className="form-input"
                value={data.employee.uan}
                onChange={(e) => updateEmp('uan', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">PAN Number</label>
              <input
                type="text"
                className="form-input"
                value={data.employee.pan}
                onChange={(e) => updateEmp('pan', e.target.value.toUpperCase())}
              />
            </div>
          </div>
        </div>

        {/* Attendance */}
        <div className="form-card">
          <div className="form-card-title">3. Days & Attendance</div>
          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Days in Month</label>
              <input
                type="number"
                className="form-input"
                value={data.attendance.totalDays}
                onChange={(e) => updateAtt('totalDays', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Present Days</label>
              <input
                type="number"
                className="form-input"
                value={data.attendance.presentDays}
                onChange={(e) => updateAtt('presentDays', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Leaves</label>
              <input
                type="number"
                className="form-input"
                value={data.attendance.leaveDays}
                onChange={(e) => updateAtt('leaveDays', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Salary Breakup (Earnings & Deductions) */}
        <div className="form-card">
          <div className="form-card-title">4. Earnings & Deductions (₹)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Earnings */}
            <div>
              <h4 style={{ color: '#10b981', fontSize: '13px', marginBottom: '8px' }}>Earnings (+)</h4>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label className="form-label">Basic Salary</label>
                <input type="number" className="form-input" value={data.earnings.basic} onChange={(e) => updateEarn('basic', e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label className="form-label">House Rent Allowance (HRA)</label>
                <input type="number" className="form-input" value={data.earnings.hra} onChange={(e) => updateEarn('hra', e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label className="form-label">Conveyance Allowance</label>
                <input type="number" className="form-input" value={data.earnings.conveyance} onChange={(e) => updateEarn('conveyance', e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label className="form-label">Special Allowance</label>
                <input type="number" className="form-input" value={data.earnings.specialAllowance} onChange={(e) => updateEarn('specialAllowance', e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label className="form-label">Overtime / Incentives</label>
                <input type="number" className="form-input" value={data.earnings.overtime} onChange={(e) => updateEarn('overtime', e.target.value)} />
              </div>
            </div>

            {/* Deductions */}
            <div>
              <h4 style={{ color: '#ef4444', fontSize: '13px', marginBottom: '8px' }}>Deductions (-)</h4>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label className="form-label">Provident Fund (EPF)</label>
                <input type="number" className="form-input" value={data.deductions.epf} onChange={(e) => updateDed('epf', e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label className="form-label">ESIC</label>
                <input type="number" className="form-input" value={data.deductions.esic} onChange={(e) => updateDed('esic', e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label className="form-label">Professional Tax (PT)</label>
                <input type="number" className="form-input" value={data.deductions.professionalTax} onChange={(e) => updateDed('professionalTax', e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label className="form-label">TDS / Income Tax</label>
                <input type="number" className="form-input" value={data.deductions.tds} onChange={(e) => updateDed('tds', e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label className="form-label">Advance / Loan Recovery</label>
                <input type="number" className="form-input" value={data.deductions.advanceLoan} onChange={(e) => updateDed('advanceLoan', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="tool-preview-pane">
        <div className="a4-print-document" style={{ border: '2px solid #0f172a', padding: '24px', borderRadius: '6px', background: '#ffffff' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '12px', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase' }}>
              {data.companyName}
            </h2>
            <p style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{data.companyAddress}</p>
            <div style={{ display: 'inline-block', background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '4px 16px', borderRadius: '4px', fontWeight: '800', fontSize: '13px', marginTop: '8px', color: '#0f172a' }}>
              PAYSLIP FOR THE MONTH OF {data.slipMonth.toUpperCase()} {data.slipYear}
            </div>
          </div>

          {/* Employee & Attendance Grid */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '14px', border: '1px solid #cbd5e1' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '6px 8px', background: '#f8fafc', fontWeight: '700', width: '20%' }}>Employee Name:</td>
                <td style={{ padding: '6px 8px', width: '30%', fontWeight: '700' }}>{data.employee.name}</td>
                <td style={{ padding: '6px 8px', background: '#f8fafc', fontWeight: '700', width: '20%' }}>Employee ID:</td>
                <td style={{ padding: '6px 8px', width: '30%' }}>{data.employee.empId}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '6px 8px', background: '#f8fafc', fontWeight: '700' }}>Designation:</td>
                <td style={{ padding: '6px 8px' }}>{data.employee.designation}</td>
                <td style={{ padding: '6px 8px', background: '#f8fafc', fontWeight: '700' }}>Department:</td>
                <td style={{ padding: '6px 8px' }}>{data.employee.department}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '6px 8px', background: '#f8fafc', fontWeight: '700' }}>Bank Name & A/C:</td>
                <td style={{ padding: '6px 8px' }}>{data.employee.bankName} - {data.employee.accountNo}</td>
                <td style={{ padding: '6px 8px', background: '#f8fafc', fontWeight: '700' }}>IFSC Code:</td>
                <td style={{ padding: '6px 8px' }}>{data.employee.ifsc}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 8px', background: '#f8fafc', fontWeight: '700' }}>PF / UAN No:</td>
                <td style={{ padding: '6px 8px' }}>{data.employee.uan}</td>
                <td style={{ padding: '6px 8px', background: '#f8fafc', fontWeight: '700' }}>Working / Present Days:</td>
                <td style={{ padding: '6px 8px' }}>{data.attendance.workingDays} Days / {data.attendance.presentDays} Days</td>
              </tr>
            </tbody>
          </table>

          {/* Earnings & Deductions 2-Column Table */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', border: '1px solid #cbd5e1', marginBottom: '14px' }}>
            {/* Earnings Column */}
            <div style={{ borderRight: '1px solid #cbd5e1' }}>
              <div style={{ background: '#f1f5f9', padding: '6px 10px', fontWeight: '800', fontSize: '11px', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between' }}>
                <span>EARNINGS</span>
                <span>AMOUNT (₹)</span>
              </div>
              <div style={{ fontSize: '11px', padding: '6px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>Basic Salary</span>
                  <span>{data.earnings.basic.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>House Rent Allowance (HRA)</span>
                  <span>{data.earnings.hra.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>Conveyance Allowance</span>
                  <span>{data.earnings.conveyance.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>Special Allowance</span>
                  <span>{data.earnings.specialAllowance.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>Overtime / Incentive</span>
                  <span>{data.earnings.overtime.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Deductions Column */}
            <div>
              <div style={{ background: '#f1f5f9', padding: '6px 10px', fontWeight: '800', fontSize: '11px', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between' }}>
                <span>DEDUCTIONS</span>
                <span>AMOUNT (₹)</span>
              </div>
              <div style={{ fontSize: '11px', padding: '6px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>Provident Fund (EPF)</span>
                  <span>{data.deductions.epf.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>ESIC</span>
                  <span>{data.deductions.esic.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>Professional Tax (PT)</span>
                  <span>{data.deductions.professionalTax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>TDS / Income Tax</span>
                  <span>{data.deductions.tds.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>Loan / Advance</span>
                  <span>{data.deductions.advanceLoan.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtotals Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid #cbd5e1', borderTop: 'none', background: '#f8fafc', fontSize: '11px', fontWeight: '800', padding: '6px 10px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '10px', borderRight: '1px solid #cbd5e1' }}>
              <span>Gross Earnings:</span>
              <span>₹ {grossEarnings.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '10px' }}>
              <span>Total Deductions:</span>
              <span>₹ {totalDeductions.toFixed(2)}</span>
            </div>
          </div>

          {/* Net Salary Block */}
          <div style={{ background: '#0f172a', color: '#ffffff', padding: '12px 16px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>Net Salary Payable:</span>
              <p style={{ fontSize: '11px', fontWeight: '600', textTransform: 'capitalize', marginTop: '2px', opacity: 0.95 }}>
                {words}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '22px', fontWeight: '800', fontFamily: "'JetBrains Mono', monospace" }}>
                ₹ {netSalary.toLocaleString('en-IN')}/-
              </span>
            </div>
          </div>

          {/* Signatures */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '10px', fontSize: '10px', color: '#475569' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderTop: '1px dashed #94a3b8', width: '150px', paddingTop: '4px' }}>
                Employer / HR Signature
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderTop: '1px dashed #94a3b8', width: '150px', paddingTop: '4px' }}>
                Employee Signature
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
