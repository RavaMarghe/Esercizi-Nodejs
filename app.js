const { createServer } = require("node:http");

const createApp = () => {
  return createServer((request, response) => {
    response.setHeader("Content-type", "text/html");
    response.end(`<html><body><h1>Welcome to the World Wide Web!</h1></body></html>`);
  });
};

module.exports = createApp;
