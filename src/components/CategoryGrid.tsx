import { CATEGORIES } from '../data';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import DomeGallery from './DomeGallery';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <section className="py-20 bg-[#FCFBF7] border-b border-gold/10 font-sans overflow-hidden" id="category-catalog">
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

        {/* Interactive 3D Dome Gallery Animation */}
        <div className="w-full">
          <DomeGallery
            items={CATEGORIES}
            minRadius={800}
            onSelectItem={onSelectCategory}
          />
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
