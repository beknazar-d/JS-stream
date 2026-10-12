// Два запроса поиска. Ответ на первый идёт долго и приходит позже второго.
const requests = [
  { query: 'мик', sentAt: 300, delay: 600 },
  { query: 'миксер', sentAt: 700, delay: 50 },
];

const arrivals = requests
  .map((request) => ({ query: request.query, arrivedAt: request.sentAt + request.delay }))
  .sort((a, b) => a.arrivedAt - b.arrivedAt);

for (const arrival of arrivals) {
  console.log(`в ${arrival.arrivedAt} мс пришёл ответ на «${arrival.query}»`);
}

const shownWithoutCancel = arrivals[arrivals.length - 1].query;
console.log('на экране без отмены:', shownWithoutCancel);

// Если при втором запросе отменить первый, его ответ не придёт совсем.
const survivors = arrivals.filter((arrival) => arrival.query === 'миксер');
console.log('на экране с отменой:', survivors[survivors.length - 1].query);
