(function ()
{
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankAccountOwnerType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("bankAccountOwnerTypeResource",
        ["$resource",
        bankAccountOwnerTypeResource]);

    function bankAccountOwnerTypeResource($resource)
    {

        return $resource("/api/BankAccountOwnerType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());