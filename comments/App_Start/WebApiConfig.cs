using BMS.Filters;
using BMS.Models;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApiContrib.IoC.Ninject;

namespace BMS
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Filters.Add(new ValidateAttribute());

            IKernel kernel = new StandardKernel();
            kernel.Bind<ICommentRepository>().ToConstant(new InitialData());
            config.DependencyResolver = new NinjectResolver(kernel);
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new System.Net.Http.Headers.MediaTypeHeaderValue("text/html"));

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
