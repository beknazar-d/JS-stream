// Данные формы после new FormData(form): пары «имя поля — значение».
// Здесь форма собрана вручную, чтобы пример запускался без страницы.
const data = new FormData();
data.append('title', '  Блендер B-50 ');
data.append('qty', '3');
data.append('gift', 'on');

function readOrder(formData) {
  return {
    title: String(formData.get('title')).trim(),
    qty: Number(formData.get('qty')),
    gift: formData.has('gift'),
  };
}

const order = readOrder(data);
console.log(order.title + ' x ' + order.qty);
console.log('подарок: ' + order.gift);
console.log('тип количества: ' + typeof order.qty);

data.delete('gift');
console.log('подарок после снятия флажка: ' + readOrder(data).gift);
