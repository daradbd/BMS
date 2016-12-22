(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankLoanTransaction
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("bankLoanTransactionResource",
        ["$resource",
        bankLoanTransactionResource]);

    function bankLoanTransactionResource($resource) {

        return $resource("/api/BankLoanTransaction/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());