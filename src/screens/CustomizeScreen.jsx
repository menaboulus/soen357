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

function ArrowButton({ direction, onClick, disabled, label }) {
  return (
    <button
      type="button"
      className="reorder-btn"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {direction === 'up' ? '↑' : '↓'}
    </button>
  )
}

function CustomizeItem({ task, index, onRemove, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
  return (
    <div className="customize-item" style={{ animationDelay: `${index * 0.055}s` }}>
      <DragHandle />
      <span style={{ fontSize: 17 }} role="img" aria-hidden="true">{task.icon}</span>
      <span style={{ flex: 1, fontSize: 14, color: 'var(--t1)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {task.name}
      </span>
      <div className="customize-item__controls" aria-label={`Reorder ${task.name}`}>
        <ArrowButton direction="up" onClick={() => onMoveUp(task.id, -1)} disabled={!canMoveUp} label={`Move ${task.name} up`} />
        <ArrowButton direction="down" onClick={() => onMoveDown(task.id, 1)} disabled={!canMoveDown} label={`Move ${task.name} down`} />
      </div>
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
  const { customTasks, addCustomTask, removeCustomTask, moveCustomTask, saveCustom } = useApp()
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
        <h1 className="section-title">Edit routine</h1>
        <p className="section-subtitle">Add tasks, remove tasks, and change the order to match how you want to wind down.</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
        <div className="customize-summary">
          <span className="customize-summary__label">Current tasks</span>
          <span className="customize-summary__count">{customTasks.length}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 12 }}>
          {customTasks.map((task, i) => (
            <CustomizeItem
              key={task.id}
              task={task}
              index={i}
              onRemove={removeCustomTask}
              onMoveUp={moveCustomTask}
              onMoveDown={moveCustomTask}
              canMoveUp={i > 0}
              canMoveDown={i < customTasks.length - 1}
            />
          ))}
          {customTasks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--t4)', fontSize: 13, fontStyle: 'italic' }}>
              Your routine is empty — add something below.
            </div>
          )}
        </div>

        <div className="customize-actions">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add something gentle..."
            maxLength={45}
            className="field__input"
            aria-label="New task name"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="btn btn--ghost customize-add-btn"
          >
            Add
          </button>
        </div>

        <button className="btn btn--primary" onClick={saveCustom} style={{ margin: '4px 0 14px' }}>
          Save my routine
        </button>
      </div>

      <TabBar />
    </div>
  )
}
