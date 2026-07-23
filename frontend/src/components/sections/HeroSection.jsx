import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react'

const YOUTUBE_VIDEO_ID = '_P-A7Cm1sq4'

/* ── Load the YouTube IFrame API once, sharing a single promise across mounts ── */
let ytApiPromise = null
function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (ytApiPromise) return ytApiPromise
  ytApiPromise = new Promise((resolve) => {
    const prevCallback = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevCallback === 'function') prevCallback()
      resolve(window.YT)
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  })
  return ytApiPromise
}

export default function HeroSection() {
  const [ready, setReady] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [videoSize, setVideoSize] = useState({ width: '100%', height: '100%' })

  const containerRef = useRef(null)
  const playerElRef = useRef(null)
  const playerRef = useRef(null)
  const seekBarRef = useRef(null)
  const pollRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80)
    return () => clearTimeout(t)
  }, [])

  /* ── Size the iframe to cover the section, like object-fit: cover ── */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const updateSize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      const videoRatio = 16 / 9
      const containerRatio = w / h
      if (containerRatio > videoRatio) {
        setVideoSize({ width: `${w}px`, height: `${w / videoRatio}px` })
      } else {
        setVideoSize({ width: `${h * videoRatio}px`, height: `${h}px` })
      }
    }
    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* ── Init YouTube player ── */
  useEffect(() => {
    let cancelled = false
    loadYouTubeApi().then((YT) => {
      if (cancelled || !playerElRef.current) return
      playerRef.current = new YT.Player(playerElRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            if (cancelled) return
            e.target.mute()
            e.target.playVideo()
            setPlayerReady(true)
            setDuration(e.target.getDuration())
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              setPlaying(true)
              setDuration(e.target.getDuration())
            } else if (e.data === window.YT.PlayerState.PAUSED) {
              setPlaying(false)
            } else if (e.data === window.YT.PlayerState.ENDED) {
              // Loop manually — avoids the `playlist` param, which makes YouTube
              // expose prev/next-track controls to the OS media-transport UI.
              e.target.seekTo(0)
              e.target.playVideo()
            }
          },
        },
      })
    })
    return () => {
      cancelled = true
      if (playerRef.current?.destroy) playerRef.current.destroy()
    }
  }, [])

  /* ── Poll playback progress ── */
  useEffect(() => {
    if (!playerReady) return
    pollRef.current = setInterval(() => {
      const player = playerRef.current
      if (!player || dragging || typeof player.getCurrentTime !== 'function') return
      setProgress(player.getCurrentTime())
      const d = player.getDuration()
      if (d) setDuration(d)
    }, 250)
    return () => clearInterval(pollRef.current)
  }, [playerReady, dragging])

  const togglePlay = useCallback(() => {
    const player = playerRef.current
    if (!player) return
    if (playing) { player.pauseVideo(); setPlaying(false) }
    else { player.playVideo(); setPlaying(true) }
  }, [playing])

  const toggleMute = useCallback(() => {
    const player = playerRef.current
    if (!player) return
    if (muted) { player.unMute(); setMuted(false) }
    else { player.mute(); setMuted(true) }
  }, [muted])

  const getSeekPosition = (e) => {
    const bar = seekBarRef.current
    if (!bar) return 0
    const rect = bar.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    return ratio * duration
  }

  const onSeekStart = (e) => {
    setDragging(true)
    setProgress(getSeekPosition(e))
  }

  const onSeekMove = (e) => {
    if (!dragging) return
    setProgress(getSeekPosition(e))
  }

  const onSeekEnd = (e) => {
    const time = getSeekPosition(e)
    if (playerRef.current?.seekTo) playerRef.current.seekTo(time, true)
    setProgress(time)
    setDragging(false)
  }

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: 'calc(100svh - 70px)', minHeight: '560px', maxHeight: '860px' }}
    >
      {/* ── Background video (YouTube) ── */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={playerElRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: videoSize.width,
            height: videoSize.height,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* ── Overlay gradients ── */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0) 100%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.38) 0%, transparent 62%)' }}
      />

      {/* ── Content — anchored to bottom ── */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-luxury" style={{ paddingBottom: 'clamp(6rem, 10vh, 8rem)' }}>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.15, maxWidth: '640px', fontWeight: 400 }}
          >
            Redefining Luxury<br />Living in Pune
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={ready ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-8"
            style={{ width: '52px', height: '1px', background: 'var(--gold)', transformOrigin: 'left' }}
          />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/projects/ongoing"
              className="font-ui tracking-[0.2em] uppercase inline-flex items-center gap-2 group transition-all duration-300"
              style={{ fontSize: '0.58rem', padding: '0.95rem 2.2rem', background: 'var(--gold)', color: '#fff', border: '1px solid var(--gold)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--gold)' }}
            >
              Explore Developments
              <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Video controls bar (bottom right) ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="absolute bottom-0 inset-x-0 z-20"
        style={{ padding: '0 2rem 1.4rem' }}
      >
        <div className="flex items-center gap-3" style={{ maxWidth: '100%' }}>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            style={{
              flexShrink: 0,
              width: '30px', height: '30px',
              border: '1px solid rgba(255,255,255,0.35)',
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(6px)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(0,0,0,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(0,0,0,0.35)' }}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause size={11} fill="#fff" /> : <Play size={11} fill="#fff" />}
          </button>

          {/* Time elapsed */}
          <span className="font-ui" style={{ fontSize: '0.42rem', color: 'rgba(255,255,255,0.5)', flexShrink: 0, letterSpacing: '0.05em' }}>
            {formatTime(progress)}
          </span>

          {/* Seek bar */}
          <div
            ref={seekBarRef}
            onMouseDown={onSeekStart}
            onMouseMove={onSeekMove}
            onMouseUp={onSeekEnd}
            onMouseLeave={(e) => { if (dragging) onSeekEnd(e) }}
            onTouchStart={onSeekStart}
            onTouchMove={onSeekMove}
            onTouchEnd={onSeekEnd}
            style={{
              flex: 1,
              height: '3px',
              background: 'rgba(255,255,255,0.18)',
              borderRadius: '2px',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {/* Filled portion */}
            <div style={{
              position: 'absolute', left: 0, top: 0,
              height: '100%',
              width: `${pct}%`,
              background: 'var(--gold)',
              borderRadius: '2px',
              pointerEvents: 'none',
            }} />
            {/* Thumb */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `${pct}%`,
              transform: 'translate(-50%, -50%)',
              width: '10px', height: '10px',
              borderRadius: '50%',
              background: 'var(--gold)',
              boxShadow: '0 0 0 2px rgba(0,0,0,0.4)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Duration */}
          <span className="font-ui" style={{ fontSize: '0.42rem', color: 'rgba(255,255,255,0.35)', flexShrink: 0, letterSpacing: '0.05em' }}>
            {formatTime(duration)}
          </span>

          {/* Mute / Unmute */}
          <button
            onClick={toggleMute}
            style={{
              flexShrink: 0,
              width: '30px', height: '30px',
              border: '1px solid rgba(255,255,255,0.35)',
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(6px)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(0,0,0,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(0,0,0,0.35)' }}
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={11} /> : <Volume2 size={11} />}
          </button>

        </div>
      </motion.div>

    </section>
  )
}
