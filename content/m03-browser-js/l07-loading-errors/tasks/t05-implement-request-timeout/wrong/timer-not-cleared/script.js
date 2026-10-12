const TIMEOUT_MS = 500;

const list = document.querySelector('#slots');
const status = document.querySelector('#status');
const retry = document.querySelector('#retry');

function showError(message) {
  status.textContent = message;
  retry.hidden = false;
}

async function loadSlots() {
  status.textContent = 'Загружаем окна доставки…';
  retry.hidden = true;

  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
    showError('Сервер отвечает слишком долго');
  }, TIMEOUT_MS);
  try {
    const response = await fetch('/api/slots', { signal: controller.signal });
    if (!response.ok) {
      showError('Не удалось загрузить окна доставки (' + response.status + ')');
      return;
    }
    const slots = await response.json();
    status.textContent = '';
    list.textContent = '';
    for (const slot of slots) {
      const item = document.createElement('li');
      item.textContent = slot.label;
      list.append(item);
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      showError('Сервер отвечает слишком долго');
    } else {
      showError('Нет соединения с сервером');
    }
  }
}

retry.addEventListener('click', loadSlots);
document.querySelector('#reload').addEventListener('click', loadSlots);
loadSlots();
