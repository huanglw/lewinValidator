

# 实现配合Bootstrap使用的一个表单验证工具lewinValidator

# 介绍

一个简单的表单验证器，主要特点是无第三方依赖，使用方便，使用原生js实现，不囿于任何一种框架。

萌生自己实现该插件的想法是因为，在软件开发中表单验证的时候依赖于第三方的工具总是不够灵活，所以产生这个符合自己业务场景的验证工具。也许并不能适应很多场景，灵活、简单是它的特点，这里仅提供一种思路，在插件的基础上再做修改，也可以适应不用的场景。

另外插件只是简单实现，很是简陋，肯定有漏洞，欢迎提issue。

# 主要文件
```
|---------- image
|---------- dist
   |------- lewinValidator.js
   |------- lewinValidator.css
|---------- index.html //使用示例
```

# 使用说明
## 安装
### 外部引用

```html
<link rel="stylesheet" type="text/css" href="dist/lewinValidator.css">

<script type="text/javascript" src="dist/lewinValidator.js"></script>
```

### 内置多种表单验证方法

![image](<http://wx4.sinaimg.cn/large/e2054bf8gy1g27vbq0bgaj20r10dq40d.jpg>)

## 主要方法

- lewinValidator.register('name', handler) //自定义表单验证方法
- html中绑定验证方法`<intput lewin-verify="[name]"`即可使用自定义验证方法
- lewinValidator.render();//使验证器生效
- lewinValidator.formValidate('form-id');//对整个表单进行验证


## example使用示例
index.html文件可以参看使用方法。演示效果如下：

![图片发自简书App](<https://raw.githubusercontent.com/huanglw/lewinValidator/master/image/lewinValidator.gif>)

> 源码地址： <https://github.com/huanglw/lewinValidator>

