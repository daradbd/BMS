(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: payrollProcessDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("payrollProcessDescriptionResource",
        ["$resource",
        payrollProcessDescriptionResource]);

    function payrollProcessDescriptionResource($resource) {

        return $resource("/api/PayrollProcessDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());