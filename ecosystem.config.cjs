const path = require("path")

module.exports = {
  apps: [
    {
      name: "express-api",
      script: "server.js",
      cwd: path.resolve(__dirname),
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "development",
        PORT: 8000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8000,
      },
      log_file: "./logs/combined.log",
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,
      ignore_watch: ["node_modules", "logs"],
    },
  ],
}
