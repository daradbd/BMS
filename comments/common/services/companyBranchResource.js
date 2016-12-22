(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: companyBranch
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("companyBranchResource",
        ["$resource",
        companyBranchResource]);

    function companyBranchResource($resource) {

        return $resource("/api/CompanyBranch/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());