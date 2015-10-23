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
        .controller("salesQuotationCtrl", ["unitOfMeasureResource", "Util", "billofMaterialResource", "salesOrderResource", "salesQuotationDescriptionResource", "productResource", "collaboratorResource", "salesQuotationResource", salesQuotationCtrl]);
    function salesQuotationCtrl(unitOfMeasureResource, Util,billofMaterialResource, salesOrderResource, salesQuotationDescriptionResource, productResource, collaboratorResource, salesQuotationResource) {
        var vm = this;
        vm.salesQuotations = [];
        
        vm.collaborators = [];
        vm.products = [];
       
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
        vm.BOMRequestButton = false;
        vm.ImportToExcelButton = false;

        vm.addItem = function (SalesSectionID, SalesSectionName) {
            
            vm.SalesQuotationDescription.salesQuotationDesc.unshift({ SalesSectionID: SalesSectionID,SalesSectionName: SalesSectionName, ProductID: 0, Description: "",MOUID:0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.PushItem = function (SalesSectionID, SalesSectionName) {
            
            vm.SalesQuotationDescription.salesQuotationDesc.push({ SalesSectionID: SalesSectionID,  SalesSectionName: SalesSectionName, ProductID: 0, Description: "",MOUID:0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.removeItem = function (item) {
            vm.SalesQuotationDescription.salesQuotationDesc.splice(vm.SalesQuotationDescription.salesQuotationDesc.indexOf(item), 1);
        }
        vm.updateItem = function (item) {
            item.Description = item.cmbProductID.ProductName;
            //item.ProductID = item.cmbProductID.ProductID;
            item.ProductID = item.cmbProductID.ProductID;
            item.UnitPrice = item.cmbProductID.SalePrice;
        }

        vm.SubTotal = function (item) {
            return ((item.UnitPrice - item.Discount) * item.Quantity);
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
            var total=0.00;
            angular.forEach(vm.SalesQuotationDescription.salesQuotationDesc, function (item, key) {
                total += (item.Quantity * (item.UnitPrice - item.Discount));
            });
            return total;
        }

        vm.SectionSubTotal = function (SectionID) {
            var total = 0.00;
            angular.forEach(vm.SalesQuotationDescription.salesQuotationDesc, function (item, key) {
                if (item.SalesSectionID == SectionID)
                {
                     total += (item.Quantity * (item.UnitPrice - item.Discount));
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
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
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
                vm.BOMRequestButton = true;
                vm.SentToOrderButton = false;
                vm.ImportToExcelButton = false;
            }
        }

        var DispayButton = function () {

        }

        GetUnitOfMeasures();
        function GetUnitOfMeasures() {
            unitOfMeasureResource.query(function (data) {
                vm.UnitOfMeasures = data;

            });
        }

        GetProductList();
        //Get All Data List
        function GetProductList() {
            productResource.query(function (data) {
                vm.products = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetCustomerList();
        //Get All Data List
        function GetCustomerList() {
            collaboratorResource.query({ '$filter': 'IsCustomer eq true' }, function (data) {
                vm.collaborators = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            salesQuotationResource.query(function (data) {
                vm.salesQuotations = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save salesQuotation
        vm.Save = function (isValid) {
            if (isValid) {
                vm.salesQuotation.ProcesStatusID = 12;
                vm.salesQuotation.Date = Util.offsetTime(vm.salesQuotation.Date);
                salesQuotationResource.save(vm.salesQuotation,
                    function (data, responseHeaders) {
                        GetList();
                        vm.salesQuotation = data;
                        vm.SaveQuotation();
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        vm.SentToOrder = function () {

            if (vm.salesQuotation != null) {

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
                salesOrderResource.save(requestForOrder,
                        function (data, responseHeaders) {
                            vm.requestForOrder = data;
                            vm.salesQuotation.ProcesStatusID =12;
                            vm.Update(true);
                            toastr.success("Save Successful");
                        });
            }
            else {

                toastr.error("Form is not valid");
            }

        }

        //Save Quotation Description
        vm.SaveQuotation = function () {
            
                angular.forEach(vm.SalesQuotationDescription.salesQuotationDesc, function (value, key) {
                   // var TDate = new Date(vm.voucherList.TranDate);

                    var salesQuotationInfo = {
                        SalesQuotationDescriptionID: value.SalesQuotationDescriptionID,
                        SalesQuotationID: vm.salesQuotation.SalesQuotationID,
                        CustomerID: vm.salesQuotation.CustomerID,
                        ProductID: value.ProductID,
                        Description: value.Description,
                        Quantity: value.Quantity,
                        MOUID:value.MOUID,
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

                    salesQuotationDescriptionResource.save(salesQuotationInfo,
                    function (data, responseHeaders) {
                       
                    });
                })


        }


        vm.SaveBOMRequest = function () {

            var BOMRequest = {
                SalesQuotationID: vm.salesQuotation.SalesQuotationID,
                IsMRP:false,
                CustomerID: vm.salesQuotation.CustomerID,
            };
            billofMaterialResource.save(BOMRequest,
                   function (data, responseHeaders) {
                       vm.ViewMode(3);
                       toastr.success("BOM Request Successful Send", "Form Load");
                   });

        }

        //Get Single Record
        vm.Get = function (id) {
            salesQuotationResource.get({ 'ID': id }, function (salesQuotation) {
                
                vm.salesQuotation = salesQuotation;

                vm.cmbCustomer = vm.salesQuotation.Collaborator; //{ CollaboratorID: vm.salesQuotation.CustomerID }
                vm.GetSalesQuotationDescription(vm.salesQuotation.SalesQuotationID);
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }

        vm.GetSalesQuotationDescription = function (salesQuotationID) {

            salesQuotationDescriptionResource.query({ '$filter': 'SalesQuotationID eq ' + salesQuotationID }, function (data) {
                vm.SalesQuotationDescription.salesQuotationDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            })
        }
        //Data Update
        vm.Update = function (isValid) {
            vm.salesQuotation.Date = Util.offsetTime(vm.salesQuotation.Date);
            if (isValid) {
                salesQuotationResource.update({ 'ID': vm.salesQuotation.SalesQuotationID }, vm.salesQuotation);
                vm.SaveQuotation();
                vm.salesQuotations = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
            }
            else {
                toastr.error("Form is not valid");
            }
        }

        //Data Delete
        vm.Delete = function () {
            vm.salesQuotation.$delete({ 'ID': vm.salesQuotation.SalesQuotationID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());