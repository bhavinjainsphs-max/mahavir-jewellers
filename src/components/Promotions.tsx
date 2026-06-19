import { useState, useEffect } from 'react';
import { Gift, Sparkles, User, Ticket, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PROMO_CAMPAIGNS = [
  {
    id: 'p1',
    title: 'The Divine Silver Collection',
    subtitle: '92.5 STERLING DESIGNER JEWELLERY',
    description: 'Get free customized silver polishing and standard lifetime warranty certificates with all designer silver luxury anklets, chains, and rings.',
    tag: 'Trending Now',
    icon: Gift,
    bgGradient: 'from-slate-100 via-rose-50 to-slate-100',
    borderColor: 'border-slate-300'
  },
  {
    id: 'p2',
    title: 'Your Personal Jewellery Expert',
    subtitle: 'VIP VIP CONSULTATIONS ON-DEMAND',
    description: 'Connect with our head luxury design curators to review CAD blueprints, customized weight casting, and diamonds from Antwerp.',
    tag: 'In-Store & Video',
    icon: User,
    bgGradient: 'from-amber-50/50 via-cream to-amber-50/50',
    borderColor: 'border-gold/30'
  },
  {
    id: 'p3',
    title: 'The Majestic Bridal Registry',
    subtitle: 'HAND-CRAFTED ROYAL DÉKORS',
    description: 'Bespoke heavy weight kundan neckpieces, matching maang tikkas, and waistbands with certified diamond options at transparent maker rates.',
    tag: 'Premium Wedding',
    icon: Sparkles,
    bgGradient: 'from-rose-50/40 via-cream to-gold/10',
    borderColor: 'border-maroon/20'
  },
  {
    id: 'p4',
    title: 'Exclusive In-Store Gold Offer',
    subtitle: 'FESTIVAL SPECIAL SAVINGS',
    description: 'Flat 15% discount on gold making charges and zero gold jewelry exchange deduction policies on old 22K hallmark gold exchange operations.',
    tag: 'Limited Offer',
    icon: Ticket,
    bgGradient: 'from-amber-100/30 via-cream to-slate-50',
    borderColor: 'border-gold/30'
  },
  {
    id: 'p5',
    title: 'Royal Solitaires Celebration',
    subtitle: '100% GIA AUTHENTICATED MINTS',
    description: 'Exclusive 0.5CT - 5CT solitaire exhibits in VIP showrooms with special customization kits and custom 18K ring bands free during this anniversary.',
    tag: 'VIP Launch',
    icon: Award,
    bgGradient: 'from-indigo-50/20 via-cream to-rose-50/20',
    borderColor: 'border-indigo-200'
  }
];

export default function Promotions({ onActionClick }: { onActionClick: (promoId: string) => void }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PROMO_CAMPAIGNS.length);
    }, 4500); // 4-5 second autoplay as per PRD
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % PROMO_CAMPAIGNS.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + PROMO_CAMPAIGNS.length) % PROMO_CAMPAIGNS.length);
  };

  const CampaignIcon = PROMO_CAMPAIGNS[index].icon;

  return (
    <div 
      className="w-full bg-[#FDFBF7] py-12 border-b border-[#D4AF37] font-sans relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-8">
          <p className="text-[11px] text-[#6D1A36] font-bold tracking-[0.3em] uppercase">SPECIAL INITIATIVES</p>
          <h2 className="text-2xl font-serif text-[#1A1A1A] mt-1 tracking-widest italic font-light">Highlight Campaigns</h2>
          <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-2.5" />
        </div>

        {/* Carousel Framework */}
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-none border border-[#D4AF37] shadow-lg min-h-[220px] md:min-h-[160px] bg-[#FDFBF7]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-cream to-[#FDFBF7] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              
              {/* Left Side Content */}
              <div className="flex items-center gap-4 text-left flex-1">
                <div className="hidden sm:flex p-3 bg-transparent border border-[#D4AF37] rounded-none text-[#6D1A36] shadow-sm">
                  <CampaignIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[8px] font-sans font-bold uppercase tracking-[0.22em] bg-[#6D1A36] text-[#FDFBF7] rounded-none">
                      {PROMO_CAMPAIGNS[index].tag}
                    </span>
                    <span className="text-[9px] text-[#1A1A1A]/60 font-semibold tracking-[0.18em] uppercase font-sans">
                      {PROMO_CAMPAIGNS[index].subtitle}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-serif font-light italic text-[#1A1A1A] mt-1">
                    {PROMO_CAMPAIGNS[index].title}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/85 mt-2 leading-relaxed max-w-2xl font-light">
                    {PROMO_CAMPAIGNS[index].description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onActionClick(PROMO_CAMPAIGNS[index].id)}
                className="px-6 py-3 bg-[#6D1A36] border border-[#6D1A36] text-[#FDFBF7] text-[10px] font-semibold rounded-none uppercase tracking-[0.2em] hover:bg-transparent hover:text-[#6D1A36] hover:border-[#D4AF37] transition-all self-end md:self-center shrink-0 cursor-pointer"
              >
                Inquire Campaign
              </button>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Manual Slideshow Controls */}
        <div className="flex items-center justify-center space-x-6 mt-6">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-none border border-[#D4AF37] hover:bg-[#6D1A36] hover:text-[#FDFBF7] text-[#1A1A1A]/60 transition-colors bg-[#FDFBF7] cursor-pointer"
            aria-label="Previous Offer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Bullet Indicators */}
          <div className="flex space-x-2">
            {PROMO_CAMPAIGNS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-none transition-all duration-300 ${
                  i === index ? 'bg-[#D4AF37] w-6' : 'bg-[#D4AF37]/35 hover:bg-[#D4AF37]/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-1.5 rounded-none border border-[#D4AF37] hover:bg-[#6D1A36] hover:text-[#FDFBF7] text-[#1A1A1A]/60 transition-colors bg-[#FDFBF7] cursor-pointer"
            aria-label="Next Offer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
