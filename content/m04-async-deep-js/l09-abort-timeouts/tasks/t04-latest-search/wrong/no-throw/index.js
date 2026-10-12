export function createSuggester(load) {
  let current = null;

  return async function suggest(query) {
    current?.abort();
    const controller = new AbortController();
    current = controller;
    return load(query, controller.signal);
  };
}
