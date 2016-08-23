(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (salesQuotationresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesQuotationResource
     *  @date: 29/4/2015
     */

    angular
        .module("companyManagement")
        .controller("salesQuotationCtrl", ["salesQuotationCategoryResource", "unitOfMeasureResource", "Util", "billofMaterialResource", "salesOrderResource", "salesQuotationDescriptionResource", "productResource", "collaboratorResource", "salesQuotationResource", "$uibModal", "appAuth", salesQuotationCtrl]);
    function salesQuotationCtrl(salesQuotationCategoryResource,unitOfMeasureResource, Util, billofMaterialResource, salesOrderResource, salesQuotationDescriptionResource, productResource, collaboratorResource, salesQuotationResource, $uibModal, appAuth) {

        var vm = this;
        vm.Totaltax = 0.00;
        vm.TotlaDiscount = 0.00;
        vm.GTotal = 0.00;
        vm.Shipping = 0.00;


        vm.salesQuotations = [];
        vm.salesQuotationDescriptionItem = [];
        vm.collaborators = [];
        vm.products = [];
        appAuth.checkPermission();
        vm.isLoad = true;
       // vm.salesQuotation.TaxAmount = 0.00;
        vm.SalesQuotationDescription = { salesQuotationDesc: [{ SalesSectionID: 1, SalesSectionName: '' ,ProductID: 0, Description: "",MOUID:0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };
       // vm.MaxIndex2 =$filter('max')(vm.SalesQuotationDescription.salesQuotationDesc, 'SalesSection.SNID');
        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = false
        vm.EditView = false;

        // Action Button Control Variable //
        vm.SaveButton = false;
        vm.EditButton = false;
        vm.UpdateButton = false;
        vm.DeleteButton = false;
        vm.CancelButton = false;
        vm.BOMRequestButton = false;
        vm.ImportToExcelButton = false;

        vm.addItem = function (SalesSectionID, SalesSectionName) {
            
            vm.SalesQuotationDescription.salesQuotationDesc.unshift({ SalesSectionID: SalesSectionID,SalesSectionName: SalesSectionName, ProductID: 0, Description: "",MOUID:0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.PushItem = function (SalesSectionID, SalesSectionName) {
            
            vm.SalesQuotationDescription.salesQuotationDesc.push({ SalesSectionID: SalesSectionID,  SalesSectionName: SalesSectionName, ProductID: 0, Description: "",MOUID:0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.removeItem = function (item) {
            if (item.SalesQuotationDescriptionID>0)
            {
                vm.salesQuotationDescriptionItem = item;
                vm.DeleteDescription(item.SalesQuotationDescriptionID);
            }
            vm.SalesQuotationDescription.salesQuotationDesc.splice(vm.SalesQuotationDescription.salesQuotationDesc.indexOf(item), 1);
        }
        vm.updateItem = function (item) {
            item.Description = item.cmbProductID.ProductName;
            //item.ProductID = item.cmbProductID.ProductID;
            item.ProductID = item.cmbProductID.ProductID;
            item.UnitPrice = item.cmbProductID.SalePrice;
        }

        vm.SubTotal = function (item) {
            return ((item.UnitPrice) * item.Quantity);
        }

        vm.sopen = function (item,$event) {
            $event.preventDefault();
            $event.stopPropagation();

            item.sopened = !item.sopened;

        }
        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }
        vm.QuotationSubTotal = function () {
            var total = 0.00;
            var Totaltax = 0.00;
            var TotlaDiscount = 0.00;
          //  vm.salesQuotation.TaxAmount = 0.00;
            angular.forEach(vm.SalesQuotationDescription.salesQuotationDesc, function (item, key) {
                total += (item.Quantity * (item.UnitPrice));
                if (item.Taxes > 0)
                {
                    Totaltax += ((item.Quantity * (item.UnitPrice - item.Discount)) * (item.Taxes) * 0.01);
                    
                }
                if (item.Discount>0) {
                    TotlaDiscount += (item.Quantity * item.Discount);
                }
               
            });
            vm.Totaltax = Totaltax;
            vm.TotlaDiscount = TotlaDiscount;
            vm.GTotal = (total + vm.Totaltax + vm.Shipping) - vm.TotlaDiscount;
            return total;
        }

        vm.SectionSubTotal = function (SectionID) {
            var total = 0.00;
            
            angular.forEach(vm.SalesQuotationDescription.salesQuotationDesc, function (item, key) {
                if (item.SalesSectionID == SectionID)
                {
                     total += (item.Quantity * (item.UnitPrice));
                }
               
            });
            return total;
        }


        vm.UpdateSectionName = function (SectionID, SalesSectionName) {
            angular.forEach(vm.SalesQuotationDescription.salesQuotationDesc, function (item, key) {
                if (item.SalesSectionID == SectionID)
                {
                    item.SalesSectionName = SalesSectionName;
                }
               
            });

        }


        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.salesQuotation = null;
                vm.cmbCustomer = null;
                vm.SalesQuotationDescription = { salesQuotationDesc: [{ SalesSectionID: 1, SalesSectionName: '', ProductID: 0, Description: "", MOUID: 0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = true;
                vm.SentToOrderButton = false;
                vm.ImportToExcelButton = false;
            }
            if (activeMode == 2) //List View Mode
            {
                vm.FromView = false;
                vm.ListView = true;
                vm.DetailsView = false
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = false;
                vm.SentToOrderButton = false;
                vm.ImportToExcelButton = false;
            }

            if (activeMode == 3)//Details View Mode
            {
                vm.FromView = false;
                vm.ListView = false;
                vm.DetailsView = true
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = (vm.salesQuotation.ProcesStatusID == 12 ? true : false);
                vm.UpdateButton = false;
                vm.DeleteButton = (vm.salesQuotation.ProcesStatusID == 12 ? true : false);
                vm.CancelButton = true;
                vm.SentToOrderButton = (vm.salesQuotation.ProcesStatusID == 12 ? true : false);
                vm.ImportToExcelButton = true;
            }
            if (activeMode == 4)//Edit View Mode
            {
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false
                vm.EditView = true;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = (vm.salesQuotation.ProcesStatusID == 12 ? true : false);
                vm.DeleteButton = (vm.salesQuotation.ProcesStatusID == 12 ? true : false);
                vm.CancelButton = true;
                vm.BOMRequestButton = true;
                vm.SentToOrderButton = false;
                vm.ImportToExcelButton = false;
            }
        }

        var DispayButton = function () {

        }

        vm.UpdatePercentage = function (Value, KeyName) {
            angular.forEach(vm.SalesQuotationDescription.salesQuotationDesc, function (item, key) {

                item[KeyName] = Value;


            });

        }
        vm.UpdateDiscount = function (Value, KeyName) {
            angular.forEach(vm.SalesQuotationDescription.salesQuotationDesc, function (item, key) {

                item[KeyName] = item.UnitPrice  * Value*0.01;


            });

        }
        vm.ShowProductForm = function (item) {
                 var ProductForm=   $uibModal.open({
                        templateUrl: "app/Inventory/Product/product.html",
                        size: 'lg',
                        controller: "productModalCtrl as vm"
                 });
                 ProductForm.result.then(function (selectedItem) {
                    // vm.isLoad = true;
                     productResource.query().$promise.then(function (data) {
                         vm.products = data;
                         //toastr.success("Data Load Successful", "Form Load");
                         item.cmbProductID = selectedItem;
                        // vm.isLoad = false;
                     }, function (error) {
                         // error handler
                         toastr.error("Data Load Failed!");
                     });

                 });
                }


        vm.ShowUOMForm = function (item) {
            $uibModal.open({
                templateUrl: "app/Inventory/Product/unitOfMeasure.html",
                size: 'lg',
                controller: "unitOfMeasureCtrl as vm"
            });
        }
        vm.ShowCustomerForm = function () {

            var CustomerForm=$uibModal.open({
                templateUrl: "app/HR/customer.html",
                size: 'lg',
                controller: "customerModalCtrl as vm",
                resolve: {
                    customerFormData: function () {
                        return {
                            FormMode: function () {
                                return 2;
                            }


                        };
                    }
                },
            });

            CustomerForm.result.then(function (selectedItem) {
                vm.isLoad = true;
                collaboratorResource.query({ '$filter': 'IsCustomer eq true' }).$promise.then(function (data) {

                    vm.collaborators = data;
                    //toastr.success("Data Load Successful", "Form Load");
                    vm.cmbCustomer = selectedItem;
                    vm.isLoad = false;
                }, function (error) {
                    // error handler
                    toastr.error("Data Load Failed!");
                });
                
            });
        }

        GetSalesQuotationCateagorys();
        function GetSalesQuotationCateagorys() {
            salesQuotationCategoryResource.query().$promise.then(function (data) {
                vm.salesQuotationCategorys = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetUnitOfMeasures();
        function GetUnitOfMeasures() {
            unitOfMeasureResource.query().$promise.then(function (data) {
                vm.UnitOfMeasures = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetProductList();
        //Get All Data List
        function GetProductList() {
            productResource.query({ '$filter': 'IsRawmaterial eq false' }).$promise.then(function (data) {
                vm.products = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetCustomerList();
        //Get All Data List
        function GetCustomerList() {
            collaboratorResource.query({ '$filter': 'IsCustomer eq true' }).$promise.then(function (data) {
                vm.collaborators = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            salesQuotationResource.query().$promise.then(function (data) {
                vm.isLoad = true;
                vm.salesQuotations = data;
                //toastr.success("Data Load Successful", "Form Load");
                vm.isLoad = false;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save salesQuotation
        vm.Save = function (isValid) {
            if (isValid) {
                vm.isLoad = true;
                vm.salesQuotation.ProcesStatusID = 12;
                vm.salesQuotation.Date = Util.offsetTime(vm.salesQuotation.Date);
                vm.salesQuotation.TaxAmount = vm.Totaltax;
                vm.salesQuotation.DiscountAmount = vm.TotlaDiscount;
                vm.salesQuotation.GrandTotal = vm.GTotal;
                vm.salesQuotation.Shipping = vm.Shipping;
                salesQuotationResource.save(vm.salesQuotation).$promise.then(
                    function (data, responseHeaders) {
                       // GetList();
                        vm.salesQuotation = data;
                        vm.SaveQuotation();
                        vm.ViewMode(2);
                        toastr.success("Save Successful");
                        vm.isLoad = false;
                    }, function (error) {
                        // error handler
                        toastr.error("Data Save Failed!");
                        vm.isLoad = false;
                    });
            }
            else {

                toastr.error("Form is not valid");
                vm.isLoad = false;
            }


        }

        vm.SentToOrder = function () {

            if (vm.salesQuotation != null) {
                vm.isLoad = true;
                var requestForOrder = {
                    SalesQuotationID: vm.salesQuotation.SalesQuotationID,
                    SalesQuotationCode: vm.salesQuotation.SalesQuotationCode,
                    CustomerID: vm.salesQuotation.CustomerID,
                    Date: vm.salesQuotation.Date,
                    DiscountAmount: vm.salesQuotation.DiscountAmount,
                    TaxAmount: vm.salesQuotation.TaxAmount,
                    GrandTotal: vm.salesQuotation.GrandTotal,
                    SalesPersonID:vm.salesQuotation.SalesPersonID,
                    ProcesStatusID: 14,
                };
                salesOrderResource.save(requestForOrder).$promise.then(
                        function (data, responseHeaders) {
                            vm.requestForOrder = data;
                            vm.salesQuotation.ProcesStatusID =12;
                            vm.Update(true);
                            toastr.success("Sent to Order Successful");
                            vm.isLoad = false;
                        }, function (error) {
                            // error handler
                            toastr.error("Data Load Failed!");
                        });
            }
            else {

                toastr.error("Form is not valid");
                vm.isLoad = false;
            }

        }

        //Save Quotation Description
        vm.SaveQuotation = function () {
            
                angular.forEach(vm.SalesQuotationDescription.salesQuotationDesc, function (value, key) {
                   // var TDate = new Date(vm.voucherList.TranDate);
                    vm.isLoad = true;
                    var salesQuotationInfo = {
                        SalesQuotationDescriptionID: value.SalesQuotationDescriptionID,
                        SalesQuotationID: vm.salesQuotation.SalesQuotationID,
                        CustomerID: vm.salesQuotation.CustomerID,
                        ProductID: value.ProductID,
                        Description: value.Description,
                        Quantity: value.Quantity,
                        UOMID: value.UOMID,
                        UnitPrice: value.UnitPrice,
                        Taxes: value.Taxes,
                        SalesSectionID: value.SalesSectionID,
                       // ScheduleDate: value.ScheduleDate,
                        Discount: value.Discount,
                        SalesSectionName: value.SalesSectionName,


                    };
                    //alert(angular.toJson(VoucherInfo));
                    //alert(value.COAID);
                    //vm.voucherList.COAID = value.COAID;
                    //vm.voucherList.Amount = value.Amount;
                    //vm.voucherList.DrCr = value.DrCr;

                    salesQuotationDescriptionResource.save(salesQuotationInfo).$promise.then(
                    function (data, responseHeaders) {
                        vm.isLoad = false;
                    }, function (error) {
                        // error handler
                        toastr.error("Data Save Failed!");
                        vm.isLoad = false;
                    });
                })


        }


        vm.SaveBOMRequest = function () {
            vm.isLoad = true;
            var BOMRequest = {
                SalesQuotationID: vm.salesQuotation.SalesQuotationID,
                IsMRP:false,
                CustomerID: vm.salesQuotation.CustomerID,
            };
            billofMaterialResource.save(BOMRequest).$promise.then(
                   function (data, responseHeaders) {
                       vm.ViewMode(2);
                       toastr.success("BOM Request Successful Send", "Form Load");
                       vm.isLoad = false;
                   }, function (error) {
                       // error handler
                       toastr.error("Data Save Failed!");
                       vm.isLoad = false;
                   });

        }

        //Get Single Record
        vm.Get = function (id) {
            vm.isLoad = true;
            salesQuotationResource.get({ 'ID': id }).$promise.then(function (salesQuotation) {
                vm.salesQuotation = salesQuotation;
                vm.Shipping = vm.salesQuotation.Shipping;
                vm.cmbCustomer = vm.salesQuotation.Collaborator; //{ CollaboratorID: vm.salesQuotation.CustomerID }
                vm.GetSalesQuotationDescription(vm.salesQuotation.SalesQuotationID);
                vm.ViewMode(3);
               // toastr.success("Data Load Successful", "Form Load");
                vm.isLoad = false;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetSalesQuotationDescription = function (salesQuotationID) {
            vm.isLoad = true;
            salesQuotationDescriptionResource.query({ '$filter': 'SalesQuotationID eq ' + salesQuotationID }).$promise.then(function (data) {
                vm.SalesQuotationDescription.salesQuotationDesc = data;
               // toastr.success("Data function Load Successful", "Form Load");
                vm.isLoad = false;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }
        //Data Update
        vm.Update = function (isValid) {
            vm.isLoad = true;
            vm.salesQuotation.Date = Util.offsetTime(vm.salesQuotation.Date);
            vm.salesQuotation.TaxAmount = vm.Totaltax;
            vm.salesQuotation.DiscountAmount = vm.TotlaDiscount;
            vm.salesQuotation.Shipping = vm.Shipping;
            vm.salesQuotation.GrandTotal = vm.GTotal;
            if (isValid) {
                salesQuotationResource.update({ 'ID': vm.salesQuotation.SalesQuotationID }, vm.salesQuotation).$promise.then(function () {
                vm.SaveQuotation();
                vm.salesQuotations = null;
                GetList();
                vm.ViewMode(2);
                toastr.success("Data Update Successful", "Form Update");
                vm.isLoad = false;
                }, function (error) {
                    // error handler
                    toastr.error("Data Update Failed!");
                    vm.isLoad = false;
                });
                }
            else {
                toastr.error("Form is not valid");
            }
        }
        //Data Delete
        vm.DeleteDescription = function (SalesQuotationDescriptionID) {
            vm.isLoad = true;
           // vm.salesQuotationDescriptionItem.$delete({ 'ID': SalesQuotationDescriptionID });
            salesQuotationDescriptionResource.delete({ 'ID':SalesQuotationDescriptionID  }).$promise.then(function (data) {
                // success handler
                vm.ViewMode(2);
                toastr.success("Data Delete Successfully!");
                GetList();
                vm.isLoad = false;
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
                vm.isLoad = false;
            });
        }
        //Data Delete
        vm.Delete = function () {
            // vm.salesQuotation.$delete({ 'ID': vm.salesQuotation.SalesQuotationID });
            vm.isLoad = true;
            salesQuotationResource.delete({ 'ID': vm.salesQuotation.SalesQuotationID }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                GetList();
                vm.isLoad = false;
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
                vm.isLoad = false;
            });
        }

    }

}());