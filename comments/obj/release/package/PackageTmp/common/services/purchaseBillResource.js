(function ()
{
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseBill
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("purchaseBillResource",
        ["$resource",
        purchaseBillResource]);

    function purchaseBillResource($resource)
    {

        return $resource("/api/PurchaseBill/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());