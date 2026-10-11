// Стоимость доставки по сумме заказа.
function shippingFee(orderSum) {
  if (orderSum >= 5000) {
    return 0;
  } else if (orderSum >= 2000) {
    return 150;
  } else {
    return 350;
  }
}

console.log(shippingFee(6000));
console.log(shippingFee(2500));
console.log(shippingFee(900));
