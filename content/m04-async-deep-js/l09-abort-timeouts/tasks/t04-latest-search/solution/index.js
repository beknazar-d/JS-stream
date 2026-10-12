export function createSuggester(load) {
  let current = null;

  return async function suggest(query) {
    current?.abort();
    const controller = new AbortController();
    current = controller;

    const items = await load(query, controller.signal);
    controller.signal.throwIfAborted();
    return items;
  };
}
