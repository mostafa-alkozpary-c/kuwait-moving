import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceItem, CompanyInfo } from '../../models/moving.models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="section services-section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">خدماتنا الشاملة في الكويت</span>
          <h2 class="section-title">حلول احترافية متكاملة لنقل وفك وتغليف الأثاث</h2>
          <p class="section-desc">
            نقدم باقة واسعة من خدمات نقل العفش والأثاث المنزلي والمكتبي بأيدي نجارين وفنيين مهرة وسيارات مجهزة لضمان راحة بالك وسلامة كل قطعة.
          </p>
        </div>

        <div class="services-grid">
          <div *ngFor="let service of services" class="service-card">
            <div class="service-img-wrap">
              <img [src]="service.imageUrl" [alt]="service.title" class="service-img" loading="lazy" />
              <div class="price-tag">
                <span class="price-unit">{{ service.unitText }}</span>
                <span class="price-value">{{ service.startingPriceKwd }} د.ك</span>
              </div>
            </div>

            <div class="service-content">
              <div class="service-header">
                <div class="service-icon">
                  <i class="fa-solid" [ngClass]="service.icon"></i>
                </div>
                <h3 class="service-title">{{ service.title }}</h3>
              </div>

              <p class="service-desc">{{ service.fullDescription }}</p>

              <div class="service-highlights">
                <div *ngFor="let item of service.highlights" class="highlight-item">
                  <i class="fa-solid fa-check"></i>
                  <span>{{ item }}</span>
                </div>
              </div>

              <div class="service-card-actions">
                <a [href]="'tel:' + (company?.phone || '60055108')" class="btn btn-call service-btn">
                  <i class="fa-solid fa-phone"></i>
                  <span>اتصل الآن</span>
                </a>
                <a [href]="getServiceWhatsApp(service.title)" target="_blank" rel="noopener" class="btn btn-whatsapp service-btn">
                  <i class="fa-brands fa-whatsapp"></i>
                  <span>حجز بالواتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      background-color: #f8fafc;
    }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
    }
    .service-card {
      background: #ffffff;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--gray-200);
      display: flex;
      flex-direction: column;
      transition: var(--transition);
    }
    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(10, 56, 113, 0.12);
      border-color: rgba(10, 56, 113, 0.2);
    }
    .service-img-wrap {
      position: relative;
      height: 220px;
      overflow: hidden;
    }
    .service-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .service-card:hover .service-img {
      transform: scale(1.08);
    }
    .price-tag {
      position: absolute;
      bottom: 15px;
      left: 15px;
      background: rgba(10, 56, 113, 0.9);
      backdrop-filter: blur(8px);
      color: #ffffff;
      padding: 6px 14px;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 800;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
    .price-unit {
      font-size: 0.8rem;
      opacity: 0.85;
    }
    .price-value {
      font-size: 1.1rem;
      color: #fde047;
    }
    .service-content {
      padding: 26px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .service-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 14px;
    }
    .service-icon {
      width: 50px;
      height: 50px;
      border-radius: 14px;
      background: linear-gradient(135deg, rgba(10, 56, 113, 0.1) 0%, rgba(21, 91, 181, 0.15) 100%);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      flex-shrink: 0;
    }
    .service-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--dark);
      line-height: 1.3;
    }
    .service-desc {
      color: var(--gray-600);
      font-size: 0.98rem;
      line-height: 1.7;
      margin-bottom: 20px;
    }
    .service-highlights {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 25px;
      background: var(--gray-50);
      padding: 14px 16px;
      border-radius: var(--radius-md);
    }
    .highlight-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--gray-700);
    }
    .highlight-item i {
      color: #10b981;
      font-size: 0.9rem;
    }
    .service-card-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: auto;
    }
    .service-btn {
      padding: 10px 14px;
      font-size: 0.92rem;
      border-radius: var(--radius-md);
    }

    @media (max-width: 480px) {
      .services-grid {
        grid-template-columns: 1fr;
      }
      .service-card-actions {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ServicesComponent {
  @Input() services: ServiceItem[] = [];
  @Input() company?: CompanyInfo;

  getServiceWhatsApp(title: string): string {
    const text = `السلام عليكم، أرغب بحجز خدمة (${title}) عبر شركة الفهد لنقل العفش. يرجى تزويدي بالتفاصيل والتكلفة.`;
    return `https://wa.me/96560055108?text=${encodeURIComponent(text)}`;
  }
}
