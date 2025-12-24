// server.js
const { createServer } = require('node:https');
const { parse } = require('node:url');
const next = require('next');
const fs = require('node:fs');
const path = require('node:path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Load SSL certs
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, './certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './certs/cert.pem')),
};

const PORT = process.env.PORT || 3002;

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  }).listen(PORT, () => {
    console.log(`> HTTPS Ready on https://admin.pricesmach.test:${PORT}`);
  });
});
