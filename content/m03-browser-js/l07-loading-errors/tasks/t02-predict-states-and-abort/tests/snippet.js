function viewState({ loading, error, items }) {
  if (loading) return 'loading';
  if (error) return 'error';
  if (items.length === 0) return 'empty';
  return 'list';
}

console.log(viewState({ loading: true, error: null, items: [] }));
console.log(viewState({ loading: false, error: 'Нет сети', items: [1] }));
console.log(viewState({ loading: false, error: null, items: [] }));
console.log(viewState({ loading: false, error: null, items: [1, 2] }));

const controller = new AbortController();
console.log(controller.signal.aborted);
controller.abort();
console.log(controller.signal.aborted);
console.log(controller.signal.reason.name);

const second = new AbortController();
second.signal.addEventListener('abort', () => console.log('отмена получена'));
console.log('до abort');
second.abort();
console.log('после abort');
