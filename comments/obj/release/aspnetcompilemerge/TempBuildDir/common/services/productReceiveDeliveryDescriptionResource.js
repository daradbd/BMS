(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productReceiveDeliveryDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productReceiveDeliveryDescriptionResource",
        ["$resource",
        productReceiveDeliveryDescriptionResource]);

    function productReceiveDeliveryDescriptionResource($resource) {

        return $resource("/api/ProductReceiveDeliveryDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());