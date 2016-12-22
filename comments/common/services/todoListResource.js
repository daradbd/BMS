(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: todoList
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("todoListResource",
        ["$resource",
        todoListResource]);

    function todoListResource($resource) {

        return $resource("/api/TodoList/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());