(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: requisitionDeliveryDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("requisitionDeliveryDescriptionResource",
        ["$resource",
        requisitionDeliveryDescriptionResource]);

    function requisitionDeliveryDescriptionResource($resource) {

        return $resource("/api/RequisitionDeliveryDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());