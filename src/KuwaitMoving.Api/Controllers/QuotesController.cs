using KuwaitMoving.Api.Models;
using KuwaitMoving.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace KuwaitMoving.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly IDataService _dataService;

    public QuotesController(IDataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public ActionResult<List<QuoteRequest>> GetAll()
    {
        return Ok(_dataService.GetQuotes());
    }

    [HttpPost]
    public ActionResult<QuoteRequest> Create([FromBody] QuoteRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.PhoneNumber))
        {
            return BadRequest(new { message = "رقم الهاتف مطلوب لتأكيد حجز النقل" });
        }

        var created = _dataService.CreateQuote(request);
        return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
    }

    [HttpPost("calculate")]
    public ActionResult<object> Calculate([FromBody] QuoteRequest request)
    {
        decimal estimate = _dataService.CalculateEstimatedCost(request);
        return Ok(new
        {
            estimatedCostKwd = estimate,
            currency = "KWD",
            currencyArabic = "دينار كويتي",
            note = "السعر تقديري وقد يختلف بناءً على المعاينة الميدانية وكمية الأغراض الدقيقة."
        });
    }
}
