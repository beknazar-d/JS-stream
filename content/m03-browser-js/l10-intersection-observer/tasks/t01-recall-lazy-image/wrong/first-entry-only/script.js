function initLazyImages() {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    const img = entry.target;
    img.src = img.dataset.src;
    observer.unobserve(img);
  });
  document.querySelectorAll('img[data-src]').forEach((img) => observer.observe(img));
}

initLazyImages();
