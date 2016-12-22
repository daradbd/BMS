using BMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BMS.Models.Project;
using BMS.Models.Purchase;

namespace BMS.Controllers.Accounting.Reports.Suppliers
{
    public class SupplierFileController : ApiController
    {
        private UsersContext db = new UsersContext();
        // GET api/supplierfile
        public HttpResponseMessage Get()
        {
            var SupplierList = from SL in db.Collaborators.Where(c => c.IsSupplier == true).DefaultIfEmpty()
                               select new
                               {
                                   CollaboratorID=SL.CollaboratorID,
                                   Name = SL.Name,
                                   Category = SL.SupplierType.SupplierTypeName,
                                   BillAmount=db.PurchaseBills.Where(p=>p.SupplierID==SL.CollaboratorID).DefaultIfEmpty().Sum(b=>b.GrandTotal ?? 0),
                                   PendingBill = db.PurchaseBills.Where(p => p.SupplierID == SL.CollaboratorID && p.IsApproved == false).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0),
                                   ApproveBill =db.PurchaseBills.Where(p=>p.SupplierID==SL.CollaboratorID && p.IsApproved==true).DefaultIfEmpty().Sum(b=>b.GrandTotalApproved ?? 0),
                                   PaymentAmount=db.PurchaseBillPayments.Where(b=>b.SupplierID==SL.CollaboratorID).DefaultIfEmpty().Sum(b=>b.PaymentTotal??0),
                                   Balance = (db.PurchaseBills.Where(p => p.SupplierID == SL.CollaboratorID && p.IsApproved == true).DefaultIfEmpty().Sum(b => b.GrandTotalApproved ?? 0) - db.PurchaseBillPayments.Where(b => b.SupplierID == SL.CollaboratorID).DefaultIfEmpty().Sum(b => b.PaymentTotal ?? 0))
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
                                      BillAmount =(decimal) 0,
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
            List<object> result=new List<object>();

            var PurchaseBills = (from pb in db.PurchaseBills where pb.SupplierID==id
                                 join pl in db.ProjectSetups on pb.ProjectID equals pl.ProjectID into pbpl
                                 from bpl in pbpl.DefaultIfEmpty()
                                 select new
                                 {
                                     //Bill = pb,
                                     Project = bpl,
                                     SupplierID=pb.SupplierID,
                                     BillAmount = (decimal)db.PurchaseBills.Where(p => p.SupplierID == pb.SupplierID && p.PurchaseBillID == pb.PurchaseBillID).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0),
                                     PendingBill = (decimal)db.PurchaseBills.Where(p => p.SupplierID == pb.SupplierID && p.IsApproved == false && p.PurchaseBillID == pb.PurchaseBillID).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0),
                                     ApproveBill = (decimal)db.PurchaseBills.Where(p => p.SupplierID == pb.SupplierID && p.IsApproved == true && p.PurchaseBillID == pb.PurchaseBillID).DefaultIfEmpty().Sum(b => b.GrandTotalApproved ?? 0),
                                     PaymentAmount = (decimal)0
                                 }).Union
                                (from pm in db.PurchaseBillPayments where pm.SupplierID==id
                                 join pl in db.ProjectSetups on pm.ProjectID equals pl.ProjectID into pmpl
                                 from ppl in pmpl.DefaultIfEmpty()
                                 select new
                                 {
                                     Project = ppl,
                                     SupplierID = pm.SupplierID,
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
                            ProjectID=g.FirstOrDefault().Project.ProjectID,
                            SupplierID = g.FirstOrDefault().SupplierID,
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

            var PurchaseProjectBills = (from pb in db.PurchaseBills
                                 where pb.SupplierID == id && pb.ProjectID == ProjectID
                                 join pl in db.ProjectSetups on pb.ProjectID equals pl.ProjectID into pbpl
                                 from bpl in pbpl.DefaultIfEmpty()
                                 select new
                                 {
                                     //Bill = pb,
                                     Project = bpl,
                                     Discription=pb.Subject,
                                     SubmitDate = pb.Date,
                                     TranCode=pb.PurchaseBillCode,
                                     ReferenceNO=pb.ReferenceNo,
                                     BillAmount = (decimal)db.PurchaseBills.Where(p => p.SupplierID == pb.SupplierID && p.PurchaseBillID == pb.PurchaseBillID).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0),
                                     PendingBill = (decimal)db.PurchaseBills.Where(p => p.SupplierID == pb.SupplierID && p.IsApproved == false && p.PurchaseBillID == pb.PurchaseBillID).DefaultIfEmpty().Sum(b => b.GrandTotal ?? 0),
                                     ApproveBill = (decimal)db.PurchaseBills.Where(p => p.SupplierID == pb.SupplierID && p.IsApproved == true && p.PurchaseBillID == pb.PurchaseBillID).DefaultIfEmpty().Sum(b => b.GrandTotalApproved ?? 0),
                                     PaymentAmount = (decimal)0
                                 }).Union
                                (from pm in db.PurchaseBillPayments
                                 where pm.SupplierID == id && pm.ProjectID == ProjectID
                                 join pl in db.ProjectSetups on pm.ProjectID equals pl.ProjectID into pmpl
                                 from ppl in pmpl.DefaultIfEmpty()
                                 select new
                                 {
                                     Project = ppl,
                                     Discription = pm.Memo+ pm.PaymentMethod.PaymentMethodName,
                                     SubmitDate=pm.Date,
                                     TranCode=pm.PurchaseBillPaymentCode,
                                     ReferenceNO=pm.ChequeNO,
                                     BillAmount = (decimal)0,
                                     PendingBill = (decimal)0,
                                     ApproveBill = (decimal)0,
                                     PaymentAmount = (decimal)db.PurchaseBillPayments.Where(b => b.SupplierID == pm.SupplierID && b.PurchaseBillPaymentID == pm.PurchaseBillPaymentID).DefaultIfEmpty().Sum(p => p.PaymentTotal)
                                 });


            return Request.CreateResponse(HttpStatusCode.OK, PurchaseProjectBills.ToList());
        }

        
        // POST api/supplierfile
        public void Post([FromBody]string value)
        {
        }

        // PUT api/supplierfile/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/supplierfile/5
        public void Delete(int id)
        {
        }
    }
}
