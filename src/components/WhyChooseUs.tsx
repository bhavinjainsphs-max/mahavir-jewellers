import { Award, ShieldCheck, PenTool, Flame, RefreshCw, Sparkles, Check } from 'lucide-react';
import { motion } from 'motion/react';

const TRUST_REASONS = [
  {
    id: 'r1',
    title: 'BIS Hallmarked Gold',
    description: 'Every single gram of yellow, rose, or white gold ornament is laser-stamped with a unique 6-digit HUID code, confirming 100% transparent purity index.',
    icon: ShieldCheck,
    stat: '100% Pure',
    colorClass: 'text-amber-500'
  },
  {
    id: 'r2',
    title: 'Certified Integrity Diamonds',
    description: 'Sourced from conflict-free zones. Every diamond larger than 0.1 carats comes with a standard GIA, IGI, or SGL authenticity certificate tracking link.',
    icon: Award,
    stat: 'IGI Certified',
    colorClass: 'text-sky-500'
  },
  {
    id: 'r3',
    title: 'Trusted Since 1998',
    description: 'Serving generations of families over 28+ years of uncompromised trust, verified buybacks, absolute billing transparency, and master metal care.',
    icon: Sparkles,
    stat: '28+ Years',
    colorClass: 'text-gold-dark'
  },
  {
    id: 'r4',
    title: 'Bespoke Custom Designing',
    description: 'Translate your dream concepts, physical sketches, or Pinterest references to 3D CAD modeling. Witness exact castings casted in 10-14 days.',
    icon: PenTool,
    stat: '3D CAD Model',
    colorClass: 'text-pink-500'
  },
  {
    id: 'r5',
    title: 'In-Store Repair & Polish',
    description: 'Complimentary supersonic ultrasonic jewellery stream-cleaning, re-tipping, laser soldering, and rhodium plating services available inside VIP state lounges.',
    icon: RefreshCw,
    stat: 'Same Day',
    colorClass: 'text-teal-500'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#FDFBF7] border-b border-[#D4AF37] font-sans" id="why-mahavir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Grid Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 text-left">
            <p className="text-xs text-[#6D1A36] font-bold tracking-[0.35em] uppercase">OUR LEGACY OF INTEGRITY</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] mt-2 font-light italic tracking-widest text-shadow">
              Why Choose Mahavir Jewellers?
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mt-4" />
          </div>
          <div className="lg:col-span-6">
            <p className="text-[#1A1A1A]/70 text-xs sm:text-sm font-light leading-relaxed">
              We do not just trade jewellery; we curate milestones. For over two decades, Mahavir Jewellers has stood as a beacon of high society trust, offering uncompromised gold standards and transparent pricing structures.
            </p>
          </div>
        </div>

        {/* Bento Trust Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {TRUST_REASONS.map((trust, idx) => {
            const IconComponent = trust.icon;
            return (
              <motion.div
                key={trust.id}
                className="bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-none p-6 shadow-md hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between group"
                whileHover={{ y: -6 }}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                
                {/* Visual Ribbon Gilt */}
                <div className="absolute right-0 top-0 h-16 w-16 bg-[#D4AF37]/5 rounded-none border-b border-l border-[#D4AF37]/25 group-hover:bg-[#D4AF37]/10 transition-colors" />

                <div>
                  {/* Icon & Stat Bubble */}
                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <div className="p-3 bg-[#FAF6F0] rounded-none border-2 border-[#D4AF37] text-[#6D1A36] group-hover:rotate-6 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-sans font-bold uppercase bg-[#D4AF37]/10 text-[#6D1A36] px-2.5 py-1 rounded-none border border-[#D4AF37]/35 tracking-widest">
                      {trust.stat}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-light italic text-[#1A1A1A] tracking-wider">
                    {trust.title}
                  </h3>

                  <p className="text-[#1A1A1A]/80 text-xs mt-2.5 leading-relaxed font-light">
                    {trust.description}
                  </p>
                </div>

                {/* Micro checklist confirmation */}
                <div className="mt-5 pt-3.5 border-t border-[#D4AF37]/30 flex items-center gap-1.5 text-[10px] text-[#6D1A36] font-sans font-bold uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5" />
                  <span>100% Guaranteed Purity</span>
                </div>

              </motion.div>
            );
          })}

          {/* Big Signature Stat Highlight Block */}
          <motion.div
            className="bg-[#6D1A36] text-[#FCFBF7] rounded-none p-6 flex flex-col justify-between border-2 border-[#D4AF37] relative overflow-hidden group col-span-1 md:col-span-2 lg:col-span-1 shadow-lg"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {/* Visual background rings */}
            <div className="absolute w-44 h-44 -bottom-10 -right-10 border border-[#D4AF37]/15 rounded-none transform rotate-45" />
            <div className="absolute w-64 h-64 -bottom-16 -right-16 border border-dashed border-[#D4AF37]/25 rounded-none transform rotate-12" />

            <div className="relative z-10 font-sans">
              <span className="text-[9px] text-[#D4AF37] font-sans font-bold uppercase tracking-[0.25em]">CERTIFIED FOOTFALL</span>
              
              <h3 className="text-4xl font-serif font-light italic text-white mt-1">1998</h3>
              
              <p className="text-xs text-sans font-bold text-[#D4AF37] tracking-widest mt-0.5 uppercase">Established Legacy</p>
            </div>

            <div className="my-5 relative z-10 font-sans">
              <p className="text-white/85 text-xs leading-relaxed font-light">
                For nearly three decades, we have maintained a perfect trace of gold exchange value, making us Mumbai&apos;s premium chosen family jeweller.
              </p>
            </div>

            {/* Quick counters bar */}
            <div className="grid grid-cols-2 gap-4 border-t border-[#D4AF37]/30 pt-4 relative z-10 font-sans">
              <div className="text-left font-sans">
                <span className="block text-xl font-serif font-light italic text-[#D4AF37]">45k+</span>
                <span className="text-[9px] text-[#FCFBF7]/65 uppercase font-sans tracking-wider">Happy Families</span>
              </div>
              <div className="text-left border-l border-white/10 pl-4 font-sans">
                <span className="block text-xl font-serif font-light italic text-[#D4AF37]">100%</span>
                <span className="text-[9px] text-[#FCFBF7]/65 uppercase font-sans tracking-wider">HUID Registered</span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
