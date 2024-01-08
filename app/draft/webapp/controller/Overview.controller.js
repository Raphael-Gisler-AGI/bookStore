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
            // This part makes the object in the db to a draft
            // and i execute the draft.draftEdit(...) function on that object
            // if you would only write "/Books(ID=XXXXXXXXX,IsActiveEntity=xxxx)" (this is what context.getPath() is equal to) into the URL it would return the draft as an object
            this.getOwnerComponent()
              .getModel()
              .bindContext(
                `${context.getPath()}/drafts.draftEdit(...)`,
                context
              )
              .execute();
          }
          // i send the path for the draft so that i edit it and not the original object
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
            // this is how you create a draft or an entry depending on if drafts are enabled
            let oListBinding = this.getOwnerComponent()
              .getModel()
              .bindList("/Books");
            let newBook = oListBinding.create();
            await newBook.created();
            sPath = newBook.getPath();
          }
  
          if (!this.pBookDialog) {
            this.pBookDialog = this.loadFragment({
              name: "draft.view.bookDialog",
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
          // this is how you delete a draft or an entry depending on if drafts are enabled
          oEvent.getSource().getBindingContext().delete();
          this._closeDialog();
        },
        _saveDialog(oEvent) {
          const context = oEvent.getSource().getBindingContext();
          //this part makes a draft to an object in the db
          //same as in the draftEdit but its a different function
          this.getOwnerComponent()
            .getModel()
            .bindContext(
              `${context.getPath()}/drafts.draftActivate(...)`,
              context
            )
            .execute();
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
  