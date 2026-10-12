const search = document.querySelector('#search');
const results = document.querySelector('#results');

async function loadResults(text) {
  const response = await fetch('/api/search?q=' + encodeURIComponent(text));
  const items = await response.json();
  results.replaceChildren(
    ...items.map((item) => {
      const li = document.createElement('li');
      li.textContent = item.title;
      return li;
    }),
  );
}

let timer;

search.addEventListener('input', () => {
  timer = setTimeout(() => loadResults(search.value), 300);
});
