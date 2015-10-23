(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: companyBranchType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("companyBranchTypeResource",
        ["$resource",
        companyBranchTypeResource]);

    function companyBranchTypeResource($resource) {

        return $resource("/api/CompanyBranchType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());