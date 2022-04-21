import PropTypes from 'prop-types';
import { SnbRecord } from '../index';

export function trackAddToCart({ eventName, data }) {
  SnbRecord(eventName, data);
}

export function trackViewCart({ eventName, data }) {
  SnbRecord(eventName, data);
}

export function trackDeletedSKU({ eventName, data }) {
  SnbRecord(eventName, data);
}

trackAddToCart.propTypes = {
  data: PropTypes.shape({
    store_id: PropTypes.number,
    store_name: PropTypes.string,
    sku_name: PropTypes.string,
    sku_id: PropTypes.string,
    sku_price: PropTypes.number,
    sku_qty: PropTypes.number,
    sku_total_price: PropTypes.number
  })
};

trackViewCart.propTypes = {
  data: PropTypes.shape({
    store_id: PropTypes.number,
    store_name: PropTypes.string,
    cart_id: PropTypes.number,
    sku_id: PropTypes.string
  })
};
