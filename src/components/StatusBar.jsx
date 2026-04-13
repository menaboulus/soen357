import { useState, useEffect } from 'react'

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M1 8.5Q4 5 8 5Q12 5 15 8.5" stroke="rgba(184,180,216,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3.5 10.5Q5.5 7.5 8 7.5Q10.5 7.5 12.5 10.5" stroke="rgba(184,180,216,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="11.5" r="1.2" fill="rgba(184,180,216,0.7)"/>
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
      <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke="rgba(184,180,216,0.35)" strokeWidth="1"/>
      <rect x="1.5" y="1.5" width="16" height="9" rx="2.5" fill="rgba(184,180,216,0.5)"/>
      <path d="M24 4.5v3a1.5 1.5 0 0 0 0-3z" fill="rgba(184,180,216,0.35)"/>
    </svg>
  )
}

export default function StatusBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const tick = () => setTime(new Date())
    tick()
    const id = setInterval(tick, 10_000)
    return () => clearInterval(id)
  }, [])

  const h = time.getHours().toString().padStart(2, '0')
  const m = time.getMinutes().toString().padStart(2, '0')

  return (
    <div className="status-bar" role="status" aria-label={`Time: ${h}:${m}`}>
      <span className="status-bar__time">{h}:{m}</span>
      <div className="status-bar__icons">
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  )
}
