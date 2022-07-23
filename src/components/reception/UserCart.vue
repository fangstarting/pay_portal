<!-- 购物车 -->
<template>
  <div>
    <div class="top">
      <div class="top">
        <el-divider><h2>购&nbsp;物&nbsp;车</h2></el-divider>
      </div>
    </div>
    <div id="crumbs">
      <div class="left">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/userOrder' }">我的订单</el-breadcrumb-item>
          <el-breadcrumb-item>购物车</el-breadcrumb-item>

        </el-breadcrumb>
      </div>
    </div>
    <div class="list">
      <!-- <h2>count:{{ count }}</h2> -->
      <!-- <p>todos:{{todos}}</p> -->
      <!-- <h2>cartData:{{items.cartData}}</h2> -->

      <el-table
          ref="multipleTable"
          :data="items.cartData"
          tooltip-effect="dark"
          style="width: 1000px"
          height="400"
          @selection-change="cartChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="序号"
            type="index"
            width="120">
          </el-table-column>
          <el-table-column
            prop="BookId"
            label="书籍编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="UnitPrice"
            label="价格"
            width="120">
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="金额"  width="120">
            <template slot-scope="scope">
              {{scope.row.UnitPrice*scope.row.quantity}}
            </template>
          </el-table-column>
          <el-table-column label="移除"  width="50">
            <template slot-scope="scope">
              <el-button @click='delCartItem(scope.row.BookId)' size="mini" icon="el-icon-close" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="operate">
      <el-badge :value="placeOrderObj.length" :max="99" class="item">
        <el-button @click="placeOrder(placeOrderObj)" type="danger" plain>立即下单购买</el-button>
      </el-badge>
      <el-button @click="back">返回商品展示</el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  // import { mapState } from 'vuex'
  // import { mapActions } from 'vuex'

  export default {
    name: 'UserCart',
    data() {
      return {
        listData:[],
        placeOrderObj:[],
        rmbSum: 0
      }
    },
    computed:{
      /**
       * 扩展运算符...
       */
      ...mapGetters([
        'items'
      ]),  //相当于在computed中定义的计算属性是一样的
      moneySum(price,count){
        var rowSum = price*count;
        this.rmbSum += rowSum;
        return rowSum;
      }
    },
    // computed: mapState({
    //   // 箭头函数可使代码更简练
    //   count: state => state.count,

    //   // 传字符串参数 'count' 等同于 `state => state.count`
    //   countAlias: 'count',

    //   // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    //   countPlusLocalState (state) {
    //     return state.count + this.localCount
    //   }
    // }),
    // computed: mapState([
    //   // 映射 this.count 为 store.state.count
    //   'count',
    //   'todos',
    //   'cartData'
    // ]),
    methods:{
      //相当于定义一个pushProductToCart(){}这个方法在methods当中
      // ...mapMutations({
      //   pushProductToCart: 'PUSH_PRODUCT_TO_CART'
      // })
      ...mapMutations({
        delCartItem: 'DELETE_CART_BOOK'
      }),
      init(){
        // console.log('this.$store.getters');
        // console.log(this.$store.getters.items);
        // this.increment();
      },
      increment() {
        // this.$store.commit('increment')
        // console.log(this.$store.state.count)
      },
      // ...mapActions({
      //   add: 'addProductTOCart'
      // }),
      operate(type){
        // this.$store.commit(type);
      },
      cartChange(val){
        console.log(val);
        this.placeOrderObj = val;
      },
      //下单->状态判断
      placeOrder(obj){
        //登录状态判断
        if(localStorage.getItem("loginState")==1){
          if(this.placeOrderObj.length==0){
            this.$message({
              type: 'warning',
              message: '请选择需要购买的商品！'
            });
          }else{
            this.$confirm('即将下单并扣款, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this.upplaceOrder(obj);
            }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

          }
        }else{
          this.$message({
            type: 'warning',
            message: '请您先登录!'
          });
          // this.$router.push('/userLogin');
        }
      },
      //向服务器发送订单信息
      upplaceOrder(obj){
        this.$axios.post('createorder',obj).then(e=>{
          console.log(e);
          let statedesc = e.data.statedesc;
          if(e.data.orderId){
            //成功
            this.$message({
              type: 'success',
              message: statedesc+'，单号：'+e.data.orderId
            });
            this.toggleSelection();
          }else{
            //失败
            this.$message({
              type: 'warning',
              message: statedesc
            });
          }
        }).catch();
      },
      //取消选择
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      back(){
        history.go(-1);
      }
    },
    created() {

    },
    mounted() {
      this.init();
    }

  }
</script>

<style scoped>
  #crumbs{
    position: relative;
    /* border: 1px dashed #333333; */
    margin: 30px auto 20px;
    height: 35px;
    width: 1200px;
  }
  #crumbs .left{
    position: absolute;
    left: 5%;
    padding: 10px;
  }
  .list{
    /* border: 1px dashed #333333; */
    width: 1000px;
    margin: 0 auto;
    box-shadow: 0 0 5px #000000;
  }
  .operate{
    margin-top: 50px;
  }
  .operate>.el-button,.el-badge{
    margin: 0px 50px;
  }
</style>
