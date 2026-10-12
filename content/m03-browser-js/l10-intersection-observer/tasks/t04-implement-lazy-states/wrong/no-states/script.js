function initLazyImages() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    },
    { rootMargin: '200px 0px', threshold: 0 },
  );

  document.querySelectorAll('img[data-src]').forEach((img) => observer.observe(img));
}

initLazyImages();
