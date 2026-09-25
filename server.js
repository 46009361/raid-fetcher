import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;
const ALLOWED_HOST = 'share.redd.it';

app.use(cors({
  origin: `https://${ALLOWED_HOST}`,        // only this origin allowed
  methods: ['GET'],                    // only these methods
  allowedHeaders: ['Content-Type'],    // only these request headers
}));

app.get('/preview/user/*/achievement/*', async (req, res) => {
  const targetUrl = new URL(`https://${ALLOWED_HOST}${req.originalUrl}`);

  // Defense in depth: confirm the parsed URL actually points where we expect
  if (targetUrl.hostname !== ALLOWED_HOST) {
    return res.status(400).end();
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Accept-Language': req.headers['accept-language'],
        'User-Agent': `web:4600936.uno:v3.0.1 (by /u/46009361) contact ${process.env.EMAIL}`
      }
    });

    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    res.status(response.status).send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

app.listen(PORT, '::', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
