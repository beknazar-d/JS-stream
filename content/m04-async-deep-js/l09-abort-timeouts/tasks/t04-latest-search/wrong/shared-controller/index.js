export function createSuggester(load) {
  const controller = new AbortController();

  return async function suggest(query) {
    controller.abort();
    const items = await load(query, controller.signal);
    controller.signal.throwIfAborted();
    return items;
  };
}
