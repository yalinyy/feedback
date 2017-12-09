/*
* @Author: Administrator
* @Date:   2017-12-09 20:48:13
* @Last Modified by:   yangyalin
* @Last Modified time: 2017-12-09 22:56:41
*/
// 请求express模块
const  express=require('express')
// 请求模板引擎
const expressArtTemplate=require('express-art-template')
// 引入comment.js
const comment =require('./comment.js')

// 解析表单POST请求体数据
const bodyParser=require('body-parser')

const  app=express()
// 把nodemodules给开放
app.use('/node_modules/',express.static('./node_modules/'))

// /配置使用art-template模板引擎
app.engine('html',expressArtTemplate)

//配置使用body-parser插件
//该插件会把请求体数据解析到req.body 中
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// 处理index页面
app.get('/',(req,res)=>{
	// res.send('hello world')
	comment.findAll((err,comments)=>{
		if(err){
			return console.log('读取数据失败')
		}

	res.render('index.html',{
		// ES6中,key==values 可以只写一个
		comments
	})
	})
})

// 处理发表页面
app.get('/fabiao',(req,res)=>{
	res.render('fabiao.html')
})
// app.post('')

app.post('/fabiao',(req,res)=>{
	// console.log('收到')
	// 1接收表单提交的数据
	// 2验证
	// 3持久化存储
	// 4发送响应
	const body=req.body
	if(!body.name||!body.name.length){
		return res.send('name invalid')
	}
	if(!body.content||!body.content.length){
		return res.send('content invalid')
	}

	comment.save(body,err=>{
		if(err){
			return res.send('500 Server Error')
		}
		// express 的redirect方法实现重定向
		res.redirect('/')

	})

})

app.listen(3000,()=>{
	console.log('app running...')
})
