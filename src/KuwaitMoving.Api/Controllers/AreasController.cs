using KuwaitMoving.Api.Models;
using KuwaitMoving.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace KuwaitMoving.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AreasController : ControllerBase
{
    private readonly IDataService _dataService;

    public AreasController(IDataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public ActionResult<List<GovernorateArea>> GetAll()
    {
        return Ok(_dataService.GetAreas());
    }
}
