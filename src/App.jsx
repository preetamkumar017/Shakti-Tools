import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import ChequeForm from './components/ChequeForm';
import ChequeCanvas from './components/ChequeCanvas';
import CoordinateInspector from './components/CoordinateInspector';
import ChequeHistory from './components/ChequeHistory';
import CalibrationModal from './components/CalibrationModal';

// Suite Tools
import InvoiceTool from './components/InvoiceTool';
import ReceiptTool from './components/ReceiptTool';
import SalarySlipTool from './components/SalarySlipTool';
import QuotationTool from './components/QuotationTool';
import ChallanTool from './components/ChallanTool';
import GstCalculatorTool from './components/GstCalculatorTool';
import WordsConverterTool from './components/WordsConverterTool';

import { numberToIndianWords, splitChequeWords, formatIndianCurrency } from './utils/wordsConverter';
import { getSavedPresets, savePreset, resetPresetToDefault } from './utils/presets';
import { getChequeHistory, saveChequeToHistory, deleteChequeRecord, clearChequeHistory, exportHistoryToCSV } from './utils/storage';

export default function App() {
  const [activeTool, setActiveTool] = useState('cheque');
  const [banks, setBanks] = useState(() => getSavedPresets());
  const [activeBankId, setActiveBankId] = useState('sbi');
  const [coordinates, setCoordinates] = useState(() => {
    const initialBanks = getSavedPresets();
    const initialCoords = JSON.parse(JSON.stringify(initialBanks['sbi'].coordinates));
    if (initialCoords?.date && (initialCoords.date.yearGap === undefined || initialCoords.date.yearGap > 4.5)) {
      initialCoords.date.yearGap = 3.0;
    }
    return initialCoords;
  });

  const [selectedElementKey, setSelectedElementKey] = useState('payee');

  const [formData, setFormData] = useState({
    chequeNo: '000124',
    date: new Date().toISOString().split('T')[0],
    payee: 'M/S HINDUSTAN SUPPLIERS',
    amount: '125450',
    acPayee: true,
    strikeBearer: true,
    notNegotiable: false,
    signatoryText: 'For SHAKTI TOOLS ENTERPRISE'
  });

  const [globalOffsetX, setGlobalOffsetX] = useState(0);
  const [globalOffsetY, setGlobalOffsetY] = useState(0);
  const [isCalibrationOpen, setIsCalibrationOpen] = useState(false);

  const [theme, setTheme] = useState(() => localStorage.getItem('shakti_tools_theme') || 'dark');
  const [historyRecords, setHistoryRecords] = useState(() => getChequeHistory());
  const [toast, setToast] = useState(null);

  // Sync theme to root html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('shakti_tools_theme', theme);
  }, [theme]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  // Switch Bank Preset
  const handleSelectBank = (bankId) => {
    setActiveBankId(bankId);
    const bankData = banks[bankId] || banks['custom'];
    const newCoords = JSON.parse(JSON.stringify(bankData.coordinates));
    if (newCoords?.date && (newCoords.date.yearGap === undefined || newCoords.date.yearGap > 4.5)) {
      newCoords.date.yearGap = 3.0;
    }
    setCoordinates(newCoords);
    showToast(`Switched to ${bankData.name}`);
  };

  // Reset Coordinates
  const handleResetCoords = () => {
    const def = resetPresetToDefault(activeBankId);
    if (def) {
      const resetCoords = JSON.parse(JSON.stringify(def.coordinates));
      if (resetCoords?.date && (resetCoords.date.yearGap === undefined || resetCoords.date.yearGap > 4.5)) {
        resetCoords.date.yearGap = 3.0;
      }
      setCoordinates(resetCoords);
      setBanks(getSavedPresets());
      showToast(`Reset ${activeBankId.toUpperCase()} coordinates to defaults`);
    }
  };

  // Save current coordinates to active preset
  const handleSavePreset = () => {
    const currentBank = banks[activeBankId];
    currentBank.coordinates = coordinates;
    savePreset(activeBankId, currentBank);
    setBanks(getSavedPresets());
    showToast(`Saved layout settings for ${currentBank.name}!`);
  };

  // Update a single coordinate via drag
  const handleUpdateCoordinate = (key, newX, newY) => {
    setCoordinates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        x: newX,
        y: newY
      }
    }));
  };

  // Nudge coordinate
  const handleNudge = (key, deltaX, deltaY) => {
    setCoordinates((prev) => {
      const current = prev[key];
      if (!current) return prev;
      const x = Math.max(0, Math.min(203, parseFloat((current.x + deltaX).toFixed(1))));
      const y = Math.max(0, Math.min(89, parseFloat((current.y + deltaY).toFixed(1))));
      return {
        ...prev,
        [key]: {
          ...current,
          x,
          y
        }
      };
    });
  };

  // Update a specific nested property in coordinate (e.g. date.boxWidth, date.boxGap)
  const handleUpdateCoordField = (key, field, value) => {
    setCoordinates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  // Form field change
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Derived values for words and format
  const rawWords = numberToIndianWords(formData.amount);
  const wordsSplit = splitChequeWords(rawWords, 48);
  const formattedAmount = formatIndianCurrency(formData.amount);

  // Injects precision millimeter positions into DOM before print
  const injectPrintStyles = () => {
    let styleTag = document.getElementById('cheque-print-positions');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'cheque-print-positions';
      document.head.appendChild(styleTag);
    }

    const currentBank = banks[activeBankId] || { chequeWidth: 203, chequeHeight: 89 };
    const c = coordinates;
    const gx = globalOffsetX;
    const gy = globalOffsetY;

    styleTag.innerHTML = `
      @media print {
        @page {
          size: ${currentBank.chequeWidth}mm ${currentBank.chequeHeight}mm;
          margin: 0;
        }
        #chq-date-container {
          position: absolute !important;
          left: ${c.date.x + gx}mm !important;
          top: ${c.date.y + gy}mm !important;
          display: flex !important;
          align-items: center !important;
        }
        #chq-digit-0, #chq-digit-1, #chq-digit-2, #chq-digit-3, #chq-digit-4, #chq-digit-5, #chq-digit-6, #chq-digit-7 {
          width: ${c.date.boxWidth}mm !important;
          height: ${c.date.boxHeight}mm !important;
          text-align: center !important;
          font-family: 'JetBrains Mono', 'Courier New', monospace !important;
          font-size: ${c.date.fontSize}pt !important;
          font-weight: 800 !important;
          color: #000000 !important;
        }
        #chq-digit-0, #chq-digit-2, #chq-digit-4, #chq-digit-5, #chq-digit-6 {
          margin-right: ${c.date.boxGap}mm !important;
        }
        #chq-digit-1 {
          margin-right: ${c.date.groupGap || 2.5}mm !important;
        }
        #chq-digit-3 {
          margin-right: ${(c.date.yearGap !== undefined && c.date.yearGap <= 4.5) ? c.date.yearGap : 3.0}mm !important;
        }
        #chq-payee { left: ${c.payee.x + gx}mm !important; top: ${c.payee.y + gy}mm !important; font-size: ${c.payee.fontSize || 13}pt !important; }
        #chq-words-1 { left: ${c.wordsLine1.x + gx}mm !important; top: ${c.wordsLine1.y + gy}mm !important; font-size: ${c.wordsLine1.fontSize || 12}pt !important; }
        #chq-words-2 { left: ${c.wordsLine2.x + gx}mm !important; top: ${c.wordsLine2.y + gy}mm !important; font-size: ${c.wordsLine2.fontSize || 12}pt !important; }
        #chq-amount { left: ${c.amountNum.x + gx}mm !important; top: ${c.amountNum.y + gy}mm !important; font-size: ${c.amountNum.fontSize || 15}pt !important; }
        #chq-crossing { left: ${c.crossing.x + gx}mm !important; top: ${c.crossing.y + gy}mm !important; }
        #chq-bearer { left: ${c.bearerStrike.x + gx}mm !important; top: ${c.bearerStrike.y + gy}mm !important; width: ${c.bearerStrike.width || 14}mm !important; }
        #chq-signatory { left: ${c.signatory.x + gx}mm !important; top: ${c.signatory.y + gy}mm !important; font-size: ${c.signatory.fontSize || 11}pt !important; }
      }
    `;
  };

  // Print Cheque Handler
  const handlePrintCheque = () => {
    if (!formData.payee.trim()) {
      alert('Please enter a Payee Name before printing.');
      return;
    }

    // Save to register
    const newRecords = saveChequeToHistory({
      date: formData.date,
      chequeNo: formData.chequeNo.trim(),
      bankName: banks[activeBankId]?.name || 'Standard CTS-2010',
      payee: formData.payee.trim(),
      amount: formData.amount,
      amountWords: rawWords,
      acPayee: formData.acPayee
    });
    setHistoryRecords(newRecords);

    injectPrintStyles();
    showToast('Cheque details logged. Opening Print dialog...');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  // Print Calibration Test Sheet
  const handlePrintTestSheet = () => {
    let testStyle = document.getElementById('test-calibration-style');
    if (!testStyle) {
      testStyle = document.createElement('style');
      testStyle.id = 'test-calibration-style';
      document.head.appendChild(testStyle);
    }

    testStyle.innerHTML = `
      @media print {
        @page { size: A4; margin: 15mm; }
        .cheque-leaf {
          border: 2px dashed #000000 !important;
          background: #ffffff !important;
        }
        .grid-overlay {
          display: block !important;
          opacity: 0.8 !important;
        }
      }
    `;

    setIsCalibrationOpen(false);
    showToast('Printing Test Calibration Sheet on plain A4...');
    setTimeout(() => {
      window.print();
      testStyle.remove();
    }, 400);
  };

  // History Actions
  const handleReloadHistory = (record) => {
    setFormData({
      chequeNo: record.chequeNo,
      date: record.date,
      payee: record.payee,
      amount: record.amount,
      acPayee: record.acPayee,
      strikeBearer: true,
      notNegotiable: false,
      signatoryText: formData.signatoryText
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded Cheque #${record.chequeNo} into editor!`);
  };

  const handleDeleteHistory = (id) => {
    const updated = deleteChequeRecord(id);
    setHistoryRecords(updated);
    showToast('Record deleted.', 'info');
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all cheque register records?')) {
      clearChequeHistory();
      setHistoryRecords([]);
      showToast('Cheque register cleared.', 'info');
    }
  };

  const handleExportCsv = () => {
    const success = exportHistoryToCSV();
    if (success) {
      showToast('Exported Cheque Register to CSV!');
    } else {
      showToast('No records to export.', 'info');
    }
  };

  return (
    <>
      {/* Atmosphere Orbs */}
      <div className="bg-ambient-glow print-hide">
        <div className="glow-orb-1" />
        <div className="glow-orb-2" />
      </div>

      <div className="app-container">
        {/* Sidebar */}
        <Sidebar
          activeTool={activeTool}
          onSelectTool={(toolId) => {
            setActiveTool(toolId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onScrollToHistory={() => {
            document.getElementById('section-history')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCalibration={() => setIsCalibrationOpen(true)}
        />

        {/* Main Content Area */}
        <main className="main-content">
          <TopNavbar
            activeTool={activeTool}
            banks={banks}
            activeBankId={activeBankId}
            onSelectBank={handleSelectBank}
            onOpenCalibration={() => setIsCalibrationOpen(true)}
            onResetCoords={handleResetCoords}
            onPrintCheque={handlePrintCheque}
            theme={theme}
            onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          />

          {/* Conditional Tool Views */}
          {activeTool === 'cheque' && (
            <>
              {/* Workspace Studio */}
              <div className="workspace-layout">
                {/* Left Column: Form */}
                <ChequeForm
                  formData={formData}
                  onChange={handleFormChange}
                  activeBankName={banks[activeBankId]?.name || 'Standard'}
                  wordsPreview={rawWords}
                />

                {/* Right Column: Canvas Studio */}
                <div>
                  <ChequeCanvas
                    activeBank={banks[activeBankId]}
                    coordinates={coordinates}
                    formData={formData}
                    wordsSplit={wordsSplit}
                    formattedAmount={formattedAmount}
                    selectedElementKey={selectedElementKey}
                    onSelectElement={setSelectedElementKey}
                    onUpdateCoordinate={handleUpdateCoordinate}
                    globalOffsetX={globalOffsetX}
                    globalOffsetY={globalOffsetY}
                  />

                  <CoordinateInspector
                    activeBank={banks[activeBankId]}
                    selectedKey={selectedElementKey}
                    coordinates={coordinates}
                    onNudge={handleNudge}
                    onUpdateCoordField={handleUpdateCoordField}
                    onSavePreset={handleSavePreset}
                  />
                </div>
              </div>

              {/* Cheque Register / History */}
              <ChequeHistory
                records={historyRecords}
                onReload={handleReloadHistory}
                onDelete={handleDeleteHistory}
                onClear={handleClearHistory}
                onExportCsv={handleExportCsv}
              />
            </>
          )}

          {activeTool === 'invoice' && <InvoiceTool />}
          {activeTool === 'receipt' && <ReceiptTool />}
          {activeTool === 'salary' && <SalarySlipTool />}
          {activeTool === 'quotation' && <QuotationTool />}
          {activeTool === 'challan' && <ChallanTool />}
          {activeTool === 'calculator' && <GstCalculatorTool />}
          {activeTool === 'converter' && <WordsConverterTool />}
        </main>
      </div>

      {/* Printer Calibration Modal */}
      <CalibrationModal
        isOpen={isCalibrationOpen}
        onClose={() => setIsCalibrationOpen(false)}
        offsetX={globalOffsetX}
        offsetY={globalOffsetY}
        onChangeOffset={(axis, val) => {
          if (axis === 'x') setGlobalOffsetX(val);
          if (axis === 'y') setGlobalOffsetY(val);
        }}
        onPrintTestSheet={handlePrintTestSheet}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="toast-container print-hide">
          <div className={`toast toast-${toast.type}`}>
            <span>{toast.type === 'success' ? '✅' : 'ℹ️'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
