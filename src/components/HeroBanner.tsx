import { useState, useEffect } from 'react';
import { Calendar, Compass, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroBannerProps {
  onExplore: () => void;
  onBook: () => void;
  onVisit: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    title: "Celestial Heritage Craftsmanship",
    subtitle: "ESTABLISHED IN 1998",
    description: "Indulge in our breathtaking traditional bridal and contemporary designer collections, curated lovingly across generations of family trust.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=85",
    accent: "Exquisite 22K Hallmarked Masterpieces"
  },
  {
    id: 2,
    title: "Infinite Diamonds. Unrivaled Brilliance.",
    subtitle: "THE SOLITAIRE ERA",
    description: "Elegantly hand-crafted VVS-clarity solitaire diamond rings and cascading chandeliers, internationally authenticated by GIA and IGI.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1920&q=85",
    accent: "Certified Syndicate Diamond Collections"
  },
  {
    id: 3,
    title: "Pure Gold. Timeless Legacies.",
    subtitle: "BIS 916 HALLMARK TRADITION",
    description: "Celebrate auspicious new beginnings with premium high-society necklaces, kadas, and temple jhumkas, representing 100% transparent billing value.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1920&q=85",
    accent: "Auspicious Kundan & Temple Ornaments"
  }
];

export default function HeroBanner({ onExplore, onBook, onVisit }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // Auto-scroll every 6 seconds as per guidelines
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="relative w-full h-[650px] lg:h-[750px] overflow-hidden bg-charcoal">
      
      {/* Background Slideshow with Slow Zoom Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.7 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Zooming background image */}
          <motion.img
            src={HERO_SLIDES[currentSlide].image}
            alt="Mahavir Jewellers Campaign"
            className="w-full h-full object-cover object-center scale-105"
            animate={{ scale: 1.15 }}
            transition={{ duration: 6, ease: "linear" }}
            referrerPolicy="no-referrer"
          />
          {/* Rich Luxury Overlay Gradients (Charcoal to elegant dark translucent mask) */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-[#FCFBF7]">
          
          {/* Subtitle / Accent Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 flex items-center gap-2 text-[#D4AF37] font-sans text-xs lg:text-sm font-semibold tracking-[0.3em] uppercase"
            >
              <span className="h-px w-6 bg-[#D4AF37]" />
              <span>{HERO_SLIDES[currentSlide].subtitle}</span>
            </motion.div>
          </AnimatePresence>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light italic tracking-wide leading-[1.1] mb-5 text-shadow"
            >
              {HERO_SLIDES[currentSlide].title}
            </motion.h1>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base lg:text-lg text-cream/90 font-sans font-light leading-relaxed mb-8 max-w-xl"
            >
              {HERO_SLIDES[currentSlide].description}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons in a Row - Gold framed for premium vibe */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={onExplore}
                className="px-8 py-3.5 bg-transparent border-2 border-[#D4AF37] hover:bg-[#D4AF37] text-white hover:text-black rounded-none text-[11px] font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-white hover:text-black transition-colors" />
                <span>Explore Collection</span>
              </button>

              <button
                onClick={onBook}
                className="px-8 py-3.5 bg-[#6D1A36] border border-[#6D1A36] text-white hover:bg-transparent hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-none text-[11px] font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Book Appointment</span>
              </button>

              <button
                onClick={onVisit}
                className="px-8 py-3.5 bg-transparent border border-white/20 hover:border-[#D4AF37] text-white rounded-none text-[11px] font-sans font-medium uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Visit Store</span>
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Trust Stamp Bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-cream/70 font-sans tracking-widest uppercase italic"
            >
              <span className="text-gold">★</span>
              <span>{HERO_SLIDES[currentSlide].accent}</span>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Manual Slider Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-charcoal/40 hover:bg-gold/20 hover:border-gold text-[#FCFBF7] hover:text-[#black] transition-all cursor-pointer z-10"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 hover:scale-110" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-charcoal/40 hover:bg-gold/20 hover:border-gold text-[#FCFBF7] hover:text-[#black] transition-all cursor-pointer z-10"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 hover:scale-110" />
      </button>

      {/* Navigation Indicators / Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-gold w-8' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
