"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ProductMediaProps {
  images: string[];
  productName: string;
  video?: string;
  aspectRatio?: string; // e.g. "aspect-square", "aspect-[4/5]", "aspect-[16/9]"
  className?: string;
  priority?: boolean;
  activeImageIndex?: number;
  onAngleChange?: (index: number) => void;
  interactive?: boolean; // If true, pauses Ken Burns when user manually selects an angle
}

export default function ProductMedia({
  images,
  productName,
  video,
  aspectRatio = "aspect-square",
  className = "",
  priority = false,
  activeImageIndex,
  onAngleChange,
  interactive = false,
}: ProductMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const kenBurnsImageRef = useRef<HTMLDivElement>(null);

  const [inView, setInView] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [nextIdx, setNextIdx] = useState<number>(1);
  const [isCrossfading, setIsCrossfading] = useState<boolean>(false);

  const safeImages = images && images.length > 0 ? images : ["/products/ivory-pave-gold-1.jpg"];

  // Sync external index if controlled
  useEffect(() => {
    if (activeImageIndex !== undefined && activeImageIndex >= 0 && activeImageIndex < safeImages.length) {
      setCurrentIdx(activeImageIndex);
    }
  }, [activeImageIndex, safeImages.length]);

  // Lazy-load IntersectionObserver for off-screen video / heavy animations
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ken Burns Animation Sequence when no video is provided
  useEffect(() => {
    if (video || !inView) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // If only one image, perform subtle micro-zoom loop
    const imageContainer = kenBurnsImageRef.current;
    if (!imageContainer) return;

    const ctx = gsap.context(() => {
      if (safeImages.length <= 1) {
        gsap.fromTo(
          imageContainer,
          { scale: 1.0 },
          {
            scale: 1.06,
            duration: 6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          }
        );
        return;
      }

      // Multi-image Ken Burns crossfade cycle (every 4.5s)
      const interval = setInterval(() => {
        setIsCrossfading(true);

        const targetNext = (currentIdx + 1) % safeImages.length;
        setNextIdx(targetNext);

        // Animate current image slightly moving out
        gsap.to(imageContainer, {
          scale: 1.08,
          duration: 4.5,
          ease: "sine.out",
        });

        // Crossfade switch
        setTimeout(() => {
          setCurrentIdx(targetNext);
          setIsCrossfading(false);
          if (onAngleChange) onAngleChange(targetNext);

          // Reset scale for incoming image
          gsap.fromTo(
            imageContainer,
            { scale: 1.02 },
            { scale: 1.07, duration: 4.5, ease: "sine.inOut" }
          );
        }, 800);
      }, 4800);

      return () => clearInterval(interval);
    }, containerRef);

    return () => ctx.revert();
  }, [video, inView, safeImages.length, currentIdx, onAngleChange]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectRatio} overflow-hidden bg-obsidian border border-champagne-brass/25 ${className}`}
      data-cursor="explore"
    >
      {/* 1. Real Video Available */}
      {video ? (
        inView ? (
          <video
            ref={videoRef}
            src={video}
            poster={safeImages[0]}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={safeImages[0]}
              alt={productName}
              fill
              priority={priority}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        )
      ) : (
        /* 2. Ken Burns Cinematic Stills Sequence */
        <div className="relative w-full h-full overflow-hidden">
          {/* Active Image with slow Ken Burns pan/zoom */}
          <div
            ref={kenBurnsImageRef}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              isCrossfading ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={safeImages[currentIdx]}
              alt={`${productName} — angle ${currentIdx + 1}`}
              fill
              priority={priority}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Incoming Image for crossfade */}
          {safeImages.length > 1 && (
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isCrossfading ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <Image
                src={safeImages[nextIdx]}
                alt={`${productName} — angle ${nextIdx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          )}

          {/* Cinematic subtle gradient lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-obsidian/20 pointer-events-none" />

          {/* Micro indicator of angle in corner */}
          {safeImages.length > 1 && (
            <div className="absolute bottom-3 left-3 z-10 flex items-center space-x-1 px-2 py-1 bg-obsidian/75 border border-champagne-brass/20 text-[10px] text-champagne-brass font-medium tracking-wider uppercase backdrop-blur-sm pointer-events-none">
              <span>View</span>
              <span>{currentIdx + 1}/{safeImages.length}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
