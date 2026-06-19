import { motion } from 'motion/react';

interface BounceCardsProps {
  images: string[];
  className?: string;
  containerWidth?: number | string;
  containerHeight?: number | string;
  stiffness?: number;
  damping?: number;
  mass?: number;
  // transformStyles can be provided to customize individual card states on hover
  // Formats supported: "rotate(deg) translate(x, y)"
  transformStyles?: string[];
  onCardClick?: (index: number) => void;
}

export default function BounceCards({
  images = [],
  className = "",
  containerWidth = "100%",
  containerHeight = 400,
  stiffness = 240,
  damping = 18,
  mass = 1,
  transformStyles = [
    "rotate(-18deg) translate(-190px, 20px)",
    "rotate(-9deg) translate(-95px, -25px)",
    "rotate(3deg) translate(0px, 35px)",
    "rotate(10deg) translate(95px, -20px)",
    "rotate(20deg) translate(200px, 25px)"
  ],
  onCardClick
}: BounceCardsProps) {
  // Helper function to extract individual CSS transforms for Framer Motion properties
  // This allows clean spring layout transitions on primitive variables
  const parseTransform = (transformStr: string) => {
    let rotate = 0;
    let x = 0;
    let y = 0;

    const rotateMatch = transformStr.match(/rotate\(([^)]+)\)/);
    if (rotateMatch) {
      rotate = parseFloat(rotateMatch[1]);
    }

    const translateMatch = transformStr.match(/translate\(([^)]+)\)/);
    if (translateMatch) {
      const parts = translateMatch[1].split(',');
      if (parts.length >= 1) x = parseFloat(parts[0]);
      if (parts.length >= 2) y = parseFloat(parts[1]);
    }

    return { rotate, x, y };
  };

  return (
    <motion.div
      className={`relative flex items-center justify-center overflow-visible select-none ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
      initial="initial"
      whileHover="hover"
    >
      {images.map((imgSrc, index) => {
        // Standard transform values for this specific card
        const transformStr = transformStyles[index % transformStyles.length];
        const { rotate: targetRotate, x: targetX, y: targetY } = parseTransform(transformStr);

        // Pile them smoothly with tiny stacking layout offsets as initial
        const initialRotate = (index - (images.length - 1) / 2) * 3;
        const initialX = (index - (images.length - 1) / 2) * 1.5;
        const initialY = 0;

        return (
          <motion.div
            key={index}
            onClick={() => onCardClick?.(index)}
            className="absolute w-[140px] sm:w-[190px] aspect-[4/5] bg-[#FDFBF7] p-2.5 border-2 border-[#D4AF37] shadow-xl origin-center group flex flex-col justify-between cursor-pointer"
            style={{
              zIndex: index + 10,
            }}
            variants={{
              initial: {
                x: initialX,
                y: initialY,
                rotate: initialRotate,
                scale: 1,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.15)"
              },
              hover: {
                x: targetX,
                y: targetY,
                rotate: targetRotate,
                scale: 1.25,
                boxShadow: "0 30px 50px -12px rgba(109, 26, 54, 0.35), 0 20px 25px -12px rgba(212, 175, 55, 0.25)"
              }
            }}
            transition={{
              type: "spring",
              stiffness: stiffness,
              damping: damping,
              mass: mass,
              delay: index * 0.015 // Tiny trigger sequence for fluid bounce wave
            }}
          >
            <div className="relative w-full h-full overflow-hidden border border-[#D4AF37]/35 bg-stone-100">
              <img
                src={imgSrc}
                alt={`Collection item ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Luxury Vignette Polish Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#6D1A36]/25 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Aesthetic micro signature stamp label */}
            <div className="flex justify-between items-center mt-1.5 px-0.5 text-[8px] font-sans font-bold tracking-widest text-[#6D1A36] uppercase">
              <span>M.J. EST. 1998</span>
              <span className="text-[#AC8A1C]">HUID</span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
