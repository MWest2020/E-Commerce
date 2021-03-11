// this file loads after gatsby gathers all data, before building the actual pages
import path from 'path'; // node api import

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
  console.log(data);
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

export async function createPages(params) {
  // create pages dynamically
  // Pizzas
  await turnPizzasIntoPages(params);
  // toppings
  // Slicemasters
}
