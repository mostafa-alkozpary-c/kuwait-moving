export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  internationalPhone: string;
  whatsAppNumber: string;
  whatsAppUrl: string;
  address: string;
  workingHours: string;
  rating: number;
  totalReviews: number;
  completedMoves: number;
  experienceYears: number;
  features: string[];
}

export interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  imageUrl: string;
  startingPriceKwd: number;
  unitText: string;
  highlights: string[];
}

export interface QuoteRequest {
  id?: string;
  fullName: string;
  phoneNumber: string;
  serviceType: string;
  fromGovernorate: string;
  toGovernorate: string;
  roomCount: number;
  requiresPacking: boolean;
  requiresDisassembly: boolean;
  movingDate?: string;
  additionalNotes?: string;
  estimatedCostKwd?: number;
}

export interface CustomerReview {
  id?: number;
  customerName: string;
  area: string;
  rating: number;
  comment: string;
  serviceUsed: string;
  reviewDate?: string;
}

export interface GovernorateArea {
  name: string;
  nameEn: string;
  tagline: string;
  majorDistricts: string[];
  fastResponseMinutes: number;
  available24Hours: boolean;
}
