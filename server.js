const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Serve static assets
app.use(express.static(__dirname));

// Fallback for HTML pages or root
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Lumière Beauty Studio running on http://${HOST}:${PORT}`);
});
