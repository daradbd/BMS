using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BMS.Controllers
{
    public class UserAuthorizeController : ApiController
    {
        // GET api/userauthorize
        public string Getuserauthorize()
        {
            return "value";
        }

        // GET api/userauthorize/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/userauthorize
        public void Post([FromBody]string value)
        {
        }

        // PUT api/userauthorize/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/userauthorize/5
        public void Delete(int id)
        {
        }
    }
}
