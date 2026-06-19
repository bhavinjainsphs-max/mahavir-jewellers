import { useState } from 'react';
import { Sparkles, Award, Shield, ArrowRight, MessageSquare, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BounceCards from './BounceCards';

interface ShowcaseProps {
  onSelectCollection: (collectionId: string) => void;
  onEnquire: (itemName: string, categoryName: string) => void;
}

const SHOWCASE_TABS = [
  {
    id: 'bridal',
    name: 'Bridal Collection',
    imageMain: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    imageSide: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    tagline: 'Imperial Heritage Bridal Set',
    description: 'Our bridal masterpieces combine age-old Rajasthani kundan work and fine filigree wire art. Designed to drape majestically in premium 22K yellow gold with hand-beaded deep red and green gemstones.',
    specifications: [
      { label: 'Purity standard', value: '22 Karat (916 BIS Hallmark)' },
      { label: 'Making Cost Range', value: 'Starts at 8% flat' },
      { label: 'Crafting Hours', value: '340+ Artisanal Work Hours' },
      { label: 'Weight Customization', value: '35g up to 350g custom' }
    ],
    motto: "Where heritage meets royal marital elegance."
  },
  {
    id: 'diamond',
    name: 'Diamond Collection',
    imageMain: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    imageSide: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    tagline: 'Antwerp Starry Halo Solitaires',
    description: 'Selected with microscopic precision, every certified diamond at Mahavir Jewellers offers triple excellent symmetry, perfect cut grids, and VVS Clarity, radiating incredible ambient diamond dispersion.',
    specifications: [
      { label: 'Diamond Clarity', value: 'VVS1, VVS2, & FL grade' },
      { label: 'Cut / Polish', value: 'EX - EX - EX (Excellent Symmetry)' },
      { label: 'Verification Cert', value: 'GIA & IGI Verified' },
      { label: 'Setting Style', value: 'Custom Platinum 950 Prong' }
    ],
    motto: "A magnificent promise of infinite sparkle."
  },
  {
    id: 'gold',
    name: 'Gold Collection',
    imageMain: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
    imageSide: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80',
    tagline: 'Signature Embossed Gold Bangle',
    description: 'Each kada and chain represents raw, uncompromised hallmark gold purity. We blend standard modern casting procedures with centuries-old die embossing, ensuring flawless structural strength.',
    specifications: [
      { label: 'Standard Purity', value: '22K & 24K Pure Cast' },
      { label: 'Purity HUID Stamp', value: '6-digit Laser HUID Verified' },
      { label: 'Gold Bill Rate', value: 'Live Bullion Exchange value' },
      { label: 'Lifetime Policy', value: '100% Exchange Value Guaranteed' }
    ],
    motto: "Generations of gold. Generations of familial trust."
  },
  {
    id: 'silver',
    name: 'Silver Collection',
    imageMain: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80',
    imageSide: 'https://images.unsplash.com/photo-1543294001-f7cbfe92237e?auto=format&fit=crop&w=600&q=80',
    tagline: 'Prism Sterling 92.5 Silver Anklet',
    description: 'Sourced under supreme standards, our designer sterling silver anklets, wrist chains, and giftware provide unmatched anti-tarnish rhodium shielding, making them perfect for premium daily-use.',
    specifications: [
      { label: 'Metal Grade', value: '92.5% Sterling Silver' },
      { label: 'Coating Shield', value: 'Special Anti-Oxidant Rhodium' },
      { label: 'Allergy Status', value: 'Hypoallergenic (100% Nickel-Free)' },
      { label: 'Packaging', value: 'Premium Velvet Gift Box Setup' }
    ],
    motto: "Modern style built with lightweight silver radiance."
  },
  {
    id: 'mens-jewellery',
    name: "Men's Collection",
    imageMain: 'https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8da?auto=format&fit=crop&w=800&q=80',
    imageSide: 'https://images.unsplash.com/photo-1569054011377-67d78a84620f?auto=format&fit=crop&w=600&q=80',
    tagline: "The Sovereign Diamond-Crest Kada",
    description: "Designed for the sophisticated man. Featuring heavy solid link gold chains, rectangular diamond sovereign signet rings, and heavy platinum bracelets built to denote command and refined classic styling.",
    specifications: [
      { label: 'Gold Purity', value: '22K Hallmark Yellow Gold' },
      { label: 'Average Weight', value: '28g - 110g heavyweight bands' },
      { label: 'Stone Options', value: 'VVS Solitaires & Black Onyx' },
      { label: 'Lock Type', value: 'Double-safety luxury barrel hinges' }
    ],
    motto: "Refined masculine dignity in durable, solid gold."
  }
];

const getBounceImages = (tabId: string): string[] => {
  const current = SHOWCASE_TABS.find(t => t.id === tabId) || SHOWCASE_TABS[0];
  const categoryImages: Record<string, string[]> = {
    bridal: [
      current.imageMain,
      current.imageSide,
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80'
    ],
    diamond: [
      current.imageMain,
      current.imageSide,
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518406437533-92711ede2aae?auto=format&fit=crop&w=600&q=80'
    ],
    gold: [
      current.imageMain,
      current.imageSide,
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80'
    ],
    silver: [
      current.imageMain,
      current.imageSide,
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1543294001-f7cbfe92237e?auto=format&fit=crop&w=600&q=80'
    ],
    'mens-jewellery': [
      current.imageMain,
      current.imageSide,
      'https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8da?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1569054011377-67d78a84620f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
    ]
  };

  return categoryImages[tabId] || [current.imageMain, current.imageSide];
};

export default function Showcase({ onSelectCollection, onEnquire }: ShowcaseProps) {
  const [activeTab, setActiveTab] = useState('bridal');

  const activeData = SHOWCASE_TABS.find(tab => tab.id === activeTab) || SHOWCASE_TABS[0];

  return (
    <section className="py-20 bg-[#FDFBF7] border-b border-[#D4AF37] font-sans" id="studio-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs text-[#AC8A1C] font-sans font-bold tracking-[0.3em] uppercase">BLUESTONE EXPERIENCE</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] tracking-wider mt-2 font-light italic text-shadow">
            Interactive Collection Showcase
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
          <p className="text-[#1A1A1A]/60 text-xs sm:text-sm mt-4 font-light leading-relaxed">
            Toggle through our premier design labs. Observe the detailed composition, craftsmanship metrics, and design philosophies of our signature luxury ornaments.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mb-12 max-w-4xl mx-auto">
          {SHOWCASE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 sm:px-7 py-3 text-xs sm:text-[13px] font-sans font-semibold uppercase tracking-[0.18em] transition-all duration-300 rounded-none border-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#6D1A36] text-[#FDFBF7] border-[#6D1A36] shadow-lg scale-102'
                  : 'bg-[#FDFBF7] text-[#1A1A1A]/70 border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-cream/40'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Showcase Content Layout: Beautiful split display with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            
            {/* LEFT: Immersive Specifications Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border-2 border-[#D4AF37] bg-[#FDFBF7]/90 p-8 rounded-none shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 top-0 bg-[#D4AF37]/10 text-gold-dark p-2 text-xs font-bold font-serif italic border-b border-l border-[#D4AF37]/35">
                  EST. 1998
                </div>
                
                <div className="flex items-center gap-2 text-maroon text-[11px] font-bold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>PREMIUM SERIES</span>
                </div>
                
                <h3 className="text-2xl font-serif text-charcoal tracking-wide font-medium mt-2">
                  {activeData.tagline}
                </h3>
                
                <p className="text-[#AC8A1C] text-xs font-sans italic mt-1 font-semibold">{activeData.motto}</p>
                
                <p className="text-charcoal/80 text-xs sm:text-sm mt-4 leading-relaxed font-light">
                  {activeData.description}
                </p>

                {/* Craftsmanship Specifications Grid */}
                <div className="mt-6 border-t border-gold/10 pt-6 space-y-3.5">
                  <h4 className="text-[11px] text-charcoal/50 font-bold uppercase tracking-wider font-sans">Craftsmanship Standards</h4>
                  
                  {activeData.specifications.map((spec, sIdx) => (
                    <div key={sIdx} className="flex justify-between items-center text-xs border-b border-dashed border-charcoal/5 pb-2">
                      <span className="text-charcoal/70 font-sans">{spec.label}</span>
                      <span className="text-charcoal font-semibold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Card footer metrics */}
                <div className="mt-6 pt-4 flex gap-3 text-center sm:text-left text-[10px] text-charcoal/60 border-t border-gold/10 font-sans">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                    <span>BIS Certified</span>
                  </div>
                  <div className="flex items-center gap-1.5 border-l border-charcoal/10 pl-3">
                    <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>100% Tax Invoice</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Link */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onSelectCollection(activeTab)}
                  className="px-6 py-3.5 bg-[#6D1A36] text-[#FDFBF7] text-xs font-sans font-bold uppercase tracking-[0.18em] rounded-none shadow hover:shadow-lg flex items-center gap-2 hover:bg-transparent hover:text-[#6D1A36] hover:border-[#D4AF37] transition-all cursor-pointer border border-[#6D1A36]"
                >
                  <span>Browse {activeData.name}</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </button>

                <button
                  onClick={() => onEnquire(activeData.tagline, activeData.name)}
                  className="px-6 py-3.5 bg-transparent text-[#1A1A1A] border-2 border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#FDFBF7] rounded-none text-xs font-sans font-bold uppercase tracking-[0.18em] flex items-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span>Enquire Via WhatsApp</span>
                </button>
              </div>

            </div>

            {/* RIGHT: Overlapping Immersive Image Showcase with BounceCards */}
            <div className="lg:col-span-7 flex justify-center items-center h-[380px] sm:h-[450px] relative overflow-visible mt-8 lg:mt-0">
              
              {/* Golden Background Mandala Outline Decor */}
              <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-dashed border-[#D4AF37]/25 animate-[spin_100s_linear_infinite]" />
              
              {/* Bounce Cards Animation Component */}
              <BounceCards
                images={getBounceImages(activeTab)}
                containerWidth="100%"
                containerHeight={460}
                stiffness={300}
                damping={12}
                mass={0.9}
              />
              
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
