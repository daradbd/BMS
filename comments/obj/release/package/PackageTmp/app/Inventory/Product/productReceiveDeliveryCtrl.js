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

        vm.RemainQuantity = function (item) {
            return item.Quantity - ((item.DeliveredQuantity == null ? 0 : item.DeliveredQuantity) + ((angular.isUndefined(item.RDQuantity) || item.RDQuantity === null) == true ? 0 : item.RDQuantity));
        }

        vm.CheckMax = function (item) {
            item.RDQuantity=(item.Quantity - item.DeliveredQuantity) < item.RDQuantity ? (item.Quantity - item.DeliveredQuantity) : item.RDQuantity;
        }


        GetList();

        //Get All Data List
        function GetList() {
            productReceiveDeliveryResource.query(function (data) {
                vm.productReceiveDeliverys = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save productReceiveDelivery
        vm.Save = function (isValid) {
            if (isValid) {
                productReceiveDeliveryResource.save(vm.productReceiveDelivery,
                    function (data, responseHeaders) {
                        GetList();
                        vm.productReceiveDelivery = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            productReceiveDeliveryResource.get({ 'ID': id }, function (productReceiveDelivery) {
                vm.productReceiveDelivery = productReceiveDelivery;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        function GetSalesOrder(id) {
            salesOrderResource.get({ 'ID': id }, function (salesOrder) {
                vm.productReceiveDelivery.CollaboratorID = salesOrder.CustomerID;
                vm.productReceiveDelivery.CollaboratorName = salesOrder.Collaborator.Name;
                vm.productReceiveDelivery.ReferenceID = salesOrder.SalesOrderID;
                vm.productReceiveDelivery.ReferenceTypeID = 2;
                vm.GetSalesOrderDescription(salesOrder.SalesOrderID);

                vm.ViewMode(1);
                toastr.success("Data Load Successful", "Form Load");
            });
        }

        vm.GetSalesOrderDescription = function (salesOrderID) {

            salesOrderDescriptionResource.query({ '$filter': 'SalesOrderID eq ' + salesOrderID }, function (data) {
                vm.ReceiveDeliveryDescription.ReceiveDeliveryDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            })
        }

        function GetPurchaseRequisition(id) {
            purchaseRequisitionResource.get({ 'ID': id }, function (purchaseRequisition) {
                vm.productReceiveDelivery.CollaboratorID = purchaseRequisition.EmployeeID;
                vm.productReceiveDelivery.CollaboratorName = purchaseRequisition.Collaborator.Name;
                vm.productReceiveDelivery.ReferenceID = purchaseRequisition.PurchaseRequisitionID;
                vm.productReceiveDelivery.ReferenceTypeID = 3;
                vm.GetPurchaseRequisitionDescription(purchaseRequisition.PurchaseRequisitionID);

                vm.ViewMode(1);
                toastr.success("Data Load Successful", "Form Load");
            });
        }

        vm.GetPurchaseRequisitionDescription = function (purchaseRequisitionID) {

            purchaseRequisitionDescriptionResource.query({ '$filter': 'PurchaseRequisitionID eq ' + purchaseRequisitionID }, function (data) {
                vm.ReceiveDeliveryDescription.ReceiveDeliveryDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                productReceiveDeliveryResource.update({ 'ID': vm.productReceiveDelivery.ProductReceiveDeliveryID }, vm.productReceiveDelivery);
                vm.productReceiveDeliverys = null;
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
            vm.productReceiveDelivery.$delete({ 'ID': vm.productReceiveDelivery.ProductReceiveDeliveryID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());