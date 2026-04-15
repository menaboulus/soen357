import { createContext, useContext, useState, useCallback, useRef } from 'react'

// ─── Default Data ───────────────────────────────────────────────────────────

export const DEFAULT_TASKS = [
  { id: 1, icon: '💡', name: 'Dim the lights',       sub: 'ease your eyes into evening',           done: false },
  { id: 2, icon: '📵', name: 'Put phone face-down',   sub: 'the world can wait till morning',       done: false },
  { id: 3, icon: '🪥', name: 'Brush your teeth',      sub: 'a small act of care',                   done: false },
  { id: 4, icon: '📖', name: 'Read a few pages',      sub: "let someone else's words carry you",    done: false },
  { id: 5, icon: '🌿', name: 'Make herbal tea',        sub: 'something warm, something slow',        done: false },
  { id: 6, icon: '🖊️', name: 'Write one thought down', sub: 'empty the mind, gently',               done: false },
  { id: 7, icon: '🌙', name: 'Settle into bed',        sub: 'you made it here',                      done: false },
]

export const DEFAULT_DEVICES = [
  { id: 'apple',   name: 'Apple Watch',          desc: 'Sleep & heart rate via HealthKit',        connected: true  },
  { id: 'whoop',   name: 'Whoop',                desc: 'Deep recovery & sleep stage data',        connected: false },
  { id: 'samsung', name: 'Samsung Galaxy Watch', desc: 'Sleep tracking via Samsung Health',       connected: false },
  { id: 'oura',    name: 'Oura Ring',            desc: 'Passive overnight sleep sensing',         connected: false },
  { id: 'fitbit',  name: 'Fitbit',               desc: 'Sleep stages & heart rate variability',   connected: false },
]

export const MICROCOPY = [
  'Nice, one less thing to think about.',
  "That's done. Keep going, gently.",
  'Good. Your mind can let that one go.',
  'Softly does it — well done.',
  'One step closer to rest.',
  "That's taken care of. Breathe easy.",
  "You're getting there, quietly.",
]

export const EVAL_QUESTIONS = [
  { id: 'q1', text: 'Using this app tonight made me feel calm.'               },
  { id: 'q2', text: 'Completing this routine reduced my pre-sleep stress.'    },
  { id: 'q3', text: 'The routine was easy to follow without much thinking.'   },
  { id: 'q4', text: 'I would like to use this routine again tomorrow night.'  },
]

export const SLEEP_BARS = [
  { d: 'Mon', a: 5, l: 40, dp: 25, r: 20 },
  { d: 'Tue', a: 8, l: 35, dp: 20, r: 25 },
  { d: 'Wed', a: 3, l: 45, dp: 28, r: 18 },
  { d: 'Thu', a: 6, l: 38, dp: 22, r: 22 },
  { d: 'Fri', a: 10, l: 30, dp: 15, r: 28 },
  { d: 'Sat', a: 4, l: 42, dp: 30, r: 20 },
  { d: 'Sun', a: 5, l: 38, dp: 24, r: 22 },
]

export const SLEEP_METRICS = [
  { label: 'TIME ASLEEP',  value: '7',   unit: 'h 22m', note: 'close to your usual',           color: '#4a4580', pct: 82 },
  { label: 'FELL ASLEEP',  value: '11',  unit: ':14 pm', note: 'gentle start to the night',    color: '#4d9e8a', pct: 70 },
  { label: 'RESTFULNESS',  value: 'Calm', unit: '',      note: 'low movement overnight',        color: '#5a7a9a', pct: 88 },
  { label: 'WOKE UP',      value: '6',   unit: ':38 am', note: '7 hrs 24 min after bed',       color: '#7a6a9a', pct: 74 },
]

// ─── Context ────────────────────────────────────────────────────────────────

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [screen,       setScreen]       = useState('signin')
  const [authMode,     setAuthMode]     = useState('signin')
  const [user,         setUser]         = useState(null)
  const [tasks,        setTasks]        = useState(DEFAULT_TASKS.map(t => ({ ...t })))
  const [customTasks,  setCustomTasks]  = useState(DEFAULT_TASKS.map(t => ({ ...t })))
  const [devices,      setDevices]      = useState(DEFAULT_DEVICES.map(d => ({ ...d })))
  const [ratings,      setRatingsState] = useState({ q1: 0, q2: 0, q3: 0, q4: 0 })
  const [evalText,     setEvalText]     = useState('')
  const [evalDone,     setEvalDone]     = useState(false)
  const [toast,        setToast]        = useState({ visible: false, text: '' })
  const toastTimer = useRef(null)

  const navigate = useCallback(s => setScreen(s), [])

  const login = useCallback((name) => {
    setUser({ name: name?.trim() || 'friend' })
    navigate('welcome')
  }, [navigate])

  const logout = useCallback(() => {
    setUser(null)
    setAuthMode('signin')
    navigate('signin')
  }, [navigate])

  const toggleTask = useCallback(id => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }, [])

  const resetTasks = useCallback(() => {
    setTasks(DEFAULT_TASKS.map(t => ({ ...t })))
  }, [])

  const showToast = useCallback(text => {
    clearTimeout(toastTimer.current)
    setToast({ visible: true, text })
    toastTimer.current = setTimeout(() => setToast({ visible: false, text: '' }), 2800)
  }, [])

  const toggleDevice = useCallback(id => {
    setDevices(prev => prev.map(d =>
      d.id === id ? { ...d, connected: !d.connected } : { ...d, connected: false }
    ))
  }, [])

  const addCustomTask = useCallback(name => {
    if (!name?.trim()) return
    setCustomTasks(prev => [...prev, {
      id: Date.now(),
      icon: '✦',
      name: name.trim(),
      sub: 'your addition',
      done: false,
    }])
  }, [])

  const removeCustomTask = useCallback(id => {
    setCustomTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  const saveCustom = useCallback(() => {
    setTasks(customTasks.map(t => ({ ...t, done: false })))
    navigate('routine')
  }, [customTasks, navigate])

  const setRating = useCallback((q, val) => {
    setRatingsState(prev => ({ ...prev, [q]: val }))
  }, [])

  const submitEval = useCallback(() => setEvalDone(true), [])

  const resetEval = useCallback(() => {
    setRatingsState({ q1: 0, q2: 0, q3: 0, q4: 0 })
    setEvalText('')
    setEvalDone(false)
  }, [])

  return (
    <AppContext.Provider value={{
      screen, navigate,
      authMode, setAuthMode,
      user, login, logout,
      tasks, toggleTask, resetTasks,
      customTasks, addCustomTask, removeCustomTask, saveCustom,
      devices, toggleDevice,
      ratings, setRating,
      evalText, setEvalText,
      evalDone, submitEval, resetEval,
      toast, showToast,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
