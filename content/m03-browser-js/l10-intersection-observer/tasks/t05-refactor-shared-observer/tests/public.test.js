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

describe('Общий наблюдатель', () => {
  it('создаётся один наблюдатель на все картинки', () => {
    const photos = setup();
    expect(photos, 'В каталоге десять картинок').toHaveLength(10);
    expect(io.instances, 'Один наблюдатель').toHaveLength(1);
    expect(io.observed(), 'Он следит за всеми десятью картинками').toHaveLength(10);
  });

  it('видимая картинка загружается, остальные нет', () => {
    const photos = setup();
    io.fire(photos[3]);
    expect(photos[3].getAttribute('src'), 'Четвёртая загружена').toBe(photos[3].dataset.src);
    expect(photos.filter((img) => img.getAttribute('src')).length, 'Больше ничего не загружено').toBe(1);
  });

  it('записи «не на экране» игнорируются', () => {
    const photos = setup();
    io.fire(photos, false);
    expect(photos.filter((img) => img.getAttribute('src')).length, 'Загруженных картинок').toBe(0);
  });
});
