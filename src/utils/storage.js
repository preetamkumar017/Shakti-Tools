/**
 * Cheque Register & Storage Helpers for React Suite
 */

const HISTORY_KEY = 'shakti_tools_cheque_history';

export function getChequeHistory() {
  const data = localStorage.getItem(HISTORY_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveChequeToHistory(record) {
  const history = getChequeHistory();
  const entry = {
    id: 'chq_' + Date.now(),
    date: record.date || new Date().toISOString().split('T')[0],
    chequeNo: record.chequeNo || 'N/A',
    bank: record.bankName || 'Standard CTS-2010',
    payee: record.payee || '',
    amount: record.amount || 0,
    amountWords: record.amountWords || '',
    acPayee: !!record.acPayee,
    timestamp: new Date().toISOString()
  };
  history.unshift(entry);
  if (history.length > 100) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history;
}

export function deleteChequeRecord(id) {
  let history = getChequeHistory();
  history = history.filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history;
}

export function clearChequeHistory() {
  localStorage.removeItem(HISTORY_KEY);
  return [];
}

export function exportHistoryToCSV() {
  const history = getChequeHistory();
  if (history.length === 0) return false;

  const headers = ['ID', 'Date', 'Cheque No', 'Bank', 'Payee Name', 'Amount (INR)', 'Amount in Words', 'A/C Payee', 'Printed At'];
  const rows = history.map(item => [
    item.id,
    `"${item.date}"`,
    `"${item.chequeNo}"`,
    `"${item.bank}"`,
    `"${item.payee.replace(/"/g, '""')}"`,
    item.amount,
    `"${item.amountWords.replace(/"/g, '""')}"`,
    item.acPayee ? 'YES' : 'NO',
    `"${new Date(item.timestamp).toLocaleString()}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cheque_register_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}
