const regexDefault = /[Rp.]+/g;

function StringToNumber(txt, regex, replace) {
  return parseInt(txt.replace(regex || regexDefault, replace || ''), 10);
}

export { StringToNumber };
