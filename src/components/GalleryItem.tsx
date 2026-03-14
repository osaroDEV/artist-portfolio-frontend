'use client';

import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion';
import {useState} from 'react';
import {GalleryItem as GalleryItemType} from '@/lib/types';
import {urlFor} from '@/lib/sanity';
import {PortableText} from '@portabletext/react';

interface Props {
  item: GalleryItemType;
  priority?: boolean;
}

export default function GalleryItem({item, priority = false}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-col space-y-4 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-brand-cream/50 shadow-sm">
        <motion.div
          animate={{ 
            scale: isHovered ? 1.08 : 1,
            filter: isHovered ? 'brightness(0.7)' : 'brightness(1)'
          }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="w-full h-full relative"
        >
          <Image
            src={urlFor(item.image).width(1200).url()}
            alt={item.image.alt || item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
            placeholder="blur"
            blurDataURL={item.image.asset?.metadata?.lqip}
          />
        </motion.div>

        {/* Premium Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white z-10"
            >
              <div className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-xs transition-all duration-700" />
              
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { 
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 } 
                  },
                  hidden: { 
                    transition: { staggerChildren: 0.05, staggerDirection: -1 } 
                  }
                }}
                className="relative z-20 flex flex-col items-center space-y-4 text-center"
              >
                <motion.div 
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  className="space-y-2"
                >
                  <h3 className="text-xs md:text-sm uppercase tracking-[0.4em] font-light leading-relaxed">
                    {item.title}
                  </h3>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
                    className="h-px w-10 bg-white/40 mx-auto" 
                  />
                </motion.div>

                <motion.div 
                   variants={{
                    hidden: { y: 15, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  className="flex flex-col space-y-2"
                >
                  {item.medium && (
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-extralight text-white/90">
                      {item.medium}
                    </p>
                  )}
                  {item.dimensions && (
                    <p className="text-[9px] md:text-[10px] font-sans tracking-[0.05em] text-white/70 italic">
                      {item.dimensions}
                    </p>
                  )}
                </motion.div>

                {item.year && (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    className="pt-4"
                  >
                    <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 px-3 py-1 border border-white/10 rounded-full">
                      {item.year}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Info (Mobile-friendly / Context) */}
      <div className="flex flex-col items-center text-center space-y-1 py-1">
        <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-brand-charcoal transition-all duration-700 group-hover:text-brand-charcoal/30 group-hover:translate-y-1">
          {item.title}
        </h3>
        {item.year && (
          <span className="text-[9px] uppercase tracking-widest text-brand-charcoal/20 transition-all duration-700 group-hover:opacity-0">
            {item.year}
          </span>
        )}
      </div>
    </motion.div>
  );
}
