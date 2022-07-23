<!-- 单个书籍对象的信息和操作 -->
<template>
  <div>
    <div class="top">
      <el-divider><h2>商&nbsp;品&nbsp;展&nbsp;示</h2></el-divider>
    </div>
    <!-- 面包屑 -->
    <div id="crumbs">
      <div class="left">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品展示</el-breadcrumb-item>
          <el-breadcrumb-item>我的订单</el-breadcrumb-item>
          <el-breadcrumb-item>购物车</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right">
        <router-link to="/userCart">
          <el-badge :value="items.cartData.length" :max="99" class="item">
            <el-button size="medium">购物车</el-button>
          </el-badge>
        </router-link>
      </div>
    </div>
    <!-- 图书对象 -->
    <div id="book">
      <div class="left">
        <div class="img">
          <img :src="book.ImageUrl" >
        </div>
      </div>
      <div class="content">
        <div class="title">
          <!-- 主标题 -->
          <div class="a">
            <h1 :title="book.Title">{{book.Title}}</h1>
          </div>
          <!-- 副标题 -->
          <div class="b">
            <h2 :title="book.Desc">{{book.Desc}}</h2>
          </div>
        </div>
        <div class="info">
          <span>
            作者：<a href="">{{book.Author}}<i class="el-icon-view el-icon--right"></i></a>
          </span>
          <span>
            出版社：<a href="">{{book.PublishName}}</a>
          </span>
          <span>
            出版时间：{{Publishtime}}
          </span>
        </div>
        <div class="price">
          <div class="price-a">
            <p>
              <span>云os价</span>
              <a href="">降价通知</a>
            </p>
            <p>
              ￥<span class="yen">{{book.Price}}</span>
              <span class="zhe">(9.9折)</span>
            </p>
          </div>
          <div class="price-b">
            <span>定价</span>
            <span class="line-del">￥{{book.Price}}</span>
          </div>
        </div>
        <!-- 操作 -->
        <div class="operate">
          <div class="address">
            <div class="p-left">配送至</div>
            <div class="right">
              <span>省:</span>
              <el-select v-model="address.pk" @change="getCity(address.pk)" placeholder="选择省" size="mini" style="width: 100px;">
                <el-option
                  v-for="item in province"
                  :key="item.pk"
                  :label="item.pv"
                  :value="item.pk">
                </el-option>
              </el-select>
              <span>市:</span>
              <el-select v-model="address.ck" @change="getCounty(address.ck)" placeholder="选择市" size="mini" style="width: 100px;">
                <el-option
                  v-for="item in city"
                  :key="item.ck"
                  :label="item.cv"
                  :value="item.ck">
                </el-option>
              </el-select>
              <span>区:</span>
              <el-select v-model="address.cyk" @change="getTown(address.cyk)" placeholder="选择区" size="mini" style="width: 100px;">
                <el-option
                  v-for="item in county"
                  :key="item.cyk"
                  :label="item.cyv"
                  :value="item.cyk">
                </el-option>
               </el-select>
               <span>镇:</span>
               <el-select v-model="address.tk" placeholder="选择镇" size="mini" style="width: 100px;">
                 <el-option
                   v-for="item in town"
                   :key="item.tk"
                   :label="item.tv"
                   :value="item.tk">
                 </el-option>
                </el-select>
            </div>
          </div>
          <!-- 服务 -->
          <div class="serve">
            <div class="p-left">服务</div>
            <div class="right">
              <span>
                由“<em><b>云os</b></em>”发货，并提供售后服务。
              </span>
              <span>10:25前完成下单，预计<b>明天</b>可送达</span>
            </div>
          </div>
          <div class="operate-end">
            <div class="sum-left">
              <span>数量</span>
              <el-input-number v-model="addCartObj.count" controls-position="right" @change="handleChange" :min="1" style="width: 100px;"></el-input-number>
            </div>
            <div class="end-btn">
              <el-button @click="addCart(addCartObj)" type="danger" icon="el-icon-shopping-cart-1">加入购物车</el-button>
              <el-button @click="placeOrder(addCartObj)" type="danger" plain>立即购买</el-button>
            </div>
          </div>

        </div>
      </div>
      <div class="right">

      </div>

    </div>
    <div id="end">
      <!-- 关联商品 -->
      <div class="relevance">
         <el-divider>购买此商品的顾客还购买过</el-divider>
         <div class="booksList">
           <div v-if="" class="book" v-for="(item,index) in books" :key="index">
              <div class="img">
               <img :src="item.ImageUrl" @click="bookInfo(item.BookId)" width="150px" height="180px">
              </div>
              <div class="price">
               <span @click="bookInfo(item.BookId)">￥{{item.Price}}</span>
              </div>
              <div class="title">
               <p @click="bookInfo(item.BookId)">{{item.Title}}}</p>
              </div>
              <div class="author">
                <span>{{item.Author}}</span>
              </div>
            </div>
         </div>
      </div>
    </div>

  </div>
</template>

