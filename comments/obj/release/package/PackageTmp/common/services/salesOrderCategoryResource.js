(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesOrderCategory
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salesOrderCategoryResource",
        ["$resource",
        salesOrderCategoryResource]);

    function salesOrderCategoryResource($resource) {

        return $resource("/api/SalesOrderCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());