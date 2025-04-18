using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public string User { get; set; }

        public string Status { get; set; }

        public string Name { get; set; }

    }
}