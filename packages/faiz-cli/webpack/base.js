module.exports = function() {
  const baseConfig = {
    mode: 'development',
    entry: './index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
            compilerOptions: {
              module: 'es2015'
            },
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          loader: ['vue-style-loader', 'css-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [],
    resolve: {},
    output: {
      filename: 'index.min.js',
      path: path.resolve(__dirname, 'dist'),
    },
  }
  return baseConfig
}