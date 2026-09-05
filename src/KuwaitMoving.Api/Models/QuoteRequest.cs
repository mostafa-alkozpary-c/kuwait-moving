namespace KuwaitMoving.Api.Models;

public class QuoteRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FullName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string ServiceType { get; set; } = string.Empty;
    public string FromGovernorate { get; set; } = string.Empty;
    public string ToGovernorate { get; set; } = string.Empty;
    public int RoomCount { get; set; } = 1;
    public bool RequiresPacking { get; set; } = true;
    public bool RequiresDisassembly { get; set; } = true;
    public DateTime? MovingDate { get; set; }
    public string? AdditionalNotes { get; set; }
    public decimal EstimatedCostKwd { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "New"; // New, InProgress, Contacted, Completed
}
