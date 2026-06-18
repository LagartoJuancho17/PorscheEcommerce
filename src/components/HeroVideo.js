"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

export default function HeroVideo({ poster }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [hasUnmuted, setHasUnmuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.4) {
          // Usuario bajó — mutear
          video.muted = true;
          setMuted(true);
        } else if (hasUnmuted) {
          // Usuario volvió arriba y había clickeado unmute antes — restaurar sonido
          video.muted = false;
          setMuted(false);
        }
      },
      { threshold: [0, 0.4, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasUnmuted]);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !video.muted;
    video.muted = newMuted;
    setMuted(newMuted);
    if (!newMuted) setHasUnmuted(true);
  }

  return (
    <section ref={sectionRef} className="relative h-screen flex items-end">
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/porscheHero.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/25 to-transparent" />
      </div>

      {/* Botón mute/unmute */}
      <button
        onClick={toggleMute}
        className="absolute top-20 right-8 z-20 flex items-center gap-2.5 text-white/50 hover:text-white transition-colors duration-200 group"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">
          {muted ? "Sin sonido" : "Con sonido"}
        </span>
        <span className="w-8 h-8 rounded-full border border-white/30 group-hover:border-white/70 flex items-center justify-center transition-colors duration-200 text-sm">
          {muted ? "🔇" : "🔊"}
        </span>
      </button>

      <div className="relative z-10 px-12 pb-24 max-w-3xl">
        <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase mb-5">
          Ingenieria sin limites
        </p>
        <h1 className="text-white text-6xl font-thin leading-[1.05] mb-8">
          Diseñado para<br />los que conducen
        </h1>
        <Link
          href="/categories"
          className="inline-block border border-white/40 text-white text-[11px] tracking-[0.3em] uppercase px-8 py-3.5 hover:bg-white hover:text-black transition-all duration-300"
        >
          Explorar modelos
        </Link>
      </div>
    </section>
  );
}
