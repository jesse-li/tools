// 所有的文件产出到 static/ 目录下
// fis.match('*', {
//     release: '/output/$0'
// });
//设置自动刷新插件路径
fis.set('livereload.hostname', '127.0.0.1');
//设置相对路径输出
fis.hook('relative');
fis.match('**', { relative: true });
//less和sass配置
// 某些资源从构建中去除


/*
fis.match('/psd/**', {
  // 设置 release 为 FALSE，不再产出此文件
  release: false
});

fis.match('/modules/**', {
  // 设置 release 为 FALSE，不再产出此文件
  release: false
});*/
/*fis.match('/js/g2.js', {
  // 设置 release 为 FALSE，不再产出此文件
  release: false
});*/
// html 编译压缩

// css 编译压缩
fis.match('*.{css,scss}', {
  // useSprite: true,
  useHash: true,
  rExt: '.css',
  optimizer: fis.plugin('clean-css'), //压缩css
  // 'keepBreaks': true, //保持一个规则一个换行
  isMod: true
});
fis.match('*.scss',{
	parser: fis.plugin('node-sass')
})
  
fis.match('*.{css,scss}', {
  preprocessor: fis.plugin('autoprefixer', {
    "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    "cascade": true
  })
})

// js 编译压缩
fis.match('*.js', {
  useHash: true,
  isMod: true,
  optimizer: fis.plugin('uglify-js'), //压缩js
});

//
// 图片 压缩
fis.match('*.png', {
  /*useHash: true,*/
  optimizer: fis.plugin('png-compressor',{
     type : 'pngquant'
  })
});

fis.match('*.{jpeg,gif}', {
  useHash: true
});


// 开发的时候不需要压缩、合并图片、也不需要 hash
fis.media('debug').match('**', {
  useHash: false,
  useSprite: false,
  optimizer: null
})
.set('project.ignore', [
  'psd/**',
  "fis-conf.js",
 "output.rar"
]);

//输出构建后未压缩的代码

fis.media('base')
		.match('**', {
		  useHash: false,
		  useSprite: false,
		  optimizer: null
		})
		.match('::package', {
    // spriter: fis.plugin('csssprites', {
    //     layout: 'matrix',
    //     // scale: 0.5, // 移动端二倍图用
    //     margin: '10'
    // }),
    postpackager: fis.plugin('loader', {//页面同类打包资源大于1个时才会合并到下面的路径，不然不会打包
      allInOne: {
	      js: function (file) {
	        return "/pkg/" + file.filename + "_aio.js";
	      },
	      css: function (file) {
	        return "/pkg/" + file.filename + "_aio.css";
	      }
	    } 
    })
    
  })
		.set('project.ignore', [
		"turntable/**",
  "canvas.html",
  "flash.html",
  "test.html",
  "output/**"
]);


// 基于页面打包处理 (强制打包)
fis.media('prod')
	.match("**",{
		useHash: false
	})
  .match('::package', {
    // spriter: fis.plugin('csssprites', {
    //     layout: 'matrix',
    //     // scale: 0.5, // 移动端二倍图用
    //     margin: '10'
    // }),
    postpackager: fis.plugin('loader', {//页面同类打包资源大于1个时才会合并到下面的路径，不然不会打包
      allInOne: {
	      js: function (file) {
	        return "/pkg/" + file.filename + "_aio.js";
	      },
	      css: function (file) {
	        return "/pkg/" + file.filename + "_aio.css";
	      }
	    } 
    })
    
  })
.set('project.ignore', [
  'psd/**',
  "test.html",
  "fis-conf.js",
 "output.rar",
 "test.html",
 "tips.html",
 "base/**",
 "modules/**"
])
.match('*.html', {
    useMap: true
})
.match('/common/js/**', {
 packTo: 'pkg/common.js'
})
.match('/js/desc.js', {
 packTo: 'pkg/desc.js'
})
.match('/css/*.{css,scss}', {
 packTo: 'pkg/common.css',
});


// 基于资源映射表打包处理
// fis.match('::package', {
//     // npm install [-g] fis3-postpackager-loader
//     // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
//     postpackager: fis.plugin('loader', {
//         // resourceType: 'commonJs',
//         useInlineMap: true // 资源映射表内嵌
//     })
// });
