import { graphql, Link } from 'gatsby';
import React from 'react';

import Img from 'gatsby-image';
import styled from 'styled-components';

export default function SinglePizzaPage({ data: { pizza } }) {
  console.log(data);

  return (
    <>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
      <div>
        <h2>Single Pizza: {pizza.name}</h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      </div>
    </>
  );
}

// could be queried in the gatsby-node. Wouldn't be hotloaded though
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
