(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: expensesType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("expensesTypeResource",
        ["$resource",
        expensesTypeResource]);

    function expensesTypeResource($resource) {

        return $resource("/api/ExpensesType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());