# webpack 配置

**基于 nodeJS 使用**

## 打包初体验

- 安装 webpack

  `npm install webpack -g`  

- 创建项目

  `mkdir projectName` 创建文件夹

- 初始化 package.json

  `npm init`

  参数 设置打包环境

- 安装局部webpack

  `npm i -S webpack`

- 项目根目录创建 webpack.config.js

  - 设置出入口 

  ```javascript
  const path = require('path');
  module.exports = {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js'
    }
  };
  ```

- 执行webpack

  `webpack -d`  进行打包 

  `-d` 参数, 打包为开发环境 默认是生产环境`-p`.

  `--watch` 实时监听webpack, 自动编译

  ​

## 简单配置

**package.json** 包管理文件

```javascript
{
  "name": "webpack01",
  "version": "1.0.0",
  "description": "webpack01练习",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "fy": "webpack-dev-server"
  },
  "author": "小白",
  "license": "ISC",
  "dependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.4",
    "babel-preset-es2015": "^6.24.1",
    "node": "^10.5.0",
    "webpack": "^4.12.0",
    "webpack-cli": "^3.0.8"
  },
  "devDependencies": {
    "clean-webpack-plugin": "^0.1.19",
    "css-loader": "^0.28.11",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "file-loader": "^1.1.11",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "node-sass": "^4.9.0",
    "sass-loader": "^7.0.3",
    "style-loader": "^0.21.0",
    "webpack-dev-server": "^3.1.4"
  }
}
```

**.babelrc**  es6转义文件

```javascript
{
    "presets": ["es2015"],
    "plugins": []
}
```

**webpack.config.js**	webpack配置文件

```javascript
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: './src/app.js', //..入口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    devServer: {
        port: 8081,
        hot: true
    },
    //  这里是使用插件
    plugins: [
        new htmlWebpackPlugin({
            title: '这里是app.html',
            fliename: 'app.html',
            template: './src/app.html', //..确定模板html文件   
            minify: {
                collapseWhitespace: false //  是否压缩输出文件
            }
        }),
        new cleanWebpackPlugin(['dist']),
        new Webpack.HotModuleReplacementPlugin(), //  开启热更新
        new Webpack.NamedModulesPlugin()
    ],
    //  loader 配置
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        context: '',
                        outputPath: 'img/'
                    }
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    }
};
```

**src**	放置文件

- img
- js
- html
- 其它资源



## webpack-plugn 插件

**作用: 创建一个 html 文件 让目标js文件插入到 html 中**

安装

`npm i -D html-webpack-plugn`

- 引入到 **webpack.config.js** 中 

```javascript
const path = require('path')
const htmlWebpackPlugn = require('html-webpack-plugn')
module.exports = {
    mode: "development",
    entry: "./src/app.js",	//	入口
    output: {	//	出口
    	path: path.resolve(__dirname, 'dist'),  //	输出路径
        filename: 'app.bundle.js'	//	输出文件名
    },
    //	插件的使用
    plugins: [	
        new htmlWebpackPlugn({	//	使用html-webpack-plugn 插件
        	title: '这是一个自定义 title 信息',
        	filename: 'app.html',
        	minify: {	
        		collapseWhitespace: true,	//	是否压缩输出文件
        		template: './src/a.html',	//	确定模板文件
    		}
    	}
    ]
}
```

使用参考模板的时候, plugins中设置的title 等参数就不会被生效, 如果要生效需要针对 **模板字符串** + **htmlWebpackPlugin.options** 对象下各个属性进行设置 `<%= htmlWebpackPlugin.options.title %>`



## 处理css sass 等样式文件

**loader**

loader 用于对模块的源代码进行转换。loader 可以使你在 `import` 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 `import` CSS文件！

```js
//	处理css文件需要两个 loader
npm install -D css-loader
npm install -D style-loader
//	处理sass文件需要两个 loader
npm install -D node-sass sass-loader
```

