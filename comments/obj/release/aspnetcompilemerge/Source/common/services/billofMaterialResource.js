(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: billofMaterial
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("billofMaterialResource",
        ["$resource",
        billofMaterialResource]);

    function billofMaterialResource($resource) {

        return $resource("/api/BillofMaterial/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());