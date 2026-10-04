// Vercel Web Analytics initialization
(function() {
  // Initialize the queue
  if (typeof window !== 'undefined' && !window.va) {
    window.va = function() {
      (window.vaq = window.vaq || []).push(arguments);
    };
  }
  
  // Inject the analytics script
  var script = document.createElement('script');
  script.src = '/_vercel/insights/script.js';
  script.defer = true;
  script.setAttribute('data-sdkn', '@vercel/analytics');
  script.setAttribute('data-sdkv', '2.0.1');
  document.head.appendChild(script);
})();
