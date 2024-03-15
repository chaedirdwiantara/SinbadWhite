import PropTypes from 'prop-types';
import { SnbRecord } from '../index';

export function trackJourneyPlan(props) {
  const { eventName, data } = props;
  SnbRecord(eventName, data);
}

trackJourneyPlan.propTypes = {
  data: PropTypes.shape({
    total_stores: PropTypes.number,
    total_order_value: PropTypes.number,
    pjp_stores_already_visited: PropTypes.number,
    pjp_stores_havent_visited: PropTypes.number,
    pjp_stores_delayed: PropTypes.number,
    non_pjp_stores_already_visited: PropTypes.number,
    non_pjp_stores_havent_visited: PropTypes.number,
    non_pjp_stores_delayed: PropTypes.number
  })
};
