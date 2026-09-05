import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GovernorateArea, CompanyInfo } from '../../models/moving.models';

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="areas" class="section areas-section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">تغطية شاملة لكل الكويت</span>
          <h2 class="section-title">نصلك أينما كنت في جميع محافظات ومناطق الكويت 24 ساعة</h2>
          <p class="section-desc">
            لدينا سيارات هاف لوري ووانيتات موزعة استراتيجياً في كافة مناطق الكويت لنصلك خلال أقل من 30 دقيقة من اتصالك.
          </p>
        </div>

        <div class="areas-grid">
          <div *ngFor="let area of areas" class="area-card">
            <div class="area-top">
              <div class="area-icon">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <h3 class="area-name">{{ area.name }}</h3>
                <span class="area-sub">{{ area.tagline }}</span>
              </div>
            </div>

            <div class="area-badge-row">
              <span class="badge-pill badge-green">
                <i class="fa-solid fa-bolt"></i>
                وصول خلال {{ area.fastResponseMinutes }} دقيقة
              </span>
              <span class="badge-pill badge-blue" *ngIf="area.available24Hours">
                <i class="fa-solid fa-clock"></i>
                متوفر 24/7
              </span>
            </div>

            <div class="districts-list">
              <span class="districts-label">أبرز المناطق:</span>
              <div class="tags-wrap">
                <span *ngFor="let district of area.majorDistricts" class="district-tag">
                  {{ district }}
                </span>
              </div>
            </div>

            <div class="area-cta">
              <a [href]="'tel:' + (company?.phone || '60055108')" class="area-call-link">
                <i class="fa-solid fa-phone"></i>
                <span>طلب سيارة في {{ area.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .areas-section {
      background: #f1f5f9;
    }
    .areas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 24px;
    }
    .area-card {
      background: #ffffff;
      border-radius: var(--radius-md);
      padding: 24px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--gray-200);
      display: flex;
      flex-direction: column;
      transition: var(--transition);
    }
    .area-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(10, 56, 113, 0.1);
      border-color: var(--primary-light);
    }
    .area-top {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 14px;
    }
    .area-icon {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      background: rgba(245, 158, 11, 0.15);
      color: #d97706;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      flex-shrink: 0;
    }
    .area-name {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--dark);
    }
    .area-sub {
      font-size: 0.85rem;
      color: var(--gray-600);
    }
    .area-badge-row {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .districts-list {
      margin-bottom: 20px;
      flex-grow: 1;
    }
    .districts-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--gray-600);
      display: block;
      margin-bottom: 8px;
    }
    .tags-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .district-tag {
      background: var(--gray-100);
      color: var(--gray-700);
      font-size: 0.82rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 6px;
    }
    .area-cta {
      border-top: 1px solid var(--gray-200);
      padding-top: 14px;
    }
    .area-call-link {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: var(--primary);
      font-weight: 700;
      font-size: 0.95rem;
      transition: var(--transition);
    }
    .area-call-link:hover {
      color: var(--accent);
    }
  `]
})
export class AreasComponent {
  @Input() areas: GovernorateArea[] = [];
  @Input() company?: CompanyInfo;
}
