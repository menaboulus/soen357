import { useApp } from '../store/AppStore'
import TabBar from '../components/TabBar'

function DeviceIcon({ connected }) {
  const c = connected ? '#5dbaa3' : '#3d3a5a'
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="5" y="2" width="8" height="14" rx="2.5" stroke={c} strokeWidth="1.3"/>
      <path d="M7 14.5h4" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
      {connected && <circle cx="9" cy="8" r="2" fill="#4d9e8a" opacity="0.5"/>}
    </svg>
  )
}

function DeviceItem({ device, onToggle, delay }) {
  return (
    <div
      className={`device-item ${device.connected ? 'device-item--connected' : ''}`}
      style={{ animationDelay: `${delay}s` }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-pressed={device.connected}
      onKeyDown={e => e.key === 'Enter' && onToggle()}
    >
      <div className="device-logo">
        <DeviceIcon connected={device.connected} />
      </div>
      <div style={{ flex: 1 }}>
        <div className="device-name">{device.name}</div>
        <div className="device-desc">{device.desc}</div>
      </div>
      <div className={`device-badge ${device.connected ? 'device-badge--connected' : ''}`}>
        {device.connected ? 'connected' : 'connect'}
      </div>
    </div>
  )
}

export default function DevicesScreen() {
  const { devices, toggleDevice } = useApp()

  return (
    <div className="screen">
      <div className="section-header">
        <div className="section-eyebrow">Connect a device</div>
        <h1 className="section-title">Your sleep companion</h1>
        <p className="section-subtitle">
          Pair a wearable to gently enrich your sleep picture.<br />Everything stays private and is shown only to you.
        </p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {devices.map((device, i) => (
          <DeviceItem
            key={device.id}
            device={device}
            onToggle={() => toggleDevice(device.id)}
            delay={i * 0.07}
          />
        ))}
      </div>

      <p style={{ fontSize: 11, color: 'var(--t5)', textAlign: 'center', padding: '10px 28px 12px', lineHeight: 1.65, fontStyle: 'italic' }}>
        CalmSleep only reads sleep and heart rate data.<br />No activity goals. No calorie counts.
      </p>

      <TabBar />
    </div>
  )
}
