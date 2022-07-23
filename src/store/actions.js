import * as types from './mutation-types'
/**
 * @param {FunCtion}  commit 此函数用来执行mutation
 */
export const addProductTOCart = function({commit,state},product){
  //来处理多个mutation的执行
  //判断进行mutation中的那个方法
  console.log('触发>>addProductTOCart>>');
  console.log('state>>');
  console.log(state);
  console.log('product>>');
  console.log(product);
  console.log(state.cartData);
  const cartItem = state.cartData.find(item => item.BookId==product.id);//判断当前对象是否存在于购物车//undefind->false
  console.log('cartItem(是否为空)>>');
  console.log(cartItem);
  if(!cartItem){
    console.log('此商品不存在->PUSH_PRODUCT_TO_CART 添加购物车方法');
    //此商品不存在->PUSH_PRODUCT_TO_CART 添加购物车方法
    commit(types.PUSH_PRODUCT_TO_CART,{
      BookId:product.id,
      UnitPrice:product.price,
      quantity:product.count
    });
  }else{
    console.log('此商品存在->INCREMENT_ITEM_QUANTITY 更新数量方法');
    //此商品存在->INCREMENT_ITEM_QUANTITY 更新数量方法
    commit(types.INCREMENT_ITEM_QUANTITY,{
      BookId:product.id,
      UnitPrice:product.price,
      quantity:product.count
    });
  }
}
