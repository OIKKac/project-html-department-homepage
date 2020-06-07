// StringBuffer
function StringBuffer() {
	this.content = new Array;
} 
StringBuffer.prototype = {
	append: function(val) { 
		this.content.push(val);
	},
	length: function() {
		return this.content.length;
	},
	toString: function(val) {
		if(typeof val == 'undefined') val = '';
		
		return this.content.join(val);
	}
}

function PageBuffer() {
	this.totalList = 0;
	this.baseList = 30;
	this.currentPage = 1;
}
PageBuffer.prototype = {
	set: function(id, val) {
		eval('this.'+id+' = '+val);
	},
	get: function(id) {
		return parseInt(eval('this.'+id));
	},
	rownum: function(type) {
		if(typeof type == 'undefined') return parseInt(this.totalList)-parseInt(this.baseList)*(parseInt(this.currentPage)-1);
		else return parseInt(this.baseList)*(parseInt(this.currentPage)-1)+1;
	}
}

function DateTime() {
	this.today = new Date();
	this.dateFormat = '-';
	this.timeFormat = ':';
	this.MiliSecond = '';
}
DateTime.prototype = {
	setDateFormat: function(format) {
		this.dateFormat = format;
	},
	setTimeFormat: function(format) {
		this.timeFormat = format;
	},
	setDate: function(val, type) {
		this.today = new Date();
		if(typeof type == 'undefined') val = 0;
		if(typeof type == 'undefined') this.today.setDate(this.today.getDate() + parseInt(val));
		else if(type.toLowerCase() == 'year') this.today.setYear(this.today.getYear() + parseInt(val));
		else if(type.toLowerCase() == 'month') this.today.setMonth(this.today.getMonth() + parseInt(val));
	},
	getFirstDate: function() {
		this.CurrentDay = new Date(this.today.getFullYear(), this.today.getMonth());
		this.MiliSecond = this.CurrentDay.getTime();
		this.today.setTime(this.MiliSecond);
	},
	getLastDate: function() {
		this.CurrentDay = new Date(this.today.getFullYear(), this.today.getMonth()+1, '');
		this.MiliSecond = this.CurrentDay.getTime();
		this.today.setTime(this.MiliSecond);
	},
	getHour: function() {
		this.hour = this.today.getHours().toString();
		if(this.hour.length == 1) this.hour = '0'+this.hour;
		
		return this.hour;
	},
	getMinute: function() {
		this.minute = this.today.getMinutes().toString();
		if(this.minute.length == 1) this.minute = '0'+this.minute;
		
		return this.minute;
	},
	toString: function(format) {
		this.year = this.today.getFullYear().toString();
		this.month = (this.today.getMonth()+1).toString();
		if(this.month.length == 1) this.month = '0'+this.month;
		this.date = this.today.getDate().toString();
		if(this.date.length == 1) this.date = '0'+this.date;
		this.hour = this.today.getHours().toString();
		if(this.hour.length == 1) this.hour = '0'+this.hour;
		this.minute = this.today.getMinutes().toString();
		if(this.minute.length == 1) this.minute = '0'+this.minute;
		this.second = this.today.getSeconds().toString();
		if(this.second.length == 1) this.second = '0'+this.second;
		
		this.arrayDate = Array()
		this.arrayDate.push(this.year); 
		this.arrayDate.push(this.month);
		this.arrayDate.push(this.date);
		
		this.arrayTime = Array()
		this.arrayTime.push(this.hour);
		this.arrayTime.push(this.minute);
		this.arrayTime.push(this.second);
		
		if(typeof format == 'undefined') return this.arrayDate.join(this.dateFormat);
		else return this.arrayDate.join(this.dateFormat)+' '+this.arrayDate.join(this.timeFormat);
	}
}

// 파일 사이즈 구하기
function getFilesize(filepath) {
	var len = 0;
	
	if(navigator.appName.indexOf('Netscape') != -1) {
		try {
			netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
		} catch(e) {
			return -1;
		}
		try {
			var file = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
			file.initWithPath(filepath);
			
			len = file.fileSize;
		} catch(e) {
			return -1;
		}
	} else if (navigator.appName.indexOf('Microsoft') != -1) {
		try {
			var img = new Image();
			img.dynsrc = filepath;
			len = img.fileSize;
		} catch(e) {
			return -1;
		}
	}
	return len;
}

/* --------------------------------------------------- */
/*			  Number prototype 함수 정의			 */
/* --------------------------------------------------- */
Number.prototype.setBlank = function() {
	return this.toString().setBlank();
}

