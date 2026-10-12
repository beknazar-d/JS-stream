function initLazyImages() {
  document.querySelectorAll('img[data-src]').forEach((img) => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.src = img.dataset.src;
        observer.disconnect();
      }
    });
    observer.observe(img);
  });
}

initLazyImages();
