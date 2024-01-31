sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("fpm.ext.main.controller.ObjectPage", {
    onPressGenre(oEvent) {
      const genreId = this.getView()
        .getBindingContext()
        .getProperty("genre/ID");
      
      this.getRouter().navTo("GenresObjectPage", { GenresKey: genreId });
    },
  });
});
