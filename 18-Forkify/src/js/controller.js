import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

// Not real js, just coming from parcel
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1.) Loading Recipe
    await model.loadRecipe(id);

    // 2.) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
// controlRecipes ();

// This has more to do with DOM manipulation than it does with the controller
// so we need a wayto put this in the recipeView. The handler event that we
// are using is the controlRecipes in this file.
// Events should be handled in the controller (otherwise we would have application logic in the view)
// Events should be listened for in the view (otherwise we would need DOM elements in the controller)
// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );

// With the way we setup the architecture, the view doesn't know anything about
// the controller (doesn't import the controller, can't call any controller functions from the view)
// We can use the publisher/subscriber design pattern
// Controller does import both the view and the model
// controlRecipes will be passed into addHandlerRender when the program starts
// addHandlerRender listens for events (addEventListener), and uses controlRecipes as a callback
// As soon as the publisher publishes an event, the subscriber will get called
// Allows us to keep the handler in the controller and the listener in the view

// In summary, the handler subscribes to the publisher (listener), then as the
// publisher publishes an event the subscriber is executed

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
