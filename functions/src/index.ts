import * as functions from "firebase-functions"
import next from "next"

const app = next({
  dev: process.env.NODE_ENV !== "production",
  conf: { distDir: ".next" }
})
const handle = app.getRequestHandler()

export const nextApp = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  console.log("page url ", req.originalUrl)
  return app.prepare().then(() => handle(req, res))
})
