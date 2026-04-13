import { useState, useEffect, useRef } from 'react'
import { useApp } from '../store/AppStore'
import TabBar from '../components/TabBar'

const BREATH_PHASES = [
  { label: 'breathe in',  duration: 4000 },
  { label: 'hold',         duration: 2000 },
  { label: 'breathe out', duration: 4000 },
  { label: 'hold',         duration: 2000 },
]

function CompletionMark() {
  return (
    <div style={{ position: 'relative', marginBottom: 12 }}>
      <svg width="100" height="100" viewBox="0 0 100 100" style={{ animation: 'scaleIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <circle cx="50" cy="50" r="48" fill="#1e1b34" stroke="#2d2a50" strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="32" fill="#221f3a" opacity="0.9"/>
        <circle cx="50" cy="50" r="20" fill="#6c63d4" opacity="0.12"/>
        <path
          d="M33 50L43 60L67 36"
          stroke="#a89ff0"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: 'checkPop 0.6s 0.25s ease both' }}
        />
      </svg>
      <div className="completion-ring" />
    </div>
  )
}

function BreathingWidget() {
  const [active, setActive]  = useState(false)
  const [phase,  setPhase]   = useState(0)
  const [scale,  setScale]   = useState(1)
  const timerRef = useRef(null)

  const stop = () => {
    clearTimeout(timerRef.current)
    setActive(false)
    setScale(1)
    setPhase(0)
  }

  useEffect(() => {
    if (!active) return
    let p = 0

    const step = () => {
      setPhase(p)
      setScale(p === 0 ? 1.58 : p === 2 ? 0.86 : 1)
      const current = p
      p = (p + 1) % 4
      timerRef.current = setTimeout(step, BREATH_PHASES[current].duration)
    }

    step()
    return () => clearTimeout(timerRef.current)
  }, [active])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <div className="card" style={{ width: '100%', padding: '14px 16px', marginBottom: 12 }}>
      <div style={{ fontSize: 9, color: 'var(--t4)', letterSpacing: '0.07em', fontWeight: 500, marginBottom: 6 }}>
        ONE LAST THING
      </div>
      <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.65 }}>
        A few slow breaths can ease a busy mind before you lie down.
      </p>

      {active ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <div
            className="breath-circle"
            style={{
              transform:        `scale(${scale})`,
              transitionDuration: `${BREATH_PHASES[phase].duration}ms`,
              boxShadow: scale > 1 ? '0 0 28px rgba(108,99,212,0.2)' : 'none',
            }}
          >
            <span style={{ fontSize: 11, color: 'var(--acc3)', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.3 }}>
              {BREATH_PHASES[phase].label}
            </span>
          </div>
          <button
            className="btn btn--text"
            onClick={stop}
            style={{ fontSize: 11, color: 'var(--t4)' }}
          >
            stop
          </button>
        </div>
      ) : (
        <button className="btn btn--ghost" onClick={() => setActive(true)} style={{ marginTop: 10 }}>
          Try a breathing moment
        </button>
      )}
    </div>
  )
}

export default function DoneScreen() {
  const { navigate, resetTasks } = useApp()

  const handleReset = () => {
    resetTasks()
    navigate('routine')
  }

  return (
    <div className="screen">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 24px 14px', overflowY: 'auto' }}>
        <CompletionMark />

        <h1
          className="serif"
          style={{ fontSize: 30, color: 'var(--t1)', textAlign: 'center', lineHeight: 1.25, letterSpacing: '-0.5px', marginBottom: 10, animation: 'fadeUp 0.5s 0.25s ease both' }}
        >
          Your evening<br />is ready.
        </h1>

        <p style={{ fontSize: 14, color: 'var(--t3)', textAlign: 'center', lineHeight: 1.7, marginBottom: 18, animation: 'fadeUp 0.5s 0.3s ease both' }}>
          Nothing left to do. Just let the night carry you forward.
        </p>

        <div style={{ width: '100%', animation: 'fadeUp 0.5s 0.35s ease both' }}>
          <BreathingWidget />
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, animation: 'fadeUp 0.5s 0.42s ease both' }}>
          <button className="btn btn--subtle" onClick={() => navigate('eval')}>
            Optional: share how tonight felt →
          </button>
          <button className="btn btn--text" onClick={handleReset} style={{ textAlign: 'center' }}>
            Start over for tonight
          </button>
        </div>
      </div>

      <TabBar />
    </div>
  )
}
