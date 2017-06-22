var proxyMiddleware = require('http-proxy-middleware');//代理服务器
var path = require('path');//路径中间件
var express = require('express');//框架
var opn = require('opn');//浏览器打开地址
var app = express();//web框架
var port = 6060;//端口

app.use(express.static(path.join(__dirname,'../client')));//静态目录
//代理服务器
var proxyTable = {
	'/shop/': {
		target: 'http://10.141.139.159:18604/shop/',
		changeOrigin: true,
		pathRewrite: {
			'^/shop/': ''
		}
	}
};
Object.keys(proxyTable).forEach(function(key){
	const options = proxyTable[key];
	typeof options=='string'&&(options={target: options});
	app.use(proxyMiddleware(key,options));
});
app.listen(port,function(e){
	console.log(`server start at http://localhost:${port}`);
	opn(`http://localhost:${port}`);
});