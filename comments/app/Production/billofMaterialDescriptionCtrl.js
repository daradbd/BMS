﻿(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (billofMaterialDescriptionresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: billofMaterialDescriptionResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("billofMaterialDescriptionCtrl", ["billofMaterialDescriptionResource", "appAuth", billofMaterialDescriptionCtrl]);
    function billofMaterialDescriptionCtrl(billofMaterialDescriptionResource, appAuth) {
        var vm = this;
        vm.billofMaterialDescriptions = [];
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



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.billofMaterialDescription = null;
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


        GetList();

        //Get All Data List
        function GetList() {
            billofMaterialDescriptionResource.query(function (data) {
                vm.billofMaterialDescriptions = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save billofMaterialDescription
        vm.Save = function (isValid) {
            if (isValid) {
                billofMaterialDescriptionResource.save(vm.billofMaterialDescription,
                    function (data, responseHeaders) {
                        GetList();
                        vm.billofMaterialDescription = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            billofMaterialDescriptionResource.get({ 'ID': id }, function (billofMaterialDescription) {
                vm.billofMaterialDescription = billofMaterialDescription;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                billofMaterialDescriptionResource.update({ 'ID': vm.billofMaterialDescription.billofMaterialDescriptionID }, vm.billofMaterialDescription);
                vm.billofMaterialDescriptions = null;
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
            vm.billofMaterialDescription.$delete({ 'ID': vm.billofMaterialDescription.billofMaterialDescriptionID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());