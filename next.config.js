const webpack = require("webpack")
require("dotenv").config()

function webpackConfig(config) {
  config.plugins = config.plugins || []
  config.plugins = [
    ...config.plugins,
    new webpack.EnvironmentPlugin({
      FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      FIREBASE_APP_ID: JSON.stringify(process.env.FIREBASE_APP_ID)
    })
  ]
  return config
}

module.exports = {
  target: "server",
  webpack: webpackConfig
}
