function MoneyFormat(money) {
  return `Rp. ${money
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&.')
    .slice(0, -3)}`;
}

function MoneyFormatShort(number) {
  if (number.toString().length > 6) {
    const money = number.toString().slice(0, -5);
    if (money[1] === '0') {
      return `Rp. ${money.slice(0, -1)} jt`;
    }
    return `Rp. ${money[0]}.${money[1]} jt`;
  }
  return `Rp. ${number.toString().slice(0, -3)} rb`;
}

export { MoneyFormat, MoneyFormatShort };
