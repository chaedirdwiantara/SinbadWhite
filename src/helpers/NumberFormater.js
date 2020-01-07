function MoneyFormat(money) {
  return `Rp. ${money
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&.')
    .slice(0, -3)}`;
}

export { MoneyFormat };
