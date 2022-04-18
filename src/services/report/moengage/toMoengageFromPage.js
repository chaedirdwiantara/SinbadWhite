import * as MoEAction from './action';
export const toMoengageFromPage = (prevPage, currentPage) => {
  console.log('PreviousPage: ', prevPage);
  console.log('Current Page: ', currentPage);
  /** this function for send data metric based on page */
  switch (prevPage) {
    case 'AddMerchantStep1':
      MoEAction.recordRegisterStep(prevPage);
      break;
    case 'AddMerchantStep2':
      if (currentPage !== 'TakeIdPicture') {
        MoEAction.recordRegisterStep(prevPage);
      }
      break;
    default:
      break;
  }

  switch (currentPage) {
    case 'JourneyView':
      // MoEAction.recordJourneyPlan(currentPage, prevPage);
      break;
    default:
      break;
  }
};
