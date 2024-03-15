import PropTypes from 'prop-types';
import { SnbRecord } from '../index';

export function trackSearchPdp(props) {
  const { eventName, data } = props;
  SnbRecord(eventName, data);
}

export function trackPdpDetail({ eventName, data }) {
  SnbRecord(eventName, data);
}

trackSearchPdp.propTypes = {
  data: PropTypes.shape({
    store_id: PropTypes.number,
    store_name: PropTypes.string,
    keyword: PropTypes.string,
    is_result_found: PropTypes.bool
  })
};

trackPdpDetail.propTypes = {
  data: PropTypes.shape({
    store_id: PropTypes.number,
    store_name: PropTypes.string,
    sku_name: PropTypes.string,
    sku_id: PropTypes.string,
    sku_price: PropTypes.number,
    brand_name: PropTypes.string
  })
};
