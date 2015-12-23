(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("companyTypeResource",
        ["$resource",
        companyTypeResource]);

    function companyTypeResource($resource) {

        return $resource("/api/CompanyType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );

    }


}());