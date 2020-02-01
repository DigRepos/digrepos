import * as functions from "firebase-functions"
import next from "next"
import * as path from "path"

let dev = process.env.NODE_ENV !== "production"
dev = false
const app = next({ dev, conf: { distDirs: `${path.relative(process.cwd(), __dirname)}/.next` } })
const handle = app.getRequestHandler()

export const nextApp = functions.https.onRequest((req, res) => {
  console.log("page url ", req.originalUrl)
  return app.prepare().then(() => handle(req, res))
})
