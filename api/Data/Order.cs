using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace product-management-system-fork.Data
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
    //
    // This class was created just to be able to create the model. 
    // Might be removed later due to the fact that it might be created by another memeber of the team.
    //
    public class Product
    {
        [Key]
        public int Id { get; set; } // Primary key

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }

        [StringLength(500)]
        [DataType(DataType.MultilineText)]
        public string Description { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be positive.")]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue)]
        public int StockQuantity { get; set; } = 0; // Default to 0

        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now; // Auto-set timestamp

        // Product image/picture could be added later:
        // public string ImageUrl { get; set; }
    }
}