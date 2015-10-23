(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: companyBranchCategory
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("companyBranchCategoryResource",
        ["$resource",
        companyBranchCategoryResource]);

    function companyBranchCategoryResource($resource) {

        return $resource("/api/CompanyBranchCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());