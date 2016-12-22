(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankLoanType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("bankLoanTypeResource",
        ["$resource",
        bankLoanTypeResource]);

    function bankLoanTypeResource($resource) {

        return $resource("/api/BankLoanType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());