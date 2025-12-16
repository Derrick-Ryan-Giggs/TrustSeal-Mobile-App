import { create } from 'zustand';
import { Business, Verification } from '../types';

interface BusinessState {
  businesses: Business[];
  verifications: Record<string, Verification>;
  getBusiness: (id: string) => Business | undefined;
  getVerification: (businessId: string) => Verification | undefined;
  submitVerification: (businessId: string, data: any) => Promise<void>;
  approveBusiness: (businessId: string, score: number) => Promise<void>;
}

const mockBusinesses: Business[] = [
  {
    id: 'biz1',
    ownerId: '2',
    name: "Smith's Electronics",
    category: 'Electronics',
    phone: '+1-800-SMITH-01',
    website: 'https://smithselectronics.com',
    address: '123 Main St, San Francisco, CA 94102',
    latitude: 37.7749,
    longitude: -122.4194,
    logo: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=200',
    description: 'Leading electronics retailer with 10+ years experience',
    documents: ['permit.pdf', 'id.pdf'],
    credibilityScore: 92,
    status: 'verified',
    verifiedBadge: true,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'biz2',
    ownerId: '4',
    name: 'Fresh Market Goods',
    category: 'Retail',
    phone: '+1-800-FRESH-01',
    website: 'https://freshmarketgoods.com',
    address: '456 Oak Ave, New York, NY 10001',
    latitude: 40.7128,
    longitude: -74.006,
    logo: 'https://images.unsplash.com/photo-1548365328-c9403f08397b?w=200',
    description: 'Quality products at affordable prices',
    documents: ['permit.pdf', 'id.pdf'],
    credibilityScore: 85,
    status: 'verified',
    verifiedBadge: true,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'biz3',
    ownerId: '5',
    name: 'Digital Solutions Ltd',
    category: 'Services',
    phone: '+1-800-DIGITAL-01',
    website: 'https://digitalsolutions.com',
    address: '789 Tech Blvd, Austin, TX 78701',
    latitude: 30.2672,
    longitude: -97.7431,
    logo: 'https://images.unsplash.com/photo-1522542550221-31bfe97f0100?w=200',
    description: 'Professional IT and consulting services',
    documents: ['permit.pdf', 'id.pdf'],
    credibilityScore: 78,
    status: 'verified',
    verifiedBadge: true,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockVerifications: Record<string, Verification> = {
  biz1: {
    id: 'ver1',
    businessId: 'biz1',
    verifierId: '3',
    type: 'field',
    stage: 'final_approval',
    progress: 100,
    estimatedDaysRemaining: 0,
    permitVerified: true,
    idVerified: true,
    addressConfirmed: true,
    socialPresenceChecked: true,
    fieldVisitDone: true,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  biz2: {
    id: 'ver2',
    businessId: 'biz2',
    verifierId: '3',
    type: 'field',
    stage: 'field_verification',
    progress: 75,
    estimatedDaysRemaining: 3,
    permitVerified: true,
    idVerified: true,
    addressConfirmed: true,
    socialPresenceChecked: true,
    fieldVisitDone: false,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  biz3: {
    id: 'ver3',
    businessId: 'biz3',
    verifierId: '3',
    type: 'document',
    stage: 'documents_review',
    progress: 25,
    estimatedDaysRemaining: 7,
    permitVerified: true,
    idVerified: false,
    addressConfirmed: false,
    socialPresenceChecked: false,
    fieldVisitDone: false,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export const useBusinessStore = create<BusinessState>((set) => ({
  businesses: mockBusinesses,
  verifications: mockVerifications,

  getBusiness: (id: string) => {
    return mockBusinesses.find((b) => b.id === id);
  },

  getVerification: (businessId: string) => {
    return mockVerifications[businessId];
  },

  submitVerification: async (businessId: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const verification: Verification = {
      id: `ver_${Date.now()}`,
      businessId,
      type: data.type || 'document',
      stage: 'documents_review',
      progress: 25,
      estimatedDaysRemaining: 7,
      permitVerified: !!data.permit,
      idVerified: !!data.id,
      addressConfirmed: false,
      socialPresenceChecked: false,
      fieldVisitDone: false,
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockVerifications[businessId] = verification;
  },

  approveBusiness: async (businessId: string, score: number) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const business = mockBusinesses.find((b) => b.id === businessId);
    if (business) {
      business.credibilityScore = score;
      business.status = 'verified';
      business.verifiedBadge = true;
      business.updatedAt = new Date().toISOString();
    }
    const verification = mockVerifications[businessId];
    if (verification) {
      verification.stage = 'final_approval';
      verification.progress = 100;
      verification.estimatedDaysRemaining = 0;
    }
  },
}));
