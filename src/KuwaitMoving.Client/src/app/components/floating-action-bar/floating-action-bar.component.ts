import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfo } from '../../models/moving.models';

@Component({
  selector: 'app-floating-action-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Mobile Bottom Sticky Bar (Always visible on mobile) -->
    <div class="mobile-sticky-bar">
      <a [href]="'tel:' + (company?.phone || '60055108')" class="bar-btn call-action">
        <div class="bar-icon-wrap icon-pulse-blue">
          <i class="fa-solid fa-phone"></i>
        </div>
        <div class="bar-text">
          <span class="bar-sub">اتصال فوري</span>
          <span class="bar-main">{{ company?.phone || '60055108' }}</span>
        </div>
      </a>

      <a [href]="company?.whatsAppUrl" target="_blank" rel="noopener" class="bar-btn wa-action">
        <div class="bar-icon-wrap icon-pulse-green">
          <i class="fa-brands fa-whatsapp"></i>
        </div>
        <div class="bar-text">
          <span class="bar-sub">واتساب سريع</span>
          <span class="bar-main">تواصل الآن</span>
        </div>
      </a>
    </div>

    <!-- Desktop Floating Quick Widget (Visible on Large screens) -->
    <div class="desktop-floating-widget">
      <a [href]="company?.whatsAppUrl" target="_blank" rel="noopener" class="float-wa-btn" title="تواصل عبر الواتساب">
        <i class="fa-brands fa-whatsapp"></i>
        <span class="wa-tooltip">تحدث معنا عبر الواتساب</span>
      </a>

      <a [href]="'tel:' + (company?.phone || '60055108')" class="float-call-btn" title="اتصل بنا">
        <i class="fa-solid fa-phone"></i>
        <span class="call-tooltip">اتصل بنا: {{ company?.phone || '60055108' }}</span>
      </a>
    </div>
  `,
  styles: [`
    /* Mobile Sticky Bar */
    .mobile-sticky-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffffff;
      padding: 10px 14px;
      display: flex;
      gap: 12px;
      z-index: 9999;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
      border-top: 1px solid var(--gray-200);
    }
    .bar-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: var(--radius-full);
      color: #ffffff;
      text-decoration: none;
      transition: var(--transition);
    }
    .call-action {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
    }
    .wa-action {
      background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
    }
    .bar-icon-wrap {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    .icon-pulse-blue {
      animation: pulse-blue 2s infinite;
    }
    .icon-pulse-green {
      animation: pulse-ring 2s infinite;
    }
    .bar-text {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }
    .bar-sub {
      font-size: 0.72rem;
      opacity: 0.9;
    }
    .bar-main {
      font-size: 1rem;
      font-weight: 800;
      letter-spacing: 0.5px;
    }

    /* Desktop Floating Widget */
    .desktop-floating-widget {
      display: none;
      position: fixed;
      bottom: 30px;
      left: 30px;
      z-index: 9999;
      flex-direction: column;
      gap: 14px;
    }
    .float-wa-btn, .float-call-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 1.8rem;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
      position: relative;
      transition: var(--transition);
    }
    .float-wa-btn {
      background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
      animation: pulse-ring 2.5s infinite;
    }
    .float-call-btn {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      animation: pulse-blue 2.5s infinite;
    }
    .float-wa-btn:hover, .float-call-btn:hover {
      transform: scale(1.1);
    }
    .wa-tooltip, .call-tooltip {
      position: absolute;
      right: 70px;
      background: #0f172a;
      color: #ffffff;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 700;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .float-wa-btn:hover .wa-tooltip, .float-call-btn:hover .call-tooltip {
      opacity: 1;
    }

    @media (min-width: 768px) {
      .mobile-sticky-bar {
        display: none;
      }
      .desktop-floating-widget {
        display: flex;
      }
    }
  `]
})
export class FloatingActionBarComponent {
  @Input() company?: CompanyInfo;
}
