<!-- 订单列表管理 -->
<template>
  <div>
    <div class="header">
      <el-divider><h2>OrderListOperate</h2></el-divider>
    </div>
    <div class="container">
      <div class="topOperate">
        <el-button title="条件查询" @click="btnQuerySuper()" icon="el-icon-search" circle></el-button>
        <el-input
          style="width: 200px;"
          class="inline-input"
          prefix-icon="el-icon-edit"
          placeholder="订单号"
          v-model="queryOrderid"
          clearable>
        </el-input>
        <el-date-picker type="date" placeholder="日期" value-format="yyyy-MM-dd" v-model="queryOrderdate" style="width: 200px;"></el-date-picker>
        </el-date-picker>
        <el-button title="清空查询" @click="clearQueryInit()" icon="el-icon-loading" circle></el-button>
        <el-button title="状态查询" class="btnState" @click="btnStateFind()" icon="el-icon-search" circle></el-button>
        <el-select v-model="statetype" clearable placeholder="状态">
            <el-option
              v-for="item in stateTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </div>
      <div class="page">
        <el-pagination
                @size-change="pageSizechange"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"

                @current-change="pageCurrentchange"
                :current-page="currentPage"

                layout="total, sizes, prev, pager, next, jumper"
                :total="Count">
        </el-pagination>
      </div>
      <div class="table">
        <table width="" border="1" cellpadding="10" cellspacing="1">
          <tr>
            <th rowspan="2" width="50px">序&nbsp;&nbsp;号</th>
            <th height="25px">书&nbsp;籍&nbsp;信&nbsp;息</th>
            <th>订&nbsp;单&nbsp;信&nbsp;息</th>
            <th width="150px">发&nbsp;&nbsp;货</th>
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
          <tr height="50px" v-for="(itema,index) in onPageData">
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
            <td>
             <el-button title="未发货" v-if="stateIfNot(itema.orderInfo.OrderState)" @click="orderEnd(itema.orderInfo.OrderId)" type="success" icon="el-icon-check" circle></el-button>
              <!-- <el-button title="已发货" v-if="stateIfBe(itema.orderInfo.OrderState)" type="info" icon="el-icon-check" circle></el-button> -->
              <el-button title="已发货" v-else type="info" icon="el-icon-check" circle></el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrderListOperate',
    data() {
      return {
        orderData:[],//所有订单数据
        orderQueryData:[],//条件查询-
        // orderQueryObj:{},//条件查询->对象
        orderStateData:[],//订单状态数据池
        onPageData:[],//当前页数据->逻辑分页
        //查询条件
        queryOrderid:'',//String	订单编号，可以为空，空不作为查询条件
        queryOrderdate:'',//String	订单日期，可以为空，空不作为查询条件，格式为Yyyy-mm-dd 如：2018-11-28日期的订单信息
        // queryOrderdateShift:'',//Sun Oct 31 2021 00:00:00 GMT+0800 (中国标准时间)
        stateTypes:[ //select数据选择
          {
            value:0,
            label:'全部订单'
          },
          {
            value:1,
            label:'已生成'
          },
          {
            value:2,
            label:'已发货'
          },
          {
            value:3,
            label:'已完成'
          }
        ],
        statetype:'',//Integer	订单状态编号：0或为空是全部订单/1已生成的订单/2已发货的订单/3已完成的订单
        dataType: Boolean,//数据源 true->query订单 false->state订单
        //>>逻辑分页
        pageSize: 5,//每页数据量
        currentPage: 1,//当前页数
        Count: 0,//数据总量
        //订单发货状态flag->Operate
        testData:''
      }
    },
    methods:{
      init(){
        this.getOrderDate();//初始化所有订单列表

        // this.getPageList()
      },
      //根据条件查询获取数据
      getOrderDate(){
        console.log('根据条件查询获取数据>>');
        console.log(this.queryOrderdate);
        let orderid = this.queryOrderid==''?null:this.queryOrderid;
        let orderdate = this.queryOrderdate==''?null:this.queryOrderdate;
        console.log("params>>orderid:"+orderid+">>orderdate:"+orderdate);
        this.$axios.get('bg/orderqueryadn',{params:{orderid,orderdate}}).then(e=>{
          if(orderid==null&&orderdate==null){
            //返回所有数据->
            console.log('获取所有数据->>');
            this.orderData = e.data;
            console.log(this.orderData);
            this.Count = e.data.length;//初始化数据量
            this.getPageList(this.orderData);//获取数据后渲染当前页数据
          }else{
            //返回条件查询数据->
            console.log('获取条件查询数据->>');
            this.orderQueryData = e.data;
            // console.log(this.orderQueryData);
            this.Count = e.data.length;//初始化数据量
            this.getPageList(this.orderQueryData);//获取数据后渲染当前页数据
          }
        }).catch();
      },
      //根据订单状态获取数据
      getStateOrderData(){
        let statetype = this.statetype==''?0:this.statetype;
        this.$axios.get('bg/orderstatequery',{params:{statetype}}).then(e=>{
          this.orderStateData = e.data;
          // console.log(this.orderStateData);
          this.Count = e.data.length;//初始化数据量
          this.getPageList(this.orderStateData);//获取数据后渲染当前页数据
        }).catch();
      },
      //逻辑分页
      /**
       * @param {Array} arrData 数据源
       */
      getPageList(arrData){
        console.log(">>getPageList(arrData)");

        var data = Array;//数据源
        // if(arrData!=null||arrData!=undefined||arrData!=''){
          if(arrData!=undefined||arrData!=null){
          data = arrData;
          console.log(">>已有数据源>>加载完毕");
        }else{
          //从新获取数据源
          //数据源 true->query订单 false->state订单
          console.log(">>无数据源>>判断获取数据源");
          if(this.dataType){
            if(this.queryOrderid==''&&this.queryOrderdate==''){
              data = this.orderData;//所有数据
            }else{
              data = this.orderQueryData;//条件数据
            }
          }else{
            if(this.statetype==''&&this.statetype==0){
              data = this.orderData;//所有数据
            }else{
              data = this.orderStateData;//状态查询数据
            }
          }
          console.log(">>无参数据源加载完毕");
        }
        console.log(">>逻辑分页加载ing");
        /*
        start=(currentPage-1)*pageSize
        end=(start+pageSize<data.length)?start+pageSize:data.length
        */
        this.onPageData.length = 0;//初始化onPageData
        var start = (this.currentPage-1)*this.pageSize;
        var end = (start+this.pageSize<data.length)?start+this.pageSize:data.length;
        this.onPageData = data.slice(start,end);
        console.log(">>当前页数据切割完毕>>");
        console.log(this.onPageData);
      },
      pageSizechange(e){
        this.pageSize = e;
        this.getPageList();
      },
      pageCurrentchange(e){
        console.log("当前页>>"+e);
        this.currentPage = e;
        this.getPageList();
      },
      //判断发货状态
      /**
       * @param {String} strState 订单状态
       */
      stateIfNot(strState){
        //未发货
        if(strState=="已生成"){
          return true;
        }else{
          return false;
        }
      },
      // stateIfBe(strState){
      //   //已发货
      //   if(strState=="已生成"){
      //     return false;
      //   }else{
      //     return true;
      //   }
      // },
      /**
       * @param {String} orderid 订单号
       */
      orderEnd(orderid){
        this.$confirm('是否确认发货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.axiosOrderEnd(orderid);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      axiosOrderEnd(orderid){
        this.$axios.get('bg/orderstatesend',{params:{orderid}}).then(e=>{
          console.log(e);
          let desc = '发货：'+e.data.status;
          this.$message({
            type: 'success',
            message: desc
          });
          //重载当前页面数据
          this.getOrderDate();
        }).catch();
      },
      /**
       * 查询模块
       * 状态查询与条件查询互斥
       */
      //状态查询
      btnStateFind(){
        this.dataType=false;
        this.currentPage=1;
        this.queryOrderid='';
        this.queryOrderdate='';
        // this.queryOrderdateShift='';
        this.getStateOrderData();
      },
      //条件查询
      btnQuerySuper(){
        this.dataType=true;
        this.currentPage=1;
        // if(this.queryOrderdateShift!=''){
        //   let date = this.queryOrderdateShift;
        //   let y = date.getFullYear();
        //   let m = date.getMonth()+1;
        //   let d = date.getDate();
        //   let dateStr = y+"-"+m+"-"+d;
        //   this.queryOrderdate = dateStr;
        //   this.statetype='';
        //   this.getOrderDate();
        // }else{
        //   this.statetype='';
        //   this.getOrderDate();
        // }
        this.getOrderDate();
      },
      //清空查询
      clearQueryInit(){
        this.queryOrderid='';
        this.queryOrderdate='';
        // this.queryOrderdateShift='';
        this.statetype='';
        this.getOrderDate();
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
  .header{
    height: 50px;
    margin-top: 10px;
    border: 1px dashed #ffffff;
  }
  .container{

  }
  .topOperate{
    text-align: left;
    margin-top: 20px;
    margin-left: 50px;
  }
  .topOperate .btnState{
    /* margin-left: 200px; */
    margin-left: 20%;
  }
  .page{
    text-align: left;
    margin-left: 50px;
    margin-top: 20px;
  }
  .table{
    /* width: 1065px; */
    /* height: 500px; */
    margin-top: 10px;
    margin-left: 50px;
    /* border: 1px solid #333333; */
    padding-bottom: 50px;
    padding-right: 30px;
  }
  .table table{
   /* width: 100%;
    height: 100%; */
    min-width: 1008px;
  }
  .table table, th, td {
    border: 1px dashed #8c8c85;
  }
</style>
