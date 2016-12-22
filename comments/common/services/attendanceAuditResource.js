(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: attendanceAudit
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("attendanceAuditResource",
        ["$resource",
        attendanceAuditResource]);

    function attendanceAuditResource($resource) {

        return $resource("/api/AttendanceAudit/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());