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
        .controller("salesDeliveryCtrl", ["salesDeliveryDescriptionResource", "salesOrderDescriptionResource", "$rootScope", "salesOrderResource", "salesDeliveryResource", salesDeliveryCtrl]);

    function salesDeliveryCtrl(salesDeliveryDescriptionResource, salesOrderDescriptionResource, $rootScope, salesOrderResource, salesDeliveryResource) {
        var vm = this;
        vm.salesDeliverys = [];
        vm.salesDelivery = {};

        vm.SalesDeliveryDescription = { salesDeliveryDesc: [{ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };
        
        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = false
        vm.EditView = false;
        
        GetSalesOrder($rootScope.SOrderID);
        $rootScope.SOrderID = 0;
        // Action Button Control Variable //
        vm.SaveButton = false;
        vm.EditButton = false;
        vm.UpdateButton = false;
        vm.DeleteButton = false;



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
        vm.RemainQuantity = function (item)
        {
            return item.Quantity - ((item.DeliveredQuantity == null ? 0 : item.DeliveredQuantity) + ((angular.isUndefined(item.RDQuantity) || item.RDQuantity === null) == true ? 0 : item.RDQuantity));
        }

        vm.CheckMax = function (item)
        {
            item.RDQuantity = (item.Quantity - item.DeliveredQuantity) < item.RDQuantity ? (item.Quantity - item.DeliveredQuantity) : item.RDQuantity;
        }

        GetList();

        //Get All Data List
        function GetList() {
            salesDeliveryResource.query(function (data) {
                vm.salesDeliverys = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save salesDelivery
        vm.Save = function (isValid) {
            if (isValid) {
                salesDeliveryResource.save(vm.salesDelivery,
                    function (data, responseHeaders) {
                        vm.SaveDelivery();
                        GetList();
                        vm.salesDelivery = null;
                        toastr.success("Save Successful");
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

                salesDeliveryDescriptionResource.save(salesDeliveryInfo,
                function (data, responseHeaders) {

                });
            })


        }

        //Get Single Record
        vm.Get = function (id) {
            salesDeliveryResource.get({ 'ID': id }, function (salesDelivery) {
                vm.salesDelivery = salesDelivery;
                vm.ViewMode(1);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        function GetSalesOrder (id) {
            salesOrderResource.get({ 'ID': id }, function (salesOrder) {
                vm.salesOrder = salesOrder;
                vm.salesDelivery.SalesOrderID = vm.salesOrder.SalesOrderID;
                vm.salesDelivery.ProjectID = vm.salesOrder.ProjectID;
                vm.salesDelivery.CustomerID = vm.salesOrder.CustomerID;
                vm.salesDelivery.CustomerID = vm.salesOrder.CustomerID;
                vm.salesDelivery.CollaboratorName = vm.salesOrder.Collaborator.Name;
                vm.GetSalesOrderDescription(vm.salesOrder.SalesOrderID);
                
                vm.ViewMode(1);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        vm.GetSalesOrderDescription = function (salesOrderID) {

            salesOrderDescriptionResource.query({ '$filter': 'SalesOrderID eq ' + salesOrderID }, function (data) {
                vm.SalesDeliveryDescription.salesDeliveryDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            })
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                salesDeliveryResource.update({ 'ID': vm.salesDelivery.salesDeliveryID }, vm.salesDelivery);
                vm.salesDeliverys = null;
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
            vm.salesDelivery.$delete({ 'ID': vm.salesDelivery.salesDeliveryID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());