import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Globe } from 'lucide-react'

/* ── Supported languages ─────────────────────────────────────────── */
export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧', displayCode: 'EN' },
  { code: 'ar', label: 'Arabic',  flag: '🇦🇪', displayCode: 'AR' },
  { code: 'fr', label: 'French',  flag: '🇫🇷', displayCode: 'FR' },
  { code: 'hi', label: 'Hindi',   flag: '🇮🇳', displayCode: 'HI' },
]

/* ── Luxury palette (mirrors Navbar.jsx) ─────────────────────────── */
const P = {
  ivory:  '#F3EFE8',
  gold:   '#9D8668',
  smoke:  '#8B7B68',
  mocha:  '#5C4D3D',
  ivoryA: (a) => `rgba(243,239,232,${a})`,
  goldA:  (a) => `rgba(157,134,104,${a})`,
  smokeA: (a) => `rgba(139,123,104,${a})`,
  blackA: (a) => `rgba(5,5,5,${a})`,
}

/* ── One-time script injection ───────────────────────────────────── */
let _injected = false

function ensureScript() {
  if (_injected || document.getElementById('google-translate-script')) {
    _injected = true
    return
  }
  _injected = true

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: 'en,ar,fr,hi', autoDisplay: false },
      'google_translate_element'
    )
  }

  const s = document.createElement('script')
  s.id  = 'google-translate-script'
  s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  s.async = true
  document.head.appendChild(s)
}

/* ── Trigger translation via cookie + reload (most reliable method) ── */
export function triggerTranslate(langCode) {
  const hostname = window.location.hostname
  const past = 'Thu, 01 Jan 1970 00:00:01 GMT'

  // Always clear the existing cookie first (all domain variants)
  document.cookie = `googtrans=; expires=${past}; path=/`
  document.cookie = `googtrans=; expires=${past}; path=/; domain=${hostname}`
  document.cookie = `googtrans=; expires=${past}; path=/; domain=.${hostname}`

  if (langCode !== 'en') {
    // Set the new language cookie — Google Translate reads this on page load
    const value = `/en/${langCode}`
    document.cookie = `googtrans=${value}; path=/`
    document.cookie = `googtrans=${value}; path=/; domain=${hostname}`
    document.cookie = `googtrans=${value}; path=/; domain=.${hostname}`
  }

  document.documentElement.dir  = langCode === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = langCode
  window.location.reload()
}

/* ── Read active language from googtrans cookie ──────────────────── */
function getLangFromCookie() {
  const match = document.cookie.match(/googtrans=\/en\/([a-z]+)/)
  if (match) return LANGUAGES.find((l) => l.code === match[1]) ?? LANGUAGES[0]
  return LANGUAGES[0]
}