Number.prototype.setComma = function() {
	return this.toString().setComma();
}

Number.prototype.setdotComma = function() {
	return this.toString().setdotComma();
}

Number.prototype.removeComma = function() {
	return this.toString().removeComma();
}

Number.prototype.Numeric2Won = function(){
	return this.toString().Numeric2Won();
}

Number.prototype.str2date = function() {
	return this.toString().str2date();
}

Number.prototype.setNumberDate = function() {
	return this.toString().setNumberDate();
}

Number.prototype.setNumberSSN = function(type) {
	return this.toString().setNumberSSN(type);
}
	
Number.prototype.setNumberPhone = function(type) {
	return this.toString().setNumberPhone(type);
}

Number.prototype.setFileSize = function() {
	return this.toString().setFileSize();
}

Number.prototype.bytes = function() {
	return this.toString().bytes();
}

Number.prototype.truncate = function(length) {
	return this.toString().truncate(length);
}

/* --------------------------------------------------- */
/*			  String prototype 함수 정의			 */
/* --------------------------------------------------- */
String.prototype.addslashes = function() { // 특수문자 앞에 \ 추가
	var str = this.toString();
	return str.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

String.prototype.stripslashes = function() { // 특수문자앞의 \ 제거
	var str = this.toString();
	return str.replace(/\\(.?)/g, function (s, n1) {
		switch (n1) {
			case '\\':
				return '\\';
			case '0':
				return '\u0000';
			case '':
				return '';
			default:
				return n1;
		}
	});
}

String.prototype.trim = function() { // 양쪽여백 제거
	var str = this.toString();
	return this.replace(/^\|\s|$/g, '');
}

String.prototype.rtrim = function() { // 오른쪽여백 제거
	var str = this.toString();
	return this.replace(/^\s+/, '');
}

String.prototype.ltrim = function() { // 왼쪽여백 제거
	var str = this.toString();
	return this.replace(/\s+$/, '');
}

String.prototype.setBlank = function() { // 빈문자: html &nbsp;
	var str = this.toString().trim();
	return (str == '') ? '&nbsp;' : str;
}

String.prototype.nl2br = function() { // 케리지리턴을 BR 태그로 변경
	var str = this.toString();
	str = str.replace(/\r\n/gi, '<br />');
	str = str.replace(/\n\r/gi, '<br />');
	str = str.replace(/\n/gi, '<br />');
	return str;
}

String.prototype.nl2blank = function() { // 케리지리턴을 공백으로 변경
	var str = this.toString();
	str = str.replace(/\r\n/gi, '');
	str = str.replace(/\n\r/gi, '');
	str = str.replace(/\r/gi, '');
	str = str.replace(/\n/gi, '');
	return str;
}

String.prototype.setComma = function() { // 콤마 찍기
	
	var str = this.toString();	
	if( -1 == str.indexOf('-') )
	{
		
		str = str.replace(/\D/g, '');
		
		var temp = str.toString();
		temp = temp.replace(/\D/g, '');
		str = parseFloat(str.replace(/,|\s/g,''));
		if(isNaN(str)) {
			return temp;
		} else if(str == 0) {
			return str;
		} else {
			var reg = /(^[-]?\d+)(\d{3})/;
			str += '';
			while(reg.test(str)) str = str.replace(reg, '$1'+','+'$2');
			return str;
		}
		
	} else 
	{
		
		var str_minus = str.split('-');	
		str = str_minus[1];	
		
		var str = this.toString();	
		str = str.replace(/\D/g, '');
		
		var temp = str.toString();
		temp = temp.replace(/\D/g, '');
		str = parseFloat(str.replace(/,|\s/g,''));
		if(isNaN(str)) {
			return '-'+temp;
		} else if(str == 0) {
			return str;
		} else {
			var reg = /(^[-]?\d+)(\d{3})/;
			str += '';
			while(reg.test(str)) str = str.replace(reg, '$1'+','+'$2');
			return '-'+str;
		}
		
	}
	
}

String.prototype.setdotComma = function() { // 콤마 찍기
	
	var str = this.toString();
	
	if( -1 == str.indexOf('.') ){ 
	
		str = str.replace(/\D/g, ''); 	
		
		var temp = str.toString();
		temp = temp.replace(/\D/g, '');
		str = parseFloat(str.replace(/,|\s/g,''));
		if(isNaN(str)) {
			return temp;
		} else if(str == 0) {
			return str;
		} else {
			var reg = /(^[-]?\d+)(\d{3})/;
			str += '';
			while(reg.test(str)) str = str.replace(reg, '$1'+','+'$2');
			return str;
		}
		
	} 
	else { 
		
		var str_dot = str.split('.');	
		str_f = str_dot[0];	
		
		var temp = str_f.toString();
		temp = temp.replace(/\D/g, '');
		str_f = parseFloat(str_f.replace(/,|\s/g,''));
		if(isNaN(str_f)) {
			return '.'+temp;
		} else if(str_f == 0) {
			return '.'+str_f;
		} else {
			var reg = /(^[-]?\d+)(\d{3})/;
			str_f += '';
			while(reg.test(str_f)) str_f = str_f.replace(reg, '$1'+','+'$2');
			str_f += '.'+str_dot[1];
			return str_f;
		}
		
	}
	
}

String.prototype.removeComma = function() { // 콤마 없애기
	var str = this.toString();
	return str.replace(/,|\s/g,'');
}

// 숫자를 문자형태로 변형
String.prototype.Numeric2Won = function(){
	var price = this.toString();
	n = price.replace(/-|,|\s/g,'');
	if(isNaN(n)) n = 0;
	n += '';
	if(n.substr(0,1)==0) {return '영';}
	var price_unit0=new Array('','일','이','삼','사','오','육','칠','팔','구');
	var price_unit1=new Array('','십','백','천');
	var price_unit2=new Array('만','억','조','경','해');
	var won=new Array;
	for(i=0;i<=n.length-1;i++){won[i]=price_unit0[n.substr(i,1)];}
	won=won.reverse();
	for(i=0;i<=n.length-1;i++){if(i>0 && won[i]!='') {won[i]+=price_unit1[i%4];}}
	for(i=4;i<=won.length-1;i=i+4) {won[i]+=price_unit2[(i/4-1)];}
	for(i=0;i<=n.length-1;i++){if(i%4 > 0) {won[i]=won[i].replace('일','');}}
	won=won.reverse();
	return won.join('');
}

// 문자를 날짜형태로
String.prototype.str2date = function() {
	var str = this.toString();
	return str.substr(0,4)+'.'+str.substr(4,2)+'.'+str.substr(6,2);
}

// 숫자를 제외한 나머지 문자 제거
String.prototype.setNumber = function() {
	var str = this.toString();
	return str.replace(/\D/g,'');
}

// 날짜 자동하이픈
String.prototype.setNumberDate = function() {
	var str = this.toString();
	str = str.replace(/\D/g, '');
	if(str.length > 8) str = str.substr(0,8); 
	if(str.length > 6) str = str.substr(0,4) + '-' + str.substr(4,2) + '-' + str.substr(6);
	else if(str.length > 4) str = str.substr(0,4) + '-' + str.substr(4);
	return str;
}

// 주민번호, 사업자번호 자동하이픈
String.prototype.setNumberSSN = function(type) {
	var str = this.toString();
	str = str.replace(/\D/g, '');
	if(str == '') return;
	if(typeof type == 'undefined') {
		if(str.length > 13) str = str.substr(0,13); 
		if(str.length > 6) str = str.substr(0,6) + '-' + str.substr(6);
	} else {
		if(str.length > 10) str = str.substr(0,10);
		if(str.length > 5) str = str.substr(0,3) + '-' + str.substr(3,2) + '-' + str.substr(5);
		else if(str.length > 3) str = str.substr(0,3) + '-' + str.substr(3);
	}
	return str;
}

// 휴대폰번호, 전화번호 자동하이픈
String.prototype.setNumberPhone = function(type) {
	var str = this.toString();
	str = str.replace(/\D/g, '');
	if(str == '') return;
	if(typeof type == 'undefined') {
		if(str.substr(0,1) == '0') { // 휴대폰번호
			if(str.length > 12) str = str.substr(0,12);
			if(str.length > 11) str = str.substr(0,4) + '-' + str.substr(4, 4) + '-' + str.substr(8);
			else if(str.length > 10) str = str.substr(0,3) + '-' + str.substr(3, 4) + '-' + str.substr(7);
			else if(str.length > 6) str = str.substr(0,3) + '-' + str.substr(3, 3) + '-' + str.substr(6);
			else if(str.length > 3) str = str.substr(0,3) + '-' + str.substr(3);
		} else { // 1588 등으로 시작하는 번호
			if(str.length > 8) str = str.substr(0,8);
			if(str.length > 4) str = str.substr(0,4) + '-' + str.substr(4);
		}
	} else {
		if(str.substr(0,2) == '02') { // 서울전화번호
			if(str.length > 10) str = str.substr(0,10);
			if(str.length > 9) str = str.substr(0,2) + '-' + str.substr(2,4) + '-' + str.substr(6);
			else if(str.length > 5) str = str.substr(0,2) + '-' + str.substr(2,3) + '-' + str.substr(5);
			else if(str.length > 2) str = str.substr(0,2) + '-' + str.substr(2);
		} else if(str.substr(0,4) == '0502' || str.substr(0,4) == '0505') {
			if(str.length > 12) str = str.substr(0,12);
			if(str.length > 11) str = str.substr(0,4) + '-' + str.substr(4,4) + '-' + str.substr(8);
			else if(str.length > 7) str = str.substr(0,4) + '-' + str.substr(4,3) + '-' + str.substr(7);
			else if(str.length > 4) str = str.substr(0,4) + '-' + str.substr(4);
		} else if(str.substr(0,1) == '1') {
			if(str.length > 8) str = str.substr(0,4) + '-' + str.substr(4,4) + '-' + str.substr(8);
			else if(str.length > 4) str = str.substr(0,4) + '-' + str.substr(4);
		} else {
			if(str.length > 11) str = str.substr(0,11);
			if(str.length > 10) str = str.substr(0,3) + '-' + str.substr(3,4) + '-' + str.substr(7);
			else if(str.length > 6) str = str.substr(0,3) + '-' + str.substr(3,3) + '-' + str.substr(6);
			else if(str.length > 3) str = str.substr(0,3) + '-' + str.substr(3);
		}
	}
	return str;
}

String.prototype.setFileSize = function(fixed) {
	if(typeof fixed == 'undefined') fixed = 2;
	var str = Number(this.toString().setNumber());
	if(str >= 1073741824) {
		str = (str / 1073741824).toFixed(fixed) + 'G';
	} else if(str >= 1048576) {
		str = (str / 1048576).toFixed(fixed) + 'M';
	} else if(str >= 1024) {
		str = (str / 1024).toFixed(fixed) + 'K';
	} else {
		str = str + 'byte';
	}
	return str;
}

String.prototype.bytes = function() {
	var str = this.toString();
	var count = 0;
	var i = 0;
	for(i=0; i<str.length; i++) count += (str.charCodeAt(i) > 128) ? 2 : 1;
	return count;
}

String.prototype.truncate = function(length) {
	var str = this.toString();
	if(typeof length == 'undefined') return str;
	var count = 0;
	var i = 0;
	for(i=0; i<str.length; i++) {
		count += (str.charCodeAt(i) > 128) ? 2 : 1;
		if(count > length) return str.substring(0, i);
	}
	return str;
}

String.prototype.emailCheck = function() {
	var str = this.toString();
	return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(str);
}

String.prototype.ssnCheck = function() {
	var str = this.toString().setNumber();
	if(str == "") return false;
	var temp_no = str.substr(6, 1);
	if(temp_no == "5" || temp_no == "6" || temp_no == "7" || temp_no == "8") {
		var sum = 0;
		var odd = 0;
		buf = new Array(13);
		for(i=0; i<13; i++) {
			buf[i] = parseInt(str.charAt(i));
		}
		odd = buf[7] * 10 + buf[8];
		if(odd % 2 != 0) { return false; }
		if(buf[11] != 6 && buf[11] != 7 && buf[11] != 8 && buf[11] != 9) {
			return false;
		}
		multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
		for(i=0, sum=0; i<12; i++) {
			sum += (buf[i] *= multipliers[i]);
		}
		sum = 11 - (sum % 11);
		if(sum >= 10) {
			sum -= 10;
		}
		sum += 2;
		if(sum >= 10) {
			sum -= 10;
		}
		if(sum != buf[12]) {
			return false;
		}
		return true;
	} else {
		var ssnCheck = 0;
		for(var i = 0; i < 12; i++) {
			ssnCheck += (i % 8 + 2) * str.charAt(i);
		}
		ssnCheck = (11 - ssnCheck % 11) % 10;
		if(ssnCheck != str.charAt(12)) {
			return false;
		}
		return true;
	}
}
/* --------------------------------------------------- */

function AlertSuccess() {
	alert('정상적으로 처리되었습니다.');
}

function AlertError() {
	alert('오류가 발생되었습니다.');
}

// 윈도우 창닫기
function fnWindowClose() {
	if(/MSIE/.test(navigator.userAgent)) {
		if(navigator.appVersion.indexOf('MSIE 7.0')>=0 || navigator.appVersion.indexOf('MSIE 8.0')>=0) {
			window.open('about:blank','_self').close();
		} else {
			window.opener = self;
			self.close();
		}
	} else {
		window.opener = self;
		self.close();
	}
}

// OBJECT 출력
function FlashShow(url, width, height) { 
	document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ');
	document.write('codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ');
	document.write('width="' + width + '" height="' + height + '">');
	document.write(' <param name="movie" value="' + url + '">');
	document.write(' <param name="quality" value="high">');
	document.write(' <param name="wmode" value="transparent">');
	document.write(' <embed src="' + url + '" quality="high" ');
	document.write(' pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" ');
	document.write(' type="application/x-shockwave-flash" ');
	document.write(' width="' + width + '" height="' + height + '">');
	document.write(' </embed>');
	document.write('</object>');
}

function fnSleep(msec) {
	var start = new Date().getTime();
	var current = start;
	if(current-start < msec) current = new Date().getTime();
}

// 이미지 보기
function fnImageView(path) {
	var image = new Image();
	image.src = path;
	var is_gecko  = navigator.userAgent.toLowerCase().indexOf("gecko") != -1;
	var width = eval(image).width;
	var height = eval(image).height; 
	var screen_width = (screen.width - width) / 2; 
	var screen_height = (screen.height - height) / 3; 

	if(width >= screen.width) { 
		screen_width = 0; 
		height = (parseInt)(width * (height / width)); 
	}
	
	if(height >= screen.height) { 
		screen_height = 0; 
		width = (parseInt)(height * (width / height)); 
	}
	
	var js_url = '';
	js_url = '<script language="JavaScript">\n';
	js_url += '<!--\n';
	js_url += 'var ie = document.all;\n';
	js_url += 'var nn6 = document.getElementById&&!document.all;\n';
	js_url += 'var isdrag = false;\n';
	js_url += 'var x, y;\n';
	js_url += 'var dobj;\n';
	js_url += 'function movemouse(e) {\n';
	js_url += '	if(isdrag) {\n';
	js_url += '		dobj.style.left = nn6 ? tx + e.clientX - x : tx + event.clientX - x;\n';
	js_url += '		dobj.style.top  = nn6 ? ty + e.clientY - y : ty + event.clientY - y;\n';
	js_url += '		return false;\n';
	js_url += '	}\n';
	js_url += '}\n';
	js_url += 'function selectmouse(e) {\n';
	js_url += '	var fobj = nn6 ? e.target : event.srcElement;\n';
	js_url += '	var topelement = nn6 ? "HTML" : "BODY";\n';
	js_url += '	while(fobj.tagName != topelement && fobj.className != "dragme") {\n';
	js_url += '		fobj = nn6 ? fobj.parentNode : fobj.parentElement;\n';
	js_url += '	}\n';
	js_url += '	if(fobj.className == "dragme") {\n';
	js_url += '		isdrag = true;\n';
	js_url += '		dobj = fobj;\n';
	js_url += '		tx = parseInt(dobj.style.left+0);\n';
	js_url += '		ty = parseInt(dobj.style.top+0);\n';
	js_url += '		x = nn6 ? e.clientX : event.clientX;\n';
	js_url += '		y = nn6 ? e.clientY : event.clientY;\n';
	js_url += '		document.onmousemove = movemouse;\n';
	js_url += '		return false;\n';
	js_url += '	}\n';
	js_url += '}\n';
	js_url += 'document.onmousedown = selectmouse;\n';
	js_url += 'document.onmouseup = new Function("isdrag=false");\n';
	js_url += '//-->\n';
	js_url += '</'+'script>\n';

	var settings;

	if(is_gecko) {
		settings  = 'width=' + (width + 10) + ',';
		settings += 'height=' + (height + 10) + ',';
	} else {
		settings  = 'width=' + width + ',';
		settings += 'height=' + height + ',';
	}
	settings += 'top=' + screen_height + ',';
	settings += 'left=' + screen_width + ',';
	settings += 'scrollbars=no,';
	settings += 'resizable=yes,';
	settings += 'status=no';
	
	win = window.open('', 'image_window', settings);
	win.document.open();
	win.document.write('<html>\n');
	win.document.write('<head>\n');
	win.document.write('<meta http-equiv="imagetoolbar" CONTENT="no">\n');
	win.document.write('<meta http-equiv="content-type" content="text/html;">\n');
	var size = '이미지 사이즈 : ' + width + ' x ' + height;
	win.document.write('<title>' + size + '</title>\n');
	if(width >= screen.width || height >= screen.height) {
		win.document.write(js_url);
		var click = 'ondblclick="window.close();" style="cursor:move" title="' + size + '\n\n이미지 사이즈가 화면보다 큽니다.\n왼쪽 버튼을 클릭한 후 마우스를 움직여서 보세요.\n더블 클릭하면 창이 닫힙니다." alt="' + size + '\n\n이미지 사이즈가 화면보다 큽니다.\n왼쪽 버튼을 클릭한 후 마우스를 움직여서 보세요.\n더블 클릭하면 창이 닫힙니다."';
	} else {
		var click = 'onclick="window.close();" style="cursor:pointer" title="' + size + '\n클릭하면 창이 닫힙니다." alt="' + size + '\n클릭하면 창이 닫힙니다."'; 
	}
	win.document.write('<style>.dragme{position:relative;}</style>\n');
	win.document.write('</head> \n\n');
	win.document.write('<body leftmargin="0" topmargin="0" bgcolor="#ffffff" style="cursor:arrow;">\n');
	win.document.write('<table width="100%" height="100%" cellpadding="0" cellspacing="0">\n');
	win.document.write('<tr>\n');
	win.document.write('<td align="center" valign="middle">\n');
	win.document.write('<img src="' + image.src + '" width="' + width + '" height="' + height + '" border=0 class="dragme" ' + click + '>\n');
	win.document.write('</td>\n');
	win.document.write('</tr>\n');
	win.document.write('</table>\n');
	win.document.write('</body>\n');
	win.document.write('</html>\n');
	win.document.close();
	
	if(parseInt(navigator.appVersion) >= 4) {
		win.window.focus();
	}
}

// 즐겨찾기 추가
function addFavorite(obj, title) { 
	if($.browser.mozilla) { // Mozilla Firefox
		window.sidebar.addPanel(title, obj, ''); 
	} else if($.browser.msie) { // IE
		window.external.AddFavorite(obj, title); 
	} else if($.browser.safari) { // Safari
		return true;
	} else { 
		alert('Ctrl+D (Safari, Chrome) or Ctrl+B (Konqueror)'); 
	} 
	return false; 
}

function setCookie(name, value, expiredays ) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';'
}

