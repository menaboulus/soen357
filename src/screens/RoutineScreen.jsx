import { useEffect } from 'react'
import { useApp, MICROCOPY } from '../store/AppStore'
import TabBar from '../components/TabBar'

function CheckIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="checkmark">
      <path d="M1 5L4.2 8.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M8.5 1.5L10.5 3.5L3.5 10.5H1.5V8.5L8.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TaskItem({ task, index, onTap }) {
  return (
    <div
      className={`task-item ${task.done ? 'task-item--done' : ''}`}
      style={{ animationDelay: `${index * 0.055}s` }}
      onClick={onTap}
      role="checkbox"
      aria-checked={task.done}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onTap()
        }
      }}
    >
      <span className="task-step" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div className={`task-checkbox ${task.done ? 'task-checkbox--checked' : ''}`}>
        {task.done && <CheckIcon />}
      </div>
      <span className="task-icon" role="img" aria-hidden="true">{task.icon}</span>
      <div className="task-content">
        <div className={`task-name ${task.done ? 'task-name--done' : ''}`}>{task.name}</div>
        <div className="task-sub">{task.sub}</div>
      </div>
      <span className={`task-hint ${task.done ? 'task-hint--done' : ''}`} aria-hidden="true">{task.done ? 'done' : 'tap'}</span>
    </div>
  )
}

function OrbsRow({ tasks }) {
  const done = tasks.filter(t => t.done).length
  const total = tasks.length
  const label =
    done === 0     ? 'take it step by step'   :
    done === total ? 'all done — well done'    :
    done === 1     ? 'a gentle start'          :
    done >= total - 1 ? 'almost there, softly' :
                    'keep going, no rush'

  return (
    <div className="orbs-row" aria-label={`${done} of ${total} tasks complete`}>
      {tasks.map(t => (
        <div key={t.id} className={`orb ${t.done ? 'orb--lit' : ''}`} />
      ))}
      <span className="orbs-label">{label}</span>
    </div>
  )
}

export default function RoutineScreen() {
  const { tasks, completeTask, navigate, showToast, toast } = useApp()
  const done  = tasks.filter(t => t.done).length
  const total = tasks.length
  const progressPct = total ? Math.round((done / total) * 100) : 0

  const handleTap = (task, index) => {
    completeTask(task.id)
    if (!task.done) {
      showToast(MICROCOPY[index % MICROCOPY.length])
    }
  }

  useEffect(() => {
    if (done === total && total > 0) {
      const timer = setTimeout(() => navigate('done'), 900)
      return () => clearTimeout(timer)
    }
  }, [done, total, navigate])

  const hour = new Date().getHours()
  const greeting = hour < 18 ? 'Good afternoon' : hour < 21 ? 'Good evening' : 'Winding down'

  return (
    <div className="screen">
      <div className="routine-header">
        <div className="routine-title-row">
          <div>
            <div className="routine-greeting">{greeting}</div>
            <h1 className="serif routine-title">
              Tonight's routine
            </h1>
          </div>
          <button
            type="button"
            className="routine-edit-btn"
            onClick={() => navigate('customize')}
            aria-label="Edit routine"
          >
            <EditIcon /> Edit routine
          </button>
        </div>
        <div className="routine-flow" aria-label="Input process output flow">
          <span className="routine-flow__step routine-flow__step--active">tap a task</span>
          <span className="routine-flow__arrow">→</span>
          <span className="routine-flow__step">system updates</span>
          <span className="routine-flow__arrow">→</span>
          <span className="routine-flow__step">completion screen</span>
        </div>
      </div>

      <div className="routine-progress-card">
        <div className="routine-progress-top">
          <OrbsRow tasks={tasks} />
          <div className="routine-progress-count">{done}/{total}</div>
        </div>
        <div className="routine-progress-track" aria-hidden="true">
          <div className="routine-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="routine-caption">
        Tap a task once to mark it complete. The app updates the checklist immediately.
      </div>

      <div className="routine-list">
        {tasks.map((task, i) => (
          <TaskItem
            key={task.id}
            task={task}
            index={i}
            onTap={() => handleTap(task, i)}
          />
        ))}
      </div>

      {toast.visible && (
        <div className="toast" role="alert" aria-live="polite">
          {toast.text}
        </div>
      )}

      <TabBar />
    </div>
  )
}
