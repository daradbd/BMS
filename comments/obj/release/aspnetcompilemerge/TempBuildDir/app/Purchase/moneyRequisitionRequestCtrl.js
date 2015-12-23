(function ()
{
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (moneyRequisitionRequestresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: moneyRequisitionRequestResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("moneyRequisitionRequestCtrl", ["moneyRequisitionResource", "projectSetupResource", "collaboratorResource", "moneyRequisitionRequestResource", moneyRequisitionRequestCtrl]);
    function moneyRequisitionRequestCtrl(moneyRequisitionResource,projectSetupResource, collaboratorResource, moneyRequisitionRequestResource)
    {
        var vm = this;
        vm.moneyRequisitionRequests = [];
        vm.moneyRequisition = {};

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
        vm.SentButton = false;



        vm.ViewMode = function (activeMode)
        {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.moneyRequisitionRequest = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.SentButton = false;
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
                vm.SentButton = false;
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
                vm.SentButton = true;
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
                vm.SentButton = false;
            }
        }

        var DispayButton = function ()
        {

        }

        GetEmployeeList();
        //Get All Data List
        function GetEmployeeList()
        {
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }, function (data)
            {
                vm.Employees = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetProjectList();
        //Get All Data List
        function GetProjectList()
        {
            projectSetupResource.query(function (data)
            {
                vm.Projects = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetList();

        //Get All Data List
        function GetList()
        {
            moneyRequisitionRequestResource.query(function (data)
            {
                vm.moneyRequisitionRequests = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save moneyRequisitionRequest
        vm.Save = function (isValid)
        {
            if (isValid)
            {
                moneyRequisitionRequestResource.save(vm.moneyRequisitionRequest,
                    function (data, responseHeaders)
                    {
                        GetList();
                        vm.moneyRequisitionRequest = null;
                        toastr.success("Save Successful");
                    });
            }
            else
            {

                toastr.error("Form is not valid");
            }


        }

        vm.SendMRR = function ()
        {
            vm.moneyRequisition.MoneyRequisitionRequestID = vm.moneyRequisitionRequest.MoneyRequisitionRequestID;
            vm.moneyRequisition.EmployeeID = vm.moneyRequisitionRequest.EmployeeID;
            vm.moneyRequisition.RequestAmount = vm.moneyRequisitionRequest.RequestAmount;
            vm.moneyRequisition.ProjectID = vm.moneyRequisitionRequest.ProjectID;
            vm.moneyRequisition.Remarks = vm.moneyRequisitionRequest.Remarks;
            moneyRequisitionResource.save(vm.moneyRequisition,
                function (data, responseHeaders)
                {
                    GetList();
                    vm.moneyRequisition = null;
                    toastr.success("Save Successful");
                });
        }

        //Get Single Record
        vm.Get = function (id)
        {
            moneyRequisitionRequestResource.get({ 'ID': id }, function (moneyRequisitionRequest)
            {
                vm.moneyRequisitionRequest = moneyRequisitionRequest;
                vm.cmbEmployee = { CollaboratorID: vm.moneyRequisitionRequest.EmployeeID };
                vm.cmbProject = { ProjectID: vm.moneyRequisitionRequest.ProjectID };
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid)
        {
            if (isValid)
            {
                moneyRequisitionRequestResource.update({ 'ID': vm.moneyRequisitionRequest.MoneyRequisitionRequestID }, vm.moneyRequisitionRequest);
                vm.moneyRequisitionRequests = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
            }
            else
            {
                toastr.error("Form is not valid");
            }
        }

        //Data Delete
        vm.Delete = function ()
        {
            vm.moneyRequisitionRequest.$delete({ 'ID': vm.moneyRequisitionRequest.MoneyRequisitionRequestID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());