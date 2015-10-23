(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("cityResource",
        ["$resource",
        cityResource]);

    function cityResource($resource) {

        return $resource("/api/City/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );

    }


}());