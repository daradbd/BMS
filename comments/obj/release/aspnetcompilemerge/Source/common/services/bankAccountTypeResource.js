(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankAccountType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("bankAccountTypeResource",
        ["$resource",
        bankAccountTypeResource]);

    function bankAccountTypeResource($resource) {

        return $resource("/api/BankAccountType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());