self.addEventListener('message', function(event) {
  self.postMessage('Hello from the worker!');
});

