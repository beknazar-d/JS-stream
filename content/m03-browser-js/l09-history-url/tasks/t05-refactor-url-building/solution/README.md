# Разбор

Что было не так. Ручная сборка `'q=' + filters.q` не кодирует значение: амперсанд превращается в разделитель параметров, `#` обрезает адрес как якорь, `%` ломает `decodeURIComponent`. Ручной разбор по `&` и `=` не знает про `+` вместо пробела.

После рефакторинга:

```js
function buildUrl(filters) {
  const params = new URLSearchParams();
  if (filters.q) params.set('q', filters.q);
  if (filters.category !== 'all') params.set('category', filters.category);
  const query = params.toString();
  return query ? '/catalog?' + query : '/catalog';
}

function parseFilters(url) {
  const params = new URL(url, 'https://domoteka.example').searchParams;
  return { q: params.get('q') ?? '', category: params.get('category') ?? 'all' };
}
```

Три момента.

1. `set` и `toString` кодируют значения сами. «кофе & чай» превращается в `%D0%BA%D0%BE...+%26+...`, а `get` раскодирует его обратно.
2. Значения по умолчанию в адрес по-прежнему не попадают: условия перед `set` остались. Передача объекта в `new URLSearchParams(filters)` записала бы пустой `q` и `category=all`.
3. `get` возвращает `null` для отсутствующего параметра, поэтому `?? ''` и `?? 'all'` сохраняют прежнее поведение: поле поиска всегда строка.

Базовый адрес `https://domoteka.example` в `parseFilters` нужен только затем, чтобы `new URL` принимал относительные пути.
