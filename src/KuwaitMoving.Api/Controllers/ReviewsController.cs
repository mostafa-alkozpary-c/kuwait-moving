using KuwaitMoving.Api.Models;
using KuwaitMoving.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace KuwaitMoving.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly IDataService _dataService;

    public ReviewsController(IDataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public ActionResult<List<CustomerReview>> GetAll()
    {
        return Ok(_dataService.GetReviews());
    }

    [HttpPost]
    public ActionResult<CustomerReview> Add([FromBody] CustomerReview review)
    {
        if (string.IsNullOrWhiteSpace(review.CustomerName) || string.IsNullOrWhiteSpace(review.Comment))
        {
            return BadRequest(new { message = "الاسم والتعليق مطلوبان" });
        }

        if (review.Rating < 1 || review.Rating > 5)
        {
            review.Rating = 5;
        }

        var created = _dataService.AddReview(review);
        return Ok(created);
    }
}
