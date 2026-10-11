describe('Каркас страницы: детали', () => {
  it('ссылки меню лежат в списке и ведут по нужным адресам', () => {
    const items = $$('header nav ul > li > a');
    expect(items, 'Ссылки внутри nav ul li').toHaveLength(3);
    expect(items.map((a) => a.getAttribute('href')), 'Адреса ссылок').toEqual(['/catalog', '/delivery', '/contacts']);
  });

  it('у меню есть имя', () => {
    const name = $('header nav').getAttribute('aria-label');
    expect(name && name.trim().length > 0, 'У nav есть непустой aria-label').toBe(true);
  });

  it('части страницы идут в правильном порядке', () => {
    const order = [...document.body.children].map((el) => el.tagName.toLowerCase()).filter((t) => ['header', 'main', 'footer'].includes(t));
    expect(order, 'Порядок header, main, footer в body').toEqual(['header', 'main', 'footer']);
  });

  it('нет лишних div и span', () => {
    expect($$('div, span'), 'Теги div и span не нужны в этом задании').toHaveLength(0);
  });
});
