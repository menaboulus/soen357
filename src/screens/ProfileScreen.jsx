import { useApp } from '../store/AppStore'
import TabBar from '../components/TabBar'

const MENU_ITEMS = [
  { label: "Tonight's routine",  screen: 'routine',   icon: '🌙' },
  { label: 'View sleep insights', screen: 'analytics', icon: '📊' },
  { label: 'Connect a device',    screen: 'devices',   icon: '📱' },
  { label: 'Edit my routine',     screen: 'customize', icon: '✏️' },
]

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="var(--t4)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function ProfileScreen() {
  const { user, navigate, logout } = useApp()

  return (
    <div className="screen">
      {/* Header */}
      <div style={{ padding: '18px 22px 0', animation: 'fadeUp 0.4s ease both' }}>
        <div className="avatar" style={{ marginBottom: 14 }}>
          {(user?.name?.[0] || 'Y').toUpperCase()}
        </div>
        <h1 className="serif" style={{ fontSize: 22, color: 'var(--t1)', fontWeight: 400, letterSpacing: '-0.3px', marginBottom: 8 }}>
          Good evening, {user?.name || 'friend'}.
        </h1>
        <p style={{ fontSize: 13, color: 'var(--t3)', lineHeight: 1.72, marginBottom: 20 }}>
          Rest is not a reward. It's a right. CalmSleep is here to help you claim it, one gentle evening at a time.
        </p>
      </div>

      {/* Menu */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
        {MENU_ITEMS.map((item, i) => (
          <button
            key={item.screen}
            onClick={() => navigate(item.screen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 13,
              padding: '14px 16px',
              borderRadius: 14,
              background: 'var(--card)',
              border: '0.5px solid var(--brd)',
              cursor: 'pointer',
              fontFamily: 'var(--sans)',
              width: '100%',
              textAlign: 'left',
              marginBottom: 8,
              transition: 'all 0.2s',
              animation: `fadeUp 0.4s ${i * 0.07}s ease both`,
              color: 'inherit',
            }}
          >
            <span style={{ fontSize: 18 }} role="img" aria-hidden="true">{item.icon}</span>
            <span style={{ flex: 1, fontSize: 14, color: 'var(--t2)' }}>{item.label}</span>
            <ChevronIcon />
          </button>
        ))}

        {/* Version note */}
        <p style={{ fontSize: 11, color: 'var(--t5)', textAlign: 'center', marginTop: 12, marginBottom: 8, fontStyle: 'italic' }}>
          CalmSleep v1.0 · Made with care for your rest
        </p>

        <button
          type="button"
          className="btn btn--ghost"
          onClick={logout}
          style={{ marginBottom: 12 }}
        >
          Log out
        </button>
      </div>

      <TabBar />
    </div>
  )
}
