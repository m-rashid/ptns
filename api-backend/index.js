const routes = require('./routes');
const express = require('express');
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
app.use(express.json());

app.use('/', routes);
app.all("/*", function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,Content-type,Accept,X-Access-Token,X-Key"
    );
    if (req.method == "OPTIONS") {
      res.status(200).end();
    } else {
      next();
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));