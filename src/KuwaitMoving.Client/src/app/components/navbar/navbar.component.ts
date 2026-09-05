import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfo } from '../../models/moving.models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <!-- Top announcement bar -->
      <div class="top-bar">
        <div class="container top-bar-content">
          <div class="top-bar-item">
            <i class="fa-solid fa-clock"></i>
            <span>خدمة 24 ساعة طوال أيام الأسبوع في كافة مناطق الكويت</span>
          </div>
          <div class="top-bar-actions">
            <a [href]="'tel:' + company?.phone" class="top-phone">
              <i class="fa-solid fa-phone-volume"></i>
              <span>اتصل بنا: <strong>{{ company?.phone || '60055108' }}</strong></span>
            </a>
            <a [href]="company?.whatsAppUrl" target="_blank" rel="noopener" class="top-whatsapp">
              <i class="fa-brands fa-whatsapp"></i>
              <span>واتساب فوري</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Main Navbar -->
      <nav class="main-nav">
        <div class="container nav-content">
          <a href="#" class="brand-logo">
            <div class="logo-icon">
              <i class="fa-solid fa-truck-fast"></i>
            </div>
            <div class="logo-text">
              <span class="brand-name">الفهد لنقل العفش</span>
              <span class="brand-badge">الكويت 60055108</span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <div class="nav-links">
            <a href="#services" class="nav-link">خدماتنا</a>
            <a href="#about" class="nav-link">لماذا تختارنا</a>
            <a href="#areas" class="nav-link">المناطق</a>
            <a href="#calculator" class="nav-link">حاسبة التكلفة</a>
            <a href="#gallery" class="nav-link">أعمالنا بالصور</a>
            <a href="#reviews" class="nav-link">آراء العملاء</a>
            <a href="#faq" class="nav-link">الأسئلة الشائعة</a>
          </div>

          <!-- Quick Action Buttons -->
          <div class="nav-cta-group">
            <a [href]="'tel:' + (company?.phone || '60055108')" class="btn btn-call btn-pulse">
              <i class="fa-solid fa-phone"></i>
              <span class="phone-label">{{ company?.phone || '60055108' }}</span>
            </a>
            <a [href]="company?.whatsAppUrl" target="_blank" rel="noopener" class="btn btn-whatsapp nav-wa-btn">
              <i class="fa-brands fa-whatsapp"></i>
              <span class="wa-text">واتساب</span>
            </a>
          </div>

          <!-- Mobile Menu Toggle -->
          <button class="mobile-toggle" (click)="toggleMobileMenu()" aria-label="تبديل القائمة">
            <i class="fa-solid" [ngClass]="isMobileOpen ? 'fa-xmark' : 'fa-bars'"></i>
          </button>
        </div>

        <!-- Mobile Drawer -->
        <div class="mobile-menu" [class.open]="isMobileOpen">
          <div class="mobile-menu-links">
            <a href="#services" (click)="closeMenu()">خدماتنا</a>
            <a href="#about" (click)="closeMenu()">لماذا تختارنا</a>
            <a href="#areas" (click)="closeMenu()">مناطق الكويت</a>
            <a href="#calculator" (click)="closeMenu()">حساب تكلفة النقل</a>
            <a href="#gallery" (click)="closeMenu()">معرض الأعمال</a>
            <a href="#reviews" (click)="closeMenu()">آراء عملائنا</a>
            <a href="#faq" (click)="closeMenu()">الأسئلة الشائعة</a>
          </div>
          <div class="mobile-menu-cta">
            <a [href]="'tel:' + (company?.phone || '60055108')" class="btn btn-call btn-full">
              <i class="fa-solid fa-phone"></i>
              <span>اتصال مباشر: 60055108</span>
            </a>
            <a [href]="company?.whatsAppUrl" target="_blank" rel="noopener" class="btn btn-whatsapp btn-full">
              <i class="fa-brands fa-whatsapp"></i>
              <span>محادثة واتساب سريعة</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--white);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
    }
    .top-bar {
      background: var(--primary-dark);
      color: #e2e8f0;
      padding: 7px 0;
      font-size: 0.88rem;
    }
    .top-bar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .top-bar-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #94a3b8;
    }
    .top-bar-item i {
      color: var(--accent);
    }
    .top-bar-actions {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .top-phone, .top-whatsapp {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #ffffff;
      font-weight: 600;
      transition: var(--transition);
    }
    .top-phone:hover {
      color: var(--accent);
    }
    .top-whatsapp {
      color: #4ade80;
    }
    .top-whatsapp:hover {
      color: #86efac;
    }
    .main-nav {
      position: relative;
      background: #ffffff;
    }
    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 14px;
      padding-bottom: 14px;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      box-shadow: 0 4px 10px rgba(10, 56, 113, 0.3);
    }
    .logo-text {
      display: flex;
      flex-direction: column;
    }
    .brand-name {
      font-size: 1.35rem;
      font-weight: 900;
      color: var(--primary-dark);
      line-height: 1.15;
    }
    .brand-badge {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--accent);
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 22px;
    }
    .nav-link {
      font-weight: 600;
      color: var(--gray-700);
      font-size: 0.98rem;
      transition: var(--transition);
      position: relative;
      padding: 6px 0;
    }
    .nav-link:hover {
      color: var(--primary);
    }
    .nav-link:hover::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 2px;
      background: var(--primary);
      border-radius: 2px;
    }
    .nav-cta-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .btn-pulse {
      animation: pulse-blue 2.2s infinite;
    }
    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 1.6rem;
      color: var(--primary-dark);
      cursor: pointer;
      padding: 6px;
    }
    .mobile-menu {
      display: none;
    }

    @media (max-width: 992px) {
      .nav-links, .nav-wa-btn, .top-bar {
        display: none;
      }
      .mobile-toggle {
        display: block;
      }
      .mobile-menu.open {
        display: block;
        background: #ffffff;
        border-top: 1px solid var(--gray-200);
        padding: 20px;
        box-shadow: var(--shadow-lg);
      }
      .mobile-menu-links {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin-bottom: 20px;
      }
      .mobile-menu-links a {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--dark);
        padding: 8px 12px;
        border-radius: 8px;
        background: var(--gray-50);
      }
      .mobile-menu-links a:hover {
        background: var(--gray-100);
        color: var(--primary);
      }
      .mobile-menu-cta {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .btn-full {
        width: 100%;
      }
    }
  `]
})
export class NavbarComponent {
  @Input() company?: CompanyInfo;
  isMobileOpen = false;

  toggleMobileMenu() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMenu() {
    this.isMobileOpen = false;
  }
}
