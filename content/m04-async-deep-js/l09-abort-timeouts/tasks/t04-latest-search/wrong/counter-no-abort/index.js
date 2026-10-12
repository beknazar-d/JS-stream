export function createSuggester(load) {
  let latest = 0;

  return async function suggest(query) {
    const id = ++latest;
    const controller = new AbortController();
    const items = await load(query, controller.signal);
    if (id !== latest) {
      throw new DOMException('Устаревший запрос', 'AbortError');
    }
    return items;
  };
}
