import { useApp, SLEEP_BARS, SLEEP_METRICS } from '../store/AppStore'
import TabBar from '../components/TabBar'

const LEGEND = [
  { label: 'awake', color: '#252242' },
  { label: 'light', color: '#3d3870' },
  { label: 'deep',  color: '#5a569c' },
  { label: 'REM',   color: '#7a6a9a' },
]

function MetricGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '8px 16px', animation: 'fadeUp 0.4s 0.05s ease both' }}>
      {SLEEP_METRICS.map((m, i) => (
        <div key={m.label} className="metric-card" style={{ animationDelay: `${0.05 + i * 0.07}s` }}>
          <div className="metric-card__label">{m.label}</div>
          <div className="metric-card__value">
            {m.value}
            <span className="metric-card__unit">{m.unit}</span>
          </div>
          <div className="metric-card__note">{m.note}</div>
          <div className="metric-bar">
            <div className="metric-bar__fill" style={{ width: `${m.pct}%`, background: m.color }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function SleepChart() {
  const MAX_HEIGHT = 75

  return (
    <div style={{ padding: '0 16px 8px', animation: 'fadeUp 0.4s 0.1s ease both' }}>
      <div style={{ fontSize: 9, color: 'var(--t4)', letterSpacing: '0.06em', fontWeight: 500, marginBottom: 7 }}>
        SLEEP STAGES · LAST 7 NIGHTS
      </div>
      <div className="sleep-chart">
        <div className="sleep-bars">
          {SLEEP_BARS.map(b => {
            const total = b.a + b.l + b.dp + b.r
            const scale = MAX_HEIGHT / total
            return (
              <div key={b.d} className="sleep-bar-col">
                <div className="sleep-bar-stack">
                  <div className="sleep-bar" style={{ height: Math.round(b.r  * scale), background: '#7a6a9a' }} />
                  <div className="sleep-bar" style={{ height: Math.round(b.dp * scale), background: '#5a569c', borderRadius: 0 }} />
                  <div className="sleep-bar" style={{ height: Math.round(b.l  * scale), background: '#3d3870', borderRadius: 0 }} />
                  <div className="sleep-bar" style={{ height: Math.round(b.a  * scale), background: '#252242', borderRadius: 0 }} />
                </div>
                <div className="sleep-bar-label">{b.d}</div>
              </div>
            )
          })}
        </div>

        <div className="sleep-legend">
          {LEGEND.map(l => (
            <div key={l.label} className="sleep-legend-item">
              <div className="sleep-legend-dot" style={{ background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsScreen() {
  const { devices } = useApp()
  const connected = devices.find(d => d.connected)

  return (
    <div className="screen">
      {/* Header */}
      <div style={{ padding: '10px 20px 0', animation: 'fadeUp 0.4s ease both' }}>
        <div style={{ fontSize: 11, color: 'var(--t4)' }}>Thursday, April 3</div>
        <h1 className="serif" style={{ fontSize: 20, color: 'var(--t1)', fontWeight: 400, letterSpacing: '-0.3px', marginBottom: 6 }}>
          Your sleep this week
        </h1>
        {connected && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(29,61,50,0.35)', border: '0.5px solid rgba(42,84,66,0.5)', borderRadius: 99, padding: '3px 10px', marginBottom: 2 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal2)' }} />
            <span style={{ fontSize: 10, color: 'var(--teal2)' }}>{connected.name} synced · just now</span>
          </div>
        )}
      </div>

      <MetricGrid />
      <SleepChart />

      {/* Insight */}
      <div className="insight-card">
        <div className="insight-label">A GENTLE OBSERVATION</div>
        <p className="insight-text">
          Nights after a completed routine tend to show deeper, more settled sleep.
          No pressure — just something worth noticing.
        </p>
      </div>

      <TabBar />
    </div>
  )
}
