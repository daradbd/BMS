(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesBillCategory
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salesBillCategoryResource",
        ["$resource",
        salesBillCategoryResource]);

    function salesBillCategoryResource($resource) {

        return $resource("/api/SalesBillCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());