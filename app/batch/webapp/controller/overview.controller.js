sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("batch.controller.Overview", {
      onInit() {
        this.byId("booksTable").bindItems({
          path: "/Books",
          template: this.byId("template"),
        });
      },
      onPressOpenDialog() {
        this._openDialog(undefined);
      },
      onPressEdit(oEvent) {
        this._openDialog(oEvent.getSource().getBindingContext().getPath());
      },
      onPressDelete(oEvent) {
        oEvent.getSource().getBindingContext().delete();
      },
      onPressDiscard() {
        this._discardDialog();
      },
      onPressSave() {
        this._saveDialog();
      },

      async _openDialog(sPath = undefined) {

        this.getOwnerComponent().getModel().resetChanges("book");

        if (!this.pBookDialog) {
          this.pBookDialog = this.loadFragment({
            name: "batch.view.BookDialog",
          });
          this.pBookDialog.then((oBookDialog) => {
            this.getView().addDependent(oBookDialog);
          });
        }

        this.pBookDialog.then(async (oBookDialog) => {
          oBookDialog.open();
          
          if (!sPath) {

            const oNewBook = this.getOwnerComponent()
              .getModel()
              .bindList("/Books", undefined, undefined, undefined, {
                $$updateGroupId: "book",
              })
              .create();
            oBookDialog.setBindingContext(oNewBook);
          } else {
            oBookDialog.bindElement(sPath, {
              $$updateGroupId: "book",
            });
          }
        });
      },
      _discardDialog() {
        this.getOwnerComponent().getModel().resetChanges("book");
        this._closeDialog();
      },
      _saveDialog() {
        this.getOwnerComponent().getModel().submitBatch("book");
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
