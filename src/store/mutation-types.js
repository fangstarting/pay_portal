/**
 * 通过单独管理mutation name 来实现方法的调用
 * 通过 types.name->types.PUSH_PRODUCT_TO_CART
 */
// 添加购物车
export const PUSH_PRODUCT_TO_CART = 'PUSH_PRODUCT_TO_CART';
// 增加商品数量
export const INCREMENT_ITEM_QUANTITY = 'INCREMENT_ITEM_QUANTITY';
// 删除购物车商品
export const DELETE_CART_BOOK = 'DELETE_CART_BOOK';
// 用户状态码更改
export const UP_LOGIN_STATE = 'UP_LOGIN_STATE';
