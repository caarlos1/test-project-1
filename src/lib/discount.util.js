import Money from "./money";

const calculatePercentageDiscount = (amount, quantity, condition) => {
  if (condition?.percentage && quantity > condition.minimum)
    return amount.percentage(condition.percentage);

  return Money({ amount: 0 });
};

const calculateQuantityDiscount = (amount, quantity, condition) => {
  const isEven = quantity % 2 == 0;
  if (condition?.quantity && quantity > condition.quantity)
    return amount.percentage(isEven ? 50 : 40);

  return Money({ amount: 0 });
};

export const calculateDiscount = (amount, quantity, condition) => {
  const list = Array.isArray(condition) ? condition : [condition];

  const [higherDiscount] = list
    .map(cond => {
      if (cond?.percentage)
        return calculatePercentageDiscount(amount, quantity, cond).getAmount();
      else if (cond?.quantity)
        return calculateQuantityDiscount(amount, quantity, cond).getAmount();
    })
    .sort((a, b) => b - a);

  return Money({ amount: higherDiscount });
};
