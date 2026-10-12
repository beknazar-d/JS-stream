function initLazyImages() {
  document.querySelectorAll('img[data-src]').forEach((img) => {
    img.src = img.dataset.src;
  });
}

initLazyImages();
