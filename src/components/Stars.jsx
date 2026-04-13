import { useMemo } from 'react'

export default function Stars({ count = 22 }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      top:   `${Math.random() * 100}%`,
      left:  `${Math.random() * 100}%`,
      size:  i % 5 === 0 ? 2 : 1,
      dur:   `${2.2 + i * 0.14}s`,
      delay: `${i * 0.27}s`,
    })),
  [count])

  return (
    <>
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            '--dur':   s.dur,
            '--delay': s.delay,
          }}
        />
      ))}
    </>
  )
}
