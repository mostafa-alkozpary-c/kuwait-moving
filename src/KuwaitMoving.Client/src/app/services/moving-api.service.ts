import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyInfo, ServiceItem, GovernorateArea, CustomerReview, QuoteRequest } from '../models/moving.models';

@Injectable({
  providedIn: 'root'
})
export class MovingApiService {
  // You can adjust the API base URL if running on a custom port or proxy
  private apiBase = 'http://localhost:5140/api';

  // Fallback data guaranteed to work offline or before API launch
  private defaultCompany: CompanyInfo = {
    name: 'شركة الفهد لنقل وفك وتركيب العفش بالكويت',
    tagline: 'الخيار الأول والموثوق لنقل الأثاث في كافة محافظات الكويت 24/7',
    phone: '60055108',
    internationalPhone: '+96560055108',
    whatsAppNumber: '96560055108',
    whatsAppUrl: 'https://wa.me/96560055108?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A9%20%D9%86%D9%82%D9%84%20%D9%88%D9%81%D9%83%20%D9%88%D8%AA%D8%B1%D9%83%D9%8A%D8%A8%20%D8%A7%D9%84%D8%B9%D9%81%D8%B4.',
    address: 'الكويت - متواجدون في كافة المحافظات والمناطق 24 ساعة',
    workingHours: 'خدمة متواصلة 24 ساعة طوال أيام الأسبوع',
    rating: 4.9,
    totalReviews: 1240,
    completedMoves: 16800,
    experienceYears: 16,
    features: [
      'فنيين ونجارين محترفين لفك وتركيب جميع أنواع غرف النوم وإيكيا',
      'تغليف حراري وبابلز لحماية الأثاث الحساس والزجاج والتحف',
      'أسطول هاف لوري ووانيتات حديثة ومجهزة ومغلقة ضد الغبار والأمطار',
      'التزام دقيق بالمواعيد مع سرعة الإنجاز بدون أي خدوش',
      'أسعار تنافسية ومناسبة للجميع بدون أي تكاليف خفية'
    ]
  };

