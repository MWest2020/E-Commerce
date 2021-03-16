import React from 'react';

const formatter = Intl.NumberFormat('en-EN', {
  style: 'currency',
  currency: 'EUR',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
