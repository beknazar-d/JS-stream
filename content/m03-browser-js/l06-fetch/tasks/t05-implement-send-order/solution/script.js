const form = document.querySelector('#order-form');
const status = document.querySelector('#status');

async function sendOrder(order) {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });

  if (response.ok) {
    const created = await response.json();
    status.textContent = 'Заказ №' + created.id + ' принят';
    return;
  }

  let reason = ' (' + response.status + ')';
  try {
    const problem = await response.json();
    if (problem.error) reason = ': ' + problem.error;
  } catch (error) {
    // тело не JSON: оставляем причину со статусом
  }
  status.textContent = 'Не удалось оформить заказ' + reason;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  sendOrder({ name: String(data.get('name')).trim(), qty: Number(data.get('qty')) });
});
