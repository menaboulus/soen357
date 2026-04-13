const http = require('http')
const fs = require('fs')
const fsp = require('fs/promises')
const path = require('path')
const { URL } = require('url')

const PORT = Number(process.env.PORT) || 3001
const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const DATA_DIR = path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'state.json')

const DEFAULT_CUSTOM_TASKS = [
  { id: 1, icon: '💡', name: 'Dim the lights', sub: 'ease your eyes into evening', done: false },
  { id: 2, icon: '📵', name: 'Put phone face-down', sub: 'the world can wait till morning', done: false },
  { id: 3, icon: '🪥', name: 'Brush your teeth', sub: 'a small act of care', done: false },
  { id: 4, icon: '📖', name: 'Read a few pages', sub: "let someone else's words carry you", done: false },
  { id: 5, icon: '🌿', name: 'Make herbal tea', sub: 'something warm, something slow', done: false },
  { id: 6, icon: '🖊️', name: 'Write one thought down', sub: 'empty the mind, gently', done: false },
  { id: 7, icon: '🌙', name: 'Settle into bed', sub: 'you made it here', done: false },
]

const DEFAULT_STATE = {
  customTasks: DEFAULT_CUSTOM_TASKS,
  evaluation: null,
}

let appState = readStateFromDisk()
let webDir = fs.existsSync(DIST_DIR) ? DIST_DIR : null

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function normalizeTask(task, index) {
  return {
    id: task && task.id !== undefined ? task.id : Date.now() + index,
    icon: typeof task?.icon === 'string' && task.icon.trim() ? task.icon : '✦',
    name: typeof task?.name === 'string' && task.name.trim() ? task.name : `Task ${index + 1}`,
    sub: typeof task?.sub === 'string' && task.sub.trim() ? task.sub : 'your addition',
    done: Boolean(task?.done),
  }
}

function normalizeState(rawState) {
  const source = rawState && typeof rawState === 'object' && !Array.isArray(rawState)
    ? rawState
    : DEFAULT_STATE

  return {
    customTasks: Array.isArray(source.customTasks)
      ? source.customTasks.map((task, index) => normalizeTask(task, index))
      : clone(DEFAULT_CUSTOM_TASKS),
    evaluation: source.evaluation && typeof source.evaluation === 'object' && !Array.isArray(source.evaluation)
      ? source.evaluation
      : null,
  }
}

function readStateFromDisk() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    return normalizeState(JSON.parse(raw))
  } catch {
    return clone(DEFAULT_STATE)
  }
}

async function writeStateToDisk(nextState) {
  appState = normalizeState(nextState)
  await fsp.mkdir(DATA_DIR, { recursive: true })
  await fsp.writeFile(DATA_FILE, `${JSON.stringify(appState, null, 2)}\n`, 'utf8')
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(payload))
}

function sendText(res, statusCode, message, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(statusCode, { 'Content-Type': contentType })
  res.end(message)
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8'
    case '.js': return 'text/javascript; charset=utf-8'
    case '.css': return 'text/css; charset=utf-8'
    case '.json': return 'application/json; charset=utf-8'
    case '.svg': return 'image/svg+xml'
    case '.png': return 'image/png'
    case '.jpg':
    case '.jpeg': return 'image/jpeg'
    case '.webp': return 'image/webp'
    case '.ico': return 'image/x-icon'
    case '.map': return 'application/json; charset=utf-8'
    default: return 'application/octet-stream'
  }
}

function serveStaticFile(res, requestPath) {
  if (!webDir || !fs.existsSync(webDir)) return false

  const sanitizedPath = requestPath === '/' ? '/index.html' : requestPath
  const candidatePath = path.resolve(webDir, `.${sanitizedPath}`)

  if (!candidatePath.startsWith(webDir)) return false

  if (fs.existsSync(candidatePath) && fs.statSync(candidatePath).isFile()) {
    res.writeHead(200, { 'Content-Type': getMimeType(candidatePath) })
    fs.createReadStream(candidatePath).pipe(res)
    return true
  }

  const indexPath = path.join(webDir, 'index.html')
  if (fs.existsSync(indexPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    fs.createReadStream(indexPath).pipe(res)
    return true
  }

  return false
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0

    req.on('data', chunk => {
      size += chunk.length
      if (size > 1_000_000) {
        reject(new Error('Request body too large'))
        req.destroy()
        return
      }

      chunks.push(chunk)
    })

    req.on('end', () => {
      if (!chunks.length) {
        resolve(null)
        return
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', reject)
  })
}

async function handleApiRequest(req, res, pathname) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return true
  }

  if (req.method === 'GET' && pathname === '/api/health') {
    sendJson(res, 200, { ok: true })
    return true
  }

  if (req.method === 'GET' && pathname === '/api/state') {
    sendJson(res, 200, appState)
    return true
  }

  if (req.method === 'PUT' && pathname === '/api/custom-tasks') {
    const body = await readRequestBody(req)

    if (!Array.isArray(body)) {
      sendJson(res, 400, { error: 'Expected an array of custom tasks.' })
      return true
    }

    await writeStateToDisk({
      ...appState,
      customTasks: body.map((task, index) => normalizeTask(task, index)),
    })

    sendJson(res, 200, { ok: true, customTasks: appState.customTasks })
    return true
  }

  if (req.method === 'PUT' && pathname === '/api/evaluation') {
    const body = await readRequestBody(req)

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      sendJson(res, 400, { error: 'Expected an evaluation object.' })
      return true
    }

    await writeStateToDisk({
      ...appState,
      evaluation: { ...body },
    })

    sendJson(res, 200, { ok: true, evaluation: appState.evaluation })
    return true
  }

  if (req.method === 'DELETE' && pathname === '/api/evaluation') {
    await writeStateToDisk({
      ...appState,
      evaluation: null,
    })

    sendJson(res, 200, { ok: true })
    return true
  }

  return false
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url || '/', 'http://127.0.0.1')

    if (requestUrl.pathname.startsWith('/api/')) {
      const handled = await handleApiRequest(req, res, requestUrl.pathname)
      if (!handled) {
        sendJson(res, 404, { error: 'Not found' })
      }
      return
    }

    if (req.method === 'GET' && serveStaticFile(res, requestUrl.pathname)) {
      return
    }

    if (fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
      serveStaticFile(res, '/')
      return
    }

    sendText(res, 200, 'CalmSleep backend is running. Build the app with npm run build to serve the frontend from this process.')
  } catch {
    sendJson(res, 500, { error: 'Internal server error' })
  }
})

  server.listen(PORT, () => {
    console.log(`CalmSleep backend listening on http://127.0.0.1:${PORT}`)
  })