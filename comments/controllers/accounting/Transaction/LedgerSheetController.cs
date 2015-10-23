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
        public IEnumerable<AccCOA> Get(ODataQueryOptions Options)
        {
            //var result = Options.ApplyTo(db.VoucherLists.AsQueryable().Include(v => v.AccCOA).Include(v => v.AccCOA.AccType)) as IEnumerable<VoucherList>;

            //return Request.CreateResponse(HttpStatusCode.OK, result);

            return Options.ApplyTo(db.AccCOAs.Where(c => c.HasChild == false).Include(a=>a.AccType) as IQueryable) as IEnumerable<AccCOA>;
        }

        // GET api/ledgersheet/5
        public string Get(int id)
        {
            return "value";
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
