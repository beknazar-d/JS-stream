export const createVoucherIssuer = (prefix, startFrom = 1) => {
  let next = startFrom;
  return () => {
    const code = `${prefix}-${String(next).padStart(4, '0')}`;
    next++;
    return code;
  };
};

export const createLoyaltyCalculator = (threshold, percent) => (amountText) => {
  const amount = Number(amountText);
  if (Number.isNaN(amount) || amount <= 0) {
    return null;
  }
  return amount > threshold ? amount - (amount * percent) / 100 : amount;
};
