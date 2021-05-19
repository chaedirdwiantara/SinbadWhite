import numeral from 'numeral';

numeral.register('locale', 'id', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'ribu',
    million: 'juta',
    billion: 'milyar',
    trillion: 'triliun'
  },
  currency: {
    symbol: 'Rp'
  }
});

numeral.locale('id');

/**
 * Convert number to short form rupiah currency
 * @param {number|string} number
 * @returns {string} - currency.
 */
const toCurrencyShort = number => {
  return numeral(number).format('$ 0.00 a');
};

function NumberFormat(number) {
  return `${number
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&.')
    .slice(0, -3)}`;
}

function MoneyFormat(money) {
  return `Rp${money
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&.')
    .slice(0, -3)}`;
}

function MoneyFormatShort(number) {
  return toCurrencyShort(number);
}

function MoneyFormatSpace(money) {
  return `Rp ${money
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&.')
    .slice(0, -3)}`;
}

export { NumberFormat, MoneyFormat, MoneyFormatShort, MoneyFormatSpace };
