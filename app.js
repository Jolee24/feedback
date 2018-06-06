//我们为了方便的统一处理这些静态资源，所以我们约定把所有的静态资源都放在 public 目录中
var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

http
	.createServer(function (req, res) {
		var parseObj = url.parse(req.url, true)
		var pathname = parseObj.pathname
		if (pathname === '/') { //首页
			fs.readFile('./views/index.html', function (err, data) {
				if (err) {
					return res.end('404 Not Found.')
				}
				var htmlStr = template.render(data.toString(), {
			        comments: comments
			    })
			    
			    res.end(htmlStr)				
			})
		}
		else if (pathname === '/pinglun') { // 提交评论
			var comment = parseObj.query
			var dateTime = new Date()
			comment.dateTime = dateTime
			comments.unshift(comment)

			// 状态码 statusCode : 302
			// Location 重定向 首页 '/'
			res.statusCode = 302
			res.setHeader('Location', '/')	
			res.end()

		}
		else if (pathname === '/post') { // 编辑发表评论
			fs.readFile('./views/post.html', function (err, data) {
				if (err) {
					return res.end('404 Not Found.')
				}
				res.end(data)
			})
		}
		else if (pathname.indexOf('/public/') === 0) { // 请求开放静态资源
			fs.readFile('.' + pathname, function (err, data) {
				if (err) {
					return res.end('404 Not Found.')
				}
				res.end(data)
			})
		}
		else { // 404 处理页面
			fs.readFile('./views/404.html', function (err, data) {
				if (err) {
					return res.end('404 Not Found.')
				}
				res.end(data)
			})
			
		}
	})	
	.listen(3000, function () {
		console.log('running...')
	})