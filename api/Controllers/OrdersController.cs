using Microsoft.AspNetCore.Mvc;
using api.Models;
using System.Collections.Generic;
using System.Linq;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        
        private static readonly List<Order> Orders = new List<Order>
        {
            new Order { Id = 1, User = "Customer", Status = "Delivered", Name = "Mike" },
            new Order { Id = 2, User = "Employee", Status = "Pending", Name = "Wentao" },
            new Order { Id = 3, User = "", Status = "Shipped", Name = "Juncheng" },
            new Order { Id = 4, User = "Customer", Status = "Pending", Name = "Alice" }
        };

        // GET: /api/orders?status=Pending&user=Customer
        [HttpGet]
        public ActionResult<IEnumerable<Order>> GetOrders([FromQuery] string status, [FromQuery] string user)
        {
            var query = Orders.AsQueryable();

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(o => o.Status == status);
            }

            if (!string.IsNullOrEmpty(user))
            {
                query = query.Where(o => o.User == user);
            }

            return Ok(query.ToList());
        }
        [HttpGet("test")]
public IActionResult Test([FromQuery] string user, [FromQuery] string status)
{
    return Ok(new { user, status });
}

    }
}
/*
if we have database for order
private readonly AppDbContext _context;

public OrdersController(AppDbContext context)
{
    _context = context;
}

// GET: /api/orders?status=Pending&user=Customer
[HttpGet]
public async Task<ActionResult<IEnumerable<Order>>> GetOrders([FromQuery] string status, [FromQuery] string user)
{
    var query = _context.Orders.AsQueryable();

    if (!string.IsNullOrEmpty(status))
    {
        query = query.Where(o => o.Status == status);
    }

    if (!string.IsNullOrEmpty(user))
    {
        query = query.Where(o => o.User == user);
    }

    return await query.ToListAsync();
}
*/ 

