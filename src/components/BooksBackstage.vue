<template>
  <div>
    <div id="body">
      <el-container>
        <el-header>
          <div class="name">
            <span>欢迎管理员&nbsp;&nbsp;{{userName}}</span>
          </div>
          <div class="time">
            <span>时间&nbsp;&nbsp;{{time}}</span>
          </div>
          <div class="countDown">
            <span>{{downTime}}&nbsp;&nbsp;</span>
            <span id="escAdmin" >自动退出</span>
            <span id="escAdminOn" title="安全退出系统" style="color: red;" @click="escAdmin()">安全退出</span>
          </div>
          <div class="install">
            <ul>
           <!--   <li>用户中心</li>
              <li>修改密码</li>
              <li>退出登录</li> -->
            </ul>
          </div>
        </el-header>
        <el-container>
          <el-aside width="220px">
            <el-col :span="12">
              <h5>功能菜单</h5>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>书籍管理</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title"></template>
                    <router-link to='/bg/bookListOperate'>
                      <el-menu-item index="1-1">
                        书&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;籍
                      </el-menu-item>
                    </router-link>
                    <router-link to='/bg/publisherOperate'>
                      <el-menu-item index="1-2">
                        出&nbsp;&nbsp;版&nbsp;&nbsp;社
                      </el-menu-item>
                    </router-link>
                    <router-link to='/bg/bookTypeOperate'>
                      <el-menu-item index="1-3">
                        书籍类型
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-edit-outline"></i>
                    <span>订单管理</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title"></template>
                    <router-link to='/bg/orderListOperate'>
                      <el-menu-item index="2-1">
                        订单列表
                      </el-menu-item>
                    </router-link>
                    <router-link to='/bg/orderRemindOperate'>
                      <el-menu-item index="2-2">
                        订单提醒
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>营业管理</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title"></template>
                    <router-link to='/bg/saleroomOperate'>
                      <el-menu-item index="3-1">
                        销&nbsp;&nbsp;售&nbsp;&nbsp;额
                      </el-menu-item>
                    </router-link>
                    <router-link to='/bg/salesVolumeOperate'>
                      <el-menu-item index="3-2">
                        销量排名
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <router-link to="/bg/UserList">
                  <el-menu-item index="4">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">
                      用户管理
                     </span>
                  </el-menu-item>
                </router-link>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span>系统设置</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title"></template>
                    <span @click="escAdmin()">
                      <el-menu-item index="5-1">
                        安全退出
                      </el-menu-item>
                    </span>
                    <router-link to='/bg'>
                      <el-menu-item index="5-2">
                        系统主页
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="6">
                  <i class="el-icon-warning"></i>
                  <span slot="title">
                    <router-link to="">超级模式</router-link>
                  </span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BooksBackstage',
    data() {
      return {
        userName:'',
        time:'12:00:00',
        downTime:'00:00',
        timer:30*60*1000,//倒计时间
        testData:''
      }
    },
    methods:{
      //aside菜单栏
      handleOpen(key, keyPath) {
            console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      init(){
        this.getUser();
        this.getDownTime();
      },
      getDownTime(){
        var loginTime = parseInt(sessionStorage.getItem("time"));
        var date0 = Object;
        var date2 = loginTime+this.timer;//登录时间戳/保存在sessionStorage当中/刷新页面也不会影响数据
        var timeLag = Number;
        // var dd = Number;
        // var hh = Number;
        var mm = Number;
        var ss = Number;
        var onTimer = setInterval(()=>{myTimer();},1000);//循环计时器
        var myTimer = ()=>{
            date0 = new Date(); //Fri Oct 29 2021 11:28:58 GMT+0800 (中国标准时间)
            this.time = date0.toString().substring(16,24);//this.time获取当前时间

            timeLag = date2 - date0.getTime();//时间戳差值
            // dd = parseInt(timeLag/1000/60/60/24);
            // hh = parseInt((timeLag%(24*60*60*1000))/1000/60/60);
            mm = parseInt(timeLag%86400000%3600000/60000);
            ss = parseInt(timeLag%86400000%3600000%60000/1000);
            // if(dd<=9) dd = "0"+dd;
            // if(hh<=9) hh = "0"+hh;
            if(mm<=9) mm = "0"+mm;
            if(ss<=9) ss = "0"+ss;
            if(timeLag >= 0){
              this.downTime = mm+":"+ss;
            }else{
                //30分钟倒计时结束
                clearInterval(onTimer);//停止onTimer循环计时器
                console.log("30分钟倒计时结束");
                sessionStorage.clear();//清空会话存储的数据>>清除Token口令可实现安全退出/
                this.$router.push('/adminLogin');
                this.$message({
                  type: 'success',
                  message: 'Token指令过期，已自动退出！'
                });
            }
        }
      },
      //管理员信息
      getUser(){
        let userData = JSON.parse(sessionStorage.getItem('user'));
        this.userName = userData.loginname;
      },
      //退出系统
      escAdmin(){
        this.$confirm('是否确认退出系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          sessionStorage.clear();
          this.$router.push('/adminLogin');
          this.$message({
            type: 'success',
            message: '已安全退出'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  #body{
    /* background-image: url(../assets/01848_flow_1920x1080.jpg); */
  }
  .el-header, .el-footer {
    background-color: #d1dfef;
    background: url(../assets/01764_theiridescentstorm_1920x1080.jpg) repeat fixed center;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header{
    position: relative;
  }
  .el-header>div{
    float: left;
  }
  .el-header div.name{
    position: absolute;
    left: 40px;
  }
  .el-header .time{
    position: absolute;
    left: 240px;
  }
  .el-header .countDown{
    position: absolute;
    right: 100px;
  }
  .el-header .countDown #escAdminOn{
    display: none;
  }
  .el-header .countDown:hover #escAdmin{
    display: none;
  }
  .el-header .countDown:hover #escAdminOn{
    display: inline;
    cursor: pointer;
  }
  .el-aside {
    color: #333;
    /* text-align: center; */
    /* line-height: 0px; */
    height: 600px;
  }
  .el-aside .el-menu{
    /* background-color: #c4f8fc; */
    margin-left: -40px;
  }
  .el-aside .el-menu a{
    color: #333333;
    text-decoration: none;
  }
  .el-aside .el-col{
    width: 200px;
  }
  .el-aside .el-col h5{
    /* text-align: left; */
    width: 100px;
    height: 50px;
    line-height: 50px;
    margin: 10px auto 0;
    font-size: 18px;
    line-height: ;
    /* background-color: #409EFF; */
    text-align-last: justify;
  }
  .el-aside .el-col .el-submenu{
  }
  .el-aside .el-col .el-menu-item-group{
    margin-left: 40px;
  }
  .el-main {
    color: #333;
    text-align: center;
    line-height: 0px;
    /* height: 610px; */
    /* max-height: 620px; */
    padding: 0px 20px;
  }

  #body > .el-container {
    margin-bottom: 40px;
  }
</style>
