(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesOrderDescription
     *  @date: 29/4/2015
     */

    angular
        .module("common.services")
        .factory("salesOrderDescriptionResource",
        ["$resource",
        salesOrderDescriptionResource]);

    function salesOrderDescriptionResource($resource) {

        return $resource("/api/SalesOrderDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());