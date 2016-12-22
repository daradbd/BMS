using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace BMS.Controllers.Resources
{
    public class UploadFileController : ApiController
    {
        // GET api/uploadfile
       [HttpPost]
        public KeyValuePair<bool, string> UploadFile()
        {
            try
            {
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    // Get the uploaded image from the Files collection
                    var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];

                    if (httpPostedFile != null)
                    {
                        // Validate the uploaded image(optional)

                        // Get the complete file path
                        var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/UploadedFiles"), httpPostedFile.FileName);

                        // Save the uploaded file to "UploadedFiles" folder
                        httpPostedFile.SaveAs(fileSavePath);

                        return new KeyValuePair<bool, string>(true, "File uploaded successfully.");
                    }
                    
                    return new KeyValuePair<bool, string>(true, "Could not get the uploaded file.");
                }

                return new KeyValuePair<bool, string>(true, "No file found to upload.");
            }
            catch (Exception ex)
            {
                return new KeyValuePair<bool, string>(false, "An error occurred while uploading the file. Error Message: " + ex.Message);
            }
        }
    

        // GET api/uploadfile/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/uploadfile
        public void Post([FromBody]string value)
        {
        }

        // PUT api/uploadfile/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/uploadfile/5
        public void Delete(int id)
        {
        }
    }
}
