import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const BeerStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
`;

const BeerGridStyles = styled.div``;

function SingleBeer({ beer }) {
  console.log({ beer });
  return (
    <BeerStyles>
      <h2 className="center">
        <span className="mark">{beer.name}</span>
      </h2>
      <img src={beer.image} alt={beer.name} />
      {/* <h3>{beer.rating.average}</h3>
      <h3>{beer.rating.reviews}</h3> */}
    </BeerStyles>
  );
}

export default function Beerlist({ beers }) {
  return (
    <BeerGridStyles>
      <h2>We got {beers.length} Beers to chose from</h2>
      {beers.map((beer) => (
        <SingleBeer key={beer.index} beer={beer} />
      ))}
    </BeerGridStyles>
  );
}
