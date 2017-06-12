# FONT-END-INIT

注意！！持续开发中！！

请勿使用

> 前端项目通用初始化构建实现

本构建参考了一些前端项目的构建方案，并总结出一套基于gulp为基础的通用构建方案。适用于一般中、小型项目。

本构建实现了以下方面的需求：l

> 1、前端完全模块化、组件化开发
>
> 2、可以使用less、sass、style等预处理语言
>
> 3、可以使用ejs、siwg等模板语言
>
> 4、支持dev和build两种模式
>
> 5、css、html、js、图片等资源的压缩，打包，以及cdn替换
>
> 6、浏览器自动刷新



目录构建：

```
项目目录
project
	- public
		- jquery
			- jquery.min.js
	- componet_modules
		- list
			- 1.0.0
				- list.siwg
				- list.css
				- list.js
				- list.png
	- componets
		- headerer
			- header.siwg
			- header.css
			- header.js
			- logo.png
		- footer
			- footer.siwg
			- footer.css
			- header.js
			- logo.png
	- views
		- home
			- index.html
			- index.css
			- index.js
			- index.png
	- r_dev
		- p
			- jquery
				-jquery.min.js
		- c_m
			- list
				- 1.0.0
					- list.siwg
					- list.css
					- list.js
					- list.png
		- c
			- header.png
		- v
			- home
				- index.html
				- index.css
				- index.js
				- index.png
	- r_online
		- c
			- 1.0.0
				- header_hash.png
		- s
			- 1.0.0
				- home
					- index_hash.js
					- index_hash.css
					- index_hash.png
		- v
			- 1.0.0
				- home
					- index.html

```

