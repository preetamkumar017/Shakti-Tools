# ⚡ Shakti Tools — Universal Bank Cheque Printing Suite (React)

A modern, high-precision **Bank Cheque Printing Tool & Business Suite** built with **React** and **Vite**, specially designed for Indian standard **CTS-2010** physical cheque printing with millimeter (mm) accuracy and code copy protection.

---

## ✨ Features

- **Comprehensive Indian Bank Presets (CTS-2010 Standards):**
  - **Public Sector Banks (12 PSBs):**
    - State Bank of India (SBI)
    - Punjab National Bank (PNB)
    - Bank of Baroda (BOB)
    - Canara Bank
    - Union Bank of India
    - Bank of India (BOI)
    - Indian Bank
    - Central Bank of India
    - Indian Overseas Bank (IOB)
    - UCO Bank
    - Bank of Maharashtra
    - Punjab & Sind Bank
  - **Major Private Sector Banks (14 Banks):**
    - HDFC Bank
    - ICICI Bank
    - Axis Bank
    - Kotak Mahindra Bank
    - IndusInd Bank
    - Yes Bank
    - IDFC FIRST Bank
    - Federal Bank
    - IDBI Bank
    - Bandhan Bank
    - South Indian Bank (SIB)
    - RBL Bank
    - Karur Vysya Bank (KVB)
    - City Union Bank (CUB)
  - **Small Finance & Payments Banks:**
    - AU Small Finance Bank
    - Equitas Small Finance Bank
    - Ujjivan Small Finance Bank
    - Paytm Payments Bank
  - **Foreign / MNC Banks in India:**
    - Standard Chartered Bank
    - HSBC India
    - Citibank India
  - **Custom / User Defined Layouts** (Save custom coordinates for any cooperative/rural bank)
- **Interactive WYSIWYG Canvas Studio:**
  - Standard CTS-2010 dimensions: **203mm × 89mm** (8" × 3.5").
  - **Drag-and-Drop field placement:** Click and drag any element directly on screen.
  - **Millimeter Coordinate Inspector:** Fine-tune X and Y positions by +/- 0.5mm with nudge buttons.
  - **Grid & Ruler Overlay:** 5mm grid steps to match physical cheques with a real scale.
  - **Toggle Cheque Leaf Graphic:** Switch between visual design preview and print-only blank text mode.
- **Smart Financial Formatting:**
  - Automatic Indian Currency Number-to-Words converter (**Crores, Lakhs, Thousands, Hundreds, Rupees, Paise, and 'Only'**).
  - Dual-line auto-splitting for lengthy words.
  - Indian numbering commas format (e.g. `₹ 1,25,450.00`).
  - Security stars (`***`) auto-applied to prevent tampering.
- **Security Crossings & Restrictions:**
  - `// A/C PAYEE ONLY //` top-left stamp.
  - `// NOT NEGOTIABLE //` label.
  - Strikeout line over `OR BEARER`.
  - Authorized Signatory and Company entity naming.
- **Zero-Waste Calibration System:**
  - Print a 1:1 scale test sheet on plain A4 paper to verify printer tray margin offsets without wasting real cheque leaves.
  - Global Horizontal & Vertical printer offsets (mm).
- **Cheque Register / History:**
  - Automatically records every printed cheque into LocalStorage.
  - 1-Click Reload back into editor.
  - Export register to CSV.
- **Code Copy Protection:**
  - Built with React and Vite.
  - Production build (`npm run build`) minifies, scrambles, and bundles all logic into obfuscated chunks (`dist/`), preventing easy source copying.

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

## 🖨️ Printing Guidelines

1. **Paper Size in Printer Dialog:** Select **Custom (203mm × 89mm)** or feed standard envelope/cheque into your printer tray.
2. **Margins:** Set margins to **None** or **Default**.
3. **Scale:** Ensure scale is set to **100% (Actual Size)**, DO NOT select "Fit to Page" so millimeter precision is preserved.
