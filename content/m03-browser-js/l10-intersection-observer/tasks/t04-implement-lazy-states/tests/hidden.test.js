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

describe('Состояния: тонкости', () => {
  it('битая картинка получает is-broken и теряет is-loading', async () => {
    const photos = setup();
    io.fire(photos[4]);
    await waitFor(() => photos[4].classList.contains('is-broken'), 1000);
    expect(photos[4].classList.contains('is-loading'), 'is-loading снят').toBe(false);
    expect(photos[4].classList.contains('is-loaded'), 'is-loaded не поставлен').toBe(false);
  });

  it('уведомление «не на экране» ничего не меняет', () => {
    const photos = setup();
    io.fire(photos, false);
    expect(photos.every((img) => !img.getAttribute('src') && img.hasAttribute('data-src')), 'Ни одна картинка не тронута').toBe(true);
    expect(photos.every((img) => img.className === 'photo'), 'Классов состояния нет').toBe(true);
    expect(io.observed(), 'Слежение продолжается').toHaveLength(5);
  });

  it('две картинки в одном уведомлении', async () => {
    const photos = setup();
    io.fire([photos[2], photos[3]]);
    await waitFor(() => photos[2].classList.contains('is-loaded') && photos[3].classList.contains('is-loaded'), 1000);
    expect(photos[0].hasAttribute('src'), 'Первая не тронута').toBe(false);
  });

  it('повторный вызов следит только за ещё не начатыми картинками', () => {
    const photos = setup();
    io.fire(photos[0]);
    io.restore();
    io = installFakeObserver();
    window.initLazyImages();
    expect(io.observed(), 'Четыре картинки без data-src не считаются').toHaveLength(4);
    expect(io.observed().includes(photos[0]), 'Первой среди наблюдаемых нет').toBe(false);
  });
});
