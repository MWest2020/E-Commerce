import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Beerlist from '../components/Beerlist';

export default function BeersPage({ data }) {
  const beers = data.allBeer.nodes;
  return <Beerlist beers={beers} />;
}

export const query = graphql`
  query BeerQuery {
    beers: allBeer {
      nodes {
        id
        image
        name
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;
