import { useState, FormEvent } from 'react';
import { Video, Calendar, Clock, Sparkles, MessageSquare, CheckCircle, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { saveStoredBooking } from '../utils';

interface VideoConsultationProps {
  onBookingSuccess: () => void;
}

export default function VideoConsultation({ onBookingSuccess }: VideoConsultationProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [consultType, setConsultType] = useState<'Video Call' | 'In-Showroom'>('Video Call');
  const [notes, setNotes] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const activeErrors: Record<string, string> = {};

    if (!name.trim()) activeErrors.name = 'Full name is required';
    if (!phone.trim()) activeErrors.phone = 'Mobile number is required';
    if (!date) activeErrors.date = 'Appointment date is required';
    if (!time) activeErrors.time = 'Preferred time slot is required';

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    // Save lead to local database
    saveStoredBooking({
      name,
      phone,
      email: email || 'N/A',
      date,
      time,
      consultationType: consultType,
      notes: notes || 'Personal expert video appointment requested'
    });

    setErrors({});
    setSuccess(true);
    
    // Clear inputs
    setName('');
    setPhone('');
    setEmail('');
    setDate('');
    setTime('');
    setNotes('');

    // Trigger parent success updater
    onBookingSuccess();

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <section className="py-20 bg-cream/15 border-b border-gold/10 font-sans" id="video-expert">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Floating Consultation Banner Card */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="flex items-center gap-1.5 text-maroon text-[11px] font-bold tracking-[0.2em] uppercase">
              <Video className="w-4 h-4 text-gold" />
              <span>DIGITAL SHOWCASE LOUNGE</span>
            </div>

            <h2 className="text-3.5xl font-serif text-charcoal tracking-wide leading-tight font-medium">
              Talk To Our Jewellery Expert From Home
            </h2>

            <div className="w-12 h-0.5 bg-gold" />

            <p className="text-charcoal/70 text-xs sm:text-sm leading-relaxed font-light">
              Experience the luxury of our boutique showroom from the comfort of your sanctuary. Book an interactive Video Chat with our personal design curators to view diamonds, custom sketches, and gold ornaments live.
            </p>

            {/* Feature lists */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="p-1 bg-gold/15 text-gold-dark rounded-full mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-charcoal">Flexible 30-Min VIP Slots</h4>
                  <p className="text-[11.5px] text-charcoal/55 font-light">Choose timelines that fit your calendar schedules.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-1 bg-gold/15 text-gold-dark rounded-full mt-0.5">
                  <Smartphone className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-charcoal">High-Definition Visual Streams</h4>
                  <p className="text-[11.5px] text-charcoal/55 font-light">Inspect diamond clarity, cut symmetries, and gold hallmarks under zoom lenses.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-1 bg-gold/15 text-gold-dark rounded-full mt-0.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-charcoal">Direct WhatsApp Enquiries</h4>
                  <p className="text-[11.5px] text-charcoal/55 font-light">Receive copies of pricing calculations, certificates, and video recordings via secure chat.</p>
                </div>
              </div>
            </div>

            {/* Quick stats floating tag */}
            <div className="p-4 border border-dashed border-gold/30 bg-white rounded-xl inline-flex items-center gap-3 shadow-sm">
              <span className="text-2xl">💫</span>
              <div className="font-sans">
                <span className="block text-xs font-bold text-charcoal">100% Complimentary</span>
                <span className="text-[10px] text-charcoal/40 uppercase font-semibold">Zero obligation consultation</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Dynamic Lead Booking Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gold/25 shadow-xl relative">
            <div className="absolute top-0 right-12 bg-gold text-white px-4 py-1 text-[10px] font-sans font-bold uppercase rounded-b">
              Reservation System
            </div>

            <h3 className="text-xl sm:text-2xl font-serif text-charcoal tracking-wide mb-6">
              Schedule Your Booking
            </h3>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-3"
              >
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold font-serif">Consultation Booked!</h4>
                <p className="text-xs max-w-sm mx-auto font-sans leading-relaxed">
                  Congratulations. Your premium lead is securely saved in our **Showroom Enquiries Database**. Our jewellery concierge will contact you on WhatsApp shortly to confirm details.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-charcoal/70 tracking-wider uppercase">Full Name *</label>
                    <input
                      type="text"
                      className="w-full px-4.5 py-3 rounded border border-charcoal/10 focus:border-gold outline-none text-xs transition-colors bg-[#FCFBF7]/30"
                      placeholder="e.g. Priyal Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="text-[10px] text-red-500 font-sans">{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-charcoal/70 tracking-wider uppercase">WhatsApp Connection *</label>
                    <input
                      type="tel"
                      className="w-full px-4.5 py-3 rounded border border-charcoal/10 focus:border-gold outline-none text-xs transition-colors bg-[#FCFBF7]/30"
                      placeholder="e.g. +91 99999 88888"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <span className="text-[10px] text-red-500 font-sans">{errors.phone}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-charcoal/70 tracking-wider uppercase">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4.5 py-3 rounded border border-charcoal/10 focus:border-gold outline-none text-xs transition-colors bg-[#FCFBF7]/30"
                      placeholder="e.g. priyal@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Consultation Medium Selection */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-charcoal/70 tracking-wider uppercase">Consultation Format</label>
                    <div className="flex border border-charcoal/10 rounded overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setConsultType('Video Call')}
                        className={`flex-1 py-3 text-xs font-semibold cursor-pointer transition-colors ${
                          consultType === 'Video Call' ? 'bg-gold text-white font-bold' : 'bg-white text-charcoal/70 hover:bg-cream/40'
                        }`}
                      >
                        Video Consultation
                      </button>
                      <button
                        type="button"
                        onClick={() => setConsultType('In-Showroom')}
                        className={`flex-1 py-3 text-xs font-semibold cursor-pointer transition-colors ${
                          consultType === 'In-Showroom' ? 'bg-gold text-white font-bold' : 'bg-white text-charcoal/70 hover:bg-cream/40'
                        }`}
                      >
                        In-Showroom VIP
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-charcoal/70 tracking-wider uppercase">Preferred Date *</label>
                    <input
                      type="date"
                      className="w-full px-4.5 py-3 rounded border border-charcoal/10 focus:border-gold outline-none text-xs transition-colors bg-[#FCFBF7]/30"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date && <span className="text-[10px] text-red-500 font-sans">{errors.date}</span>}
                  </div>

                  {/* Time Slot choosing */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-charcoal/70 tracking-wider uppercase">Preferred Hour *</label>
                    <select
                      className="w-full px-4.5 py-3 rounded border border-charcoal/10 focus:border-gold outline-none text-xs transition-colors bg-[#FCFBF7]/30"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option value="">Select Time Slot</option>
                      <option value="11:00 AM">11:00 AM - 12:00 PM</option>
                      <option value="1:00 PM">01:00 PM - 02:00 PM</option>
                      <option value="3:00 PM">03:00 PM - 04:00 PM</option>
                      <option value="5:00 PM">05:00 PM - 06:00 PM</option>
                      <option value="7:00 PM">07:00 PM - 08:00 PM</option>
                    </select>
                    {errors.time && <span className="text-[10px] text-red-500 font-sans">{errors.time}</span>}
                  </div>
                </div>

                {/* notes */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-charcoal/70 tracking-wider uppercase">Interested Designs / Note</label>
                  <textarea
                    className="w-full px-4.5 py-2.5 rounded border border-charcoal/10 focus:border-gold outline-none text-xs transition-colors bg-[#FCFBF7]/30 h-20 resize-none"
                    placeholder="e.g. Looking for heavy bridal gold choker set in 22K with fine jhumkas for engagement on Aug 20."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-maroon hover:bg-maroon/90 text-[#FCFBF7] text-xs font-bold uppercase tracking-widest rounded shadow-md hover:shadow-lg transition-all border border-gold/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Schedule Consultation</span>
                </button>

                <p className="text-[10px] text-charcoal/40 text-center uppercase tracking-wider">
                  🔒 Encrypted and confidential lead transmission directly to Showroom database.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
