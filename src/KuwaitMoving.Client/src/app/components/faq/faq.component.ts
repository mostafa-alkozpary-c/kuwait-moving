import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfo } from '../../models/moving.models';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="faq" class="section faq-section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">إجابات واضحة لجميع استفساراتكم</span>
          <h2 class="section-title">الأسئلة الأكثر شيوعاً عن نقل العفش في الكويت</h2>
          <p class="section-desc">
            جمعنا لك إجابات سريعة ومفيدة عن الأسعار، أوقات العمل، طرق التغليف، والفك والتركيب.
          </p>
        </div>

        <div class="faq-accordion">
          <div *ngFor="let item of faqs; let i = index" class="faq-card" [class.open]="item.isOpen">
            <button class="faq-question-btn" (click)="toggleFaq(i)">
              <span class="question-text">{{ item.question }}</span>
              <div class="faq-arrow">
                <i class="fa-solid" [ngClass]="item.isOpen ? 'fa-minus' : 'fa-plus'"></i>
              </div>
            </button>
            <div class="faq-answer" *ngIf="item.isOpen">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>

        <div class="faq-footer-cta">
          <p>هل لديك استفسار آخر لم تجد إجابته هنا؟</p>
          <div class="cta-links">
            <a [href]="'tel:' + (company?.phone || '60055108')" class="btn btn-call">
              <i class="fa-solid fa-phone"></i>
              <span>اتصل هاتفياً: {{ company?.phone || '60055108' }}</span>
            </a>
            <a [href]="company?.whatsAppUrl" target="_blank" rel="noopener" class="btn btn-whatsapp">
              <i class="fa-brands fa-whatsapp"></i>
              <span>محادثة واتساب فورية</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .faq-section {
      background: #ffffff;
    }
    .faq-accordion {
      max-width: 850px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .faq-card {
      background: #ffffff;
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-md);
      overflow: hidden;
      transition: var(--transition);
    }
    .faq-card.open {
      border-color: var(--primary);
      box-shadow: 0 4px 15px rgba(10, 56, 113, 0.08);
    }
    .faq-question-btn {
      width: 100%;
      padding: 18px 22px;
      background: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      cursor: pointer;
      text-align: right;
    }
    .question-text {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--dark);
    }
    .faq-card.open .question-text {
      color: var(--primary);
    }
    .faq-arrow {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--gray-100);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      flex-shrink: 0;
      transition: var(--transition);
    }
    .faq-card.open .faq-arrow {
      background: var(--primary);
      color: #ffffff;
    }
    .faq-answer {
      padding: 0 22px 20px 22px;
      color: var(--gray-700);
      font-size: 1rem;
      line-height: 1.7;
      border-top: 1px dashed var(--gray-200);
      padding-top: 15px;
    }
    .faq-footer-cta {
      text-align: center;
      margin-top: 45px;
      padding: 30px;
      background: var(--gray-50);
      border-radius: var(--radius-md);
      max-width: 750px;
      margin-left: auto;
      margin-right: auto;
    }
    .faq-footer-cta p {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 16px;
    }
    .cta-links {
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }
  `]
})
export class FaqComponent {
  @Input() company?: CompanyInfo;

  faqs: FaqItem[] = [
    {
      question: 'كيف يتم تحديد تكلفة نقل العفش في الكويت؟',
      answer: 'يعتمد السعر على حجم المنقولات وعدد الغرف، وما إذا كنت ترغب في فك وتركيب غرف النوم، وخدمة التغليف بالبابلز والكرتون. أسعارنا تبدأ من 15-20 دينار كويتي ونلتزم دائماً بتقديم السعر الأفضل والأوفر لك.',
      isOpen: true
    },
    {
      question: 'هل لديكم نجار متخصص لفك وتركيب أثاث إيكيا والغرف المعقدة؟',
      answer: 'نعم بالتأكيد! لدينا نجارون فلبينيون وهنود ومصريون محترفون وذوو خبرة طويلة في فك وتركيب جميع أنواع غرف النوم الإيطالية والتركية، ودواليب إيكيا (IKEA) وميداس، بالإضافة لتعليق الستائر والشاشات واللوحات.',
      isOpen: false
    },
    {
      question: 'هل توفرون كراتين وتغليف فقاعي (بابلز) لحماية الزجاج؟',
      answer: 'نعم، نوفر خامات تغليف عالية الجودة تشمل كراتين متينة مقواة بجميع المقاسات، نايلون ستريتش، بابلز هوائي لحماية التحف والزجاج والشاشات، ولاصق قوي، لحماية أثاثك بنسبة 100% من الأتربة والخدوش.',
      isOpen: false
    },
    {
      question: 'كم يستغرق وصول سيارة الهاف لوري بعد الاتصال بالرقم 60055108؟',
      answer: 'لدينا أسطول هاف لوري ووانيت متمركز في كافة محافظات الكويت (حولي، الفروانية، العاصمة، الأحمدي، مبارك الكبير، الجهراء). نصلك خلال 20 إلى 30 دقيقة فقط من لحظة اتصالك.',
      isOpen: false
    },
    {
      question: 'هل الخدمة متاحة في أيام العطل والمناسبات وعلى مدار 24 ساعة؟',
      answer: 'نعم، نعمل على مدار الساعة 24/7 طوال أيام الأسبوع بما في ذلك أيام الجمعة والسبت والعطل الرسمية لخدمتكم في أي وقت تحتاجون فيه للنقل.',
      isOpen: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
