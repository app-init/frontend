import webpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import shell from 'shelljs'
import { resolve } from 'path'

import webpackDevConfig from '../webpack/webpack.dev'
import webpackProdConfig from '../webpack/webpack.prod'
import configDevServer from '../webpack/webpack.server'

import parseArgs from './parse-args'

export function cli(args) {
  let command = shell.exec('appinit config get variables', {silent: true})
  let routes = JSON.parse(command)['route-configs']
  
  let options = parseArgs(args)
  let webpackConfig = options.production ? webpackProdConfig : webpackDevConfig

  let statsOptions = {
    excludeAssets: [
      /.+\.(ttf|eot|svg|woff|woff2)/
    ],
    modules: false,
    chunks: false,
    chunckModules: false,
    timings: true,
    warnigns: false,
    colors: true
  }

  if (options.analyze) {
    let analyzer = new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      // statsOptions: statsOptions
    })
    webpackConfig.plugins.push(analyzer)
  }

  for (let i in routes) {
    let routeConfig = routes[i].frontend
    if (routes[i].active) {
      webpackConfig.resolve.alias[routeConfig.name] = resolve(routeConfig.path)
    }
  }
  
  let env = {
    'NODE_ENV': options.production ? JSON.stringify('production') : JSON.stringify('development')
  }

  let DefinePlugin = new webpack.DefinePlugin(env)
  webpackConfig.plugins.push(DefinePlugin)
  
  let compiler = webpack(webpackConfig)

  if (options.debug) {
    console.log(webpackConfig)
  }
  
  let compilerCallback = (err, stats) => {
    console.log(stats.toString(statsOptions))
  }

  if (options.production || options.build) {
    compiler.run(compilerCallback)
  } else {
    let server = new webpackDevServer(compiler, configDevServer)
    server.listen(options.port, "localhost", function() {})
  }
}
