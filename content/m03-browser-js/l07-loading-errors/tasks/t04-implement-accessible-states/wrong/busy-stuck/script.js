const list = document.querySelector('#deliveries');
const status = document.querySelector('#status');
const retry = document.querySelector('#retry');

function showError(message) {
  status.textContent = message;
  retry.hidden = false;
  retry.focus();
}

async function loadDeliveries() {
  status.textContent = 'Загружаем доставки…';
  retry.hidden = true;
  list.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch('/api/deliveries');
    if (!response.ok) {
      showError('Не удалось загрузить доставки (' + response.status + ')');
      return;
    }
    const deliveries = await response.json();
    list.textContent = '';
    if (deliveries.length === 0) {
      status.textContent = 'Доставок пока нет';
      return;
    }
    status.textContent = '';
    for (const delivery of deliveries) {
      const item = document.createElement('li');
      item.textContent = '№' + delivery.id + ', ' + delivery.city + ' — ' + delivery.status;
      list.append(item);
    }
  } catch (error) {
    showError('Нет соединения с сервером');
  }
}

retry.addEventListener('click', loadDeliveries);
document.querySelector('#reload').addEventListener('click', loadDeliveries);
loadDeliveries();
