<template>
  <div>
    <!-- top主页头 -->
    <div id="top">
      <div class="top-menu">
        <div class="menu-a">
          <span>
            欢迎光临云os书店，{{homeA1}}
            <span class="a-btn" @click="homeUserClick()">{{homeUser}}</span>
          </span>
        </div>
        <div v-if="loginState" class="menu-img-a">
          <img v-if="userImg" :src="userImg">
          <img v-else src="../assets/icon-admin.png" >
        </div>
        <div v-else class="menu-img-b">
          <img v-if="userImg" :src="userImg">
          <img v-else src="../assets/icon-admin.png" >
        </div>
        <div class="menu-b">
          <span @click="goUserCart()">
            <i class="el-icon-shopping-cart-2"></i>购物车
          </span>
          <span @click="goUserOrder()">
            <i class="el-icon-tickets"></i>我的订单
          </span>
          <span @click="goUserInfo()">
            <i class="el-icon-user"></i>个人信息
          </span>
          <span @click="loginOut()">
            <i class="el-icon-circle-close"></i>注销登录
          </span>
        </div>
        <div class="menu-c">
          <span>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-setting"></i>用户中心<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <span @click="goUserInfo()">
                  <el-dropdown-item icon="el-icon-user">
                      个人信息
                  </el-dropdown-item>
                </span>
                <span @click="goUserOrder()">
                  <el-dropdown-item icon="el-icon-tickets">
                      我的订单
                  </el-dropdown-item>
                </span>
                <span @click="goUserCart()">
                  <el-dropdown-item icon="el-icon-shopping-cart-2">
                      购物管理
                  </el-dropdown-item>
                </span>
                <span @click="loginOut()">
                  <el-dropdown-item icon="el-icon-circle-close">
                      安全退出
                  </el-dropdown-item>
                </span>
                <span @click="goAdmin()">
                  <el-dropdown-item divided icon="el-icon-s-custom">
                      后台管理
                  </el-dropdown-item>
                </span>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </div>
    </div>
    <!-- 轮播图 -->
    <div id="carousel">
      <div class="carousel">
        <el-carousel :interval="5000" arrow="always" height="480px">
          <el-carousel-item v-for="(item,index) in imgs" :key="index">
            <h3>{{ item.title }}</h3>
            <img :src="item.imageurl" >
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 模糊查询 -->
    <!-- <div id="find">
      <div class="find-title">
        <span>书籍筛选</span>
      </div>
      <div class="find">
        <span>
          书籍名称：
          <el-input
            placeholder="书名字段"
            v-model="title"
            clearable>
          </el-input>
        </span>
        <span>
          书籍类型：
          <el-select v-model="categoryId" clearable placeholder="请选择">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.Name"
              :value="item.id">
            </el-option>
          </el-select>
        </span>
        <span>
          出版社：
          <el-select v-model="publishId" clearable placeholder="请选择">
            <el-option
              v-for="item in publishs"
              :key="item.id"
              :label="item.Name"
              :value="item.id">
            </el-option>
          </el-select>
        </span>
        <span>
          <el-button type="primary" icon="el-icon-search" @click="">搜索</el-button>
        </span>
      </div>
    </div> -->

    <div id="list">
      <!-- <h2>图书列表</h2> -->
      <router-view></router-view>
    </div>

    <div id="end">
      <div class="end">
        <h2 style="font-weight: 500;"><em>云os图书商城</em></h2>
        <span>欢迎咨询</span>
        <span>|</span>
        <span>问题反馈</span>
        <span>|</span>
        <span>订单服务</span>
        <span>|</span>
        <span>商家服务</span>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  export default {
    name: 'BooksHome',
    data() {
      return {
        //网页变量
        homeA1:'请',
        homeUser:'登录',
        userImg:'',//头像
        //用户信息
        userInfo:{
          LoginId:null
        },
        //登录状态
        loginState:'',
        // imgShadow:'box-shadow:0px 0px 10px #6f6e64',
        imgof:'',
        //安全登录时间
        safeTime: 20*60*1000,//20min
        //注销登录statedesc
        loginout:{
          statedesc: ''
        },
        //轮播图
        imgs:[],
        //模糊查询select
        // bookName:'',
        // categorys:[],//书籍类别列表
        // publishs:[],//出版社列表
        // categoryId: '',//类别编号>>null
        // publishId:'',//出版社编号>>null
        // title:'',//书名>>null

        test:''
      }
    },
    methods:{
      //Vuex用户状态码
      ...mapMutations({
        upstate: 'UP_LOGIN_STATE'
      }),
      //初始化
      init(){
        //轮播图
        this.carousel();
        //模糊查询select初始化
        // this.initFind();
        //初始化用户信息
        this.getUserInfo();
      },
      // homeUserClick头部点击事件
      homeUserClick(){
        if(this.loginState){
          //登录状态>>打开个人信息页面
          let routeUrl = this.$router.resolve({
            path:'/userInfo',
            // query:{}
          });
          window.open(routeUrl.href,'_blank');
        }else{
          //未登录状态>>跳转登录页面
          this.$router.push('/userLogin');
        }
      },
      //轮播图
      carousel(){
        this.$axios.get('getbannnerall').then(e=>{
          // console.log(">>初始化轮播图");
          this.imgs=e.data;
          // console.log(this.imgs);
        }).catch();
      },
      //获取用户信息
      getUserInfo(){
        this.$axios.get('getloginuserinfo').then(e=>{
          console.log(">>获取用户信息>>");
          this.userInfo=e.data;
          console.log(this.userInfo);
          //对用户状态进行判定
          this.userState();
        }).catch();
      },
      //用户状态判定
      userState(){
        console.log(">>用户状态判定>>");
        if(this.userInfo.LoginId==null){
          this.loginState=false;
          console.log("F状态loginState："+this.loginState);
        }else{
          this.loginState=true;
          console.log("T状态loginState："+this.loginState);
        }
        if(this.loginState){
          //登录成功状态
          // sessionStorage.setItem("loginState",1);
          this.upstate(1);
          this.homeA1='欢迎:';
          this.homeUser=this.userInfo.Name;
          this.userImg='http://localhost:8080/BookShop/'+this.userInfo.Photo;
          // this.imgShadow='box-shadow:0px 0px 10px #00ff00';
          // this.imgShadow='animation:imgborder 5s infinite';
          //定时注销登录
          this.autoOutLogin();
        }else{
          // sessionStorage.setItem("loginState",0);
          this.upstate(0);
          this.userImg='';
          this.homeA1='请';
          this.homeUser='登录';
          // this.imgShadow='box-shadow:0px 0px 10px #6f6e64';
        }
      },
      //登录成功后调用此方法：自动退出登录->20分钟倒计时
      autoOutLogin(){
        var time = parseInt(sessionStorage.getItem("loginTime"))+this.safeTime;
        var date0 = Object;
        var len =Number;
        var myTimer = ()=>{
          date0 = new Date();
          len = time-date0.getTime();
          if(len<=0){
            this.loginOut();
            this.$message({
              type: 'warning',
              message: '登录已过期!'
            });
            clearInterval(onTimer);//停止onTimer循环计时器
          }
        }
        var onTimer = setInterval(()=>{myTimer();},1000);//循环计时器

      },
      //用户中心跳转功能
      /**
       * 通过loginState判断跳转页面
       * 1.登录状态：直接跳转指定页面
       * 2.未登录：提示并跳转登录页面
       */
      //个人信息
      goUserInfo(){
        if(this.loginState){
          let routeUrl = this.$router.resolve({path:'/userInfo'});
          window.open(routeUrl.href,'_blank');
        }else{
          this.$message({
            type: 'warning',
            message: '请您先登录!'
          });
          this.$router.push('/userLogin');
        }
      },
      //我的订单
      goUserOrder(){
        if(this.loginState){
          let routeUrl = this.$router.resolve({path:'/userOrder'});
          window.open(routeUrl.href,'_blank');
        }else{
          this.$message({
            type: 'warning',
            message: '请您先登录!'
          });
          this.$router.push('/userLogin');
        }
      },
      //购物管理
      goUserCart(){
        // if(this.loginState){
        //   let routeUrl = this.$router.resolve({path:'/userCart'});
        //   window.open(routeUrl.href,'_blank');
        // }else{
        //   this.$message({
        //     type: 'warning',
        //     message: '请您先登录!'
        //   });
        //   this.$router.push('/userLogin');
        // }
        let routeUrl = this.$router.resolve({path:'/userCart'});
        window.open(routeUrl.href,'_blank');
      },
      //注销登录
      loginOut(){
        this.$axios.get('loginout')
        .then(e=>{
          window.sessionStorage.clear();
          this.upstate(0);
          console.log(e);
          this.$notify({
            title: '注销登录',
            message: e.data.statedesc,
            type: 'success'
          });
          this.userInfo.LoginId=null;
          // this.imgShadow='box-shadow:0px 0px 10px #6f6e64';
          this.userState();
          console.log(">>注销成功>>更新homeA1:"+this.homeA1+",homeUser:"+this.homeUser);
        }).catch();
      },
      //后台管理
      goAdmin(){
        let routeUrl = this.$router.resolve({path:'/adminLogin'});
        window.open(routeUrl.href,'_blank');
      },
      //模糊查询select初始化
      initFind(){
        //获取书籍类别列表
        this.$axios.get('querycategoriesall').then(e=>{
          // console.log(">>获取书籍类别列表");
          this.categorys = e.data;
        }).catch();
        //获取出版社列表
        this.$axios.get('querypublisherall').then(e=>{
          // console.log(">>获取出版社列表");
          this.publishs = e.data;
        }).catch();
      },
      //模糊查询
      find(){

      }

    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  /* top主页头 */
  div{
    /* border: 1px dashed #333333; */
  }
  #top{
    background-color: #f0f2f4;
    position: fixed;
    width: 100%;
    z-index: 100;
    box-shadow: 0px 2px 5px #b3b3b3;
    top: 0;
  }
  #top .top-menu{
    /* border: 1px dashed #333333; */
    position: relative;
    width: 1200px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
  }
  #top .top-menu>div{
    float: left;
  }
  #top .top-menu div>span{
    display: inline-block;
    margin: 0px 5px;
  }
  #top .top-menu .menu-img-a,.menu-img-b{
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    /* box-shadow: 0px 0px 5px #b1b0a0; */
    /* animation:imgborder 5s infinite; */
    overflow: hidden;
    left: 50px;
    /* padding: 5px; */
    margin-top: 6px;
  }
  #top .top-menu .menu-img-a{
    animation:imgborder 5s infinite;
  }
  #top .top-menu .menu-img-b{
    box-shadow: 0px 0px 5px #b1b0a0;
  }
  @keyframes imgborder{
    0%   {box-shadow: 0px 0px 10px #b1b0a0;}
    25%  {box-shadow: 0px 0px 20px #b10002;}
    50%  {box-shadow: 0px 0px 10px #b1b0a0;}
    75%  {box-shadow: 0px 0px 20px #04b118;}
    100% {box-shadow: 0px 0px 10px #b1a7aa;}
  }
  #top .top-menu .menu-img-a img,.menu-img-b img{
    width: 100%;
    height: 100%;
  }
  #top .top-menu .menu-a{
    position: absolute;
    left: 10%;
  }
  #top .top-menu .menu-a .a-btn{
    color: #409EFF;
    cursor: pointer;
  }
  #top .top-menu .menu-b{
    float: right;
    position: absolute;
    right: 20%;
  }
  #top .top-menu .menu-b>span{
    cursor: pointer;

  }
  #top .top-menu .menu-b>span:hover{
    color: #409EFF;
  }
  #top .top-menu .menu-c{
    position: absolute;
    right: 50px;
  }
  #top .top-menu .el-dropdown-link{
    cursor: pointer;
    color: #409EFF;
  }
  #top .top-menu .el-icon-arrow-down{
    font-size: 12px;
  }

  /* 轮播图 */
  #carousel{
    margin-top: 100px;
  }
  #carousel .carousel{
    width: 700px;
    margin: 15px auto;
    /* border: 1px dashed #333333; */
  }
  #carousel .el-carousel{
  }
  #carousel .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 50px;
    margin: 0;
  }
  /* list */
  #list{
    margin: 55px 0 100px;
  }
  /* end */
  #end{
    /* background-color: #68c3fc; */
    /* background-color: rgba(171, 171, 171, 0.5); */
  }
  #end .end{
    width: 1200px;
    height: 120px;
    margin: 50px auto 0px;
    /* border: 1px dashed #333333; */
    /* background-image: url(../assets/end1.jpg); */
    background-size: 1200px 235px;
    box-shadow: 0 0 10px #000000;
    opacity: 0.8;
    padding: 30px 50px;

  }
  #end .end>span{
    display: inline-block;
    margin: 0 10px;
  }
</style>
