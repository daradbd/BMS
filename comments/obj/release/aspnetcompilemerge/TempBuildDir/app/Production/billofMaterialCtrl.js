(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (billofMaterialresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: billofMaterialResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("billofMaterialCtrl", ["productCostingResource","billofMaterialDescriptionResource", "salesQuotationDescriptionResource", "productResource", "productionTypeResource", "billofMaterialResource", billofMaterialCtrl]);
    function billofMaterialCtrl(productCostingResource,billofMaterialDescriptionResource, salesQuotationDescriptionResource, productResource, productionTypeResource, billofMaterialResource) {
        var vm = this;
        vm.billofMaterials = [];
        vm.productCosting = {};
       // vm.SalesQuotationDescription = { salesQuotationDesc: [{}] };
        vm.SalesQuotationDescription = { salesQuotationDesc: [] };

        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = false
        vm.EditView = false;

        // Action Button Control Variable //
        vm.SaveButton = false;
        vm.EditButton = false;
        vm.UpdateButton = false;
        vm.DeleteButton = false;
        vm.addItem = function (item) {
            vm.billofMaterialDescription.billofMaterialDesc.unshift({ SalesSectionID: item.SalesSectionID, SalesSectionName: item.SalesSectionName, ProductID: item.ProductID, ProductionTypeID: 0, RawMaterialsID: 0, ProductQuantity: item.Quantity, RawMaterialQuantity: 0, RawMaterialUniteRate: 0, OtherCost: 0, TotalCost: 0, isFactory: false });
        }
        vm.PushItem = function (item) {

            vm.billofMaterialDescription.billofMaterialDesc.push({ SalesSectionID: item.SalesSectionID, SalesSectionName: item.SalesSectionName, ProductID: item.ProductID, ProductionTypeID: 0, RawMaterialsID: 0, ProductQuantity: item.Quantity, RawMaterialQuantity: 0, RawMaterialUniteRate: 0, OtherCost: 0, TotalCost: 0, isFactory: false });
        }
        vm.removeItem = function (item) {
            vm.billofMaterialDescription.billofMaterialDesc.splice(vm.billofMaterialDescription.billofMaterialDesc.indexOf(item), 1);
        }
        vm.updateProductInfo = function (item) {
            item.ProductID = item.cmbProductID.ProductID;
            item.ProductQuantity = item.cmbProductID.Quantity;

        }
        vm.updateRawMaterialInfo = function (item) {
            item.RawMaterialsID = item.cmbRawMaterialsID.ProductID;
            item.RawMaterialUniteRate = item.cmbRawMaterialsID.CostPrice;
        }

        vm.SubTotal = function (item) {

            return ((parseFloat(item.RawMaterialUniteRate == null ? 0 : item.RawMaterialUniteRate) + parseFloat(item.OtherCost == null ? 0 : item.OtherCost)) * parseFloat(item.RawMaterialQuantity == null ? 0 : item.RawMaterialQuantity));

        }
        vm.billofMaterialDescription = { billofMaterialDesc: [{ SalesSectionID: 0, ProductID: 0, ProductionTypeID: 0, RawMaterialsID: 0, ProductQuantity: 0, Height: 0, Length: 0, Width: 0, RawMaterialQuantity: 0, RawMaterialUniteRate: 0, OtherCost: 0, TotalCost: 0, isFactory: false }] };

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.billofMaterial = null;
               
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
            }
            if (activeMode == 2) //List View Mode
            {
                vm.FromView = false;
                vm.ListView = true;
                vm.DetailsView = false
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
            }

            if (activeMode == 3)//Details View Mode
            {
                vm.FromView = false;
                vm.ListView = false;
                vm.DetailsView = true
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = true;
                vm.UpdateButton = false;
                vm.DeleteButton = true;
            }
            if (activeMode == 4)//Edit View Mode
            {
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false
                vm.EditView = true;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = true;
                vm.DeleteButton = true;
            }
        }

        var DispayButton = function () {

        }
        GetProductionTypeList();



        vm.GetQProductInfo = function (val, SalesSectionID) {
            for (var item in vm.SalesQuotationDescription.salesQuotationDesc) {
                if (vm.SalesQuotationDescription.salesQuotationDesc[item].ProductID == val && vm.SalesQuotationDescription.salesQuotationDesc[item].SalesSectionID == SalesSectionID) {
                    return vm.SalesQuotationDescription.salesQuotationDesc[item];
                }
            }
        }

        //Get All Data List
        function GetProductionTypeList() {
            productionTypeResource.query(function (data) {
                vm.productionTypes = data;

            });
        }

        GetProductList();
        //Get All Data List
        function GetProductList() {
            productResource.query(function (data) {
                vm.products = data;
               

            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            billofMaterialResource.query({ '$filter': 'IsMRP eq ' + true }, function (data) {
                vm.billofMaterials = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save billofMaterial
        vm.Save = function (isValid) {
            if (isValid) {
                billofMaterialResource.save(vm.billofMaterial,
                    function (data, responseHeaders) {
                        GetList();
                        vm.billofMaterial = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Save BillofMaterial Description
        vm.SaveBillofMaterialDescription = function () {

            angular.forEach(vm.billofMaterialDescription.billofMaterialDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var billofMaterialDescInfo = {
                    BillofMaterialDescriptionID:value.BillofMaterialDescriptionID,
                    BillofMaterialID: vm.billofMaterial.BillofMaterialID,
                    CustomerID: vm.billofMaterial.CustomerID,
                    ProductQuantity: value.ProductQuantity,
                    SalesSectionID: value.SalesSectionID,
                    SalesSectionName: value.SalesSectionName,
                    ProductID: value.ProductID,
                    ProductionTypeID: value.ProductionTypeID,
                    RawMaterialsID: value.RawMaterialsID,
                    RawMaterialQuantity: value.RawMaterialQuantity,
                    RawMaterialUniteRate: value.RawMaterialUniteRate,
                    OtherCost: value.OtherCost,
                    isFactory: value.isFactory,
                    IsBOM:true,
                    SalesQuotationID: vm.billofMaterial.SalesQuotationID,
                };


                billofMaterialDescriptionResource.save(billofMaterialDescInfo,
                function (data, responseHeaders) {

                });
            })


        }
        //Get Single Record
        vm.Get = function (id) {
            billofMaterialResource.get({ 'ID': id }, function (billofMaterial) {
                vm.billofMaterial = billofMaterial;
                vm.GetSalesQuotationDescription(vm.billofMaterial.SalesQuotationID);
                vm.GetBillofMaterialDescription(vm.billofMaterial.BillofMaterialID);
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }

        vm.GetBillofMaterialDescription = function (BillofMaterialID) {

            billofMaterialDescriptionResource.query({ '$filter': 'BillofMaterialID eq ' + BillofMaterialID }, function (data) {
                vm.billofMaterialDescription.billofMaterialDesc = data;
               

            })
        }

        vm.CheckDetails = function () {
            if (vm.billofMaterialDescription.billofMaterialDesc.length == 0) {
                for (var item in vm.SalesQuotationDescription.salesQuotationDesc) {
                    if (vm.SalesQuotationDescription.salesQuotationDesc[item].ProductID > 0)
                    {
                        vm.addItem(vm.SalesQuotationDescription.salesQuotationDesc[item]);
                    }
                    
                }
            }
        }

        vm.GetSalesQuotationDescription = function (salesQuotationID) {

            salesQuotationDescriptionResource.query({ '$filter': 'SalesQuotationID eq ' + salesQuotationID }, function (data) {
                vm.SalesQuotationDescription.salesQuotationDesc = data;
                
            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                billofMaterialResource.update({ 'ID': vm.billofMaterial.BillofMaterialID }, vm.billofMaterial);
                vm.SaveBillofMaterialDescription();
                RequestProductCost(vm.billofMaterial.SalesQuotationID);
                vm.billofMaterials = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
            }
            else {
                toastr.error("Form is not valid");
            }
        }

        function RequestProductCost(SalesQuotationID) {
            vm.productCosting.SalesQuotationID = SalesQuotationID;
            productCostingResource.save(vm.productCosting,
                    function (data, responseHeaders) {
                       // GetList();
                        vm.productCosting = null;
                        toastr.success("Save Successful");
    });
        }

        //Data Delete
        vm.Delete = function () {
            vm.billofMaterial.$delete({ 'ID': vm.billofMaterial.BillofMaterialID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());