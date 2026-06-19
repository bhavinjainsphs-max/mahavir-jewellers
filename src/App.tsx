import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Clock, X, CheckCircle, Database } from 'lucide-react';

// Component Imports
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import Promotions from './components/Promotions';
import Showcase from './components/Showcase';
import CategoryGrid from './components/CategoryGrid';
import Trending from './components/Trending';
import WhyChooseUs from './components/WhyChooseUs';
import VideoConsultation from './components/VideoConsultation';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import InstagramGrid from './components/Instagram';
import ShowroomContact from './components/ShowroomContact';
import LeadDashboard from './components/LeadDashboard';
import Footer from './components/Footer';

// Helper Database Sync Function
import { getStoredEnquiries, getStoredBookings } from './utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAdmin, setShowAdmin] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Deep filter links passed downwards
  const [deepCollection, setDeepCollection] = useState<string | undefined>(undefined);
  const [deepCategory, setDeepCategory] = useState<string | undefined>(undefined);

  // Sync state triggers
  const [dbCounter, setDbCounter] = useState(0);
  const [enqCount, setEnqCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);

  // Load database metadata for notifications badge on mount
  useEffect(() => {
    try {
      setEnqCount(getStoredEnquiries().length);
      setBookCount(getStoredBookings().length);
    } catch (e) {
      console.error(e);
    }
  }, [dbCounter]);

  const handleDatabaseUpdate = () => {
    setDbCounter(prev => prev + 1);
  };

  const handleSelectCategory = (catName: string) => {
    setDeepCategory(catName);
    setDeepCollection(undefined);
    setActiveTab('collections');
    setShowAdmin(false);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleSelectCollection = (collectionId: string) => {
    setDeepCollection(collectionId);
    setDeepCategory(undefined);
    setActiveTab('collections');
    setShowAdmin(false);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleCampaignAction = (promoId: string) => {
    if (promoId === 'p2') {
      // Personal expert consultation -> scroll to video booking
      if (activeTab !== 'services') {
        setActiveTab('services');
        setTimeout(() => {
          document.getElementById('video-expert')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('video-expert')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Explore customized jewelry OR silver
      setDeepCollection(promoId === 'p1' ? 'silver' : promoId === 'p3' ? 'bridal' : 'gold');
      setDeepCategory(undefined);
      setActiveTab('collections');
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col relative">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
        onOpenBookingModal={() => setBookingModalOpen(true)}
        bookingCount={bookCount}
        enquiryCount={enqCount}
      />

      {/* 2. Main Body Container with dynamic view states */}
      <main className="flex-grow">
        
        {/* VIEW 1: Showroom Enquiries Admin Dashboard */}
        {showAdmin ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <LeadDashboard
              onRefreshTrigger={handleDatabaseUpdate}
              bookingTriggerCount={dbCounter}
              enquiryTriggerCount={dbCounter}
            />
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {/* TAB: Home View */}
            {activeTab === 'home' && (
              <motion.div
                key="home-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <HeroBanner
                  onExplore={() => handleSelectCollection('All')}
                  onBook={() => setBookingModalOpen(true)}
                  onVisit={() => {
                    setActiveTab('contact');
                    setTimeout(() => {
                      document.getElementById('showroom-contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                />
                
                <Promotions onActionClick={handleCampaignAction} />
                
                <Showcase
                  onSelectCollection={handleSelectCollection}
                  onEnquire={(itemName, categoryName) => {
                    setBookingModalOpen(true);
                  }}
                />
                
                <CategoryGrid onSelectCategory={handleSelectCategory} />
                
                <Trending onSelectCollection={handleSelectCollection} />
                
                <WhyChooseUs />
                
                <Testimonials />
                
                <InstagramGrid />
                
                {/* Embedded Showroom teaser block */}
                <div className="bg-maroon py-16 text-[#FCFBF7] text-center px-4">
                  <span className="text-[10px] text-gold tracking-widest font-black uppercase">VISIT MAHAVIR FLAGSHIP</span>
                  <h3 className="text-2xl font-serif mt-2 font-medium">Serving Generations Of Family Milestones</h3>
                  <p className="text-xs text-cream/75 max-w-lg mx-auto leading-relaxed mt-2.5 font-light">
                    Every jewelry piece is more than gold weight; it holds raw laughter and vows. Experience physical hallmarks and customize custom estimates with zero purchase obligation inside storing VIP lounges.
                  </p>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="mt-6 px-6 py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold uppercase rounded text-xs tracking-wider transition-all cursor-pointer"
                  >
                    Locate Showroom
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB: Collections View */}
            {activeTab === 'collections' && (
              <motion.div
                key="collections-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Beautiful collections page header */}
                <div className="bg-gradient-to-r from-cream via-[#FAF6F0] to-[#FCFBF7] py-16 border-b border-gold/10 text-center">
                  <span className="text-[10px] text-maroon font-black tracking-widest uppercase block">EXCLUSIVE COLLECTIONS CATALOGUE</span>
                  <h1 className="text-3xl sm:text-4.5xl font-serif tracking-wide text-charcoal mt-2 leading-none font-medium">Fine Designs Ledger</h1>
                  <p className="text-xs text-charcoal/50 font-sans tracking-widest mt-2 uppercase">BIS Hallmark &amp; IGI Diamond Authenticated</p>
                </div>

                <Gallery
                  preSelectedCollectionId={deepCollection}
                  preSelectedCategoryName={deepCategory}
                  onEnquirySuccess={handleDatabaseUpdate}
                />
              </motion.div>
            )}

            {/* TAB: Services View */}
            {activeTab === 'services' && (
              <motion.div
                key="services-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="py-12"
              >
                {/* Services Page Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 px-4">
                  <span className="text-xs text-maroon font-bold tracking-[0.2em] uppercase">VIP TREATMENT &amp; CRAFTING</span>
                  <h1 className="text-3.5xl font-serif text-charcoal tracking-wide mt-2 font-medium">Bespoke Jewelry Customization &amp; Repairs</h1>
                  <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
                </div>

                <WhyChooseUs />
                <VideoConsultation onBookingSuccess={handleDatabaseUpdate} />
              </motion.div>
            )}

            {/* TAB: Legacy View */}
            {activeTab === 'legacy' && (
              <motion.div
                key="legacy-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ShowroomContact
                  onEnquirySuccess={handleDatabaseUpdate}
                  onBookClick={() => setBookingModalOpen(true)}
                />
              </motion.div>
            )}

            {/* TAB: Visit & Contact View */}
            {activeTab === 'contact' && (
              <motion.div
                key="contact-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Contact Page Header */}
                <div className="bg-gradient-to-r from-cream via-[#FAF6F0] to-[#FCFBF7] py-16 border-b border-gold/10 text-center">
                  <span className="text-[10px] text-maroon font-black tracking-widest uppercase block">24/7 CUSTOMER CONCIERGE</span>
                  <h1 className="text-3.5xl font-serif tracking-wide text-charcoal mt-2 leading-none font-medium">Get In Touch</h1>
                  <p className="text-xs text-[#AC8A1C] font-semibold tracking-wider font-sans uppercase mt-2">Colaba Showroom VIP Layouts &amp; Contacts</p>
                </div>

                <ShowroomContact
                  onEnquirySuccess={handleDatabaseUpdate}
                  onBookClick={() => setBookingModalOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}

      </main>

      {/* 3. Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBookingModal={() => setBookingModalOpen(true)}
        setShowAdmin={setShowAdmin}
      />

      {/* 4. Global Floating Booking Modal Panel */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/85 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="bg-white max-w-md w-full rounded-2xl overflow-hidden border border-gold/40 shadow-2xl relative"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-4 right-4 bg-black/60 text-white p-1 rounded-full hover:bg-gold hover:text-black transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="p-6">
                <VideoConsultation onBookingSuccess={handleDatabaseUpdate} />
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