然后指示 webpack 对每个 `.css` 使用 [`css-loader`](https://www.webpackjs.com/loaders/css-loader)

**webpack.config.js**

```js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: "development",
    entry: "./src/app.js",	//	入口
    output: {	//	出口
    	path: path.resolve(__dirname, 'dist'),  //	输出路径
        filename: 'app.bundle.js'	//	输出文件名
    },
    //	插件的使用
    plugins: [	
        new htmlWebpackPlugin({	//	使用html-webpack-plugn 插件
        	title: '这是一个自定义 title 信息',
        	filename: 'app.html',
        	minify: {	
        		collapseWhitespace: true,	//	是否压缩输出文件
    		}
    	}),
    ],
    module: {	
        rules: [
           {	//	配置使用 css
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {	//	配置使用 scss
            test: /\.scss$/,
            use: [
              { loader: 'css-loader'},
              { loader: 'sass-loader'}
            ]
          },
         
        ]
  	}
}
```



**ES6代码编译为ES5**

打包的时候, 需要编译es6代码为旧版本浏览器支持的es5代码, 需要会用一些相关的loader

```javascript
npm install babel-core --save
npm install babel-loader --save
npm install babel-preset-es2015 --save
//	需要安装三个需要的插件, 可以一次性安装
npm install babel-core babel-loader babel-preset-es2015 --save 
```

安装完成后需要配置相关文件.

```javascript
//	首先需要配置babel编译需要的配置文件:   .babelrc
{
    "presets": ["es2015"],
    "plugins": []
}
```

然后需要设置webpack的配置文件

```javascript
//	webpack.config.js
module.exports = {
    //	入口文件
    entry: __dirname + '/js/main.js',
    output: {
        //	webpack 打包后输出的路径
        path: __dirname,
        filename: 'index.js'
    },
    module: {
        rules: {
            //	exclude 排除, 不需要编译的目录, 提高编译速度
            {test: /\.js/, use: 'babel-loader', exclude: /node_modules/}
        }
    }
}
```

 

## web-dev-server 插件

使用: 代替 webpack -d  --watch 的插件

```javascript
//	全局安装 webpack-dev-server
npm i webpack-dev-server -g
//	局部安装
npm i webpack-dev-server -D
//	使用 实时监听
webpack-dev-server 代替 webpack -d --watch
```

修改端口		webpack-config.js

```javascript
//	引入文件 
const Webpack require('webpack')
//	添加 devServer 参数 设置 port
devServer: {
    port: 8081
    hot: true	//	开启热更新(不重载页面资源,达到局部更新)
},
//	修改plugins参数
plugins: [
   new Webpack.HotModuleReplacementPlugin(),	//	开启热更新方式
   new Webpack.NamedModulesPlugin()
]
```

**然而在我的电脑上并没有达到实时监听修改的实现.** 我老实使用 `webpack -d --watch`

简单运行命令 配置 package.json

```javascript
//	在 scripts 对象中配置响应的命令,如下
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "fy":"webpack-dev-server"
},
// 如此, 是用 npm run fy 就可以运行webpack-dev-server 命令
```



## clean-webpack-plugin 插件

更新hash保持最新, 不生成新的hash文件

```javascript
//	安装
npm i clean-webpack-plugin -D
```

使用 配置 webpack-config.js

```javascript
//	引入
const CleanWebpackPlugin = require('clean-webpack-plugin')
//	使用 
plugins: {
    new CleanWebpackPlugin(['dist']),	//paths路径
}
```



## 图片资源处理

```javascript
//	下载
npm i -D html-loader file-loader
//	配置文件

```



```javascript
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: "development",
    entry: "./src/app.js",	//	入口
    output: {	//	出口
    	path: path.resolve(__dirname, 'dist'),  //	输出路径
        filename: 'app.bundle.js'	//	输出文件名
    },
    //	插件的使用
    plugins: [	
        new htmlWebpackPlugin({	//	使用html-webpack-plugn 插件
        	title: '这是一个自定义 title 信息',
        	filename: 'app.html',
        	template: './src/a.html',	//	确定模板文件
        	minify: {	
        		collapseWhitespace: true,	//	是否压缩输出文件
    		}
    	}),
    ],
    module: {	
        rules: [
           {	//	配置使用 css
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {	//	配置使用 scss
            test: /\.scss$/,
            use: [
              { loader: 'css-loader'},
              { loader: 'sass-loader'}
            ]
          },
          {	//	配置图片: 仅能处理样式表中的图片
			test: /\.(png|jpg)$/,
             use: {
                  loader: 'file-loader',
                  options: {	// 配置选项
                      name: '[name].[ext]',	//[path][name].[ext]
                      context: '',
                      outputPath: 'images/'
                  }
             }
          },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
  	}
}
```





---

# git 使用



## 基础操作

**安装**

下载 -> 下一步 ... -> 安装完成

开始菜单找到 'Git' 蹦出类似命令行窗口的窗口, 说明 Git 安装成功

**本地账号**

```javascript
git config --global user.name "我的用户名"
git config --global user.email "我的邮箱"
git config --list //	显示配置
```

**初始化仓库**

 ```javascript
//	创建一个文件夹 mkdir learngit
//	进入 learngit 目录 cd learngit
//	初始化仓库
git init
//	通过 git -a 查看隐藏文件
git -a	//	./  ../  .git/
//	开始操作 git
 ```

**添加文件到Git仓库**, 两步走

- **使用 `git add <filePath>`** . 可反复多次使用, 添加多个文件

```javascript
//	touch 文件 触摸文件
//	vim 编辑文件
vim test.txt
//	i 后输入内容
我是懵宝呀,大哥
// 退出编辑
esc 
:wq //保存当前编辑
//	git 初始化
git init
//	添加到文件仓库
git add test.txt
```

- **使用 `git commit` , 提交到本库**, 完成

```javascript
//	-m "" 是描述
git commit -m "这是第一次使用commit命令提交"
```

- 使用 `git status ` 查看仓库的状态

```javascript
//	在未使用git add ...命令前使用 git status 可以查看状态
git status	
//	使用 git diff 可以查看新增的内容
git diff
//	如果使用了 git add 命令操作, 再使用 git status 会告诉我们没有最新更新 
```

**版本回退**

- 查看版本 `git log` 详细版

```javascript
git log // 显示版本
//	按照 ↓ 键可以查看隐藏内容
```

- 回退到某个版本 `git reset --hard commit_id`

```javascript
//	最新修改的版本 和 其它版本现实不是一般. 有个 master 提示 表示停留在该版本HEAD -> master  
//	我们如果要返回到第四次 可以使用 git reset --hard commit_id
//	使用 git reset --hard (Id值/head指针)
git reset --hard id		//  返回指定id
git reset --hard HEAD^	//	(返回版本次数就是几个^)
```

- 查看版本(精简信息) `git reflog`

```javascript
git reflog
// 使用git reset --hard (Id值/head指针)
git reset --hard id		//  返回指定id
git reset --hard HEAD^	//	(返回版本次数就是几个^)
```

**丢弃修改**

- 放弃未被add(添加)到暂存区而被直接commit(提交)的文件,可以使用 `git checkout -- file` 直接放弃内容

```javascript
//	撤销修改内容 已经commit但是没有add的内容可以直接撤回
git checkout -- test.txt
//	添加到了暂存区 没有使用commit命令的时候也可以从暂存区中删除
```

- 返回工作区 `git reset HEAD `

```javascript
//	git reset HEAD 文件名 把缓存区的内容重新添加到工作区
git reset HEAD text.txt
```

**删除文件**

- `git rm --file` 

```javascript
//	可以用于删除一个文件, 
git rm --file
// 如果一个文件已经被提交(add,commit)到了版本库, 那么不用放心误删, 但是只能恢复文件到最新版本,你会丢失最近一次提交后你修改的内容
git checkout -- file // 撤销删除命令, 恢复test2.txt文件
```



## 远程仓库

**关联远程仓库 github**

- 注册账号
- 创建 SSH key 

```javascript
//	创建 ssh 
ssh-keygen -t rsa -C "1308689683@qq.com"
//	进入 ssh
cd .ssh
//	查看隐藏文件
ls -a
//	公开的钥匙 id_rsa.pub 
//	私人的钥匙 id_rsa 不要泄露
id_rsa id_rsa.pub 
//	返回上一层
cd ..
//	打开 .ssh
//	cmd输入 .shh	获取开发的密匙,复制到gitHub的关联内容中
```

**推送到远程库**

```javascript
//	修改了本地文件内容并且保存后,如果需要提交到github上,执行以下命令
git push origin master
```

**从远程库克隆 **[shift + ins 黏贴]

```javascript
//	在gitHub上复制 版本库地址 使用命令 git clone + address(ssh)  
git clone git@github.com:mengbaowusuoweiju/newGit.git
//	进入newGit 编辑 README.md 文件
//	编辑完成. add  commit
//	重新更新远程库 
git push prigin master
```

### 创建与合并分支

每次提交, Git 都会把他们串成一条时间线, 这条时间线就是一个分支.

截止到目前, 只有一条时间线, 在Git里, 这个分支叫主分支, 即 `master` 分支.

`HEAD` 严格来说不是指向提交, 而是指向 `master` , `master`  才是指向提交的. 所以 `HEAD` 指向的就是当前分支.

Git 鼓励大量使用分支:

查看分支 : `git branch`

创建分支: `git branch <name>`

切换分支: `git checkout <name>`

创建+切换分支: `git checkout -b <name>`

合并某分支到当前分支: `git merge <name>`

删除分支: `git branch -D <name>`

> 注意: **master 主分支我们只用来提交操作.**  

### 分支冲突

当Git 无法自动合并分支时, 必须首先解决冲突, 解决冲突之后, 再提交. 使用命令 `git log --graph` 命令可以看到分支合并图

### 分支管理策略

合并分支时, 加上 `--no-ff` 参宿可以用普通得很模式, 合并后的历史有分支, 能看出来曾经做过合并, 而  `fast forward` 合并就看不出来曾经做过合并.

注意: 使用 `--no-ff` 合并时壶自动创建一个新的commit ,然后合并, 最后删除

### BUG 分支

修复 bug 时, 我们会通过创建新的 bug 分支进行修复, 然后合并, 最后删除新分支

当手头工作没有完成的时候, 先把工作现场 `git stash` 下, 然后修复bug ,修复后, 再 `git stash pop`, 回到工作现场

```javascript

```

### Feaure 分支

开发新功能, 最好创建一个新的分支

如果丢弃一个没有被合并过的分支, 可以直接 `git brandch -D <name>`

### 多人协作

- 查看远程库信息, 使用 `git remote -v`
- 本地新建的分支如果不能推送到远程, 对其他人是不可见的.
- 从本地推送分支, 使用 `git push origin branch-name` , 如果推送失败, 先用 `git push ` 抓取远程的新提交
- 在本地创建和远程分支对应的峰值, 使用 `git checkout -b branch-name` origin/branch-name, 本地和远程分支的名称最好一致
- 建立本地分支和远程分支的关联, 使用 `git  branch --set-upstream branch-nameorigin/branch-name`
- 从远程抓取分支, 使用 `git pull`, 如果有冲突, 先处理冲突

### 标签管理

发布版本, 通常先在版本中打一个标签. 无论将来什么时候, 取某个标签版本, 就是把那个打标签的时刻清晰拿取某个版本

**创建标签**

- 命令 `git tag <name>` 用于新建一个标签, 默认为 `HEAD` 也就是指向最近的 commitId
- `git tag -a <tagname> -m "详细说明" <commitId>` 可以指定标签信息 
- `git tag -s <tagname> -m "@!#$%^"` 可以用PGP前面标签
- `git tag` 可以查看所有标签
- 用命令 `git show <tagname>` 可以看到说明文字

**标签操作**

- 删除标签 `git tag -d <tagname>`

- 推送某个标签到远程, `git push' origin <tagname>`

- 一次性推送尚未推送的标签 `git push origin --tags`

- 如果标签已经推送到远程, 需要删除远程标签, 先从本地删除

  ```javascript
  git tag -d <tagName>
  ```

  然后再删除远程, 使用命令push 

  ```javascript
  git push origin :refs/tags/<tagName>
  ```

## 配置git命令别名

我们只需要敲一行代码, 告诉GIT ,以后`st` 就表示 `status`

```javascript
git config --global alias.st status
```

