const path = require('path');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const loadModeConfig = env =>require(`./build-inits/webpack.${env.mode}.config`)(env);


module.exports = env =>webpackMerge({ 
  mode: env.mode,
    context:path.resolve(__dirname,'src'),
    mode:'production',   
    entry:'./index.js', 
    output: {
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js'
    },

    module: {
        rules: [
          { test: /\.js$/, 
            exclude: /node_modules/, 
            use: ["babel-loader"]   //чтобы стандартизировать    
        },
        {
        test: /\.(gif|jpe?g|svg)$/i,
        use:[
          {
            loader:'url-loader',
            options:{
              name:'[path]/[name].[ext]',
            limit:5000            
          }
          }
        ]
        },
        // { test: /\.html$/i,
        //   loader: 'html-loader', 
        // },
        { test: /\.hbs$/, 
          loader: "handlebars-loader" 
        },
        ] 
      },
      plugins:[
      new CleanWebpackPlugin(), new FriendlyErrorsWebpackPlugin(), new WebpackBar()],    
},loadModeConfig(env));