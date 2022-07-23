import * as types from './mutation-types'
/**
 * 定义mutation对象
 */
const mutations = {
  // 'PUSH_PRODUCT_TO_CART'(){} //相当于定义方法实体
  // 添加购物车
  [types.PUSH_PRODUCT_TO_CART](state, product){
    // PUSH_PRODUCT_TO_CART(state, product){
    console.log('传递对象product>>');
    console.log(product);
    console.log(state);
    state.cartData.push({
      OrderId:0,  //订单号
      BookId:product.BookId,  //书籍编号
      UnitPrice:product.UnitPrice,  //单价
      quantity:product.quantity  //数量
    });
    console.log("购物车数据存储完毕>>");
    console.log(state.cartData);
    window.localStorage.setItem('cart-Data',JSON.stringify(state.cartData));
  },
  // 增加商品数量
  [types.INCREMENT_ITEM_QUANTITY](state, product){
    // INCREMENT_ITEM_QUANTITY(state, product){
    console.log('>>触发更新商品数量函数>>');
    console.log(product);
    const cartItem = state.cartData.find(item => item.BookId==product.BookId);
    cartItem.quantity += product.quantity;
    console.log("数量更新完毕>>");
    console.log(cartItem);
    console.log(state.cartData);
    window.localStorage.setItem('cart-Data',JSON.stringify(state.cartData));
  },
  [types.DELETE_CART_BOOK](state, id){
  // DELETE_CART_BOOK(state, id){
    console.log('>>触发删除购物车商品函数>>');
    console.log(state.cartData);
    var index = state.cartData.findIndex(item => item.BookId==id);
    console.log(index);
    const cartItem = state.cartData.splice(index,1);
    console.log(cartItem);
    window.localStorage.setItem('cart-Data',JSON.stringify(state.cartData));
  },
  [types.UP_LOGIN_STATE](state,stateCode){
    console.log('状态码改变>>'+stateCode);
    window.localStorage.setItem('loginState',stateCode);
  }
}
export default mutations;
