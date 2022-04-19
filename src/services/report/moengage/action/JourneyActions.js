import * as EventName from '../event';
import { Store } from '../../../../state/Store';
import * as MoERecord from '../record';

function recordJourneyPlan(data, currentPage, previousPage) {
  const { journey } = Store.getState();

  const neededData = {
    total_stores: data.data.length,
    total_order_value: 0,
    pjp_stores_already_visited: 0,
    pjp_stores_havent_visited: 0,
    pjp_stores_delayed: 0,
    non_pjp_stores_already_visited: 0,
    non_pjp_stores_havent_visited: 0,
    non_pjp_stores_delayed: 0
  };

  if (journey.dataGetJourneyPlanReportV2 !== null) {
    neededData.total_stores = journey.dataGetJourneyPlanReportV2.target;
    neededData.total_order_value =
      journey.dataGetJourneyPlanReportV2.totalOrder;
  }

  const checkVisited = storeJourney => {
    return storeJourney.visitStatus && storeJourney.pauseStatus === 0 ? 1 : 0;
  };

  const checkUnvisited = storeJourney => {
    return storeJourney.visitStatus ? 0 : 1;
  };

  const checkDelayed = storeJourney => {
    return storeJourney.visitStatus && storeJourney.pauseStatus === 1 ? 1 : 0;
  };

  data.data.map(store => {
    if (store.journeyBookStores.permanentJourneyPlanId === 0) {
      neededData.non_pjp_stores_already_visited += checkVisited(
        store.journeyBookStores
      );
      neededData.non_pjp_stores_havent_visited += checkUnvisited(
        store.journeyBookStores
      );
      neededData.non_pjp_stores_delayed += checkDelayed(
        store.journeyBookStores
      );
    } else {
      neededData.pjp_stores_already_visited += checkVisited(
        store.journeyBookStores
      );
      neededData.pjp_stores_havent_visited += checkUnvisited(
        store.journeyBookStores
      );
      neededData.pjp_stores_delayed += checkDelayed(store.journeyBookStores);
    }
  });

  MoERecord.trackJourneyPlan({
    eventName: EventName.JOURNEY_PLAN,
    data: neededData
  });
}

export { recordJourneyPlan };
