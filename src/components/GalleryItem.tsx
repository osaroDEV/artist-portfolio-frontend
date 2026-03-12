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
      className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 cursor-none md:cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.2}}
      transition={{duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9]}}
    >
      <Image
        src={urlFor(item.image).width(800).url()}
        alt={item.image.alt || item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-transform duration-1000 ease-out ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        priority={priority}
        placeholder="blur"
        blurDataURL={item.image.asset.metadata.lqip}
      />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.4}}
            className="absolute inset-0 z-10 flex flex-col justify-end p-8 text-white"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100" />

            <div className="relative z-20 space-y-2">
              <motion.h3
                initial={{y: 10, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{delay: 0.1, duration: 0.4}}
                className="text-xl md:text-2xl"
              >
                {item.title}
              </motion.h3>
              
              <motion.div
                initial={{y: 10, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{delay: 0.2, duration: 0.4}}
                className="flex flex-wrap gap-x-4 text-[10px] uppercase tracking-widest opacity-80"
              >
                {item.dimensions && <span>{item.dimensions}</span>}
                {item.year && <span>{item.year}</span>}
                {item.medium && <span>{item.medium}</span>}
              </motion.div>

              {item.description && (
                <motion.div
                  initial={{y: 10, opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{delay: 0.3, duration: 0.4}}
                  className="mt-4 max-w-xs text-xs font-light leading-relaxed opacity-70 line-clamp-3"
                >
                  <PortableText value={item.description} />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
