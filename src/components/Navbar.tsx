import { useState } from 'react';
import { Menu, X, Phone, Calendar, MessageSquare, Database, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showAdmin: boolean;
  setShowAdmin: (show: boolean) => void;
  onOpenBookingModal: () => void;
  bookingCount: number;
  enquiryCount: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  showAdmin,
  setShowAdmin,
  onOpenBookingModal,
  bookingCount,
  enquiryCount,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'services', label: 'Custom & Services' },
    { id: 'legacy', label: 'Our Legacy' },
    { id: 'contact', label: 'Visit & Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setShowAdmin(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#D4AF37]">
      {/* Top Banner with Certification Trust */}
      <div className="w-full bg-[#6D1A36] text-[#FDFBF7] text-xs py-2 px-4 flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0 tracking-wider">
        <div className="flex items-center gap-2 font-light">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span>100% Certified Diamonds &amp; BIS Hallmarked HUID Gold</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-sans">
          <span>Showroom: +91 22 2844 9898</span>
          <span className="hidden md:inline border-l border-white/20 pl-4">Mon - Sun: 10:30 AM - 8:30 PM</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Brand Logo - Elegantly Structured */}
          <div className="flex-shrink-0 cursor-pointer text-center" onClick={() => handleNavClick('home')}>
            <div className="text-xl sm:text-2xl font-bold tracking-[0.2em] font-serif text-[#6D1A36] leading-none mb-0.5">
              MAHAVIR
            </div>
            <div className="text-[9px] tracking-[0.4em] uppercase font-light text-[#D4AF37] font-sans">
              Jewellers
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id && !showAdmin;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 font-sans text-[13px] font-semibold tracking-wider uppercase transition-colors duration-300 rounded ${
                    isActive ? 'text-gold-dark' : 'text-charcoal/70 hover:text-gold-dark'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Nav Right CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Showroom Admin Button (Lead Tracker DB) */}
            <button
              onClick={() => {
                setShowAdmin(!showAdmin);
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-full border transition-all duration-300 relative group flex items-center justify-center ${
                showAdmin
                  ? 'bg-gold/10 border-gold text-gold-dark'
                  : 'border-gold/30 hover:border-gold hover:bg-gold/5 text-charcoal/70 hover:text-gold-dark'
              }`}
              title="Showroom Enquiries & Bookings DB Viewer"
              id="admin-dashboard-toggle"
            >
              <Database className="w-4.5 h-4.5" />
              {(bookingCount + enquiryCount > 0) && (
                <span className="absolute -top-1 -right-1 bg-maroon text-[#FCFBF7] text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold animate-bounce">
                  {bookingCount + enquiryCount}
                </span>
              )}
              {/* Tooltip */}
              <span className="pointer-events-none absolute -bottom-10 right-0 scale-0 transition-all rounded bg-charcoal/95 px-2 py-1 text-[11px] text-[#FCFBF7] group-hover:scale-100 font-sans tracking-wide">
                Showroom DB Admin
              </span>
            </button>

            {/* Quick Action Dial / WhatsApp Chat */}
            <a
              href="https://wa.me/919999999999?text=Hi Mahavir Jewellers! I would like to enquire about beautiful jewellery collections."
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full border border-green-500/30 text-green-600 hover:bg-green-50/50 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4.5 h-4.5" />
            </a>

            {/* Quick Consultation Booking Tab */}
            <button
              onClick={onOpenBookingModal}
              className="px-5 py-2.5 bg-maroon hover:bg-maroon/90 text-[#FCFBF7] text-[12px] font-sans font-semibold uppercase tracking-wider rounded border border-gold/20 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              id="header-booking"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Right Bar Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className={`p-2 rounded border relative ${
                showAdmin ? 'bg-gold/10 border-gold text-gold-dark' : 'border-gold/20 text-charcoal/70'
              }`}
              title="DB Admin View"
            >
              <Database className="w-4 h-4" />
              {(bookingCount + enquiryCount > 0) && (
                <span className="absolute -top-1.5 -right-1.5 bg-maroon text-[#FCFBF7] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {bookingCount + enquiryCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal hover:text-gold-dark transition-colors border border-charcoal/10 rounded"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Slideout */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden w-full bg-white border-t border-gold/10 overflow-hidden shadow-inner font-sans"
          >
            <div className="px-4 py-5 space-y-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.id && !showAdmin;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left py-2 px-3 font-semibold text-[13px] tracking-wider uppercase rounded transition-colors ${
                      isActive ? 'bg-gold/10 text-gold-dark border-l-4 border-gold' : 'text-charcoal/70 hover:bg-cream/30 hover:text-gold-dark'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-gold/10 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    onOpenBookingModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-maroon text-white rounded text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border border-gold/20"
                >
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Book Appointment</span>
                </button>

                <a
                  href="https://wa.me/919999999999?text=Hi Mahavir Jewellers!"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-green-50 text-green-700 hover:bg-green-100 rounded text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border border-green-200"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Enquiries</span>
                </a>

                <div className="text-center text-[11px] text-charcoal/50 pb-2">
                  Showroom: +91 22 2844 9898
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
