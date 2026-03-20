import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroVideoScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects based on scroll progress
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textBlur = useTransform(scrollYProgress, [0, 0.3], ["0px", "10px"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video Background */}
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/dr3kq8bpj/video/upload/v1770759142/cafe_proteico_rlh1nk.mp4"
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
          />
          {/* Overlay to darken video slightly for text readability */}
          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black" 
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: textOpacity, filter: `blur(${textBlur})` }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4"
        >
          <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tighter mb-4 drop-shadow-2xl">
            CAFEPROTEICO
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mb-8 tracking-wide">
            Energía líquida sabor café. 25g de proteína. Sin excusas.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <button className="px-8 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all uppercase tracking-widest text-sm">
              Ver Detalles
            </button>
            <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform uppercase tracking-widest text-sm">
              Comprar Ahora
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroVideoScroll;
