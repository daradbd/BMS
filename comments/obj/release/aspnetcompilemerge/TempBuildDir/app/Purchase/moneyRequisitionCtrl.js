(function ()
{
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (moneyRequisitionresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: moneyRequisitionResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("moneyRequisitionCtrl", ["projectSetupResource", "collaboratorResource", "moneyRequisitionResource", moneyRequisitionCtrl]);
    function moneyRequisitionCtrl(projectSetupResource, collaboratorResource, moneyRequisitionResource)
    {
        var vm = this;
        vm.moneyRequisitions = [];

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



        vm.ViewMode = function (activeMode)
        {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.moneyRequisition = null;
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
            moneyRequisitionResource.query(function (data)
            {
                vm.moneyRequisitions = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save moneyRequisition
        vm.Save = function (isValid)
        {
            if (isValid)
            {
                moneyRequisitionResource.save(vm.moneyRequisition,
                    function (data, responseHeaders)
                    {
                        GetList();
                        vm.moneyRequisition = null;
                        toastr.success("Save Successful");
                    });
            }
            else
            {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id)
        {
            moneyRequisitionResource.get({ 'ID': id }, function (moneyRequisition)
            {
                vm.moneyRequisition = moneyRequisition;
                vm.cmbEmployee = { CollaboratorID: vm.moneyRequisition.EmployeeID };
                vm.cmbProject = { ProjectID: vm.moneyRequisition.ProjectID };
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid)
        {
            if (isValid)
            {
                moneyRequisitionResource.update({ 'ID': vm.moneyRequisition.MoneyRequisitionID }, vm.moneyRequisition);
                vm.moneyRequisitions = null;
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
            vm.moneyRequisition.$delete({ 'ID': vm.moneyRequisition.MoneyRequisitionID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());