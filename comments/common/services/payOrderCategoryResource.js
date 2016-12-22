(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: payOrderCategory
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("payOrderCategoryResource",
        ["$resource",
        payOrderCategoryResource]);

    function payOrderCategoryResource($resource) {

        return $resource("/api/PayOrderCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());