using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
 
namespace api.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; } // Primary key - auto-incremented by database
 
        [Required]
        public string UserId { get; set; } // Reference to the user who created the order
 
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Total price must be positive")]
        public decimal TotalPrice { get; set; } // Calculated from product prices
 
        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Pending"; // Default status
 
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now; // Auto-set creation time
 
        // Stores product IDs as simple integers, not to have to create navigation. (Not the best approach, but it works for now)  
        public List<int> ProductIds { get; set; } = new List<int>();
    }
}