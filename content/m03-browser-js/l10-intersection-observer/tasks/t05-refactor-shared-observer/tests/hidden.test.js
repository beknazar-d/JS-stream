import { installFakeObserver } from './fake-io.js';
import { resetPhotos } from './markup.js';

let io;
const setup = () => {
  resetPhotos();
  io = installFakeObserver();
  window.initLazyImages();
  return $$('.photo');
};

afterEach(() => io?.restore());

describe('Общий наблюдатель: тонкости', () => {
  it('несколько картинок в одном уведомлении', () => {
    const photos = setup();
    io.fire([photos[0], photos[5], photos[9]]);
    for (const i of [0, 5, 9]) expect(photos[i].getAttribute('src'), `Картинка ${i + 1}`).toBe(photos[i].dataset.src);
    expect(photos.filter((img) => img.getAttribute('src')).length, 'Загружены ровно три').toBe(3);
  });

  it('после загрузки одной остальные продолжают наблюдаться', () => {
    const photos = setup();
    io.fire(photos[1]);
    expect(io.observed(), 'Осталось девять наблюдаемых').toHaveLength(9);
    io.fire(photos[7]);
    expect(photos[7].getAttribute('src'), 'Следующая картинка тоже загружается').toBe(photos[7].dataset.src);
    expect(io.observed(), 'Осталось восемь').toHaveLength(8);
  });

  it('загруженная картинка выпадает из наблюдения', () => {
    const photos = setup();
    io.fire(photos[2]);
    expect(io.observed().includes(photos[2]), 'Третьей среди наблюдаемых нет').toBe(false);
  });
});
