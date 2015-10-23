(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesBillDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salesBillDescriptionResource",
        ["$resource",
        salesBillDescriptionResource]);

    function salesBillDescriptionResource($resource) {

        return $resource("/api/SalesBillDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());