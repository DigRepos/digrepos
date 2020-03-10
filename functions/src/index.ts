import * as functions from "firebase-functions"
import next from "next"
// import Cors from "micro-cors"

const app = next({
  dev: process.env.NODE_ENV !== "production",
  conf: { distDir: ".next" }
})
// const cors = Cors({
//   allowMethods: ["GET", "HEAD", "OPTIONS", "POST"]
// })
const handle = app.getRequestHandler()

export const nextApp = functions.https.onRequest((req, res) => {
  console.log("page url ", req.originalUrl)
  return app.prepare().then(() => handle(req, res))
})
