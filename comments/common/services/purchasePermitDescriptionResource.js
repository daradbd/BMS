﻿(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchasePermitDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("purchasePermitDescriptionResource",
        ["$resource",
        purchasePermitDescriptionResource]);

    function purchasePermitDescriptionResource($resource) {

        return $resource("/api/PurchasePermitDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());