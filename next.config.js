module.exports = {
  target: "server",
  distDir:
    process.env.NODE_ENV === "production" ? "dist/functions/.next" : ".next"
}
