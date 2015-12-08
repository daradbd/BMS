(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (productionOrderresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productionOrderResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("productionOrderDeliveryCtrl", ["projectSetupResource","productionOrderDescriptionResource", "salesOrderResource", "salesOrderDescriptionResource", "$rootScope", "companyBranchResource", "productionOrderResource", productionOrderDeliveryCtrl]);
    function productionOrderDeliveryCtrl(projectSetupResource,productionOrderDescriptionResource,salesOrderResource, salesOrderDescriptionResource, $rootScope, companyBranchResource, productionOrderResource) {
        var vm = this;
        vm.warning = 'tblWarning';
        vm.productionOrder = [];
        vm.productionOrders = [];
        vm.projectSetup =[];
        vm.SalesOrderDescription = { salesOrderDesc: [] };
        vm.productionOrderDescription = { productionOrderDesc: [{ SalesSectionID: 1, SalesSectionName:"", ProductID: 0, OfferDate: "", Oopened: false, ScheduleDate: "", sopened: false, Quantity:0,POrderQuantity:0,IsClaim:false,ClaimParentID:0 }] };
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
            vm.productionOrderDescription.productionOrderDesc.unshift({ SalesSectionID: item.SalesSectionID, SalesSectionName: item.SalesSectionName, ProductID: item.ProductID, OfferDate: "", Oopened: false, ScheduleDate: "", sopened: false, Quantity: item.Quantity,POrderQuantity:0,DeliveryQty:0,IsClaim:false,ClaimParentID:0 });
        }
        vm.PushItem = function (item) {

            vm.productionOrderDescription.productionOrderDesc.push({ SalesSectionID: item.SalesSectionID, SalesSectionName: item.SalesSectionName, ProductID: item.ProductID, OfferDate: "", Oopened: false, ScheduleDate: "", sopened: false, Quantity: item.Quantity,POrderQuantity:0,DeliveryQty:0,IsClaim:false,ClaimParentID:0 });
        }
        vm.removeItem = function (item) {
            vm.productionOrderDescription.productionOrderDesc.splice(vm.productionOrderDescription.productionOrderDesc.indexOf(item), 1);
        }
        vm.checkOrderQty = function (item) {
            if (item.DeliveryQty != null && item.DeliveryQty !='')
            {
                var qty= item.POrderQuantity-item.DeliveryQty;
                if (qty > 0) {

                    for (var items in vm.productionOrderDescription.productionOrderDesc) {
                        if (vm.productionOrderDescription.productionOrderDesc[items].IsClaim == true && vm.productionOrderDescription.productionOrderDesc[items].ClaimParentID == item.ProductionOrderDescriptionID) {
                            //vm.removeItem(vm.productionOrderDescription.productionOrderDesc[items]);
                            return;
                        }
                    }
                    vm.productionOrderDescription.productionOrderDesc.push({ SalesSectionID: item.SalesSectionID, SalesSectionName: item.SalesSectionName, ProductID: item.ProductID, OfferDate: item.OfferDate, Oopened: false, ScheduleDate: item.ScheduleDate, sopened: false, Quantity: item.Quantity, POrderQuantity: qty, DeliveryQty:'', IsClaim: true, ClaimParentID: item.ProductionOrderDescriptionID });
                }
                else {
                    for (var items in vm.productionOrderDescription.productionOrderDesc) {
                        if (vm.productionOrderDescription.productionOrderDesc[items].IsClaim == true && vm.productionOrderDescription.productionOrderDesc[items].ClaimParentID == item.ProductionOrderDescriptionID) {
                            vm.removeItem(vm.productionOrderDescription.productionOrderDesc[items]);
                        }
                    }
                }
            }

           
        }


        vm.sopen = function (item, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            item.sopened = !item.sopened;

        }
        vm.Oopen = function (item, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            item.Oopened = !item.Oopened;

        }

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.productionOrder = null;
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

        if ($rootScope.SOrderID > 0) {
            GetSalesOrder($rootScope.SOrderID);
            $rootScope.SOrderID = 0;
        }


        var DispayButton = function () {

        }


        vm.GetQProductInfo = function (val, SalesSectionID) {
            for (var item in vm.productionOrderDescription.productionOrderDesc) {
                if (vm.productionOrderDescription.productionOrderDesc[item].ProductID == val && vm.productionOrderDescription.productionOrderDesc[item].SalesSectionID == SalesSectionID) {
                    return vm.productionOrderDescription.productionOrderDesc[item];
                }
            }
        }


        GetWorkStationList();

        //Get All Data List
        function GetWorkStationList() {
            companyBranchResource.query().$promise.then(function (data) {
                vm.companyBranchs = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        GetList();

        //Get All Data List
        function GetList() {
            productionOrderResource.query().$promise.then(function (data) {
                vm.productionOrders = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save productionOrder
        vm.Save = function (isValid) {
            if (isValid) {
                vm.productionOrder.ReferenceID = vm.salesOrder.SalesOrderID;
                vm.productionOrder.ReferenceTypeID = 1;
                vm.productionOrder.ProjectID = vm.salesOrder.ProjectID;
                productionOrderResource.save(vm.productionOrder).$promise.then(
                    function (data, responseHeaders) {
                        vm.productionOrder = data;
                        vm.SaveproductionOrderDescriptionResource();
                        GetList();
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
        vm.SaveproductionOrderDescriptionResource = function () {

            angular.forEach(vm.productionOrderDescription.productionOrderDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var productionOrderInfo = {
                    ProductionOrderDescriptionID: value.ProductionOrderDescriptionID,
                    ProductionOrderID: vm.productionOrder.ProductionOrderID,
                    CustomerID: vm.productionOrder.CustomerID,
                    Quantity: value.Quantity,
                    POrderQuantity:value.POrderQuantity,
                    SalesSectionID: value.SalesSectionID,
                    SalesSectionName: value.SalesSectionName,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    ProjectID: vm.productionOrder.ProjectID,
                    OfferDate: value.OfferDate,
                    ScheduleDate: value.ScheduleDate,
                    ReferenceTypeID: vm.productionOrder.ReferenceTypeID,
                    ReferenceID: vm.productionOrder.ReferenceID,
                    
                };


                productionOrderDescriptionResource.save(productionOrderInfo).$promise.then(
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Load Failed!");
                });
            })


        }

        //Get Single Record
        vm.Get = function (id) {
            productionOrderResource.get({ 'ID': id }).$promise.then(function (productionOrder) {
                vm.productionOrder = productionOrder;
                GetProductionOrderDescription(vm.productionOrder.ProductionOrderID)
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Get Single Record
        function GetSalesOrder(id) {
            salesOrderResource.get({ 'ID': id }).$promise.then(function (salesOrder) {
                vm.salesOrder = salesOrder;
                
                vm.GetProjectSetup(vm.salesOrder.ProjectID);

                GetSalesOrderDescription(vm.salesOrder.SalesOrderID);
               // CheckDetails();
                
                vm.ViewMode(1);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Get Single Record
        vm.GetProjectSetup = function (id) {
            projectSetupResource.get({ 'ID': id }).$promise.then(function (projectSetup) {
                vm.projectSetup = projectSetup;
                //vm.HasProjectSide = (vm.projectSetup.ProjectSideID == null ? false : true);
                //vm.GetProjectSide(vm.projectSetup.ProjectSideID);
                //toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

      //  GetSalesOrderDescription(1);
        function GetSalesOrderDescription(salesOrderID) {

            salesOrderDescriptionResource.query({ '$filter': 'SalesOrderID eq ' + salesOrderID }).$promise.then(function (data) {
                vm.SalesOrderDescription.salesOrderDesc = data;
                vm.productionOrderDescription.productionOrderDesc= data;
                toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        function GetProductionOrderDescription(productionOrderID) {

            productionOrderDescriptionResource.query({ '$filter': 'ProductionOrderID eq ' + productionOrderID }).$promise.then(function (data) {
                vm.productionOrderDescription.productionOrderDesc = data;
                
                toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

       vm.CheckDetails=function () {

           for (var item in vm.SalesOrderDescription.salesOrderDesc) {
                    if (vm.SalesOrderDescription.salesOrderDesc[item].ProductID > 0) {
                        vm.addItem(vm.SalesOrderDescription.salesOrderDesc[item]);
                    }

                }
        }
        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                productionOrderResource.update({ 'ID': vm.productionOrder.productionOrderID }, vm.productionOrder).$promise.then(function () {
                vm.productionOrders = null;
                vm.ViewMode(3);
                GetList();
                //toastr.success("Data Update Successful", "Form Update");
                }, function (error) {
                    // error handler
                    toastr.error("Data Update Failed!");
                });
                }
            else {
                toastr.error("Form is not valid");
            }
        }

        //Data Delete
        vm.Delete = function () {
            vm.productionOrder.$delete({ 'ID': vm.productionOrder.productionOrderID });
            productionOrderResource.delete({ 'ID': vm.productionOrder.productionOrderID }).$promise.then(function (data) {
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