function getCookie(name) {
	var nameOfCookie = name + '=';
	var x = 0;
	while(x <= document.cookie.length) {
		var y = (x+nameOfCookie.length);
		if(document.cookie.substring(x, y) == nameOfCookie) {
			if((endOfCookie=document.cookie.indexOf(';', y)) == -1)
				endOfCookie = document.cookie.length;
				
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(' ',x) + 1;
		if(x == 0) break;
	}
	return '';
}

/* --------------------------------------------------- */
/*				url parameter 리턴				   */
/* --------------------------------------------------- */
var getUrlParameter = function () {
	var ParameterObject = new Object();
	var locate = location.href;
	if(locate.indexOf("?") == -1) {
		return ParameterObject;
	}
	var parameter = locate.split("?")[1];
	var paramAreay = parameter.split("&");
	for(var i=0; i<paramAreay.length; i++) {
		var temp = paramAreay[i].split("=");
		ParameterObject[temp[0]] = temp[1];
	}
	getUrlParameter = function () { return ParameterObject; }
	return ParameterObject;
};

function filterKey(filter) {
	if(filter){
		// fromCharCode : 매개 변수에서 ASCII 값이 나타내는 문자들로 구성된 문자열을 반환합니다
		var sKey = String.fromCharCode(event.keyCode);
		// RegExp
		// 정규표현을 취급하는 객체로 new를 사용하지 않고 정규표현 문자열을 변수에 대입하는 것으로도 동일한 결과
		var re = new RegExp(filter);
		
		// test() : 일치하는 문자열이 있는 경우 true, 없으면 false 
		if(!re.test(sKey)) 
		{
			if(event.preventDefault){
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		}
	}
} 

// space 가 있으면 true, 없으면 false
function checkSpace( str )
{
     if(str.search(/\s/) != -1){
     	return true;
     } else {
        return false;
     }
}