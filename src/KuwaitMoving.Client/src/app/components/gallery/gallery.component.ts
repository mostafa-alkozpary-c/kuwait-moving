import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  categoryName: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="gallery" class="section gallery-section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">معرض الصور والأعمال</span>
          <h2 class="section-title">شاهد جودة أعمالنا ونظافة سياراتنا وتغليفنا بالصور</h2>
          <p class="section-desc">
            لقطات حية من مواقع العمل في مختلف مناطق ومحافظات الكويت توضح حرصنا على كل قطعة أثاث وسلامتها.
          </p>
        </div>

        <!-- Filter tabs -->
        <div class="filter-tabs">
          <button 
            *ngFor="let tab of tabs" 
            class="tab-btn" 
            [class.active]="selectedTab === tab.id"
            (click)="setTab(tab.id)">
            <i class="fa-solid" [ngClass]="tab.icon"></i>
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-grid">
          <div *ngFor="let item of filteredItems" class="gallery-item" (click)="openPreview(item)">
            <div class="gallery-img-wrap">
              <img [src]="item.imageUrl" [alt]="item.title" class="gallery-img" loading="lazy" />
              <div class="gallery-overlay">
                <span class="overlay-category">{{ item.categoryName }}</span>
                <h4 class="overlay-title">{{ item.title }}</h4>
                <p class="overlay-desc">{{ item.description }}</p>
                <div class="overlay-zoom-icon">
                  <i class="fa-solid fa-magnifying-glass-plus"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Modal / Lightbox -->
        <div class="modal-backdrop" *ngIf="activeModalItem" (click)="closePreview()">
          <div class="modal-dialog" (click)="$event.stopPropagation()">
            <button class="modal-close-btn" (click)="closePreview()">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <img [src]="activeModalItem.imageUrl" [alt]="activeModalItem.title" class="modal-img" />
            <div class="modal-caption">
              <span class="modal-badge">{{ activeModalItem.categoryName }}</span>
              <h3>{{ activeModalItem.title }}</h3>
              <p>{{ activeModalItem.description }}</p>
              <div class="modal-action-row">
                <a href="tel:60055108" class="btn btn-call">
                  <i class="fa-solid fa-phone"></i>
                  <span>اطلب نفس الخدمة (60055108)</span>
                </a>
                <a href="https://wa.me/96560055108" target="_blank" class="btn btn-whatsapp">
                  <i class="fa-brands fa-whatsapp"></i>
                  <span>تواصل واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gallery-section {
      background: #ffffff;
    }
    .filter-tabs {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 40px;
    }
    .tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 22px;
      border-radius: var(--radius-full);
      background: var(--gray-100);
      color: var(--gray-700);
      font-weight: 700;
      font-size: 0.95rem;
      border: 1px solid var(--gray-200);
      cursor: pointer;
      transition: var(--transition);
    }
    .tab-btn:hover {
      background: var(--gray-200);
      color: var(--primary);
    }
    .tab-btn.active {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
      box-shadow: 0 4px 14px rgba(10, 56, 113, 0.3);
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 25px;
    }
    .gallery-item {
      border-radius: var(--radius-md);
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      position: relative;
    }
    .gallery-img-wrap {
      position: relative;
      height: 260px;
      overflow: hidden;
      background: #e2e8f0;
    }
    .gallery-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1);
    }
    .gallery-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(10, 38, 71, 0.92) 0%, rgba(10, 38, 71, 0.4) 60%, transparent 100%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 20px;
      color: #ffffff;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }
    .gallery-item:hover .gallery-img {
      transform: scale(1.1);
    }
    .overlay-category {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .overlay-title {
      font-size: 1.15rem;
      font-weight: 800;
      line-height: 1.3;
      margin-bottom: 6px;
    }
    .overlay-desc {
      font-size: 0.85rem;
      color: #cbd5e1;
      line-height: 1.4;
    }
    .overlay-zoom-icon {
      position: absolute;
      top: 15px;
      left: 15px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 1rem;
    }

    /* Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(6px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: fadeIn 0.2s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .modal-dialog {
      background: #ffffff;
      border-radius: var(--radius-lg);
      max-width: 750px;
      width: 100%;
      overflow: hidden;
      position: relative;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    }
    .modal-close-btn {
      position: absolute;
      top: 15px;
      left: 15px;
      background: rgba(0, 0, 0, 0.6);
      color: #ffffff;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
      z-index: 10;
    }
    .modal-close-btn:hover {
      background: #dc2626;
    }
    .modal-img {
      width: 100%;
      max-height: 420px;
      object-fit: cover;
    }
    .modal-caption {
      padding: 24px;
    }
    .modal-badge {
      display: inline-block;
      background: var(--gray-100);
      color: var(--primary);
      font-weight: 700;
      font-size: 0.85rem;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      margin-bottom: 8px;
    }
    .modal-caption h3 {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--dark);
      margin-bottom: 8px;
    }
    .modal-caption p {
      color: var(--gray-600);
      margin-bottom: 20px;
    }
    .modal-action-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    @media (max-width: 576px) {
      .gallery-grid {
        grid-template-columns: 1fr;
      }
      .gallery-overlay {
        opacity: 1;
        background: linear-gradient(to top, rgba(10, 38, 71, 0.95) 0%, transparent 100%);
      }
      .modal-action-row {
        flex-direction: column;
      }
      .modal-action-row .btn {
        width: 100%;
      }
    }
  `]
})
export class GalleryComponent {
  selectedTab = 'all';
  activeModalItem: GalleryItem | null = null;

  tabs = [
    { id: 'all', label: 'جميع الصور', icon: 'fa-images' },
    { id: 'moving', label: 'نقل العفش والشاحنات', icon: 'fa-truck-moving' },
    { id: 'packing', label: 'التغليف بالبابلز والكرتون', icon: 'fa-box' },
    { id: 'assembly', label: 'فك وتركيب إيكيا وغرف النوم', icon: 'fa-couch' },
    { id: 'team', label: 'فريق العمل بالموقع', icon: 'fa-people-carry-box' }
  ];

  items: GalleryItem[] = [
    {
      id: 1,
      title: 'أسطول شاحنات هاف لوري مجهزة في الكويت',
      category: 'moving',
      categoryName: 'شاحنات النقل',
      imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
      description: 'شاحنات مبطنة ومغلقة لنقل مقتنياتكم دون أي تعرض للأتربة أو العوامل الجوية.'
    },
    {
      id: 2,
      title: 'فك وتركيب دواليب وغرف نوم إيكيا بدقة',
      category: 'assembly',
      categoryName: 'فك وتركيب',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      description: 'فنيون نجارون متمرسون لفك وتركيب الخزائن المعقدة والمطابخ والستائر.'
    },
    {
      id: 3,
      title: 'تغليف الكنب والصالونات بالنايلون والبابلز',
      category: 'packing',
      categoryName: 'تغليف وحماية',
      imageUrl: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80',
      description: 'حماية كاملة من الخدوش والأتربة مع التغليف الحراري لقطع الأثاث الفاخرة.'
    },
    {
      id: 4,
      title: 'نقل فلل وشقق سكنية متكاملة',
      category: 'moving',
      categoryName: 'نقل منازل',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      description: 'تنظيم وترتيب العفش داخل الغرف الجديدة مع التركيب والتسليم على المفتاح.'
    },
    {
      id: 5,
      title: 'عمالة متخصصة في نقل وتنزيل الأثاث الحساس',
      category: 'team',
      categoryName: 'فريق العمل',
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      description: 'حرص تام وأمانة عالية في التعامل مع المقتنيات الثمينة والأجهزة الكهربائية.'
    },
    {
      id: 6,
      title: 'صناديق كرتونية مقواة ومخصصة لأواني المطبخ',
      category: 'packing',
      categoryName: 'تغليف وحماية',
      imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
      description: 'كراتين متينة ذات طبقات متعددة لحماية الأواني والزجاجيات والتحف أثناء النقل.'
    }
  ];

  get filteredItems(): GalleryItem[] {
    if (this.selectedTab === 'all') {
      return this.items;
    }
    return this.items.filter(item => item.category === this.selectedTab);
  }

  setTab(tabId: string) {
    this.selectedTab = tabId;
  }

  openPreview(item: GalleryItem) {
    this.activeModalItem = item;
  }

  closePreview() {
    this.activeModalItem = null;
  }
}
