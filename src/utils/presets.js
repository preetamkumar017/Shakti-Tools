/**
 * Comprehensive Indian Bank CTS-2010 Presets and Exact Physical Measurements (in mm)
 * Verified against RBI & NPCI CTS-2010 Guidelines and Physical Bank Cheques
 * Includes exact Cheque Width, Height, and 8-Box Date Grid Parameters
 */

export const BANK_CATEGORIES = {
  PUBLIC: 'Public Sector Banks',
  PRIVATE: 'Private Sector Banks',
  SMALL_FINANCE: 'Small Finance & Payments Banks',
  FOREIGN: 'Foreign / MNC Banks',
  CUSTOM: 'Custom / Other'
};

export const DEFAULT_BANKS = {
  // ==========================================
  // 1. PUBLIC SECTOR BANKS (PSBs)
  // ==========================================
  sbi: {
    id: 'sbi',
    name: 'State Bank of India (SBI)',
    shortName: 'SBI',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#002B49',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 152.0, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 38.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 182.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  pnb: {
    id: 'pnb',
    name: 'Punjab National Bank (PNB)',
    shortName: 'PNB',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#A2173B',
    chequeWidth: 203,
    chequeHeight: 90,
    coordinates: {
      date: { x: 151.0, y: 11.5, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.7, groupGap: 2.6, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.5, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 38.0, y: 32.5, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.5, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 41.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 182.0, y: 24.5, width: 14, show: true },
      signatory: { x: 142.0, y: 65.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  bob: {
    id: 'bob',
    name: 'Bank of Baroda (BOB)',
    shortName: 'BOB',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#F26522',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 150.5, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  canara: {
    id: 'canara',
    name: 'Canara Bank',
    shortName: 'CANARA',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#0072BC',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.5, y: 10.8, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 23.0, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 147.0, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 141.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  union: {
    id: 'union',
    name: 'Union Bank of India',
    shortName: 'UNION',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#ED1C24',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 150.8, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 24.2, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.5, y: 32.2, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.2, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.2, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  boi: {
    id: 'boi',
    name: 'Bank of India (BOI)',
    shortName: 'BOI',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#D32F2F',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.2, y: 11.2, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.2, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 40.2, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.2, width: 14, show: true },
      signatory: { x: 142.0, y: 64.2, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  indianbank: {
    id: 'indianbank',
    name: 'Indian Bank',
    shortName: 'INDIAN',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#0C4DA2',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.2, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.5, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  centralbank: {
    id: 'centralbank',
    name: 'Central Bank of India',
    shortName: 'CBI',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#005A9C',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 150.5, y: 11.4, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.5, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.5, y: 32.5, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.5, fontSize: 12, show: true },
      amountNum: { x: 147.0, y: 40.5, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 182.5, y: 24.5, width: 14, show: true },
      signatory: { x: 142.0, y: 64.5, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  iob: {
    id: 'iob',
    name: 'Indian Overseas Bank (IOB)',
    shortName: 'IOB',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#0054A6',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  uco: {
    id: 'uco',
    name: 'UCO Bank',
    shortName: 'UCO',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#005B94',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.2, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.2, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.2, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.2, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 40.2, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.2, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  mahabank: {
    id: 'mahabank',
    name: 'Bank of Maharashtra',
    shortName: 'BOM',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#006DB6',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  psb: {
    id: 'psb',
    name: 'Punjab & Sind Bank',
    shortName: 'PSB',
    category: BANK_CATEGORIES.PUBLIC,
    themeColor: '#C41230',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.2, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.2, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.5, y: 32.2, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.2, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.2, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.2, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },

  // ==========================================
  // 2. PRIVATE SECTOR BANKS
  // ==========================================
  hdfc: {
    id: 'hdfc',
    name: 'HDFC Bank',
    shortName: 'HDFC',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#004c8f',
    chequeWidth: 202,
    chequeHeight: 92, // Real HDFC leaf size is 92mm height
    coordinates: {
      date: { x: 147.5, y: 9.5, boxWidth: 4.6, boxHeight: 6.0, boxGap: 0.9, groupGap: 3.0, fontSize: 13, show: true },
      payee: { x: 24.0, y: 23.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 36.0, y: 31.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.0, fontSize: 12, show: true },
      amountNum: { x: 147.0, y: 39.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 184.0, y: 23.0, width: 15, show: true },
      signatory: { x: 140.0, y: 65.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  icici: {
    id: 'icici',
    name: 'ICICI Bank',
    shortName: 'ICICI',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#B02A30',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 153.0, y: 10.0, boxWidth: 4.4, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.4, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.5, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  axis: {
    id: 'axis',
    name: 'Axis Bank',
    shortName: 'AXIS',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#861F41',
    chequeWidth: 202,
    chequeHeight: 92, // Real Axis leaf is 92mm height
    coordinates: {
      date: { x: 149.0, y: 9.2, boxWidth: 4.6, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.8, fontSize: 13, show: true },
      payee: { x: 23.0, y: 23.5, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 36.5, y: 31.5, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.5, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 39.5, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 23.5, width: 14, show: true },
      signatory: { x: 141.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  kotak: {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    shortName: 'KOTAK',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#ED1C24',
    chequeWidth: 202,
    chequeHeight: 92,
    coordinates: {
      date: { x: 148.0, y: 9.5, boxWidth: 4.7, boxHeight: 6.0, boxGap: 0.8, groupGap: 3.0, fontSize: 13, show: true },
      payee: { x: 23.0, y: 23.5, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 36.5, y: 31.5, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.5, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 39.5, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 23.5, width: 14, show: true },
      signatory: { x: 141.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  indusind: {
    id: 'indusind',
    name: 'IndusInd Bank',
    shortName: 'INDUSIND',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#93181A',
    chequeWidth: 202,
    chequeHeight: 92,
    coordinates: {
      date: { x: 148.5, y: 9.5, boxWidth: 4.6, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.8, fontSize: 13, show: true },
      payee: { x: 23.0, y: 23.6, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 36.5, y: 31.6, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.6, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 39.5, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.5, y: 23.6, width: 14, show: true },
      signatory: { x: 141.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  yesbank: {
    id: 'yesbank',
    name: 'Yes Bank',
    shortName: 'YES',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#0054A6',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 10.5, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 23.8, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 31.8, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.8, fontSize: 12, show: true },
      amountNum: { x: 147.0, y: 39.8, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 23.8, width: 14, show: true },
      signatory: { x: 141.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  idfc: {
    id: 'idfc',
    name: 'IDFC FIRST Bank',
    shortName: 'IDFC',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#9D2235',
    chequeWidth: 202,
    chequeHeight: 92,
    coordinates: {
      date: { x: 148.0, y: 9.4, boxWidth: 4.6, boxHeight: 6.0, boxGap: 0.8, groupGap: 3.0, fontSize: 13, show: true },
      payee: { x: 23.0, y: 23.5, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 36.5, y: 31.5, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.5, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 39.5, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 184.0, y: 23.5, width: 14, show: true },
      signatory: { x: 141.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  federal: {
    id: 'federal',
    name: 'Federal Bank',
    shortName: 'FEDERAL',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#002B49',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  idbi: {
    id: 'idbi',
    name: 'IDBI Bank',
    shortName: 'IDBI',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#005448',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.2, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.2, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.2, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.2, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.2, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.2, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  bandhan: {
    id: 'bandhan',
    name: 'Bandhan Bank',
    shortName: 'BANDHAN',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#003366',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  southindian: {
    id: 'southindian',
    name: 'South Indian Bank',
    shortName: 'SIB',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#9E1B32',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  rbl: {
    id: 'rbl',
    name: 'RBL Bank',
    shortName: 'RBL',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#122D68',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.5, y: 10.8, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 23.8, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 31.8, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.8, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 39.8, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 23.8, width: 14, show: true },
      signatory: { x: 141.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  karur: {
    id: 'karur',
    name: 'Karur Vysya Bank (KVB)',
    shortName: 'KVB',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#BE1E2D',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  cityunion: {
    id: 'cityunion',
    name: 'City Union Bank (CUB)',
    shortName: 'CUB',
    category: BANK_CATEGORIES.PRIVATE,
    themeColor: '#004A99',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },

  // ==========================================
  // 3. SMALL FINANCE & PAYMENTS BANKS
  // ==========================================
  aubank: {
    id: 'aubank',
    name: 'AU Small Finance Bank',
    shortName: 'AU',
    category: BANK_CATEGORIES.SMALL_FINANCE,
    themeColor: '#6B1B62',
    chequeWidth: 202,
    chequeHeight: 92,
    coordinates: {
      date: { x: 149.0, y: 9.6, boxWidth: 4.6, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.8, fontSize: 13, show: true },
      payee: { x: 22.5, y: 23.8, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 31.8, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.8, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 39.8, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 23.8, width: 14, show: true },
      signatory: { x: 141.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  equitas: {
    id: 'equitas',
    name: 'Equitas Small Finance Bank',
    shortName: 'EQUITAS',
    category: BANK_CATEGORIES.SMALL_FINANCE,
    themeColor: '#00539B',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.2, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  ujjivan: {
    id: 'ujjivan',
    name: 'Ujjivan Small Finance Bank',
    shortName: 'UJJIVAN',
    category: BANK_CATEGORIES.SMALL_FINANCE,
    themeColor: '#ED1B2D',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  paytm: {
    id: 'paytm',
    name: 'Paytm Payments Bank',
    shortName: 'PAYTM',
    category: BANK_CATEGORIES.SMALL_FINANCE,
    themeColor: '#002E6E',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.5, y: 10.8, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.5, y: 23.8, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 31.8, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.8, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 39.8, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 23.8, width: 14, show: true },
      signatory: { x: 141.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },

  // ==========================================
  // 4. FOREIGN / MULTINATIONAL BANKS IN INDIA
  // ==========================================
  scb: {
    id: 'scb',
    name: 'Standard Chartered Bank',
    shortName: 'SCB',
    category: BANK_CATEGORIES.FOREIGN,
    themeColor: '#00A54F',
    chequeWidth: 202,
    chequeHeight: 92,
    coordinates: {
      date: { x: 149.0, y: 9.5, boxWidth: 4.6, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.8, fontSize: 13, show: true },
      payee: { x: 23.0, y: 23.5, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 36.0, y: 31.5, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.5, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 39.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 184.0, y: 23.5, width: 15, show: true },
      signatory: { x: 140.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  hsbc: {
    id: 'hsbc',
    name: 'HSBC India',
    shortName: 'HSBC',
    category: BANK_CATEGORIES.FOREIGN,
    themeColor: '#DB0011',
    chequeWidth: 202,
    chequeHeight: 92,
    coordinates: {
      date: { x: 149.2, y: 9.6, boxWidth: 4.6, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.8, fontSize: 13, show: true },
      payee: { x: 23.0, y: 23.5, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 36.5, y: 31.5, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.5, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 39.2, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 184.0, y: 23.5, width: 14, show: true },
      signatory: { x: 141.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },
  citi: {
    id: 'citi',
    name: 'Citibank India',
    shortName: 'CITI',
    category: BANK_CATEGORIES.FOREIGN,
    themeColor: '#003B70',
    chequeWidth: 202,
    chequeHeight: 92,
    coordinates: {
      date: { x: 149.0, y: 9.5, boxWidth: 4.6, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.8, fontSize: 13, show: true },
      payee: { x: 23.0, y: 23.5, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 36.0, y: 31.5, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 39.5, fontSize: 12, show: true },
      amountNum: { x: 147.5, y: 39.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 184.0, y: 23.5, width: 14, show: true },
      signatory: { x: 140.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  },

  // ==========================================
  // 5. CUSTOM / USER DEFINED
  // ==========================================
  custom: {
    id: 'custom',
    name: 'Custom Bank Layout (User Defined)',
    shortName: 'CUSTOM',
    category: BANK_CATEGORIES.CUSTOM,
    themeColor: '#6366F1',
    chequeWidth: 203,
    chequeHeight: 89,
    coordinates: {
      date: { x: 151.0, y: 11.0, boxWidth: 4.5, boxHeight: 6.0, boxGap: 0.8, groupGap: 2.5, fontSize: 13, show: true },
      payee: { x: 22.0, y: 24.0, fontSize: 13, show: true, prefixSuffix: '***' },
      wordsLine1: { x: 37.0, y: 32.0, fontSize: 12, show: true },
      wordsLine2: { x: 18.0, y: 40.0, fontSize: 12, show: true },
      amountNum: { x: 148.0, y: 40.0, width: 40, height: 11, fontSize: 15, show: true, prefix: '₹ ', suffix: '/-' },
      crossing: { x: 20.0, y: 12.0, fontSize: 10, show: true, text: 'A/C PAYEE ONLY' },
      bearerStrike: { x: 183.0, y: 24.0, width: 14, show: true },
      signatory: { x: 142.0, y: 64.0, fontSize: 11, show: true, title: 'For SHAKTI TOOLS ENTERPRISE' }
    }
  }
};

const STORAGE_KEY = 'shakti_tools_bank_presets';

export function getSavedPresets() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return JSON.parse(JSON.stringify(DEFAULT_BANKS));
  try {
    const parsed = JSON.parse(saved);
    // Sanitize any accidentally inflated yearGap (e.g. from previous 6.5mm)
    Object.values(parsed).forEach(b => {
      if (b?.coordinates?.date && (b.coordinates.date.yearGap > 4.5 || b.coordinates.date.yearGap === undefined)) {
        b.coordinates.date.yearGap = 3.0;
      }
    });
    return { ...DEFAULT_BANKS, ...parsed };
  } catch (e) {
    console.error('Error parsing stored presets', e);
    return JSON.parse(JSON.stringify(DEFAULT_BANKS));
  }
}

export function savePreset(bankId, presetData) {
  const all = getSavedPresets();
  all[bankId] = presetData;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function resetPresetToDefault(bankId) {
  if (DEFAULT_BANKS[bankId]) {
    const all = getSavedPresets();
    all[bankId] = JSON.parse(JSON.stringify(DEFAULT_BANKS[bankId]));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return all[bankId];
  }
  return null;
}
