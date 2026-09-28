# ⚡ Shakti Tools — All-in-One Daily Business Tools Suite (React)

A modern, high-precision **Daily Business & Banking Tools Suite** built with **React** and **Vite**, specially designed for Indian MSMEs, enterprises, shop owners, accountants, and office managers.

---

## 🛠️ Included Tools (8 Complete Business Tools)

### 1. 🖋️ Universal Bank Cheque Printing Tool (CTS-2010)
- **Millimeter Precision Layouts:** Pre-configured dimensions and coordinates for 30+ Indian Banks:
  - 12 Public Sector Banks (SBI, PNB, BOB, Canara, Union, BOI, etc.)
  - 14 Private Sector Banks (HDFC, ICICI, Axis, Kotak, IndusInd, Yes Bank, etc.)
  - Small Finance Banks & MNC Banks (AU Small Finance, Standard Chartered, HSBC, etc.)
  - Custom / Cooperative Banks
- **Interactive Drag-and-Drop WYSIWYG Canvas Studio:**
  - Micro-nudge coordinates by +/- 0.5mm or +/- 0.2mm.
  - Dedicated **Date Box Inspector** with **Only Year Text Shift** fine-tuning.
- **Smart Indian Number-to-Words Auto-Converter:** Lakhs, Crores, Rupees, Paise, and 'Only'.
- **Security Markings:** `A/C PAYEE ONLY`, `NOT NEGOTIABLE`, and strikeout `OR BEARER`.
- **Zero-Waste Calibration Sheet:** Test print on plain A4 before using real cheque leaves.
- **Cheque Register & CSV Export:** Local storage log of all printed cheques.

### 2. 🧾 GST Tax Invoice Generator
- Full B2B / B2C Indian GST Tax Invoice maker.
- Seller & Buyer GSTIN, PAN, State Code detection.
- Auto-switch between **Intra-State (CGST + SGST)** and **Inter-State (IGST)** based on buyer & seller states.
- Itemized goods/services table with HSN/SAC codes, quantity, units, rates, discounts, and GST slabs (0%, 5%, 12%, 18%, 28%).
- Bank account details for RTGS/NEFT/UPI payment.
- Terms & Conditions and Authorized Signatory seal.
- Direct **Print / Save PDF** ready A4 layout.

### 3. 💰 Cash Receipt & Payment Voucher Maker
- Dual mode: **Cash Receipt (रसीद)** and **Payment Voucher (भुगतान वाउचर)**.
- Official receipt numbering and date tracking.
- Payment modes: Cash, Cheque, UPI, NEFT/RTGS with reference/UTR numbers.
- Classical Indian **Revenue Stamp** box (₹1 Revenue Stamp border).
- Receiver, Accountant, and Authorized Signatory sign-off blocks.

### 4. 📑 Salary Slip / Monthly Payslip Generator
- Standard corporate Indian monthly payslip layout.
- Attendance summary: Total Days, Working Days, Present Days, Paid Leaves, LOP.
- Two-column financial breakdown:
  - **Earnings:** Basic Salary, HRA, Conveyance, Special Allowance, Overtime/Incentives.
  - **Deductions:** Employee Provident Fund (EPF), ESIC, Professional Tax (PT), TDS, Advance Recovery.
- Auto Net Salary in figures and Indian words.
- Employer and Employee signature blocks.

### 5. 📋 Commercial Quotation & Estimate Generator
- Formal B2B quotation and price estimate maker.
- Scope of work / product deliverables with unit rates, GST, and totals.
- Commercial terms: Ex-works, delivery timeline, payment terms, warranty period.
- Dual approval blocks: Vendor Signatory and Client Acceptance signature.

### 6. 🚚 Delivery Challan & Dispatch Note
- Goods dispatch slip & gate pass.
- Transport tracking: Transporter Name, Vehicle No, E-Way Bill No, LR/GR No, PO No.
- Itemized package description, HSN, quantity dispatched, and packaging details (crates, boxes, drums).
- 3-party sign off: Prepared By, Driver / Transporter, and Receiver (Goods Received in Good Condition).

### 7. 🧮 GST & Commercial Profit Margin Calculator
- **Add GST:** Base Amount + Rate% = CGST + SGST + Final Payable Gross.
- **Extract / Remove GST:** MRP / Gross Amount - Rate% = Net Base Price + Embedded GST.
- **Profit Margin & Markup:** Cost Price + Target % = Selling Price and Gross Profit analysis.
- Quick 1-click GST rate buttons: 0%, 5%, 12%, 18%, 28%.

### 8. 🔤 Number to Indian Words & Cash Till Counter
- Instant number to Indian words converter for banking, RTGS/NEFT slips, and accounting software.
- Cheque 2-line split preview with character counters.
- **Cash Denomination Counter:** Daily cash closing register counter for ₹500, ₹200, ₹100, ₹50, ₹20, ₹10, ₹5, ₹2, ₹1 notes.
- 1-click "Copy Cash Closing Slip" to clipboard.

---

## 🚀 Getting Started

### 1. Run in Development Mode:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Create Minified / Obfuscated Production Build:
```bash
npm run build
```
The protected, minified bundle will be generated in the `dist/` directory.

### 3. Preview Production Build:
```bash
npm run preview
```

---

## 🔒 Code Protection

Built with React and Vite. When built with `npm run build`, all component code, presets, and logic are bundled, minified, and obfuscated in `dist/`, making it impossible for regular visitors to copy source files directly.
