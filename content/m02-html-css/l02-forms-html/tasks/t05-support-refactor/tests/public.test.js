const fieldNames = ['name', 'email', 'order', 'message', 'agree'];

describe('Подписи и типы', () => {
  for (const name of fieldNames) {
    it(`у поля ${name} есть видимая подпись`, () => {
      const control = $(`[name="${name}"]`);
      expect(control, `Поле name=«${name}» на месте`).not.toBeNull();
      expect(control.labels.length, `Количество label, связанных с полем ${name}`).toBe(1);
      expect(control.labels[0].textContent.trim().length > 0, `У подписи поля ${name} есть текст`).toBe(true);
    });
  }

  it('почта имеет тип email', () => {
    expect($('[name="email"]').type, 'Тип поля email').toBe('email');
  });

  it('кнопка отправляет форму', () => {
    const button = $('form.support .send');
    expect(button.type, 'type кнопки «Отправить»').toBe('submit');
  });
});
