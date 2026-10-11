const fields = { name: 'Имя', phone: 'Телефон', email: 'Email', qty: 'Количество' };

describe('Подписи полей', () => {
  for (const [name, text] of Object.entries(fields)) {
    it(`у поля ${name} есть связанная подпись «${text}»`, () => {
      const input = $(`input[name="${name}"]`);
      expect(input, `Поле с name=«${name}» на месте`).not.toBeNull();
      const label = $(`label[for="${input.id}"]`);
      expect(label, `label, связанный с полем ${name} через for и id`).not.toBeNull();
      expect(label.textContent.trim(), `Текст подписи поля ${name}`).toBe(text);
    });
  }

  it('подпись управляет своим полем: клик по ней доходит до поля', () => {
    const label = $('label[for="name"]');
    expect(label, 'label для поля name').not.toBeNull();
    expect(label.control, 'Поле, которым управляет подпись «Имя»').toBe($('[name="name"]'));
  });
});
