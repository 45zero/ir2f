"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Hoverable } from "@/components/ui/Hoverable"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { HeroSlideData } from "@/lib/home"

const AUTOPLAY_MS = 6500

const TRANSITION_ANIMATIONS = {
  FADE: "ir2fFadeIn",
  SLIDE_GAUCHE: "ir2fSlideInLeft",
  SLIDE_DROITE: "ir2fSlideInRight",
} as const

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "")
  const r = parseInt(clean.slice(0, 2) || "0a", 16)
  const g = parseInt(clean.slice(2, 4) || "16", 16)
  const b = parseInt(clean.slice(4, 6) || "2e", 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function getYoutubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1` : null
}

export function HeroCarousel({ slides }: { slides: HeroSlideData[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => {
      setIndex((i) => (paused || videoUrl ? i : (i + 1) % slides.length))
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, videoUrl, slides.length])

  if (slides.length === 0) return null

  const slide = slides[index]
  const embedUrl = slide.youtubeUrl ? getYoutubeEmbedUrl(slide.youtubeUrl) : null

  const isCentre = slide.alignement === "CENTRE"
  const isDroite = slide.alignement === "DROITE"

  return (
    <section style={{ position: "relative", overflow: "hidden", minHeight: 460, marginTop: -68, background: colors.navy }}>
      <div
        key={slide.id}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${slide.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: `${TRANSITION_ANIMATIONS[slide.transition]} 0.6s ease`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isCentre
            ? `linear-gradient(180deg,${hexToRgba(slide.overlayColor, slide.overlayOpacity / 100)},${hexToRgba(slide.overlayColor, Math.min(1, (slide.overlayOpacity / 100) * 1.3))})`
            : `linear-gradient(0deg,${hexToRgba(slide.overlayColor, slide.overlayOpacity / 100)} 0%,${hexToRgba(slide.overlayColor, (slide.overlayOpacity / 100) * 0.3)} 45%,${hexToRgba(slide.overlayColor, 0)} 70%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: isCentre ? 0 : undefined,
          left: !isCentre && !isDroite ? "clamp(20px,5vw,60px)" : undefined,
          right: !isCentre && isDroite ? "clamp(20px,5vw,60px)" : undefined,
          bottom: isCentre ? undefined : 60,
          maxWidth: isCentre ? undefined : 600,
          padding: isCentre ? "96px clamp(20px,5vw,60px) 70px" : undefined,
          display: "flex",
          flexDirection: "column",
          alignItems: isCentre ? "center" : isDroite ? "flex-end" : "flex-start",
          justifyContent: isCentre ? "center" : undefined,
          textAlign: isCentre ? "center" : isDroite ? "right" : "left",
          gap: 14,
        }}
      >
        {slide.logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={slide.logoUrl} alt="" style={{ height: isCentre ? 100 : 56, width: "auto", display: "block" }} />
        )}
        {slide.badge && (
          <span
            style={{
              display: "inline-flex",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(2px)",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              padding: "7px 14px",
              borderRadius: 3,
              borderLeft: isCentre ? undefined : `3px solid ${colors.gold}`,
              width: "fit-content",
            }}
          >
            {slide.badge}
          </span>
        )}
        <h2
          style={{
            fontFamily: fontHeading,
            fontSize: isCentre ? "clamp(26px,4vw,44px)" : "clamp(26px,3.4vw,42px)",
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
            lineHeight: isCentre ? 1.12 : 1.08,
            textTransform: isCentre ? "uppercase" : undefined,
          }}
        >
          {slide.titre}
        </h2>
        {slide.sousTitre && (
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.85)",
              margin: 0,
              maxWidth: isCentre ? 580 : undefined,
            }}
          >
            {slide.sousTitre}
          </p>
        )}
        {isCentre && <div style={{ width: 60, height: 4, background: colors.gold, borderRadius: 2, marginTop: 6 }} />}
        {slide.ctaLabel && (
          <Hoverable
            as={Link}
            href={slide.formationSlug ? `/formations/${slide.formationSlug}` : "/formations"}
            style={{
              alignSelf: isCentre ? "center" : isDroite ? "flex-end" : "flex-start",
              marginTop: isCentre ? 6 : undefined,
              background: colors.red,
              color: "#ffffff",
              border: "none",
              padding: "13px 26px",
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: fontBody,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
            hoverStyle={{ background: colors.redDark }}
          >
            {slide.ctaLabel}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Hoverable>
        )}
      </div>

      {embedUrl && (
        <Hoverable
          as="button"
          onClick={() => setVideoUrl(embedUrl)}
          aria-label="Lire la vidéo"
          style={{
            position: "absolute",
            left: isDroite ? "32%" : "62%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(2px)",
            border: "1.5px solid rgba(255,255,255,0.6)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          hoverStyle={{ background: "rgba(255,255,255,0.3)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </Hoverable>
      )}

      {slides.length > 1 && (
        <>
          <Hoverable
            as="button"
            onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
            aria-label="Précédent"
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.18)",
              color: "#ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            hoverStyle={{ background: "rgba(255,255,255,0.3)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Hoverable>
          <Hoverable
            as="button"
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
            aria-label="Suivant"
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.18)",
              color: "#ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            hoverStyle={{ background: "rgba(255,255,255,0.3)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Hoverable>

          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: "clamp(20px,5vw,60px)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: 22,
                  height: 4,
                  borderRadius: 2,
                  border: "none",
                  cursor: "pointer",
                  background: i === index ? colors.red : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label="Pause"
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.25)",
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 4,
              }}
            >
              {paused ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              )}
            </button>
          </div>
        </>
      )}

      {videoUrl && (
        <div
          onClick={() => setVideoUrl(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,16,30,0.9)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
          }}
        >
          <button
            onClick={() => setVideoUrl(null)}
            aria-label="Fermer"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 960, aspectRatio: "16/9", borderRadius: 8, overflow: "hidden" }}
          >
            <iframe
              src={videoUrl}
              title="Vidéo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
