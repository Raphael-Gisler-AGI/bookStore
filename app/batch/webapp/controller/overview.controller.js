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
        this._openDialog(
          oEvent.getSource().getBindingContext().getProperty("ID")
        );
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

      async _openDialog(sID = undefined) {
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
          // We first create a new binding for content on our Dialog.
          // This has to be done because once we edit we overwrite this binding and then we can create anymore.
          if (!sID) {
            oBookDialog.bindAggregation("content", {
              path: "/Books",
              length: 1,
              template: this.byId("idVBox"),
              parameters: {
                $$updateGroupId: "book",
              },
            });
            // After creating the binding we create a new item on it.
            oBookDialog.getBinding("content").create();
            // Note that we are binding a list to the dialogue. Therefore there is no ID in the path.
            // We do this because we can only create objects on a List and not on single Bindings.
            // We limit the length of the array that is displayed to 1 with: "length: 1"
            // because items that are created are always at first place its the only item shown.
          } else {
            // In case of editing we do the same thing but we filter for the clicked item wia its ID
            // We also dont need to limit the length this time because IDs should be unique.
            oBookDialog.bindAggregation("content", {
              path: "/Books",
              template: this.byId("idVBox"),
              parameters: {
                $$updateGroupId: "book",
              },
              filters: new Filter("ID", FilterOperator.EQ, sID),
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
