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

    return Controller.extend("bookstore.controller.overview", {
      onInit() {
        this.byId("booksList").bindItems({
          path: "/Books",
          template: this.byId("idListTemplate"),
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
        this._openDialog();
      },
      onPressListItem(oEvent) {
        const context = oEvent.getSource().getBindingContext();
        if (context.getProperty("IsActiveEntity")) {
          // This part makes the object in the db to a draft
          // In this situation i search for an object in the table books with id === to the it of the context which is an active entity (or a draft)
          // and i execute the bookstore.draftEdit(...) function on that object
          // if you would only write /Books(ID=XXXXXXXXX,IsActiveEntity=true into the URL it would return the draft as an object
          this.getOwnerComponent()
            .getModel()
            .bindContext(
              `/Books(ID=${context.getProperty(
                "ID"
              )},IsActiveEntity=true)/bookstore.draftEdit(...)`,
              context
            )
            .execute();
          this.getOwnerComponent().getModel().refresh();
          return;
        }

        this._openDialog(oEvent.getSource().getBindingContextPath());
      },
      onPressCancle(oEvent) {
        this._cancleDialog(oEvent);
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
            name: "bookstore.view.bookDialog",
          });
          this.pBookDialog.then((oBookDialog) => {
            this.getView().addDependent(oBookDialog);
            oBookDialog.bindElement(sPath);
          });
        }
        this.pBookDialog.then((oBookDialog) => {
          oBookDialog.open();
          oBookDialog.bindElement(sPath);
        });
      },
      _cancleDialog(oEvent) {
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
            `/Books(ID=${context.getProperty(
              "ID"
            )},IsActiveEntity=false)/bookstore.draftActivate(...)`,
            context
          )
          .execute();
        this._closeDialog();
      },
      _closeDialog() {
        this.byId("bookDialog").close();
        this.getOwnerComponent().getModel().refresh();
      },
    });
  }
);
