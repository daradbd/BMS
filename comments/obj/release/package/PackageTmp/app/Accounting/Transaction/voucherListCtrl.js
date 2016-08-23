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
        .controller("voucherListCtrl", ["accCOAResource", "voucherListResource", "param", "appAuth", voucherListCtrl]);
    function voucherListCtrl(accCOAResource, voucherListResource, param, appAuth) {
        var vm = this;
        vm.VoucherTypeID = param.VoucherTypeID;
        vm.VoucherName = param.VoucherTypeName;
        vm.voucherLists = [];
       // appAuth.checkPermission();
       
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
        vm.CancelButton = false;

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
            vm.TotalDebit = TotalDebit;
            return vm.DrCRisNotEqual;
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

        GetBankCOAList();

                //Get All Data List
        function GetBankCOAList() {
            accCOAResource.query({ 'id': 3, 'FilterType': 1 }).$promise.then(function (data) {
                vm.accCOAs = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetaccCOAList();

        //Get All Data List
        function GetaccCOAList() {
            accCOAResource.query({ '$filter': 'HasChild eq false' }).$promise.then(function (data) {
                vm.accCOAs = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            voucherListResource.query({ '$filter': 'VoucherTypeID eq ' + vm.VoucherTypeID }).$promise.then(function (data) {
                vm.voucherLists = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save voucherList
        vm.Save = function (isValid) {
            if (isValid && vm.DrCRisNotEqual==false) {
                angular.forEach(vm.voucher.voucherL, function (value, key) {
                    var TDate = new Date(vm.voucherList.TranDate);
                    
                    var VoucherInfo = {
                        VoucherTypeID:vm.VoucherTypeID,
                        COAID: value.COAID,
                        Amount: value.Amount,
                        VoucherNo: vm.voucherList.VoucherNo,
                        Remarks: vm.voucherList.Remarks,
                        DrCr: value.DrCr,
                        TranDate: TDate,
                    };
                    //alert(angular.toJson(VoucherInfo));
                    //alert(value.COAID);
                    //vm.voucherList.COAID = value.COAID;
                    //vm.voucherList.Amount = value.Amount;
                    //vm.voucherList.DrCr = value.DrCr;
                
                    voucherListResource.save(VoucherInfo).$promise.then(
                    function (data, responseHeaders) {
                        //GetList();
                        vm.voucherList = null;
                        toastr.success("Save Successful");
                    }, function (error) {
                        // error handler
                        toastr.error("Data Save Failed!");
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
            voucherListResource.query({ '$filter': 'VoucherNo eq ' + VoucherNo }).$promise.then(function (data) {
                vm.voucherList = data[0];
                vm.voucher.voucherL = data;
                vm.ViewMode(3);

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
       }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                voucherListResource.update({ 'ID': vm.voucherList.voucherListID }, vm.voucherList).$promise.then(function () {
                vm.voucherLists = null;
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
           // vm.voucherList.$delete({ 'ID': vm.voucherList.voucherListID });
            voucherListResource.delete({ 'ID': vm.voucherList.voucherListID }).$promise.then(function (data) {
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