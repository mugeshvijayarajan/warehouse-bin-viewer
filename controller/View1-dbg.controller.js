sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.View1", {

        _sLastSelectedPath: null,

        onInit: function () {
            var oData = {
                materials: [
                    { Material: "MAT1001", Description: "Steel Bolt", Plant: "PL01", Batch: "B001", Bin: "BIN-A-01" },
                    { Material: "MAT1002", Description: "Iron Rod", Plant: "PL02", Batch: "B002", Bin: "BIN-B-02" },
                    { Material: "MAT1003", Description: "Copper Pipe", Plant: "PL03", Batch: "B003", Bin: "BIN-C-03" },
                    { Material: "MAT1004", Description: "plastic Pipe", Plant: "PL04", Batch: "B004", Bin: "BIN-C-04" },
                    { Material: "MAT1005", Description: "Gold Rod", Plant: "PL05", Batch: "B005", Bin: "BIN-C-05" }
                ]
            };
            this.getView().setModel(new JSONModel(oData));
            this.getView().setModel(new JSONModel({}), "detail");
        },

        onMaterialPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var sPath = oItem.getBindingContext().getPath();
            var oDetailCard = this.byId("detailCard");

            // Same row clicked again → toggle hide
            if (this._sLastSelectedPath === sPath && oDetailCard.getVisible()) {
                oDetailCard.setVisible(false);
                this._sLastSelectedPath = null;
                return;
            }

            // New row clicked → show details
            var oData = this.getView().getModel().getProperty(sPath);
            this.getView().getModel("detail").setData(oData);
            oDetailCard.setVisible(true);
            this._sLastSelectedPath = sPath;
        }

    });
});