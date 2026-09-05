import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyInfo, GovernorateArea, QuoteRequest } from '../../models/moving.models';
import { MovingApiService } from '../../services/moving-api.service';

@Component({
  selector: 'app-quote-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="calculator" class="section calc-section">
      <div class="container">
        <div class="calc-box">
          <div class="calc-header">
            <span class="section-subtitle text-white">احسب تكلفة نقلك التقديرية</span>
            <h2 class="calc-title">حاسبة أسعار نقل العفش في الكويت</h2>
            <p class="calc-desc">
              حدد تفاصيل النقل لتحصل على تقدير فوري للتكلفة، ويمكنك حجز موعدك مباشرة عبر الواتساب أو بالاتصال على 60055108.
            </p>
          </div>

          <div class="calc-body">
            <div class="calc-grid">
              <!-- Form Column -->
              <div class="calc-form">
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">
                      <i class="fa-solid fa-location-arrow"></i>
                      النقل من محافظة:
                    </label>
                    <select [(ngModel)]="quote.fromGovernorate" (change)="recalculate()" class="form-select">
                      <option value="">اختر المحافظة</option>
                      <option *ngFor="let a of areas" [value]="a.name">{{ a.name }}</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <i class="fa-solid fa-location-dot"></i>
                      النقل إلى محافظة:
                    </label>
                    <select [(ngModel)]="quote.toGovernorate" (change)="recalculate()" class="form-select">
                      <option value="">اختر المحافظة</option>
                      <option *ngFor="let a of areas" [value]="a.name">{{ a.name }}</option>
                    </select>
                  </div>
                </div>

                <!-- Rooms Stepper -->
                <div class="form-group">
                  <label class="form-label">
                    <i class="fa-solid fa-bed"></i>
                    عدد الغرف المراد نقلها:
                  </label>
                  <div class="stepper">
                    <button type="button" class="step-btn" (click)="adjustRooms(-1)" [disabled]="quote.roomCount <= 1">
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="step-value">{{ quote.roomCount }} غرف</span>
                    <button type="button" class="step-btn" (click)="adjustRooms(1)" [disabled]="quote.roomCount >= 10">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>

                <!-- Add-on Services Checkboxes -->
                <div class="checkbox-group">
                  <label class="custom-checkbox">
                    <input type="checkbox" [(ngModel)]="quote.requiresDisassembly" (change)="recalculate()" />
                    <span class="checkmark"></span>
                    <span class="check-text">
                      <strong>فك وتركيب الأثاث</strong>
                      <small>فك وتركيب غرف النوم، الخزائن، إيكيا، الستائر بواسطة نجار متخصص</small>
                    </span>
                  </label>

                  <label class="custom-checkbox">
                    <input type="checkbox" [(ngModel)]="quote.requiresPacking" (change)="recalculate()" />
                    <span class="checkmark"></span>
                    <span class="check-text">
                      <strong>تغليف شامل للأثاث والمقتنيات</strong>
                      <small>استخدام كراتين مقواة، بابلز هوائي فقاعي، نايلون حراري لحماية الزجاج</small>
                    </span>
                  </label>
                </div>

                <!-- Customer Details -->
                <div class="form-row" style="margin-top: 20px;">
                  <div class="form-group">
                    <label class="form-label">
                      <i class="fa-solid fa-user"></i>
                      اسمك الكريم (اختياري):
                    </label>
                    <input type="text" [(ngModel)]="quote.fullName" placeholder="مثال: أبو عبدالله" class="form-input" />
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <i class="fa-solid fa-phone"></i>
                      رقم هاتفك للتواصل:
                    </label>
                    <input type="tel" [(ngModel)]="quote.phoneNumber" placeholder="مثال: 60055108" class="form-input" />
                  </div>
                </div>
              </div>

              <!-- Price Result & Action Column -->
              <div class="calc-result-col">
                <div class="price-badge-card">
                  <span class="price-title">التكلفة التقديرية</span>
                  <div class="price-display">
                    <span class="price-number">{{ estimatedPrice }}</span>
                    <span class="currency-tag">دينار كويتي (د.ك)</span>
                  </div>
                  <p class="price-hint">
                    * السعر تقديري وعادل يشمل الشاحنة والعمالة. السعر النهائي يثبت بعد المعاينة المباشرة دون أي رسوم خفية.
                  </p>

                  <div class="calc-buttons">
                    <a [href]="getWhatsAppUrl()" target="_blank" rel="noopener" class="btn btn-whatsapp btn-calc-action">
                      <i class="fa-brands fa-whatsapp"></i>
                      <span>إرسال الطلب عبر الواتساب</span>
                    </a>

                    <a [href]="'tel:' + (company?.phone || '60055108')" class="btn btn-call btn-calc-action">
                      <i class="fa-solid fa-phone"></i>
                      <span>اتصل الآن: {{ company?.phone || '60055108' }}</span>
                    </a>

                    <button type="button" (click)="submitToApi()" [disabled]="isSubmitting" class="btn btn-primary btn-calc-action">
                      <i class="fa-solid fa-paper-plane" *ngIf="!isSubmitting"></i>
                      <i class="fa-solid fa-spinner fa-spin" *ngIf="isSubmitting"></i>
                      <span>{{ submitButtonText }}</span>
                    </button>
                  </div>

                  <div *ngIf="submissionSuccess" class="submission-alert">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>تم تسجيل طلبك بنجاح! سيتواصل معك مندوبنا خلال دقائق.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .calc-section {
      background: linear-gradient(135deg, #061930 0%, #0a2e5c 100%);
      color: #ffffff;
      padding: 60px 0;
    }
    .calc-box {
      max-width: 1050px;
      margin: 0 auto;
    }
    .calc-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .text-white {
      color: #93c5fd !important;
    }
    .calc-title {
      font-size: 2.2rem;
      font-weight: 900;
      margin-bottom: 12px;
      color: #ffffff;
    }
    .calc-desc {
      color: #cbd5e1;
      font-size: 1.05rem;
      max-width: 650px;
      margin: 0 auto;
    }
    .calc-body {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-lg);
      padding: 35px;
    }
    .calc-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 35px;
      align-items: center;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }
    .form-label {
      font-size: 0.95rem;
      font-weight: 700;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .form-label i {
      color: var(--accent);
    }
    .form-select, .form-input {
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #ffffff;
      padding: 12px 14px;
      border-radius: var(--radius-md);
      font-size: 0.95rem;
      transition: var(--transition);
      outline: none;
    }
    .form-select option {
      background: #0f2b48;
      color: #ffffff;
    }
    .form-select:focus, .form-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
    }
    .stepper {
      display: flex;
      align-items: center;
      gap: 15px;
      background: rgba(255, 255, 255, 0.1);
      padding: 8px 16px;
      border-radius: var(--radius-md);
      width: fit-content;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .step-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--accent);
      color: #ffffff;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
    }
    .step-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .step-value {
      font-size: 1.2rem;
      font-weight: 800;
      min-width: 70px;
      text-align: center;
    }
    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 10px;
    }
    .custom-checkbox {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.08);
      padding: 12px 16px;
      border-radius: var(--radius-md);
      border: 1px solid rgba(255, 255, 255, 0.15);
      transition: var(--transition);
    }
    .custom-checkbox:hover {
      background: rgba(255, 255, 255, 0.14);
    }
    .custom-checkbox input {
      width: 20px;
      height: 20px;
      margin-top: 2px;
      accent-color: var(--accent);
      cursor: pointer;
    }
    .check-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .check-text strong {
      font-size: 1rem;
      color: #ffffff;
    }
    .check-text small {
      color: #94a3b8;
      font-size: 0.82rem;
    }
    .price-badge-card {
      background: #ffffff;
      border-radius: var(--radius-lg);
      padding: 30px 24px;
      color: var(--gray-800);
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    .price-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--gray-600);
      display: block;
      margin-bottom: 8px;
    }
    .price-display {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .price-number {
      font-size: 3.5rem;
      font-weight: 900;
      color: var(--primary-dark);
      line-height: 1;
    }
    .currency-tag {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--accent);
    }
    .price-hint {
      font-size: 0.82rem;
      color: var(--gray-600);
      margin-bottom: 24px;
      line-height: 1.5;
    }
    .calc-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .btn-calc-action {
      width: 100%;
      padding: 13px 20px;
      font-size: 1rem;
    }
    .submission-alert {
      margin-top: 16px;
      padding: 12px;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      border-radius: var(--radius-md);
      font-size: 0.92rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    @media (max-width: 992px) {
      .calc-grid {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 576px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      .calc-body {
        padding: 20px;
      }
    }
  `]
})
export class QuoteCalculatorComponent {
  @Input() company?: CompanyInfo;
  @Input() areas: GovernorateArea[] = [];

  quote: QuoteRequest = {
    fullName: '',
    phoneNumber: '',
    serviceType: 'نقل عفش شامل',
    fromGovernorate: 'محافظة حولي',
    toGovernorate: 'محافظة العاصمة',
    roomCount: 2,
    requiresDisassembly: true,
    requiresPacking: true
  };

  estimatedPrice = 55;
  isSubmitting = false;
  submitButtonText = 'حفظ الطلب بالسيستم';
  submissionSuccess = false;

  constructor(private apiService: MovingApiService) {}

  adjustRooms(delta: number) {
    const newCount = this.quote.roomCount + delta;
    if (newCount >= 1 && newCount <= 10) {
      this.quote.roomCount = newCount;
      this.recalculate();
    }
  }

  recalculate() {
    this.estimatedPrice = this.apiService.calculateCostLocal(this.quote);
  }

  getWhatsAppUrl(): string {
    return this.apiService.generateWhatsAppMessage(this.quote, this.estimatedPrice);
  }

  submitToApi() {
    this.isSubmitting = true;
    this.submitButtonText = 'جاري إرسال الطلب...';
    this.apiService.submitQuote(this.quote).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitButtonText = 'تم الحفظ بالسيستم بنجاح';
        this.submissionSuccess = true;
        setTimeout(() => {
          this.submissionSuccess = false;
          this.submitButtonText = 'حفظ الطلب بالسيستم';
        }, 6000);
      },
      error: () => {
        this.isSubmitting = false;
        this.submitButtonText = 'تم حفظ الطلب محلياً';
      }
    });
  }
}
