import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create some state to hold our order
  // Commented put the state line. We move state up to the provider and can acces it now via context
  // const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);

  // 2. Make a function add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // 4. Send this data the a serevrless function when they check out
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
