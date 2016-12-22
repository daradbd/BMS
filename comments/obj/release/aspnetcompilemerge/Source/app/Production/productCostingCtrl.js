(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (productCostingresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productCostingResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("productCostingCtrl", ["unitOfMeasureResource", "productResource", "productCostingDescriptionResource", "productCostingResource", "$window", "appAuth", productCostingCtrl]);
    function productCostingCtrl(unitOfMeasureResource, productResource, productCostingDescriptionResource, productCostingResource, $window, appAuth) {
        var vm = this;
        vm.productCostings = [];
        appAuth.checkPermission();
       // vm.productCostingDescription = [];
        vm.height=$window.innerHeight-180;
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
        vm.ImportToExcelButton = false;

        vm.ProductCostingDescription = { productCostingDesc: [{ SalesSectionID: 1, SalesSectionName: '', ProductID: 0, Description: "", MOUID: 0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.productCosting = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.PrintButton = false;
                vm.CancelButton = false;
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
                vm.PrintButton = false;
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
                vm.PrintButton = true;
                vm.CancelButton = true;
                vm.ImportToExcelButton = true;
            }
            if (activeMode == 4)//Edit View Mode
            {
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = true;
                vm.DeleteButton = true;
                vm.PrintButton = false;
                vm.CancelButton = true;
            }
        }

        vm.GetPrimeCost = function (item) {
            item.MaterialsWastageValue = (item.MaterialsWastage * item.NetMaterials * 0.01);
            item.GrossMaterial = (item.MaterialsWastageValue + item.NetMaterials);
            item.PrimeCost = (item.MaterialsWastageValue + item.NetMaterials + item.DirectLabour);
            item.MOHValue = (item.MOH * item.DirectLabour * 0.01);
            item.TranportationValue = (item.Tranportation * item.PrimeCost*0.01);
            item.FactoryCost = (item.TranportationValue + item.MOHValue + item.PrimeCost);
            item.AdminOHValue = (item.AdminOH * item.FactoryCost * 0.01);
            item.CostofProduction = (item.FactoryCost + item.AdminOHValue);
            item.SAndDOHValue = (item.SAndDOH * item.FactoryCost * 0.01);
            item.CostofSales = (item.CostofProduction + item.SAndDOHValue);
            item.ProfitPersentValue = (item.ProfitPersent * item.CostofSales * 0.01);
            item.SellingPricewithoutVAT = item.Assembly + item.ProfitPersentValue + item.CostofSales;
            item.VATValue = (item.VAT * item.SellingPricewithoutVAT * 0.01);
            item.SellingPricewithVATPcs = item.SellingPricewithoutVAT + item.VATValue;
            item.PromotionCostValue = (item.PromotionCost * item.SellingPricewithVATPcs * 0.01);
            item.ApprovedPricePcs = item.SellingPricewithVATPcs + item.PromotionCostValue;


            return item.PrimeCost;

        }



        var DispayButton = function () {

        }


        vm.SubTotal = function () {
            var total = 0.00;
            angular.forEach(vm.ProductCostingDescription.productCostingDesc, function (item, key) {
                total += item.FinalMRP;
            });
            return total;
        }

        vm.SectionSubTotal = function (SectionID) {
            var total = 0.00;
            angular.forEach(vm.ProductCostingDescription.productCostingDesc, function (item, key) {
                if (item.SalesSectionID == SectionID) {
                    total += (item.Quantity * (item.UnitPrice - item.Discount));
                }

            });
            return total;
        }

        vm.UpdateSectionName = function (SectionID, SalesSectionName) {
            angular.forEach(vm.ProductCostingDescription.productCostingDesc, function (item, key) {
                if (item.SalesSectionID == SectionID) {
                    item.SalesSectionName = SalesSectionName;
                }

            });

        }

        vm.UpdatePercentage = function (Value, KeyName) {
            angular.forEach(vm.ProductCostingDescription.productCostingDesc, function (item, key) {
               
                item[KeyName] = Value;
                

            });

        }


        GetUnitOfMeasures();
        function GetUnitOfMeasures() {
            unitOfMeasureResource.query(function (data) {
                vm.UnitOfMeasures = data;

            });
        }

        GetProductList();
        //Get All Data List
        function GetProductList() {
            productResource.query(function (data) {
                vm.products = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            productCostingResource.query(function (data) {
                vm.productCostings = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save productCosting
        vm.Save = function (isValid) {
            if (isValid) {
                productCostingResource.save(vm.productCosting,
                    function (data, responseHeaders) {
                        vm.SaveProductCosting();
                        GetList();
                        vm.productCosting = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        vm.SaveProductCosting = function () {
            
            angular.forEach(vm.ProductCostingDescription.productCostingDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var productCostingInfo = {
                    ProductCostingDescriptionID: value.ProductCostingDescriptionID,
                    ProductCostingDescriptionCode:value.ProductCostingDescriptionCode,
                    SalesSectionID: value.SalesSectionID,
                    SalesSectionName: value.SalesSectionName,
                    SalesQuotationID: value.SalesQuotationID,
                    CustomerID:value.CustomerID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    UOMID: value.UOMID,
                    Quantity:value.Quantity,
                    NetMaterials:value.NetMaterials,
                    MaterialsWastage :value.MaterialsWastage,
                    GrossMaterial:value.GrossMaterial,
                    LabourHrs :value.LabourHrs,
                    DirectLabour:value.DirectLabour,
                    PrimeCost:value.PrimeCost,
                    MOH:value.MOH,
                    Tranportation:value.Tranportation,
                    FactoryCost :value.FactoryCost,
                    AdminOH:value.AdminOH,
                    CostofProduction:value.CostofProduction,
                    SAndDOH:value.SAndDOH,
                    CostofSales:value.CostofSales,
                    ProfitPersent:value.ProfitPersent,
                    Assembly:value.Assembly,
                    SellingPricewitdoutVAT:value.SellingPricewitdoutVAT,
                    VAT:value.VAT,
                    SellingPricewitdVATPcs:value.SellingPricewitdVATPcs,
                    PromotionCost:value.PromotionCost,
                    ApprovedPricePcs:value.ApprovedPricePcs,
                    FinalMRP:value.FinalMRP,


                };

                productCostingDescriptionResource.save(productCostingInfo,
                   function (data, responseHeaders) {

                   });
            })


        }

        //Get Single Record
        vm.Get = function (id) {
            productCostingResource.get({ 'ID': id }).$promise.then(function (productCosting) {
                vm.productCosting = productCosting;
                GetProductCostingDescription(vm.productCosting.SalesQuotationID);
                vm.ViewMode(3);
               // toastr.success(vm.SubTotal(), 'Total Amount:', { closeButton: true, timeOut: 0,extendedTimeout:0 });
                //toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Get Single Record
       function GetProductCostingDescription(salesQuotationID) {

           productCostingDescriptionResource.query({ '$filter': 'SalesQuotationID eq ' + salesQuotationID }).$promise.then(function (data) {
                vm.ProductCostingDescription.productCostingDesc = data;

           }, function (error) {
               // error handler
               toastr.error("Data Load Failed!");
           });
        }
        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                productCostingResource.update({ 'ID': vm.productCosting.ProductCostingID }, vm.productCosting);
                vm.SaveProductCosting();
                vm.productCostings = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
            }
            else {
                toastr.error("Form is not valid");
            }
        }

        //Data Delete
        vm.Delete = function () {
            vm.productCosting.$delete({ 'ID': vm.ProductCosting.productCostingID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());