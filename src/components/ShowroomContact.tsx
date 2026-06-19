import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, MessageSquare, CheckCircle, Navigation, Award, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { saveStoredEnquiry } from '../utils';

interface ShowroomContactProps {
  onEnquirySuccess: () => void;
  onBookClick: () => void;
}

export default function ShowroomContact({ onEnquirySuccess, onBookClick }: ShowroomContactProps) {
  // Contact Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !msg.trim()) {
      setErr('Please fill out all required fields marked with *');
      return;
    }

    // Save lead to local db
    saveStoredEnquiry({
      name,
      phone,
      email: email || 'N/A',
      message: msg,
      itemTitle: 'General Showroom Enquiry',
      itemCategory: 'General'
    });

    setErr('');
    setSuccess(true);
    setName('');
    setPhone('');
    setEmail('');
    setMsg('');

    onEnquirySuccess();

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div className="font-sans relative">
      
      {/* 1. ABOUT MAHAVIR JEWELLERS (Section 12) */}
      <section className="py-20 bg-[#FDFBF7] border-b border-[#D4AF37]" id="showroom-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Beautiful double framed legacy photo collage */}
            <div className="lg:col-span-5 relative h-[360px] sm:h-[450px]">
              
              {/* Gold frame box back */}
              <div className="absolute w-[80%] h-[85%] border-2 border-[#D4AF37] rounded-none left-2 top-2 pointer-events-none z-10" />
              
              {/* Primary Image: Store lounge/craftsmanship process */}
              <div className="absolute w-[83%] h-[84%] rounded-none overflow-hidden shadow-2xl left-6 top-6 z-20 border-2 border-[#D4AF37]">
                <img
                  src="https://images.unsplash.com/photo-1569054011377-67d78a84620f?auto=format&fit=crop&w=800&q=80"
                  alt="Mahavir Jewellers VIP Lounge"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Secondary Overlapping Image: Crafting/Blueprints */}
              <div className="absolute w-[180px] h-[180px] rounded-none border-2 border-[#D4AF37] shadow-xl right-2 bottom-2 z-35 overflow-hidden hidden sm:block bg-[#FDFBF7] p-1">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80"
                  alt="Jewellery sketching illustration"
                  className="w-full h-full object-cover rounded-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating years stamp */}
              <div className="absolute top-[35%] right-6 bg-[#6D1A36] text-[#FCFBF7] p-3 rounded-none shadow-lg border border-[#D4AF37]/35 z-30 max-w-[85px] text-center">
                <span className="block text-xl font-bold font-serif leading-none text-gold">28+</span>
                <span className="text-[8px] uppercase tracking-wider">Years of Trust</span>
              </div>
            </div>

            {/* Right: Narrative legacy */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="flex items-center gap-1.5 text-[#6D1A36] text-[11px] font-bold tracking-[0.25em] uppercase">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>ESTABLISHED IN 1998</span>
              </div>

              <h2 className="text-3.5xl font-serif text-[#1A1A1A] tracking-wider leading-tight font-light italic">
                Our Brand Legacy &amp; Heritage
              </h2>

              <div className="w-12 h-0.5 bg-[#D4AF37]" />

              <p className="text-[#1A1A1A]/85 text-xs sm:text-sm leading-relaxed font-light">
                Mahavir Jewellers was forged under a unified, uncompromised promise: **Absolute Purity, Flawless Craftsmanship, and Lifetime Trust**. For over 28 years, our luxury boutique showroom has crafted custom bridal necklaces, certified diamond solitaires, and investment bullion gold coins for thousands of happy families in South Mumbai.
              </p>

              <p className="text-[#1A1A1A]/75 text-xs sm:text-sm leading-relaxed font-light">
                Every customized necklace, kada, or pair of jhumkas is modeled under premium 3D CAD modeling before casting, ensuring that every curve is stable and comfortable. We trace gold bullion pricing, giving you transparent rates and 100% buyback guarantee sheets with printed tax details.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <span className="p-1 px-2.5 bg-[#D4AF37]/15 text-[#6D1A36] border border-[#D4AF37]/30 rounded-none text-xs font-bold">✓</span>
                  <span className="text-xs sm:text-sm font-serif text-[#1A1A1A]">BIS Hallmarked HUID Gold</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="p-1 px-2.5 bg-[#D4AF37]/15 text-[#6D1A36] border border-[#D4AF37]/30 rounded-none text-xs font-bold">✓</span>
                  <span className="text-xs sm:text-sm font-serif text-[#1A1A1A]">GIA/IGI Conflict-Free Diamonds</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="p-1 px-2.5 bg-[#D4AF37]/15 text-[#6D1A36] border border-[#D4AF37]/30 rounded-none text-xs font-bold">✓</span>
                  <span className="text-xs sm:text-sm font-serif text-[#1A1A1A]">Transparent Weight Calculation</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="p-1 px-2.5 bg-[#D4AF37]/15 text-[#6D1A36] border border-[#D4AF37]/30 rounded-none text-xs font-bold">✓</span>
                  <span className="text-xs sm:text-sm font-serif text-[#1A1A1A]">100% Lifetime Buyback Policy</span>
                </div>
              </div>

              {/* Core values block */}
              <blockquote className="border-l-4 border-[#D4AF37] bg-[#FAF6F0] p-4 rounded-none italic text-xs text-[#1A1A1A]/85 leading-relaxed font-serif">
                &ldquo;Fine jewellery is not merely stored in vaults; it holds the laughter, vows, and milestones of our lives. We curate those promises with pure, uncompromised, hallmarked precious metals.&rdquo;
                <cite className="block font-sans not-italic text-[10px] font-bold text-[#AC8A1C] uppercase tracking-[0.15em] mt-1.5">— Curators, Mahavir Jewellers</cite>
              </blockquote>
            </div>

          </div>

        </div>
      </section>

      {/* 2. STORE VISIT CALL-TO-ACTION (Section 11) */}
      <section className="bg-[#6D1A36] py-12 border-t border-b border-[#D4AF37] text-white relative overflow-hidden animate-fade-in" id="showroom-cta">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.15),transparent_40%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="text-center lg:text-left space-y-1">
            <span className="text-[10px] text-gold font-sans font-bold tracking-[0.25em] uppercase">VIP SHOWROOM INVITATION</span>
            <h3 className="text-2.5xl font-serif text-[#FDFBF7] font-light italic">Visit Mahavir Jewellers Showroom</h3>
            <p className="text-xs text-[#FDFBF7]/85 max-w-xl font-light">
              Walk-in or schedule a personal VIP visit. See our expansive collections, talk live with design curators, and test old gold worth live.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-[#D4AF37] text-black rounded-none text-xs font-sans font-bold uppercase tracking-[0.16em] shadow hover:bg-transparent hover:text-[#FDFBF7] hover:border-[#D4AF37] border border-[#D4AF37] transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>

            <button
              onClick={onBookClick}
              className="px-6 py-3.5 bg-transparent hover:bg-[#D4AF37]/20 text-[#FCFBF7] border border-[#D4AF37] hover:border-[#D4AF37] rounded-none text-xs font-sans font-bold uppercase tracking-[0.16em] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Book Appointment</span>
            </button>

            <a
              href="https://wa.me/919999999999?text=Hi! I am calling to discuss customized jewelry specifications."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 text-[#FCFBF7] border border-white/20 rounded-none text-xs font-sans font-semibold uppercase tracking-[0.16em] transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. CONTACT US & ENQUIRIES FORM (Section 13) */}
      <section className="py-20 bg-[#FDFBF7]" id="showroom-contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Address, Hours, WhatsApp contact cards */}
            <div className="lg:col-span-5 text-left space-y-6">
              
              <div>
                <p className="text-xs text-[#6D1A36] font-bold tracking-[0.3em] uppercase">DIRECT CONCIERGE</p>
                <h2 className="text-3xl font-serif text-[#1A1A1A] tracking-wider mt-2 font-light italic">Showroom Details</h2>
                <div className="w-12 h-0.5 bg-[#D4AF37] mt-4" />
              </div>

              <div className="space-y-4">
                
                {/* Physical Location */}
                <div className="border-2 border-[#D4AF37] bg-[#FDFBF7] p-5 rounded-none flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
                  <span className="p-3 bg-[#D4AF37]/10 text-[#6D1A36] rounded-none border border-[#D4AF37]/25">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div className="font-sans">
                    <h4 className="text-sm font-serif font-light italic text-[#1A1A1A] leading-none">VIP Flagship Store</h4>
                    <p className="text-xs text-[#1A1A1A]/75 mt-1.5 leading-relaxed font-light">
                      Mahavir Jewellers, Jewel Heights Complex,<br />
                      Opp. Central Library, Royal Circle, Colaba,<br />
                      Mumbai, Maharashtra - 400001
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="border-2 border-[#D4AF37] bg-[#FDFBF7] p-5 rounded-none flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
                  <span className="p-3 bg-[#D4AF37]/10 text-[#6D1A36] rounded-none border border-[#D4AF37]/25">
                    <Clock className="w-5 h-5" />
                  </span>
                  <div className="font-sans">
                    <h4 className="text-sm font-serif font-light italic text-[#1A1A1A] leading-none">Store Opening Hours</h4>
                    <p className="text-xs text-[#1A1A1A]/75 mt-1.5 leading-relaxed font-light font-sans">
                      Mon - Sun: 10:30 AM to 08:30 PM<br />
                      <span className="text-[#AC8A1C] font-semibold">Open on Holidays (Festival Specials)</span>
                    </p>
                  </div>
                </div>

                {/* Telephone, Email */}
                <div className="border-2 border-[#D4AF37] bg-[#FDFBF7] p-5 rounded-none flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
                  <span className="p-3 bg-[#D4AF37]/10 text-[#6D1A36] rounded-none border border-[#D4AF37]/25">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div className="font-sans">
                    <h4 className="text-sm font-serif font-light italic text-[#1A1A1A] leading-none">Phone &amp; Email Contact</h4>
                    <p className="text-xs text-[#1A1A1A]/75 mt-1.5 leading-relaxed font-light">
                      Showroom Landline: +91 22 2844 9898<br />
                      Mobile/WhatsApp Enquiries: +91 99999 88888<br />
                      Customer Care Email: concierge@mahavirjewellers.com
                    </p>
                  </div>
                </div>

              </div>

              {/* Integrated custom mockup Map Design */}
              <div className="border-2 border-[#D4AF37] rounded-none overflow-hidden shadow-md h-[180px] bg-slate-100 relative group">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Embedded Map style illustration */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                  <MapPin className="w-8 h-8 text-[#6D1A36] animate-bounce" />
                  <span className="text-xs font-serif font-bold text-charcoal tracking-wide mt-2"> Colaba Flagship Showroom Map</span>
                  <span className="text-[10px] text-charcoal/40 font-semibold uppercase mt-0.5">Opposite Central Library complex</span>
                  
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3.5 px-4.5 py-2.5 bg-[#6D1A36] text-[#FCFBF7] text-[10px] font-sans font-bold uppercase rounded-none shadow hover:bg-transparent hover:text-[#6D1A36] hover:border-[#6D1A36] border border-[#6D1A36] transition-all tracking-wider"
                  >
                    Launch Live Google Map
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: High-Polished lead capture Enquiry form */}
            <div className="lg:col-span-7 bg-[#FDFBF7] p-6 sm:p-8 rounded-none border-2 border-[#D4AF37] shadow-xl text-left relative">
              <div className="absolute top-0 right-14 bg-[#6D1A36] text-[#FDFBF7] px-4 py-1 text-[10px] font-bold uppercase font-sans tracking-widest rounded-none border-b border-l border-[#D4AF37]">
                24/7 Digital Desk
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] tracking-wider mb-2 font-light italic">Send Us An Enquiry</h3>
              <p className="text-xs font-sans text-charcoal/50 uppercase tracking-widest font-semibold mb-6">Store requests and customized estimate enquiries</p>

              {success ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold font-serif">Enquiry Sent Successfully!</h4>
                  <p className="text-xs max-w-sm mx-auto font-sans leading-relaxed">
                    Thank you. Your customer details and custom specifications are securely stored in the showroom database. Our concierge team is reviewing current exchange variables and will message you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#6D1A36]/80">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-[#FAF6F0]/45 border border-[#D4AF37] rounded-none outline-none focus:border-[#6D1A36] focus:ring-1 focus:ring-[#6D1A36] text-xs transition-colors"
                        placeholder="e.g. Priyal Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#6D1A36]/80">WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 bg-[#FAF6F0]/45 border border-[#D4AF37] rounded-none outline-none focus:border-[#6D1A36] focus:ring-1 focus:ring-[#6D1A36] text-xs transition-colors"
                        placeholder="e.g. +91 99999 88888"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#6D1A36]/80">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-[#FAF6F0]/45 border border-[#D4AF37] rounded-none outline-none focus:border-[#6D1A36] focus:ring-1 focus:ring-[#6D1A36] text-xs transition-colors"
                      placeholder="e.g. priyal@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#6D1A36]/80">Message / Inquired Item &amp; Custom Blueprints *</label>
                    <textarea
                      required
                      className="w-full px-4 py-2.5 bg-[#FAF6F0]/45 border border-[#D4AF37] rounded-none outline-none h-28 resize-none focus:border-[#6D1A36] focus:ring-1 focus:ring-[#6D1A36] text-xs transition-all"
                      placeholder="Please note down specific gold purity, weight preferences, diamond size range, or general enquiries (e.g. Can you copy this ring design from photograph?)..."
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                    />
                  </div>

                  {err && <p className="text-red-500 text-xs text-left">{err}</p>}

                  {/* Action */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#6D1A36] hover:bg-[#FAF6F0] text-[#FDFBF7] hover:text-[#6D1A36] text-xs font-sans font-bold uppercase tracking-[0.2em] rounded-none transition-all border-2 border-[#D4AF37] shadow hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-gold" />
                    <span>Send Secure Enquiry</span>
                  </button>

                  <p className="text-[10.5px] text-charcoal/50 text-center font-semibold">
                    🔒 All details are transmitted under encrypted SSL and strictly stored inside our showroom lead manager database.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
