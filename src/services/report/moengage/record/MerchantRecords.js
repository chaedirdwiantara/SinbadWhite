import PropTypes from 'prop-types';
import { SnbRecord } from '../index';

export function trackEnterStore(props) {
  const { eventName, data } = props;
  SnbRecord(eventName, data);
}

export function trackCheckoutStore({ eventName, data }) {
  SnbRecord(eventName, data);
}

trackEnterStore.propTypes = {
  data: PropTypes.shape({
    store_id: PropTypes.number,
    store_name: PropTypes.string,
    sr_inside_store: PropTypes.bool,
    store_available: PropTypes.bool,
    time_entered: PropTypes.string
  })
};

trackCheckoutStore.propTypes = {
  data: PropTypes.shape({
    store_id: PropTypes.number,
    store_name: PropTypes.string,
    sr_in_store: PropTypes.bool,
    sr_visited_store: PropTypes.bool,
    time_entered: PropTypes.string,
    time_exited: PropTypes.string,
    visit_duration: PropTypes.string
  })
};
