// У списка с сервера четыре состояния. Выбираем одно по данным, которые у нас есть.
function viewState({ loading, error, items }) {
  if (loading) return 'loading';
  if (error) return 'error';
  if (items.length === 0) return 'empty';
  return 'list';
}

const TEXTS = {
  loading: 'Загружаем доставки…',
  error: 'Не удалось загрузить доставки',
  empty: 'Доставок на сегодня нет',
  list: '',
};

const cases = [
  { loading: true, error: null, items: [] },
  { loading: false, error: 'Нет сети', items: [] },
  { loading: false, error: null, items: [] },
  { loading: false, error: null, items: ['№1042'] },
];

for (const data of cases) {
  const state = viewState(data);
  console.log(state + ': [' + TEXTS[state] + ']');
}
