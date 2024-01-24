class RestService extends cds.ApplicationService {
  async init() {
    this.reject(["CREATE", "UPDATE", "DELETE"], "*");
    this.api = await cds.connect.to("CommentsAPI")

    this.before("READ", "*", (req) => {
      // translate req.query into a query for the REST service
    });

    this.on("READ", "*", async (req, next) => {
        return this.api.run(req.query)
    });

    super.init();
  }
}

module.exports = RestService;
