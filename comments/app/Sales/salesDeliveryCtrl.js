(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (salesDeliveryresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesDeliveryResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("salesDeliveryCtrl", ["salesDeliveryCategoryResource", "unitOfMeasureResource", "salesDeliveryDescriptionResource", "salesOrderDescriptionResource", "$rootScope", "salesOrderResource", "salesDeliveryResource", "appAuth", salesDeliveryCtrl]);

    function salesDeliveryCtrl(salesDeliveryCategoryResource, unitOfMeasureResource, salesDeliveryDescriptionResource, salesOrderDescriptionResource, $rootScope, salesOrderResource, salesDeliveryResource, appAuth) {
        var vm = this;
        vm.salesDeliverys = [];
        vm.salesDelivery = {};
        appAuth.checkPermission();

        vm.SalesDeliveryDescription = { salesDeliveryDesc: [{ ProductID: 0, Description: "", MOUID: 0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };
        
        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = false
        vm.EditView = false;
        if ($rootScope.SOrderID > 0)
        {
            GetSalesOrder($rootScope.SOrderID);
            $rootScope.SOrderID = 0;
        }

        // Action Button Control Variable //
        vm.SaveButton = false;
        vm.EditButton = false;
        vm.UpdateButton = false;
        vm.DeleteButton = false;
        vm.CancelButton = false;



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
               // vm.salesDelivery = null;
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

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }

        var DispayButton = function () {

        }
        vm.RemainQuantity = function (item)
        {
            return item.Quantity - ((item.DeliveredQuantity == null ? 0 : item.DeliveredQuantity) + ((angular.isUndefined(item.RDQuantity) || item.RDQuantity === null) == true ? 0 : item.RDQuantity));
        }

        vm.CheckMax = function (item)
        {
            item.RDQuantity = (item.Quantity - item.DeliveredQuantity) < item.RDQuantity ? (item.Quantity - item.DeliveredQuantity) : item.RDQuantity;
        }

        GetSalesDeliveryCateagorys();
        function GetSalesDeliveryCateagorys() {
            salesDeliveryCategoryResource.query().$promise.then(function (data) {
                vm.salesDeliveryCategorys = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        GetUnitOfMeasures();
        function GetUnitOfMeasures() {
            unitOfMeasureResource.query().$promise.then(function (data) {
                vm.UnitOfMeasures = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            salesDeliveryResource.query().$promise.then(function (data) {
                vm.salesDeliverys = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save salesDelivery
        vm.Save = function (isValid) {
            if (isValid) {
                salesDeliveryResource.save(vm.salesDelivery).$promise.then(
                    function (data, responseHeaders) {
                        vm.salesDelivery = data;
                        vm.SaveDelivery();
                        GetList();
                        //vm.salesDelivery = null;
                        vm.ViewMode(2);
                        toastr.success("Save Successful");
                    }, function (error) {
                        // error handler
                        toastr.error("Data Save Failed!");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Save Order Description
        vm.SaveDelivery = function () {


            angular.forEach(vm.SalesDeliveryDescription.salesDeliveryDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var salesDeliveryInfo = {
                    SalesDeliveryDescriptionID: value.SalesDeliveryDescriptionID,
                    SalesOrderID: vm.salesDelivery.SalesOrderID,
                    SalesDeliveryID: vm.salesDelivery.SalesDeliveryID,
                    CustomerID: vm.salesDelivery.CustomerID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    Quantity: value.Quantity,
                    UOMID: value.UOMID,
                    RDQuantity: value.RDQuantity,
                    //Taxes: value.Taxes,
                    //ScheduleDate: value.ScheduleDate,
                    SalesSectionID: value.SalesSectionID,
                    SalesSectionName: value.SalesSectionName,
                    //Discount: value.Discount,
                };
                //alert(angular.toJson(VoucherInfo));
                //alert(value.COAID);
                //vm.voucherList.COAID = value.COAID;
                //vm.voucherList.Amount = value.Amount;
                //vm.voucherList.DrCr = value.DrCr;

                salesDeliveryDescriptionResource.save(salesDeliveryInfo).$promise.then(
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Save Failed!");
                });
            })


        }

        //Get Single Record
        vm.Get = function (id) {
            salesDeliveryResource.get({ 'ID': id }).$promise.then(function (salesDelivery) {
                vm.salesDelivery = salesDelivery;

                vm.salesDelivery.CollaboratorName = vm.salesDelivery.Collaborator.Name;
                vm.GetSalesOrderDesc(vm.salesDelivery.SalesDeliveryID);
                vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        function GetSalesOrder (id) {
            salesOrderResource.get({ 'ID': id }).$promise.then(function (salesOrder) {
                vm.salesOrder = salesOrder;
                vm.salesDelivery.Collaborator = vm.salesOrder.Collaborator;
                vm.salesDelivery.SalesOrderID = vm.salesOrder.SalesOrderID;
                vm.salesDelivery.ProjectID = vm.salesOrder.ProjectID;
                vm.salesDelivery.CustomerID = vm.salesOrder.CustomerID;
                vm.salesDelivery.CustomerID = vm.salesOrder.CustomerID;
                vm.salesDelivery.CollaboratorName = vm.salesOrder.Collaborator.Name;
                vm.GetSalesOrderDescription(vm.salesOrder.SalesOrderID);
                
                vm.ViewMode(1);
               // toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        vm.GetSalesOrderDescription = function (salesOrderID) {

            salesOrderDescriptionResource.query({ '$filter': 'SalesOrderID eq ' + salesOrderID }).$promise.then(function (data) {
                vm.SalesDeliveryDescription.salesDeliveryDesc = data;
               // toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        vm.GetSalesOrderDesc = function (SalesDeliveryID) {

            salesDeliveryDescriptionResource.query({ '$filter': 'SalesDeliveryID eq ' + SalesDeliveryID }).$promise.then(function (data) {
                vm.SalesDeliveryDescription.salesDeliveryDesc = data;
               // toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                salesDeliveryResource.update({ 'ID': vm.salesDelivery.SalesDeliveryID }, vm.salesDelivery).$promise.then(function () {
                vm.SaveDelivery();
                vm.salesDeliverys = null;
                vm.ViewMode(2);
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


        //Data Delete
        vm.Delete = function () {
            //vm.salesDelivery.$delete({ 'ID': vm.salesDelivery.salesDeliveryID });
            salesDeliveryResource.delete({ 'ID': vm.salesDelivery.salesDeliveryID }).$promise.then(function (data) {
                // success handler
                vm.ViewMode(2);
                toastr.success("Data Delete Successfully!");
                GetList();
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
            });
        }

    }

}());