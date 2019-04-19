//***********************************************
//*****lewinValidator表单验证工具
//*****@author Lewin Huang **huanglewin@gmail.com
//*****特点：简单、灵活、体积小
//***********************************************

var lewinValidator = (function VerifyTool(){
	var obj = {};
	obj.verifyStorage = {};//此处可以预定义一些验证规则，比如email,电话号码，邮政编码等常用的验证规则
	obj.register = function(name, callback){
		this.verifyStorage[name] = callback;
	};
	obj.render = function(){
		var _this = this;
		//for(var i in _this.verifyStorage){
			//console.log("for...i...:"+i);
			document.querySelectorAll('input[lewin-verify]').forEach(function(item){
				item.onblur = function(){
					var verifyFunc = item.getAttribute('lewin-verify');
					console.log(item.getAttribute('lewin-verify'));
					if(_this.verifyStorage[verifyFunc](item.value) !== ""){//验证没通过的处理
						//alert(verifyFunc+'验证未通过')
						item.style.border = "red solid 1px";
						removeClass(item.nextElementSibling, "glyphicon-ok");
						addClass(item.nextElementSibling, "glyphicon-remove");
					}else{
						//alert(verifyFunc+'验证通过')
						item.style.border = "#e6e6e6 solid 1px";
						if(hasClass(item.nextElementSibling, "glyphicon-remove")){
							removeClass(item.nextElementSibling, "glyphicon-remove");
							addClass(item.nextElementSibling, "glyphicon-ok");
						}
					}
				};
			})
		//}
	};
	//*************方法二：点击提交按钮的时候表单验证*********************
	//***接收参数所有input的父容器id，或者是form的id
	//***返回true || false表单验证是否通过
	obj.formValidate = function(eleID){
		var _this = this;
		var result = true;
		document.getElementById(eleID).querySelectorAll('input[lewin-verify]').forEach(function(item){
			var verifyFunc = item.getAttribute('lewin-verify');
			if(verifyFunc !== ""){
				if(!_this.verifyStorage[verifyFunc]){
					alert('验证方法'+verifyFunc+"未定义，请检查！")
				}else{
					var info = _this.verifyStorage[verifyFunc](item.value);
					if(info !== ""){//验证没通过的处理
						//item.style.border = "red solid";
						//addClass(item.parentNode, "verifyFailed");
						removeClass(item.nextElementSibling, "glyphicon-ok");
						addClass(item.nextElementSibling, "glyphicon-remove");
						result = result && false;
					}else{
						// if(hasClass(item.parentNode, "verifyFailed"))
						// 	removeClass(item.parentNode, "verifyFailed");
						if(hasClass(item.nextElementSibling, "glyphicon-remove")){
							removeClass(item.nextElementSibling, "glyphicon-remove");
							addClass(item.nextElementSibling, "glyphicon-ok");
						}
					}
				}
			}
		})

		return result;//false为表单验证不通过

	};
	return obj;
})()

//*****依赖**********
//
//原生添加、移除class的方法
//
//
//*******************
	// 原生js方法 addClass、removeClass
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
 
function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
}
 
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, '  ');
    }
}
 
function toggleClass(obj,cls){
	if(hasClass(obj,cls)){
		removeClass(obj, cls);
	}else{
		addClass(obj, cls);
	}
}

//*****用法说明 内置验证方法*******
lewinValidator.register('username',function(vv){
	console.log("length:"+vv.length);
	if(vv.length > 20){
		return "太长了，不得超过20个字符！！";
	}else if(vv.length < 5){
		return "太短了，不得少于5个字符！！";
	}else{
		return "";
	}
});
lewinValidator.register('password',function(vv){
	var reg=/^[A-Za-z0-9]+$/;
	if(!reg.test(vv)||vv.length<6||vv.length>15){
		return '密码必须为6-15位的数字和字母的组合';
	}else{
		return "";
	}
});
lewinValidator.register('email',function(vv){
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!myreg.test(vv)){
         return "请输入合法的邮件地址";
    }else{
    	return "";
    }
});
lewinValidator.register('longitude',function(vv){
	if(vv > 180){
		return "经度不得大于180！！";
	}else if(vv < -180){
		return "经度不得小于-180！！";
	}else if(vv ==null || vv == ""){
		return "不能为空！！"
	}else{
		return "";
	}
});
lewinValidator.register('latitude',function(vv){
	if(vv > 90){
		return "纬度不得大于90！！";
	}else if(vv < -90){
		return "纬度不得小于-90！！";
	}else if(vv ==null || vv== ""){
		return "不能为空！！"
	}{
		return "";
	}
});
lewinValidator.register('not-null',function(vv){
	if(vv ==null || vv==""){
		return "不能为空！！"
	}{
		return "";
	}
});
lewinValidator.register('can-null',function(vv){
	if(vv ==null || vv==""){
		return ""
	}else if(vv.length > 20){
		return "太长了！！";
	}else if(vv.length < 5){
		return "太短了！！"
	}else{
		return "";
	}
});


//******用法******//
// lewinValidator.render();

// document.getElementsByClassName('layui-layer-btn0')[0].onclick = function(){
// 	lewinValidator.formValidate('edit-form');
// }




