import { Enquiry, Booking } from './types';

// Enquiries Local Database Functions
export function getStoredEnquiries(): Enquiry[] {
  try {
    const data = localStorage.getItem('mahavir_enquiries');
    if (!data) {
      // Seed some initial demo bookings to make the dashboard look premium and realistic immediately
      const demoEnquiries: Enquiry[] = [
        {
          id: 'enq-demo-1',
          name: 'Shruti Patel',
          phone: '+91 98250 12345',
          email: 'shruti.patel@gmail.com',
          message: 'Can I get this Aura Crown Solitaire in 22K Rose Gold instead of 18K white gold? Please share the pricing differences.',
          itemTitle: 'Aura Crown Solitaire Diamond Ring',
          itemCategory: 'Rings',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          status: 'pending'
        },
        {
          id: 'enq-demo-2',
          name: 'Vikram Singh',
          phone: '+91 94440 98765',
          email: 'vsingh.rathore@outlook.com',
          message: 'Interested in purchasing the 10G Gold coin during the upcoming Akshay Tritiya festival. Do you offer bulk discounts on 5 coins?',
          itemTitle: 'Saraswati Laxmi Gold Coin - 10G',
          itemCategory: 'Gold Coins',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          status: 'contacted'
        }
      ];
      localStorage.setItem('mahavir_enquiries', JSON.stringify(demoEnquiries));
      return demoEnquiries;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error fetching enquiries', e);
    return [];
  }
}

export function saveStoredEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry {
  const list = getStoredEnquiries();
  const newItem: Enquiry = {
    ...enquiry,
    id: 'enq-' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  list.unshift(newItem);
  localStorage.setItem('mahavir_enquiries', JSON.stringify(list));
  return newItem;
}

export function updateStoredEnquiryStatus(id: string, status: Enquiry['status']): Enquiry[] {
  const list = getStoredEnquiries();
  const updated = list.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem('mahavir_enquiries', JSON.stringify(updated));
  return updated;
}

export function deleteStoredEnquiry(id: string): Enquiry[] {
  const list = getStoredEnquiries();
  const filtered = list.filter(item => item.id !== id);
  localStorage.setItem('mahavir_enquiries', JSON.stringify(filtered));
  return filtered;
}

// Bookings Local Database Functions
export function getStoredBookings(): Booking[] {
  try {
    const data = localStorage.getItem('mahavir_bookings');
    if (!data) {
      // Seed initial demo bookings
      const demoBookings: Booking[] = [
        {
          id: 'book-demo-1',
          name: 'Neha Roy',
          phone: '+91 97230 45678',
          email: 'neha09.roy@example.com',
          date: '2026-06-25',
          time: '14:30',
          consultationType: 'Video Call',
          notes: 'Looking for bridal jhumkas and choker match for heavy red silk lehenga. Preferred styling details: traditional heavy look.',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          status: 'pending'
        },
        {
          id: 'book-demo-2',
          name: 'Prakash Shah',
          phone: '+91 90990 12834',
          email: 'pshah_jwlry@gmail.com',
          date: '2026-06-21',
          time: '11:00',
          consultationType: 'In-Showroom',
          notes: 'Need to inspect the princess cut dual halo collection in showroom. Booking VIP custom lounge.',
          createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          status: 'confirmed'
        }
      ];
      localStorage.setItem('mahavir_bookings', JSON.stringify(demoBookings));
      return demoBookings;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error fetching bookings', e);
    return [];
  }
}

export function saveStoredBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
  const list = getStoredBookings();
  const newItem: Booking = {
    ...booking,
    id: 'book-' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  list.unshift(newItem);
  localStorage.setItem('mahavir_bookings', JSON.stringify(list));
  return newItem;
}

export function updateStoredBookingStatus(id: string, status: Booking['status']): Booking[] {
  const list = getStoredBookings();
  const updated = list.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem('mahavir_bookings', JSON.stringify(updated));
  return updated;
}

export function deleteStoredBooking(id: string): Booking[] {
  const list = getStoredBookings();
  const filtered = list.filter(item => item.id !== id);
  localStorage.setItem('mahavir_bookings', JSON.stringify(filtered));
  return filtered;
}

// Format Date Utility
export function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return isoString;
  }
}
