<!-- 销售额管理 -->
<template>
  <div>
    <div class="header">
      <el-divider><h2>SaleroomOperate</h2></el-divider>
    </div>
    <div class="container">
      <div class="topOperate">
        <el-select v-model="findType" @change="findDateWeb=''" style="width: 120px;" clearable placeholder="查询方式">
            <el-option
              v-for="item in findTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        <el-date-picker
          v-if="findType==1"
          v-model="findDateWeb"
          type="year"
          value-format="yyyy"
          style="width: 200px;"
          placeholder="选择年">
        </el-date-picker>
        <el-date-picker
          v-else-if="findType==2"
          v-model="findDateWeb"
          type="month"
          value-format="yyyy-MM"
          style="width: 200px;"
          placeholder="选择月">
        </el-date-picker>
        <el-date-picker
          type="date"
          v-else-if="findType==3"
          placeholder="选择日"
          value-format="yyyy-MM-dd"
          v-model="findDateWeb"
          style="width: 200px;"
        >
        </el-date-picker>
        <el-date-picker
          type="date"
          v-else
          placeholder="选择日期"
          disabled=""
          v-model="findDateWeb"
          style="width: 200px;"
        >
        </el-date-picker>
        <el-button title="查询" @click="btnFInd(findType)" icon="el-icon-search" circle></el-button>
      </div>
      <div class="page">
        <el-pagination
                @size-change="pageSizechange"
                :page-sizes="[5, 10, 50, 100]"
                :page-size="pageSize"

                @current-change="pageCurrentchange"
                :current-page="currentPage"

                layout="total, sizes, prev, pager, next, jumper"
                :total="Count">
        </el-pagination>
      </div>
      <div class="list">
        <div class="list-left">
          <el-table
              :data="onPageData"
              max-height="420px"
              style="width: 650px;"
              >
              <el-table-column
                label="序号"
                type="index"
                header-align="center"
                align="center"
                width="200px">
              </el-table-column>
              <el-table-column
                prop="bookid"
                label="书籍编号"
                header-align="center"
                align="center"
                width="200px">
              </el-table-column>
              <el-table-column
                prop="sum"
                label="销售额"
                header-align="center"
                align="center"
                width="250px">
              </el-table-column>
          </el-table>
        </div>
        <div class="list-rigth">
          <div id="Adminshowyese" style="width: 500px; height: 500px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SaleroomOperate',
    data() {
      return {
        bookcount:[],//历史销量排名
        bookcountyear:[],//年书藉销量排名
        bookcounmonth:[],//年月书藉销量排名
        bookcounday:[],//日书藉销量排名
        onPageData:[],//当前页数据

        moneySum:'',//总汇

        year:String,
        yearmonth:String,
        yearmonthday:String,

        pageSize: 5,
        currentPage: 1,
        Count: 0,

        findType:'',
        findTypes:[
          {
            value: 0,
            label:'总销售额'
          },
          {
            value: 1,
            label:'年销售额'
          },
          {
            value: 2,
            label:'月销售额'
          },
          {
            value: 3,
            label:'日销售额'
          }
        ],
        findDateWeb:'',
        EchartsData:[],//Echarts
        titleText:'总销售额',
        typeText:'总销售额',
        TestData:''
      }
    },
    methods:{
      init(){
        this.getCount();
      },
      getCount(){
        //获取销售额详情
        this.$axios.get('bg/bookmoneysum',{params:{}}).then(e=>{
          console.log(e);
          this.bookcount = e.data;
          // this.Count=e.data.length;
          this.getPageData(e.data);
        }).catch();
      },
      getCountYear(year){
        /**
         * axios 并发请求
         */
        //获取销售额总汇
        var getA=()=>{
          return this.$axios.get('bg/bookmoneyyear',{params:{year}});
        }
        //获取销售额详情
        var getB=()=>{
          return this.$axios.get('bg/bookmoneysumyear',{params:{year}});
        }
        this.$axios.all([getA(),getB()]).then(this.$axios.spread((A,B)=>{
          console.log('并发请求完毕>>');
          // console.log(A);
          // console.log(B);
          this.moneySum = A.data.sumMoney;
          this.bookcountyear = B.data;
          this.getPageData(B.data);//加载数据
        })).catch();

        // //获取销售额总汇
        // this.$axios.get('bg/bookmoneyyear',{params:{year}}).then(e=>{
        //   // console.log('获取销售额总汇');
        //   this.moneySum = e.data.sumMoney;
        // }).catch();
        // //获取销售额详情
        // this.$axios.get('bg/bookmoneysumyear',{params:{year}}).then(e=>{
        //   this.bookcountyear = e.data;
        //   // this.Count=e.data.length;
        //   this.getPageData(e.data);
        // }).catch();
      },
      getCountMonth(yearmonth){
        /**
         * axios 并发请求
         */
        //获取销售额总汇
        var getA=()=>{
          return this.$axios.get('bg/bookmoneyyearmonth',{params:{yearmonth}});
        }
        //获取销售额详情
        var getB=()=>{
          return this.$axios.get('bg/bookmoenysumyearmonth',{params:{yearmonth}});
        }
        this.$axios.all([getA(),getB()]).then(this.$axios.spread((A,B)=>{
          console.log('并发请求完毕>>');
          // console.log(A);
          // console.log(B);
          this.moneySum = A.data.sumMoney;
          this.bookcounmonth = B.data;
          this.getPageData(B.data);//加载数据
        })).catch();

        // //获取销售额总汇
        // this.$axios.get('bg/bookmoneyyearmonth',{params:{yearmonth}}).then(e=>{
        //   // console.log('获取销售额总汇');
        //   this.moneySum = e.data.sumMoney;
        // }).catch();
        // //获取销售额详情
        // this.$axios.get('bg/bookmoenysumyearmonth',{params:{yearmonth}}).then(e=>{
        //   this.bookcounmonth = e.data;
        //   // this.Count=e.data.length;
        //   this.getPageData(e.data);
        // }).catch();
      },
      getCountDay(yearmonthday){
        /**
         * axios 并发请求
         */
        //获取销售额总汇
        var getA=()=>{
          return this.$axios.get('bg/bookmoneyyearmonthday',{params:{yearmonthday}});
        }
        //获取销售额详情
        var getB=()=>{
          return this.$axios.get('bg/bookmoenysumyearmonthday',{params:{yearmonthday}});
        }
        this.$axios.all([getA(),getB()]).then(this.$axios.spread((A,B)=>{
          console.log('并发请求完毕>>');
          // console.log(A);
          // console.log(B);
          this.moneySum = A.data.sumMoney;
          this.bookcounday = B.data;
          this.getPageData(B.data);//加载数据
        })).catch();

        // //获取销售额总汇
        // this.$axios.get('bg/bookmoneyyearmonthday',{params:{yearmonthday}}).then(e=>{
        //   // console.log('获取销售额总汇');
        //   this.moneySum = e.data.sumMoney;
        // }).catch();
        // //获取销售额详情
        // this.$axios.get('bg/bookmoenysumyearmonthday',{params:{yearmonthday}}).then(e=>{
        //   this.bookcounday = e.data;
        //   // this.Count=e.data.length;
        //   this.getPageData(e.data);
        // }).catch();
      },
      pageSizechange(e){
        this.pageSize = e;
        this.getPageData(null,this.findType);
      },
      pageCurrentchange(e){
        console.log("当前页>>"+e);
        this.currentPage = e;
        this.getPageData(null,this.findType);
      },
      /**
       * @param {Int} type findType
       */
      btnFInd(type){
        if(type==''||type==0){
          this.typeText='总销售额';
          this.getCount();
        }else if(type==1){
          this.typeText=' 年销售额'
          // this.titleText= this.findDateWeb+' 年销售额\n总汇：'+this.moneySum+'￥';
          this.getCountYear(this.findDateWeb);
        }else if(type==2){
          this.typeText=' 月销售额'
          // this.titleText= this.findDateWeb+' 月销售额\n总汇：'+this.moneySum+'￥';
          this.getCountMonth(this.findDateWeb);
        }else if(type==3){
          var Dates = new Date();
          var Y = Dates.getFullYear();
          var M = Dates.getMonth() + 1;
          var D = Dates.getDate();
          var times = Y + (M < 10 ? "-0" : "-") + M + (D < 10 ? "-0" : "-") + D;
          this.findDateWeb = this.findDateWeb==''?times:this.findDateWeb;

          this.typeText=' 日销售额'
          // this.titleText= this.findDateWeb+' 日销售额\n总汇：'+this.moneySum+'￥';
          this.getCountDay(this.findDateWeb);
        }
      },
      /**
       * @param {Array} arrData 数据源
       * @param {Array} type 数据源 类型
       */
      getPageData(arrData,type){
        console.log('>>getPageData(arrData,type)参数：');
        console.log(arrData,type);
        //选择数据源
        var data = Array;//数据源
        if(arrData!=undefined||arrData!=null){
          data = arrData;
          console.log(">>已有数据源>>加载完毕");
        }else{
          //选择数据源
          if(type==''||type==0){
            data = this.bookcount;
          }else if(type==1){
            data = this.bookcountyear;
          }else if(type==2){
            data = this.bookcounmonth;
          }else if(type==3){
            data = this.bookcounday;
          }else{
            console.log(type);
          }
        }
        console.log(">>逻辑分页加载ing");
        this.onPageData.length = 0;//初始化onPageData
        this.Count = data.length;
        if(this.Count==0){
          this.titleText='暂无数据';
          this.EchartsData=[];
          this.echartsStart();//加载Echarts
          this.$message({
            type: 'warning',
            message: '暂无数据！'
          });
        }else{
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
          //加载Echarts
          this.echartsStart();
        }
      },
      /**
       * Echarts
       */
      echartsStart(){
        if(this.findType==''||this.findType==0){
          console.log(this.typeText);
          this.titleText = this.typeText;
        }else{
          this.titleText = this.findDateWeb+this.typeText+'\n总汇：'+this.moneySum+'￥';
        }
        this.EchartsData.length=0;
        let myChart = this.$echarts.init(document.getElementById('Adminshowyese'));
        console.log(this.onPageData);
        let obj = {};
        for (let index in this.onPageData) {
          let obj = {
            name:this.onPageData[index].bookid,
            value:this.onPageData[index].sum
          };
          console.log(obj);
          this.EchartsData.push(obj);
        }
        console.log(this.EchartsData);
        myChart.setOption({
          title: {
            text: this.titleText,
            left: 'center',
            textStyle:{
              fontSize:30
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "ID:{b} - Sum:{c} ({d}%)"
          },
          series: [
            {
              name: '图书销量',
              type: 'pie',
              radius: '60%',
              data:this.EchartsData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 12,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.1)'
                }
              }
            }
          ]
        });

      }
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
  .topOperate{
    margin-top: 5px;
  }
  .page{
    margin-top: 10px;
  }
  .list{
    margin-top: 10px;
    width: 1200px;
    margin: 0 auto;
  }
  .list .list-left{
    float: left;
  }
  .list .list-rigth{
    float: left;
  }
</style>
