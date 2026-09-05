import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerReview } from '../../models/moving.models';
import { MovingApiService } from '../../services/moving-api.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="reviews" class="section reviews-section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">شهادات نعتز بها</span>
          <h2 class="section-title">ماذا يقول عملاؤنا في مختلف مناطق الكويت؟</h2>
          <p class="section-desc">
            ثقة عملائنا ورضاهم هو رأس مالنا الحقيقي. إليك بعض تجارب العملاء الذين تشرفنا بخدمتهم.
          </p>
        </div>

        <div class="reviews-grid">
          <div *ngFor="let review of reviews" class="review-card">
            <div class="review-header">
              <div class="review-avatar">
                <i class="fa-solid fa-user-check"></i>
              </div>
              <div>
                <h4 class="reviewer-name">{{ review.customerName }}</h4>
                <span class="reviewer-area">
                  <i class="fa-solid fa-location-dot"></i> {{ review.area }}
                </span>
              </div>
            </div>

            <div class="stars-row">
              <i *ngFor="let s of getStarArray(review.rating)" class="fa-solid fa-star"></i>
              <span class="service-badge">{{ review.serviceUsed }}</span>
            </div>

            <p class="review-comment">"{{ review.comment }}"</p>

            <span class="review-date">{{ review.reviewDate }}</span>
          </div>
        </div>

        <!-- Add Review Trigger -->
        <div class="add-review-box">
          <button class="btn btn-primary" (click)="showForm = !showForm">
            <i class="fa-solid fa-pen-to-square"></i>
            <span>{{ showForm ? 'إخفاء نموذج التقييم' : 'أضف تقييمك وتجربتك معنا' }}</span>
          </button>

          <!-- Simple inline review form -->
          <div *ngIf="showForm" class="review-form-card">
            <h4 style="margin-bottom: 15px; font-weight: 800; color: var(--primary-dark);">شاركنا رأيك في الخدمة</h4>
            <div class="form-row-2">
              <input type="text" [(ngModel)]="newReview.customerName" placeholder="اسمك الكريم" class="form-input-rev" />
              <input type="text" [(ngModel)]="newReview.area" placeholder="المنطقة (مثال: حولي / السالمية)" class="form-input-rev" />
            </div>
            <div class="form-row-2" style="margin-top: 10px;">
              <select [(ngModel)]="newReview.serviceUsed" class="form-input-rev">
                <option value="نقل عفش وفك وتركيب">نقل عفش وفك وتركيب</option>
                <option value="تغليف ونقل كامل">تغليف ونقل كامل</option>
                <option value="هاف لوري نقل أثاث">هاف لوري نقل أثاث</option>
                <option value="فك وتركيب إيكيا">فك وتركيب إيكيا</option>
              </select>
              <select [(ngModel)]="newReview.rating" class="form-input-rev">
                <option [value]="5">⭐⭐⭐⭐⭐ ممتاز (5 نجوم)</option>
                <option [value]="4">⭐⭐⭐⭐ جيد جداً (4 نجوم)</option>
              </select>
            </div>
            <textarea [(ngModel)]="newReview.comment" placeholder="اكتب تفاصيل تجربتك مع فريق العمل..." rows="3" class="form-input-rev" style="margin-top: 10px; width: 100%;"></textarea>
            <button class="btn btn-accent" style="margin-top: 12px;" (click)="submitReview()">
              <span>نشر التقييم</span>
            </button>
            <p *ngIf="reviewAddedSuccess" style="color: #16a34a; font-weight: 700; margin-top: 10px;">
              شكراً جزيلاً لك! تم تسجيل تقييمك بنجاح.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .reviews-section {
      background: #f8fafc;
    }
    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }
    .review-card {
      background: #ffffff;
      border-radius: var(--radius-md);
      padding: 24px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--gray-200);
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .review-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .review-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(10, 56, 113, 0.1);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    .reviewer-name {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--dark);
      line-height: 1.2;
    }
    .reviewer-area {
      font-size: 0.8rem;
      color: var(--gray-600);
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .reviewer-area i {
      color: var(--accent);
    }
    .stars-row {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #f59e0b;
      margin-bottom: 12px;
      font-size: 0.9rem;
    }
    .service-badge {
      margin-right: auto;
      background: var(--gray-100);
      color: var(--primary-dark);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
    }
    .review-comment {
      font-size: 0.94rem;
      color: var(--gray-700);
      line-height: 1.6;
      margin-bottom: 14px;
      flex-grow: 1;
      font-style: italic;
    }
    .review-date {
      font-size: 0.78rem;
      color: #94a3b8;
    }
    .add-review-box {
      text-align: center;
      margin-top: 40px;
    }
    .review-form-card {
      max-width: 600px;
      margin: 25px auto 0 auto;
      background: #ffffff;
      padding: 25px;
      border-radius: var(--radius-md);
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      border: 1px solid var(--gray-200);
      text-align: right;
    }
    .form-row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .form-input-rev {
      padding: 10px 14px;
      border: 1px solid var(--gray-300);
      border-radius: var(--radius-sm);
      font-size: 0.95rem;
      outline: none;
      width: 100%;
    }
    .form-input-rev:focus {
      border-color: var(--primary);
    }

    @media (max-width: 576px) {
      .form-row-2 {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ReviewsComponent {
  @Input() reviews: CustomerReview[] = [];
  showForm = false;
  reviewAddedSuccess = false;

  newReview: CustomerReview = {
    customerName: '',
    area: '',
    rating: 5,
    comment: '',
    serviceUsed: 'نقل عفش وفك وتركيب'
  };

  constructor(private apiService: MovingApiService) {}

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  submitReview() {
    if (!this.newReview.customerName || !this.newReview.comment) {
      alert('يرجى كتابة اسمك والتعليق أولاً');
      return;
    }

    this.apiService.addReview(this.newReview).subscribe(saved => {
      this.reviewAddedSuccess = true;
      setTimeout(() => {
        this.showForm = false;
        this.reviewAddedSuccess = false;
        this.newReview = { customerName: '', area: '', rating: 5, comment: '', serviceUsed: 'نقل عفش وفك وتركيب' };
      }, 3000);
    });
  }
}
