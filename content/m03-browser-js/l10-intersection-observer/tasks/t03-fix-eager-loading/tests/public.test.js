import { installFakeObserver } from './fake-io.js';

let io;
const setup = () => {
  $$('.photo').forEach((img) => img.removeAttribute('src'));
  io = installFakeObserver();
  window.initLazyImages();
  return $$('.photo');
};

afterEach(() => io?.restore());

describe('Ленивая загрузка', () => {
  it('первое уведомление о невидимых картинках ничего не загружает', () => {
    const photos = setup();
    expect(photos, 'На странице шесть фотографий').toHaveLength(6);
    io.fire(photos, false);
    expect(photos.filter((img) => img.getAttribute('src')).length, 'Загруженных картинок').toBe(0);
  });

  it('загружается только та картинка, что попала на экран', () => {
    const photos = setup();
    io.fire(photos, false);
    io.fire(photos[4], true);
    expect(photos[4].getAttribute('src'), 'Пятая картинка загружена').toBe(photos[4].dataset.src);
    expect(photos.filter((img) => img.getAttribute('src')).length, 'Больше ничего не загружено').toBe(1);
  });
});
