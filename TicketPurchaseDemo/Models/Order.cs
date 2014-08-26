using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TicketPurchaseDemo.Models
{
  public class Order
  {
    public Order() { }

    [Key]
    public int Id { get; set; }
    [Required]
    public int TicketValue { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    [CreditCard]
    public string CreditCardNumber { get; set; }
  }
}