const orders = document.querySelector('#orders');
const summary = document.querySelector('#summary');

const STATUS_TEXT = {
  new: 'Новый',
  confirmed: 'Подтверждён',
  cancelled: 'Отменён',
};

function updateSummary() {
  const fresh = orders.querySelectorAll('tr[data-status="new"]').length;
  summary.textContent = `Новых: ${fresh}`;
}

// Подключите один обработчик клика на #orders.
