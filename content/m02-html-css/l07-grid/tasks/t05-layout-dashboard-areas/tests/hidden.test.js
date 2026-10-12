describe('Подвал и высота', () => {
  it('подвал внизу окна 768px на всю ширину', () => {
    const f = box('.app > footer');
    expect(f.bottom, 'Нижний край подвала у нижнего края окна 768px').toBeGreaterThanOrEqual(766);
    expect(f.bottom, 'Нижний край подвала у нижнего края окна 768px').toBeLessThanOrEqual(770);
    expect(f.left, 'Подвал от левого края').toBeLessThanOrEqual(1);
    expect(f.right, 'Подвал до правого края').toBeGreaterThanOrEqual(1023);
  });

  it('средние блоки одной высоты и занимают свободное место', () => {
    const n = box('.app > nav');
    const m = box('.app > main');
    const a = box('.app > aside');
    expect(n.height, 'Меню и основная часть одной высоты').toBe(m.height);
    expect(a.height, 'Сводка и основная часть одной высоты').toBe(m.height);
    expect(m.height, 'Средний ряд занимает свободное место окна').toBeGreaterThan(300);
  });

  it('основная часть растёт вместе с текстом, подвал остаётся внизу', () => {
    const p = document.createElement('p');
    p.textContent = 'Подробности. '.repeat(400);
    $('.app > main').appendChild(p);
    try {
      const f = box('.app > footer');
      const m = box('.app > main');
      expect(f.top, 'Подвал ниже основной части').toBeGreaterThanOrEqual(m.bottom);
    } finally {
      p.remove();
    }
  });
});