  private defaultServices: ServiceItem[] = [
    {
      id: 1,
      title: 'نقل عفش منازل وفلل وشقق',
      slug: 'home-moving',
      shortDescription: 'نقل شامل وآمن لكافة مقتنيات المنزل مع الترتيب والحرص على أدق التفاصيل.',
      fullDescription: 'نقدم خدمة نقل العفش للمنازل والشقق والفلل بكافة مناطق الكويت بواسطة سيارات هاف لوري مجهزة وعمالة مدربة على أعلى مستوى، مع كفالة تامة على سلامة الأثاث أثناء النقل والتحميل والتنزيل.',
      icon: 'fa-truck-moving',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      startingPriceKwd: 20,
      unitText: 'تبدأ من',
      highlights: ['سيارات مغلقة ومجهزة', 'عمالة محترفة وأمينة', 'كفالة سلامة المنقولات', 'خدمة سريعة في نفس اليوم']
    },
    {
      id: 2,
      title: 'فك وتركيب غرف النوم وأثاث إيكيا',
      slug: 'furniture-disassembly-assembly',
      shortDescription: 'فنيون ونجارون متخصصون في فك وتركيب جميع موديلات غرف النوم والمطابخ والستائر.',
      fullDescription: 'خدمة فك وتركيب دقيقة واحترافية تشمل غرف النوم الكلاسيكية والحديثة، خزائن الملابس، غرف الأطفال، أثاث إيكيا (IKEA) وميداس، بالإضافة إلى تركيب الستائر وشاشات التلفزيون بدقة متناهية.',
      icon: 'fa-screwdriver-wrench',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      startingPriceKwd: 15,
      unitText: 'تبدأ من',
      highlights: ['نجار فك وتركيب محترف', 'فك وتركيب إيكيا وميداس', 'تركيب الستائر والشاشات', 'أدوات ومعدات متطورة']
    },
    {
      id: 3,
      title: 'تغليف الأثاث الشامل والحماية',
      slug: 'packing-protection',
      shortDescription: 'تغليف متين باستخدام البابلز والكرتون والنايلون المقوى لحماية مقتنياتك الثمينة.',
      fullDescription: 'نوفر أجود خامات التغليف المعتمدة: كراتين قوية بمختلف الأحجام، بلاستيك فقاعي هوائي (بابلز) لحماية الزجاج والأجهزة الحساسة، نايلون ستريتش، وفوم عازل لضمان وصول أثاثك دون أي خدش أو غبار.',
      icon: 'fa-box-open',
      imageUrl: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80',
      startingPriceKwd: 10,
      unitText: 'تبدأ من',
      highlights: ['كراتين سميكة مقواة', 'بابلز فقاعي لحماية الزجاج', 'تغليف سترتش ضد الأتربة', 'ترقيم وتنظيم الصناديق']
    },
    {
      id: 4,
      title: 'هاف لوري ووانيت نقل عفش',
      slug: 'half-lorry-transport',
      shortDescription: 'أسطول سيارات هاف لوري ووانيت حديثة ومجهزة لنقل سريع في أي وقت.',
      fullDescription: 'سيارات هاف لوري ووانيتات واسعة ومبطنة من الداخل مخصصة لحمل ونقل العفش والأجهزة الكهربائية بأمان تام. متواجدون في كل محافظة في الكويت لنصلك خلال دقائق معدودة.',
      icon: 'fa-van-shuttle',
      imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
      startingPriceKwd: 15,
      unitText: 'تبدأ من',
      highlights: ['سيارات مبطنة ومحمية', 'سرعة وصول خلال 30 دقيقة', 'سائقون ذوو خبرة بشوارع الكويت', 'متوفرة 24 ساعة']
    },
    {
      id: 5,
      title: 'نقل أثاث الشركات والمكاتب',
      slug: 'office-moving',
      shortDescription: 'نقل مكتبي منظم وسريع للشركات والمؤسسات دون تعطيل سير العمل.',
      fullDescription: 'حلول نقل متكاملة للمكاتب والشركات: نقل المكاتب، غرف الاجتماعات، الخزائن، السيرفرات، والأجهزة الإلكترونية بجدول زمني مرن وسرعة فائقة لضمان استئناف العمل فوراً.',
      icon: 'fa-building',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      startingPriceKwd: 35,
      unitText: 'تبدأ من',
      highlights: ['نقل خارج أوقات العمل لتفادي التعطيل', 'فك وتركيب محطات العمل', 'نقل السيرفرات بحرص', 'فواتير رسمية للشركات']
    },
    {
      id: 6,
      title: 'ونش هيدروليكي للأدوار المرتفعة',
      slug: 'crane-lifting',
      shortDescription: 'أوناش حديثة لتنزيل ورفع العفش للأبراج والأدوار العالية بأمان تام.',
      fullDescription: 'نوفر أوناش رفع هيدروليكية متطورة تصل إلى أعلى الأدوار لنقل القطع الكبيرة والكنب والزجاج التي يصعب صعودها عبر الدرج أو المصاعد الضيقة، مع أعلى معايير الأمان والسلامة.',
      icon: 'fa-elevator',
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      startingPriceKwd: 25,
      unitText: 'تبدأ من',
      highlights: ['وصول لأعلى الطوابق', 'حماية المداخل والسلالم', 'توفير وقت وجهد هائل', 'تشغيل بواسطة فنيين مختصين']
    }
  ];

