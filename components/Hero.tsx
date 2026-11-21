"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

type HeroProps = {
  firstName: string;
  lastName: string;
  tagline: string;
  role: string;
  videoSrc: string;
  posterSrc?: string;
};

export default function Hero({
  firstName,
  lastName,
  tagline,
  role,
  videoSrc,
  posterSrc,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasEndedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [timecode, setTimecode] = useState("00:00:00");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTimecode = () => {
      const seconds = Math.floor(video.currentTime);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      setTimecode(
        [hours, minutes, secs]
          .map((value) => value.toString().padStart(2, "0"))
          .join(":")
      );
    };

    video.addEventListener("timeupdate", updateTimecode);
    return () => video.removeEventListener("timeupdate", updateTimecode);
  }, []);

  useEffect(() => {
    const section = videoRef.current?.closest("section");
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasEndedRef.current) return;

          video.play().then(
            () => setPaused(false),
            () => {
              video.muted = true;
              setMuted(true);
              video.play().then(
                () => setPaused(false),
                () => setPaused(true)
              );
            }
          );
        } else {
          video.pause();
          setPaused(true);
        }
      },
      { threshold: 0.5 }
    );

    const handleEnded = () => {
      hasEndedRef.current = true;
      setPaused(true);
    };
    video.addEventListener("ended", handleEnded);
    observer.observe(section);

    return () => {
      observer.disconnect();
      video.removeEventListener("ended", handleEnded);
      video.pause();
    };
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      hasEndedRef.current = false;
      await video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const enterFullscreen = () => {
    videoRef.current?.parentElement?.requestFullscreen();
  };

  const scrollToSkills = () => {
    document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
  };

  const resolvedVideo = videoSrc || "/videos/hero.mp4";

  return (
    <section className={styles.hero} aria-label="Cinematic portfolio introduction">
      <div className={styles.stickyStage}>
        <div className={styles.videoStage}>
          <video
            className={styles.bgVideo}
            src={resolvedVideo}
            poster={posterSrc}
            muted
            preload="metadata"
            playsInline
            aria-hidden="true"
          />
          <video
            ref={videoRef}
            className={styles.fgVideo}
            src={resolvedVideo}
            poster={posterSrc}
            playsInline
          />
          <div className={styles.vignetteBottom} />
          <div className={styles.vignetteTop} />
          <div className={styles.colorWash} />
        </div>

        <div className={`${styles.frameCorner} ${styles.cornerTL}`} />
        <div className={`${styles.frameCorner} ${styles.cornerTR}`} />
        <div className={`${styles.frameCorner} ${styles.cornerBL}`} />
        <div className={`${styles.frameCorner} ${styles.cornerBR}`} />

        <div className={styles.recBadge} aria-label="Video recording time">
          <span className={styles.recDotLive} />
          <span className={styles.recDot}>REC</span>
          <span className={styles.timecode}>{timecode}</span>
        </div>

        <button className={styles.soundHint} type="button" onClick={toggleMute}>
          <span className={styles.soundHintPulse} />
          {muted ? "Tap for sound" : "Sound on"}
        </button>

        <div className={styles.content}>
          <p className={styles.tagline}>{tagline}</p>
          <h1 className={styles.name}>
            <span className={styles.nameLine} style={{ color: "#FFB834" }}>
              {firstName}
            </span>
            <span className={styles.nameLine} style={{ color: "#F4F1EA" }}>
              {lastName}
            </span>
          </h1>
          <p className={styles.role}>{role}</p>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.glassButton}
            type="button"
            onClick={togglePlayback}
            aria-label={paused ? "Play video" : "Pause video"}
          >
            {paused ? "▶" : "Ⅱ"}
          </button>
          <button
            className={styles.glassButton}
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <button
            className={styles.glassButton}
            type="button"
            onClick={enterFullscreen}
            aria-label="Enter fullscreen"
          >
            ⛶
          </button>
        </div>

        <button className={styles.scrollIndicator} type="button" onClick={scrollToSkills}>
          <span className={styles.scrollLabel}>Explore</span>
          <span className={styles.scrollTrack}>
            <span className={styles.scrollPulse} />
          </span>
        </button>
      </div>
    </section>
  );
}