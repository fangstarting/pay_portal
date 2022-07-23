/**
 * 函数
 */
/**
 * @param {Object} state 数据对象
 */
export const items = function(state){
  console.log('return>>state');
  console.log(state);
  // var carts = JSON.parse(window.localStorage.getItem('cart-Data'));
  // console.log(carts);
  // state.cartData.push(carts);
  // console.log(state);
  return state;//返回购物车数据->对象数组
}
