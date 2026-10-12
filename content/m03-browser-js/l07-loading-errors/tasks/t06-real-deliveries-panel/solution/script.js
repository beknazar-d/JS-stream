const TIMEOUT_MS = 800;

const list = document.querySelector('#deliveries');
const status = document.querySelector('#status');
const retry = document.querySelector('#retry');

let loading = false;

function showError(message) {
  status.textContent = message;
  retry.hidden = false;
}

function render(deliveries) {
  list.textContent = '';
  if (deliveries.length === 0) {
    status.textContent = 'Доставок на сегодня нет';
    return;
  }
  status.textContent = '';
  for (const delivery of deliveries) {
    const item = document.createElement('li');
    item.textContent = '№' + delivery.id + ', ' + delivery.city + ' — ' + delivery.status;
    list.append(item);
  }
}

async function loadDeliveries() {
  if (loading) return;
  loading = true;
  status.textContent = 'Загружаем доставки…';
  retry.hidden = true;
  list.textContent = '';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch('/api/deliveries', { signal: controller.signal });
    if (!response.ok) {
      showError('Не удалось загрузить доставки (' + response.status + ')');
      return;
    }
    render(await response.json());
  } catch (error) {
    if (error.name === 'AbortError') {
      showError('Сервер отвечает слишком долго');
    } else {
      showError('Нет соединения с сервером');
    }
  } finally {
    clearTimeout(timer);
    loading = false;
  }
}

retry.addEventListener('click', loadDeliveries);
document.querySelector('#reload').addEventListener('click', loadDeliveries);
loadDeliveries();
