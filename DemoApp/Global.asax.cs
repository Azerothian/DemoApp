using DemoApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace DemoApp
{
  public class WebApiApplication : System.Web.HttpApplication
  {
    protected void Application_Start()
    {
      Mappings.Init();
      GlobalConfiguration.Configure(WebApiConfig.Register);
    }
  }
}
