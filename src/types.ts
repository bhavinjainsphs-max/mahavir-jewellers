export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  itemTitle?: string;
  itemCategory?: string;
  createdAt: string;
  status: 'pending' | 'resolved' | 'contacted';
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  consultationType: 'Video Call' | 'In-Showroom';
  notes?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface JewelleryItem {
  id: string;
  name: string;
  category: string; // 'Rings' | 'Earrings' | 'Necklaces' | 'Mangalsutra' | 'Pendants' | 'Bangles' | 'Bracelets' etc.
  collection: string; // 'Bridal' | 'Diamond' | 'Gold' | 'Silver' | 'Men\'s'
  image: string;
  description: string;
  purity?: string; // '22K Gold' | '18K Diamond' etc.
  sku: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
