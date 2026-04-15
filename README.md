# 🌙 CalmSleep

> **A sleep companion app focused on habit formation and calmness — not performance tracking.**

CalmSleep replaces anxiety-inducing sleep scores and dashboards with a gentle, routine-centered bedtime experience. Built with React + Vite. Designed for university students and young professionals who want better sleep without the stress of traditional tracking apps.

---

## ✨ Features

- **9 fully interactive screens** — Sign In, Welcome, Routine, Completion, Analytics, Devices, Evaluation, Customize, Profile
- **Calm routine checklist** — 7 tappable tasks with spring animations and gentle microcopy
- **No scores, no graphs, no gamification** — intentionally metric-free by design
- **Device integration UI** — Apple Watch, Whoop, Oura Ring, Samsung, Fitbit
- **Sleep analytics** — gentle framing, no evaluative language
- **Breathing exercise** — 4-2-4-2 paced breathing on completion
- **Routine customization** — add, remove tasks
- **HCI Evaluation screen** — 4 Likert-scale questions for user study support
- **Fully responsive** — works on mobile browsers and desktop
- **Accessible** — ARIA roles, keyboard navigation, semantic HTML

---

## 🖼️ Screens

| Screen | Description |
|---|---|
| Sign In / Sign Up | Auth with Google & Apple social buttons |
| Welcome | Animated moon, calm onboarding |
| Routine | Main checklist with orb progress |
| Completion | Breathing exercise, evaluation CTA |
| Analytics | Sleep stage chart, metric cards |
| Devices | Connect wearables |
| Evaluation | 4-question Likert scale for user studies |
| Customize | Add/remove routine tasks |
| Profile | User nav hub |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/calmsleep.git
cd calmsleep

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to deploy on GitHub Pages, Vercel, or Netlify.

---

## 🌐 Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

Or use the included GitHub Actions workflow — just push to `main` and it deploys automatically.

---

## 🏗️ Project Structure

```
calmsleep/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── TabBar.jsx          # Bottom navigation
│   │   ├── StatusBar.jsx       # Live clock + icons
│   │   └── Stars.jsx           # Ambient background
│   ├── screens/
│   │   ├── SignInScreen.jsx
│   │   ├── WelcomeScreen.jsx
│   │   ├── RoutineScreen.jsx   # ← Main screen
│   │   ├── DoneScreen.jsx
│   │   ├── AnalyticsScreen.jsx
│   │   ├── DevicesScreen.jsx
│   │   ├── EvaluationScreen.jsx
│   │   ├── CustomizeScreen.jsx
│   │   └── ProfileScreen.jsx
│   ├── store/
│   │   └── AppStore.jsx        # Global state (React Context)
│   ├── App.jsx                 # Router
│   ├── main.jsx                # Entry point
│   └── index.css               # Design system + animations
├── vite.config.js
├── package.json
└── README.md
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0a0815` | App background |
| `--bg2` | `#120f22` | Phone frame |
| `--bg3` | `#1a1730` | Input backgrounds |
| `--card` | `#1e1b34` | Card surfaces |
| `--acc` | `#6c63d4` | Primary accent (indigo) |
| `--acc3` | `#a89ff0` | Light accent, active states |
| `--t1` | `#ede9ff` | Primary text |
| `--t3` | `#7b78a0` | Secondary text |
| `--teal2` | `#5dbaa3` | Connected/success states |

### Typography
- **Display**: DM Serif Display — used for all headlines
- **Body**: DM Sans — all UI text, labels, microcopy
- **Weights**: 300, 400, 500 only (intentionally calm)

### Animations
- `fadeUp` — standard screen content entrance
- `scaleIn` — completion mark, modals
- `checkPop` — spring-physics checkbox
- `moonFloat` — gentle welcome illustration
- `pulseRing` — completion screen ambient glow
- `twinkle` — background star field

---

## 🧠 HCI Principles Applied

| Principle | Implementation |
|---|---|
| **Calm Technology** (Weiser & Brown) | No interruptions, peripherally-visible toast messages, optional analytics |
| **Cognitive Load Reduction** (Sweller) | Single hue palette, max 3 typography sizes per screen, ≤7 tasks (Miller's Law) |
| **Habit Formation** (Fogg) | Identical nightly routine, gentle reinforcement, no escalation |
| **Fitts's Law** | Full-width tap targets, large touch areas on all interactive elements |
| **Norman's Action Cycle** | Immediate visible feedback on every tap, clear affordances |

---

## 📋 Evaluation / User Study Support

The **Evaluation screen** (`EvaluationScreen.jsx`) provides 4 validated Likert-scale questions designed for HCI user studies:

1. *Using this app tonight made me feel calm.* (1–5)
2. *Completing this routine reduced my pre-sleep stress.* (1–5)
3. *The routine was easy to follow without much thinking.* (1–5)
4. *I would like to use this routine again tomorrow night.* (1–5)

Plus an optional open-text field. Suitable for:
- Think-aloud usability studies
- Diary studies (5–7 nights)
- Expert heuristic evaluation
- Pre/post stress measurement

---

## 🔧 Customization

### Adding a new screen

1. Create `src/screens/YourScreen.jsx`
2. Add it to `SCREEN_MAP` in `src/App.jsx`
3. Add navigation via `navigate('your-screen')` from `useApp()`

### Changing the task list

Edit `DEFAULT_TASKS` in `src/store/AppStore.jsx`:

```js
export const DEFAULT_TASKS = [
  { id: 1, icon: '💡', name: 'Dim the lights', sub: 'ease your eyes into evening', done: false },
  // Add your own tasks here
]
```

### Changing the color theme

All design tokens are CSS custom properties in `src/index.css`:

```css
:root {
  --acc: #6c63d4;   /* Change primary accent */
  --bg:  #0a0815;   /* Change base background */
  /* ... */
}
```

---

## 📄 License

MIT — free to use, modify, and distribute.

---

## 🙏 Credits

Designed and built as part of a university HCI course project exploring calm technology principles in mobile sleep applications.

- Typography: [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts
- Framework: [React 18](https://react.dev) + [Vite](https://vitejs.dev)
- Inspired by: Calm Technology principles (Mark Weiser & John Seely Brown, 1996)

---

<p align="center">Made with care for your rest 🌙</p>
