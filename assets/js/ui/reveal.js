/** Entrada suave de bloques al aparecer en pantalla: [data-reveal] (+ --d para el retraso). */
let io;

export const reveal = (root = document) => {
  const items = root.querySelectorAll('[data-reveal]:not(.is-in)');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((n) => n.classList.add('is-in'));
    return;
  }
  io ??= new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((n) => io.observe(n));
};

/** Cuenta hacia arriba los números de [data-count] cuando aparecen. */
export const countUp = (root = document) => {
  const items = root.querySelectorAll('[data-count]');
  const run = (el) => {
    const to = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 1100);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suffix;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => (el.textContent = el.dataset.count + (el.dataset.suffix ?? '')));
    return;
  }
  const obs = new IntersectionObserver((entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      run(e.target);
      obs.unobserve(e.target);
    }),
  );
  items.forEach((el) => obs.observe(el));
};
