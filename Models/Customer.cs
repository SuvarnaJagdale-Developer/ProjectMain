using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ProjectMain.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sales>();
        }
        
        
        [Key]

        public int Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        [DisplayName("New Customer")]
        [Required(ErrorMessage = "This Field is required.")]
        public string CustomerName { get; set; }


        public string Address { get; set; }
      //  public int? ProductSold { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
