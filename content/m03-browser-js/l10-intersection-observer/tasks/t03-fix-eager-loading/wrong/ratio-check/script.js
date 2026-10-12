function initLazyImages() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio <= 0.5) return;
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    });
  });

  document.querySelectorAll('img[data-src]').forEach((img) => observer.observe(img));
}

initLazyImages();
