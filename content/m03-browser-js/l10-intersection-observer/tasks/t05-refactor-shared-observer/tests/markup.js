// Возвращает картинки каталога в исходное состояние перед каждым прогоном.
export function resetPhotos() {
  document.querySelectorAll('.photo').forEach((img, index) => {
    img.removeAttribute('src');
    if (!img.hasAttribute('data-src')) img.dataset.src = `data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==#${index + 1}`;
  });
}
