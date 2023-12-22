sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("batch.controller.overview", {
      onInit: function () {
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
        if (!this.pBookDialog) {
          this.pBookDialog = this.loadFragment({
            name: "batch.view.bookDialog",
          });
          this.pBookDialog.then((oBookDialog) => {
            this.getView().addDependent(oBookDialog);
          });
        }
        this.pBookDialog.then((oBookDialog) => {
          oBookDialog.open();
          // if we arent editing we get the binding from the dialog and than create a new item on it
          // look at the comment in the bookDialog to understand why this works
          if (!sPath) {
            const olistBinding = oBookDialog.getBinding("content");
            olistBinding.create();
          } else {
          // else we bind one object to it
            oBookDialog.bindObject({
              path: sPath,
              parameters: {
                $$updateGroupId: 'create'
                }
            })
          }
        });
      },
      _discardDialog() {
        this.getOwnerComponent().getModel().resetChanges("create");
        this._closeDialog();
      },
      _saveDialog() {
        this.getOwnerComponent().getModel().submitBatch("create");
        this._closeDialog();
      },
      _closeDialog() {
        const dialog = this.byId("bookDialog");
        //the error is wrong unbindElement does not need a parameter. the docu says it needs the model name but because our main service doesnt have a name, unless you give it one you need to leave it empty
        //you need to do this because once you refresh the model it also refreshes what is bound to the model but because that object doesnt exsist anymore this throws an error.
        dialog.unbindElement();
        dialog.close();
        this.getOwnerComponent().getModel().refresh();
      },
    });
  }
);
