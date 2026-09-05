using KuwaitMoving.Api.Models;

namespace KuwaitMoving.Api.Services;

public interface IDataService
{
    CompanyInfo GetCompanyInfo();
    List<ServiceItem> GetServices();
    ServiceItem? GetServiceById(int id);
    List<GovernorateArea> GetAreas();
    List<CustomerReview> GetReviews();
    CustomerReview AddReview(CustomerReview review);
    List<QuoteRequest> GetQuotes();
    QuoteRequest CreateQuote(QuoteRequest request);
    decimal CalculateEstimatedCost(QuoteRequest request);
}

public class DataService : IDataService
{
    private readonly CompanyInfo _companyInfo = new();
    private readonly List<ServiceItem> _services;
    private readonly List<GovernorateArea> _areas;
    private readonly List<CustomerReview> _reviews;
    private readonly List<QuoteRequest> _quotes = new();
    private readonly object _lock = new();

    public DataService()
    {
        _services = new List<ServiceItem>
        {
            new ServiceItem
            {
                Id = 1,
                Title = "نقل عفش منازل وفلل وشقق",
                Slug = "home-moving",
                ShortDescription = "نقل شامل وآمن لكافة مقتنيات المنزل مع الترتيب والحرص على أدق التفاصيل.",
                FullDescription = "نقدم خدمة نقل العفش للمنازل والشقق والفلل بكافة مناطق الكويت بواسطة سيارات هاف لوري مجهزة وعمالة مدربة على أعلى مستوى، مع كفالة تامة على سلامة الأثاث أثناء النقل والتحميل والتنزيل.",
                Icon = "fa-truck-moving",
                ImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                StartingPriceKwd = 20,
                Highlights = new() { "سيارات مغلقة ومجهزة", "عمالة محترفة وأمينة", "كفالة سلامة المنقولات", "خدمة سريعة في نفس اليوم" }
            },
            new ServiceItem
            {
                Id = 2,
                Title = "فك وتركيب غرف النوم وأثاث إيكيا",
                Slug = "furniture-disassembly-assembly",
                ShortDescription = "فنيون ونجارون متخصصون في فك وتركيب جميع موديلات غرف النوم والمطابخ والستائر.",
                FullDescription = "خدمة فك وتركيب دقيقة واحترافية تشمل غرف النوم الكلاسيكية والحديثة، خزائن الملابس، غرف الأطفال، أثاث إيكيا (IKEA) وميداس، بالإضافة إلى تركيب الستائر وشاشات التلفزيون بدقة متناهية.",
                Icon = "fa-screwdriver-wrench",
                ImageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
                StartingPriceKwd = 15,
                Highlights = new() { "نجار فك وتركيب محترف", "فك وتركيب إيكيا وميداس", "تركيب الستائر والشاشات", "أدوات ومعدات متطورة" }
            },
            new ServiceItem
            {
                Id = 3,
                Title = "تغليف الأثاث الشامل والحماية",
                Slug = "packing-protection",
                ShortDescription = "تغليف متين باستخدام البابلز والكرتون والنايلون المقوى لحماية مقتنياتك الثمينة.",
                FullDescription = "نوفر أجود خامات التغليف المعتمدة: كراتين قوية بمختلف الأحجام، بلاستيك فقاعي هوائي (بابلز) لحماية الزجاج والأجهزة الحساسة، نايلون ستريتش، وفوم عازل لضمان وصول أثاثك دون أي خدش أو غبار.",
                Icon = "fa-box-open",
                ImageUrl = "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80",
                StartingPriceKwd = 10,
                Highlights = new() { "كراتين سميكة مقواة", "بابلز فقاعي لحماية الزجاج", "تغليف سترتش ضد الأتربة", "ترقيم وتنظيم الصناديق" }
            },
            new ServiceItem
            {
                Id = 4,
                Title = "هاف لوري ووانيت نقل عفش",
                Slug = "half-lorry-transport",
                ShortDescription = "أسطول سيارات هاف لوري ووانيت حديثة ومجهزة لنقل سريع في أي وقت.",
                FullDescription = "سيارات هاف لوري ووانيتات واسعة ومبطنة من الداخل مخصصة لحمل ونقل العفش والأجهزة الكهربائية بأمان تام. متواجدون في كل محافظة في الكويت لنصلك خلال دقائق معدودة.",
                Icon = "fa-van-shuttle",
                ImageUrl = "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80",
                StartingPriceKwd = 15,
                Highlights = new() { "سيارات مبطنة ومحمية", "سرعة وصول خلال 30 دقيقة", "سائقون ذوو خبرة بشوارع الكويت", "متوفرة 24 ساعة" }
            },
            new ServiceItem
            {
                Id = 5,
                Title = "نقل أثاث الشركات والمكاتب",
                Slug = "office-moving",
                ShortDescription = "نقل مكتبي منظم وسريع للشركات والمؤسسات دون تعطيل سير العمل.",
                FullDescription = "حلول نقل متكاملة للمكاتب والشركات: نقل المكاتب، غرف الاجتماعات، الخزائن، السيرفرات، والأجهزة الإلكترونية بجدول زمني مرن وسرعة فائقة لضمان استئناف العمل فوراً.",
                Icon = "fa-building",
                ImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
                StartingPriceKwd = 35,
                Highlights = new() { "نقل خارج أوقات العمل لتفادي التعطيل", "فك وتركيب محطات العمل", "نقل السيرفرات والأجهزة بحرص", "فواتير رسمية للشركات" }
            },
            new ServiceItem
            {
                Id = 6,
                Title = "ونش هيدروليكي للأدوار المرتفعة",
                Slug = "crane-lifting",
                ShortDescription = "أوناش حديثة لتنزيل ورفع العفش للأبراج والأدوار العالية بأمان تام.",
                FullDescription = "نوفر أوناش رفع هيدروليكية متطورة تصل إلى أعلى الأدوار لنقل القطع الكبيرة والكنب والزجاج التي يصعب صعودها عبر الدرج أو المصاعد الضيقة، مع أعلى معايير الأمان والسلامة.",
                Icon = "fa-elevator",
                ImageUrl = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
                StartingPriceKwd = 25,
                Highlights = new() { "وصول لأعلى الطوابق", "حماية المداخل والسلالم", "توفير وقت وجهد هائل", "تشغيل بواسطة فنيين مختصين" }
            }
        };

        _areas = new List<GovernorateArea>
        {
            new GovernorateArea
            {
                Name = "محافظة العاصمة",
                NameEn = "Capital (Kuwait City)",
                Tagline = "خدمة فورية لمدينة الكويت وضواحيها",
                MajorDistricts = new() { "مدينة الكويت", "الروضة", "العديلية", "كيفان", "الشامية", "الخالدية", "اليرموك", "قرطبة", "السرة", "الدسمة", "الدعية", "بنيد القار" },
                FastResponseMinutes = 20
            },
            new GovernorateArea
            {
                Name = "محافظة حولي",
                NameEn = "Hawally",
                Tagline = "تغطية مكثفة لجميع مناطق حولي على مدار الساعة",
                MajorDistricts = new() { "السالمية", "حولي", "الجابرية", "الرميثية", "بيان", "مشرف", "سلوى", "الشعب", "جنوب السرة", "حطين", "السلام", "الشهداء" },
                FastResponseMinutes = 15
            },
            new GovernorateArea
            {
                Name = "محافظة الفروانية",
                NameEn = "Farwaniya",
                Tagline = "سيارات هاف لوري جاهزة للتحرك فوراً",
                MajorDistricts = new() { "الفروانية", "خيطان", "الأندلس", "إشبيلية", "الرحاب", "الرقعي", "الفردوس", "صباح الناصر", "عبدالله المبارك", "العارضية", "جليب الشيوخ" },
                FastResponseMinutes = 20
            },
            new GovernorateArea
            {
                Name = "محافظة الأحمدي",
                NameEn = "Ahmadi",
                Tagline = "خدمات نقل وفك وتركيب في كافة مدن الأحمدي والشاليهات",
                MajorDistricts = new() { "الأحمدي", "الفحيحيل", "المنقف", "أبو حليفة", "المهبولة", "الصباحية", "الرقة", "هدية", "صباح الأحمد", "الخيران", "الوفرة", "علي صباح السالم" },
                FastResponseMinutes = 25
            },
            new GovernorateArea
            {
                Name = "محافظة مبارك الكبير",
                NameEn = "Mubarak Al-Kabeer",
                Tagline = "فريق متخصص لخدمة مناطق مبارك الكبير والقرين",
                MajorDistricts = new() { "القرين", "العدان", "القصور", "المسيلة", "أبو الحصانية", "الفنيطيس", "صباح السالم", "المسايل", "أبو فطيرة", "صبحان" },
                FastResponseMinutes = 20
            },
            new GovernorateArea
            {
                Name = "محافظة الجهراء",
                NameEn = "Jahra",
                Tagline = "وصول سريع لكافة مناطق وضواحي ومزارع الجهراء",
                MajorDistricts = new() { "الجهراء القديمة", "الواحة", "العيون", "القصر", "النسيم", "تيماء", "سعد العبدالله", "المطلاع", "كبد", "العبدلي", "الصبية" },
                FastResponseMinutes = 25
            }
        };

        _reviews = new List<CustomerReview>
        {
            new CustomerReview
            {
                Id = 1,
                CustomerName = "أبو فهد الشمري",
                Area = "جنوب السرة (حطين)",
                Rating = 5,
                Comment = "ما شاء الله تبارك الله، التزام بالميعاد على الدقيقة والعمالة خلوقة ومحترمة جداً. فكوا غرفة النوم والديوانية وركبوها في بيتي الجديد بدون أي خدش. أنصح بالتعامل معهم وبشدة.",
                ServiceUsed = "نقل شقة وفك وتركيب إيكيا",
                ReviewDate = "منذ يومين"
            },
            new CustomerReview
            {
                Id = 2,
                CustomerName = "أم عبدالعزيز المطيري",
                Area = "عبدالله المبارك",
                Rating = 5,
                Comment = "أفضل شركة نقل عفش تعاملت معها بالكويت، التغليف بالبابلز والكرتون كان ممتاز لحماية الأطقم والزجاج، والأسعار معقولة جداً مقارنة بالدقة والاحتراف.",
                ServiceUsed = "تغليف ونقل فيلا كاملة",
                ReviewDate = "منذ أسبوع"
            },
            new CustomerReview
            {
                Id = 3,
                CustomerName = "م. خالد العازمي",
                Area = "صباح الأحمد",
                Rating = 5,
                Comment = "خدمة ممتازة وسريعة، اتصلت عليهم بالرقم 60055108 وخلال أقل من نصف ساعة كان الهاف لوري واصل للبيت. نجار فنان ومحترف وسياراتهم نظيفة ومجهزة.",
                ServiceUsed = "هاف لوري وفك وتركيب أثاث",
                ReviewDate = "منذ أسبوعين"
            },
            new CustomerReview
            {
                Id = 4,
                CustomerName = "د. يعقوب الكندري",
                Area = "العديلية",
                Rating = 5,
                Comment = "قمة في الأمانة والاحتراف. تم نقل مكتبي الخاص وكتبي وأجهزتي بكل سلاسة وتنظيم. شكراً جزيلاً لكم.",
                ServiceUsed = "نقل أثاث مكتبي",
                ReviewDate = "منذ شهر"
            }
        };
    }

