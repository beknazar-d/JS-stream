function initLazyImages() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
    });
  });

  document.querySelectorAll('img[data-src]').forEach((img) => observer.observe(img));
}

initLazyImages();
