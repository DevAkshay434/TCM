const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // Optional for bundle analysis
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production', // Enable tree-shaking & optimizations
  entry: './src/index.js', // Main entry point of the app
  output: {
    filename: '[name].[contenthash].bundle.js', // Cache-friendly output
    path: path.resolve(__dirname, 'build'), // Build folder
    publicPath: '/', // Necessary for React Router routing
    clean: true, // Clean /build folder on every build
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // Code splitting for shared modules
    },
    runtimeChunk: 'single', // Separate runtime chunk to improve caching
    minimizer: [
      new TerserPlugin({ parallel: true }), // Minify JS
      new CssMinimizerPlugin(), // Minify CSS
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // Resolve JS and JSX files
    alias: {
      '@components': path.resolve(__dirname, 'src/Component'), // Aliases for cleaner imports
      '@layout': path.resolve(__dirname, 'src/Layout'),
      '@pages': path.resolve(__dirname, 'src/Pages'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Handle JS and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-syntax-dynamic-import'], // Enable lazy loading
          },
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|webp|svg)$/, // Handle image assets
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/, // Handle fonts
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template
      favicon: './public/download.png', // Optional favicon
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Cache-friendly CSS
    }),
    new BundleAnalyzerPlugin(), // Optional: Analyze bundle size
  ],
  devServer: {
    historyApiFallback: true, // Support React Router
    static: path.join(__dirname, 'public'), // Serve static files
    compress: true,
    port: 3000, // Dev server port
    open: true, // Open in browser automatically
  },
};
