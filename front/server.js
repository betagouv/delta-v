/* eslint-disable no-console */
/* eslint-disable global-require */
const path = require('path');

const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const bootstrap = async () => {
  try {
    const app = express();
    const dir = path.join(__dirname, 'build');

    app.use(expressStaticGzip(dir));

    app.get('/*', (req, res) => {
      res.set('Cache-control', 'public, max-age=600');
      console.log(req.url);
      res.sendFile(path.join(dir, 'index.html'));
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => console.log(`Front app is running on the port ${PORT} `));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

bootstrap();
