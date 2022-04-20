import PropTypes from 'prop-types';
import { SnbRecord } from '../index';

export function trackSearchPdp(props) {
  const { eventName, data } = props;
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
