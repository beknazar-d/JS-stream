const saveButton = document.querySelector('#save');
const saved = document.querySelector('#saved');

function hide() {
  saved.textContent = '';
}

saveButton.addEventListener('click', () => {
  saved.textContent = 'Сохранено';
  setTimeout(hide(), 300);
});
