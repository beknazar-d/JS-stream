// Модель addEventListener: список функций на каждое имя события.
function createTarget() {
  const listeners = [];
  return {
    add(fn, options = {}) {
      listeners.push({ fn, once: options.once === true });
    },
    remove(fn) {
      const index = listeners.findIndex((item) => item.fn === fn);
      if (index !== -1) listeners.splice(index, 1);
    },
    fire(event) {
      for (const item of [...listeners]) {
        if (item.once) this.remove(item.fn);
        item.fn(event);
      }
    },
  };
}

const button = createTarget();
let clicks = 0;

function count(event) {
  clicks += 1;
  console.log('клик ' + clicks + ', тип: ' + event.type);
}

button.add(count);
button.fire({ type: 'click' });
button.fire({ type: 'click' });

button.remove(count);
button.fire({ type: 'click' });
console.log('после удаления: ' + clicks);
