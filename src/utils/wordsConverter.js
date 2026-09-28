/**
 * Number to Words Converter (Specialized for Indian Financial & Cheque Printing Format)
 * Handles: Crores, Lakhs, Thousands, Hundreds, Units, and Paise.
 */

const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function convertTwoDigits(n) {
  if (n < 20) return units[n];
  const ten = Math.floor(n / 10);
  const unit = n % 10;
  return tens[ten] + (unit ? ' ' + units[unit] : '');
}

function convertThreeDigits(n) {
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  let str = '';
  if (hundred > 0) {
    str += units[hundred] + ' Hundred';
    if (rest > 0) str += ' and ';
  }
  if (rest > 0) {
    str += convertTwoDigits(rest);
  }
  return str;
}

/**
 * Converts a number to Indian Currency words (Rupees and Paise)
 * @param {number|string} amount 
 * @returns {string} e.g., "One Lakh Twenty Five Thousand Four Hundred and Fifty Rupees Only"
 */
export function numberToIndianWords(amount) {
  if (amount === null || amount === undefined || amount === '') return '';
  const num = parseFloat(amount);
  if (isNaN(num) || num === 0) return 'Zero Rupees Only';

  const parts = num.toFixed(2).split('.');
  let integerPart = parseInt(parts[0], 10);
  const decimalPart = parseInt(parts[1], 10);

  if (integerPart === 0 && decimalPart > 0) {
    return convertTwoDigits(decimalPart) + ' Paise Only';
  }

  let words = '';

  // Crores (>= 1,00,00,000)
  const crores = Math.floor(integerPart / 10000000);
  integerPart %= 10000000;
  if (crores > 0) {
    words += (crores >= 100 ? convertThreeDigits(crores) : convertTwoDigits(crores)) + ' Crore ';
  }

  // Lakhs (>= 1,00,000)
  const lakhs = Math.floor(integerPart / 100000);
  integerPart %= 100000;
  if (lakhs > 0) {
    words += convertTwoDigits(lakhs) + ' Lakh ';
  }

  // Thousands (>= 1,000)
  const thousands = Math.floor(integerPart / 1000);
  integerPart %= 1000;
  if (thousands > 0) {
    words += convertTwoDigits(thousands) + ' Thousand ';
  }

  // Hundreds & below
  if (integerPart > 0) {
    words += convertThreeDigits(integerPart) + ' ';
  }

  words = words.trim() + ' Rupees';

  if (decimalPart > 0) {
    words += ' and ' + convertTwoDigits(decimalPart) + ' Paise';
  }

  words += ' Only';
  return words;
}

/**
 * Automatically splits words into two lines for standard cheque format
 * @param {string} words 
 * @param {number} maxLine1Length approximate character limit for line 1
 * @returns {{line1: string, line2: string}}
 */
export function splitChequeWords(words, maxLine1Length = 50) {
  if (!words) return { line1: '', line2: '' };
  if (words.length <= maxLine1Length) {
    return { line1: words, line2: '' };
  }

  const wordsArr = words.split(' ');
  let line1 = '';
  let line2 = '';

  for (let i = 0; i < wordsArr.length; i++) {
    const word = wordsArr[i];
    if ((line1 + (line1 ? ' ' : '') + word).length <= maxLine1Length && line2 === '') {
      line1 += (line1 ? ' ' : '') + word;
    } else {
      line2 += (line2 ? ' ' : '') + word;
    }
  }

  return { line1, line2 };
}

/**
 * Formats a number to Indian currency format with commas
 * e.g., 150000 -> 1,50,000.00
 */
export function formatIndianCurrency(amount) {
  if (amount === '' || isNaN(amount)) return '';
  const num = parseFloat(amount);
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
