// this file loads after gatsby gathers all data, before building the actual pages
import path from 'path'; // node api import
import fetch from 'isomorphic-fetch'; // needs isomorphic import because we are working in node, and not the browser. Check to replace with axios

async function turnPizzasIntoPages({ graphql, actions }) {
  // template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // loop over pizzas and create a page for the pizza
  // forEach, not returning data
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // url for page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      // pass data-like attributes (props) to template via context
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // loop over toppings and create a page for the topping
  // forEach, not returning data
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // url for page
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      // pass data-like attributes (props) to template via context
      context: {
        topping: topping.name,
        // REGEX
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // fetch list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  console.log(beers);
  // loop over each one
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
  // create a node for that beers
}

export async function sourceNodes(params) {
  // fetch list of beers nad source them in our gatsby app
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // create pages dynamically
  await Promise.all([
    // Pizzas
    turnPizzasIntoPages(params),
    // toppings
    turnToppingsIntoPages(params),
    // Slicemasters
  ]);
}
