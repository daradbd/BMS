(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: holidayType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("holidayTypeResource",
        ["$resource",
        holidayTypeResource]);

    function holidayResource($resource) {

        return $resource("/api/HolidayType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());