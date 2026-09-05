# حل نقل وفك وتركيب العفش بالكويت (Kuwait Furniture Moving Solution)

حل برمجي متكامل ومحترف (Full-Stack Solution) مخصص لخدمات **نقل وفك وتركيب وتغليف الأثاث في دولة الكويت**، مبني بأحدث التقنيات:
- **الواجهة الأمامية (Frontend):** Angular 19 (Standalone Components + TypeScript + CSS3 متجاوب + تصميم RTL عربي متكامل مع خط Cairo).
- **الواجهة الخلفية (Backend):** ASP.NET Core Web API (.NET 10 / C#) مع دعم OpenAPI و CORS.
- **رابط المستودع على GitHub:** [https://github.com/mostafa-alkozpary-c/kuwait-moving](https://github.com/mostafa-alkozpary-c/kuwait-moving)
- **الرابط المباشر للعميل (Live URL):** [https://mostafa-alkozpary-c.github.io/kuwait-moving/](https://mostafa-alkozpary-c.github.io/kuwait-moving/)
- **رقم الهاتف المعتمد:** `60055108` (الرقم الدولي: `+96560055108`).
- **رابط الواتساب المباشر:** يفتح محادثة فورية جاهزة بنص الطلب والتكلفة التقديرية.

---

## 🚀 مميزات المشروع

1. **أزرار الاتصال والواتساب السريعة:**
   - شريط اتصال عائم ثابت أسفل الشاشة في الهواتف الذكية (Sticky Bottom Action Bar).
   - زر اتصال هاتفي مباشر بزر نبضي (`tel:60055108`).
   - زر واتساب مباشر بمحادثة مسبقة الصياغة لنقل العفش.
2. **معرض صور احترافي للأعمال (Gallery):**
   - فلترة حسب التصنيفات (شاحنات هاف لوري، تغليف بابلز وكرتون، فك وتركيب غرف نوم وإيكيا، فريق العمل بالموقع).
   - نافذة عرض مكبرة (Modal Lightbox) مع زر طلب مباشر.
3. **حاسبة تكلفة تقديرية تفاعلية (Price Estimator):**
   - اختيار محافظات النقل في الكويت (حولي، العاصمة، الفروانية، الأحمدي، مبارك الكبير، الجهراء).
   - عداد الغرف مع خيارات فك وتركيب وتغليف الأثاث.
   - إرسال تفاصيل الحساب إلى الواتساب مباشرة أو حفظها بالـ API.
4. **تغطية شاملة لكافة مناطق ومحافظات الكويت:**
   - بطاقات تفاعلية لمحافظات الكويت مع متوسط زمن الوصول (15-25 دقيقة).
5. **قسم آراء العملاء ونظام إضافة التقييم:**
   - تقييمات واقعية من مناطق الكويت مع إمكانية إضافة تقييم جديد يُحفظ عبر الـ API.
6. **الأسئلة الشائعة (FAQ Accordion):**
   - إجابات عن كل ما يهم العميل الكويتي (الأسعار، فك وتركيب إيكيا، توفير الكراتين، ساعات العمل 24/7).

---

## 📁 هيكل الحل البرمجي (Solution Structure)

```text
a:/Test/SurvayProjectTestsol/clkw/
├── KuwaitMovingSolution.sln         # ملف حل Visual Studio (Classic)
├── KuwaitMovingSolution.slnx        # ملف حل Visual Studio الحديث (.NET 10)
├── run.bat                          # سكريبت تشغيل الـ API والـ Angular بنقرة واحدة
├── README.md                        # دليل المشروع
├── src/
│   ├── KuwaitMoving.Api/            # مشروع .NET 10 Web API
│   │   ├── Controllers/             # وحدات التحكم (Services, Quotes, Company, Reviews, Areas)
│   │   ├── Models/                  # نماذج البيانات (ServiceItem, QuoteRequest, CompanyInfo...)
│   │   ├── Services/                # خدمة البيانات (DataService)
│   │   ├── Program.cs               # إعدادات الـ CORS و OpenAPI
│   │   └── KuwaitMoving.Api.csproj
│   │
│   └── KuwaitMoving.Client/         # تطبيق Angular 19
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/      # المكونات المستقلة (Navbar, Hero, Services, Gallery...)
│       │   │   ├── models/          # واجهات TypeScript
│       │   │   ├── services/        # خدمة الاتصال بالـ API مع Fallback وضع عدم الاتصال
│       │   │   ├── app.component.ts
│       │   │   └── app.component.html
│       │   ├── styles.css           # نظام التصميم والألوان والخطوط والحركات
│       │   └── index.html           # صفحة الهبوط الرئيسية مع إعدادات SEO و WhatsApp OpenGraph
│       ├── angular.json
│       ├── package.json
│       └── tsconfig.json
```

---

## 🛠️ كيفية التشغيل السريع

### الطريقة الأولى: عبر ملف `run.bat`
- انقر نقراً مزدوجاً على ملف [run.bat](file:///a:/Test/SurvayProjectTestsol/clkw/run.bat)، وسيتم تشغيل الـ API ومشروع Angular تلقائياً في نافذتين منفصلتين.

### الطريقة الثانية: تشغيل يدوي عبر الطرفية (Terminal)

#### 1. تشغيل الواجهة الخلفية (.NET Web API):
```powershell
cd a:\Test\SurvayProjectTestsol\clkw\src\KuwaitMoving.Api
dotnet run
```
سيعمل الـ API على: `https://localhost:7196` أو `http://localhost:5196`

#### 2. تشغيل الواجهة الأمامية (Angular Client):
```powershell
cd a:\Test\SurvayProjectTestsol\clkw\src\KuwaitMoving.Client
npm start
```
افتح المتصفح على: `http://localhost:4200`

---

## 📦 بناء نسخة الإنتاج (Production Build)

- **بناء Angular:**
  ```powershell
  cd a:\Test\SurvayProjectTestsol\clkw\src\KuwaitMoving.Client
  npm run build
  ```
  تُنتج الملفات الجاهزة للنشر فوراً في المجلد: `src/KuwaitMoving.Client/dist/kuwait-moving-client`.

- **بناء .NET API:**
  ```powershell
  cd a:\Test\SurvayProjectTestsol\clkw\src\KuwaitMoving.Api
  dotnet publish -c Release -o ./publish
  ```
