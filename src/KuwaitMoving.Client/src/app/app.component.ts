import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovingApiService } from './services/moving-api.service';
import { CompanyInfo, ServiceItem, GovernorateArea, CustomerReview } from './models/moving.models';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AreasComponent } from './components/areas/areas.component';
import { QuoteCalculatorComponent } from './components/quote-calculator/quote-calculator.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FaqComponent } from './components/faq/faq.component';
import { FloatingActionBarComponent } from './components/floating-action-bar/floating-action-bar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    WhyUsComponent,
    AreasComponent,
    QuoteCalculatorComponent,
    GalleryComponent,
    ReviewsComponent,
    FaqComponent,
    FloatingActionBarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'شركة الفهد لنقل وتغليف العفش بالكويت - 60055108';

  company?: CompanyInfo;
  services: ServiceItem[] = [];
  areas: GovernorateArea[] = [];
  reviews: CustomerReview[] = [];

  constructor(private apiService: MovingApiService) {}

  ngOnInit() {
    this.apiService.getCompanyInfo().subscribe(info => this.company = info);
    this.apiService.getServices().subscribe(services => this.services = services);
    this.apiService.getAreas().subscribe(areas => this.areas = areas);
    this.apiService.getReviews().subscribe(reviews => this.reviews = reviews);
  }
}
