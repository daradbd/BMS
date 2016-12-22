(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: transactionReferenceType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("transactionReferenceTypeResource",
        ["$resource",
        transactionReferenceTypeResource]);

    function transactionReferenceTypeResource($resource) {

        return $resource("/api/TransactionReferenceType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());