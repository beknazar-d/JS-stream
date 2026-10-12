import { installFakeObserver } from './fake-io.js';

let io;

const setup = () => {
  $$('.photo').forEach((img) => img.removeAttribute('src'));
  io = installFakeObserver();
  window.initLazyImages();
  return $$('.photo');
};

afterEach(() => io?.restore());

describe('Ленивая загрузка фотографий', () => {
  it('до появления на экране у картинок нет src', () => {
    expect($$('.photo').every((img) => !img.getAttribute('src')), 'У всех фотографий пустой src').toBe(true);
  });

  it('следит за всеми картинками с data-src', () => {
    const photos = setup();
    expect(photos, 'В галерее четыре фотографии').toHaveLength(4);
    expect(io.observed(), 'Наблюдатель следит за каждой').toHaveLength(4);
  });

  it('появившаяся картинка загружается, остальные нет', () => {
    const photos = setup();
    io.fire(photos[1]);
    expect(photos[1].getAttribute('src'), 'У второй картинки src равен её data-src').toBe(photos[1].dataset.src);
    expect([0, 2, 3].every((i) => !photos[i].getAttribute('src')), 'Остальные не тронуты').toBe(true);
  });
});