  private defaultAreas: GovernorateArea[] = [
    {
      name: 'محافظة العاصمة',
      nameEn: 'Capital (Kuwait City)',
      tagline: 'خدمة فورية لمدينة الكويت وضواحيها',
      majorDistricts: ['مدينة الكويت', 'الروضة', 'العديلية', 'كيفان', 'الشامية', 'الخالدية', 'اليرموك', 'قرطبة', 'السرة', 'الدسمة', 'الدعية', 'بنيد القار'],
      fastResponseMinutes: 20,
      available24Hours: true
    },
    {
      name: 'محافظة حولي',
      nameEn: 'Hawally',
      tagline: 'تغطية مكثفة لجميع مناطق حولي على مدار الساعة',
      majorDistricts: ['السالمية', 'حولي', 'الجابرية', 'الرميثية', 'بيان', 'مشرف', 'سلوى', 'الشعب', 'جنوب السرة', 'حطين', 'السلام', 'الشهداء'],
      fastResponseMinutes: 15,
      available24Hours: true
    },
    {
      name: 'محافظة الفروانية',
      nameEn: 'Farwaniya',
      tagline: 'سيارات هاف لوري جاهزة للتحرك فوراً',
      majorDistricts: ['الفروانية', 'خيطان', 'الأندلس', 'إشبيلية', 'الرحاب', 'الرقعي', 'الفردوس', 'صباح الناصر', 'عبدالله المبارك', 'العارضية', 'جليب الشيوخ'],
      fastResponseMinutes: 20,
      available24Hours: true
    },
    {
      name: 'محافظة الأحمدي',
      nameEn: 'Ahmadi',
      tagline: 'خدمات نقل وفك وتركيب في كافة مدن الأحمدي والشاليهات',
      majorDistricts: ['الأحمدي', 'الفحيحيل', 'المنقف', 'أبو حليفة', 'المهبولة', 'الصباحية', 'الرقة', 'هدية', 'صباح الأحمد', 'الخيران', 'الوفرة'],
      fastResponseMinutes: 25,
      available24Hours: true
    },
    {
      name: 'محافظة مبارك الكبير',
      nameEn: 'Mubarak Al-Kabeer',
      tagline: 'فريق متخصص لخدمة مناطق مبارك الكبير والقرين',
      majorDistricts: ['القرين', 'العدان', 'القصور', 'المسيلة', 'أبو الحصانية', 'الفنيطيس', 'صباح السالم', 'المسايل', 'أبو فطيرة', 'صبحان'],
      fastResponseMinutes: 20,
      available24Hours: true
    },
    {
      name: 'محافظة الجهراء',
      nameEn: 'Jahra',
      tagline: 'وصول سريع لكافة مناطق وضواحي ومزارع الجهراء',
      majorDistricts: ['الجهراء القديمة', 'الواحة', 'العيون', 'القصر', 'النسيم', 'تيماء', 'سعد العبدالله', 'المطلاع', 'كبد', 'العبدلي'],
      fastResponseMinutes: 25,
      available24Hours: true
    }
  ];

  private defaultReviews: CustomerReview[] = [
    {
      id: 1,
      customerName: 'أبو فهد الشمري',
      area: 'جنوب السرة (حطين)',
      rating: 5,
      comment: 'ما شاء الله تبارك الله، التزام بالميعاد على الدقيقة والعمالة خلوقة ومحترمة جداً. فكوا غرفة النوم والديوانية وركبوها في بيتي الجديد بدون أي خدش. أنصح بالتعامل معهم وبشدة.',
      serviceUsed: 'نقل شقة وفك وتركيب إيكيا',
      reviewDate: 'منذ يومين'
    },
    {
      id: 2,
      customerName: 'أم عبدالعزيز المطيري',
      area: 'عبدالله المبارك',
      rating: 5,
      comment: 'أفضل شركة نقل عفش تعاملت معها بالكويت، التغليف بالبابلز والكرتون كان ممتاز لحماية الأطقم والزجاج، والأسعار معقولة جداً مقارنة بالدقة والاحتراف.',
      serviceUsed: 'تغليف ونقل فيلا كاملة',
      reviewDate: 'منذ أسبوع'
    },
    {
      id: 3,
      customerName: 'م. خالد العازمي',
      area: 'صباح الأحمد',
      rating: 5,
      comment: 'خدمة ممتازة وسريعة، اتصلت عليهم بالرقم 60055108 وخلال أقل من نصف ساعة كان الهاف لوري واصل للبيت. نجار فنان ومحترف وسياراتهم نظيفة ومجهزة.',
      serviceUsed: 'هاف لوري وفك وتركيب أثاث',
      reviewDate: 'منذ أسبوعين'
    },
    {
      id: 4,
      customerName: 'د. يعقوب الكندري',
      area: 'العديلية',
      rating: 5,
      comment: 'قمة في الأمانة والاحتراف. تم نقل مكتبي الخاص وكتبي وأجهزتي بكل سلاسة وتنظيم. شكراً جزيلاً لكم.',
      serviceUsed: 'نقل أثاث مكتبي',
      reviewDate: 'منذ شهر'
    }
  ];

