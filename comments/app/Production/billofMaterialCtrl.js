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
        .controller("billofMaterialCtrl", ["productCostingResource", "billofMaterialDescriptionResource", "salesQuotationDescriptionResource", "productResource", "productionTypeResource", "billofMaterialResource", "appAuth", billofMaterialCtrl]);
    function billofMaterialCtrl(productCostingResource, billofMaterialDescriptionResource, salesQuotationDescriptionResource, productResource, productionTypeResource, billofMaterialResource, appAuth) {
        var vm = this;
        vm.billofMaterials = [];
        vm.productCosting = {};
        appAuth.checkPermission();
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
        vm.CancelButton = false;


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
            //+parseFloat(item.OtherCost == null ? 0 : item.OtherCost)
            return ((parseFloat(item.RawMaterialUniteRate == null ? 0 : item.RawMaterialUniteRate)) * parseFloat(item.RawMaterialQuantity == null ? 0 : item.RawMaterialQuantity));

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
                vm.CancelButton = true;
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
                vm.CancelButton = false;
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
                vm.CancelButton = true;
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
                vm.CancelButton = true;
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
            productionTypeResource.query().$promise.then(function (data) {
                vm.productionTypes = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetProductList();
        //Get All Data List
        function GetProductList() {
            productResource.query().$promise.then(function (data) {
                vm.products = data;
               

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            billofMaterialResource.query({ '$filter': 'IsMRP eq ' + true }).$promise.then(function (data) {
                vm.billofMaterials = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save billofMaterial
        vm.Save = function (isValid) {
            if (isValid) {
                billofMaterialResource.save(vm.billofMaterial).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.billofMaterial = null;
                        toastr.success("Save Successful");
                    }, function (error) {
                        // error handler
                        toastr.error("Data Load Failed!");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Save BillofMaterial Description
        vm.SaveBillofMaterialDescription = function () {

            angular.forEach(vm.billofMaterialDescription.billofMaterialDesc,function (value, key) {
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
                    //OtherCost: value.OtherCost,
                    isFactory: value.isFactory,
                    IsBOM:true,
                    SalesQuotationID: vm.billofMaterial.SalesQuotationID,
                };


                billofMaterialDescriptionResource.save(billofMaterialDescInfo).$promise.then(
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Save Failed!");
                });
            })


        }
        //Get Single Record
        vm.Get = function (id) {
            billofMaterialResource.get({ 'ID': id }).$promise.then(function (billofMaterial) {
                vm.billofMaterial = billofMaterial;
                vm.GetSalesQuotationDescription(vm.billofMaterial.SalesQuotationID);
                vm.GetBillofMaterialDescription(vm.billofMaterial.BillofMaterialID);
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetBillofMaterialDescription = function (BillofMaterialID) {

            billofMaterialDescriptionResource.query({ '$filter': 'BillofMaterialID eq ' + BillofMaterialID }).$promise.then(function (data) {
                vm.billofMaterialDescription.billofMaterialDesc = data;
               

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
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

            salesQuotationDescriptionResource.query({ '$filter': 'SalesQuotationID eq ' + salesQuotationID }).$promise.then(function (data) {
                vm.SalesQuotationDescription.salesQuotationDesc = data;
                
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                billofMaterialResource.update({ 'ID': vm.billofMaterial.BillofMaterialID }, vm.billofMaterial).$promise.then(function () {
                vm.SaveBillofMaterialDescription();
                RequestProductCost(vm.billofMaterial.SalesQuotationID);
                vm.billofMaterials = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
                }, function (error) {
                    // error handler
                    toastr.error("Data Update Failed!");
                });
                }
            else {
                toastr.error("Form is not valid");
            }
        }

        function RequestProductCost(SalesQuotationID) {
            vm.productCosting.SalesQuotationID = SalesQuotationID;
            productCostingResource.save(vm.productCosting).$promise.then(
                    function (data, responseHeaders) {
                       // GetList();
                        vm.productCosting = null;
                        toastr.success("Save Successful");
                    }, function (error) {
                        // error handler
                        toastr.error("Data Load Failed!");
                    });
        }

        //Data Delete
        vm.Delete = function () {
            vm.billofMaterial.$delete({ 'ID': vm.billofMaterial.BillofMaterialID });
            billofMaterialResource.delete({ 'ID': vm.billofMaterial.BillofMaterialID }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                GetList();
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
            });
        }

    }

}());