import { useState } from 'react'
import { useApp } from '../store/AppStore'
import TabBar from '../components/TabBar'

function DragHandle() {
  return (
    <div className="drag-handle" aria-hidden="true">
      <div className="drag-dot-row">
        <div className="drag-dot" /><div className="drag-dot" />
      </div>
      <div className="drag-dot-row">
        <div className="drag-dot" /><div className="drag-dot" />
      </div>
    </div>
  )
}

function CustomizeItem({ task, index, onRemove }) {
  return (
    <div className="customize-item" style={{ animationDelay: `${index * 0.055}s` }}>
      <DragHandle />
      <span style={{ fontSize: 17 }} role="img" aria-hidden="true">{task.icon}</span>
      <span style={{ flex: 1, fontSize: 14, color: 'var(--t1)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {task.name}
      </span>
      <button
        className="remove-btn"
        onClick={() => onRemove(task.id)}
        aria-label={`Remove ${task.name}`}
      >
        ×
      </button>
    </div>
  )
}

export default function CustomizeScreen() {
  const { customTasks, addCustomTask, removeCustomTask, saveCustom } = useApp()
  const [input, setInput] = useState('')

  const handleAdd = () => {
    if (!input.trim()) return
    addCustomTask(input)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="screen">
      <div className="section-header">
        <div className="section-eyebrow">Make it yours</div>
        <h1 className="section-title">Your routine</h1>
        <p className="section-subtitle">Keep only what feels right for you.</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
        {/* Task List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 12 }}>
          {customTasks.map((task, i) => (
            <CustomizeItem
              key={task.id}
              task={task}
              index={i}
              onRemove={removeCustomTask}
            />
          ))}
          {customTasks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--t4)', fontSize: 13, fontStyle: 'italic' }}>
              Your routine is empty — add something below.
            </div>
          )}
        </div>

        {/* Add Task */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add something gentle..."
            maxLength={45}
            className="field__input"
            style={{ flex: 1 }}
            aria-label="New task name"
          />
          <button
            onClick={handleAdd}
            style={{ padding: '10px 16px', borderRadius: 10, border: '0.5px solid var(--brd2)', background: 'rgba(108,99,212,0.14)', color: 'var(--acc3)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--sans)', flexShrink: 0, transition: 'all 0.2s', whiteSpace: 'nowrap' }}
          >
            Add
          </button>
        </div>

        <button className="btn btn--primary" onClick={saveCustom} style={{ marginBottom: 14 }}>
          Save my routine
        </button>
      </div>

      <TabBar />
    </div>
  )
}
