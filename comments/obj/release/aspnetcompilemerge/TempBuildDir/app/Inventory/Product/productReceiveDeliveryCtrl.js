(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (productReceiveDeliveryresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productReceiveDeliveryResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("productReceiveDeliveryCtrl", ["purchaseRequisitionDescriptionResource", "purchaseRequisitionResource", "salesOrderDescriptionResource", "$rootScope", "salesOrderResource", "productReceiveDeliveryResource", productReceiveDeliveryCtrl]);
    function productReceiveDeliveryCtrl(purchaseRequisitionDescriptionResource, purchaseRequisitionResource, salesOrderDescriptionResource, $rootScope, salesOrderResource, productReceiveDeliveryResource) {
        var vm = this;
        vm.productReceiveDeliverys = [];
        vm.productReceiveDelivery = {};

        vm.ReceiveDeliveryDescription = { ReceiveDeliveryDesc: [] };

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

        if ($rootScope.SOrderID > 0)
        {
            GetSalesOrder($rootScope.SOrderID);
            $rootScope.SOrderID = 0;
        }
        if ($rootScope.RequisitionID > 0)
        {
            GetPurchaseRequisition($rootScope.RequisitionID)
            $rootScope.RequisitionID = 0;
        }
        



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
               // vm.productReceiveDelivery = null;
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

        vm.RemainQuantity = function (item) {
            return item.Quantity - ((item.DeliveredQuantity == null ? 0 : item.DeliveredQuantity) + ((angular.isUndefined(item.RDQuantity) || item.RDQuantity === null) == true ? 0 : item.RDQuantity));
        }

        vm.CheckMax = function (item) {
            item.RDQuantity=(item.Quantity - item.DeliveredQuantity) < item.RDQuantity ? (item.Quantity - item.DeliveredQuantity) : item.RDQuantity;
        }


        GetList();

        //Get All Data List
        function GetList() {
            productReceiveDeliveryResource.query().$promise.then(function (data) {
                vm.productReceiveDeliverys = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save productReceiveDelivery
        vm.Save = function (isValid) {
            if (isValid) {
                productReceiveDeliveryResource.save(vm.productReceiveDelivery).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.productReceiveDelivery = null;
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

        //Get Single Record
        vm.Get = function (id) {
            productReceiveDeliveryResource.get({ 'ID': id }).$promise.then(function (productReceiveDelivery) {
                vm.productReceiveDelivery = productReceiveDelivery;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        function GetSalesOrder(id) {
            salesOrderResource.get({ 'ID': id }).$promise.then(function (salesOrder) {
                vm.productReceiveDelivery.CollaboratorID = salesOrder.CustomerID;
                vm.productReceiveDelivery.CollaboratorName = salesOrder.Collaborator.Name;
                vm.productReceiveDelivery.ReferenceID = salesOrder.SalesOrderID;
                vm.productReceiveDelivery.ReferenceTypeID = 2;
                vm.GetSalesOrderDescription(salesOrder.SalesOrderID);

                vm.ViewMode(1);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetSalesOrderDescription = function (salesOrderID) {

            salesOrderDescriptionResource.query({ '$filter': 'SalesOrderID eq ' + salesOrderID }).$promise.then(function (data) {
                vm.ReceiveDeliveryDescription.ReceiveDeliveryDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        function GetPurchaseRequisition(id) {
            purchaseRequisitionResource.get({ 'ID': id }).$promise.then(function (purchaseRequisition) {
                vm.productReceiveDelivery.CollaboratorID = purchaseRequisition.EmployeeID;
                vm.productReceiveDelivery.CollaboratorName = purchaseRequisition.Collaborator.Name;
                vm.productReceiveDelivery.ReferenceID = purchaseRequisition.PurchaseRequisitionID;
                vm.productReceiveDelivery.ReferenceTypeID = 3;
                vm.GetPurchaseRequisitionDescription(purchaseRequisition.PurchaseRequisitionID);

                vm.ViewMode(1);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetPurchaseRequisitionDescription = function (purchaseRequisitionID) {

            purchaseRequisitionDescriptionResource.query({ '$filter': 'PurchaseRequisitionID eq ' + purchaseRequisitionID }).$promise.then(function (data) {
                vm.ReceiveDeliveryDescription.ReceiveDeliveryDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                productReceiveDeliveryResource.update({ 'ID': vm.productReceiveDelivery.ProductReceiveDeliveryID }, vm.productReceiveDelivery).$promise.then(function () {
                vm.productReceiveDeliverys = null;
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

        //Data Delete
        vm.Delete = function () {
           // vm.productReceiveDelivery.$delete({ 'ID': vm.productReceiveDelivery.ProductReceiveDeliveryID });
            productReceiveDeliveryResource.delete({ 'ID': vm.productReceiveDelivery.ProductReceiveDeliveryID }).$promise.then(function (data) {
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