import { CATEGORIES } from '../data';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <section className="py-20 bg-[#FCFBF7] border-b border-gold/10 font-sans" id="category-catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] text-maroon font-bold tracking-[0.25em] uppercase">COLLECTION SEGMENTS</p>
          <h2 className="text-3xl font-serif text-charcoal tracking-wide mt-2 font-medium">
            Shop By Category
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-charcoal/60 text-xs sm:text-sm mt-3 font-light">
            Indulge in our expansive catalogue of pure gold, pristine diamonds, and hallmarked luxury silver jewelry items.
          </p>
        </div>

        {/* Categories Grid - Mobile: 2 items/row, Tablet: 4 items/row, Laptop: 6 items/row, Desktop: 7 items/row as per guidelines */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="bg-[#FDFBF7] border border-[#D4AF37] rounded-none p-5 text-center cursor-pointer transition-all hover:bg-[#6D1A36] hover:text-[#FDFBF7] flex flex-col justify-between items-center group relative overflow-hidden h-[155px]"
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3, delay: (index % 7) * 0.05 }}
            >
              
              {/* Gold Background Ring Deco - subtle */}
              <div className="absolute w-24 h-24 -bottom-10 -right-10 bg-[#D4AF37]/5 rounded-full border border-dashed border-[#D4AF37]/10 transition-transform group-hover:scale-150" />
              
              {/* Category Icon Container */}
              <div className="w-13 h-13 rounded-full bg-[#FDFBF7]/80 border border-[#D4AF37] flex items-center justify-center text-2xl group-hover:bg-[#D4AF37] group-hover:border-[#FDFBF7] shadow-sm transition-all duration-300 relative z-10">
                <span className="group-hover:scale-110 transition-transform inline-block">
                  {cat.icon}
                </span>
              </div>

              {/* Title & Count Info */}
              <div className="relative z-10 mt-3 flex flex-col items-center">
                <span className="text-xs font-sans font-semibold text-[#1A1A1A] group-hover:text-white transition-colors tracking-widest uppercase">
                  {cat.name}
                </span>
                <span className="text-[9px] text-[#1A1A1A]/60 group-hover:text-white/70 tracking-wide mt-1 italic font-serif">
                  {cat.count} Designs
                </span>
              </div>

              {/* Little arrow hovering on the bottom */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 right-2 text-[#D4AF37] group-hover:text-white z-20">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

            </motion.div>
          ))}
        </div>

        {/* View all button overlay info */}
        <div className="mt-12 text-center relative z-20">
          <p className="text-xs text-charcoal/50 italic font-light">
            All gold categories are 100% exchangeable at our VIP showrooms. Custom size adjustments are provided free inside store.
          </p>
        </div>

      </div>
    </section>
  );
}
