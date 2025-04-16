// OrderItem.cs - Intermediate table representing the many-to-many relationship between Order and Product
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class OrderItem
    {
        // Primary key for the OrderItem table
        [Key]
        public int Id { get; set; }

        // Foreign key linking to the Order entity
        [Required]
        public int OrderId { get; set; }

        // Navigation property to the associated Order
        public Order Order { get; set; }

        // Foreign key linking to the Product entity
        [Required]
        public int ProductId { get; set; }

        // Navigation property to the associated Product
        public Product Product { get; set; }

        // Quantity of the specific product in the order
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }
    }
}
