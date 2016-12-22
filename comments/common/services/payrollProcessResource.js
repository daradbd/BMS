(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: payrollProcess
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("payrollProcessResource",
        ["$resource",
        payrollProcessResource]);

    function payrollProcessResource($resource) {

        return $resource("/api/PayrollProcess/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());