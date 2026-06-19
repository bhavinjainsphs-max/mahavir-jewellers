import { useState, useEffect, FormEvent } from 'react';
import { Search, Eye, Sparkles, MessageSquare, ShieldAlert, CheckCircle, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { JewelleryItem } from '../types';
import { JEWELLERY_ITEMS } from '../data';
import { saveStoredEnquiry } from '../utils';

interface GalleryProps {
  preSelectedCollectionId?: string;
  preSelectedCategoryName?: string;
  onEnquirySuccess: () => void;
}

export default function Gallery({
  preSelectedCollectionId,
  preSelectedCategoryName,
  onEnquirySuccess,
}: GalleryProps) {
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal State
  const [selectedItem, setSelectedItem] = useState<JewelleryItem | null>(null);
  
  // Enquiry form inside Modal state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryMsg, setEnquiryMsg] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Handle external deep links (e.g. from hero explore or category grid clicks)
  useEffect(() => {
    if (preSelectedCollectionId) {
      if (preSelectedCollectionId === 'bridal') setSelectedCollection('Bridal Jewellery');
      if (preSelectedCollectionId === 'diamond') setSelectedCollection('Diamond Collection');
      if (preSelectedCollectionId === 'gold') setSelectedCollection('Gold Collection');
      if (preSelectedCollectionId === 'silver') setSelectedCollection('Silver Jewellery Collection');
      if (preSelectedCollectionId === 'mens-jewellery') setSelectedCollection("Men's Collection");
    }
  }, [preSelectedCollectionId]);

  useEffect(() => {
    if (preSelectedCategoryName) {
      setSelectedCategory(preSelectedCategoryName);
    }
  }, [preSelectedCategoryName]);

  const collectionsList = ['All', 'Bridal Jewellery', 'Diamond Collection', 'Gold Collection', 'Silver Jewellery Collection', "Men's Collection"];
  const categoriesList = ['All', 'Rings', 'Earrings', 'Necklaces', 'Mangalsutra', 'Pendants', 'Bangles', 'Bracelets', 'Gold Coins', 'Nose Pins', 'Anklets'];

  // Filter Logic
  const filteredItems = JEWELLERY_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCollection = selectedCollection === 'All' || item.collection === selectedCollection;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    return matchesSearch && matchesCollection && matchesCategory;
  });

  const handleEnquirySubmit = (e: FormEvent, item: JewelleryItem) => {
    e.preventDefault();
    if (!enquiryName.trim() || !enquiryPhone.trim()) {
      setFormError('Please fill name and WhatsApp number.');
      return;
    }

    // Save Lead to database
    saveStoredEnquiry({
      name: enquiryName,
      phone: enquiryPhone,
      email: enquiryEmail || 'N/A',
      message: enquiryMsg || `Interested in inquiring about ${item.name}`,
      itemTitle: item.name,
      itemCategory: item.category
    });

    setFormError('');
    setFormSuccess(true);
    setEnquiryName('');
    setEnquiryPhone('');
    setEnquiryEmail('');
    setEnquiryMsg('');

    onEnquirySuccess();

    setTimeout(() => {
      setFormSuccess(false);
      setSelectedItem(null); // Close modal on success
    }, 4000);
  };

  const handleWhatsAppInstant = (item: JewelleryItem) => {
    const text = `Hi Mahavir Jewellers! I am browsing your stunning website and would like to receive live pricing estimates for "${item.name}" (SKU: ${item.sku}, Purity: ${item.purity || 'Standard'}). Please guide me.`;
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/919999999999?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section className="py-20 bg-cream/10 border-b border-gold/10 font-sans" id="premium-gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs text-maroon font-bold tracking-[0.25em] uppercase">MAHAVIR ROYAL EXHIBITS</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-charcoal tracking-wide mt-2 font-medium">
            Fine Jewellery Showcase
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-charcoal/60 text-xs sm:text-sm mt-3 font-light">
            Search our curated treasury of certified gold, platinum, and diamonds. Filter by category, metal quality, or search by specific SKU/Keyword.
          </p>
        </div>

        {/* Filter Panel Layout */}
        <div className="bg-white/80 p-6 rounded-2xl border border-gold/20 shadow-md mb-8 flex flex-col space-y-4">
          
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 w-4.5 h-4.5" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3.5 bg-[#FAF6F0]/40 border border-charcoal/10 rounded-lg text-xs outline-none focus:border-gold transition-all"
              placeholder="Search by ring, diamond size, emerald choker, or style SKU (e.g., MJ-R-0128)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-charcoal/30 hover:text-charcoal"
              >
                Clear
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Collection Filter */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] uppercase font-bold tracking-[0.22em] text-[#1A1A1A]/50">Filter Collection</label>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {collectionsList.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedCollection(col)}
                    className={`px-3 py-1.5 text-[11px] font-sans font-semibold rounded-none cursor-pointer tracking-wider uppercase transition-all ${
                      selectedCollection === col
                        ? 'bg-[#D4AF37] text-black font-bold border border-[#D4AF37]'
                        : 'bg-[#FDFBF7] border border-[#D4AF37]/35 text-[#1A1A1A]/70 hover:border-[#D4AF37] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    {col === 'All' ? 'All Luxury Series' : col.replace(' Collection', '').replace(' Jewellery', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter dropdown */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] uppercase font-bold tracking-[0.22em] text-[#1A1A1A]/50 font-sans">Filter Category</label>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {categoriesList.slice(0, 7).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-[11px] font-sans font-semibold rounded-none cursor-pointer tracking-wider uppercase transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#6D1A36] text-[#FDFBF7] font-bold border border-[#6D1A36]'
                        : 'bg-[#FDFBF7] border border-[#D4AF37]/35 text-[#1A1A1A]/70 hover:border-[#D4AF37] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    {cat === 'All' ? 'All Ornaments' : cat}
                  </button>
                ))}
                {/* Additional Category selector dropdown */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 text-[11px] font-sans font-semibold rounded-none bg-[#FDFBF7] border border-[#D4AF37]/45 text-[#1A1A1A]/70 outline-none hover:bg-white uppercase tracking-wider"
                >
                  <option value="All">More Ornaments...</option>
                  {categoriesList.slice(7).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Reset Helpers */}
        {(searchTerm || selectedCollection !== 'All' || selectedCategory !== 'All') && (
          <div className="flex justify-between items-center bg-cream/20 px-4 py-2 border border-gold/10 rounded-lg mb-6 text-xs text-charcoal/60">
            <span>Filtering showing **{filteredItems.length}** premium designs</span>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCollection('All');
                setSelectedCategory('All');
              }}
              className="text-[#AC8A1C] hover:text-[#D4AF37] font-bold underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Gallery Grid of items */}
        {filteredItems.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-2xl border border-gold/10 text-charcoal/50">
            <ShieldAlert className="w-10 h-10 text-gold-dark mx-auto mb-3" />
            <p className="font-serif">No direct matches found inside showroom catalog.</p>
            <p className="text-xs font-light mt-1 text-charcoal/40">Try searching broad terms like &quot;Ring&quot; or &quot;Golden Choker&quot;.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-none overflow-hidden shadow hover:shadow-xl transition-all group flex flex-col justify-between"
                whileHover={{ y: -6 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (index % 4) * 0.04 }}
              >
                
                {/* Product Image */}
                <div className="h-[240px] overflow-hidden relative bg-[#FAF6F0]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-black/20 z-10 animate-fade-in">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="px-4 py-2 bg-[#FDFBF7] text-[#1A1A1A] border-2 border-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.15em] rounded-none shadow-md flex items-center gap-1.5 hover:bg-[#6D1A36] hover:text-white hover:border-[#6D1A36] transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#D4AF37]" />
                      <span>View Details</span>
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 text-left">
                    {item.trending && (
                      <span className="bg-[#D4AF37] text-black text-[8px] font-sans font-black uppercase px-2 py-0.5 rounded-none shadow tracking-wider">
                        ★ Trending
                      </span>
                    )}
                    {item.featured && (
                      <span className="bg-[#6D1A36] text-[#FCFBF7] text-[8px] font-sans font-bold uppercase px-2 py-0.5 rounded-none shadow tracking-wider border border-[#D4AF37]/35">
                        VIP Exclusive
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-[#D4AF37] text-[9px] font-sans font-semibold px-2.5 py-0.5 rounded-none border border-white/10 uppercase tracking-wider">
                    {item.sku}
                  </span>
                </div>

                {/* Info block */}
                <div className="p-4 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] text-[#6D1A36] font-bold tracking-[0.25em] uppercase font-sans">
                      {item.collection.replace(' Collection', '')}
                    </span>
                    <h3 className="font-serif font-light italic text-[#1A1A1A] text-[15px] mt-1.5 tracking-wider leading-tight group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-[#1A1A1A]/50 italic mt-1 font-semibold">{item.purity}</p>
                    <p className="text-[11.5px] text-[#1A1A1A]/75 font-light mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Multi-action footer buttons */}
                  <div className="mt-4 pt-4.5 border-t border-[#D4AF37] flex gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex-1 py-2 text-center text-[10px] border border-[#D4AF37] bg-transparent text-[#1A1A1A] hover:bg-[#6D1A36] hover:text-[#FDFBF7] font-bold uppercase tracking-[0.16em] rounded-none cursor-pointer transition-all"
                    >
                      Enquire Info
                    </button>
                    <button
                      onClick={() => handleWhatsAppInstant(item)}
                      className="flex-1 py-2 bg-[#6D1A36] text-[#FDFBF7] text-[10px] font-bold uppercase tracking-[0.16em] rounded-none flex items-center justify-center gap-1 cursor-pointer border border-[#6D1A36] hover:bg-transparent hover:text-[#6D1A36] hover:border-[#D4AF37] transition-all"
                    >
                      <MessageSquare className="w-3 h-3 text-[#D4AF37]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Collection Detail Booklet Modal as requested by PRD */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              className="bg-[#FCFBF7] max-w-4xl w-full rounded-2xl overflow-hidden border border-gold shadow-2xl relative flex flex-col md:flex-row min-h-[500px]"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black/60 text-white p-1.5 rounded-full hover:bg-gold hover:text-black hover:scale-105 transition-all cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Modal Left: Product Closeup Gallery with luxury details */}
              <div className="md:w-1/2 bg-[#FAF6F0] p-6 flex flex-col justify-center items-center relative border-b md:border-b-0 md:border-r border-gold/15">
                <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md border border-gold/10 bg-white">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* SKU references and authenticity stamp */}
                <div className="mt-5 text-center w-full">
                  <div className="flex justify-center gap-3 text-[10px] font-sans uppercase font-bold text-charcoal/50">
                    <span>SKU: {selectedItem.sku}</span>
                    <span>•</span>
                    <span>Metal: {selectedItem.purity}</span>
                  </div>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase mt-2">
                    ✓ BIS 916 Hallmark Stamp Tested
                  </p>
                </div>
              </div>

              {/* Modal Right: Detailed description and enquiry form triggers */}
              <div className="md:w-1/2 p-6 sm:p-8 text-left flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] text-maroon font-black tracking-widest uppercase font-sans">
                    {selectedItem.collection}
                  </span>
                  <h3 className="text-2xl font-serif font-semibold text-charcoal tracking-wide mt-1 leading-tight">
                    {selectedItem.name}
                  </h3>
                  <p className="text-[10px] text-gold-dark font-sans tracking-wide font-black uppercase mt-1">
                    Authentic Royal Ornaments
                  </p>
                  
                  <p className="text-xs text-charcoal/70 leading-relaxed font-light mt-4">
                    {selectedItem.description}
                  </p>

                  {/* Micro list features */}
                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-b border-gold/10 py-3 text-[11px] font-sans">
                    <div className="flex items-center gap-1 text-charcoal/70">
                      <span className="text-gold">★</span>
                      <span>Lifetime Exchange</span>
                    </div>
                    <div className="flex items-center gap-1 text-charcoal/70">
                      <span className="text-gold">★</span>
                      <span>GIA Certificated</span>
                    </div>
                    <div className="flex items-center gap-1 text-charcoal/70">
                      <span className="text-gold">★</span>
                      <span>10-Day Adjustment</span>
                    </div>
                    <div className="flex items-center gap-1 text-charcoal/70">
                      <span className="text-gold">★</span>
                      <span>Custom Sizing Free</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Enquiry Forms */}
                <div>
                  {formSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded text-center text-xs font-sans">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                      <span>Enquiry submitted. Saved in our Showroom Leads Database!</span>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleEnquirySubmit(e, selectedItem)} className="space-y-3 pt-2">
                      <h4 className="text-[10.5px] uppercase font-bold text-charcoal/60 tracking-wider">Showroom Enquiry Form</h4>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          className="px-3 py-2 bg-white border border-charcoal/15 text-xs outline-none focus:border-gold rounded"
                          placeholder="Your Name *"
                          value={enquiryName}
                          onChange={(e) => setEnquiryName(e.target.value)}
                        />
                        <input
                          type="tel"
                          required
                          className="px-3 py-2 bg-white border border-charcoal/15 text-xs outline-none focus:border-gold rounded"
                          placeholder="WhatsApp Phone *"
                          value={enquiryPhone}
                          onChange={(e) => setEnquiryPhone(e.target.value)}
                        />
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="email"
                          className="flex-1 px-3 py-2 bg-white border border-charcoal/15 text-xs outline-none focus:border-gold rounded"
                          placeholder="Email Address"
                          value={enquiryEmail}
                          onChange={(e) => setEnquiryEmail(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-maroon text-[#FCFBF7] text-[11px] font-sans font-bold uppercase rounded hover:bg-maroon/90 shadow transition-colors cursor-pointer"
                        >
                          Send Form
                        </button>
                      </div>

                      {formError && <p className="text-[10px] text-red-500">{formError}</p>}
                    </form>
                  )}

                  {/* Instant Whatsapp Trigger button */}
                  <div className="mt-4">
                    <p className="text-[10px] text-charcoal/40 text-center uppercase tracking-widest mb-1.5">- Or instant consultation -</p>
                    <button
                      onClick={() => handleWhatsAppInstant(selectedItem)}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-[#FCFBF7] font-semibold text-xs uppercase tracking-wider rounded shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-gold" />
                      <span>Instant Chat on WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>
              
            </motion.div>
            
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
