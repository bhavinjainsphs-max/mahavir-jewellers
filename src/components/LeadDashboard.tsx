import { useState, useEffect } from 'react';
import { Database, Download, Search, Trash2, Check, RefreshCw, Layers, Calendar, MessageSquare, Sparkles, Filter, X } from 'lucide-react';
import { motion } from 'motion/react';
import {
  getStoredEnquiries,
  getStoredBookings,
  updateStoredEnquiryStatus,
  updateStoredBookingStatus,
  deleteStoredEnquiry,
  deleteStoredBooking,
  formatDate
} from '../utils';
import { Enquiry, Booking } from '../types';

interface LeadDashboardProps {
  onRefreshTrigger: () => void;
  bookingTriggerCount: number;
  enquiryTriggerCount: number;
}

export default function LeadDashboard({ onRefreshTrigger, bookingTriggerCount, enquiryTriggerCount }: LeadDashboardProps) {
  // Sync States
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  // Controls
  const [activeTab, setActiveTab] = useState<'bookings' | 'enquiries'>('bookings');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Load from local storage initially and when trigger updates
  useEffect(() => {
    reloadDatabase();
  }, [bookingTriggerCount, enquiryTriggerCount]);

  const reloadDatabase = () => {
    setEnquiries(getStoredEnquiries());
    setBookings(getStoredBookings());
  };

  // State update actions
  const handleBookingStatusChange = (id: string, status: Booking['status']) => {
    const updated = updateStoredBookingStatus(id, status);
    setBookings(updated);
    onRefreshTrigger();
  };

  const handleEnquiryStatusChange = (id: string, status: Enquiry['status']) => {
    const updated = updateStoredEnquiryStatus(id, status);
    setEnquiries(updated);
    onRefreshTrigger();
  };

  const handleBookingDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this booking entry from the showroom database?')) {
      const remaining = deleteStoredBooking(id);
      setBookings(remaining);
      onRefreshTrigger();
    }
  };

  const handleEnquiryDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this enquiry entry?')) {
      const remaining = deleteStoredEnquiry(id);
      setEnquiries(remaining);
      onRefreshTrigger();
    }
  };

  // Filter analytics
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || 
                          b.phone.includes(search) || 
                          (b.notes && b.notes.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                          e.phone.includes(search) || 
                          e.message.toLowerCase().includes(search.toLowerCase()) || 
                          (e.itemTitle && e.itemTitle.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Calculate high-performance analytics
  const pendingBookingsCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookingsCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingEnquiriesCount = enquiries.filter(e => e.status === 'pending').length;

  // CSV Export utility
  const exportToCSV = () => {
    let headers: string[] = [];
    let rows: string[][] = [];
    let filename = '';

    if (activeTab === 'bookings') {
      headers = ['ID', 'Customer Name', 'Phone', 'Email', 'Date', 'Time Slot', 'Format', 'Notes', 'Created At', 'Status'];
      rows = filteredBookings.map(b => [
        b.id, b.name, b.phone, b.email, b.date, b.time, b.consultationType, b.notes || '', b.createdAt, b.status
      ]);
      filename = 'mahavir_showroom_appointments.csv';
    } else {
      headers = ['ID', 'Customer Name', 'Phone', 'Email', 'Inquired Design', 'Category', 'Message', 'Created At', 'Status'];
      rows = filteredEnquiries.map(e => [
        e.id, e.name, e.phone, e.email, e.itemTitle || '', e.itemCategory || '', e.message, e.createdAt, e.status
      ]);
      filename = 'mahavir_customer_enquiries.csv';
    }

    // Convert to CSV block
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 bg-[#FDFBF7] border-b border-[#D4AF37] font-sans text-left" id="showroom-db-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Header with Database Tag */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12 pb-6 border-b border-[#D4AF37]/30">
          <div className="space-y-1 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/15 text-[#6D1A36] border border-[#D4AF37]/35 rounded-none text-xs font-semibold uppercase tracking-widest leading-none">
              <Database className="w-3.5 h-3.5 animate-pulse" />
              <span>Showroom Operations Database</span>
            </div>
            <h2 className="text-3xl font-serif text-[#1A1A1A] font-light italic mt-2 tracking-widest text-shadow">
              Leads &amp; Enquiries Manager
            </h2>
            <p className="text-xs text-charcoal/50 font-light">
              This panel is a fully functional client-side representation, persisting data inside local storage browser tables. Standard data loss is prevented.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={reloadDatabase}
              className="p-3 bg-[#FDFBF7]/50 border-2 border-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#FAF6F0] rounded-none text-charcoal shadow-sm transition-all flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer font-sans"
            >
              <RefreshCw className="w-4 h-4 text-[#6D1A36]" />
              <span>Sync Live</span>
            </button>

            <button
              onClick={exportToCSV}
              className="px-5 py-3 bg-[#6D1A36] hover:bg-transparent hover:text-[#6D1A36] text-[#FCFBF7] rounded-none border-2 border-[#D4AF37] hover:border-[#6D1A36] shadow-md flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.15em] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-gold" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Analytics Counter Cards Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-[#FDFBF7] p-5 rounded-none border-2 border-[#D4AF37] shadow-sm text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6D1A36]/60 font-sans">Total Appointments</span>
            <div className="flex justify-between items-baseline mt-1 font-sans">
              <span className="text-3xl font-serif font-light text-[#1A1A1A]">{bookings.length}</span>
              <span className="text-xs text-[#6D1A36] font-bold font-sans">VIP Slots</span>
            </div>
          </div>

          <div className="bg-[#FDFBF7] p-5 rounded-none border-2 border-[#D4AF37] shadow-sm text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6D1A36]/60 font-sans">Pending Bookings</span>
            <div className="flex justify-between items-baseline mt-1 font-sans">
              <span className="text-3xl font-serif font-light text-[#6D1A36]">{pendingBookingsCount}</span>
              <span className="text-[9px] text-[#6D1A36] font-bold font-sans uppercase animate-pulse">Action Required</span>
            </div>
          </div>

          <div className="bg-[#FDFBF7] p-5 rounded-none border-2 border-[#D4AF37] shadow-sm text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6D1A36]/60 font-sans">Total Product Enquiries</span>
            <div className="flex justify-between items-baseline mt-1 font-sans font-sans">
              <span className="text-3xl font-serif font-light text-[#1A1A1A]">{enquiries.length}</span>
              <span className="text-xs text-[#AC8A1C] font-bold font-sans">Customer RFQs</span>
            </div>
          </div>

          <div className="bg-[#FDFBF7] p-5 rounded-none border-2 border-[#D4AF37] shadow-sm text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6D1A36]/60 font-sans">Pending Enquiries</span>
            <div className="flex justify-between items-baseline mt-1 font-sans font-sans font-sans">
              <span className="text-3xl font-serif font-light text-[#AC8A1C]">{pendingEnquiriesCount}</span>
              <span className="text-xs text-[#6D1A36] font-bold font-sans">Leads</span>
            </div>
          </div>

        </div>

        {/* Database Search & Controls */}
        <div className="bg-[#FDFBF7] p-5 rounded-none border-2 border-[#D4AF37] shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Tab Selector buttons */}
          <div className="flex bg-[#FAF6F0] p-1.5 rounded-none border border-[#D4AF37]/45 w-full md:w-auto">
            <button
              onClick={() => { setActiveTab('bookings'); setSearch(''); setStatusFilter('All'); }}
              className={`flex-1 md:flex-initial px-6 py-2 rounded-none text-xs font-sans font-bold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'bookings' ? 'bg-[#6D1A36] text-[#FDFBF7] shadow-md border border-[#D4AF37]' : 'text-[#6D1A36]/80 hover:bg-[#FAF6F0]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Appointments ({bookings.length})</span>
            </button>
            <button
              onClick={() => { setActiveTab('enquiries'); setSearch(''); setStatusFilter('All'); }}
              className={`flex-1 md:flex-initial px-6 py-2 rounded-none text-xs font-sans font-bold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'enquiries' ? 'bg-[#6D1A36] text-[#FDFBF7] shadow-md border border-[#D4AF37]' : 'text-[#6D1A36]/80 hover:bg-[#FAF6F0]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enquiries ({enquiries.length})</span>
            </button>
          </div>

          {/* Search, Filter controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1 md:max-w-xl justify-end font-sans">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D1A36]/40 w-4 h-4" />
              <input
                type="text"
                className="w-full pl-9 pr-4 py-2.5 bg-[#FAF6F0]/45 border border-[#D4AF37]/45 rounded-none outline-none focus:border-[#6D1A36] focus:ring-1 focus:ring-[#6D1A36] text-xs transition-colors"
                placeholder={`Search ${activeTab === 'bookings' ? 'appointments name / phone / notes' : 'enquiries name / model / message'}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Status Option selector */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 bg-[#FAF6F0]/45 border border-[#D4AF37]/45 text-xs font-sans font-semibold rounded-none outline-none focus:border-[#6D1A36]"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              {activeTab === 'bookings' ? (
                <>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </>
              ) : (
                <>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                </>
              )}
            </select>

          </div>

        </div>

        {/* Database Rows Matrix */}
        <div className="bg-[#FDFBF7] rounded-none border-2 border-[#D4AF37] shadow-xl overflow-hidden">
          
          <div className="overflow-x-auto">
            {activeTab === 'bookings' ? (
              // BOOKINGS TABLE
              filteredBookings.length === 0 ? (
                <div className="text-center py-16 text-charcoal/40 font-serif">
                  No appointments match current filters in local memory.
                </div>
              ) : (
                <table className="w-full min-w-[800px] border-collapse font-sans text-xs">
                  <thead>
                    <tr className="bg-[#FAF6F0] border-b-2 border-[#D4AF37] text-[#6D1A36] uppercase font-bold tracking-widest text-[10px]">
                      <th className="py-4 px-4 text-left">UID / Time</th>
                      <th className="py-4 px-4 text-left">Customer Details</th>
                      <th className="py-4 px-4 text-left">Appointment Session</th>
                      <th className="py-4 px-4 text-left">VIP Design Notes</th>
                      <th className="py-4 px-4 text-left">Flow Status</th>
                      <th className="py-4 px-4 text-center">Admin Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="border-b border-[#D4AF37]/25 hover:bg-[#FAF6F0] transition-colors bg-[#FDFBF7]">
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-mono text-[10px] text-[#AC8A1C] font-bold block">{b.id}</span>
                          <span className="text-[10px] text-charcoal/50 block mt-1">{formatDate(b.createdAt)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-charcoal block">{b.name}</span>
                          <span className="text-[10px] text-charcoal/50 block mt-0.5">{b.phone}</span>
                          <span className="text-[10px] text-charcoal/40 block">{b.email}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-none text-[9px] font-sans font-bold bg-[#6D1A36]/10 text-[#6D1A36] border border-[#6D1A36]/20 block w-fit-content mb-1 uppercase tracking-wider">
                            {b.consultationType}
                          </span>
                          <span className="font-bold block text-charcoal/90">{b.date} • {b.time}</span>
                        </td>
                        <td className="py-4 px-4 max-w-[200px]">
                          <p className="text-charcoal/70 line-clamp-2 leading-relaxed" title={b.notes}>{b.notes}</p>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-none text-[9px] font-sans font-bold uppercase tracking-widest inline-block border ${
                            b.status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2.5">
                            {b.status === 'pending' && (
                              <button
                                onClick={() => handleBookingStatusChange(b.id, 'confirmed')}
                                className="p-1.5 px-3 bg-[#6D1A36] text-[#FDFBF7] rounded-none text-[9px] font-sans font-bold uppercase tracking-wider hover:bg-emerald-700 transition cursor-pointer"
                                title="Approve Booking"
                              >
                                Approve
                              </button>
                            )}
                            {b.status === 'pending' && (
                              <button
                                onClick={() => handleBookingStatusChange(b.id, 'cancelled')}
                                className="p-1.5 px-3 text-charcoal/60 hover:text-[#6D1A36] rounded-none text-[9px] font-sans font-bold uppercase tracking-wider border border-[#D4AF37] hover:bg-[#FAF6F0] transition cursor-pointer"
                                title="Cancel Slot"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              onClick={() => handleBookingDelete(b.id)}
                              className="p-1.5 text-charcoal/40 hover:text-red-600 hover:scale-110 transition cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            ) : (
              // ENQUIRIES TABLE
              filteredEnquiries.length === 0 ? (
                <div className="text-center py-16 text-charcoal/40 font-serif">
                   No product enquiries match filters in local memory.
                </div>
              ) : (
                <table className="w-full min-w-[800px] border-collapse font-sans text-xs">
                  <thead>
                    <tr className="bg-[#FAF6F0] border-b-2 border-[#D4AF37] text-[#6D1A36] uppercase font-bold tracking-widest text-[10px]">
                      <th className="py-4 px-4 text-left">UID / Time</th>
                      <th className="py-4 px-4 text-left">Customer Profile</th>
                      <th className="py-4 px-4 text-left">Inquired Design Profile</th>
                      <th className="py-4 px-4 text-left">Enquiry Notes</th>
                      <th className="py-4 px-4 text-left">Status</th>
                      <th className="py-4 px-4 text-center">Admin Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map((e) => (
                      <tr key={e.id} className="border-b border-[#D4AF37]/25 hover:bg-[#FAF6F0] transition-colors bg-[#FDFBF7]">
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-mono text-[10px] text-[#AC8A1C] font-bold block">{e.id}</span>
                          <span className="text-[10px] text-charcoal/50 block mt-1">{formatDate(e.createdAt)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-charcoal block">{e.name}</span>
                          <span className="text-[10px] text-charcoal/50 block mt-0.5">{e.phone}</span>
                          <span className="text-[10px] text-charcoal/40 block">{e.email}</span>
                        </td>
                        <td className="py-4 px-4 font-sans">
                          <span className="font-serif font-light italic text-[#6D1A36] block leading-tight text-sm">{e.itemTitle || 'General Estimate Request'}</span>
                          <span className="text-[9px] uppercase font-sans tracking-widest text-[#D4AF37] font-bold block mt-1">
                            {e.itemCategory || 'Showroom Enquiry'}
                          </span>
                        </td>
                        <td className="py-4 px-4 max-w-[200px]">
                          <p className="text-charcoal/70 line-clamp-2 leading-relaxed" title={e.message}>{e.message}</p>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-none text-[9px] font-sans font-bold uppercase tracking-widest inline-block border ${
                            e.status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            e.status === 'contacted' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}>
                            {e.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            {e.status === 'pending' && (
                              <button
                                onClick={() => handleEnquiryStatusChange(e.id, 'contacted')}
                                className="p-1.5 px-3 bg-[#6D1A36] text-[#FDFBF7] rounded-none text-[9px] font-sans font-bold uppercase tracking-wider hover:bg-blue-700 transition cursor-pointer"
                              >
                                Mark Contacted
                              </button>
                            )}
                            {e.status === 'contacted' && (
                              <button
                                onClick={() => handleEnquiryStatusChange(e.id, 'resolved')}
                                className="p-1.5 px-3 bg-emerald-600 text-white rounded-none text-[9px] font-sans font-bold uppercase tracking-wider hover:bg-emerald-700 transition cursor-pointer"
                              >
                                Mark Resolved
                              </button>
                            )}
                            <button
                              onClick={() => handleEnquiryDelete(e.id)}
                              className="p-1.5 text-charcoal/40 hover:text-red-600 hover:scale-110 transition cursor-pointer"
                              title="Delete enquiry row"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}
          </div>
 
        </div>

      </div>
    </section>
  );
}
