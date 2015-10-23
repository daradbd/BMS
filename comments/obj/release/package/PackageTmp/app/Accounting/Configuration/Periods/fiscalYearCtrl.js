(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (fiscalYearresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: fiscalYearResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("fiscalYearCtrl", ["Util", "fiscalYearResource", fiscalYearCtrl]);
    function fiscalYearCtrl(Util,fiscalYearResource) {
        var vm = this;
        vm.helpers = Util.helpers;
        vm.fiscalYears = [];

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



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.fiscalYear = null;
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

        vm.sopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.sopened = !vm.sopened;

        }

        vm.eopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.eopened = !vm.eopened;

        }



        GetList();

        //Get All Data List
        function GetList() {
            fiscalYearResource.query(function (data) {
                vm.fiscalYears = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save fiscalYear
        vm.Save = function (isValid) {
            if (isValid) {
               
                vm.fiscalYear.StartDate = Util.offsetTime(vm.fiscalYear.StartDate);
                vm.fiscalYear.EndDate = Util.offsetTime(vm.fiscalYear.EndDate);
                fiscalYearResource.save(vm.fiscalYear,
                    function (data, responseHeaders) {
                        GetList();
                        vm.fiscalYear = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            fiscalYearResource.get({ 'ID': id }, function (fiscalYear) {
                vm.fiscalYear = fiscalYear;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.fiscalYear.StartDate = Util.offsetTime(vm.fiscalYear.StartDate);
                vm.fiscalYear.EndDate = Util.offsetTime(vm.fiscalYear.EndDate);
                fiscalYearResource.update({ 'ID': vm.fiscalYear.FiscalYearID }, vm.fiscalYear);
                vm.fiscalYears = null;
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
            vm.fiscalYear.$delete({ 'ID': vm.fiscalYear.fiscalYearID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());