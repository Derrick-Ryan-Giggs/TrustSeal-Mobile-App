import { create } from 'zustand';
import { Review } from '../types';

interface ReviewState {
  reviews: Review[];
  getBusinessReviews: (businessId: string) => Review[];
  getAverageRating: (businessId: string) => number;
  submitReview: (businessId: string, userId: string, userName: string, rating: number, comment: string) => Promise<void>;
}

const mockReviews: Review[] = [
  {
    id: 'rev1',
    businessId: 'biz1',
    userId: '1',
    userName: 'Sarah Chen',
    rating: 5,
    comment: 'Excellent service and quality products. Highly recommended!',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rev2',
    businessId: 'biz1',
    userId: '4',
    userName: 'Mike Johnson',
    rating: 4,
    comment: 'Good experience. Fast delivery and responsive support.',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rev3',
    businessId: 'biz1',
    userId: '5',
    userName: 'Emma Davis',
    rating: 5,
    comment: 'Professional team. Very satisfied with the purchase.',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rev4',
    businessId: 'biz2',
    userId: '1',
    userName: 'Sarah Chen',
    rating: 4,
    comment: 'Good prices and fresh products. Will buy again.',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rev5',
    businessId: 'biz2',
    userId: '6',
    userName: 'Lisa Wang',
    rating: 4,
    comment: 'Reliable seller. Always on time.',
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rev6',
    businessId: 'biz3',
    userId: '7',
    userName: 'Alex Rodriguez',
    rating: 5,
    comment: 'Outstanding technical support. Problem solved in minutes.',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: mockReviews,

  getBusinessReviews: (businessId: string) => {
    return mockReviews.filter((r) => r.businessId === businessId);
  },

  getAverageRating: (businessId: string) => {
    const businessReviews = mockReviews.filter((r) => r.businessId === businessId);
    if (businessReviews.length === 0) return 0;
    const sum = businessReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / businessReviews.length) * 10) / 10;
  },

  submitReview: async (businessId: string, userId: string, userName: string, rating: number, comment: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const review: Review = {
      id: `rev_${Date.now()}`,
      businessId,
      userId,
      userName,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    mockReviews.push(review);
  },
}));
