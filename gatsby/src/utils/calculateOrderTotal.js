import React from 'react';
import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function calculateOrderTotal(order, pizzas) {
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  return formatMoney(total);
}
