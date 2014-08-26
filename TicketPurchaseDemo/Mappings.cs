using TicketPurchaseDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicketPurchaseDemo
{
  public class Mappings
  {
    public static void Init()
    {
      AutoMapper.Mapper.CreateMap<OrderRequest, Order>()
        .ForMember(src => src.TicketValue, opts => opts.MapFrom(a => GetTicketValueFromProductCode(a.TicketValue)));
    }

    private static int GetTicketValueFromProductCode(string productCode)
    {
      switch(productCode)
      {
        case "T5":
          return 5;
        case "T10":
          return 10;
        case "T20":
          return 20;
        case "T50":
          return 50;
        case "T100":
          return 100;
        default:
          throw new ArgumentException("Invalid Product Code provided");
      }
    }
  }
}