(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("commentListCtrl", ["commentResource", "$uibModal", commentListCtrl]);
    function commentListCtrl(commentResource, $uibModal) {
        var vm = this;

        vm.open = function () {

           $uibModal.open({
               templateUrl: "app/Resources/uploadFile.html",
               size: 'lg',
               controller: "uploadFileCtrl as vm"
            });
        }

        //vm.date =new date();
        commentResource.query(function (data) {
            vm.comments = data;

        });

       
       

    }

}());