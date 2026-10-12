const list = document.querySelector('#orders');
const status = document.querySelector('#status');
const retry = document.querySelector('#retry');

async function loadOrders() {
  status.textContent = 'Загрузка…';
  retry.hidden = true;
  try {
    const response = await fetch('/api/orders');
    if (!response.ok) {
      status.textContent = 'Не удалось загрузить заказы (' + response.status + ')';
      retry.hidden = true;
      return;
    }
    const orders = await response.json();
    list.textContent = '';
    if (orders.length === 0) {
      status.textContent = 'Заказов пока нет';
      return;
    }
    status.textContent = '';
    for (const order of orders) {
      const item = document.createElement('li');
      item.textContent = 'Заказ №' + order.id + ' — ' + order.total + ' ₽';
      list.append(item);
    }
  } catch (error) {
    status.textContent = 'Нет соединения с сервером';
    retry.hidden = true;
  }
}

retry.addEventListener('click', loadOrders);
document.querySelector('#reload').addEventListener('click', loadOrders);
loadOrders();
