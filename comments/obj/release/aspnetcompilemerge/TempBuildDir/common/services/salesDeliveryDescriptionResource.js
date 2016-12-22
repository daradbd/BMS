(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesDeliveryDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salesDeliveryDescriptionResource",
        ["$resource",
        salesDeliveryDescriptionResource]);

    function salesDeliveryDescriptionResource($resource) {

        return $resource("/api/SalesDeliveryDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());