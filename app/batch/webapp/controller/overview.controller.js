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
        // the use can press esc to close the dialog and in that case we never reset the created object.
        // if the user creates and saves a new one both would be created, hence we have to reset or delete the previously created object
        this.getOwnerComponent().getModel().resetChanges("book");
        if (!this.pBookDialog) {
          this.pBookDialog = this.loadFragment({
            name: "batch.view.bookDialog",
          });
          this.pBookDialog.then((oBookDialog) => {
            this.getView().addDependent(oBookDialog);
          });
        }
        this.pBookDialog.then(async (oBookDialog) => {
          oBookDialog.open();
          if (!sPath) {
            // first we bind a new list with an updateGroupId and create a new object on it.
            // we cant use any of the bind... functions (bindObject(), bindAggregation()...) because the newly created object is transient.
            // because create returns a context we can use the setBindingContext() function with the sole parameter being the new object.
            const oNewBook = this.getOwnerComponent()
              .getModel()
              .bindList("/Books", undefined, undefined, undefined, {
                $$updateGroupId: "book",
              })
              .create();
            oBookDialog.setBindingContext(oNewBook);
          } else {
            // To edit, bind the object to our dialog by using an updateGroupId.
            // This can be accomplished with any function that allows binding a single object. I've chosen bindElement().
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
