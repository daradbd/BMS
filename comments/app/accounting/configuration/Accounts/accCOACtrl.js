(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (accCOAresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: accCOAResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("accCOACtrl", ["accTypeResource", "accCOAResource", "appAuth", accCOACtrl]);
    function accCOACtrl(accTypeResource, accCOAResource, appAuth) {
        var vm = this;
        vm.accCOAs = [];
        vm.accCOA = [];
        vm.AccTypes = [];
        vm.ParentCOAIDs = [];
        vm.accCOATree = [];
        vm.json = [];
        appAuth.checkPermission();

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
            
            if (activeMode == 1)//Form View Mode
            {
                vm.accCOA = null;
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
                vm.DetailsView = false
                vm.EditView = false;
                vm.FromView = false;
                vm.ListView = true;
               


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = false;
                GetList();
            }

            if (activeMode == 3)//Details View Mode
            {
                vm.ListView = false;
                vm.FromView = false;
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

        //Object.prototype.findKey = function (keyObj) {
        //    var p, key, val, tRet;
        //    for (p in keyObj) {
        //        if (keyObj.hasOwnProperty(p)) {
        //            key = p;
        //            val = keyObj[p];
        //        }
        //    }

        //    for (p in this) {
        //        if (p == key) {
        //            if (this[p] == val) {
        //                return this;
        //            }
        //        } else if (this[p] instanceof Object) {
        //            if (this.hasOwnProperty(p)) {
        //                tRet = this[p].findKey(keyObj);
        //                if (tRet) { return tRet; }
        //            }
        //        }
        //    }

        //    return false;
        //};

        function SearchTree(data,keyObj) {
            var p, key, val, tRet;
            for (p in keyObj) {
                if (keyObj.hasOwnProperty(p)) {
                    key = p;
                    val = keyObj[p];
                }
            }

            for (p in data) {
                if (p == key) {
                    if (data[p] == val) {
                        return data;
                    }
                } else if (data[p] instanceof Object) {
                    if (data.hasOwnProperty(p)) {
                        tRet = SearchTree(data[p], keyObj);
                        if (tRet) { return tRet; }
                    }
                }
            }

            return false;

        }

        var DispayButton = function () {

        }

        function CreateTree(data) {
            vm.accCOATree = [{ id: 0, coaname: "Chart OF Account", nodes: [] }];
            angular.forEach(data, function (item, key) {

                if (angular.isUndefined(item.ParentCOAID)==false)
                {
                    //var element = vm.accCOATree.findKey({ id: item.ParentCOAID });
                    var element = SearchTree(vm.accCOATree, { id: item.ParentCOAID });
                    if (element != false)
                    {
                        element.nodes.push({ id: item.COAID, coaname: item.COAName, nodes: [] });
                    }
                    
                }

                
            });
        }


        vm.GetAccType = GetAccType();
        function GetAccType() {
            accTypeResource.query().$promise.then(function (data) {
                vm.AccTypes = data;


            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })

        }

        vm.selectParentCOAID = function(AccTypeID) {

            accCOAResource.query({ '$filter': 'AccTypeID eq ' + AccTypeID }).$promise.then(function (data) {
                vm.ParentCOAIDs = data;
                //toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        GetList();

        //Get All Data List
        function GetList() {
            accCOAResource.query().$promise.then(function (data) {
                vm.accCOAs = data;
                CreateTree(vm.accCOAs);
                vm.roleList = vm.accCOATree;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save accCOA
        vm.Save = function (isValid) {
            if (isValid) {
                vm.accCOA.BalanceType = vm.cmbAccType.BalanceType;
                vm.accCOA.AccTypeID = vm.cmbAccType.AccTypeID;
                accCOAResource.save(vm.accCOA).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.accCOA = null;
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
            accCOAResource.get({ 'ID': id }).$promise.then(function (accCOA) {
                vm.accCOA = accCOA;
                //var pID = accCOA.ParentCOAID;
                vm.cmbAccType = { AccTypeID: vm.accCOA.AccTypeID };
                vm.selectParentCOAID(vm.accCOA.AccTypeID);
                
                vm.cmbParentCOAID = { COAID: vm.accCOA.ParentCOAID };
                //vm.cmbAccType = { AccTypeID: 1 };

                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                accCOAResource.update({ 'ID': vm.accCOA.COAID }, vm.accCOA).$promise.then(function () {
                vm.accCOAs = null;
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
           // vm.accCOA.$delete({ 'ID': vm.accCOA.COAID });
            accCOAResource.delete({ 'ID': vm.accCOA.COAID }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                GetList();
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
            });
        }

      


        //roleList1 to treeview


    }

}());