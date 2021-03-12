import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const BeerStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
`;

export default function Beerlist({ beers }) {
  return (
    <>
      <h2 className="center">
        We got {beers.length} Beers to chose from. Dine in Only!
      </h2>
      <div>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <BeerStyles>
              <img src={beer.image} alt={beer.name} />
              <h3 className="mark">{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐`.repeat(5 - rating)}
                </span>
                <span>{beer.rating.reviews}</span>
              </p>
            </BeerStyles>
          );
        })}
      </div>
    </>
  );
}
