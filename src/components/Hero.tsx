'use client';

import { SanityImage } from '@/lib/types';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface HeroProps {
  image: SanityImage;
  title?: string;
  subtitle?: string;
}

export default function Hero({ image, title, subtitle }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Optional: Subtle parallax effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  if (!image?.asset?.url) return null;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden mb-16 md:mb-24"
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <Image
          src={image.asset.url}
          alt={image.alt || title || 'Hero image'}
          fill
          priority
          sizes="100vw"
          placeholder={image.asset.metadata?.lqip ? "blur" : "empty"}
          blurDataURL={image.asset.metadata?.lqip}
          className="object-cover"
          style={{
            objectPosition: image.hotspot
              ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
              : 'center',
          }}
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity }}
          className="max-w-4xl"
        >
          {title && (
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm md:text-lg uppercase tracking-[0.3em] text-white/80 font-light">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </div>
  );
}
