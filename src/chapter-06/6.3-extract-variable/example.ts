/**
 * 리펙전
 * 
 */
const getTotalCost = (order) => {
  return (
    order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 0.05)
  );
};
/**
 * 리펙후
*/

const getTotalCostRefac = (order) => {
  const basePrice = order.quantity * order.itemPrice
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
  const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 0.05)
  return basePrice -quantityDiscount + shipping
} 
