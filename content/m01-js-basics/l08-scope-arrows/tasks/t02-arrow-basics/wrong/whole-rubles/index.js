export const toRubles = (kopecks) => Math.floor(kopecks / 100);

export const orderTotal = (price, quantity) => price * quantity;

export const freeShipping = () => 0;
