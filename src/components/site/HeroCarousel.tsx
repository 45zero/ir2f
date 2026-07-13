"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Hoverable } from "@/components/ui/Hoverable"
import { colors, fontHeading, fontBody } from "@/lib/theme"
import type { HeroSlideData } from "@/lib/home"

const AUTOPLAY_MS = 6500

export function HeroCarousel({ slides }: { slides: HeroSlideData[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => {
      setIndex((i) => (paused ? i : (i + 1) % slides.length))
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, slides.length])

  if (slides.length === 0) return null

  const slide = slides[index]

  return (
    <section style={{ position: "relative", overflow: "hidden", minHeight: 420, background: colors.navy }}>
      <div
        key={slide.id}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${slide.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "ir2fFadeIn 0.5s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(0deg,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.15) 45%,rgba(0,0,0,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "clamp(20px,5vw,60px)",
          bottom: 60,
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
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
            borderLeft: `3px solid ${colors.gold}`,
            width: "fit-content",
          }}
        >
          {slide.badge}
        </span>
        <h2
          style={{
            fontFamily: fontHeading,
            fontSize: "clamp(26px,3.4vw,42px)",
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.08,
          }}
        >
          {slide.titre}
        </h2>
        <Hoverable
          as={Link}
          href={slide.formationSlug ? `/formations/${slide.formationSlug}` : "/formations"}
          style={{
            alignSelf: "flex-start",
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
      </div>

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
    </section>
  )
}
