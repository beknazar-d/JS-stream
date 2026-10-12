export function createEventHub() {
  return {
    handlers: {},

    on(event, handler, context) {
      const record = { handler, context };
      if (!this.handlers[event]) {
        this.handlers[event] = [];
      }
      this.handlers[event].push(record);
      return () => {
        const list = this.handlers[event];
        const index = list.indexOf(record);
        if (index !== -1) {
          list.splice(index, 1);
        }
      };
    },

    emit(event, ...args) {
      const list = this.handlers[event];
      if (!list) {
        return 0;
      }
      const snapshot = [...list];
      for (const { handler, context } of snapshot) {
        handler.apply(context, args);
      }
      return snapshot.length;
    },

    listenerCount(event) {
      const list = this.handlers[event];
      return list ? list.length : 0;
    },
  };
}
