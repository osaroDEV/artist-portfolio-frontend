'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem as GalleryItemType } from '@/lib/types';
import GalleryItem from './GalleryItem';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

interface Props {
  items: GalleryItemType[];
}

export default function GalleryGrid({ items }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const goToNext = useCallback((e?: React.MouseEvent | MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length);
    }
  }, [selectedIndex, items.length]);

  const goToPrevious = useCallback((e?: React.MouseEvent | MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    }
  }, [selectedIndex, items.length]);

  const toggleFullscreen = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!document.fullscreenElement) {
      lightboxRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  // Sync fullscreen state
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'f':
          toggleFullscreen();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, goToNext, goToPrevious, toggleFullscreen]);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
        {items.map((item, index) => (
          <div key={item._id} onClick={() => setSelectedIndex(index)} className="cursor-pointer group">
            <GalleryItem item={item} priority={index < 4} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && selectedItem && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-white p-4 md:p-12 select-none"
            onClick={closeLightbox}
          >
            {/* Navigation Buttons - Desktop Overlay */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 hidden md:flex justify-between px-8 z-20 pointer-events-none">
              <button
                onClick={goToPrevious}
                className="pointer-events-auto p-4 text-brand-charcoal/40 hover:text-brand-charcoal transition-all hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft size={48} strokeWidth={1} />
              </button>
              <button
                onClick={goToNext}
                className="pointer-events-auto p-4 text-brand-charcoal/40 hover:text-brand-charcoal transition-all hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight size={48} strokeWidth={1} />
              </button>
            </div>

            {/* Top Controls */}
            <div className="absolute top-6 right-6 flex items-center space-x-6 z-30">
              <button
                className="text-brand-charcoal/60 hover:text-brand-charcoal transition-colors"
                onClick={toggleFullscreen}
                title="Toggle Fullscreen (F)"
              >
                {isFullscreen ? <Minimize2 size={24} strokeWidth={1} /> : <Maximize2 size={24} strokeWidth={1} />}
              </button>
              <button
                className="text-brand-charcoal/60 hover:text-brand-charcoal transition-colors"
                onClick={closeLightbox}
                title="Close (Esc)"
              >
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            <motion.div
              layoutId={selectedItem._id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full h-full flex flex-col justify-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 w-full min-h-0">
                <Image
                  key={selectedItem._id} // Force re-render for transition
                  src={urlFor(selectedItem.image).width(2000).url()}
                  alt={selectedItem.image.alt || selectedItem.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Mobile Navigation / Controls */}
              <div className="md:hidden flex justify-center space-x-12 py-2">
                <button onClick={goToPrevious} className="text-brand-charcoal/60 p-2"><ChevronLeft size={32} /></button>
                <button onClick={goToNext} className="text-brand-charcoal/60 p-2"><ChevronRight size={32} /></button>
              </div>

              {/* Caption Bar */}
              <div className="bg-white p-4 md:p-6 flex justify-between items-center text-brand-charcoal border-t border-brand-charcoal/5">
                <div className="flex flex-col md:flex-row md:items-center gap-x-6 gap-y-1">
                   <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 md:mb-0">
                    {selectedIndex + 1} / {items.length}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm font-light">
                    <span className="font-medium tracking-wide uppercase text-[11px]">{selectedItem.title}</span>
                    {selectedItem.year && <span className="opacity-60">{selectedItem.year}</span>}
                    {selectedItem.medium && <span className="opacity-60">{selectedItem.medium}</span>}
                    {selectedItem.dimensions && <span className="opacity-60">{selectedItem.dimensions}</span>}
                  </div>
                </div>
                
                <div className="hidden md:flex items-center space-x-4">
                   <button onClick={goToPrevious} className="hover:text-brand-charcoal text-brand-charcoal/40 transition-colors pointer-events-auto"><ChevronLeft size={20} /></button>
                   <button onClick={goToNext} className="hover:text-brand-charcoal text-brand-charcoal/40 transition-colors pointer-events-auto"><ChevronRight size={20} /></button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
