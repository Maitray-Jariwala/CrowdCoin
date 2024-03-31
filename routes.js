const routes = require("next-routes")(); // this line invokes a function

routes
  .add("/campaigns/new", "campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");
// inside the 'add' above what we are doing is adding a pattern for what we are finding
// anytihn after the ':' specifies that after this everything is a wild Card

// one trick or problem here would be that, if we now try to create new campaign, we will be taken to the address 'campaigns/show'
// so to overwrite it, we added another route, BEFORE --> we need to add this BEFORE we add the route for general address 'campaign/:address'
// only then will it work
// now we will once again be taken to the address 'campaigns/new' when we try to create a new campaign
module.exports = routes;
