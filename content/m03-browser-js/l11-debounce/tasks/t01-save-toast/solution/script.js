const saveButton = document.querySelector('#save');
const saved = document.querySelector('#saved');

let hideTimer;

saveButton.addEventListener('click', () => {
  saved.textContent = 'Сохранено';
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    saved.textContent = '';
  }, 300);
});
