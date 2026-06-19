import { useState } from 'react';
import { Instagram, Heart, MessageCircle, X, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INSTA_POSTS = [
  {
    id: 'i1',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    likes: '4,821',
    comments: '240',
    caption: 'Nothing speaks royal heritage like our Empress Emerald bridal choker, perfectly paired with heavy kundan studs. ✨ #MahavirBride #BridalJewellery #LuxuryIndianWedding',
    category: 'Bridal Collection'
  },
  {
    id: 'i2',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    likes: '2,944',
    comments: '110',
    caption: 'Solitaire promises hold infinite brilliance. GIA-certified 2-carat engagement ring of her dreams curated flawlessly in solid platinum. 💍 #SolitaireEngagementRing #SheSaidYes #FineDiamonds',
    category: 'Diamond Collection'
  },
  {
    id: 'i3',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80',
    likes: '1,894',
    comments: '88',
    caption: 'Celebrate auspicious new beginnings with 100% BIS Hallmarked yellow gold kadas, handcrafted with centuries-old die embossed techniques. 🏵️ #PureGold #TraditionalJewellery #Craftsmanship',
    category: 'Gold Collection'
  },
  {
    id: 'i4',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80',
    likes: '3,102',
    comments: '143',
    caption: 'Sophisticated lightweight sterling 92.5 chains and geometric tile bracelets, built with anti-tarnish rhodium shields. Perfect daily accessory. 💫 #SilverJewelry #ModernMinimalism',
    category: 'Silver Collection'
  },
  {
    id: 'i5',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80',
    likes: '2,401',
    comments: '94',
    caption: 'Peacocks and pearls flow harmoniously in our Vedic Gold Jhumkas, styled beautifully for traditional festive ensembles. 🦚🌸 #TempleJewellery #KundanJhumka #HeritageJewels',
    category: 'Gold Collection'
  },
  {
    id: 'i6',
    image: 'https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8da?auto=format&fit=crop&w=600&q=80',
    likes: '1,492',
    comments: '56',
    caption: 'Bold diamond-crest kadas and sovereign signet rings handcrafted in 22K gold, styled exclusively for the modern royal gentleman. 🤵‍♂️👑 #MensJewelry #LuxuryDesign #GoldKada',
    category: "Men's Collection"
  }
];

export default function InstagramGrid() {
  const [activePhoto, setActivePhoto] = useState<typeof INSTA_POSTS[0] | null>(null);

  return (
    <section className="py-20 bg-[#FCFBF7] border-b border-gold/10 font-sans" id="social-instagram">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] text-maroon font-bold tracking-[0.25em] uppercase">SOCIAL EXHIBITION</p>
          <h2 className="text-3xl font-serif text-charcoal tracking-wide mt-2 font-medium">
            Instagram Lookbook
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-charcoal/60 text-xs sm:text-sm mt-3 font-light">
            Tag us at **@MahavirJewellers** during your special showroom purchase or styling reveal to get featured live on our wall.
          </p>
        </div>

        {/* Masonry-Style Feed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {INSTA_POSTS.map((post) => (
            <motion.div
              key={post.id}
              onClick={() => setActivePhoto(post)}
              className="relative aspect-square rounded-xl overflow-hidden shadow-md border border-gold/10 bg-[#FAF6F0] group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={post.image}
                alt="Instagram Lookbook Shot"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover Dark Gold Overlay */}
              <div className="absolute inset-0 bg-maroon/80 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-center items-center text-white space-y-3 p-4 text-center">
                <Instagram className="w-8 h-8 text-gold animate-[spin_10s_linear_infinite]" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-light">
                  {post.category}
                </span>
                
                {/* Likes / Comments counts */}
                <div className="flex items-center space-x-6 text-xs font-semibold pt-1">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-[#FCFBF7]" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 fill-white text-[#FAF6F0]" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <p className="text-[10.5px] leading-tight text-cream/90 line-clamp-2 max-w-xs font-light">
                  {post.caption}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Dynamic Zoom Modal overlay */}
        <AnimatePresence>
          {activePhoto && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/90 flex items-center justify-center p-4">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden border border-gold/20 shadow-2xl relative flex flex-col md:flex-row max-h-[500px]"
              >
                
                {/* Close Button */}
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white p-1.5 rounded-full hover:bg-gold hover:text-black hover:scale-105 transition-all cursor-pointer z-20"
                >
                  <X className="w-4.5 h-4.5" />
                </button>

                {/* Left Side: Photo panel */}
                <div className="md:w-1/2 aspect-square md:aspect-auto bg-black flex items-center justify-center relative">
                  <img
                    src={activePhoto.image}
                    alt="Expanded lookbook item"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Insta brand badge on image corner */}
                  <div className="absolute bottom-3 left-3 bg-black/50 text-[#FCFBF7] p-2 rounded text-xs backdrop-blur-sm flex items-center gap-2 border border-white/5 uppercase tracking-wider font-semibold">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span>@MahavirJewellers</span>
                  </div>
                </div>

                {/* Right Side: Caption commentary and metadata */}
                <div className="md:w-1/2 p-6 text-left flex flex-col justify-between space-y-4 font-sans bg-[#FCFBF7]">
                  <div>
                    <div className="flex justify-between items-center pb-3 border-b border-gold/10">
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-maroon" />
                        <span className="text-[13px] font-bold text-charcoal font-sans">mahavir_jewellers</span>
                      </div>
                      <span className="px-2.5 py-0.5 text-[8.5px] uppercase font-bold tracking-wide bg-gold/15 text-gold-dark rounded border border-gold/25">
                        {activePhoto.category}
                      </span>
                    </div>

                    <p className="text-[12.5px] text-charcoal/80 leading-relaxed font-light mt-4">
                      {activePhoto.caption}
                    </p>
                  </div>

                  {/* Likes and Social Action trigger */}
                  <div className="pt-4 border-t border-gold/10 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-charcoal/50 font-bold uppercase tracking-wider">Social Response</span>
                      <div className="flex gap-3 text-maroon font-bold">
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-gold fill-gold" /> {activePhoto.likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-gold" /> {activePhoto.comments}</span>
                      </div>
                    </div>

                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-[#FCFBF7] text-xs font-bold uppercase tracking-wider rounded shadow flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                    >
                      <Instagram className="w-4 h-4 text-[#gold]" />
                      <span>Follow on Instagram</span>
                    </a>
                  </div>

                </div>

              </motion.div>
              
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
