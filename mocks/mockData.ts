export const categories = [
  'Electronics',
  'Retail',
  'Services',
  'Food & Beverage',
  'Health & Wellness',
  'Education',
  'Finance',
  'Real Estate',
];

export const topVerifiedBusinesses = [
  {
    id: 'biz1',
    name: "Smith's Electronics",
    category: 'Electronics',
    score: 92,
    reviews: 145,
    logo: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=200',
  },
  {
    id: 'biz2',
    name: 'Fresh Market Goods',
    category: 'Retail',
    score: 85,
    reviews: 98,
    logo: 'https://images.unsplash.com/photo-1548365328-c9403f08397b?w=200',
  },
  {
    id: 'biz3',
    name: 'Digital Solutions Ltd',
    category: 'Services',
    score: 78,
    reviews: 56,
    logo: 'https://images.unsplash.com/photo-1522542550221-31bfe97f0100?w=200',
  },
];

export const trendingReviews = [
  {
    id: 'rev1',
    business: "Smith's Electronics",
    author: 'Sarah Chen',
    rating: 5,
    excerpt: 'Excellent service and quality products.',
    date: '2 days ago',
  },
  {
    id: 'rev2',
    business: 'Fresh Market Goods',
    author: 'John Smith',
    rating: 4,
    excerpt: 'Good prices and fresh products. Will buy again.',
    date: '5 days ago',
  },
  {
    id: 'rev3',
    business: 'Digital Solutions Ltd',
    author: 'Alex Rodriguez',
    rating: 5,
    excerpt: 'Outstanding technical support. Problem solved in minutes.',
    date: '1 week ago',
  },
];

export const verificationStages = [
  { name: 'Documents Review', key: 'documents_review' },
  { name: 'Address Confirmation', key: 'address_confirmation' },
  { name: 'Field Verification', key: 'field_verification' },
  { name: 'Final Approval', key: 'final_approval' },
];
