// Модель addEventListener, removeEventListener и once.
function createTarget() {
  const listeners = [];
  return {
    on(fn, options = {}) {
      listeners.push({ fn, once: options.once === true });
    },
    off(fn) {
      const index = listeners.findIndex((item) => item.fn === fn);
      if (index !== -1) listeners.splice(index, 1);
    },
    fire(event) {
      for (const item of [...listeners]) {
        if (item.once) this.off(item.fn);
        item.fn(event);
      }
    },
  };
}

function a(event) {
  console.log('a ' + event.type);
}
function b(event) {
  console.log('b ' + event.type);
}
function c(event) {
  console.log('c ' + event.type);
}

const target = createTarget();
target.on(a);
target.on(b, { once: true });
target.on(c);

target.fire({ type: 'click' });
target.fire({ type: 'click' });

target.off(a);
target.on(() => console.log('x'));
target.off(() => console.log('x'));
target.fire({ type: 'input' });
