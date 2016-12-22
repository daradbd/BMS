(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: billofMaterialDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("billofMaterialDescriptionResource",
        ["$resource",
        billofMaterialDescriptionResource]);

    function billofMaterialDescriptionResource($resource) {

        return $resource("/api/BillofMaterialDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());