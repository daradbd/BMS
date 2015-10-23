(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (voucherListresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: voucherListResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("voucherListCtrl", ["accCOAResource", "voucherListResource", voucherListCtrl]);
    function voucherListCtrl(accCOAResource,voucherListResource) {
        var vm = this;
        vm.voucherLists = [];
        vm.voucher = { voucherL: [{ COAID: 0, DrCr: true, Amount: 0.0 }] };
        vm.TotalDebit=0;
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


        vm.addItem = function () {
            vm.voucher.voucherL.unshift({ COAID: 0, DrCr: true, Amount: 0.0 });
        }
        vm.removeItem = function (item) {
            vm.voucher.voucherL.splice(vm.voucher.voucherL.indexOf(item), 1);
        }


        vm.sopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.sopened = !vm.sopened;

        }

        vm.TotalDrCr = function () {
            var TotalDebit = 0.00;
            var TotalCredit = 0.00;
            vm.DrCRisNotEqual = false;
            angular.forEach(vm.voucher.voucherL, function (item, key) {
                if (item.DrCr == true)
                {
                    TotalDebit += (item.Amount*1);
                }
                else if(item.DrCr ==false)
                {
                    TotalCredit += (item.Amount*1);
                }
                
            });
            if (TotalDebit != TotalCredit)
            {
                vm.DrCRisNotEqual = true;
              
            }
            vm.Credit = TotalCredit;
            return TotalDebit;
        }

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.voucherList = null;
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


        GetaccCOAList();

        //Get All Data List
        function GetaccCOAList() {
            accCOAResource.query(function (data) {
                vm.accCOAs = data;
                //toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            voucherListResource.query(function (data) {
                vm.voucherLists = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save voucherList
        vm.Save = function (isValid) {
            if (isValid && vm.DrCRisNotEqual==false) {
                angular.forEach(vm.voucher.voucherL, function (value, key) {
                    var TDate = new Date(vm.voucherList.TranDate);
                    
                    var VoucherInfo = {
                        COAID: value.COAID,
                        Amount: value.Amount,
                        VoucherNo: vm.voucherList.VoucherNo,
                        Remarks: vm.voucherList.Remarks,
                        DrCr: value.DrCr,
                        TranDate: TDate,
                    };
                    alert(angular.toJson(VoucherInfo));
                    //alert(value.COAID);
                    //vm.voucherList.COAID = value.COAID;
                    //vm.voucherList.Amount = value.Amount;
                    //vm.voucherList.DrCr = value.DrCr;
                
                    voucherListResource.save(VoucherInfo,
                    function (data, responseHeaders) {
                        //GetList();
                        vm.voucherList = null;
                        toastr.success("Save Successful");
                    });
                })
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        //vm.Get = function (id) {
        //    voucherListResource.get({ 'ID': id }, function (voucherList) {
        //        vm.voucherList = voucherList;
        //        vm.ViewMode(3);
        //        toastr.success("Data Load Successful", "Form Load");
        //    });
        //}
        vm.Get = function (VoucherNo) {
            voucherListResource.query({ '$filter': 'VoucherNo eq ' + VoucherNo }, function (data) {
                vm.voucherList = data[0];
                vm.voucher.voucherL = data;
                vm.ViewMode(3);

        });
       }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                voucherListResource.update({ 'ID': vm.voucherList.voucherListID }, vm.voucherList);
                vm.voucherLists = null;
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
            vm.voucherList.$delete({ 'ID': vm.voucherList.voucherListID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());