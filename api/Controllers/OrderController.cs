using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.Include(o => o.OrderItems).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == id);
            if (order == null)
                return NotFound(new { message = "Order not found" });

            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder([FromBody] Order order)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (order.OrderItems == null || order.OrderItems.Count == 0)
                return BadRequest(new { message = "Order must contain at least one item." });

            var customerExists = await _context.Customers.AnyAsync(c => c.Id == order.CustomerId);
            if (!customerExists)
                return BadRequest(new { message = "Invalid CustomerId. Customer does not exist." });

            if (order.TotalAmount <= 0)
                return BadRequest(new { message = "TotalAmount must be greater than 0." });

            var calculatedTotal = order.OrderItems.Sum(item => item.Quantity * item.UnitPrice);
            if (order.TotalAmount != calculatedTotal)
                return BadRequest(new { message = "TotalAmount does not match sum of order items." });

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] Order order)
        {
            if (id != order.Id)
                return BadRequest(new { message = "Order ID mismatch" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingOrder = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == id);
            if (existingOrder == null)
                return NotFound(new { message = "Order not found" });

            if (order.OrderItems == null || order.OrderItems.Count == 0)
                return BadRequest(new { message = "Order must contain at least one item." });

            var customerExists = await _context.Customers.AnyAsync(c => c.Id == order.CustomerId);
            if (!customerExists)
                return BadRequest(new { message = "Invalid CustomerId. Customer does not exist." });

            if (order.TotalAmount <= 0)
                return BadRequest(new { message = "TotalAmount must be greater than 0." });

            var calculatedTotal = order.OrderItems.Sum(item => item.Quantity * item.UnitPrice);
            if (order.TotalAmount != calculatedTotal)
                return BadRequest(new { message = "TotalAmount does not match sum of order items." });

            existingOrder.OrderDate = order.OrderDate;
            existingOrder.CustomerId = order.CustomerId;
            existingOrder.TotalAmount = order.TotalAmount;
            existingOrder.OrderItems = order.OrderItems;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound(new { message = "Order not found" });

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
