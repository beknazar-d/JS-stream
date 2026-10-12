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

function setStatus(row, status) {
  row.dataset.status = status;
  row.querySelector('.status').textContent = STATUS_TEXT[status];
}

for (const button of orders.querySelectorAll('[data-action]')) {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    const action = button.dataset.action;

    if (action === 'delete') {
      row.remove();
    } else if (action === 'cancel') {
      setStatus(row, 'cancelled');
    } else if (action === 'confirm' && row.dataset.status !== 'cancelled') {
      setStatus(row, 'confirmed');
    }

    updateSummary();
  });
}
