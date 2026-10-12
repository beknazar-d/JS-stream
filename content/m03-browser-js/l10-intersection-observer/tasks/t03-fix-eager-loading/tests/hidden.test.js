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
  it('частично видимая картинка загружается сразу', () => {
    const photos = setup();
    io.fire(photos[0], true); // заглушка сообщает долю 0.2
    expect(photos[0].getAttribute('src'), 'Видно только 20% картинки, но загрузка нужна').toBe(photos[0].dataset.src);
  });

  it('две картинки в одном уведомлении', () => {
    const photos = setup();
    io.fire([photos[1], photos[3]], true);
    expect(photos[1].getAttribute('src'), 'Вторая').toBe(photos[1].dataset.src);
    expect(photos[3].getAttribute('src'), 'Четвёртая').toBe(photos[3].dataset.src);
    expect(photos[2].getAttribute('src'), 'Третья не тронута').toBeNull();
  });

  it('смесь видимых и невидимых записей в одном уведомлении', () => {
    const photos = setup();
    io.fire([photos[0]], true);
    io.instances[0].callback(
      [
        { target: photos[1], isIntersecting: false, intersectionRatio: 0 },
        { target: photos[2], isIntersecting: true, intersectionRatio: 0.3 },
      ],
      io.instances[0],
    );
    expect(photos[1].getAttribute('src'), 'Невидимая не загружена').toBeNull();
    expect(photos[2].getAttribute('src'), 'Видимая загружена').toBe(photos[2].dataset.src);
  });

  it('загруженные картинки больше не наблюдаются', () => {
    const photos = setup();
    io.fire([photos[0], photos[1]], true);
    expect(io.observed(), 'Осталось четыре картинки под наблюдением').toHaveLength(4);
    expect(io.observed().includes(photos[0]), 'Первой в списке нет').toBe(false);
  });
});
