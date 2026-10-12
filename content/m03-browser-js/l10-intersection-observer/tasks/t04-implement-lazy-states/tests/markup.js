// Разметка галереи из задания: тесты возвращают её перед каждым прогоном.
const GIF = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export function resetGallery() {
  const items = [
    ['Чайник Bosch', GIF + '#1'],
    ['Чайник Tefal', GIF + '#2'],
    ['Блендер Philips', GIF + '#3'],
    ['Тостер Tefal', GIF + '#4'],
    ['Гриль Redmond (фото недоступно)', 'data:image/png;base64,AAAA'],
  ];
  const gallery = document.querySelector('#gallery');
  gallery.innerHTML = '';
  for (const [alt, src] of items) {
    const img = document.createElement('img');
    img.className = 'photo';
    img.alt = alt;
    img.width = 200;
    img.height = 150;
    img.dataset.src = src;
    gallery.append(img);
  }
}
