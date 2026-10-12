const list = document.querySelector('.cart-list');
const total = document.querySelector('.cart-total');

function addRow(item) {
  list.innerHTML +=
    '<li class="cart-row" data-id="' + item.id + '">' +
    '<span class="cart-row__title">' + item.title + '</span>' +
    '<span class="cart-row__qty">× ' + item.qty + '</span>' +
    '</li>';
  total.textContent = 'Позиций: ' + list.children.length;
}

addRow({ id: 'k200', title: 'Чайник K-200', qty: 1 });
addRow({ id: 'b50', title: 'Блендер B-50', qty: 2 });
