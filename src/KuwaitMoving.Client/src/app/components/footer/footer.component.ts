import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfo } from '../../models/moving.models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Col 1: Brand -->
          <div class="footer-col">
            <div class="footer-logo">
              <div class="logo-icon-sm">
                <i class="fa-solid fa-truck-fast"></i>
              </div>
              <span class="footer-brand-title">شركة الفهد لنقل العفش</span>
            </div>
            <p class="footer-desc">
              رواد خدمات نقل وتغليف وفك وتركيب الأثاث في دولة الكويت. نعمل على مدار 24 ساعة بأحدث سيارات الهاف لوري المجهزة وأمهر النجارين والعمالة الفنية.
            </p>
            <div class="footer-trust-badge">
              <i class="fa-solid fa-shield-check"></i>
              <span>مرخصون ومعتمدون في جميع محافظات الكويت</span>
            </div>
          </div>

          <!-- Col 2: Quick Links -->
          <div class="footer-col">
            <h4 class="footer-heading">أقسام الموقع</h4>
            <ul class="footer-links">
              <li><a href="#services"><i class="fa-solid fa-angle-left"></i> خدماتنا الرئيسية</a></li>
              <li><a href="#about"><i class="fa-solid fa-angle-left"></i> لماذا تختارنا</a></li>
              <li><a href="#areas"><i class="fa-solid fa-angle-left"></i> مناطق التغطية بالكويت</a></li>
              <li><a href="#calculator"><i class="fa-solid fa-angle-left"></i> حاسبة تكلفة النقل</a></li>
              <li><a href="#gallery"><i class="fa-solid fa-angle-left"></i> معرض صور الأعمال</a></li>
              <li><a href="#reviews"><i class="fa-solid fa-angle-left"></i> آراء عملائنا</a></li>
              <li><a href="#faq"><i class="fa-solid fa-angle-left"></i> الأسئلة المتكررة</a></li>
            </ul>
          </div>

          <!-- Col 3: Services -->
          <div class="footer-col">
            <h4 class="footer-heading">خدمات النقل والفك</h4>
            <ul class="footer-links">
              <li><a href="#services"><i class="fa-solid fa-angle-left"></i> نقل عفش منازل وشقق وفلل</a></li>
              <li><a href="#services"><i class="fa-solid fa-angle-left"></i> فك وتركيب غرف نوم وإيكيا</a></li>
              <li><a href="#services"><i class="fa-solid fa-angle-left"></i> تغليف بابلز وكرتون عالي الجودة</a></li>
              <li><a href="#services"><i class="fa-solid fa-angle-left"></i> هاف لوري مجهز ومغلق</a></li>
              <li><a href="#services"><i class="fa-solid fa-angle-left"></i> نقل مكاتب وشركات</a></li>
              <li><a href="#services"><i class="fa-solid fa-angle-left"></i> ونش هيدروليكي للأدوار العالية</a></li>
            </ul>
          </div>

          <!-- Col 4: Contact Info -->
          <div class="footer-col">
            <h4 class="footer-heading">تواصل معنا فوراً</h4>
            <div class="contact-info-list">
              <a [href]="'tel:' + (company?.phone || '60055108')" class="contact-box">
                <i class="fa-solid fa-phone"></i>
                <div>
                  <span class="box-label">هاتف مباشر (24 ساعة):</span>
                  <strong class="box-val">{{ company?.phone || '60055108' }}</strong>
                </div>
              </a>

              <a [href]="company?.whatsAppUrl" target="_blank" rel="noopener" class="contact-box wa-box">
                <i class="fa-brands fa-whatsapp"></i>
                <div>
                  <span class="box-label">محادثة واتساب:</span>
                  <strong class="box-val">انقر لبدء المحادثة</strong>
                </div>
              </a>

              <div class="info-item">
                <i class="fa-solid fa-location-dot"></i>
                <span>الكويت - متواجدون في كل المحافظات</span>
              </div>

              <div class="info-item">
                <i class="fa-solid fa-clock"></i>
                <span>خدمة متواصلة 24 ساعة طوال أيام الأسبوع</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <p>© {{ currentYear }} شركة الفهد لنقل وفك وتركيب العفش بالكويت - هاتف 60055108. جميع الحقوق محفوظة.</p>
          <div class="bottom-keywords">
            <span>نقل عفش الكويت</span> • 
            <span>فك وتركيب إيكيا</span> • 
            <span>هاف لوري الكويت</span> • 
            <span>تغليف كرتون</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #091a2e;
      color: #cbd5e1;
      padding-top: 60px;
      border-top: 3px solid var(--primary-light);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.3fr 0.9fr 1.1fr 1.2fr;
      gap: 35px;
      margin-bottom: 50px;
    }
    .footer-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .logo-icon-sm {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: var(--primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    .footer-brand-title {
      font-size: 1.3rem;
      font-weight: 800;
      color: #ffffff;
    }
    .footer-desc {
      font-size: 0.92rem;
      line-height: 1.7;
      margin-bottom: 20px;
      color: #94a3b8;
    }
    .footer-trust-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--accent);
      font-size: 0.88rem;
      font-weight: 700;
    }
    .footer-heading {
      color: #ffffff;
      font-size: 1.15rem;
      font-weight: 800;
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 8px;
    }
    .footer-heading::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 35px;
      height: 2px;
      background: var(--accent);
    }
    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .footer-links a {
      color: #94a3b8;
      font-size: 0.92rem;
      transition: var(--transition);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .footer-links a i {
      font-size: 0.75rem;
      color: var(--accent);
    }
    .footer-links a:hover {
      color: #ffffff;
      transform: translateX(-4px);
    }
    .contact-info-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .contact-box {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 14px;
      color: #ffffff;
      transition: var(--transition);
    }
    .contact-box:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: var(--accent);
    }
    .contact-box i {
      font-size: 1.4rem;
      color: var(--accent);
    }
    .wa-box i {
      color: #4ade80;
    }
    .box-label {
      font-size: 0.75rem;
      color: #94a3b8;
      display: block;
    }
    .box-val {
      font-size: 1.05rem;
      letter-spacing: 0.5px;
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.88rem;
      color: #94a3b8;
    }
    .info-item i {
      color: var(--accent);
    }
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 24px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
      font-size: 0.88rem;
      color: #64748b;
    }
    .bottom-keywords {
      display: flex;
      gap: 8px;
      font-size: 0.82rem;
    }

    @media (max-width: 992px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 576px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }
      .footer-bottom {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  @Input() company?: CompanyInfo;
  currentYear = new Date().getFullYear();
}
