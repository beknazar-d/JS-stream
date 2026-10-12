const saveButton = document.querySelector('#save');
const saved = document.querySelector('#saved');

saveButton.addEventListener('click', () => {
  saved.textContent = 'Сохранено';
  setTimeout(() => {
    saved.textContent = '';
  }, 300);
});
