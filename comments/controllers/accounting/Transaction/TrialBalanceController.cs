using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BMS.Models;
using BMS.Models.Accounting.Configuration.Accounts;

namespace BMS.Controllers.Accounting.Transaction
{
    public class TrialBalanceController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();
        // GET api/trialbalance
        public HttpResponseMessage Get()
        {
            //return new string[] { "value1", "value2" };

            var drcr = (from vl in db.VoucherLists.Where(a => a.AccCOA.HasChild == false && a.DrCr == true).DefaultIfEmpty()
                      select new
                      {
                          Account = vl.AccCOA.COAName,
                          vl.COAID,
                          vl.TranDate,
                          Debit = (decimal)vl.Amount,
                          Credit = (decimal)0.00,
                          bType =(bool) vl.AccCOA.BalanceType

                      }).Union(from vl in db.VoucherLists.Where(a => a.AccCOA.HasChild == false && a.DrCr == false).DefaultIfEmpty()
                               select new
                               {
                                   Account=vl.AccCOA.COAName,
                                   vl.COAID,
                                   vl.TranDate,
                                   Debit = (decimal)0.00,
                                   Credit =(decimal) vl.Amount,
                                   bType=(bool)vl.AccCOA.BalanceType

                               });

            var result = drcr.GroupBy(c => c.COAID).Select(g => new { COAID = g.Key,Account=g.Select(a=>a.Account).FirstOrDefault(), Debit = (g.Select(a=>a.bType).FirstOrDefault()!=true?g.Sum(d => d.Debit) - g.Sum(c => c.Credit):0), Credit = (g.Select(a=>a.bType).FirstOrDefault()!=false?g.Sum(c => c.Credit) - g.Sum(d => d.Debit):0) });


            return Request.CreateResponse(HttpStatusCode.OK, result.ToList());
        }

        // GET api/trialbalance/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/trialbalance
        public void Post([FromBody]string value)
        {

        }

        // PUT api/trialbalance/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/trialbalance/5
        public void Delete(int id)
        {
        }
    }
}
