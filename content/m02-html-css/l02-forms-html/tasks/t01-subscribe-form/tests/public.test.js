const email = () => $('input[type="email"]');

describe('Форма подписки', () => {
  it('форма отправляется на /subscribe методом post', () => {
    const form = $('form');
    expect(form, 'Тег form на странице').not.toBeNull();
    expect(form.getAttribute('action'), 'action формы').toBe('/subscribe');
    expect((form.getAttribute('method') ?? '').toLowerCase(), 'method формы').toBe('post');
  });

  it('поле почты нужного типа и обязательное', () => {
    expect(email(), 'input type=email внутри формы').not.toBeNull();
    expect(email().name, 'name поля').toBe('email');
    expect(email().required, 'Поле обязательное').toBe(true);
  });

  it('у поля есть связанная подпись «Ваш email»', () => {
    const label = $('label[for="email"]');
    expect(label, 'label с for=«email»').not.toBeNull();
    expect($('#email').id, 'id поля').toBe('email');
    expect(label.textContent.trim(), 'Текст подписи').toBe('Ваш email');
  });

  it('кнопка отправки', () => {
    const button = $('form button');
    expect(button, 'Тег button внутри формы').not.toBeNull();
    expect(button.type, 'type кнопки').toBe('submit');
    expect(button.textContent.trim(), 'Текст кнопки').toBe('Подписаться');
  });
});
