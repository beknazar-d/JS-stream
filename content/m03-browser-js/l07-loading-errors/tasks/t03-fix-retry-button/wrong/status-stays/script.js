const list = document.querySelector('#orders');
const status = document.querySelector('#status');
const retry = document.querySelector('#retry');

async function loadOrders() {
  status.textContent = 'Загрузка…';
  retry.hidden = true;
  try {
    const response = await fetch('/api/orders');
    if (!response.ok) {
      throw new Error('Статус ' + response.status);
    }
    const orders = await response.json();
    list.textContent = '';
    for (const order of orders) {
      const item = document.createElement('li');
      item.textContent = 'Заказ №' + order.id + ' — ' + order.total + ' ₽';
      list.append(item);
    }
  } catch (error) {
    status.textContent = 'Не удалось загрузить заказы';
    retry.hidden = false;
  }
}

retry.addEventListener('click', loadOrders);
loadOrders();
