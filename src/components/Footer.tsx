import { useState, FormEvent } from 'react';
import { Mail, Instagram, MessageSquare, Phone, MapPin, Sparkles, Check } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBookingModal: () => void;
  setShowAdmin: (show: boolean) => void;
}

export default function Footer({ setActiveTab, onOpenBookingModal, setShowAdmin }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4500);
  };

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    setShowAdmin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-[#FCFBF7] pt-16 pb-8 font-sans border-t-2 border-gold relative overflow-hidden" id="showroom-footer">
      
      {/* Background radial soft light decor for premium highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(215,175,55,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Segment: Brand and Newsletter split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Logo & Narrative */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="font-serif text-2xl lg:text-3xl font-semibold tracking-wider text-[#FCFBF7] flex flex-col leading-none">
              <span className="text-gold tracking-[0.12em] font-medium">MAHAVIR</span>
              <span className="text-[10px] text-cream/70 tracking-[0.4em] mt-1 font-sans font-semibold uppercase">Jewellers</span>
            </div>
            
            <p className="text-xs text-cream/60 max-w-sm font-light leading-relaxed">
              Serving generations of families since 1998 with pure, hallmark-certified gold, syndicate diamonds, and bespoke physical customization blueprints with uncompromised trust.
            </p>

            <div className="flex gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 border border-white/10 hover:border-gold hover:text-gold rounded-full transition-colors bg-white/5">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="p-2 border border-white/10 hover:border-gold hover:text-gold rounded-full transition-colors bg-white/5">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 text-left lg:border-l lg:border-white/10 lg:pl-12 space-y-4">
            <div>
              <span className="text-[9px] text-gold-light mt-0.5 tracking-widest font-bold uppercase block">EXCLUSIVE NOTIFICATIONS</span>
              <h4 className="text-lg font-serif">Subscribe To Circular Lookbooks</h4>
              <p className="text-xs text-cream/50 font-light mt-1 max-w-md">
                Receive invitation passes to newly minted exclusive diamond exhibits, seasonal discounts, and live hallmark gold bullion index metrics.
              </p>
            </div>

            {subscribed ? (
              <div className="p-3 bg-gold/15 text-gold-light border border-gold/30 rounded inline-flex items-center gap-2 text-xs font-semibold">
                <Check className="w-4 h-4" />
                <span>Subscription confirmed! Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Insert secure email address..."
                  className="flex-1 px-4 py-3 bg-white/5 outline-none border border-white/10 focus:border-gold text-xs rounded text-white"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black text-xs font-bold uppercase tracking-wider rounded transition-colors shrink-0 font-sans cursor-pointer"
                >
                  Join Lookbook
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Central Segment: Full navigators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-left text-xs border-b border-white/10 font-sans font-light">
          
          {/* About Column */}
          <div className="space-y-3.5">
            <h5 className="font-serif text-sm font-semibold text-gold tracking-wide">Brand Story</h5>
            <ul className="space-y-2 text-cream/70">
              <li><button onClick={() => handleNav('legacy')} className="hover:text-gold hover:underline cursor-pointer">Our Legacy Story</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-gold hover:underline cursor-pointer">Artisanal Process</button></li>
              <li><button onClick={() => handleNav('legacy')} className="hover:text-gold hover:underline cursor-pointer">Generations of Trust</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-gold hover:underline cursor-pointer">VIP Showroom Lounge</button></li>
            </ul>
          </div>

          {/* Collections Column */}
          <div className="space-y-3.5">
            <h5 className="font-serif text-sm font-semibold text-gold tracking-wide">Jewellery Treasury</h5>
            <ul className="space-y-2 text-cream/70">
              <li><button onClick={() => handleNav('collections')} className="hover:text-gold hover:underline cursor-pointer">Engagement Rings</button></li>
              <li><button onClick={() => handleNav('collections')} className="hover:text-gold hover:underline cursor-pointer">Bridal Necklaces</button></li>
              <li><button onClick={() => handleNav('collections')} className="hover:text-gold hover:underline cursor-pointer">Temple Gold Jhumkas</button></li>
              <li><button onClick={() => handleNav('collections')} className="hover:text-gold hover:underline cursor-pointer">92.5 Sterling Silver</button></li>
              <li><button onClick={() => handleNav('collections')} className="hover:text-gold hover:underline cursor-pointer">24K Laxmi Coins</button></li>
            </ul>
          </div>

          {/* Customer Services Column */}
          <div className="space-y-3.5">
            <h5 className="font-serif text-sm font-semibold text-gold tracking-wide">Boutique Services</h5>
            <ul className="space-y-2 text-cream/70">
              <li><button onClick={() => handleNav('services')} className="hover:text-gold hover:underline cursor-pointer">Custom Designing (CAD)</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-gold hover:underline cursor-pointer">Ultrasonic Stream Cleaning</button></li>
              <li><button onClick={onOpenBookingModal} className="hover:text-gold hover:underline text-left cursor-pointer">Video Consultations</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-gold hover:underline cursor-pointer">Old Gold Exchange Valuation</button></li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-3.5 col-span-2 md:col-span-1">
            <h5 className="font-serif text-sm font-semibold text-gold tracking-wide">Colaba Flagship</h5>
            <p className="text-cream/65 leading-relaxed text-[11.5px]">
              Jewel Heights Complex, Royal Circle Colaba, Colaba Circle, Mumbai, MH - 400001
            </p>
            <div className="pt-1.5 space-y-1 text-[11.5px] text-[#FCFBF7]/60">
              <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gold-light" /> +91 22 2844 9898</p>
              <p className="flex items-center gap-1.5 cursor-pointer" onClick={() => setShowAdmin(true)}><MapPin className="w-3.5 h-3.5 text-gold-light" /> Access Showroom DB Portal</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11.5px] text-cream/40 font-sans tracking-wide">
          <p>© {new Date().getFullYear()} Mahavir Jewellers. All rights reserved.</p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0 font-light text-cream/50">
            <button onClick={() => alert('Mahavir Jewellers guarantees standard privacy policies. Data is persisted locally inside your browser security scope.')} className="hover:text-gold cursor-pointer">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => alert('Every purchase is accompanied by standard printed tax invoices, weight specification lists, and Hallmark HUID stamp guarantees.')} className="hover:text-gold cursor-pointer">Terms &amp; Conditions</button>
            <span>•</span>
            <button onClick={() => setShowAdmin(true)} className="hover:text-gold underline cursor-pointer">Showroom Database Portal</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
