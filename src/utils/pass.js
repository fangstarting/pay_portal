const pass = {
  ddosPass: '121582384@qq.com'
}

// 字符串加密构造函数
function compileStr(code) {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c)
}
// 字符串解密构造函数
function unCompileStr(code) {
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

// // 字符串加密调用
// let a = compileStr("I am believe")
// console.log(a);
// // 字符串解密调用
// let b = unCompileStr('Ui%81%CE%8D%82%C7%D1%D5%CE%DB%DB') //字符串内容是加密的I am believe
// console.log(b)


export { pass, compileStr, unCompileStr }