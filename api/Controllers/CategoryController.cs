using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        // Temporary in-memory storage for demonstration purposes
        private static List<Category> categories = new List<Category>();

        // GET: api/category
        [HttpGet]
        public IActionResult GetCategories()
        {
            return Ok(categories);
        }

        // POST: api/category
        [HttpPost]
        public IActionResult CreateCategory([FromBody] Category category)
        {
            // Validate the model before processing
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // Return validation errors if invalid
            }

            // Add the category to the in-memory list
            categories.Add(category);
            return CreatedAtAction(nameof(GetCategories), new { id = category.Id }, category);
        }
    }

    // Model for category (example)
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
        public string Name { get; set; }
    }
}
