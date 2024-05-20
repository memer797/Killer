self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'START_WEBSOCKET') {
    startWebSocket(event.data.url);
  }
});

let ws;

function startWebSocket(url) {
  ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket connection opened');
    // Start keep-alive pinging
    keepAlivePing();
  };

  ws.onmessage = event => {
    console.log('WebSocket message received:', event.data);
  };

  ws.onclose = event => {
    console.log('WebSocket connection closed', event);
  };

  ws.onerror = error => {
    console.error('WebSocket error', error);
  };
}

function keepAlivePing() {
  setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send('KEEP_ALIVE');
    }
  }, 20000); // 20 seconds
}
