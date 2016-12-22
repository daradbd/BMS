(function ()
{
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (purchaseBillresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseBillResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("purchaseBillCtrl", [ "purchaseDeliveryReceiveDescriptionResource", "purchaseDeliveryReceiveResource", "unitOfMeasureResource", "projectSetupResource", "purchaseOrderDescriptionResource", "purchaseBillDescriptionResource", "productResource", "collaboratorResource", "purchaseOrderResource", "purchaseBillResource", "$rootScope", "appAuth", purchaseBillCtrl]);
    function purchaseBillCtrl(purchaseDeliveryReceiveDescriptionResource, purchaseDeliveryReceiveResource, unitOfMeasureResource, projectSetupResource, purchaseOrderDescriptionResource, purchaseBillDescriptionResource, productResource, collaboratorResource, purchaseOrderResource, purchaseBillResource, $rootScope, appAuth)
    {
        var vm = this;
        vm.purchaseBills = [];
        vm.purchaseBill = {};
        vm.purchaseOrder = {};
        vm.purchaseOrders = [];
        vm.Suppliers = [];
        vm.products = [];
        vm.purchaseReceive = {};
        vm.GrandTotal = 0.00;
        appAuth.checkPermission();

        vm.PurchaseBillDescription = { PurchaseBillDesc: [{ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };

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

        vm.addItem = function ()
        {
            vm.PurchaseBillDescription.PurchaseBillDesc.unshift({ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.PushItem = function ()
        {
            vm.PurchaseBillDescription.PurchaseBillDesc.push({ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.removeItem = function (item)
        {
            vm.PurchaseBillDescription.PurchaseBillDesc.splice(vm.PurchaseBillDescription.PurchaseBillDesc.indexOf(item), 1);
        }

        vm.ViewMode = function (activeMode)
        {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
               // vm.purchaseBill = null;
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

        if ($rootScope.PReceiveID > 0)
        {
            GetPurchaseReceive($rootScope.PReceiveID);
            $rootScope.PReceiveID = 0;
        }

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }


        vm.updateItem = function (item)
        {
            item.Description = item.cmbProductID.ProductName;
            //item.ProductID = item.cmbProductID.ProductID;
            item.ProductID = item.cmbProductID.ProductID;
            item.UnitPrice = item.cmbProductID.SalePrice;
        }

        vm.sopen = function (item, $event)
        {
            $event.preventDefault();
            $event.stopPropagation();

            item.sopened = !item.sopened;

        }

        vm.BillSubTotal = function ()
        {
            var total = 0.00;
            angular.forEach(vm.PurchaseBillDescription.PurchaseBillDesc, function (item, key)
            {
                total += (item.Quantity * item.UnitPrice);
            });
            vm.GrandTotal = total;
            return total;
        }

        var DispayButton = function ()
        {

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
        GetProductList();
        //Get All Data List
        function GetProductList()
        {
            productResource.query({ '$filter': 'IsRawmaterial eq true' }).$promise.then(function (data)
            {
                vm.products = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetSupplierList();
        //Get All Data List
        function GetSupplierList()
        {
            collaboratorResource.query({ '$filter': 'IsSupplier eq true' }).$promise.then(function (data)
            {
                vm.Suppliers = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetProjectList();
        //Get All Data List
        function GetProjectList()
        {
            projectSetupResource.query().$promise.then(function (data)
            {
                vm.Projects = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList()
        {
            purchaseBillResource.query().$promise.then(function (data)
            {
                vm.purchaseBills = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save purchaseBill
        vm.Save = function (isValid)
        {
            if (isValid)
            {

                vm.purchaseBill.GrandTotal = vm.GrandTotal;
                vm.purchaseBill.SupplierID = vm.cmbSupplier.CollaboratorID;
                vm.purchaseBill.ProjectID = vm.cmbProject.ProjectID;
                vm.purchaseBill.IsApproved = false;

                purchaseBillResource.save(vm.purchaseBill).$promise.then(
                    function (data, responseHeaders)
                    {
                        vm.purchaseBill = data;
                        vm.SavePurchaseBill();
                       // GetList();
                        vm.purchaseBill = null;
                        vm.ViewMode(2);
                        toastr.success("Save Successful");
                    }, function (error) {
                        // error handler
                        toastr.error("Data Save Failed!");
                    });
            }
            else
            {

                toastr.error("Form is not valid");
            }


        }

        //Save Quotation Description
        vm.SavePurchaseBill = function ()
        {

            angular.forEach(vm.PurchaseBillDescription.PurchaseBillDesc, function (value, key)
            {
                // var TDate = new Date(vm.voucherList.TranDate);

                var PurchaseBillInfo = {
                    PurchaseBillDescriptionID: value.PurchaseBillDescriptionID,
                    PurchaseOrderID: vm.purchaseBill.PurchaseOrderID,
                    PurchaseBillID: vm.purchaseBill.PurchaseBillID,
                    SupplierID: vm.purchaseBill.SupplierID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    MOUID: value.MOUID,
                    Quantity: value.Quantity,
                    UnitPrice: value.UnitPrice,
                   // Taxes: value.Taxes,
                    //ScheduleDate: value.ScheduleDate,
                    //Discount: value.Discount,
                };
                //alert(angular.toJson(VoucherInfo));
                //alert(value.COAID);
                //vm.voucherList.COAID = value.COAID;
                //vm.voucherList.Amount = value.Amount;
                //vm.voucherList.DrCr = value.DrCr;

                purchaseBillDescriptionResource.save(PurchaseBillInfo).$promise.then(
                function (data, responseHeaders)
                {

                }, function (error) {
                    // error handler
                    toastr.error("Data Save Failed!");
                });
            })


        }

        //Get Single Record
        vm.Get = function (id)
        {
            purchaseBillResource.get({ 'ID': id }).$promise.then(function (purchaseBill)
            {
                vm.purchaseBill = purchaseBill;
                vm.cmbSupplier = vm.purchaseBill.Collaborator;
                vm.cmbProject = vm.purchaseBill.ProjectSetup;
                vm.GetPurchaseBillDescription(vm.purchaseBill.PurchaseBillID);
                vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Get Single Record
        function GetPurchaseReceive(id)
        {
            purchaseDeliveryReceiveResource.get({ 'ID': id }).$promise.then(function (purchaseReceive)
            {
                vm.purchaseReceive = purchaseReceive;
               // vm.cmbSupplier = { CollaboratorID: vm.purchaseOrder.SupplierID };
                vm.cmbProject = { ProjectID: vm.purchaseReceive.ProjectID };
                vm.cmbSupplier = vm.purchaseReceive.Collaborator;
                vm.cmbProject = vm.purchaseReceive.ProjectSetup;
                vm.purchaseBill.PurchaseDeliveryReceiveID = vm.purchaseReceive.PurchaseDeliveryReceiveID,
                vm.purchaseBill.PurchaseOrderID = vm.purchaseReceive.PurchaseOrderID,
                //    vm.purchaseBill =
                //    vm.purchaseBill =
                //    vm.purchaseBill=
                vm.GetPurchaseReceiveDescription(vm.purchaseReceive.PurchaseDeliveryReceiveID);
                vm.ViewMode(1);


            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetPurchaseReceiveDescription = function (PurchaseDeliveryReceiveID) {

            purchaseDeliveryReceiveDescriptionResource.query({ '$filter': 'PurchaseDeliveryReceiveID eq ' + PurchaseDeliveryReceiveID }).$promise.then(function (data) {
                vm.PurchaseBillDescription.PurchaseBillDesc = data;
                // toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        //Get Single Record
        function GetPurchaseOrder(id)
        {
            purchaseOrderResource.get({ 'ID': id }).$promise.then(function (purchaseOrder)
            {
                vm.purchaseOrder = purchaseOrder;
               // vm.cmbSupplier = { CollaboratorID: vm.purchaseOrder.SupplierID };
                vm.cmbProject = { ProjectID: vm.purchaseOrder.ProjectID };
                vm.cmbSupplier = vm.purchaseOrder.Collaborator;
                vm.cmbProject = vm.purchaseOrder.ProjectSetup;
                vm.purchaseBill.PurchaseRequisationID = vm.purchaseOrder.PurchaseRequisationID,
                vm.purchaseBill.PurchaseOrderID = vm.purchaseOrder.PurchaseOrderID,
                //    vm.purchaseBill =
                //    vm.purchaseBill =
                //    vm.purchaseBill=
                vm.GetPurchaseOrderDescription(vm.purchaseOrder.PurchaseOrderID);
                vm.ViewMode(1);


            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        vm.GetPurchaseBillDescription = function (purchaseBillID)
        {

            purchaseBillDescriptionResource.query({ '$filter': 'PurchaseBillID eq ' + purchaseBillID }).$promise.then(function (data)
            {
                vm.PurchaseBillDescription.PurchaseBillDesc = data;
                //toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        vm.GetPurchaseOrderDescription = function (purchaseOrderID)
        {

            purchaseOrderDescriptionResource.query({ '$filter': 'PurchaseOrderID eq ' + purchaseOrderID }).$promise.then(function (data)
            {
                vm.PurchaseBillDescription.PurchaseBillDesc = data;
               // toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        //Data Update
        vm.Update = function (isValid)
        {
            if (isValid)
            {
                purchaseBillResource.update({ 'ID': vm.purchaseBill.PurchaseBillID }, vm.purchaseBill).$promise.then(function () {
                vm.SavePurchaseBill();
                vm.purchaseBills = null;
                vm.ViewMode(2);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
                }, function (error) {
                    // error handler
                    toastr.error("Data Update Failed!");
                });
                }
            else
            {
                toastr.error("Form is not valid");
            }
        }

        //Data Delete
        vm.Delete = function ()
        {
            //vm.purchaseBill.$delete({ 'ID': vm.purchaseBill.PurchaseBillID });
            purchaseBillResource.delete({ 'ID': vm.purchaseBill.PurchaseBillID }).$promise.then(function (data) {
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