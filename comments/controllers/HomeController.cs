using System;
using System.Collections.Generic;
using Microsoft.Web.WebPages.OAuth;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using BMS.Models;


namespace BMS.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public ActionResult Index()
        {
            LoginUser loginUser = new LoginUser();
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";
            //object id = Membership.FindUsersByName(Membership.GetUser().UserName.ToString());
            ViewBag.BgColor = "#006442";

            ViewBag.User = loginUser; //Membership.GetUser().UserName.ToString().ToUpper();
            return View();

            //return Redirect("index.html");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
