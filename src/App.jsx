import { useApp } from './store/AppStore'
import StatusBar   from './components/StatusBar'
import Stars       from './components/Stars'

import SignInScreen    from './screens/SignInScreen'
import WelcomeScreen   from './screens/WelcomeScreen'
import RoutineScreen   from './screens/RoutineScreen'
import DoneScreen      from './screens/DoneScreen'
import AnalyticsScreen from './screens/AnalyticsScreen'
import DevicesScreen   from './screens/DevicesScreen'
import EvaluationScreen from './screens/EvaluationScreen'
import CustomizeScreen from './screens/CustomizeScreen'
import ProfileScreen   from './screens/ProfileScreen'

const SCREEN_MAP = {
  signin:    SignInScreen,
  welcome:   WelcomeScreen,
  routine:   RoutineScreen,
  done:      DoneScreen,
  analytics: AnalyticsScreen,
  devices:   DevicesScreen,
  eval:      EvaluationScreen,
  customize: CustomizeScreen,
  profile:   ProfileScreen,
}

function DynamicIsland() {
  return <div className="island" role="presentation" aria-hidden="true" />
}

function PhoneFrame({ children }) {
  return (
    <div className="phone" role="main">
      <StatusBar />
      <DynamicIsland />
      <div className="screen-root">
        {children}
      </div>
    </div>
  )
}

export default function App() {
  const { screen } = useApp()

  // Get the active screen component; key forces remount on navigation = fresh animation
  const ActiveScreen = SCREEN_MAP[screen] || RoutineScreen

  return (
    <div className="app-shell">
      {/* Ambient background glows */}
      <div className="app-shell__glow app-shell__glow--tl" aria-hidden="true" />
      <div className="app-shell__glow app-shell__glow--br" aria-hidden="true" />

      {/* Background stars */}
      <Stars count={24} />

      {/* Phone */}
      <PhoneFrame>
        <ActiveScreen key={screen} />
      </PhoneFrame>
    </div>
  )
}
