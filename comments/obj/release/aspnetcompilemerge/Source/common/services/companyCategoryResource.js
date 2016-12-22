(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("companyCategoryResource",
        ["$resource",
        companyCategoryResource]);

    function companyCategoryResource($resource) {

        return $resource("/api/CompanyCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
                    }
                 }
            );

    }


}());