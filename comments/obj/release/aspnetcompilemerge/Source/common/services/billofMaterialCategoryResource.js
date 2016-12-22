(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: billofMaterialCategory
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("billofMaterialCategoryResource",
        ["$resource",
        billofMaterialCategoryResource]);

    function billofMaterialCategoryResource($resource) {

        return $resource("/api/BillofMaterialCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());