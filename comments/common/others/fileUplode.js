(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: fileUpload
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("fileUplode",
        ["$http", "$q",
        fileUplode]);

    function fileUplode($http, $q) {

        var fac = {};
        fac.UploadFile = function (file, description) {
            if (ChechFileValid(file) == true)
            {
                var formData = new FormData();
                formData.append("file", file);
                //We can send more data to server using append         
                formData.append("description", description);

                var defer = $q.defer();
                $http.post("/Data/SaveFiles", formData,
                    {
                        withCredentials: true,
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    })
                .success(function (d) {
                    defer.resolve(d);
                })
                .error(function () {
                    defer.reject("File Upload Failed!");
                });

                return defer.promise;
            }
           

        }

          function ChechFileValid(file) {
              var isValid = false;
              fac.FileInvalidMessage = "";
            if (file != null) {
                //&& file.size <= (512 * 1024)
                if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif' || file.type == 'application/pdf' || file.type == 'application/msword' || file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                    fac.FileInvalidMessage = "";
                    isValid = true;
                }
                else {
                    fac.FileInvalidMessage = "Selected file is Invalid. (only file type png, jpeg and gif and 512 kb size allowed)";
                }
            }
            else {
                fac.FileInvalidMessage = "Image required!";
            }
            IsFileValid = isValid;
            return IsFileValid;
        };

        return fac;
    }
}());