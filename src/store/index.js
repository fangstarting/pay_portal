import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

export default new Vuex.Store({
  state,  //保存数据
  getters,  //获取数据
  mutations,  //设置数据
  actions //判断执行方法体
  
  
  // state: {
  //   count: 0,
  //   todos: [
  //     { id: 1, text: '...', done: true },
  //     { id: 2, text: '...', done: false }
  //   ],
  //   cartData:[]
  // },
  // mutations: {
  //   addCount (state) {
  //     state.count++;
  //   },
  //   subCount (state) {
  //     state.count--;
  //   },
  //   // 添加购物车
  //   PUSH_PRODUCT_TO_CART(state, product){
  //     console.log('传递对象product>>');
  //     console.log(product);
  //     console.log(state);
  //     state.cartData.push({
  //       OrderId:0,  //订单号
  //       BookId:product.BookId,  //书籍编号
  //       UnitPrice:product.UnitPrice,  //单价
  //       quantity:product.quantity  //数量
  //     });
  //     console.log("购物车数据存储完毕>>");
  //     console.log(state.cartData);
  //   },
  //   // 增加商品数量
  //   INCREMENT_ITEM_QUANTITY(state, product){
  //     console.log('>>触发更新商品数量函数>>');
  //     console.log(product);
  //     const cartItem = state.cartData.find(item => item.BookId==product.BookId);
  //     cartItem.quantity +=product.quantity;
  //     console.log("数量更新完毕>>");
  //     console.log(cartItem);
  //   }
  // },
  // getters: {
  //   doneTodos: state => {
  //     return state.todos.filter(todo => todo.done)
  //   }
  // },
  // actions: {
  //   increment ({ commit }) {
  //     commit('increment')
  //   },
  //   addProductTOCart ({commit,state},product) {
  //     console.log('触发>>addProductTOCart>>');
  //     console.log('state>>');
  //     console.log(state);
  //     console.log('product>>');
  //     console.log(product);
  //     const cartItem = state.cartData.find(item => item.BookId==product.id);//判断当前对象是否存在于购物车//undefind->false
  //     console.log('cartItem(是否为空)>>');
  //     console.log(cartItem);
  //     if(!cartItem){
  //       console.log('此商品不存在->PUSH_PRODUCT_TO_CART 添加购物车方法');
  //       //此商品不存在->PUSH_PRODUCT_TO_CART 添加购物车方法
  //       commit('PUSH_PRODUCT_TO_CART',{
  //         BookId:product.id,
  //         UnitPrice:product.price,
  //         quantity:product.count
  //       });
  //     }else{
  //       console.log('此商品存在->INCREMENT_ITEM_QUANTITY 更新数量方法');
  //       //此商品存在->INCREMENT_ITEM_QUANTITY 更新数量方法
  //       commit('INCREMENT_ITEM_QUANTITY',{
  //         BookId:product.id,
  //         UnitPrice:product.price,
  //         quantity:product.count
  //       });
  //     }
  //   }
  // }
})
