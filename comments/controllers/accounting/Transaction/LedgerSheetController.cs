using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Accounting.Transaction
{
    public class LedgerSheetController : ApiController
    {
        // GET api/ledgersheet
        public HttpResponseMessage LedgerSheetGet(ODataQueryOptions Options)
        {
            ArrayList al = new ArrayList();

            
            al.Add(45);
            al.Add(78);
            al.Add(33);
            al.Add(56);
            al.Add(12);
            al.Add(23);
            al.Add(9);

            return Request.CreateResponse(HttpStatusCode.OK, al);
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
