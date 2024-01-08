const cds = require("@sap/cds");
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql;


module.exports = function service() {
  this.on(
    "getStorage",
    async ({ data: { book: book } }) => {
      const query = await SELECT.from("db_Books").columns("storage").where({
        ID: book,
      });
      return query;
    }
  );
};
