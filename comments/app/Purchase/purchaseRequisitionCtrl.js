(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (purchaseRequisitionresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseRequisitionResource
     *  @date: 29/4/2015
     */

    angular
        .module("companyManagement")
        .controller("purchaseRequisitionCtrl", ["unitOfMeasureResource", "companyBranchResource", "requestForQuotationResource", "purchaseRequisitionDescriptionResource", "productResource", "projectSetupResource", "collaboratorResource", "purchaseRequisitionResource", "appAuth", purchaseRequisitionCtrl]);
    function purchaseRequisitionCtrl(unitOfMeasureResource, companyBranchResource, requestForQuotationResource, purchaseRequisitionDescriptionResource, productResource, projectSetupResource, collaboratorResource, purchaseRequisitionResource, appAuth) {
        var vm = this;
        vm.purchaseRequisitions = [];
       // vm.requestForQuotation = [];
        vm.products = [];
        appAuth.checkPermission();
       

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
        vm.SentToQuotationButton = false;


        vm.addItem = function () {
            vm.PurchaseRequisitionDescription.purchaseRequisitionDesc.unshift({ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1 });
        }
        vm.PushItem = function () {
            vm.PurchaseRequisitionDescription.purchaseRequisitionDesc.push({ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1 });
        }
        vm.removeItem = function (item) {
            vm.PurchaseRequisitionDescription.purchaseRequisitionDesc.splice(vm.PurchaseRequisitionDescription.purchaseRequisitionDesc.indexOf(item), 1);
        }
        vm.updateItem = function (item) {
            item.Description = item.cmbProductID.ProductName;
            //item.ProductID = item.cmbProductID.ProductID;
            item.ProductID = item.cmbProductID.ProductID;
            //item.UnitPrice = item.cmbProductID.SalePrice;
        }

        vm.sopen = function (item, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            item.sopened = !item.sopened;

        }


        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }
        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.PurchaseRequisitionDescription = { purchaseRequisitionDesc: [{ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1 }] };
                vm.purchaseRequisition = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;
                vm.SentToQuotationButton = false;
                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = true;
            }
            if (activeMode == 2) //List View Mode
            {
                vm.PurchaseRequisitionDescription = null;
                vm.PurchaseRequisitionDescription = { purchaseRequisitionDesc: [] };
                vm.FromView = false;
                vm.ListView = true;
                vm.DetailsView = false;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = false;
                vm.SentToQuotationButton = false;
            }

            if (activeMode == 3)//Details View Mode
            {
                vm.FromView = false;
                vm.ListView = false;
                vm.DetailsView = true;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = (vm.purchaseRequisition.ProcesStatusID == 1 ? true : false);
                vm.UpdateButton = false;
                vm.DeleteButton = (vm.purchaseRequisition.ProcesStatusID == 1 ? true : false);
                vm.CancelButton = true;
                vm.SentToQuotationButton =( vm.purchaseRequisition.ProcesStatusID ==1 ? true : false);
            }
            if (activeMode == 4)//Edit View Mode
            {
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = (vm.purchaseRequisition.ProcesStatusID == 1 ? true : false);


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = (vm.purchaseRequisition.ProcesStatusID == 1 ? true : false);
                vm.DeleteButton = (vm.purchaseRequisition.ProcesStatusID == 1 ? true : false);
                vm.CancelButton = true;
                vm.SentToQuotationButton = false;
            }
        }


        var DispayButton = function () {

        }

        vm.PRequisitionDeliver = function (RequisitionID) {
            $rootScope.RequisitionID = RequisitionID;
            $state.go('productReceiveDelivery');
        }

        GetUnitOfMeasures();
        function GetUnitOfMeasures() {
            unitOfMeasureResource.query().$promise.then(function (data) {
                vm.UnitOfMeasures = data;

            });
        }

        GetWorkStationList();

        //Get All Data List
        function GetWorkStationList() {
            companyBranchResource.query().$promise.then(function (data) {
                vm.companyBranchs = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetEmployeeList();
        //Get All Data List
        function GetEmployeeList() {
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }).$promise.then(function (data) {
                vm.Employees = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetProductList();
        //Get All Data List
        function GetProductList() {
            productResource.query({ '$filter': 'IsRawmaterial eq true' }).$promise.then(function (data) {
                vm.products = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }


        GetProjectList();
        //Get All Data List
        function GetProjectList() {
            projectSetupResource.query().$promise.then(function (data) {
                vm.Projects = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }


        GetList();

        //Get All Data List
        function GetList() {
            purchaseRequisitionResource.query().$promise.then(function (data) {
                vm.purchaseRequisitions = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save purchaseRequisition
        vm.Save = function (isValid) {
            if (isValid) {
                vm.purchaseRequisition.ProcesStatusID = 1;
                purchaseRequisitionResource.save(vm.purchaseRequisition).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.purchaseRequisition = data;
                        vm.SaveRequisition();
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        vm.SentToQuotation = function ( ) {
            
            if (vm.purchaseRequisition != null) {
                
                var requestForQuotation = {
                    EmployeeID : vm.purchaseRequisition.EmployeeID,
                    RequisitionID : vm.purchaseRequisition.PurchaseRequisitionID,
                    ProjectID: vm.purchaseRequisition.ProjectID,
                    ProcesStatusID:4,
            };
                requestForQuotationResource.save(requestForQuotation).$promise.then(
                    function (data, responseHeaders) {
                        vm.requestForQuotation = data;
                        vm.purchaseRequisition.ProcesStatusID = 2;
                        vm.Update(true);
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }
                
        }

        //Save Quotation Description
        vm.SaveRequisition = function () {

            angular.forEach(vm.PurchaseRequisitionDescription.purchaseRequisitionDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var purchaseRequisitionInfo = {
                    PurchaseRequisitionDescriptionID: value.PurchaseRequisitionDescriptionID,
                    PurchaseRequisitionID: vm.purchaseRequisition.PurchaseRequisitionID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    UOMID: value.UOMID,
                    Quantity: value.Quantity,
                    ScheduleDate: value.ScheduleDate,
                };

                purchaseRequisitionDescriptionResource.save(purchaseRequisitionInfo).$promise.then(
                function (data, responseHeaders) {

                });
            })


        }

        //Get Single Record
        vm.Get = function (id) {
            vm.PurchaseRequisitionDescription = null;
            vm.PurchaseRequisitionDescription = { purchaseRequisitionDesc: [] };
            purchaseRequisitionResource.get({ 'ID': id }).$promise.then(function (purchaseRequisition) {
                vm.purchaseRequisition = purchaseRequisition;
                vm.cmbEmployee = { CollaboratorID: vm.purchaseRequisition.EmployeeID };
                vm.cmbProject = { ProjectID: vm.purchaseRequisition.ProjectID };
                vm.cmbWorkPlantID = vm.purchaseRequisition.WorkPlant;
                vm.GetRequisitionDescription(id);
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }

        vm.GetRequisitionDescription = function (purchaseRequisitionID) {
            
            purchaseRequisitionDescriptionResource.query({ '$filter': 'PurchaseRequisitionID eq ' + purchaseRequisitionID }).$promise.then(function (data) {
                vm.PurchaseRequisitionDescription.purchaseRequisitionDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            })
        }



        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                purchaseRequisitionResource.update({ 'ID': vm.purchaseRequisition.PurchaseRequisitionID }, vm.purchaseRequisition).$promise.then(function () {
                vm.SaveRequisition();
                vm.purchaseRequisitions = null;
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
           // vm.purchaseRequisition.$delete({ 'ID': vm.purchaseRequisition.purchaseRequisitionID });
            purchaseRequisitionResource.delete({ 'ID': vm.purchaseRequisition.purchaseRequisitionID }).$promise.then(function (data) {
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