(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: company
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("companyResource",
        ["$resource",
        companyResource]);

    function companyResource($resource) {

        return $resource("/api/Company/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());