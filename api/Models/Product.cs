using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    /// <summary>
    /// Represents a product in the inventory.
    /// </summary>
    public class Product : IValidatableObject
    {
        /// <summary>
        /// Unique identifier for the product.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Name of the product.
        /// </summary>
        [Required(ErrorMessage = "Product name is required.")]
        [MaxLength(255, ErrorMessage = "Product name cannot exceed 255 characters.")]
        public string Name { get; set; }

        /// <summary>
        /// Description of the product.
        /// </summary>
        [MaxLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string? Description { get; set; }

        /// <summary>
        /// Price of the product.
        /// </summary>
        [Required(ErrorMessage = "Price is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        /// <summary>
        /// Available stock quantity for the product.
        /// </summary>
        [Required(ErrorMessage = "Stock quantity is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Stock quantity cannot be negative.")]
        public int StockQuantity { get; set; }

        /// <summary>
        /// Date and time the product was created.
        /// </summary>
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Date and time the product was last updated.
        /// </summary>
        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Indicates whether the product is marked as deleted (soft delete).
        /// </summary>
        public bool IsDeleted { get; set; } = false;

        /// <summary>
        /// Indicates whether the product is in stock.
        /// </summary>
        [NotMapped]
        public bool IsInStock => StockQuantity > 0;

        /// <summary>
        /// Performs custom validation on the product.
        /// </summary>
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Price <= 0)
            {
                yield return new ValidationResult(
                    "Price must be greater than zero.",
                    new[] { nameof(Price) }
                );
            }

            if (StockQuantity < 0)
            {
                yield return new ValidationResult(
                    "Stock quantity cannot be negative.",
                    new[] { nameof(StockQuantity) }
                );
            }
        }
    }
}
