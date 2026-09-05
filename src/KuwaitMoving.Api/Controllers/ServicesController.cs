using KuwaitMoving.Api.Models;
using KuwaitMoving.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace KuwaitMoving.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly IDataService _dataService;

    public ServicesController(IDataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public ActionResult<List<ServiceItem>> GetAll()
    {
        return Ok(_dataService.GetServices());
    }

    [HttpGet("{id:int}")]
    public ActionResult<ServiceItem> GetById(int id)
    {
        var service = _dataService.GetServiceById(id);
        if (service == null)
        {
            return NotFound(new { message = $"الخدمة برقم {id} غير موجودة" });
        }
        return Ok(service);
    }
}
