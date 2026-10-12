import { installFakeObserver } from './fake-io.js';

let io;

const setup = () => {
  $$('.photo').forEach((img) => img.removeAttribute('src'));
  io = installFakeObserver();
  window.initLazyImages();
  return $$('.photo');
};

afterEach(() => io?.restore());

describe('Ленивая загрузка: тонкости', () => {
  it('isIntersecting: false не загружает картинку', () => {
    const photos = setup();
    io.fire(photos, false);
    expect(photos.every((img) => !img.getAttribute('src')), 'Первое уведомление браузера о невидимых элементах ничего не загружает').toBe(true);
  });

  it('несколько записей в одном вызове', () => {
    const photos = setup();
    io.fire([photos[0], photos[2]]);
    expect(photos[0].getAttribute('src'), 'Первая загружена').toBe(photos[0].dataset.src);
    expect(photos[2].getAttribute('src'), 'Третья загружена').toBe(photos[2].dataset.src);
    expect(photos[1].getAttribute('src'), 'Вторая не тронута').toBeNull();
  });

  it('загруженная картинка выпадает из наблюдения', () => {
    const photos = setup();
    io.fire(photos[3]);
    expect(io.observed(), 'Осталось три картинки').toHaveLength(3);
    expect(io.observed().includes(photos[3]), 'Загруженной среди наблюдаемых нет').toBe(false);
  });

  it('один наблюдатель на всю галерею', () => {
    setup();
    expect(io.instances, 'Создан один наблюдатель').toHaveLength(1);
  });
});
