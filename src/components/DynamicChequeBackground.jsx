import React from 'react';
import { DEFAULT_BANKS } from '../utils/presets';

const PX_PER_MM = 4;

export default function DynamicChequeBackground({ bank }) {
  if (!bank) return null;

  // Always use the bank's fixed physical template so the paper lines & boxes NEVER move when user drags text!
  const defaultBankData = DEFAULT_BANKS[bank.id] || DEFAULT_BANKS['sbi'];
  const fixedCoords = defaultBankData.coordinates;

  const w = (defaultBankData.chequeWidth || 203) * PX_PER_MM;
  const h = (defaultBankData.chequeHeight || 89) * PX_PER_MM;
  const theme = defaultBankData.themeColor || '#1e293b';

  const date = fixedCoords.date;
  const payeeY = fixedCoords.payee.y * PX_PER_MM;
  const wordsY1 = fixedCoords.wordsLine1.y * PX_PER_MM;
  const wordsY2 = fixedCoords.wordsLine2.y * PX_PER_MM;
  const amountBox = fixedCoords.amountNum;
  const signatoryY = fixedCoords.signatory.y * PX_PER_MM;
  const bearerX = (fixedCoords.bearerStrike.x || 182) * PX_PER_MM;

  // Calculate 8 fixed pre-printed date boxes in pixels for this physical cheque
  const boxes = [];
  const labels = ['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y'];
  const boxW = (date.boxWidth || 4.5) * PX_PER_MM;
  const boxH = (date.boxHeight || 6.0) * PX_PER_MM;
  const boxGap = (date.boxGap || 0.8) * PX_PER_MM;
  const groupGap = (date.groupGap || 2.5) * PX_PER_MM;

  for (let i = 0; i < 8; i++) {
    const extraGap = i >= 4 ? 2 * groupGap : i >= 2 ? groupGap : 0;
    const bx = (date.x * PX_PER_MM) + (i * (boxW + boxGap)) + extraGap;
    const by = date.y * PX_PER_MM;
    boxes.push({ x: bx, y: by, label: labels[i] });
  }

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="cheque-bg-image"
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}
    >
      <defs>
        {/* Security Guilloche Pattern */}
        <pattern id={`guilloche-${bank.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 0 12 Q 6 0, 12 12 T 24 12" fill="none" stroke="#dbeafe" strokeWidth="0.8" opacity="0.6"/>
          <path d="M 0 12 Q 6 24, 12 12 T 24 12" fill="none" stroke="#e0e7ff" strokeWidth="0.8" opacity="0.6"/>
        </pattern>
        <linearGradient id={`bgGrad-${bank.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="50%" stopColor="#f8fafc"/>
          <stop offset="100%" stopColor="#f1f5f9"/>
        </linearGradient>
      </defs>

      {/* Physical Cheque Paper Body */}
      <rect x="0" y="0" width={w} height={h} rx="6" fill={`url(#bgGrad-${bank.id})`} stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="0" y="0" width={w} height={h} fill={`url(#guilloche-${bank.id})`} rx="6"/>

      {/* Top Bank Branding Header */}
      <g transform="translate(18, 14)">
        <rect x="0" y="0" width="230" height="38" rx="4" fill="#ffffff" fillOpacity="0.85" stroke="#cbd5e1" strokeWidth="0.8"/>
        <circle cx="16" cy="19" r="6" fill={theme} />
        <text x="28" y="23" fontFamily="'Inter', sans-serif" fontSize="12" fontWeight="800" fill={theme} letterSpacing="0.4">
          {bank.name}
        </text>
        <text x="28" y="33" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" fill="#64748b">
          VALID FOR 3 MONTHS ONLY
        </text>
      </g>

      {/* CTS-2010 Vertical Watermark Badge */}
      <g transform="translate(18, 140)">
        <rect x="0" y="0" width="16" height="52" fill={theme} opacity="0.08" rx="2"/>
        <text x="-38" y="11" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="800" fill="#64748b" transform="rotate(-90)" letterSpacing="2">
          CTS-2010
        </text>
      </g>

      {/* Fixed Pre-Printed 8 Date Boxes of this Physical Cheque */}
      <g>
        <text
          x={boxes[0]?.x || 0}
          y={(date.y * PX_PER_MM) - 5}
          fontFamily="'Inter', sans-serif"
          fontSize="9"
          fontWeight="700"
          fill="#475569"
          letterSpacing="0.8"
        >
          DATE
        </text>

        {boxes.map((b, idx) => (
          <g key={idx}>
            <rect
              x={b.x}
              y={b.y}
              width={boxW}
              height={boxH}
              fill="#ffffff"
              stroke="#64748b"
              strokeWidth="1.2"
              rx="1.5"
            />
            <text
              x={b.x + boxW / 2}
              y={b.y + boxH + 9}
              fontFamily="'Inter', sans-serif"
              fontSize="7.5"
              fontWeight="600"
              fill="#94a3b8"
              textAnchor="middle"
            >
              {b.label}
            </text>
          </g>
        ))}
      </g>

      {/* Fixed PAY Dotted Line on Cheque Paper */}
      <text x="56" y={payeeY} fontFamily="'Inter', sans-serif" fontSize="12" fontWeight="800" fill="#334155" letterSpacing="1">
        PAY
      </text>
      <line x1="88" y1={payeeY + 2} x2={bearerX - 10} y2={payeeY + 2} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 3"/>
      <text x={bearerX} y={payeeY} fontFamily="'Inter', sans-serif" fontSize="9.5" fontWeight="600" fill="#64748b">
        OR BEARER
      </text>

      {/* Fixed RUPEES Dotted Lines on Cheque Paper */}
      <text x="56" y={wordsY1} fontFamily="'Inter', sans-serif" fontSize="11" fontWeight="800" fill="#334155" letterSpacing="1">
        RUPEES
      </text>
      <line x1="110" y1={wordsY1 + 2} x2={(amountBox.x * PX_PER_MM) - 15} y2={wordsY1 + 2} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 3"/>
      <line x1="56" y1={wordsY2 + 2} x2={(amountBox.x * PX_PER_MM) - 15} y2={wordsY2 + 2} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 3"/>

      {/* Fixed Amount in Figures ₹ Box on Cheque Paper */}
      <g transform={`translate(${amountBox.x * PX_PER_MM}, ${amountBox.y * PX_PER_MM - 6})`}>
        <rect
          x="0"
          y="0"
          width={(amountBox.width || 40) * PX_PER_MM}
          height={(amountBox.height || 11) * PX_PER_MM}
          rx="4"
          fill="#ffffff"
          stroke="#475569"
          strokeWidth="1.5"
        />
        <rect x="3" y="3" width="28" height={(amountBox.height || 11) * PX_PER_MM - 6} fill="#f1f5f9" rx="2"/>
        <text x="10" y="27" fontFamily="'Inter', sans-serif" fontSize="18" fontWeight="800" fill="#0f172a">
          ₹
        </text>
        <line x1="32" y1="3" x2="32" y2={(amountBox.height || 11) * PX_PER_MM - 3} stroke="#cbd5e1" strokeWidth="1"/>
      </g>

      {/* Fixed Account Number Box on Cheque Paper */}
      <g transform="translate(56, 218)">
        <rect x="0" y="0" width="210" height="24" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1"/>
        <text x="10" y="16" fontFamily="'Inter', sans-serif" fontSize="9" fontWeight="700" fill="#475569">
          A/C NO.  00123456789012
        </text>
      </g>

      {/* Fixed Signatory Line on Cheque Paper */}
      <g transform={`translate(${fixedCoords.signatory.x * PX_PER_MM || 560}, ${signatoryY})`}>
        <line x1="0" y1="0" x2="190" y2="0" stroke="#64748b" strokeWidth="1"/>
        <text x="95" y="18" fontFamily="'Inter', sans-serif" fontSize="9.5" fontWeight="600" fill="#475569" textAnchor="middle">
          Please sign above this line
        </text>
      </g>

      {/* Fixed Bottom MICR Clearing Band */}
      <rect x="0" y={h - 71} width={w} height="71" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8"/>
      <text x="180" y={h - 30} fontFamily="'Courier New', monospace" fontSize="16" fontWeight="700" fill="#334155" letterSpacing="4">
        ⑈123456⑈  110002001⑆  000123⑈  10
      </text>
    </svg>
  );
}
