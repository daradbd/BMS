(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (uploadFileresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: uploadFileResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("uploadFileCtrl", function ($scope,$uibModalInstance, FileUploadService) {
            // Variables
            $scope.Message = "";
            $scope.FileInvalidMessage = "";
            $scope.SelectedFileForUpload = null;
            $scope.FileDescription = "";
            $scope.IsFormSubmitted = false;
            $scope.IsFileValid = false;
            $scope.IsFormValid = false;

            //Form Validation
            $scope.$watch("f1.$valid", function (isValid) {
                $scope.IsFormValid = isValid;
            });


            // THIS IS REQUIRED AS File Control is not supported 2 way binding features of Angular
            // ------------------------------------------------------------------------------------
            //File Validation
            $scope.ChechFileValid = function (file) {
                var isValid = false;
                if ($scope.SelectedFileForUpload != null) {
                    //&& file.size <= (512 * 1024)
                    if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif' || file.type == 'application/pdf' || file.type == 'application/msword' || file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ) {
                        $scope.FileInvalidMessage = "";
                        isValid = true;
                    }
                    else {
                        $scope.FileInvalidMessage = "Selected file is Invalid. (only file type png, jpeg and gif and 512 kb size allowed)";
                    }
                }
                else {
                    $scope.FileInvalidMessage = "Image required!";
                }
                $scope.IsFileValid = isValid;
            };
    
            //File Select event 
            $scope.selectFileforUpload = function (file) {
                $scope.SelectedFileForUpload = file[0];
            }
            //----------------------------------------------------------------------------------------

            //Save File
            $scope.SaveFile = function () {
                $scope.IsFormSubmitted = true;
                $scope.Message = "";
                $scope.ChechFileValid($scope.SelectedFileForUpload);
                if ($scope.IsFormValid && $scope.IsFileValid) {
                    FileUploadService.UploadFile($scope.SelectedFileForUpload, $scope.FileDescription).then(function (d) {
                        //alert(d.FileID);
                        $uibModalInstance.close(d);
                        ClearForm();
                    }, function (e) {
                        alert(e);
                    });
                }
                else {
                    $scope.Message = "All the fields are required.";
                }
            };
            //Clear form 
            function ClearForm() {
                $scope.FileDescription = "";
                //as 2 way binding not support for File input Type so we have to clear in this way
                //you can select based on your requirement
                angular.forEach(angular.element("input[type='file']"), function (inputElem) {
                    angular.element(inputElem).val(null);
                });

                $scope.f1.$setPristine();
                $scope.IsFormSubmitted = false;
            }

        })
.factory('FileUploadService', function ($http, $q) { // explained abour controller and service in part 2

    var fac = {};
    fac.UploadFile = function (file, description) {
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
    return fac;

});

}());