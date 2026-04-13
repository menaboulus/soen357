import { useState } from 'react'
import { useApp } from '../store/AppStore'
import TabBar from '../components/TabBar'
import { FaCcApplePay } from 'react-icons/fa'

function MoonLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="23" fill="#1a1730" stroke="#2d2a50" strokeWidth="0.5"/>
      <circle cx="24" cy="24" r="15" fill="#252240"/>
      <path d="M24 9Q32 16 32 24Q32 32 24 39Q18 32 18 24Q18 16 24 9Z" fill="#3d3870" opacity="0.88"/>
      <circle cx="24" cy="24" r="7" fill="#6c63d4" opacity="0.2"/>
      <circle cx="34" cy="14" r="2" fill="#a89ff0" opacity="0.4"/>
      <circle cx="11" cy="20" r="1.5" fill="#a89ff0" opacity="0.25"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <rect x="1" y="1" width="7" height="7" rx="1.5" fill="#4285f4"/>
      <rect x="10" y="1" width="7" height="7" rx="1.5" fill="#ea4335"/>
      <rect x="1" y="10" width="7" height="7" rx="1.5" fill="#34a853"/>
      <rect x="10" y="10" width="7" height="7" rx="1.5" fill="#fbbc04"/>
    </svg>
  )
}

export default function SignInScreen() {
  const { authMode, setAuthMode, login } = useApp()
  const [name,  setName]  = useState('')
  const [email, setEmail] = useState('')
  const [pw,    setPw]    = useState('')

  const handleSubmit = (e) => {
    e?.preventDefault()
    const displayName = authMode === 'signup'
      ? (name.trim() || email.split('@')[0] || 'friend')
      : (email.split('@')[0] || 'friend')
    login(displayName)
  }

  return (
    <div className="screen" style={{ padding: '0 0 0 0' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 26px 20px', overflowY: 'auto' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 28, marginTop: 6, animation: 'fadeUp 0.5s ease both' }}>
          <MoonLogo />
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--t1)', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              CalmSleep
            </div>
            <div style={{ fontSize: 11, color: 'var(--t4)', marginTop: 2, fontStyle: 'italic' }}>
              your gentle night companion
            </div>
          </div>
        </div>

        {/* Auth Tabs */}
        <div className="auth-tabs" style={{ marginBottom: 20, animation: 'fadeUp 0.5s 0.05s ease both' }}>
          <button className={`auth-tab ${authMode === 'signin' ? 'auth-tab--active' : ''}`} onClick={() => setAuthMode('signin')}>
            Sign in
          </button>
          <button className={`auth-tab ${authMode === 'signup' ? 'auth-tab--active' : ''}`} onClick={() => setAuthMode('signup')}>
            Create account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fadeUp 0.5s 0.1s ease both' }}>
          {authMode === 'signup' && (
            <div className="field">
              <label className="field__label">YOUR NAME</label>
              <input className="field__input" placeholder="What shall we call you?" value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
            </div>
          )}
          <div className="field">
            <label className="field__label">EMAIL</label>
            <input className="field__input" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="field">
            <label className="field__label">PASSWORD</label>
            <input className="field__input" type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'} />
          </div>

          <button type="submit" className="btn btn--primary" style={{ marginTop: 4 }}>
            {authMode === 'signin' ? 'Continue gently →' : 'Join CalmSleep →'}
          </button>
        </form>

        {/* Divider */}
        <div className="divider" style={{ margin: '16px 0', animation: 'fadeUp 0.5s 0.15s ease both' }}>
          <div className="divider__line" />
          <span className="divider__text">or continue with</span>
          <div className="divider__line" />
        </div>

        {/* Social */}
        <div style={{ display: 'flex', gap: 10, animation: 'fadeUp 0.5s 0.18s ease both' }}>
          <button className="social-btn" onClick={() => login('friend')} type="button">
            <GoogleIcon /> Google
          </button>
          <button className="social-btn" onClick={() => login('friend')} type="button">
            <FaCcApplePay /> Apple
          </button>
        </div>

        <p style={{ fontSize: 11, color: 'var(--t5)', textAlign: 'center', marginTop: 20, fontStyle: 'italic', animation: 'fadeUp 0.5s 0.22s ease both' }}>
          No scores. No streaks. Just rest.
        </p>
      </div>

      <TabBar />
    </div>
  )
}
