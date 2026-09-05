import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfo } from '../../models/moving.models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="hero-grid">
          <!-- Text Column -->
          <div class="hero-text-col">
            <div class="hero-badge">
              <i class="fa-solid fa-shield-halved"></i>
              <span>الشركة الأولى المعتمدة لنقل العفش في الكويت 24 ساعة</span>
            </div>

            <h1 class="hero-title">
              نقل وفك وتركيب وتغليف العفش في الكويت
              <span class="highlight-text">بأعلى درجات الأمان والاحتراف</span>
            </h1>

            <p class="hero-desc">
              عمالة فنية مدربة ونجارون متخصصون في فك وتركيب جميع أنواع غرف النوم، أثاث إيكيا، المطابخ، والستائر مع تغليف حراري وبابلز للحماية التامة. أسطول هاف لوري مجهز ومغلق يصلك أينما كنت.
            </p>

            <!-- Prominent Action Buttons -->
            <div class="hero-actions">
              <a [href]="'tel:' + (company?.phone || '60055108')" class="hero-btn-call">
                <div class="call-pulse-icon">
                  <i class="fa-solid fa-phone"></i>
                </div>
                <div class="call-btn-info">
                  <span class="call-label">اتصل مباشرة الآن</span>
                  <span class="call-number">{{ company?.phone || '60055108' }}</span>
                </div>
              </a>

              <a [href]="company?.whatsAppUrl" target="_blank" rel="noopener" class="hero-btn-whatsapp">
                <i class="fa-brands fa-whatsapp wa-icon"></i>
                <div class="wa-btn-info">
                  <span class="wa-label">تواصل عبر الواتساب</span>
                  <span class="wa-sub">رد فوري خلال ثوانٍ</span>
                </div>
              </a>
            </div>

            <!-- Trust Points -->
            <div class="trust-strip">
              <div class="trust-item">
                <i class="fa-solid fa-circle-check"></i>
                <span>ضمان سلامة الأثاث 100%</span>
              </div>
              <div class="trust-item">
                <i class="fa-solid fa-bolt-lightning"></i>
                <span>وصول خلال 20 دقيقة</span>
              </div>
              <div class="trust-item">
                <i class="fa-solid fa-tag"></i>
                <span>أسعار تبدأ من 15 د.ك</span>
              </div>
            </div>
          </div>

          <!-- Visual Showcase Card Column -->
          <div class="hero-card-col">
            <div class="showcase-card">
              <div class="card-image-wrap">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" 
                  alt="نقل عفش الكويت 60055108"
                  class="card-img"
                  loading="eager"
                />
                <div class="card-badge">
                  <i class="fa-solid fa-award"></i>
                  <span>خبرة +16 عاماً</span>
                </div>
              </div>

              <div class="card-body">
                <div class="service-quick-features">
                  <div class="quick-feature">
                    <i class="fa-solid fa-screwdriver-wrench"></i>
                    <span>فك وتركيب إيكيا وغرف النوم</span>
                  </div>
                  <div class="quick-feature">
                    <i class="fa-solid fa-box-open"></i>
                    <span>تغليف كرتون وبابلز ممتاز</span>
                  </div>
                  <div class="quick-feature">
                    <i class="fa-solid fa-truck"></i>
                    <span>هاف لوري مغلق ومجهز</span>
                  </div>
                </div>

                <div class="card-footer-cta">
                  <div class="rating-box">
                    <div class="stars">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </div>
                    <span class="rating-text">4.9 / 5 تقييم عملائنا بالكويت</span>
                  </div>
                  <a href="#calculator" class="estimate-link">احسب التكلفة التقديرية <i class="fa-solid fa-arrow-left"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      background: linear-gradient(135deg, #071e3d 0%, #0c356a 50%, #0a2647 100%);
      color: #ffffff;
      padding: 70px 0 90px 0;
      overflow: hidden;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.12) 0%, transparent 60%);
      pointer-events: none;
    }
    .hero-content {
      position: relative;
      z-index: 10;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 50px;
      align-items: center;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      padding: 8px 18px;
      border-radius: var(--radius-full);
      font-size: 0.92rem;
      font-weight: 700;
      color: #fde047;
      margin-bottom: 22px;
    }
    .hero-title {
      font-size: 2.8rem;
      font-weight: 900;
      line-height: 1.25;
      margin-bottom: 20px;
    }
    .highlight-text {
      display: block;
      color: var(--accent);
      background: linear-gradient(90deg, #f59e0b, #fbbf24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-desc {
      font-size: 1.18rem;
      color: #cbd5e1;
      line-height: 1.8;
      margin-bottom: 35px;
      max-width: 620px;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      margin-bottom: 35px;
    }
    .hero-btn-call {
      display: flex;
      align-items: center;
      gap: 15px;
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      color: #ffffff;
      padding: 12px 26px;
      border-radius: var(--radius-full);
      box-shadow: 0 8px 25px rgba(2, 132, 199, 0.4);
      transition: var(--transition);
    }
    .hero-btn-call:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(2, 132, 199, 0.6);
    }
    .call-pulse-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #ffffff;
      color: #0284c7;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      animation: pulse-ring 2s infinite;
    }
    .call-btn-info {
      display: flex;
      flex-direction: column;
      text-align: right;
    }
    .call-label {
      font-size: 0.85rem;
      font-weight: 600;
      opacity: 0.9;
    }
    .call-number {
      font-size: 1.55rem;
      font-weight: 900;
      letter-spacing: 1px;
    }
    .hero-btn-whatsapp {
      display: flex;
      align-items: center;
      gap: 15px;
      background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
      color: #ffffff;
      padding: 12px 26px;
      border-radius: var(--radius-full);
      box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
      transition: var(--transition);
    }
    .hero-btn-whatsapp:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(37, 211, 102, 0.6);
    }
    .wa-icon {
      font-size: 2.2rem;
    }
    .wa-btn-info {
      display: flex;
      flex-direction: column;
      text-align: right;
    }
    .wa-label {
      font-size: 1.05rem;
      font-weight: 800;
    }
    .wa-sub {
      font-size: 0.82rem;
      opacity: 0.9;
    }
    .trust-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .trust-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      color: #e2e8f0;
    }
    .trust-item i {
      color: #4ade80;
    }
    .showcase-card {
      background: #ffffff;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
      border: 3px solid rgba(255, 255, 255, 0.1);
    }
    .card-image-wrap {
      position: relative;
      height: 250px;
      overflow: hidden;
    }
    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    .showcase-card:hover .card-img {
      transform: scale(1.05);
    }
    .card-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      background: var(--accent);
      color: #ffffff;
      padding: 6px 14px;
      border-radius: var(--radius-full);
      font-weight: 800;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    .card-body {
      padding: 24px;
      color: var(--gray-800);
    }
    .service-quick-features {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--gray-200);
      padding-bottom: 20px;
    }
    .quick-feature {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 700;
      color: var(--primary-dark);
      font-size: 1.02rem;
    }
    .quick-feature i {
      color: var(--accent);
      font-size: 1.15rem;
      width: 24px;
    }
    .card-footer-cta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    }
    .stars {
      color: #f59e0b;
      font-size: 0.95rem;
    }
    .rating-text {
      display: block;
      font-size: 0.85rem;
      color: var(--gray-600);
      font-weight: 600;
    }
    .estimate-link {
      color: var(--primary);
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: var(--transition);
    }
    .estimate-link:hover {
      color: var(--accent);
      gap: 10px;
    }

    @media (max-width: 992px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .hero-title {
        font-size: 2.2rem;
      }
      .hero {
        padding: 45px 0 60px 0;
      }
    }
    @media (max-width: 576px) {
      .hero-title {
        font-size: 1.85rem;
      }
      .hero-actions {
        flex-direction: column;
        width: 100%;
      }
      .hero-btn-call, .hero-btn-whatsapp {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HeroComponent {
  @Input() company?: CompanyInfo;
}
