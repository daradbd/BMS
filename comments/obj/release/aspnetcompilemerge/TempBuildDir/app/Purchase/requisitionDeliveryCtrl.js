(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (requisitionDeliveryresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: requisitionDeliveryResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("requisitionDeliveryCtrl", ["unitOfMeasureResource", "companyBranchResource", "requisitionDeliveryDescriptionResource", "requestForQuotationResource", "purchaseRequisitionDescriptionResource", "productResource", "projectSetupResource", "collaboratorResource", "purchaseRequisitionResource", "requisitionDeliveryResource", requisitionDeliveryCtrl]);
    function requisitionDeliveryCtrl(unitOfMeasureResource, companyBranchResource,requisitionDeliveryDescriptionResource, requestForQuotationResource, purchaseRequisitionDescriptionResource, productResource, projectSetupResource, collaboratorResource, purchaseRequisitionResource,requisitionDeliveryResource) {
        var vm = this;
        vm.requisitionDeliverys = [];
        vm.purchaseRequisitions = [];
        vm.PurchaseRequisitionDescription = { purchaseRequisitionDesc: [] };

        vm.requisitionDeliveryDescription = { requisitionDeliveryDesc: [] };

        vm.products = [];
        vm.requisitionDelivery = {};

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

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

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
            productResource.query().$promise.then(function (data) {
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

        GetPurchaseRequisitionList();

        function GetPurchaseRequisitionList() {
            purchaseRequisitionResource.query({ '$filter': 'IsDelivered eq false' }).$promise.then(function (data) {
                vm.purchaseRequisitions = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }


        //Get Single Record
        vm.GetPurchaseRequisition = function (id) {
            //vm.requisitionDelivery = null;
            vm.PurchaseRequisitionDescription = null;
            vm.PurchaseRequisitionDescription = { purchaseRequisitionDesc: [] };
            purchaseRequisitionResource.get({ 'ID': id }).$promise.then(function (purchaseRequisition) {
                vm.purchaseRequisition = purchaseRequisition;
                vm.requisitionDelivery.RequisitionCode = vm.purchaseRequisition.PurchaseRequisitionCode;
                vm.cmbProject = { ProjectID: vm.purchaseRequisition.ProjectID };
                vm.cmbWorkPlantID = vm.purchaseRequisition.WorkPlant;
                vm.GetRequisitionDescription(id);
                vm.ViewMode(1);
                toastr.success("Data Load Successful", "Form Load");
            });
        }

        vm.GetRequisitionDescription = function (purchaseRequisitionID) {

            purchaseRequisitionDescriptionResource.query({ '$filter': 'PurchaseRequisitionID eq ' + purchaseRequisitionID }).$promise.then(function (data) {
                vm.PurchaseRequisitionDescription.purchaseRequisitionDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            })
        }


        GetList();

        //Get All Data List
        function GetList() {
            requisitionDeliveryResource.query(function (data) {
                vm.requisitionDeliverys = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save requisitionDelivery
        vm.Save = function (isValid) {
            if (isValid) {
                vm.requisitionDelivery.EmployeeID = vm.purchaseRequisition.EmployeeID;
                vm.requisitionDelivery.ProjectID = vm.purchaseRequisition.ProjectID;
                vm.requisitionDelivery.WorkPlantID = vm.purchaseRequisition.WorkPlantID;
                vm.requisitionDelivery.PurchaseRequisitionID = vm.purchaseRequisition.PurchaseRequisitionID;
                vm.requisitionDelivery.RequisitionCode = vm.purchaseRequisition.PurchaseRequisitionCode;
                requisitionDeliveryResource.save(vm.requisitionDelivery,
                    function (data, responseHeaders) {
                        vm.requisitionDelivery = data;
                        vm.SaveRequisitionDelivery();
                       // GetList();
                        //vm.requisitionDelivery = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Save Quotation Description
        vm.SaveRequisitionDelivery = function () {

            angular.forEach(vm.PurchaseRequisitionDescription.purchaseRequisitionDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var RequisitionDeliveryInfo = {
                    RequisitionDeliveryDescriptionID: value.RequisitionDeliveryDescriptionID,
                    RequisitionDeliveryID: vm.requisitionDelivery.RequisitionDeliveryID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    UOMID: value.UOMID,
                    RequisitionQuantity: value.Quantity,
                    Quantity: value.DeliveryQuantity,
                    ScheduleDate: value.ScheduleDate,
                    StockQuantity: value.StockQuantity
                };
                //alert(angular.toJson(VoucherInfo));
                //alert(value.COAID);
                //vm.voucherList.COAID = value.COAID;
                //vm.voucherList.Amount = value.Amount;
                //vm.voucherList.DrCr = value.DrCr;

                requisitionDeliveryDescriptionResource.save(RequisitionDeliveryInfo).$promise.then(
                function (data, responseHeaders) {

                });
            })


        }

        //Get Single Record
        vm.Get = function (id) {
            requisitionDeliveryResource.get({ 'ID': id }, function (requisitionDelivery) {
                vm.requisitionDelivery = requisitionDelivery;
                vm.GetRequisitionDelivery(vm.requisitionDelivery.RequisitionDeliveryID);
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }

        vm.GetRequisitionDelivery = function (RequisitionDeliveryID) {

            requisitionDeliveryDescriptionResource.query({ '$filter': 'RequisitionDeliveryID eq ' + RequisitionDeliveryID }).$promise.then(function (data) {
                vm.requisitionDeliveryDescription.requisitionDeliveryDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                requisitionDeliveryResource.update({ 'ID': vm.requisitionDelivery.requisitionDeliveryID }, vm.requisitionDelivery);
                vm.requisitionDeliverys = null;
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
            vm.requisitionDelivery.$delete({ 'ID': vm.requisitionDelivery.requisitionDeliveryID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());