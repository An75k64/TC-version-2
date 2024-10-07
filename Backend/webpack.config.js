const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./server.js", // Entry point for the application
  target: "node", // Target Node.js environment
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output file name
  },
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  devtool: "source-map", // Enable source maps for debugging
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JS files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use Babel for transpilation
          options: {
            presets: ["@babel/preset-env"], // Use the preset for modern JS features
          },
        },
      },
    ],
  },
  
 // watch: process.env.NODE_ENV !== "production", // Enable watch mode in development
};
