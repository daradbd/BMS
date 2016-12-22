using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using BMS.Models.Accounting.Transaction;
using BMS.Models;
using System.Web.Http.OData.Query;
using BMS.Models.Accounting.Configuration.Accounts;



namespace BMS.Controllers.Accounting.Transaction
{
    public class LedgerSheetController : ApiController
    {
        private UsersContext db = new UsersContext();
        // GET api/ledgersheet
        public IEnumerable<AccCOA> Get()
        {
            //var result = Options.ApplyTo(db.VoucherLists.AsQueryable().Include(v => v.AccCOA).Include(v => v.AccCOA.AccType)) as IEnumerable<VoucherList>;

            //return Request.CreateResponse(HttpStatusCode.OK, result);

            return db.AccCOAs.Where(c => c.HasChild == false).Include(a=>a.AccType)  as IEnumerable<AccCOA>;
        }

        // GET api/ledgersheet/5
        public HttpResponseMessage Get(int id)
        {
            var voucherList = db.VoucherLists.Where(v => v.COAID == id).Select(v=>v.VoucherNo);
            var resultList = (from vl in db.VoucherLists.Where(a => a.AccCOA.HasChild == false && a.DrCr == true && a.COAID != id && voucherList.Contains(a.VoucherNo) && a.DrCr.HasValue).DefaultIfEmpty()
                          select new
                          {
                              VoucherID = (long?)vl.VoucherID,
                              Account = vl.AccCOA.COAName,
                              COAID = vl.COAID,
                              TranDate= vl.TranDate,
                              Debit =(decimal?)0.00,
                              Credit = (decimal?)vl.Amount,
                              Amount = (decimal?)vl.Amount * (-1),
                              bType = (bool?)vl.AccCOA.BalanceType

                          }).Concat
                     (from vl in db.VoucherLists.Where(a => a.AccCOA.HasChild == false && a.DrCr == false && a.COAID != id && voucherList.Contains(a.VoucherNo) && a.Amount > 0).DefaultIfEmpty()
                                 select new
                                 {
                                     VoucherID = (long?)vl.VoucherID,
                                     Account = vl.AccCOA.COAName,
                                    COAID= vl.COAID,
                                    TranDate= vl.TranDate,
                                     Debit = (decimal?)vl.Amount,
                                     Credit = (decimal?)0.00,
                                     Amount = (decimal?)vl.Amount,
                                     bType = (bool?)vl.AccCOA.BalanceType

                                 });
            //decimal currentTotal = 0;


            var query = from lg in resultList.Where(x=>x.COAID>0) orderby(lg.VoucherID)
                                   select new
                                   {


                                       lg.Account,
                                       lg.COAID,
                                       lg.TranDate,
                                       lg.Debit,
                                       lg.Credit,
                                       lg.Amount,
                                       lg.bType,
                                       balance=resultList.Where(b=>b.VoucherID<=lg.VoucherID ).Sum(a=>a.Amount)

                                   };

                             
                               

            //var result = drcr.GroupBy(c => c.COAID).Select(g => new { COAID = g.Key, Account = g.Select(a => a.Account).FirstOrDefault(), Debit = (g.Select(a => a.bType).FirstOrDefault() != true ? g.Sum(d => d.Debit) - g.Sum(c => c.Credit) : 0), Credit = (g.Select(a => a.bType).FirstOrDefault() != false ? g.Sum(c => c.Credit) - g.Sum(d => d.Debit) : 0) });

           // var result =from gledger in  drcr select(gledger);


            return Request.CreateResponse(HttpStatusCode.OK, query);
        }
        
        public HttpResponseMessage Get(long id, int ReportType)
        {
            decimal TotalCredit = (decimal)0.00;
            decimal TotalDeposit = (decimal)0.00;
            decimal Balance =(decimal)0.00;
           
            if(ReportType==1)
            {
                TotalCredit = db.VoucherLists.Where(v => v.COAID == id && v.DrCr == false).Sum(a => a.Amount).GetValueOrDefault();
                TotalDeposit = db.VoucherLists.Where(v => v.COAID == id && v.DrCr == true).Sum(a => a.Amount).GetValueOrDefault();
                Balance = TotalCredit - TotalDeposit;
                
              

            }
            else if (ReportType == 2)
            {
                TotalCredit = db.VoucherLists.Where(v => v.COAID == id && v.DrCr == false).Sum(a => a.Amount).GetValueOrDefault();
                TotalDeposit = db.VoucherLists.Where(v => v.COAID == id && v.DrCr == true).Sum(a => a.Amount).GetValueOrDefault();
                Balance = TotalDeposit-TotalCredit;
                 
                
            
            }
             decimal[] arr = { TotalCredit, TotalDeposit, Balance };
             return Request.CreateResponse(HttpStatusCode.OK, arr.ToList());
        }



        // POST api/ledgersheet
        public void Post([FromBody]string value)
        {

        }

        // PUT api/ledgersheet/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/ledgersheet/5
        public void Delete(int id)
        {
        }
    }
}
