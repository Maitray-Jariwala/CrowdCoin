const { createServer } = require("http");
const next = require("next");

// creating a new app instance with the help of 'next' above
const app = next({
  dev: process.env.NODE_ENV !== "produciton",
});
// dev --> specifies if the application we are running is in production mode or not

const routes = require("./routes");
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err;
    console.log("Ready on localhost:3000");
  });
});
