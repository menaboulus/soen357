import { useApp, EVAL_QUESTIONS } from '../store/AppStore'
import TabBar from '../components/TabBar'

function ThankYouView({ onBack }) {
  return (
    <div className="screen">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center', animation: 'scaleIn 0.5s ease both' }}>
        <svg width="76" height="76" viewBox="0 0 76 76" style={{ marginBottom: 22 }}>
          <circle cx="38" cy="38" r="37" fill="#1e1b34" stroke="#2d2a50" strokeWidth="0.5"/>
          <circle cx="38" cy="38" r="25" fill="#221f3a" opacity="0.9"/>
          <circle cx="38" cy="38" r="15" fill="#6c63d4" opacity="0.12"/>
          <path
            d="M25 38L34 47L51 27"
            stroke="#a89ff0" strokeWidth="2.6"
            fill="none" strokeLinecap="round" strokeLinejoin="round"
            style={{ animation: 'checkPop 0.6s 0.2s ease both' }}
          />
        </svg>

        <h1 className="serif" style={{ fontSize: 36, color: 'var(--t1)', letterSpacing: '-0.6px', marginBottom: 12 }}>
          Thanks for sharing.
        </h1>
        <p style={{ fontSize: 15, color: 'var(--t3)', lineHeight: 1.75, marginBottom: 30 }}>
          Your answers were saved locally. Sleep well.
        </p>
        <button
          onClick={onBack}
          style={{ background: 'none', border: '0.5px solid var(--brd)', borderRadius: 12, color: 'var(--t3)', padding: '10px 26px', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--sans)', transition: 'all 0.2s' }}
        >
          Back to tonight
        </button>
      </div>
      <TabBar />
    </div>
  )
}

function LikertQuestion({ question, value, onSelect }) {
  return (
    <div className="card" style={{ padding: '13px 14px', marginBottom: 8 }}>
      <p style={{ fontSize: 13, color: 'var(--t1)', lineHeight: 1.6, marginBottom: 11 }}>
        {question.text}
      </p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            className={`likert-circle ${value === n ? 'likert-circle--selected' : ''}`}
            onClick={() => onSelect(n)}
            aria-label={`Rate ${n} out of 5`}
            aria-pressed={value === n}
          >
            {n}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 9, color: 'var(--t5)', fontStyle: 'italic' }}>disagree</span>
        <span style={{ fontSize: 9, color: 'var(--t5)', fontStyle: 'italic' }}>agree</span>
      </div>
    </div>
  )
}

export default function EvaluationScreen() {
  const { ratings, setRating, evalText, setEvalText, evalDone, submitEval, resetEval, navigate } = useApp()
  const allAnswered = EVAL_QUESTIONS.every(q => ratings[q.id] > 0)

  if (evalDone) {
    return <ThankYouView onBack={() => { resetEval(); navigate('routine') }} />
  }

  return (
    <div className="screen">
      <div className="section-header">
        <div className="section-eyebrow">After tonight's routine</div>
        <h1 className="section-title">How did it feel?</h1>
        <p className="section-subtitle">Four quick questions. No right answers.</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
        {EVAL_QUESTIONS.map((q, i) => (
          <div key={q.id} style={{ animation: `fadeUp 0.4s ${i * 0.07}s ease both` }}>
            <LikertQuestion
              question={q}
              value={ratings[q.id]}
              onSelect={v => setRating(q.id, v)}
            />
          </div>
        ))}

        {/* Open Text */}
        <div className="card" style={{ padding: '13px 14px', marginBottom: 12, animation: 'fadeUp 0.4s 0.28s ease both' }}>
          <div style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 9, fontStyle: 'italic' }}>
            Anything else on your mind? (You don't have to answer.)
          </div>
          <textarea
            value={evalText}
            onChange={e => setEvalText(e.target.value)}
            placeholder="Optional — share as little or as much as you like..."
            rows={3}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '0.5px solid var(--brd)', background: 'var(--bg3)', color: 'var(--t1)', fontSize: 13, fontFamily: 'var(--sans)', outline: 'none', resize: 'none', display: 'block' }}
          />
        </div>

        <div className="eval-note">
          What is measured: calmness, stress reduction, ease of use, and intention to reuse the routine.
        </div>

        <button
          className="btn btn--primary"
          disabled={!allAnswered}
          onClick={submitEval}
          style={{ marginBottom: 14 }}
        >
          Submit feedback
        </button>
      </div>

      <TabBar />
    </div>
  )
}