    public CompanyInfo GetCompanyInfo() => _companyInfo;

    public List<ServiceItem> GetServices() => _services;

    public ServiceItem? GetServiceById(int id) => _services.FirstOrDefault(s => s.Id == id);

    public List<GovernorateArea> GetAreas() => _areas;

    public List<CustomerReview> GetReviews() => _reviews;

    public CustomerReview AddReview(CustomerReview review)
    {
        lock (_lock)
        {
            review.Id = _reviews.Count > 0 ? _reviews.Max(r => r.Id) + 1 : 1;
            review.ReviewDate = "الآن";
            _reviews.Insert(0, review);
            return review;
        }
    }

    public List<QuoteRequest> GetQuotes()
    {
        lock (_lock)
        {
            return _quotes.OrderByDescending(q => q.CreatedAt).ToList();
        }
    }

    public QuoteRequest CreateQuote(QuoteRequest request)
    {
        lock (_lock)
        {
            request.Id = Guid.NewGuid();
            request.CreatedAt = DateTime.UtcNow;
            request.Status = "New";
            request.EstimatedCostKwd = CalculateEstimatedCost(request);
            _quotes.Add(request);
            return request;
        }
    }

    public decimal CalculateEstimatedCost(QuoteRequest request)
    {
        decimal baseCost = 20m; // Base for 1 room / standard move

        // Rooms calculation
        int rooms = Math.Max(1, request.RoomCount);
        baseCost += (rooms - 1) * 12m;

        // Additional services
        if (request.RequiresPacking)
        {
            baseCost += rooms * 8m;
        }

        if (request.RequiresDisassembly)
        {
            baseCost += rooms * 10m;
        }

        // Inter-governorate distance adjustment (e.g. Far distance like Wafra/Abdali or different governorates)
        if (!string.IsNullOrWhiteSpace(request.FromGovernorate) &&
            !string.IsNullOrWhiteSpace(request.ToGovernorate) &&
            !request.FromGovernorate.Equals(request.ToGovernorate, StringComparison.OrdinalIgnoreCase))
        {
            baseCost += 5m;
        }

        return baseCost;
    }
}
