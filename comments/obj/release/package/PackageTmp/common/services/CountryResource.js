(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("countryResource",
        ["$resource",
        countryResource]);

    function countryResource($resource) {

        return $resource("/api/Country/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );

    }


}());