

# 实现适配Bootstrap使用的一个表单验证工具lewinValidator

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

## 表单验证注意事项
### 取值去除前后空字符串进行验证
而不能直接通过字符串长度验证，这样的话一串空字符串也能满足验证；value.trim();
### 数字判断
[纯js判断](https://stackoverflow.com/questions/9716468/pure-javascript-a-function-like-jquerys-isnumeric)
```
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
```

### 提交按钮防止多次提交的解决办法
#### post方法改成put方法
了解一下幂等性。
#### 方法二
https://stackoverflow.com/questions/16814157/how-to-prevent-users-from-submitting-a-form-twice
通过禁用按钮
下面一段有问题的代码：
```
//#add-submit是表单#edit-form中的submit按钮
$('#add-submit').on('click', function(e){//由于使用ajax提交数据，把默认事件阻止了
    e.preventDefault();
});//阻止默认事件
document.getElementById('edit-form').addEventListener('submit', function(){
    console.log("disabled button");
    document.getElementById('add-submit').disabled = true;
})
```
由上面的代码可以看到我给提交按钮加了点击事件用来阻止默认事件，然后给表单的submit事件增加了禁用按钮代码；
问题：`表单提交过程中，根本没有执行form的submit事件`
原因：`click事件在表单的submit事件之前触发，阻止默认事件之后，form提交事件自然也就不会发生了`
解决： `把阻止提交按钮默认事件代码注释掉就可以了`
```
//#add-submit是表单#edit-form中的submit按钮
<!-- $('#add-submit').on('click', function(e){//由于使用ajax提交数据，把默认事件阻止了
    e.preventDefault();
});//阻止默认事件 -->
document.getElementById('edit-form').addEventListener('submit', function(){
    console.log("disabled button");
    document.getElementById('add-submit').disabled = true;
})
```
一个问题：submit默认事件，导致formdata参数填到url上
解决办法：阻止submit的默认事件
```
//防止多次提交
  document.getElementById('edit-form').addEventListener('submit', function(e){
      console.log("disabled button");
      document.getElementById('add-submit').disabled = true;
      e.preventDefault();//---------->增加阻止默认事件代码
  })
```

> 源码地址： <https://github.com/huanglw/lewinValidator>

