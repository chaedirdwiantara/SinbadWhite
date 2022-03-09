import {
  CASH,
  CASH_LABEL,
  CHECK,
  CHECK_LABEL,
  GIRO,
  GIRO_LABEL,
  TRANSFER,
  TRANSFER_LABEL,
  PROMO,
  PROMO_LABEL,
  RETUR,
  RETUR_LABEL
} from '../../../constants/collectionConstants';

export const collectionMethodLabel = id => {
  let label;
  switch (id) {
    case CASH:
      label = CASH_LABEL;
      break;
    case CHECK:
      label = CHECK_LABEL;
      break;
    case GIRO:
      label = GIRO_LABEL;
      break;
    case TRANSFER:
      label = TRANSFER_LABEL;
      break;
    case PROMO:
      label = PROMO_LABEL;
      break;
    case RETUR:
      label = RETUR_LABEL;
      break;
    default:
      label = 'Undefined';
      break;
  }
  return label;
};
