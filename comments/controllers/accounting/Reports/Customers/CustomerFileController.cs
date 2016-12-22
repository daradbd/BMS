using BMS.Models;
using BMS.Models.Purchase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BMS.Controllers.Accounting.Reports.Customers
{
    public class CustomerFileController : ApiController
    {
        private UsersContext db = new UsersContext();
        // GET api/customerfile
        public HttpResponseMessage Get()
        {
            var SupplierList = from SL in db.Collaborators.Where(c => c.IsCustomer == true).DefaultIfEmpty()
                               select new
                               {
                                   CollaboratorID = SL.CollaboratorID,
                                   Name = SL.Name,
                                   Category = SL.CustomerType.CustomerTypeName,
                                   BillAmount = db.SalesBills.Where(p => p.CustomerID == SL.CollaboratorID).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0),
                                   PendingBill = db.PurchaseBills.Where(p => p.SupplierID == SL.CollaboratorID && p.IsApproved == false).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0),
                                   ApproveBill = db.PurchaseBills.Where(p => p.SupplierID == SL.CollaboratorID && p.IsApproved == true).DefaultIfEmpty().Sum(b => b.GrandTotalApproved ?? 0),
                                   PaymentAmount = db.SalesReceivePayments.Where(b => b.CustomerID == SL.CollaboratorID).DefaultIfEmpty().Sum(b => b.PaymentTotal ?? 0),
                                   Balance = (db.SalesBills.Where(p => p.CustomerID == SL.CollaboratorID).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0) - db.SalesReceivePayments.Where(b => b.CustomerID == SL.CollaboratorID).DefaultIfEmpty().Sum(b => b.PaymentTotal ?? 0))
                               };

            //var OrderList = from ol in db.PurchaseOrders
            //                join pl in db.ProjectSetups on ol.ProjectID equals pl.ProjectID into odList
            //                from pol in odList.DefaultIfEmpty()
            //                select new
            //                {
            //                    OrderID=ol.PurchaseOrderID,
            //                    ProjectName = pol.ProjectName ?? "Others",
            //                    ProjectID = (long?)pol.ProjectID ?? 0,
            //                    PurchaseAmount = ol.GrandTotal
            //                };

            IEnumerable<PurchaseBill> PurBill = db.PurchaseBills.AsEnumerable();
            var PurchaseBills = (from pb in db.PurchaseBills
                                 join pl in db.ProjectSetups on pb.ProjectID equals pl.ProjectID into pbpl
                                 from bpl in pbpl.DefaultIfEmpty()
                                 select new
                                 {
                                     //Bill = pb,
                                     Project = bpl,
                                     BillAmount = (decimal)db.PurchaseBills.Where(p => p.SupplierID == pb.SupplierID && p.PurchaseBillID == pb.PurchaseBillID).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0),
                                     PendingBill = (decimal)db.PurchaseBills.Where(p => p.SupplierID == pb.SupplierID && p.IsApproved == false && p.PurchaseBillID == pb.PurchaseBillID).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0),
                                     ApproveBill = (decimal)db.PurchaseBills.Where(p => p.SupplierID == pb.SupplierID && p.IsApproved == true && p.PurchaseBillID == pb.PurchaseBillID).DefaultIfEmpty().Sum(b => b.GrandTotalApproved ?? 0),
                                     PaymentAmount = (decimal)0
                                 }).Union
                                (from pm in db.PurchaseBillPayments
                                 join pl in db.ProjectSetups on pm.ProjectID equals pl.ProjectID into pmpl
                                 from ppl in pmpl.DefaultIfEmpty()
                                 select new
                                 {
                                     Project = ppl,
                                     BillAmount = (decimal)0,
                                     PendingBill = (decimal)0,
                                     ApproveBill = (decimal)0,
                                     PaymentAmount = (decimal)db.PurchaseBillPayments.Where(b => b.SupplierID == pm.SupplierID && b.PurchaseBillPaymentID == pm.PurchaseBillPaymentID).DefaultIfEmpty().Sum(p => p.PaymentTotal)
                                 });


            var pbill = from br in PurchaseBills
                        group br by br.Project into g

                        select new
                        {
                            Project = g.Key,
                            BillAmount = g.Sum(x => x.BillAmount),
                            PendingBill = g.Sum(x => x.PendingBill),
                            ApproveBill = g.Sum(x => x.ApproveBill),
                            PaymentAmount = g.Sum(x => x.PaymentAmount),
                            Balance = g.Sum(x => x.ApproveBill) - g.Sum(x => x.PaymentAmount)
                        };

            // var SupplierSummery = PurchaseBills.Union(PurchasePayment);

            // var top25 = pbill.Take(25);
            return Request.CreateResponse(HttpStatusCode.OK, SupplierList.ToList());
        }

        // GET api/supplierfile/5
        public string Get(long id)
        {
            var OrderList = from ol in db.PurchaseOrders
                            join pl in db.ProjectSetups on ol.ProjectID equals pl.ProjectID into odList
                            from pol in odList.DefaultIfEmpty()
                            select new
                            {
                                ProjectName = pol.ProjectName,
                                PurchaseAmount = ol.GrandTotal
                            };


            return "value";
        }

        public HttpResponseMessage Get(long id, int ReportType)
        {
            List<object> result = new List<object>();

            var SalesBills = (from sb in db.SalesBills
                              where sb.CustomerID == id
                              join pl in db.ProjectSetups on sb.ProjectID equals pl.ProjectID
                              select new
                              {
                                  Project = pl,
                                  CustomerID = sb.CustomerID,
                                  BillAmount = (decimal)db.SalesBills.Where(s => s.CustomerID == sb.CustomerID && s.SalesBillID == sb.SalesBillID).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0),
                                  PendingBill = (decimal)0,
                                  ApproveBill = (decimal)0,
                                  PaymentAmount = (decimal)0
                              }).Union
                             (from sr in db.SalesReceivePayments
                              where sr.CustomerID == id
                              join pl in db.ProjectSetups on sr.ProjectID equals pl.ProjectID
                              select new {
                                  Project = pl,
                                  CustomerID = sr.CustomerID,
                                  BillAmount = (decimal)0,
                                  PendingBill = (decimal)0,
                                  ApproveBill = (decimal)0,
                                  PaymentAmount = (decimal)db.SalesReceivePayments.Where(p=>p.CustomerID == sr.CustomerID && p.SalesReceivePaymentID==sr.SalesReceivePaymentID).DefaultIfEmpty().Sum(p=>p.PaymentTotal??0)
                              });




            var pbill = from br in SalesBills
                        group br by br.Project into g

                        select new
                        {
                            Project = g.Key,
                            ProjectID = g.FirstOrDefault().Project.ProjectID,
                            SupplierID = g.FirstOrDefault().CustomerID,
                            BillAmount = g.Sum(x => x.BillAmount),
                            PendingBill = g.Sum(x => x.PendingBill),
                            ApproveBill = g.Sum(x => x.ApproveBill),
                            PaymentAmount = g.Sum(x => x.PaymentAmount),
                            Balance = g.Sum(x => x.ApproveBill) - g.Sum(x => x.PaymentAmount)
                        };



            return Request.CreateResponse(HttpStatusCode.OK, pbill.ToList());
        }

        public HttpResponseMessage Get(long id, long ProjectID, int ReportType)
        {
            List<object> result = new List<object>();

            var SalesBills = (from pb in db.SalesBills
                                        where pb.CustomerID == id && pb.ProjectID == ProjectID
                                        join pl in db.ProjectSetups on pb.ProjectID equals pl.ProjectID 
                                        select new
                                        {
                                            //Bill = pb,
                                            Project = pl,
                                            Discription = pb.Subject,
                                            SubmitDate = pb.Date,
                                            TranCode = pb.SalesBillCode,
                                            ReferenceNO = pb.ReferenceNo,
                                            BillAmount = (decimal)db.SalesBills.Where(p => p.CustomerID == pb.CustomerID && p.SalesBillID == pb.SalesBillID).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0),
                                            PendingBill = (decimal)0,
                                            ApproveBill = (decimal)0,
                                            PaymentAmount = (decimal)0
                                        }).Union
                                (from pm in db.SalesReceivePayments
                                 where pm.CustomerID == id && pm.ProjectID == ProjectID
                                 join pl in db.ProjectSetups on pm.ProjectID equals pl.ProjectID 
                                 select new
                                 {
                                     Project = pl,
                                     Discription = pm.Memo + pm.PaymentMethod.PaymentMethodName,
                                     SubmitDate = pm.Date,
                                     TranCode = pm.SalesReceivePaymentCode,
                                     ReferenceNO = pm.ChequeNO,
                                     BillAmount = (decimal)0,
                                     PendingBill = (decimal)0,
                                     ApproveBill = (decimal)0,
                                     PaymentAmount = (decimal)db.SalesReceivePayments.Where(b => b.CustomerID == pm.CustomerID && b.SalesReceivePaymentID == pm.SalesReceivePaymentID).DefaultIfEmpty().Sum(p => p.PaymentTotal)
                                 });


            return Request.CreateResponse(HttpStatusCode.OK, SalesBills.ToList());
        }

        // POST api/customerfile
        public void Post([FromBody]string value)
        {
        }

        // PUT api/customerfile/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/customerfile/5
        public void Delete(int id)
        {
        }
    }
}
