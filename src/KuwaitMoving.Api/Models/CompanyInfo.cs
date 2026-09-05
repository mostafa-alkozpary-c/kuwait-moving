namespace KuwaitMoving.Api.Models;

public class CompanyInfo
{
    public string Name { get; set; } = "شركة الفهد لنقل وفك وتركيب العفش بالكويت";
    public string Tagline { get; set; } = "الخيار الأول والموثوق لنقل الأثاث في كافة محافظات الكويت 24/7";
    public string Phone { get; set; } = "60055108";
    public string InternationalPhone { get; set; } = "+96560055108";
    public string WhatsAppNumber { get; set; } = "96560055108";
    public string WhatsAppUrl => $"https://wa.me/{WhatsAppNumber}?text={Uri.EscapeDataString("السلام عليكم، أرغب بحجز موعد / الاستفسار عن نقل وفك وتركيب العفش.")}";
    public string Address { get; set; } = "الكويت - خدمة سريعة وشاملة لجميع المحافظات والمناطق";
    public string WorkingHours { get; set; } = "خدمة 24 ساعة على مدار الأسبوع (شاملاً أيام العطل)";
    public double Rating { get; set; } = 4.9;
    public int TotalReviews { get; set; } = 1240;
    public int CompletedMoves { get; set; } = 16800;
    public int ExperienceYears { get; set; } = 16;
    public List<string> Features { get; set; } = new()
    {
        "فنيين ونجارين محترفين لفك وتركيب جميع أنواع غرف النوم وإيكيا",
        "تغليف حراري وبابلز لحماية الأثاث الحساس والزجاج والتحف",
        "أسطول هاف لوري ووانيتات حديثة ومجهزة ومغلقة ضد الغبار والأمطار",
        "التزام دقيق بالمواعيد مع سرعة الإنجاز بدون أي خدوش",
        "أسعار تنافسية ومناسبة للجميع بدون أي تكاليف خفية"
    };
}
