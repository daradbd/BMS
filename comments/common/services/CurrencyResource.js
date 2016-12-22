(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("currencyResource",
        ["$resource",
        currencyResource]);

    function currencyResource($resource) {

        return $resource("/api/Currency/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );

    }


}());