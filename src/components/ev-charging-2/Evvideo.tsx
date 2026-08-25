"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Play } from "lucide-react";

/* =========================================================
    SECTION 03 — VIDEO
========================================================= */

type Props = {
  /**
   * YouTube video ID.
   * Example: "dQw4w9WgXcQ"
   */
  youtubeId?: string;

  /**
   * Self-hosted video.
   * Example: "/videos/ev-install.mp4"
   *
   * If src is provided, it takes priority over youtubeId.
   */
  src?: string;

  /**
   * Poster image shown before the video starts.
   */
  poster?: string;
};

export const EVVideo = ({
  youtubeId = "REPLACE_WITH_VIDEO_ID",
  src,
  poster = "/images/ev-charging/video-poster.png",
}: Props) => {
  const [playing, setPlaying] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-15% 0px",
  });

  return (
    <section
      ref={sectionRef}
      id="how-it-works-video"
      className="bg-canvas pb-20 lg:pb-28"
    >
      <div className="page-pad page-shell">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 22,
                }
          }
          animate={
            inView || reduceMotion
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 22,
                }
          }
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[640px]"
        >
          <h2 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[52px]">
            See how it works.
          </h2>

          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.65] text-ink-soft">
            See how Multiline handles EV charger installation — from
            the initial site visit to getting your charger ready to use.
          </p>
        </motion.div>

        {/* =====================================================
            PLAYER
        ===================================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                }
          }
          animate={
            inView || reduceMotion
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 30,
                }
          }
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-10 aspect-video w-full overflow-hidden rounded-[20px] bg-ink lg:mt-12"
        >
          {playing ? (
            src ? (
              /* =================================================
                  SELF-HOSTED VIDEO
              ================================================= */

              <video
                src={src}
                poster={poster}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              /* =================================================
                  YOUTUBE VIDEO
              ================================================= */

              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title="How Multiline EV charger installation works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            )
          ) : (
            /* =================================================
                VIDEO POSTER
            ================================================= */

            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              className="group absolute inset-0 h-full w-full"
            >
              <Image
                src={poster}
                alt=""
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />

              {/* DARK OVERLAY */}

              <span className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/30" />

              {/* PLAY BUTTON */}

              <span className="absolute left-1/2 top-1/2 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-out group-hover:scale-110">
                <Play
                  className="ml-1 h-[26px] w-[26px] text-ink"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};