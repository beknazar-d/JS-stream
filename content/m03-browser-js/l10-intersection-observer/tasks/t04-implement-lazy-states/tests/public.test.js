import { installFakeObserver } from './fake-io.js';
import { resetGallery } from './markup.js';

let io;
const setup = () => {
  resetGallery();
  io = installFakeObserver();
  window.initLazyImages();
  return $$('.photo');
};

afterEach(() => io?.restore());

describe('Настройки наблюдателя', () => {
  it('запас 200px по вертикали и порог 0', () => {
    setup();
    expect(io.instances, 'Создан один наблюдатель').toHaveLength(1);
    const { rootMargin, threshold } = io.instances[0].options;
    expect(rootMargin, 'rootMargin: строка с запасом 200px').toMatch(/^200px/);
    expect([undefined, 0, [0]].some((ok) => JSON.stringify(ok) === JSON.stringify(threshold)), 'threshold равен 0 или не задан').toBe(true);
  });

  it('следит за всеми пятью картинками', () => {
    setup();
    expect(io.observed(), 'Наблюдаемых картинок').toHaveLength(5);
  });
});

describe('Загрузка картинки', () => {
  it('при появлении: src, класс is-loading, слежение прекращено', () => {
    const photos = setup();
    const expectedSrc = photos[0].dataset.src;
    io.fire(photos[0]);
    expect(photos[0].getAttribute('src'), 'src взят из data-src').toBe(expectedSrc);
    expect(photos[0].hasAttribute('data-src'), 'Атрибут data-src удалён').toBe(false);
    expect(photos[0].classList.contains('is-loading'), 'Сразу после старта: is-loading').toBe(true);
    expect(io.observed().includes(photos[0]), 'За картинкой больше не следим').toBe(false);
  });

  it('после загрузки is-loading меняется на is-loaded', async () => {
    const photos = setup();
    io.fire(photos[1]);
    await waitFor(() => photos[1].classList.contains('is-loaded'), 1000);
    expect(photos[1].classList.contains('is-loading'), 'is-loading снят').toBe(false);
    expect(photos[1].classList.contains('is-broken'), 'is-broken не поставлен').toBe(false);
  });
});
