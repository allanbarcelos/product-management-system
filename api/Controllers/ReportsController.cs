using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;

namespace api.Controllers
{
    [ApiController]
    [Route("api/reports")]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("sales")]
        public async Task<IActionResult> GetSalesReport([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var salesReport = await _context.Orders
                .Where(order => order.CreatedAt >= startDate && order.CreatedAt <= endDate)
                .GroupBy(order => order.CreatedAt.Date)
                .Select(group => new {
                    Date = group.Key,
                    TotalSales = group.Sum(order => order.Total)
                })
                .ToListAsync();

            return Ok(salesReport);
        }
    }
}