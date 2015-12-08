(function () {
    'use strict';
    angular.module('ng.ConfirmMsg', [])
    .directive('ngReallyClick', ['$modal',
    function ($modal) {

        var ModalInstanceCtrl = function ($scope, $modalInstance) {
            $scope.ok = function () {
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        return {
            restrict: 'A',
            scope: {
                ngReallyClick: "&",
                item: "="
            },
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    var message = attrs.ngReallyMessage || "Are you sure ?";

                    /*
                    //This works
                    if (message && confirm(message)) {
                      scope.$apply(attrs.ngReallyClick);
                    }
                    //*/

                    //*This doesn't works
                    var modalHtml = '<div class="modal-dialog modal-sm"><div class="modal-body">' + message + '</div>';
                    modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div></div>';

                    var modalInstance = $modal.open({
                        template: modalHtml,
                        controller: ModalInstanceCtrl
                    });

                    modalInstance.result.then(function () {
                        scope.ngReallyClick({ item: scope.item }); //raise an error : $digest already in progress
                    }, function () {
                        //Modal dismissed
                    });
                    //*/

                });

            }
        }
    }
    ]);

})();
