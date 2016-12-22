(function () {
    "use strict";
    
    angular
        .module("common.services")
        .factory("commentResource",
        ["$resource",
        commentResource]);

    function commentResource($resource) {

        return $resource("/api/comments/:ID");

    }


}());