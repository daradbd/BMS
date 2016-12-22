(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankLoan
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("bankLoanResource",
        ["$resource",
        bankLoanResource]);

    function bankLoanResource($resource) {

        return $resource("/api/BankLoan/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());