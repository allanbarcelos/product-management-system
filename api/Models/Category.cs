using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    /// <summary>
    /// Represents a category in the system.
    /// </summary>
    /// <remarks>
    /// This class is used to define the properties of a category.
    /// </remarks>

    public class Category
    {

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        public ICollection<Product> Products { get; set; } = new List<Product>();

        public Category()
        {
            Name = string.Empty;
            Description = string.Empty;
        }
    }
}