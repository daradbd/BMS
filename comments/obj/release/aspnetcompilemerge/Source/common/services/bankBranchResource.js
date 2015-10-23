(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankBranch
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("bankBranchResource",
        ["$resource",
        bankBranchResource]);

    function bankBranchResource($resource) {

        return $resource("/api/BankBranch/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());