  constructor(private http: HttpClient) {}

  getCompanyInfo(): Observable<CompanyInfo> {
    return this.http.get<CompanyInfo>(`${this.apiBase}/company`).pipe(
      catchError(() => of(this.defaultCompany))
    );
  }

  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiBase}/services`).pipe(
      catchError(() => of(this.defaultServices))
    );
  }

  getAreas(): Observable<GovernorateArea[]> {
    return this.http.get<GovernorateArea[]>(`${this.apiBase}/areas`).pipe(
      catchError(() => of(this.defaultAreas))
    );
  }

  getReviews(): Observable<CustomerReview[]> {
    return this.http.get<CustomerReview[]>(`${this.apiBase}/reviews`).pipe(
      catchError(() => of(this.defaultReviews))
    );
  }

  calculateCostLocal(req: Partial<QuoteRequest>): number {
    const rooms = Math.max(1, req.roomCount || 1);
    let total = 20; // Base KWD
    total += (rooms - 1) * 12;

    if (req.requiresPacking) {
      total += rooms * 8;
    }
    if (req.requiresDisassembly) {
      total += rooms * 10;
    }
    if (req.fromGovernorate && req.toGovernorate && req.fromGovernorate !== req.toGovernorate) {
      total += 5;
    }
    return total;
  }

  submitQuote(quote: QuoteRequest): Observable<QuoteRequest> {
    return this.http.post<QuoteRequest>(`${this.apiBase}/quotes`, quote).pipe(
      catchError(() => {
        quote.estimatedCostKwd = this.calculateCostLocal(quote);
        return of(quote);
      })
    );
  }

  addReview(review: CustomerReview): Observable<CustomerReview> {
    return this.http.post<CustomerReview>(`${this.apiBase}/reviews`, review).pipe(
      catchError(() => {
        review.id = Math.floor(Math.random() * 1000) + 10;
        review.reviewDate = 'الآن';
        this.defaultReviews.unshift(review);
        return of(review);
      })
    );
  }

  generateWhatsAppMessage(quote: Partial<QuoteRequest>, estimatedCost?: number): string {
    const costText = estimatedCost ? ` التكلفة التقديرية: ${estimatedCost} د.ك.` : '';
    const text = `السلام عليكم ورحمة الله وبركاته،
أرغب بحجز خدمة نقل عفش:
- الاسم: ${quote.fullName || 'عميل محترم'}
- الهاتف: ${quote.phoneNumber || '60055108'}
- من: ${quote.fromGovernorate || 'غير محدد'}
- إلى: ${quote.toGovernorate || 'غير محدد'}
- عدد الغرف: ${quote.roomCount || 1}
- فك وتركيب: ${quote.requiresDisassembly ? 'نعم' : 'لا'}
- تغليف: ${quote.requiresPacking ? 'نعم' : 'لا'}
${costText}
- ملاحظات: ${quote.additionalNotes || 'يرجى التواصل لتأكيد الموعد'}`;
    return `https://wa.me/96560055108?text=${encodeURIComponent(text)}`;
  }
}
