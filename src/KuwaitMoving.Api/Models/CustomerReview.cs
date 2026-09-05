namespace KuwaitMoving.Api.Models;

public class CustomerReview
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string Area { get; set; } = string.Empty;
    public int Rating { get; set; } = 5;
    public string Comment { get; set; } = string.Empty;
    public string ServiceUsed { get; set; } = string.Empty;
    public string ReviewDate { get; set; } = string.Empty;
}
