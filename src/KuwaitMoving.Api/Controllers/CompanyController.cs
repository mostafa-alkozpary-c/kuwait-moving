using KuwaitMoving.Api.Models;
using KuwaitMoving.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace KuwaitMoving.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyController : ControllerBase
{
    private readonly IDataService _dataService;

    public CompanyController(IDataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public ActionResult<CompanyInfo> Get()
    {
        return Ok(_dataService.GetCompanyInfo());
    }
}
