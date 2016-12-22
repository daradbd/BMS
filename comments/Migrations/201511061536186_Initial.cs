namespace BMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            

            
            //CreateTable(
            //    "dbo.Production_ProductCostingDescription",
            //    c => new
            //        {
            //            ProductCostingDescriptionID = c.Long(nullable: false, identity: true),
            //            ProductCostingDescriptionCode = c.String(maxLength: 50),
            //            SalesQuotationID = c.Long(),
            //            CustomerID = c.Long(),
            //            SalesSectionID = c.Int(),
            //            SalesSectionName = c.String(),
            //            ProductID = c.Long(nullable: false),
            //            Description = c.String(),
            //            Quantity = c.Single(),
            //            UOMID = c.Long(),
            //            NetMaterials = c.Decimal(precision: 18, scale: 2),
            //            MaterialsWastage = c.Decimal(precision: 18, scale: 2),
            //            GrossMaterial = c.Decimal(precision: 18, scale: 2),
            //            LabourHrs = c.Single(),
            //            DirectLabour = c.Decimal(precision: 18, scale: 2),
            //            PrimeCost = c.Decimal(precision: 18, scale: 2),
            //            MOH = c.Decimal(precision: 18, scale: 2),
            //            Tranportation = c.Decimal(precision: 18, scale: 2),
            //            FactoryCost = c.Decimal(precision: 18, scale: 2),
            //            AdminOH = c.Decimal(precision: 18, scale: 2),
            //            CostofProduction = c.Decimal(precision: 18, scale: 2),
            //            SAndDOH = c.Decimal(precision: 18, scale: 2),
            //            CostofSales = c.Decimal(precision: 18, scale: 2),
            //            ProfitPersent = c.Decimal(precision: 18, scale: 2),
            //            Assembly = c.Decimal(precision: 18, scale: 2),
            //            SellingPricewithoutVAT = c.Decimal(precision: 18, scale: 2),
            //            VAT = c.Decimal(precision: 18, scale: 2),
            //            SellingPricewithVATPcs = c.Decimal(precision: 18, scale: 2),
            //            PromotionCost = c.Decimal(precision: 18, scale: 2),
            //            ApprovedPricePcs = c.Decimal(precision: 18, scale: 2),
            //            FinalMRP = c.Decimal(precision: 18, scale: 2),
            //            ScheduleDate = c.DateTime(),
            //            CompanyBranchID = c.Long(),
            //            CompanyID = c.Long(),
            //            Remarks = c.String(maxLength: 250),
            //            StatusID = c.Int(),
            //            IsDeleted = c.Boolean(),
            //            InsertBy = c.Int(),
            //            InsertDate = c.DateTime(),
            //            InsertPC = c.String(maxLength: 50),
            //            UpdateBy = c.Int(),
            //            UpdateDate = c.DateTime(),
            //            UpdatePC = c.String(maxLength: 50),
            //            DeleteBy = c.Int(),
            //            DeleteDate = c.DateTime(),
            //            DeletePC = c.String(maxLength: 50),
            //        })
            //    .PrimaryKey(t => t.ProductCostingDescriptionID);
            
           
            
        }
        
        public override void Down()
        {
          
        }
    }
}
