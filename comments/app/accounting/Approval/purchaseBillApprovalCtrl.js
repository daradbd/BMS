(function () {
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
        .controller("purchaseBillApprovalCtrl", ["purchaseBillDescriptionResource", "purchaseBillResource", purchaseBillApprovalCtrl]);
    function purchaseBillApprovalCtrl(purchaseBillDescriptionResource, purchaseBillResource) {
        var vm = this;
        vm.purchaseBills = [];
        vm.PurchaseBillDescription = { PurchaseBillDesc: [] };
        vm.GrandTotalApproved = 0.00;

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



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.purchaseBill = null;
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
                vm.EditButton = false;
                vm.UpdateButton = true;
                vm.DeleteButton = false;
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
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = true;
            }
        }

        var DispayButton = function () {

        }

        vm.setQuantity = function (item) {
            item.ApproveQuantity = item.Quantity;
        }

        vm.setPrice = function (item) {
            item.ApprovePrice=item.UnitPrice;
        }

        vm.BillSubTotal = function () {
            var total = 0.00;
            var GrandTotalApproved = 0.00;
            angular.forEach(vm.PurchaseBillDescription.PurchaseBillDesc, function (item, key) {
                total += (item.Quantity * item.UnitPrice);
                GrandTotalApproved += (item.ApproveQuantity * item.ApprovePrice);
            });
            vm.GrandTotal = total;
            vm.GrandTotalApproved = GrandTotalApproved;
            return total;
        }

        GetList();

        //Get All Data List
        function GetList() {
            purchaseBillResource.query().$promise.then(function (data) {
                vm.purchaseBills = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save purchaseBill
        //vm.Save = function (isValid) {
        //    if (isValid) {
        //        purchaseBillResource.save(vm.purchaseBill,
        //            function (data, responseHeaders) {
        //                GetList();
        //                vm.purchaseBill = null;
        //                toastr.success("Save Successful");
        //            });
        //    }
        //    else {

        //        toastr.error("Form is not valid");
        //    }


        //}

        //Get Single Record
        vm.Get = function (id) {
            purchaseBillResource.get({ 'ID': id }).$promise.then(function (purchaseBill) {
                vm.purchaseBill = purchaseBill;
                vm.GetPurchaseBillDescription(vm.purchaseBill.PurchaseBillID);
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        vm.GetPurchaseBillDescription = function (purchaseBillID) {

            purchaseBillDescriptionResource.query({ '$filter': 'PurchaseBillID eq ' + purchaseBillID }).$promise.then(function (data) {
                vm.PurchaseBillDescription.PurchaseBillDesc = data;
                //toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        vm.Update = function (isValid) {
            if (isValid) {
                vm.purchaseBill.IsApproved = true;
                vm.purchaseBill.GrandTotalApproved = vm.GrandTotalApproved;
                purchaseBillResource.update({ 'ID': vm.purchaseBill.PurchaseBillID }, vm.purchaseBill).$promise.then(function () {
                    vm.SavePurchaseBill();
                    vm.purchaseBills = null;
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

        //Save Quotation Description
        vm.SavePurchaseBill = function () {

            angular.forEach(vm.PurchaseBillDescription.PurchaseBillDesc, function (value, key) {
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
                    ApproveQuantity: value.ApproveQuantity,
                    ApprovePrice: value.ApprovePrice
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
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Save Failed!");
                });
            })


        }
        //Data Delete
        vm.Delete = function () {
            //vm.purchaseBill.$delete({ 'ID': vm.purchaseBill.PurchaseBillID });
            purchaseBillResource.delete({ 'ID': vm.purchaseBill.PurchaseBillID }).$promise.then(function (data) {
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