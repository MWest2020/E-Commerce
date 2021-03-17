import React, { useState } from 'react';

const OrderContext = React.createContext();

// Custom Provider
export function OrderProvider({ children }) {
  // create and set state
  const [order, setOrder] = useState([]);

  // Send it back up (service it up)
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
