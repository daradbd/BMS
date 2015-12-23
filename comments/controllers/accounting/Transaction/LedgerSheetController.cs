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
        private LoginUser loginUser = new LoginUser();
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
            var resultList = (from vl in db.VoucherLists.Where(a => a.AccCOA.HasChild == false && a.DrCr == true && a.COAID!=id && voucherList.Contains(a.VoucherNo)).DefaultIfEmpty()
                          select new
                          {
                              VoucherID=vl.VoucherID,
                              Account = vl.AccCOA.COAName,
                              COAID=vl.COAID,
                              TranDate= vl.TranDate,
                              Debit = (decimal)0.00,
                              Credit = (decimal)vl.Amount,
                              Amount=(decimal)vl.Amount*(-1),
                              bType = (bool)vl.AccCOA.BalanceType

                          }).Concat
                     (from vl in db.VoucherLists.Where(a => a.AccCOA.HasChild == false && a.DrCr == false && a.COAID != id && voucherList.Contains(a.VoucherNo)).DefaultIfEmpty()
                                 select new
                                 {
                                     VoucherID=vl.VoucherID,
                                     Account = vl.AccCOA.COAName,
                                    COAID= vl.COAID,
                                    TranDate= vl.TranDate,
                                     Debit = (decimal)vl.Amount,
                                     Credit = (decimal)0.00,
                                     Amount = (decimal)vl.Amount,
                                     bType = (bool)vl.AccCOA.BalanceType

                                 });
            //decimal currentTotal = 0;


            var query = from lg in resultList orderby(lg.VoucherID)
                                   select new
                                   {


                                       lg.Account,
                                       lg.COAID,
                                       lg.TranDate,
                                       lg.Debit,
                                       lg.Credit,
                                       lg.Amount,
                                       lg.bType,
                                       balance=resultList.Where(b=>b.VoucherID<=lg.VoucherID).Sum(a=>a.Amount)

                                   };

                             
                               

            //var result = drcr.GroupBy(c => c.COAID).Select(g => new { COAID = g.Key, Account = g.Select(a => a.Account).FirstOrDefault(), Debit = (g.Select(a => a.bType).FirstOrDefault() != true ? g.Sum(d => d.Debit) - g.Sum(c => c.Credit) : 0), Credit = (g.Select(a => a.bType).FirstOrDefault() != false ? g.Sum(c => c.Credit) - g.Sum(d => d.Debit) : 0) });

           // var result =from gledger in  drcr select(gledger);


            return Request.CreateResponse(HttpStatusCode.OK, query);
        }

        public HttpResponseMessage Get(int id, string name,int ReportType)
        {

            string[] result={"1","2","3","4","5","6","7","8","98"};
            return Request.CreateResponse(HttpStatusCode.OK, result.ToList());
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
