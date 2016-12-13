const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config.js')

const host = '0.0.0.0'
const port = 8080

const app = express()

const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
	publicPath: config.output.publicPath,
    https: true,
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    },
})

app.set('view engine', 'jade')
app.set('views', './views')

app.use(middleware)
app.use(webpackHotMiddleware(compiler))

app.get('/', (req, res) => res.render('sample.jade'))

app.listen(port, host, (err) => {
  if(err)
      console.log(err);

  console.log(`listening on port ${port}`);
});
