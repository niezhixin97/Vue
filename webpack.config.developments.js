/**
 * 在这个文件中设置我们自定义的打包规则
 * 所有的规则都写在 module.exports={}中
 */
let path=require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');//=>每一个导进来的插件都是一个类
let MiniCssExtractPlugin =  require('mini-css-extract-plugin');
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
let  UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin') 
module.exports={
   //=>配置优化规则
   optimization:{
      //=>压缩优化
      minimizer:[
          //=>压缩CSS的插件
          new OptimizeCssAssetsWebpackPlugin(),
          new UglifyjsWebpackPlugin({
              cache:true, //=>是否使用缓存
              parallel:true, //=>是否是并发编译
              sourceMap:true//启动源码映射
          })

      ]
   },

     //=>配置环境
        mode:'production',
        //=>入口
        entry:'./src/index-my.js',
        
        output:{
            //=>输出的文件名
            filename:'bundle.min.js', //让每一次生成的文件名都带着HASH值
            //=>输出目录必须是绝对路径
            path: path.resolve(__dirname,'build')
        },
         //=>关于webpack-dev-server的一些配置 执行命令 ：webpack-dev-server  --config xxx.js
        //=>服务启动后默认不关闭，当我们修改src中的文件时，他会自动进行编译，然后自动刷新浏览器
        devServer:{
            port:3000,   //=>端口号创建服务
            progress:true, //=>显示打包编译的进度
            contentBase:'./build',//=>指定当前服务处理资源目录
            open:true //=>编译完会自动打开浏览器

        },
            //=>使用插件（数组）
            plugins:[
                new HtmlWebpackPlugin({
                    //=>不指定模板会按照默认模板创建一个HTML页面，当然 真实项目中一般都是把自己写好的HTML进行编译
    
                    template:'./src/index.html',
                    //=>输出的文件名
                    filename:'index.html',
                    //=>让我们引入的JS后面加上HASH戳(清除缓存)真实项目中我们一般都是每一次编译生成不同的JS文件引入
                  //  hash:true
    
                  //=>控制压缩
                  minify:{
                      collapsewhitespace:true,
                      removeComments:true,
                      removeAttributeQuotes:true,
                      removeEmptyAttributes:true
                  }
                }),
                new MiniCssExtractPlugin({
                    //=>指定输出的文件名
                    filename:'main.min.css',
                })
            ],
         

            //=>使用加载器loader来处理规则
            //=>loader是有顺序的，代码从下往上执行
          module:{
              rules:[{
                  test:/\.(css|less)$/, //=>基于正则匹配处理哪些文件
                  use:[
                      //=>通过外链link的方式导入到HTML
                      MiniCssExtractPlugin.loader,
                 //     "style-loader",//=>将编译好的css插入到页面head中(内嵌式样式)
                      "css-loader",//=>编译解析@import/url()这种语法
                   //    "postcss-loader",//=>设置前缀
                   {
                       loader:"postcss-loader",
                       options:{
                           ident:"postcss",
                           plugins:[
                               require("autoprefixer")
                           ]
                       }
                   },
                   "less-loader"
                      //=>编译LESS
                  /*    {
                           loader:,
                           options:{
                               //=>加载额外的配置项
                           }
                       }*/
                    ]//=>使用哪一个加载器<=>控制使用的loader
              }]
          }  
   
 };