<script>
  // import { mapMutations,mapActions } from 'vuex';
  // import { mapState } from 'vuex';
  // import { mapState } from 'vuex'
  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex'
  export default {
    name: 'BookItem',
    data() {
      return {
        BookId: '',
        book: {},
        Publishtime: '',
        province: [],//省份
        city:[],//城市
        county:[],//区县
        town:[],//村镇
        address:{
          pk:'',
          ck:'',
          cyk:'',
          tk:''
        },
        books:[],//推荐书籍列表

        /**
         * 加入购物车数据对象
         */
        addCartObj:{
          id:'',
          price:'',
          count: 1
        },
        test: ''
      }
    },
    methods:{
      init(){
        // this.$store.getters.items.cartData.push({
        //   id: 1001,
        //   price: 10,
        //   count: 1
        // });
        // console.log(this.$store.getters.items.cartData);
        // console.log(this.$store);
        //获取BookId
        // this.BookId=this.$route.params.BookId;
        this.BookId=this.$route.query.id;
        this.addCartObj.id = this.BookId;//加入购物车的对象当中
        //获取book对象
        var bookid = this.BookId;
        this.$axios.get('querybookforbookid',{params:{bookid}}).then(e=>{
          this.book = e.data;
          this.addCartObj.price = this.book.Price;
          let time = e.data.PublishDate.split(" ");
          this.Publishtime = time[0];
          //获取推荐书籍列表
          this.booksList();
        }).catch();
      },
      //获取省市区地址
      getProvince(){
        //省份
        this.$axios.get('getsheng').then(e=>{
          this.province = e.data;
        }).catch();
      },
      getCity(pk){
        //城市
        this.city.length=0;//初始化
        this.county.length=0;
        this.town.length=0;
        this.address.ck='';
        this.address.cyk='';
        this.address.tk='';
        this.$axios.get('getchengshibysid?pk='+pk).then(e=>{
          this.city = e.data;
        }).catch();
      },
      getCounty(ck){
        //区县
        this.county.length=0;//初始化
        this.town.length=0;
        this.address.cyk='';
        this.address.tk='';
        this.$axios.get('getcountrybycityid?ck='+ck).then(e=>{
          this.county = e.data;
        }).catch();
      },
      getTown(cyk){
        //乡镇
        this.town.length=0;//初始化
        this.address.tk='';
        this.$axios.get('gettownbycid?cyk='+cyk).then(e=>{
          this.town = e.data;
        }).catch();
      },
      //获取书本数量
      handleChange(value) {
        this.addCartObj.count = value;
      },
      //获取推荐书籍列表
      booksList(){
        var cid = this.book.CategoryId;
        // var cid = 25;
        var pagesize = 12;
        this.$axios.get('querybookforavgpageadn',{params:{cid,pagesize}}).then(e=>{
          console.log('获取推荐书籍列表>>类别Id:'+cid);
          this.books = e.data.data;
          console.log(this.books);
        }).catch();
      },
      //点击书籍获取书籍信息/加入购物车/购买
      bookInfo(id){
        // let routeUrl = this.$router.resolve({
        //   path:'/bookItem',
        //   query:{id:id}
        // });
        // window.open(routeUrl.href,'_blank');
        this.$router.push({
          path:'/bookItem',
          query:{id:id}
        });
        location.reload();
      },
      /**
       * 添加到购物车
       */
      // addCart(obj){
      //   window.localStorage.setItem('cartData',JSON.stringify(obj));
      // },
      /**
       *
       */
      // ...mapMutations({
      //   pushProductToCart: 'PUSH_PRODUCT_TO_CART'
      // }),
      // ...mapActions({
      //   addProductTOCart: 'addProductTOCart'
      // }),
      // addProductTOCart(){
      //   this.$store.dispatch('addProductTOCart');
      // },
      ...mapActions({
        add: 'addProductTOCart'
      }),
      addCart(obj){
        this.$message({
          type: 'success',
          message: '已加入购物车！'
        });
        this.add(obj);
      },
      testState(){
        console.log(this.$store.state);
      },
      //立即购买->下订单
      placeOrder(obj){
        //登录状态判断
        if(localStorage.getItem("loginState")==1){
          if(this.address.ck!=''){
            this.$confirm('即将下单购买并扣款, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                var book = [
                  {
                    OrderId:0,
                    BookId:obj.id,
                    Quantity:obj.count,
                    UnitPrice:obj.price
                  }
                ];
                console.log(book);
                this.$axios.post('createorder',book).then(e=>{
                  console.log(e);
                  let statedesc = e.data.statedesc;
                  if(e.data.orderId){
                    //成功
                    this.$message({
                      type: 'success',
                      message: statedesc+'，单号：'+e.data.orderId
                    });
                  }else{
                    //失败
                    this.$message({
                      type: 'warning',
                      message: statedesc
                    });
                  }
                }).catch();
              }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }else{
            this.$message({
              type: 'warning',
              message: '请选择配送地址！'
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
      addressList(){

      }
    },
    computed:{
      ...mapGetters(['items'])
    },
    created() {
      this.init();
    },
    mounted() {
      //获取省份
      this.getProvince();
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
  #crumbs>div{
    float: left;
  }
  #crumbs .left{
    position: absolute;
    left: 5%;
    padding: 10px;
  }
  #crumbs .right{
    position: fixed;
    right: 10%;
  }
  /* 书籍图片 */
  #book{
    width: 1200px;
    margin: 0 auto;
    /* border: 1px dashed #333333; */
  }
  #book::after{
    content: "";
    display: block;
    clear: both;
  }
  #book>.left{
    float: left;
    width: 350px;
    height: 400px;
    /* border: 1px dashed #333333; */
  }
  #book>.left .img img{
    width: 320px;
    height: 400px;
  }
  #book>.content{
    float: left;
    width: 700px;
    /* border: 1px dashed #333333; */
  }
  #book>.content a{
    color: #478fd6;
    text-decoration: none;
  }
  #book>.content a:hover{
    text-decoration-line: underline;
  }
  #book>.content .title .a h1{
    font-size: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 550px;
    margin: 16px auto;
  }
  #book>.content .title .b{
    padding: 0px 15px 5px;
    height: 162px;
    background-color: #f9ffcd;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 30px;
  }
  #book>.content .title .b h2{
    font-size: 16px;
  }
  #book>.content .info{
    height: 50px;
    /* border: 1px dashed #333333; */
    padding: 15px 10px;
    line-height: 50px;
    text-align: left;
  }
  #book>.content .info span:nth-child(1){
    display: inline-block;
    margin-right: 35px;
  }
  #book>.content .info span:nth-child(2){
    display: inline-block;
    margin-right: 35px;
  }
  #book>.content .price{
    height: 70px;
    /* border: 1px dashed #333333; */
    font-size: 13px;
    text-align: left;
    padding: 0px 20px;
    color: #afaaaf;
  }
  #book>.content .price .price-a{
    margin-bottom: 3px;
    position: relative;
  }
  #book>.content .price .price-a p{
    margin: 0px;
    padding: 0px;
  }
  #book>.content .price .price-a p:nth-child(1) span{
    display: inline-block;
    margin-right: 10px;
  }
  #book>.content .price .price-a p:nth-child(2){
    color: red;
  }
  #book>.content .price .price-a p:nth-child(2) .yen{
    font-size: 30px;
  }
  #book>.content .price .price-a p:nth-child(2) .zhe{
    display: inline-block;
    margin-left: 10px;
    position: absolute;
    bottom: 6px;
  }
  #book>.content .price .price-b .line-del{
    text-decoration-line: line-through;
  }
  #book>.content .operate .address{
    height: 35px;
    /* border: 1px dashed #333333; */
    padding: 10px 0px 0px;
    text-align: left;
  }
  #book>.content .operate .address .p-left{
    display: inline-block;
    color: #afaaaf;
    width: 80px;
    margin-left: 10px;
    margin-right: 25px;
    /* border: 1px dashed #333333; */
    text-align-last: justify;

  }
  #book>.content .operate .address .right{
    display: inline-block;
  }
  #book>.content .operate .serve{
    height: 35px;
    padding: 10px 0px 0px;
    /* border: 1px dashed #333333; */
    text-align: left;
  }
  #book>.content .operate .serve .p-left{
    display: inline-block;
    color: #afaaaf;
    width: 80px;
    margin-left: 10px;
    margin-right: 25px;
    /* border: 1px dashed #333333; */
    text-align-last: justify;
  }
  #book>.content .operate .serve .right{
    display: inline-block;
  }
  #book>.content .operate-end{
    height: 50px;
    text-align: left;
    padding: 20px 0px;
  }
  #book>.content .operate-end .sum-left{
    display: inline-block;
    width: 200px;
    /* border: 1px dashed #333333; */
    margin-left: 10px;
    margin-right: 50px;
  }
  #book>.content .operate-end .sum-left span{
    color: #afaaaf;
    display: inline-block;
    width: 80px;
    text-align-last: justify;
    margin-right: 15px;
  }
  #book>.content .operate-end .end-btn{
    display: inline-block;
    /* border: 1px dashed #333333; */
  }
  #book>.content .operate-end .end-btn .el-button:nth-child(1){
    margin-right: 40px;
  }


  /* 推荐书籍 */
  .booksList{
    position: relative;
    /* background-color: antiquewhite; */
    width: 1239px;
    height: 550px;
    margin: 0 auto;
  }
  .booksList .book{
    float: left;
    border: 1px solid #d1d1d1;
    width: 200px;
    height: 270px;
    position: relative;
  }
  .booksList .book .img{
    margin: 10px 20px;
  }
  .booksList .book .img img{
    cursor: pointer;
  }
  .booksList .book .title{
    padding: 0px 10px;
  }
  .booksList .book .title p{
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis; /*多余文字显示省略号*/
    white-space: nowrap;
    width: 180px;
    cursor: pointer;
  }
  .booksList .book .price{
  }
  .booksList .book .price span{
    color: red;
    position: absolute;
    left: 10px;
    bottom: 8px;
    cursor: pointer;
  }
  .booksList .page{
    position: absolute;
    bottom: 10px;
    left: 250px;
  }
</style>
