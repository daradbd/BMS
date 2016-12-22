using BMS.Models;
using BMS.Models.Resources;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BMS.Controllers.Resources
{
    public class DataController : Controller
    {
        //
        // GET: /Data/
        private UsersContext db = new UsersContext();

        [HttpPost]
        public JsonResult SaveFiles(string description)
        {
            string Message, fileName, actualFileName;
            Message = fileName = actualFileName = string.Empty;
            bool flag = false; long FileID=0;
            UploadFile upF = new UploadFile();
            if (Request.Files != null)
            {
                var file = Request.Files[0];
                actualFileName = file.FileName;
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                int size = file.ContentLength;

                try
                {
                    file.SaveAs(Path.Combine(Server.MapPath("~/UploadedFiles"), fileName));

                    UploadFile f = new UploadFile
                    {
                        UploadFileName = actualFileName,
                        UploadFilePath = "UploadedFiles/"+fileName,
                        Remarks = description
                    };

                    db.UploadFiles.Add(f);
                     db.SaveChanges();
                        Message = "File uploaded successfully";
                        flag = true;
                   FileID = f.UploadFileID;
                   upF = f;
                }
                catch (Exception)
                {
                    Message = "File upload failed! Please try again";
                }

            }
            return new JsonResult { Data = new { Message = Message, Status = flag, File = upF } };
        }

    }
}
