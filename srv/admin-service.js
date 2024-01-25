class AdminService extends cds.ApplicationService {
//   async init() {
//     this.api = await cds.connect.to("CommentsAPI");
//     const { Comments, Books } = this.entities;

//     this.on("READ", Books, async (req, next) => {
//       return await req.query
//     });

//     this.before("READ", Comments, (req) => {
//       // translate req.query into a query for the REST service
//     });

//     this.on("READ", Comments, async (req, next) => {
//       return this.api.run(req.query);
//     });

//     return super.init();
//   }
}

module.exports = AdminService;
