import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Sparkles, MoveRight } from 'lucide-react';
import { motion } from 'motion/react';

interface TrendingProps {
  onSelectCollection: (collectionId: string) => void;
}

const TRENDING_COLLECTIONS = [
  {
    id: 'bridal',
    name: 'Bridal Jewellery',
    tagline: 'Imperial Royal Regalia Sets',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    count: '160+ unique designs',
    badge: 'Auspicious Red Book'
  },
  {
    id: 'diamond',
    name: 'Diamond Rings',
    tagline: 'Solitaire Promise Girdles',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    count: '85+ certified rings',
    badge: 'Best seller'
  },
  {
    id: 'silver',
    name: 'Daily Wear Jewellery',
    tagline: 'Vibrant Light & Elegant',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80',
    count: '240+ minimalist items',
    badge: 'Daily Essentials'
  },
  {
    id: 'gold',
    name: 'Temple Jewellery',
    tagline: 'Divine Antique Gold Carvings',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    count: '94+ handcrafted pieces',
    badge: 'Heritage Classic'
  },
  {
    id: 'diamond',
    name: 'Anniversary Collection',
    tagline: 'Eternity Solitaires & Bands',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    count: '48+ selected pendants',
    badge: 'Milestone Gifts'
  },
  {
    id: 'silver',
    name: 'Office Wear Jewellery',
    tagline: 'Sleek Platinum/Gold Fusion',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    count: '110+ geometric contours',
    badge: 'Modern Professional'
  },
];

export default function Trending({ onSelectCollection }: TrendingProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto Scroll Tracker Logic as required by PRD
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Scroll right. If at end, loop back
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNavClick = (direction: 'prev' | 'next') => {
    setIsPaused(true);
    if (scrollRef.current) {
      const scrollValue = direction === 'prev' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollValue, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="py-20 bg-cream/10 border-b border-gold/10 font-sans" 
      id="trending-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div className="text-left">
            <div className="flex items-center gap-2 text-[#6D1A36] text-[11px] font-bold tracking-[0.25em] uppercase">
              <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>MOST ADMIRED DESIGNS</span>
            </div>
            <h2 className="text-3xl font-serif text-[#1A1A1A] mt-2 font-light italic tracking-widest text-shadow">
              Trending Collections
            </h2>
            <p className="text-[#1A1A1A]/60 text-xs sm:text-sm mt-1.5 font-light">
              See what is trending across current luxury styling indices. Hover to pause auto-scrolling.
            </p>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center space-x-3 self-end sm:self-auto">
            <span className="text-[10px] text-[#1A1A1A]/40 uppercase font-sans font-bold tracking-[0.2em] hidden sm:inline">
              Drag or Nav
            </span>
            <button
              onClick={() => handleNavClick('prev')}
              className="p-2 sm:p-2.5 rounded-none border-2 border-[#D4AF37] hover:bg-[#6D1A36] hover:text-white bg-[#FDFBF7] text-[#1A1A1A]/60 transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavClick('next')}
              className="p-2 sm:p-2.5 rounded-none border-2 border-[#D4AF37] hover:bg-[#6D1A36] hover:text-white bg-[#FDFBF7] text-[#1A1A1A]/60 transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 pb-6 pt-2 scrollbar-none snap-x snap-mandatory cursor-grab"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TRENDING_COLLECTIONS.map((col) => (
            <motion.div
              key={col.name}
              className="flex-shrink-0 w-[260px] sm:w-[290px] bg-[#FDFBF7] rounded-none border border-[#D4AF37] shadow-md overflow-hidden hover:shadow-xl hover:border-[#D4AF37] relative group snap-start"
              whileHover={{ y: -8 }}
              onClick={() => onSelectCollection(col.id)}
            >
              
              {/* Premium Card image with Zoom */}
              <div className="h-[210px] overflow-hidden relative">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Gilt Badge Tag */}
                <div className="absolute top-3 left-3 bg-[#6D1A36] text-[#FDFBF7] text-[9px] font-sans font-bold px-2.5 py-1 rounded-none uppercase tracking-widest border border-[#D4AF37]/30 z-10 shadow">
                   {col.badge}
                </div>

                {/* Sparkling Icon */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm shadow p-1.5 rounded-none border border-white/10 text-gold z-10">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>

                {/* Floating details inside mask */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10 text-left">
                  <p className="text-[10px] text-[#D4AF37] font-sans uppercase font-bold tracking-[0.2em]">
                    {col.tagline}
                  </p>
                  <h3 className="text-base sm:text-lg font-serif font-light italic mt-0.5 tracking-wider text-[#FDFBF7]">
                    {col.name}
                  </h3>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-4 flex justify-between items-center bg-[#FDFBF7] border-t border-[#D4AF37]">
                <span className="text-[11px] text-[#1A1A1A]/60 font-sans tracking-wide">
                  {col.count}
                </span>

                <button className="flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-[#AC8A1C] hover:text-[#D4AF37] transition-colors">
                  <span>Explore</span>
                  <MoveRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Carousel footer detail */}
        <div className="text-center mt-6">
          <p className="text-[11px] text-charcoal/40 font-semibold tracking-widest uppercase">
            ❖ OVER 15,000+ DESIGNS DISPLAYED MONTHLY IN SHOWROOMS ❖
          </p>
        </div>

      </div>
    </section>
  );
}
