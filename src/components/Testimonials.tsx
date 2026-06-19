import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const activeReview = TESTIMONIALS[index];

  return (
    <section className="py-20 bg-cream/30 border-b border-gold/10 font-sans" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs text-maroon font-bold tracking-[0.25em] uppercase">VOICES OF SATISFACTION</p>
          <h2 className="text-3xl font-serif text-charcoal tracking-wide mt-2 font-medium">
            Customer Testimonials
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        {/* Testimonials Core box */}
        <div className="relative max-w-3xl mx-auto bg-white border border-gold/15 p-8 sm:p-12 rounded-2xl shadow-xl">
          
          <Quote className="absolute right-8 top-8 w-12 h-12 text-gold/10 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-6"
            >
              {/* Stars */}
              <div className="flex justify-center items-center gap-1">
                {Array.from({ length: 5 }).map((_, sIdx) => (
                  <Star
                    key={sIdx}
                    className={`w-4.5 h-4.5 ${
                      sIdx < activeReview.rating ? 'fill-gold text-gold' : 'text-charcoal/20'
                    }`}
                  />
                ))}
              </div>

              {/* Comment text */}
              <blockquote className="text-sm sm:text-base md:text-lg font-serif text-charcoal tracking-wide italic leading-relaxed max-w-2xl mx-auto">
                &ldquo;{activeReview.comment}&rdquo;
              </blockquote>

              {/* Customer ID profile */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold/40 shadow-sm bg-cream">
                  <img
                    src={activeReview.avatar}
                    alt={activeReview.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left font-sans">
                  <cite className="block text-xs sm:text-sm font-semibold text-charcoal not-italic leading-none">
                    {activeReview.name}
                  </cite>
                  <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider flex items-center gap-1 mt-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Verified Shopper • {activeReview.date}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-gold/5 max-w-xs mx-auto">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full border border-gold/20 hover:border-gold hover:bg-cream/20 text-charcoal/40 hover:text-gold-dark cursor-pointer transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>

            {/* Bullets tracker */}
            <div className="flex space-x-1.5">
              {TESTIMONIALS.map((_, bulletI) => (
                <button
                  key={bulletI}
                  onClick={() => setIndex(bulletI)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    bulletI === index ? 'bg-gold w-4' : 'bg-gold/30 hover:bg-gold/50'
                  }`}
                  aria-label={`Go to slide ${bulletI + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-1.5 rounded-full border border-gold/20 hover:border-gold hover:bg-cream/20 text-charcoal/40 hover:text-gold-dark cursor-pointer transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>

        {/* Global Google review count indicator */}
        <div className="mt-8 text-center flex flex-col justify-center items-center gap-1 text-[11px] text-charcoal/40 font-semibold tracking-wider font-sans uppercase">
          <div className="flex items-center gap-1.5 text-gold-dark font-black">
            <span>4.9 / 5.0 Rating</span>
            <span>•</span>
            <span>2,400+ Showroom Google Reviews</span>
          </div>
          <span>Gold Bullion Verified Authority Since 1998</span>
        </div>

      </div>
    </section>
  );
}
