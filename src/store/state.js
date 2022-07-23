const state = {
   // 从本地获取购物车商品数据，如果没有初始化为空数组
  cartData:JSON.parse(window.localStorage.getItem('cart-Data'))||[],
  // 用户登录状态码
  loginState:window.localStorage.getItem('loginState')||0
  // cartData:[]
  // test:'test测试字符串0'
}

export default state;
