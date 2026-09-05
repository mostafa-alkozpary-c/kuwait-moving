namespace KuwaitMoving.Api.Models;

public class ServiceItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string FullDescription { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public decimal StartingPriceKwd { get; set; }
    public string UnitText { get; set; } = "تبدأ من";
    public List<string> Highlights { get; set; } = new();
}
