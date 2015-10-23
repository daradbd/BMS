using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BMS.Controllers.Accounting.Transaction
{
    public class LedgerSheetController : ApiController
    {
        // GET api/ledgersheet
        public IEnumerable<string> LedgerSheetGet()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/ledgersheet/5
        public string LedgerSheetGet(int id)
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
