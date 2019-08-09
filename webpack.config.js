const path = require("path");

const sharedConfig = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "dist/"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: "source-map"
};

module.exports = [
  {
    ...sharedConfig,
    entry: path.resolve(__dirname, "./src/main"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js"
    },
    target: "electron-main",
    externals: {
      "firebase-admin": 'require("firebase-admin")'
    }
  },
  {
    ...sharedConfig,
    entry: path.resolve(__dirname, "./src/renderer"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "renderer.js"
    },
    target: "electron-renderer"
  }
];
