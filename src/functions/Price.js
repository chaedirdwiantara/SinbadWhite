/**
 * This function for price
 */

export default function Price(data) {
  return data.segmentationPrice
    ? data.segmentationPrice
    : data.retailBuyingPrice;
}