/* ═══════════════════════════════════════════════════════════════════
   DESKTOP Language Selector (default export)
   Renders the hidden Google widget div + styled dropdown button.
   Must be mounted exactly once — Navbar handles this.
══════════════════════════════════════════════════════════════════════ */
export default function GoogleTranslate({ className = '' }) {
  const [open, setOpen]         = useState(false)
  const [selected, setSelected] = useState(getLangFromCookie)
  const ref = useRef(null)

  /* Load Google Translate script once */
  useEffect(() => {
    ensureScript()
  }, [])

  /* Suppress Google's translation banner — belt + suspenders approach */
  useEffect(() => {
    // 1. Inject a <style> tag directly — highest-priority CSS suppression
    if (!document.getElementById('mlw-gt-suppress')) {
      const style = document.createElement('style')
      style.id = 'mlw-gt-suppress'
      style.textContent = `
        .goog-te-banner-frame, .goog-te-banner-frame.skiptranslate,
        .VIpgJd-ZVi9od-aZ2wEe, .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .VIpgJd-ZVi9od-aZ2wEe-yAXs7b-NVPDgc,
        #goog-gt-tt, .goog-te-ftab-float, .goog-te-menu-frame,
        .skiptranslate > iframe {
          display: none !important;
          height: 0 !important;
          visibility: hidden !important;
        }
        body, body.translated-ltr, body.translated-rtl {
          top: 0 !important;
          margin-top: 0 !important;
        }
      `
      document.head.appendChild(style)
    }

    const SELECTORS = [
      '.VIpgJd-ZVi9od-aZ2wEe',
      '.VIpgJd-ZVi9od-aZ2wEe-wOHMyf',
      '.goog-te-banner-frame',
      '#goog-gt-tt',
    ]

    const suppress = () => {
      SELECTORS.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          el.style.setProperty('display', 'none', 'important')
          el.style.setProperty('height', '0', 'important')
          el.style.setProperty('visibility', 'hidden', 'important')
        })
      })
      document.body.style.setProperty('top', '0px', 'important')
    }

    // 2a. Watch the full subtree for banner injection (subtree:true catches deep injection)
    const treeObserver = new MutationObserver(suppress)
    treeObserver.observe(document.body, { childList: true, subtree: true })

    // 2b. Watch body's own style/class attributes (catches top:40px push)
    const bodyObserver = new MutationObserver(suppress)
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    })

    suppress() // run once immediately on mount

    return () => { treeObserver.disconnect(); bodyObserver.disconnect() }
  }, [])

  /* Close on outside click */
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const handleSelect = (lang) => {
    setSelected(lang)
    setOpen(false)
    triggerTranslate(lang.code)
  }

  return (
    <>
      {/* Hidden Google Translate widget — must stay in DOM */}
      <div id="google_translate_element" style={{ display: 'none' }} aria-hidden="true" />

      {/* Styled desktop button */}
      <div ref={ref} className={`relative hidden lg:block notranslate ${className}`}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 font-ui text-[0.6rem] tracking-[0.15em] uppercase px-2.5 py-1.5 transition-all duration-200"
          style={{
            color:       open ? P.gold : P.ivoryA(0.85),
            border:      '1px solid',
            borderColor: open ? P.goldA(0.45) : P.smokeA(0.35),
            cursor:      'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color       = P.gold
            e.currentTarget.style.borderColor = P.goldA(0.45)
          }}
          onMouseLeave={(e) => {
            if (!open) {
              e.currentTarget.style.color       = P.ivoryA(0.85)
              e.currentTarget.style.borderColor = P.smokeA(0.35)
            }
          }}
          aria-label="Select language"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <Globe size={11} />
          <span>{selected.displayCode}</span>
          <ChevronDown
            size={9}
            style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="listbox"
              aria-label="Language options"
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-full right-0 mt-2 z-50 overflow-hidden"
              style={{
                minWidth:        '188px',
                background:      'rgba(243,239,232,0.99)',
                border:          `1px solid ${P.goldA(0.15)}`,
                boxShadow:       `0 20px 56px ${P.blackA(0.22)}`,
                backdropFilter:  'blur(24px)',
              }}
            >
              {/* Dropdown header */}
              <div className="px-4 py-3" style={{ borderBottom: `1px solid ${P.goldA(0.10)}` }}>
                <p className="font-ui text-[0.55rem] tracking-[0.24em] uppercase" style={{ color: P.smoke }}>
                  Select Language
                </p>
              </div>

              {/* Language options */}
              {LANGUAGES.map((lang) => {
                const isActive = selected.code === lang.code
                return (
                  <button
                    key={lang.code}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelect(lang)}
                    className="w-full flex items-center justify-between px-4 py-3 transition-all duration-150 text-left"
                    style={{ background: isActive ? P.goldA(0.07) : 'transparent', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = P.goldA(0.06) }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                  >
                    <span className="flex items-center gap-2.5">
                      <span style={{ fontSize: '14px', lineHeight: 1 }}>{lang.flag}</span>
                      <span className="font-ui text-[0.62rem] tracking-widest uppercase" style={{ color: P.mocha }}>
                        {lang.label}
                      </span>
                    </span>
                    {isActive && (
                      <span
                        className="font-ui text-[0.5rem] tracking-widest uppercase px-1.5 py-0.5"
                        style={{ background: P.gold, color: P.ivory }}
                      >
                        Active
                      </span>
                    )}
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MOBILE Language Selector (named export)
   Inline button row for the mobile slide menu.
══════════════════════════════════════════════════════════════════════ */
export function MobileLanguageSelector({ onAfterSelect }) {
  const [selected, setSelected] = useState(getLangFromCookie)

  const handleSelect = (lang) => {
    setSelected(lang)
    triggerTranslate(lang.code)
    onAfterSelect?.()
  }

  return (
    <div className="px-4 py-4 notranslate" style={{ borderTop: `1px solid ${P.smokeA(0.12)}` }}>
      <p
        className="font-ui text-[0.56rem] tracking-widest uppercase mb-3"
        style={{ color: P.smokeA(0.55) }}
      >
        Language
      </p>
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((lang) => {
          const isActive = selected.code === lang.code
          return (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className="flex items-center gap-1.5 px-3 py-2 font-ui text-[0.58rem] tracking-widest uppercase transition-all duration-200 border"
              style={{
                background:  isActive ? P.gold : 'transparent',
                borderColor: isActive ? P.gold : P.smokeA(0.25),
                color:       isActive ? P.ivory : P.smokeA(0.85),
              }}
            >
              <span style={{ fontSize: '12px', lineHeight: 1 }}>{lang.flag}</span>
              <span>{lang.displayCode}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
