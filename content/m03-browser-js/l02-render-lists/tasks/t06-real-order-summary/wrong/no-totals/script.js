function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

const FREE_DELIVERY_FROM = 5000;
const DELIVERY_PRICE = 390;

function renderOrder(order) {
  const body = document.querySelector('tbody');
  const template = document.querySelector('#row-template');
  const hasItems = order.items.length > 0;

  document.querySelector('.greeting').textContent = `Заказ для ${order.customer}`;
  document.querySelector('.address').textContent = `Доставка: ${order.address}`;

  body.replaceChildren();
  let subtotal = 0;
  for (const item of order.items) {
    const lineSum = item.price * item.qty;
    subtotal += lineSum;

    const row = template.content.cloneNode(true);
    row.querySelector('.order-row__title').textContent = item.title;
    row.querySelector('.order-row__qty').textContent = item.qty;
    row.querySelector('.order-row__sum').textContent = formatPrice(lineSum);
    body.append(row);
  }

}

renderOrder({
  customer: 'Мария Иванова',
  address: 'Москва, ул. Лесная, 5',
  items: [
    { title: 'Чайник K-200', qty: 1, price: 2990 },
    { title: 'Блендер B-50', qty: 2, price: 4990 },
  ],
  promoCode: 'DOM10',
});
