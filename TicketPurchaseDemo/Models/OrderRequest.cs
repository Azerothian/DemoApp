﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TicketPurchaseDemo.Models
{
  public class OrderRequest
  {
    public string TicketValue { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string CreditCardNumber { get; set; }
  }
}