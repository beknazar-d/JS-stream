function initLazyImages() {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const img = entry.target;
      img.src = img.dataset.src;
      observer.disconnect();
    }
  });

  document.querySelectorAll('img[data-src]').forEach((img) => observer.observe(img));
}

initLazyImages();
