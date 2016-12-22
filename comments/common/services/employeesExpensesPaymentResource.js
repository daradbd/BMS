(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeesExpensesPayment
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("employeesExpensesPaymentResource",
        ["$resource",
        employeesExpensesPaymentResource]);

    function employeesExpensesPaymentResource($resource) {

        return $resource("/api/EmployeesExpensesPayment/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());