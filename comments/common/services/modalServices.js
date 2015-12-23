angular.module("common.services").factory('modalServices', function ($uibModalInstance) {

    return {
        ModalClose : function(data){
            return $uibModalInstance.close(data);
        },
        ModalCancel: function () {
            $uibModalInstance.dismiss('cancel');
        }
    };

});