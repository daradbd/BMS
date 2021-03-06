﻿(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (maintainPurchaseQuotationresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: maintainPurchaseQuotationResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("maintainPurchaseQuotationCtrl", ["purchaseOrderResource", "projectSetupResource", "requestForQuotationDescriptionResource", "maintainPurchaseQuotationDescriptionResource", "productResource", "collaboratorResource", "maintainPurchaseQuotationResource", "appAuth", maintainPurchaseQuotationCtrl]);
    function maintainPurchaseQuotationCtrl(purchaseOrderResource, projectSetupResource, requestForQuotationDescriptionResource, maintainPurchaseQuotationDescriptionResource, productResource, collaboratorResource, maintainPurchaseQuotationResource, appAuth) {
        var vm = this;
        vm.maintainPurchaseQuotations = [];
        vm.Suppliers = [];
        vm.products = [];
        appAuth.checkPermission();

        vm.MaintainPurchaseQuotationDescription = { MaintainPurchaseQuotationDesc: [{ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };

        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = false;
        vm.EditView = false;

        // Action Button Control Variable //
        vm.SaveButton = false;
        vm.EditButton = false;
        vm.UpdateButton = false;
        vm.DeleteButton = false;
        vm.CancelButton = false;


        vm.addItem = function () {
            vm.MaintainPurchaseQuotationDescription.MaintainPurchaseQuotationDesc.unshift({ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.PushItem = function () {
            vm.MaintainPurchaseQuotationDescription.MaintainPurchaseQuotationDesc.push({ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.removeItem = function (item) {
            vm.MaintainPurchaseQuotationDescription.MaintainPurchaseQuotationDesc.splice(vm.SalesQuotationDescription.salesQuotationDesc.indexOf(item), 1);
        }
        vm.updateItem = function (item) {
            item.Description = item.cmbProductID.ProductName;
            //item.ProductID = item.cmbProductID.ProductID;
            item.ProductID = item.cmbProductID.ProductID;
            item.UnitPrice = item.cmbProductID.SalePrice;
        }

        vm.sopen = function (item, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            item.sopened = !item.sopened;

        }

        vm.colOpen = function (item) {
            item.isCollapsed = !item.isCollapsed;
        }

        vm.QuotationSubTotal = function () {
            var total = 0.00;
            var TotalDiscount = 0.00;

            angular.forEach(vm.MaintainPurchaseQuotationDescription.MaintainPurchaseQuotationDesc, function (item, key) {
               
                    //var DP = item.Discount.split("%");
                    //TotalDiscount += ((item.Quantity * item.UnitPrice) * DP[0] * 0.01);
                
                
                total += (item.Quantity * item.UnitPrice);
            });
            ///vm.TotalDiscount = TotalDiscount;
            return total;
        }

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.maintainPurchaseQuotation = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = true;
                vm.SelectForOrderButton = false;
            }
            if (activeMode == 2) //List View Mode
            {
                vm.FromView = false;
                vm.ListView = true;
                vm.DetailsView = false;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = false;
                vm.CancelButton = true;
                vm.SelectForOrderButton = false;
            }

            if (activeMode == 3)//Details View Mode
            {
                vm.FromView = false;
                vm.ListView = false;
                vm.DetailsView = true;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = true;
                vm.UpdateButton = false;
                vm.DeleteButton = true;
                vm.CancelButton = true;
                vm.SelectForOrderButton = (vm.maintainPurchaseQuotation.ProcesStatusID == 8 ? true : false);
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
                vm.CancelButton = true;
                vm.SelectForOrderButton = (vm.maintainPurchaseQuotation.ProcesStatusID == 8 ? true : false);
            }
        }

        var DispayButton = function () {

        }

        GetProductList();
        //Get All Data List
        function GetProductList() {
            productResource.query().$promise.then(function (data) {
                vm.products = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetSupplierList();
        //Get All Data List
        function GetSupplierList() {
            collaboratorResource.query({ '$filter': 'IsSupplier eq true' }).$promise.then(function (data) {
                vm.Suppliers = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetProjectList();
        //Get All Data List
        function GetProjectList() {
            projectSetupResource.query().$promise.then(function (data) {
                vm.Projects = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            maintainPurchaseQuotationResource.query().$promise.then(function (data) {
                vm.maintainPurchaseQuotations = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save maintainPurchaseQuotation
        vm.Save = function (isValid) {
            if (isValid) {
                maintainPurchaseQuotationResource.save(vm.maintainPurchaseQuotation).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.maintainPurchaseQuotation = data;
                        vm.SaveMaintainPurchaseQuotation();
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

        //Save Quotation Description
        vm.SaveMaintainPurchaseQuotation = function () {

            angular.forEach(vm.MaintainPurchaseQuotationDescription.MaintainPurchaseQuotationDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var MaintainPurchaseQuotationInfo = {
                    MaintainPurchaseQuotationDescriptionID: value.MaintainPurchaseQuotationDescriptionID,
                    MaintainPurchaseQuotationID: vm.maintainPurchaseQuotation.MaintainPurchaseQuotationID,
                    SupplierID: vm.maintainPurchaseQuotation.SupplierID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    Quantity: value.Quantity,
                    UnitPrice: value.UnitPrice,
                    Taxes: value.Taxes,
                    ScheduleDate: value.ScheduleDate,
                    Discount: value.Discount,
                };
                //alert(angular.toJson(VoucherInfo));
                //alert(value.COAID);
                //vm.voucherList.COAID = value.COAID;
                //vm.voucherList.Amount = value.Amount;
                //vm.voucherList.DrCr = value.DrCr;

                maintainPurchaseQuotationDescriptionResource.save(MaintainPurchaseQuotationInfo).$promise.then(
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Load Failed!");
                });
            })


        }

        vm.SelectForOrder = function () {

            if (vm.maintainPurchaseQuotation != null) {

                var purchaseOrder = {
                    SupplierID: vm.maintainPurchaseQuotation.SupplierID,
                    MaintainPurchaseQuotationID: vm.maintainPurchaseQuotation.MaintainPurchaseQuotationID,
                    ProjectID: vm.maintainPurchaseQuotation.ProjectID,
                    ProcesStatusID: 10,
                };
                purchaseOrderResource.save(purchaseOrder).$promise.then(
                        function (data, responseHeaders) {
                            vm.purchaseOrder = data;
                            vm.maintainPurchaseQuotation.ProcesStatusID = 9;
                            vm.Update(true);
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
            maintainPurchaseQuotationResource.get({ 'ID': id }).$promise.then(function (maintainPurchaseQuotation) {
                vm.maintainPurchaseQuotation = maintainPurchaseQuotation;

                vm.cmbSupplier = { CollaboratorID: vm.maintainPurchaseQuotation.SupplierID };
                vm.cmbProject = { ProjectID: vm.maintainPurchaseQuotation.ProjectID };

                if (vm.maintainPurchaseQuotation.ProcesStatusID == 7) {
                    vm.GetRequestForQuotationDescription(vm.maintainPurchaseQuotation.RequestForQuotationID);
                }
                else {
                    vm.GetMaintainPurchaseQuotationDescription(vm.maintainPurchaseQuotation.MaintainPurchaseQuotationID);
                }
                vm.ViewMode(3);
               // toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        
        
        vm.GetMaintainPurchaseQuotationDescription = function (maintainPurchaseQuotationID) {

            maintainPurchaseQuotationDescriptionResource.query({ '$filter': 'MaintainPurchaseQuotationID eq ' + maintainPurchaseQuotationID }).$promise.then(function (data) {
                vm.MaintainPurchaseQuotationDescription.MaintainPurchaseQuotationDesc = data;
                //toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        vm.GetRequestForQuotationDescription = function (requestForQuotationID) {

            requestForQuotationDescriptionResource.query({ '$filter': 'RequestForQuotationID eq ' + requestForQuotationID }).$promise.then(function (data) {
                vm.MaintainPurchaseQuotationDescription.MaintainPurchaseQuotationDesc = data;
               // toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                if (vm.maintainPurchaseQuotation.ProcesStatusID == 7) {
                    vm.maintainPurchaseQuotation.ProcesStatusID = 8;
                }
                maintainPurchaseQuotationResource.update({ 'ID': vm.maintainPurchaseQuotation.MaintainPurchaseQuotationID }, vm.maintainPurchaseQuotation).$promise.then(function () {
                vm.SaveMaintainPurchaseQuotation();
                vm.maintainPurchaseQuotations = null;
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
            //vm.maintainPurchaseQuotation.$delete({ 'ID': vm.maintainPurchaseQuotation.MaintainPurchaseQuotationID });
            maintainPurchaseQuotationResource.delete({ 'ID': vm.maintainPurchaseQuotation.MaintainPurchaseQuotationID }).$promise.then(function (data) {
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