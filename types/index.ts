export type UserRole = 'customer' | 'business' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  category: string;
  phone: string;
  website?: string;
  address: string;
  latitude: number;
  longitude: number;
  logo?: string;
  description?: string;
  documents: string[];
  credibilityScore: number;
  status: 'unverified' | 'pending' | 'verified' | 'rejected';
  verifiedBadge?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Verification {
  id: string;
  businessId: string;
  verifierId?: string;
  type: 'document' | 'field' | 'video';
  stage: 'documents_review' | 'address_confirmation' | 'field_verification' | 'final_approval';
  progress: number;
  estimatedDaysRemaining: number;
  permitVerified: boolean;
  idVerified: boolean;
  addressConfirmed: boolean;
  socialPresenceChecked: boolean;
  fieldVisitDone: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  businessId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CredibilityReport {
  businessId: string;
  businessName: string;
  logo?: string;
  overallScore: number;
  scoreColor: 'red' | 'yellow' | 'green';
  verification: Verification;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  address: string;
  phone: string;
  website?: string;
}
