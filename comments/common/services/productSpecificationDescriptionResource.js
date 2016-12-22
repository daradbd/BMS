(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productSpecificationDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productSpecificationDescriptionResource",
        ["$resource",
        productSpecificationDescriptionResource]);

    function productSpecificationDescriptionResource($resource) {

        return $resource("/api/ProductSpecificationDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());