(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: designation
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("designationResource",
        ["$resource",
        designationResource]);

    function designationResource($resource) {

        return $resource("/api/Designation/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());