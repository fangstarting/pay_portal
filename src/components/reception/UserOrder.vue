<!-- 用户订单 -->
<template>
  <div>
    <div class="top">
      <el-divider><h2>订&nbsp;单&nbsp;信&nbsp;息</h2></el-divider>
    </div>
    <div id="crumbs">
      <div class="left">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/userCart' }">购物车</el-breadcrumb-item>
          <el-breadcrumb-item>我的订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="table">
      <table width="" border="1" cellpadding="10" cellspacing="1">
        <tr>
          <th rowspan="2" width="50px">序&nbsp;&nbsp;号</th>
          <th height="25px">书&nbsp;籍&nbsp;信&nbsp;息</th>
          <th>订&nbsp;单&nbsp;信&nbsp;息</th>
          <th width="150px">取&nbsp;消&nbsp;订&nbsp;单</th>
        </tr>
        <tr>
          <th width="300px">
            <tr height="35px">
              <th width="100px">编&nbsp;&nbsp;号</th>
              <th width="100px">数&nbsp;&nbsp;量</th>
              <th width="100px">单&nbsp;&nbsp;价</th>
            </tr>
          </th>
          <th>
            <tr height="35px">
              <th width="100px">单&nbsp;&nbsp;号</th>
              <th width="200px">时&nbsp;&nbsp;间</th>
              <th width="100px">状&nbsp;&nbsp;态</th>
            </tr>
          </th>
          <th width="150px">Operate</th>
        </tr>
        <tr height="50px" v-for="(itema,index) in order">
          <td>{{index+1}}</td>
          <td>
            <tr height="35px" v-for="(itemb,index) in itema.orderBooksInfo">
              <!-- <td>{{itemb.OrderId}}</td> -->
              <td width="100px">{{itemb.BookId}}</td>
              <td width="100px">{{itemb.Quantity}}</td>
              <td width="100px">{{itemb.UnitPrice}}</td>
            </tr>
          </td>
          <td>
            <tr height="35px">
              <td width="100px">{{itema.orderInfo.OrderId}}</td>
              <td width="200px">{{itema.orderInfo.OrderDate}}</td>
              <td width="100px">{{itema.orderInfo.OrderState}}</td>
            </tr>
          </td>
          <!-- <td>
           <el-button title="取消订单" v-if="stateIfNot(itema.orderInfo.OrderState)" @click="orderCle(itema.orderInfo.OrderId)" type="success" icon="el-icon-check" circle></el-button>
            <el-button title="已取消" v-else type="info" icon="el-icon-check" circle></el-button>
          </td> -->
          <td>
            <el-button v-if="itema.orderInfo.OrderState!='已取消'" @click="orderCle(itema.orderInfo.OrderId)" title="取消订单" type="warning" icon="el-icon-minus" circle></el-button>
            <el-button v-else title="已取消" type="info" icon="el-icon-minus" circle></el-button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserOrder',
    data() {
      return {
        order:[]
        // orderBooksInfo:[],
        // orderInfo:{}
      }
    },
    methods:{
      init(){
        this.getOrder();
      },
      getOrder(){
        this.$axios.get('myorder').then(e=>{
          this.order=e.data;
          console.log(this.order);
          if(this.order[0].statedesc=="用户超时或用户没有登陆"){
            this.$message({
              type: 'warning',
              message: '用户超时或用户没有登陆'
            });
          }
        }).catch();
      },
      orderCle(orderid){
        this.$confirm('是否确认取消订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.axiosOrderCle(orderid);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      axiosOrderCle(orderid){
        console.log(orderid);
        this.$axios.get('cancelorder',{params:{orderid}}).then(e=>{
          console.log(e);
          let desc = e.data.statedesc;
          this.$message({
            type: 'success',
            message: desc
          });
          //重载当前页面数据
          this.getOrder();
        }).catch();
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  .order{
    background-color: #68C3FC;
  }
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
  .table{
    width: 1065px;
    /* border: 1px solid #333333; */
    margin: 0 auto;
    margin-bottom: 150px;
    box-shadow: 0 0 10px #810707;
  }
  .table table{
   /* width: 100%;
    height: 100%; */
  }
  .table table, th, td {
    border: 1px dashed #8c8c85;
  }
</style>
