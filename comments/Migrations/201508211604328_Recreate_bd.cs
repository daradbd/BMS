namespace BMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Recreate_bd : DbMigration
    {
        public override void Up()
        {
            //DropForeignKey("dbo.Sales_SalesQuotationDescription", "Section_SalesSectionID", "dbo.Sales_SalesSection");
            //DropIndex("dbo.Sales_SalesQuotationDescription", new[] { "Section_SalesSectionID" });
            ////AddColumn("dbo.Sales_SalesQuotationDescription", "SalesSectionID", c => c.Long());
            //DropColumn("dbo.Sales_SalesQuotationDescription", "SectionID");
            //DropColumn("dbo.Sales_SalesQuotationDescription", "Section_SalesSectionID");
            //DropTable("Sales_SalesQuotation");
            //DropTable("Sales_SalesQuotationDescription");
        }
        
        public override void Down()
        {
            //AddColumn("dbo.Sales_SalesQuotationDescription", "Section_SalesSectionID", c => c.Long());
            //AddColumn("dbo.Sales_SalesQuotationDescription", "SectionID", c => c.Int());
            //DropColumn("dbo.Sales_SalesQuotationDescription", "SalesSectionID");
            //CreateIndex("dbo.Sales_SalesQuotationDescription", "Section_SalesSectionID");
            //AddForeignKey("dbo.Sales_SalesQuotationDescription", "Section_SalesSectionID", "dbo.Sales_SalesSection", "SalesSectionID");
        }
    }
}
