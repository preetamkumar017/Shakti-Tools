import React, { useState, useRef } from 'react';
import DynamicChequeBackground from './DynamicChequeBackground';

const PX_PER_MM = 4; // 4px per millimeter

export default function ChequeCanvas({
  activeBank,
  coordinates,
  formData,
  wordsSplit,
  formattedAmount,
  selectedElementKey,
  onSelectElement,
  onUpdateCoordinate,
  globalOffsetX,
  globalOffsetY
}) {
  const [showBg, setShowBg] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const leafRef = useRef(null);

  // Dragging state
  const dragInfo = useRef({
    isDragging: false,
    elementKey: null,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0
  });

  const leafW = (activeBank?.chequeWidth || 203) * PX_PER_MM;
  const leafH = (activeBank?.chequeHeight || 89) * PX_PER_MM;

  // Extract 8 digits for date [D, D, M, M, Y, Y, Y, Y]
  const getDateDigits = (dateStr) => {
    if (!dateStr) return ['', '', '', '', '', '', '', ''];
    let d = '', m = '', y = '';
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      y = parts[0] || '';
      m = parts[1] || '';
      d = parts[2] || '';
    } else if (dateStr.length === 8) {
      d = dateStr.substring(0, 2);
      m = dateStr.substring(2, 4);
      y = dateStr.substring(4, 8);
    }
    const full = `${d.padStart(2, ' ')}${m.padStart(2, ' ')}${y.padStart(4, ' ')}`;
    return full.split('').slice(0, 8);
  };

  const dateDigits = getDateDigits(formData.date);
  const dateConfig = coordinates?.date || {
    x: 152,
    y: 11,
    boxWidth: 4.5,
    boxHeight: 6.0,
    boxGap: 0.8,
    groupGap: 2.5,
    yearGap: 3.0,
    fontSize: 13
  };
  const effectiveYearGap = (dateConfig.yearGap !== undefined && dateConfig.yearGap <= 4.5)
    ? dateConfig.yearGap
    : 3.0;

  const handleMouseDown = (key, e) => {
    e.stopPropagation();
    onSelectElement(key);
    const coord = coordinates[key];
    if (!coord) return;

    dragInfo.current = {
      isDragging: true,
      elementKey: key,
      startX: e.clientX,
      startY: e.clientY,
      initialX: coord.x,
      initialY: coord.y
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragInfo.current.isDragging) return;
    const { elementKey, startX, startY, initialX, initialY } = dragInfo.current;
    const deltaX = (e.clientX - startX) / PX_PER_MM;
    const deltaY = (e.clientY - startY) / PX_PER_MM;

    const maxW = activeBank?.chequeWidth || 203;
    const maxH = activeBank?.chequeHeight || 89;

    const newX = Math.max(0, Math.min(maxW, parseFloat((initialX + deltaX).toFixed(1))));
    const newY = Math.max(0, Math.min(maxH, parseFloat((initialY + deltaY).toFixed(1))));

    onUpdateCoordinate(elementKey, newX, newY);
  };

  const handleMouseUp = () => {
    dragInfo.current.isDragging = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const getStyle = (key) => {
    const coord = coordinates[key] || { x: 0, y: 0 };
    return {
      left: `${coord.x * PX_PER_MM}px`,
      top: `${coord.y * PX_PER_MM}px`,
      fontSize: coord.fontSize ? `${coord.fontSize}px` : undefined,
      letterSpacing: coord.letterSpacing ? `${coord.letterSpacing * PX_PER_MM}px` : undefined,
      width: coord.width ? `${coord.width * PX_PER_MM}px` : undefined
    };
  };

  return (
    <div className="canvas-panel">
      {/* Canvas Top Toolbar */}
      <div className="canvas-toolbar print-hide">
        <div className="toolbar-group">
          <span className="dimension-badge">
            Size: {activeBank?.chequeWidth || 203}mm × {activeBank?.chequeHeight || 89}mm ({activeBank?.name})
          </span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowBg(!showBg)}
            title="Toggle background cheque leaf graphics"
          >
            👁️ Cheque Background: <strong>{showBg ? 'ON' : 'OFF (Print-Only)'}</strong>
          </button>
          <button
            className={`btn btn-secondary btn-sm ${showGrid ? 'btn-primary' : ''}`}
            onClick={() => setShowGrid(!showGrid)}
            title="Show 5mm precision alignment grid"
          >
            📐 Grid & Ruler
          </button>
        </div>

        <div className="toolbar-group">
          <span style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>
            💡 Drag any element to adjust position for {activeBank?.shortName}
          </span>
        </div>
      </div>

      {/* Cheque Canvas Area */}
      <div className="canvas-container">
        <div
          className="cheque-leaf"
          id="cheque-leaf"
          ref={leafRef}
          style={{ width: `${leafW}px`, height: `${leafH}px` }}
        >
          {/* Dynamic Cheque SVG Background (Bank-specific dimensions and lines) */}
          {showBg && (
            <DynamicChequeBackground bank={activeBank} />
          )}

          {/* Alignment Grid Overlay */}
          <div className={`grid-overlay ${showGrid ? 'active' : ''}`} />

          {/* Printable & Draggable Layer */}
          <div className="printable-layer">
            {/* 8-Cell Discrete Date Digits Box */}
            <div
              id="chq-date-container"
              className={`draggable-element print-element ${selectedElementKey === 'date' ? 'selected' : ''}`}
              style={{
                position: 'absolute',
                left: `${dateConfig.x * PX_PER_MM}px`,
                top: `${dateConfig.y * PX_PER_MM}px`,
                display: 'flex',
                alignItems: 'center',
                padding: '0',
                cursor: 'grab'
              }}
              onMouseDown={(e) => handleMouseDown('date', e)}
              title="8-Digit Date Box (Click & Drag)"
            >
              {dateDigits.map((digit, idx) => {
                const isDayMonthGap = idx === 1;
                const isMonthYearGap = idx === 3;
                const marginR = isMonthYearGap
                  ? (effectiveYearGap * PX_PER_MM)
                  : isDayMonthGap
                  ? ((dateConfig.groupGap || 2.5) * PX_PER_MM)
                  : ((dateConfig.boxGap || 0.8) * PX_PER_MM);

                return (
                  <div
                    key={idx}
                    id={`chq-digit-${idx}`}
                    style={{
                      width: `${(dateConfig.boxWidth || 4.5) * PX_PER_MM}px`,
                      height: `${(dateConfig.boxHeight || 6.0) * PX_PER_MM}px`,
                      marginRight: idx < 7 ? `${marginR}px` : '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                      fontSize: `${dateConfig.fontSize || 13}px`,
                      fontWeight: '800',
                      color: '#000000',
                      lineHeight: '1',
                      userSelect: 'none'
                    }}
                  >
                    {digit}
                  </div>
                );
              })}
            </div>

            {/* Payee */}
            <div
              id="chq-payee"
              className={`draggable-element el-payee print-element ${selectedElementKey === 'payee' ? 'selected' : ''}`}
              style={getStyle('payee')}
              onMouseDown={(e) => handleMouseDown('payee', e)}
              title="Payee Name (Click & Drag)"
            >
              *** {formData.payee || ''} ***
            </div>

            {/* Words Line 1 */}
            <div
              id="chq-words-1"
              className={`draggable-element el-words-1 print-element ${selectedElementKey === 'wordsLine1' ? 'selected' : ''}`}
              style={getStyle('wordsLine1')}
              onMouseDown={(e) => handleMouseDown('wordsLine1', e)}
              title="Words Line 1 (Click & Drag)"
            >
              {wordsSplit.line1 ? `*** ${wordsSplit.line1}` : ''}
            </div>

            {/* Words Line 2 */}
            {wordsSplit.line2 && (
              <div
                id="chq-words-2"
                className={`draggable-element el-words-2 print-element ${selectedElementKey === 'wordsLine2' ? 'selected' : ''}`}
                style={getStyle('wordsLine2')}
                onMouseDown={(e) => handleMouseDown('wordsLine2', e)}
                title="Words Line 2 (Click & Drag)"
              >
                {wordsSplit.line2} ***
              </div>
            )}

            {/* Amount in Numbers */}
            <div
              id="chq-amount"
              className={`draggable-element el-amount-num print-element ${selectedElementKey === 'amountNum' ? 'selected' : ''}`}
              style={getStyle('amountNum')}
              onMouseDown={(e) => handleMouseDown('amountNum', e)}
              title="Amount in Figures (Click & Drag)"
            >
              {formattedAmount ? `₹ ${formattedAmount} /-` : ''}
            </div>

            {/* A/C Payee Crossing */}
            {formData.acPayee && (
              <div
                id="chq-crossing"
                className={`draggable-element el-ac-payee ac-payee-stamp print-element ${selectedElementKey === 'crossing' ? 'selected' : ''}`}
                style={getStyle('crossing')}
                onMouseDown={(e) => handleMouseDown('crossing', e)}
                title="A/C Payee Crossing (Click & Drag)"
              >
                {formData.notNegotiable ? 'NOT NEGOTIABLE' : 'A/C PAYEE ONLY'}
              </div>
            )}

            {/* Strike 'Or Bearer' */}
            {formData.strikeBearer && (
              <div
                id="chq-bearer"
                className={`draggable-element el-bearer-strike bearer-strike-line print-element ${selectedElementKey === 'bearerStrike' ? 'selected' : ''}`}
                style={getStyle('bearerStrike')}
                onMouseDown={(e) => handleMouseDown('bearerStrike', e)}
                title="Strike Bearer Line (Click & Drag)"
              />
            )}

            {/* Signatory */}
            <div
              id="chq-signatory"
              className={`draggable-element el-signatory print-element ${selectedElementKey === 'signatory' ? 'selected' : ''}`}
              style={getStyle('signatory')}
              onMouseDown={(e) => handleMouseDown('signatory', e)}
              title="Signatory (Click & Drag)"
            >
              {formData.signatoryText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
