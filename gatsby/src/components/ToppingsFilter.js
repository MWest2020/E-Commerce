import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0 rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

// Count how many toppings are in each pizza
function countPizzasInToppings(pizzas) {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping.
      const existingTopping = acc[topping.id];
      // if so, increment 1
      if (existingTopping) {
        existingTopping.count += 1;
      }
      // else create a new entry in our accumulator and set it to 1
      else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }

      return acc;
    }, {});
  // sort based on amount of toppings
  // Object.values becaue we want to sort an object's values and can only do sort() directly on an array.
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // get a list of toppings
  // get a list of all the pizzas and their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query MyQuery {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
            vegetarian
          }
        }
      }
    }
  `);
  console.table({ toppings, pizzas });

  // link it up
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  console.log({ toppingsWithCounts });

  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length} </span>
      </Link>
      {/* // loop over the list of toppings and display the topping and the count of
      pizza toppings */}
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
