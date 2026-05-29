sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project1.controller.View1", {

        _sLastSelectedPath: null,

        onInit: function () {
            var oData = {
                materials: [
                    { Material: "MAT1001", Description: "Steel Bolt", Plant: "PL01", Batch: "B001", Bin: "BIN-A-01" },
                    { Material: "MAT1002", Description: "Iron Rod", Plant: "PL02", Batch: "B002", Bin: "BIN-B-02" },
                    { Material: "MAT1003", Description: "Copper Pipe", Plant: "PL03", Batch: "B003", Bin: "BIN-C-03" },
                    { Material: "MAT1004", Description: "Plastic Pipe", Plant: "PL04", Batch: "B004", Bin: "BIN-C-04" },
                    { Material: "MAT1005", Description: "Gold Rod", Plant: "PL05", Batch: "B005", Bin: "BIN-C-05" }
                ]
            };
            this.getView().setModel(new JSONModel(oData));
            this.getView().setModel(new JSONModel({}), "detail");
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue").trim();
            var oList = this.byId("materialList");
            var oBinding = oList.getBinding("items");

            // Hide detail card when searching
            this.byId("detailCard").setVisible(false);
            this._sLastSelectedPath = null;

            if (sQuery === "") {
                oBinding.filter([]);
                return;
            }

            var aFilters = [
                new Filter({
                    filters: [
                        new Filter("Material", FilterOperator.Contains, sQuery),
                        new Filter("Description", FilterOperator.Contains, sQuery)
                    ],
                    and: false
                })
            ];

            oBinding.filter(aFilters);
        },

        onMaterialPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var sPath = oItem.getBindingContext().getPath();
            var oDetailCard = this.byId("detailCard");

            if (this._sLastSelectedPath === sPath && oDetailCard.getVisible()) {
                oDetailCard.setVisible(false);
                this._sLastSelectedPath = null;
                return;
            }

            var oData = this.getView().getModel().getProperty(sPath);
            this.getView().getModel("detail").setData(oData);
            oDetailCard.setVisible(true);
            this._sLastSelectedPath = sPath;
        }

    });
});