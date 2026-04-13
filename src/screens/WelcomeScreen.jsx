import { useApp } from '../store/AppStore'

function MoonIllustration() {
  return (
    <div style={{ position: 'relative', width: 150, height: 150, marginBottom: 26, flexShrink: 0 }}>
      <svg width="150" height="150" viewBox="0 0 150 150" className="moon-float">
        <defs>
          <radialGradient id="moonGrad" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#2a2550" />
            <stop offset="100%" stopColor="#0f0d1c" />
          </radialGradient>
        </defs>
        <circle cx="75" cy="75" r="73" fill="url(#moonGrad)" stroke="#2d2a50" strokeWidth="0.5"/>
        <circle cx="75" cy="75" r="50" fill="#1e1b38" opacity="0.7"/>
        <path d="M75 22Q96 38 96 75Q96 112 75 128Q56 112 56 75Q56 38 75 22Z" fill="#3d3870" opacity="0.92"/>
        <circle cx="75" cy="75" r="30" fill="#6c63d4" opacity="0.09"/>
        {/* Craters */}
        <circle cx="52" cy="56" r="7.5" fill="#0f0d1c" opacity="0.5"/>
        <circle cx="94" cy="87" r="5.5" fill="#0f0d1c" opacity="0.45"/>
        <circle cx="63" cy="96" r="4.5" fill="#0f0d1c" opacity="0.38"/>
        <circle cx="88" cy="48" r="3" fill="#0f0d1c" opacity="0.3"/>
        {/* Rim glow */}
        <circle cx="75" cy="75" r="73" fill="none" stroke="#6c63d4" strokeWidth="1" opacity="0.13"/>
      </svg>
      {/* Orbit dot */}
      <div style={{ position: 'absolute', inset: -15, borderRadius: '50%', border: '0.5px solid rgba(108,99,212,0.12)' }}>
        <div style={{ position: 'absolute', top: -4, left: '50%', width: 8, height: 8, borderRadius: '50%', background: '#a89ff0', opacity: 0.5, transform: 'translateX(-50%)' }} />
      </div>
    </div>
  )
}

const PILLS = ['Calm routines', 'No metrics', 'Sleep gently']

export default function WelcomeScreen() {
  const { navigate } = useApp()

  return (
    <div className="screen" style={{ alignItems: 'center', padding: '12px 28px 24px' }}>
      <MoonIllustration />

      <div style={{ width: '100%', animation: 'fadeUp 0.6s 0.12s ease both' }}>
        <h1 className="serif" style={{ fontSize: 36, color: 'var(--t1)', lineHeight: 1.22, letterSpacing: '-0.6px', marginBottom: 14 }}>
          Let's slow down<br />your evenings.
        </h1>
        <p style={{ fontSize: 15, color: 'var(--t3)', lineHeight: 1.75, marginBottom: 20 }}>
          No scores. No tracking. Just a gentle ritual to help you wind down — at your own pace, every night.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 26, flexWrap: 'wrap' }}>
          {PILLS.map((pill, i) => (
            <div
              key={pill}
              style={{
                padding: '5px 13px',
                borderRadius: 99,
                border: '0.5px solid var(--brd2)',
                color: 'var(--t3)',
                fontSize: 12,
                animation: `fadeUp 0.5s ${0.25 + i * 0.08}s ease both`,
              }}
            >
              {pill}
            </div>
          ))}
        </div>

        <button className="btn btn--primary" onClick={() => navigate('routine')}>
          Tonight's routine →
        </button>

        <p style={{ fontSize: 12, color: 'var(--t5)', textAlign: 'center', marginTop: 16, fontStyle: 'italic' }}>
          Take your time. You can always come back tomorrow.
        </p>
      </div>
    </div>
  )
}
