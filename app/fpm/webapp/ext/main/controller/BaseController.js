sap.ui.define(["sap/fe/core/PageController"], function (PageController) {
  "use strict";

  return PageController.extend("fpm.ext.main.controller.BaseController", {
    getRouter() {
      return this.getAppComponent().getRouter();
    },
  });
});
