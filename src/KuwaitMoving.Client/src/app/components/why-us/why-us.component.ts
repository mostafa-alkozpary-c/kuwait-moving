import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfo } from '../../models/moving.models';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="section why-us-section">
      <div class="container">
        <div class="why-us-grid">
          <!-- Text Info -->
          <div class="why-text-col">
            <span class="section-subtitle">لماذا نحن خيارك الأفضل؟</span>
            <h2 class="section-title">خبرة تمتد لأكثر من 16 عاماً في نقل وتغليف العفش بالكويت</h2>
            <p class="section-desc">
              نحن ندرك جيداً أن أثاثك ومقتنياتك تمثل قيمة غالية لمنزلك، لذا نلتزم بأعلى معايير الحيطة والحذر والأمانة في الفك والتركيب والتغليف والنقل.
            </p>

            <div class="features-list">
              <div class="feature-item" *ngFor="let feat of features">
                <div class="feat-icon">
                  <i class="fa-solid" [ngClass]="feat.icon"></i>
                </div>
                <div>
                  <h4 class="feat-title">{{ feat.title }}</h4>
                  <p class="feat-desc">{{ feat.desc }}</p>
                </div>
              </div>
            </div>

            <div class="call-banner">
              <div class="call-banner-text">
                <strong>هل ترغب بنقل عفشك اليوم؟</strong>
                <span>سياراتنا جاهزة للتحرك فوراً</span>
              </div>
              <a [href]="'tel:' + (company?.phone || '60055108')" class="btn btn-call">
                <i class="fa-solid fa-phone"></i>
                <span>60055108</span>
              </a>
            </div>
          </div>

          <!-- Stats / Visual Col -->
          <div class="why-visual-col">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-num">+16,800</div>
                <div class="stat-label">عملية نقل ناجحة</div>
              </div>
              <div class="stat-card accent-card">
                <div class="stat-num">4.9 ★</div>
                <div class="stat-label">تقييم العملاء في الكويت</div>
              </div>
              <div class="stat-card">
                <div class="stat-num">24 / 7</div>
                <div class="stat-label">خدمة متواصلة دون عطلات</div>
              </div>
              <div class="stat-card">
                <div class="stat-num">20 دقيقة</div>
                <div class="stat-label">متوسط سرعة الوصول</div>
              </div>
            </div>

            <div class="guarantee-box">
              <i class="fa-solid fa-certificate guarantee-icon"></i>
              <div>
                <h4>كفالة وضمان سلامة المنقولات</h4>
                <p>نلتزم بحماية وسلامة كل قطعة أثاث ونضمن وصولها دون أي خدوش أو تلفيات.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .why-us-section {
      background: #ffffff;
    }
    .why-us-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 50px;
      align-items: center;
    }
    .features-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 30px 0;
    }
    .feature-item {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }
    .feat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(10, 56, 113, 0.08);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      flex-shrink: 0;
    }
    .feat-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--dark);
      margin-bottom: 4px;
    }
    .feat-desc {
      font-size: 0.92rem;
      color: var(--gray-600);
      line-height: 1.6;
    }
    .call-banner {
      background: var(--gray-50);
      border: 1px dashed var(--primary);
      padding: 18px 24px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      flex-wrap: wrap;
    }
    .call-banner-text {
      display: flex;
      flex-direction: column;
    }
    .call-banner-text strong {
      color: var(--dark);
      font-size: 1.05rem;
    }
    .call-banner-text span {
      color: var(--gray-600);
      font-size: 0.85rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: var(--gray-50);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-md);
      padding: 24px;
      text-align: center;
    }
    .accent-card {
      background: linear-gradient(135deg, #0a3871 0%, #155bb5 100%);
      color: #ffffff;
      border: none;
    }
    .accent-card .stat-num {
      color: #fde047;
    }
    .accent-card .stat-label {
      color: #e2e8f0;
    }
    .stat-num {
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--primary-dark);
      margin-bottom: 6px;
      line-height: 1;
    }
    .stat-label {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--gray-600);
    }
    .guarantee-box {
      background: #fef3c7;
      border: 1px solid #fcd34d;
      border-radius: var(--radius-md);
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .guarantee-icon {
      font-size: 2.5rem;
      color: #d97706;
      flex-shrink: 0;
    }
    .guarantee-box h4 {
      font-size: 1.1rem;
      font-weight: 800;
      color: #78350f;
      margin-bottom: 4px;
    }
    .guarantee-box p {
      font-size: 0.88rem;
      color: #92400e;
      line-height: 1.5;
    }

    @media (max-width: 992px) {
      .why-us-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WhyUsComponent {
  @Input() company?: CompanyInfo;

  features = [
    {
      icon: 'fa-user-gear',
      title: 'نجارون وفنيون متخصصون',
      desc: 'فريق مدرب باحترافية لفك وتركيب كل أنواع الأثاث المعقد، كالإيكيا وميداس والخزائن وغرف النوم الحديثة.'
    },
    {
      icon: 'fa-shield-halved',
      title: 'تغليف وحماية فائقة',
      desc: 'نوفر كراتين متينة، رولات فقاعية بابلز، ونايلون استريتش لحماية الأثاث والزجاج من أي خدوش أو كدمات.'
    },
    {
      icon: 'fa-truck-fast',
      title: 'هاف لوري ووانيتات نظيفة ومجهزة',
      desc: 'سيارات مغلقة ومبطنة مجهزة بأحزمة تثبيت لمنع احتكاك القطع أثناء سير الشاحنة على الطرقات.'
    },
    {
      icon: 'fa-handshake-angle',
      title: 'التزام وأمانة تامة وأسعار واضحة',
      desc: 'نلتزم بالمواعيد المحددة مع العميل بدقة متناهية، وبأسعار تنافسية عادلة ومناسبة للجميع دون أي رسوم إضافية.'
    }
  ];
}
