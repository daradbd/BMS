namespace BMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class solvequation : DbMigration
    {
        public override void Up()
        {
            //DropForeignKey("dbo.Sales_SalesQuotation", "CustomerID", "dbo.HR_Collaborator");
            //DropForeignKey("dbo.Sales_SalesQuotation", "ProcesStatusID", "dbo.Setting_ProcesStatus");
            //DropForeignKey("dbo.Sales_SalesQuotationDescription", "ProductID", "dbo.Inventory_Product");
            //DropIndex("dbo.Sales_SalesQuotation", new[] { "CustomerID" });
            //DropIndex("dbo.Sales_SalesQuotation", new[] { "ProcesStatusID" });
            //DropIndex("dbo.Sales_SalesQuotationDescription", new[] { "ProductID" });
            //DropTable("dbo.Sales_SalesQuotation");
            //DropTable("dbo.Sales_SalesQuotationDescription");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Sales_SalesQuotationDescription",
                c => new
                    {
                        SalesQuotationDescriptionID = c.Long(nullable: false, identity: true),
                        SalesQuotationDescriptionCode = c.String(maxLength: 50),
                        SalesQuotationID = c.Long(),
                        CustomerID = c.Long(),
                        SalesSectionID = c.Int(),
                        SalesSectionName = c.String(),
                        ProductID = c.Long(nullable: false),
                        Description = c.String(),
                        Quantity = c.Int(),
                        CostPrice = c.Decimal(precision: 18, scale: 2),
                        UnitPrice = c.Decimal(precision: 18, scale: 2),
                        Discount = c.Decimal(precision: 18, scale: 2),
                        Taxes = c.Decimal(precision: 18, scale: 2),
                        SubTotal = c.Decimal(precision: 18, scale: 2),
                        ScheduleDate = c.DateTime(),
                        CompanyBranchID = c.Long(),
                        CompanyID = c.Long(),
                        Remarks = c.String(maxLength: 250),
                        StatusID = c.Int(),
                        IsDeleted = c.Boolean(),
                        InsertBy = c.Int(),
                        InsertDate = c.DateTime(),
                        InsertPC = c.String(maxLength: 50),
                        UpdateBy = c.Int(),
                        UpdateDate = c.DateTime(),
                        UpdatePC = c.String(maxLength: 50),
                        DeleteBy = c.Int(),
                        DeleteDate = c.DateTime(),
                        DeletePC = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.SalesQuotationDescriptionID);
            
            CreateTable(
                "dbo.Sales_SalesQuotation",
                c => new
                    {
                        SalesQuotationID = c.Long(nullable: false, identity: true),
                        SalesQuotationCode = c.String(maxLength: 50),
                        CustomerID = c.Long(),
                        Date = c.DateTime(),
                        UnTaxedAmount = c.Decimal(precision: 18, scale: 2),
                        DiscountAmount = c.Decimal(precision: 18, scale: 2),
                        TaxAmount = c.Boolean(),
                        GrandTotal = c.Decimal(precision: 18, scale: 2),
                        SalesPersonID = c.Long(),
                        ReferenceID = c.Long(),
                        WareHouseID = c.Long(),
                        CompanyBranchID = c.Long(),
                        CompanyID = c.Long(),
                        Remarks = c.String(maxLength: 250),
                        ProcesStatusID = c.Long(),
                        StatusID = c.Int(),
                        IsDeleted = c.Boolean(),
                        InsertBy = c.Int(),
                        InsertDate = c.DateTime(),
                        InsertPC = c.String(maxLength: 50),
                        UpdateBy = c.Int(),
                        UpdateDate = c.DateTime(),
                        UpdatePC = c.String(maxLength: 50),
                        DeleteBy = c.Int(),
                        DeleteDate = c.DateTime(),
                        DeletePC = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.SalesQuotationID);
            
            CreateIndex("dbo.Sales_SalesQuotationDescription", "ProductID");
            CreateIndex("dbo.Sales_SalesQuotation", "ProcesStatusID");
            CreateIndex("dbo.Sales_SalesQuotation", "CustomerID");
            AddForeignKey("dbo.Sales_SalesQuotationDescription", "ProductID", "dbo.Inventory_Product", "ProductID", cascadeDelete: true);
            AddForeignKey("dbo.Sales_SalesQuotation", "ProcesStatusID", "dbo.Setting_ProcesStatus", "ProcesStatusID");
            AddForeignKey("dbo.Sales_SalesQuotation", "CustomerID", "dbo.HR_Collaborator", "CollaboratorID");
        }
    }
}
