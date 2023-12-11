//npm i cds-swagger-ui-express
const cds_swagger = require("cds-swagger-ui-express");
const cds = require("@sap/cds");
let app;

cds
  .on("bootstrap", (_app) => {
    app = _app;
    app.use(cds_swagger());
  })

  module.exports = cds.server;
