sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/Filter",
      "sap/ui/model/FilterOperator",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
      "use strict";
  
      return Controller.extend("draft.controller.overview", {
        onInit() {
          
          this.byId("booksTable").bindItems({
            path: "/Books",
            template: this.byId("template"),
            filters: new Filter({
              filters: [
                new Filter(
                  "SiblingEntity/IsActiveEntity",
                  FilterOperator.EQ,
                  null
                ),
                new Filter("IsActiveEntity", FilterOperator.EQ, false),
              ],
              and: true,
            }),
          });
        },
        onPressOpenDialog() {
          this._openDialog(undefined);
        },
        onPressEdit(oEvent) {

          const context = oEvent.getSource().getBindingContext();

          if (context.getProperty("IsActiveEntity")) {
            this.getOwnerComponent()
              .getModel()
              .bindContext(
                `${context.getPath()}/DraftService.draftEdit(...)`,
                context
              )
              .execute();
          }

          this._openDialog(
            `/Books(ID=${context.getProperty("ID")},IsActiveEntity=false)`
          );
        },
        onPressDelete(oEvent) {
          oEvent.getSource().getBindingContext().delete();
        },
        onPressDiscard(oEvent) {
          this._discardDialog(oEvent);
        },
        onPressSave(oEvent) {
          this._saveDialog(oEvent);
        },
  
        async _openDialog(sPath = undefined) {
          if (!sPath) {
            let oListBinding = this.getOwnerComponent()
              .getModel()
              .bindList("/Books");
            let newBook = oListBinding.create();
            await newBook.created();
            sPath = newBook.getPath();
          }
  
          if (!this.pBookDialog) {
            this.pBookDialog = this.loadFragment({
              name: "draft.view.BookDialog",
            });
            this.pBookDialog.then((oBookDialog) => {
              this.getView().addDependent(oBookDialog);
              oBookDialog.bindElement(sPath)
            });
          }
          this.pBookDialog.then((oBookDialog) => {
            oBookDialog.open();
            oBookDialog.bindElement(sPath);
          });
        },
        _discardDialog(oEvent) {
          oEvent.getSource().getBindingContext().delete();
          this._closeDialog();
        },
        _saveDialog(oEvent) {
          const context = oEvent.getSource().getBindingContext();
          this.getOwnerComponent()
            .getModel()
            .bindContext(
              `${context.getPath()}/DraftService.draftActivate(...)`,
              context
            )
            .execute();
          this._closeDialog();
        },
        _closeDialog() {
          const oDialog = this.byId("bookDialog");
          oDialog.unbindElement();
          oDialog.close();
          this.getOwnerComponent().getModel().refresh();
        },
      });
    }
  );
  