import { spawn } from 'child_process';
import http from 'http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const BASE_URL = 'http://127.0.0.1:4173';

const routes = [
  '/',
  '/projects',
  '/projects/ladestack',
  '/projects/gb-coder',
  '/blog',
  '/blog/designing-local-first-web-applications',
  '/about',
  '/contact',
  '/unknown-page-test-404'
];

async function fetchJson(endpoint) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${PORT}${endpoint}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('=== CHROME DEVTOOLS BROWSER AUDIT ===');
  console.log('Launching headless Chrome with remote debugging on port 9222...');

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    `${BASE_URL}/`
  ]);

  let targetWs = null;
  for (let i = 0; i < 20; i++) {
    await sleep(300);
    try {
      const targets = await fetchJson('/json');
      const page = targets.find(t => t.type === 'page');
      if (page && page.webSocketDebuggerUrl) {
        targetWs = page.webSocketDebuggerUrl;
        break;
      }
    } catch {}
  }

  if (!targetWs) {
    console.log('Failed to connect to Chrome CDP WebSocket');
    chromeProc.kill();
    process.exit(1);
  }

  console.log('Connected to Chrome DevTools Protocol target:', targetWs);
  const ws = new WebSocket(targetWs);

  const errors = [];
  const networkFailures = [];
  let reqId = 1;

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = reqId++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener('message', handler);
          resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  // Enable DevTools domains
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Network.enable');

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.consoleAPICalled') {
      const type = data.params.type;
      const text = data.params.args.map(a => a.value || a.description || '').join(' ');
      if (type === 'error' || type === 'warning') {
        errors.push({ type: `console.${type}`, text });
      }
    } else if (data.method === 'Log.entryAdded') {
      if (data.params.entry.level === 'error' || data.params.entry.level === 'warning') {
        errors.push({ type: `log.${data.params.entry.level}`, text: data.params.entry.text });
      }
    } else if (data.method === 'Network.responseReceived') {
      const res = data.params.response;
      if (res.status >= 400) {
        networkFailures.push({ url: res.url, status: res.status });
      }
    }
  });

  console.log('Auditing routes across SPA...');
  for (const route of routes) {
    console.log(`Auditing route: ${route}`);
    await send('Page.navigate', { url: `${BASE_URL}${route}` });
    await sleep(600);
  }

  console.log('\n--- BROWSER AUDIT SUMMARY ---');
  console.log(`Console errors/warnings: ${errors.length}`);
  if (errors.length > 0) {
    console.table(errors);
  }

  console.log(`Network failures (>=400): ${networkFailures.length}`);
  if (networkFailures.length > 0) {
    console.table(networkFailures);
  }

  ws.close();
  chromeProc.kill();
  console.log('Chrome closed.');
}

run().catch(err => {
  console.error('Audit script error:', err);
  process.exit(1);
});
