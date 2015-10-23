(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("commentListCtrl", ["commentResource",  commentListCtrl]);
    function commentListCtrl(commentResource) {
        var vm = this;

        
        commentResource.query(function (data) {
            vm.comments = data;

        });

       
       

    }

}());