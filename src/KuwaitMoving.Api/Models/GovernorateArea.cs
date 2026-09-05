namespace KuwaitMoving.Api.Models;

public class GovernorateArea
{
    public string Name { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public List<string> MajorDistricts { get; set; } = new();
    public int FastResponseMinutes { get; set; } = 30;
    public bool Available24Hours { get; set; } = true;
}
