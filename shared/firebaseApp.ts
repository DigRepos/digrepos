import * as firebase from "firebase/app"

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID
}

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app()

  export default app
