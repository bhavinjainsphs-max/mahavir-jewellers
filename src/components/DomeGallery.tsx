import React, { useState, useEffect, useRef, PointerEvent } from 'react';
import { motion, useSpring } from 'motion/react';
import { ArrowLeft, ArrowRight, Hand } from 'lucide-react';

interface DomeItem {
  id: string;
  name: string;
  icon: string | React.ReactNode;
  count: number;
}

interface DomeGalleryProps {
  items: DomeItem[];
  minRadius?: number;
  onSelectItem: (itemName: string) => void;
}

export default function DomeGallery({ items, minRadius = 800, onSelectItem }: DomeGalleryProps) {
  const [rotation, setRotation] = useState<number>(0);
  const [radius, setRadius] = useState<number>(minRadius);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startRotation = useRef<number>(0);
  const lastX = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const velocity = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic responsive radius scaling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(Math.min(minRadius, 320));
      } else if (window.innerWidth < 1024) {
        setRadius(Math.min(minRadius, 480));
      } else {
        setRadius(minRadius);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [minRadius]);

  // Smooth rotation using spring
  const springRotation = useSpring(0, {
    stiffness: 85,
    damping: 24,
    mass: 1.2
  });

  // Calculate angle offset per item
  const angleStep = 360 / items.length;

  useEffect(() => {
    springRotation.set(rotation);
  }, [rotation, springRotation]);

  // Inertia decay effect after dragging stops
  const runInertia = () => {
    if (isDragging.current) return;
    if (Math.abs(velocity.current) > 0.05) {
      setRotation(prev => prev + velocity.current);
      velocity.current *= 0.94; // friction
      animationFrameId.current = requestAnimationFrame(runInertia);
    } else {
      velocity.current = 0;
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    startRotation.current = rotation;
    velocity.current = 0;

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - startX.current;
    
    // Convert linear mouse drag to rotational angle degrees (360 degrees map to width of screen)
    const factor = 120 / (containerRef.current?.clientWidth || 800);
    const newRotation = startRotation.current + deltaX * factor;
    setRotation(newRotation);

    // Track instantaneous physics velocity
    const now = Date.now();
    const timeDelta = now - lastTime.current;
    if (timeDelta > 0) {
      const xDelta = e.clientX - lastX.current;
      velocity.current = (xDelta / timeDelta) * 3.5; // scaling boost
    }

    lastX.current = e.clientX;
    lastTime.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }

    // Trigger inertia decay
    animationFrameId.current = requestAnimationFrame(runInertia);
  };

  // Nav buttons
  const rotateLeft = () => {
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    velocity.current = 0;
    setRotation(prev => prev + angleStep);
  };

  const rotateRight = () => {
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    velocity.current = 0;
    setRotation(prev => prev - angleStep);
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div id="dome-gallery-viewport" className="relative w-full overflow-hidden select-none py-10 font-sans">
      
      {/* 3D Container Stage */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing relative"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 35%',
          touchAction: 'none'
        }}
      >
        {/* Curved Dome Cylinder Plate */}
        <motion.div 
          className="absolute w-[220px] h-[280px] flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            rotateY: springRotation,
          }}
        >
          {items.map((item, idx) => {
            const itemAngle = idx * angleStep;

            return (
              <motion.div
                key={item.id}
                onClick={(e) => {
                  // Only click if we didn't perform a heavy drag
                  if (Math.abs(velocity.current) < 0.2) {
                    onSelectItem(item.name);
                  }
                }}
                className="absolute w-[180px] h-[220px] bg-[#FCFAF5] border border-[#D4AF37] rounded-xl flex flex-col justify-between items-center p-6 cursor-pointer text-center backface-hidden group shadow-md transition-all hover:border-maroon/60"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(109, 26, 54, 0.12)',
                  borderColor: '#6D1A36'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Gold Highlight Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-[#6D1A36]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

                {/* Ribbon details inside card */}
                <div className="w-12 h-12 rounded-full bg-[#FCFBF7] border border-gold/40 flex items-center justify-center text-3xl shadow-sm group-hover:bg-[#6D1A36] group-hover:border-[#6D1A36] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6 mt-2 relative z-10">
                  <span>{item.icon}</span>
                </div>

                {/* Label text */}
                <div className="relative z-10 flex flex-col items-center">
                  <h4 className="text-sm font-semibold text-charcoal tracking-wider uppercase group-hover:text-maroon transition-colors">
                    {item.name}
                  </h4>
                  <div className="w-6 h-0.5 bg-gold/50 my-1.5 group-hover:bg-maroon transition-colors" />
                  <p className="text-[10px] text-charcoal/50 italic tracking-wider font-medium font-serif group-hover:text-charcoal/80">
                    {item.count} Designs
                  </p>
                </div>

                {/* Tap to browse indicator */}
                <span className="text-[9px] uppercase tracking-widest text-gold font-bold group-hover:text-maroon transition-colors mt-auto pt-2 block relative z-10">
                  Explore Now
                </span>
                
              </motion.div>
            );
          })}
        </motion.div>

        {/* Ambient Front Lighting Mesh */}
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#FAF6F0] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#FAF6F0] to-transparent pointer-events-none z-10" />
      </div>

      {/* Controller Buttons Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-xl mx-auto px-6 relative z-20 gap-4 -mt-4">
        
        {/* Swipe Help Guide */}
        <div className="flex items-center gap-1.5 text-charcoal/40 text-[10px] uppercase tracking-widest font-semibold">
          <Hand className="w-3.5 h-3.5 animate-pulse" />
          <span>Drag, Swipe, or Click Cards to Navigate</span>
        </div>

        {/* Tactile Arrows controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={rotateLeft}
            aria-label="Rotate Left"
            className="w-10 h-10 border border-[#D4AF37] hover:border-maroon rounded-full flex items-center justify-center bg-[#FCFAF5] text-charcoal hover:bg-[#6D1A36] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <span className="w-8 h-px bg-gold/40" />

          <button
            onClick={rotateRight}
            aria-label="Rotate Right"
            className="w-10 h-10 border border-[#D4AF37] hover:border-maroon rounded-full flex items-center justify-center bg-[#FCFAF5] text-charcoal hover:bg-[#6D1A36] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
