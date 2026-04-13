import { useApp } from '../store/AppStore'

const TABS = [
  { id: 'profile',   label: 'profile',  screen: 'profile'   },
  { id: 'analytics', label: 'insights', screen: 'analytics' },
  { id: 'routine',   label: 'tonight',  screen: 'routine'   },
  { id: 'devices',   label: 'devices',  screen: 'devices'   },
]

function ProfileIcon({ active }) {
  const c = active ? '#a89ff0' : '#2e2b50'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8.5" r="3.5" stroke={c} strokeWidth="1.5"/>
      <path d="M3.5 18.5C3.5 14.91 6.91 12 11 12s7.5 2.91 7.5 6.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function AnalyticsIcon({ active }) {
  const c = active ? '#a89ff0' : '#2e2b50'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 15L6.5 10L10 12.5L13.5 7L17 9.5L20 5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function RoutineIcon({ active }) {
  const c = active ? '#a89ff0' : '#2e2b50'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8" stroke={c} strokeWidth="1.5"/>
      <path d="M8 11Q10 8.5 13.5 11" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="11" cy="7" r="1.2" fill={c}/>
    </svg>
  )
}
function DevicesIcon({ active }) {
  const c = active ? '#a89ff0' : '#2e2b50'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="7" y="3" width="8" height="16" rx="2.5" stroke={c} strokeWidth="1.5"/>
      <path d="M9 17.5h4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="11" cy="8" r="1.5" fill={c} opacity="0.5"/>
    </svg>
  )
}

const ICONS = { profile: ProfileIcon, analytics: AnalyticsIcon, routine: RoutineIcon, devices: DevicesIcon }

// Which tab should be highlighted for each screen
const SCREEN_TO_TAB = {
  signin:    'profile',
  welcome:   'routine',
  routine:   'routine',
  done:      'routine',
  eval:      'routine',
  customize: 'routine',
  analytics: 'analytics',
  devices:   'devices',
  profile:   'profile',
}

export default function TabBar() {
  const { screen, navigate } = useApp()
  const activeTab = SCREEN_TO_TAB[screen] || 'routine'

  return (
    <nav className="tab-bar" role="tablist" aria-label="Main navigation">
      {TABS.map(tab => {
        const Icon = ICONS[tab.id]
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            className={`tab-item ${tab.id === 'routine' ? 'tab-item--primary' : ''} ${isActive ? 'tab-item--active' : ''}`}
            onClick={() => navigate(tab.screen)}
            role="tab"
            aria-selected={isActive}
            aria-label={tab.label}
          >
            <div className="tab-item__icon">
              <Icon active={isActive} />
            </div>
            <span className="tab-item__label">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
