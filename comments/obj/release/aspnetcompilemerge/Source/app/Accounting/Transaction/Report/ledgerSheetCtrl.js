(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (ledgerSheetresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: ledgerSheetResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("ledgerSheetCtrl", ["$filter", "Util", "ledgerSheetResource", ledgerSheetCtrl]);
    function ledgerSheetCtrl($filter,Util, ledgerSheetResource) {
        var vm = this;
        vm.ledgerSheets = [];
        vm.ledgerList = [];
        vm.ledgerSheetts = [];
        vm.totalCR = 0;
        vm.totalDR = 0;
        vm.balance = 0;

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
        //vm.fromdate = new Date();
        var todate=new Date();
        vm.ToDate = $filter('date')(todate, "yyyy-MM-dd");

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.ledgerSheet = null;
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


        vm.fdtpopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.fdopened =!vm.fdopened;

        }

        vm.tdtpopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.tdopened =!vm.tdopened;

        }

        vm.dateFilter = function () {

            return function (item) {
                var result=false
                var DataDate = $filter('date')(item['TranDate'], "yyyy-MM-dd"); //new Date(item['TranDate']);
                var FromDate = $filter('date')(vm.FromDate, "yyyy-MM-dd"); //new Date(vm.FromDate);
                var ToDate = $filter('date')(vm.ToDate, "yyyy-MM-dd");//new Date(vm.ToDate);
                if (DataDate <= ToDate && DataDate >= FromDate)
                {

                    result= true;
                }
                else {
                    result = false
                }
               
                
                return result;
            }
        }


        vm.subTotal= function (Credit) {
            vm.totalCR = vm.totalCR + Credit;
        }

        GetList();

        //Get All Data List
        function GetList() {
            ledgerSheetResource.query(function (data) {
                vm.ledgerList = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save ledgerSheet
        vm.Save = function (isValid) {
            if (isValid) {
                ledgerSheetResource.save(vm.ledgerSheet,
                    function (data, responseHeaders) {
                        GetList();
                        vm.ledgerSheet = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }
        
        //Get Single Record
        vm.Get = function (ledgers) {
            vm.ledgerSheets = null;
            var param = { 'ID': ledgers.COAID};
            ledgerSheetResource.query(param, function (data) {
                vm.ledgerSheets = data;
                vm.cmbAccCOA = ledgers;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
                console.log(JSON.stringify(vm.ledgerSheets));
            });
        }

       
        // function Get3 () {
        //    var param = { 'ID': 1, 'Name': 'RANA','ReportType':2 };
        //    ledgerSheetResource.query(param, function (data) {
        //        vm.ledgerSheetts = data;
        //        vm.ViewMode(3);
        //        toastr.success("Data Load Successful", "Form Load");
        //        console.log(JSON.stringify(vm.ledgerSheetts));
        //    });
        //}
      

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                ledgerSheetResource.update({ 'ID': vm.ledgerSheet.ledgerSheetID }, vm.ledgerSheet);
                vm.ledgerSheets = null;
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
            vm.ledgerSheet.$delete({ 'ID': vm.ledgerSheet.ledgerSheetID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());