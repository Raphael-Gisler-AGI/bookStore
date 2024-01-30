sap.ui.define(["sap/fe/core/rootView/NavContainer.controller"], function (
  NavigationController
) {
  "use strict";

  return NavigationController.extend("fpm.ext.main.controller.Root", {
    onInit() {
      const sideNavigation = this.byId("sideNavigation");

      this._getRouter().attachRouteMatched((oEvent) => {
        const routeName = oEvent.getParameter("name");
        sideNavigation.setSelectedKey(routeName);
      });
    },

    _getRouter() {
      return this.getAppComponent().getRouter();
    },
  });
});
