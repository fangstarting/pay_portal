<!-- Pay -->
<template>
  <div>
    <el-backtop :bottom="60"></el-backtop>
    <div id="body">
      <el-container>
        <el-header>
          <div class="my_top">
            <div class="name">
              <span class="title">
                <!-- <strong><em>Pay&nbsp;薪&nbsp;资&nbsp;平&nbsp;台</em></strong> -->
                <strong>Pay&nbsp;薪&nbsp;资&nbsp;平&nbsp;台</strong>
              </span>
            </div>
            <div class="menu-img-a">
              <!-- <img :src="profile"> -->
              <el-image style="width: 50px; height: 50px;"
                        :src="profile"
                        :preview-src-list="profileList">
              </el-image>
            </div>

            <div class="time">
              <span>
                <strong>{{userName}}</strong>
                &nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span>时间&nbsp;{{time}}</span>
            </div>
            <div class="countDown">
              <span>{{downTime}}&nbsp;&nbsp;</span>
              <span id="escAdmin">自动退出</span>
              <span id="escAdminOn"
                    title="安全退出系统"
                    style="color: red;"
                    @click="escAdmin()">安全退出</span>
            </div>
            <div class="install">
              <ul>
                <!--   <li>用户中心</li>
              <li>修改密码</li>
              <li>退出登录</li> -->
              </ul>
            </div>
          </div>
        </el-header>
        <el-container>
          <el-aside :style="asibeWidth">
            <el-col :span="12">
              <!-- <h5>功能菜单</h5> -->
              <div class="toggle-button"
                   :style="asibeWidth"
                   @click="toggleColl">
                <i style="font-size: 30px"
                   :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
              </div>
              <el-menu default-active="2"
                       class="el-menu-vertical-demo"
                       unique-opened
                       :router="true"
                       :collapse-transition="false"
                       :collapse="isCollapse"
                       @open="handleOpen"
                       @close="handleClose">

                <el-menu-item index="home">
                  <i class="el-icon-lollipop"></i>
                  <span slot="title">
                    首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页
                  </span>
                </el-menu-item>

                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>用户中心</span>
                  </template>
                  <template slot="title"></template>
                  <el-menu-item index="userinfo">
                    个人信息
                  </el-menu-item>
                  <el-menu-item index="message">
                    消息通知
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-edit-outline"></i>
                    <span>考勤中心</span>
                  </template>
                  <template slot="title"></template>
                  <el-menu-item index="clickin">
                    考勤打卡
                  </el-menu-item>
                  <el-menu-item index="checkinfo">
                    考勤信息
                  </el-menu-item>
                  <!-- <router-link to='/pay/'>
                      <el-menu-item index="1-3">
                        其他
                      </el-menu-item>
                    </router-link> -->
                </el-submenu>

                <el-menu-item index="auditcenter">
                  <i class="el-icon-menu"></i>
                  <span slot="title">
                    审批中心
                  </span>
                </el-menu-item>

                <!-- <el-submenu index="auditcenter">
                  <template slot="title">
                    <span>审批中心</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title"></template>
                    <el-menu-item index="">
                      审批申请
                    </el-menu-item>
                    <el-menu-item index="">
                      审批查询
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu> -->
                <el-menu-item index="salarycenter">
                  <i class="el-icon-help"></i>
                  <span slot="title">
                    薪资中心
                  </span>
                </el-menu-item>
                <!-- <el-submenu index="salarycenter">
                  <template slot="title">
                    <i class="el-icon-help"></i>
                    <span>薪资中心</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title"></template>
                    <el-menu-item index="">
                      薪资查询
                    </el-menu-item>
                    <el-menu-item index="">
                      薪资详情
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu> -->

                <!-- **** -->
                <!-- <div v-if="roleShow"> -->
                <template v-if="roleShow">
                  <el-submenu index="10">
                    <template slot="title">
                      <i class="el-icon-data-line"></i>
                      <span>员工管理</span>
                    </template>
                    <template slot="title"></template>
                    <el-menu-item index="userlist">
                      员工列表
                    </el-menu-item>
                    <!-- <el-menu-item index="">
                        数据预览
                      </el-menu-item> -->
                    <!-- <router-link to='/pay/'>
                        <el-menu-item index="10-3">
                          其他
                        </el-menu-item>
                      </router-link> -->
                  </el-submenu>
                  <el-submenu index="7">
                    <template slot="title">
                      <i class="el-icon-office-building"></i>
                      <span>部门管理</span>
                    </template>
                    <template slot="title"></template>
                    <el-menu-item index="dept">
                      部门信息
                    </el-menu-item>
                    <el-menu-item index="position">
                      岗位信息
                    </el-menu-item>
                    <el-menu-item index="jobgrade">
                      职称信息
                    </el-menu-item>
                  </el-submenu>
                  <!-- <el-submenu index="8">
                    <template slot="title">
                      <i class="el-icon-notebook-2"></i>
                      <span>职称管理</span>
                    </template>
                    <el-menu-item-group>
                      <template slot="title"></template>
                      <router-link to='/pay/'>
                        <el-menu-item index="8-1">
                          职称列表
                        </el-menu-item>
                      </router-link>
                      <router-link to='/pay/'>
                        <el-menu-item index="8-2">
                          其他
                        </el-menu-item>
                      </router-link>
                      <router-link to='/pay/'>
                        <el-menu-item index="8-3">
                          其他
                        </el-menu-item>
                      </router-link>
                    </el-menu-item-group>
                  </el-submenu> -->
                  <el-submenu index="8">
                    <template slot="title">
                      <i class="el-icon-pie-chart"></i>
                      <span>数据统计</span>
                    </template>
                    <!-- <template slot="title"></template>
                      <el-menu-item index="echartsstaff">
                        员工信息统计
                      </el-menu-item> -->
                    <!-- <router-link to='/pay/'>
                        <el-menu-item index="9-2">
                          工龄信息统计
                        </el-menu-item>
                      </router-link> -->
                    <el-menu-item index="echartscheck">
                      考勤信息统计
                    </el-menu-item>
                    <!-- <el-menu-item index="echartssalary">
                        工资信息统计
                      </el-menu-item> -->
                  </el-submenu>

                  <el-menu-item index="audit">
                    <i class="el-icon-edit"></i>
                    <span slot="title">
                      审批管理
                    </span>
                  </el-menu-item>

                  <!-- <el-submenu index="15">
                    <template slot="title">
                      <i class="el-icon-edit"></i>
                      <span>审批管理</span>
                    </template>
                    <el-menu-item-group>
                      <template slot="title"></template>
                      <el-menu-item index="audit">
                        审批列表
                      </el-menu-item>
                    </el-menu-item-group>
                  </el-submenu> -->

                  <el-submenu index="12">
                    <template slot="title">
                      <i class="el-icon-date"></i>
                      <span>考勤管理</span>
                    </template>
                    <template slot="title"></template>
                    <el-menu-item index="checklist">
                      考勤列表
                    </el-menu-item>
                    <!-- <router-link to='/pay/'>
                        <el-menu-item index="12-2">
                          考勤统计
                        </el-menu-item>
                      </router-link> -->
                    <el-menu-item index="checkconfig">
                      考勤配置
                    </el-menu-item>
                  </el-submenu>
                  <el-submenu index="13">
                    <template slot="title">
                      <i class="el-icon-bank-card"></i>
                      <span>薪资管理</span>
                    </template>
                    <template slot="title"></template>
                    <el-menu-item index="accounting">
                      薪资核算
                    </el-menu-item>
                    <el-menu-item index="config">
                      薪资配置
                    </el-menu-item>
                    <!-- <router-link to='/pay/'>
                        <el-menu-item index="13-3">
                          薪资统计
                        </el-menu-item>
                      </router-link> -->
                  </el-submenu>

                  <el-submenu index="14">
                    <template slot="title">
                      <i class="el-icon-s-tools"></i>
                      <span>系统管理</span>
                    </template>
                    <template slot="title"></template>
                    <!-- <el-menu-item index="">
                          菜单管理
                        </el-menu-item> -->
                    <!-- <el-menu-item index="">
                        账户管理
                      </el-menu-item> -->
                    <el-menu-item index="systems">
                      系统配置
                    </el-menu-item>
                    <el-menu-item index="rolepower">
                      角色权限
                    </el-menu-item>
                    <el-menu-item index="logger">
                      日志记录
                    </el-menu-item>
                    <!-- <el-menu-item index="">
                          数据备份
                        </el-menu-item> -->
                    <el-menu-item @click="ddosVisible=true">
                      ☢️💮☢️
                    </el-menu-item>
                    <span @click="escAdmin()">
                      <el-menu-item index="">
                        安全退出
                      </el-menu-item>
                    </span>
                  </el-submenu>
                  <!-- <el-submenu index="5">
                    <template slot="title">
                      <i class="el-icon-s-tools"></i>
                      <span>其他设置</span>
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
                  </el-submenu> -->
                  <!-- <el-menu-item index="6">
                    <i class="el-icon-warning"></i>
                    <span slot="title">
                      <router-link to="">超级模式</router-link>
                    </span>
                  </el-menu-item> -->

                </template>
                <!-- </div> -->
                <!-- **** -->
              </el-menu>
            </el-col>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <!-- DDOS -->
    <el-dialog title="☢️☢️DDOS☢️☢️"
               width="400px"
               :visible.sync="ddosVisible">
      <el-form>
        <el-form-item label="认证令牌">
          <el-input type="password"
                    v-model="ddosPass"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="ddosItem">确 定</el-button>
      </div>
    </el-dialog>
    <!-- DDOS -->
  </div>
</template>

<script>
import Utils from '@/utils/util.js'
import { pass, compileStr, unCompileStr } from '@/utils/pass.js'
export default {
  name: 'Pay',
  data() {
    return {
      userName: '',
      profile: '',
      time: '12:00:00',
      downTime: '00:00',
      timer: 60 * 60 * 1000, //倒计时间
      testData: '',
      roleShow: false,
      isCollapse: true,
      asibeWidth: 'width: 65px',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      profileList: [],
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      ],
      //DDOS
      ddosVisible: false,
      ddosPass: '',
      ddosToken: '',
    }
  },
  mounted() {
    Utils.$on('userNameCall', (val) => {
      this.userName = val
    })
    Utils.$on('profileCall', (val) => {
      ;(this.profile = val), this.profileList.push(val)
    })
  },
  methods: {
    //aside菜单栏
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    init() {
      this.getUserInfo()
      this.getDownTime()
    },
    getDownTime() {
      var loginTime = parseInt(sessionStorage.getItem('loginTime'))
      var date0 = Object
      var date2 = loginTime + this.timer //登录时间戳/保存在sessionStorage当中/刷新页面也不会影响数据
      var timeLag = Number
      // var dd = Number;
      // var hh = Number;
      var mm = Number
      var ss = Number
      var onTimer = setInterval(() => {
        myTimer()
      }, 1000) //循环计时器
      var myTimer = () => {
        date0 = new Date() //Fri Oct 29 2021 11:28:58 GMT+0800 (中国标准时间)
        this.time = date0.toString().substring(16, 24) //this.time获取当前时间

        timeLag = date2 - date0.getTime() //时间戳差值
        // dd = parseInt(timeLag/1000/60/60/24);
        // hh = parseInt((timeLag%(24*60*60*1000))/1000/60/60);
        mm = parseInt(((timeLag % 86400000) % 3600000) / 60000)
        ss = parseInt((((timeLag % 86400000) % 3600000) % 60000) / 1000)
        // if(dd<=9) dd = "0"+dd;
        // if(hh<=9) hh = "0"+hh;
        if (mm <= 9) mm = '0' + mm
        if (ss <= 9) ss = '0' + ss
        if (timeLag >= 0) {
          this.downTime = mm + ':' + ss
        } else {
          //30分钟倒计时结束
          clearInterval(onTimer) //停止onTimer循环计时器
          console.log('60分钟倒计时结束')
          sessionStorage.clear() //清空会话存储的数据>>清除Token口令可实现安全退出/
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: 'Token指令过期，已自动退出！',
          })
        }
      }
    },
    //管理员信息
    getUserInfo() {
      var userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      this.userName = userInfo.realname
      this.profile = userInfo.profile
      this.profileList.push(userInfo.profile)
      var roleId = userInfo.roleId
      if (roleId == 6) {
        this.roleShow = false
      } else {
        this.roleShow = true
      }
    },
    //退出系统
    escAdmin() {
      this.$confirm('是否确认退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          sessionStorage.clear()
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '已安全退出',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出',
          })
        })
    },
    toggleColl() {
      console.log(this.$el)

      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.asibeWidth = 'width: 65px'
      } else {
        // this.asibeWidth = 'width: 200px'
        this.asibeWidth = 'width: 160px'
      }
    },
    ddosItem() {
      if (this.ddosPass === pass.ddosPass) {
        this.ddosPass = ''
        this.$router.push('/pay/ddos')
        // function S4() {
        //   return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        // }
        // const token =
        //   S4() +
        //   S4() +
        //   '-' +
        //   S4() +
        //   '-' +
        //   S4() +
        //   '-' +
        //   S4() +
        //   '-' +
        //   S4() +
        //   S4() +
        //   S4()
        // sessionStorage.setItem('ddosToken', compileStr(token))
        // this.ddosToken = token
        sessionStorage.setItem('ddosToken', compileStr(pass.ddosPass))
        this.ddosVisible = false
      } else {
        this.$message({
          type: 'warning',
          message: '令牌无效！',
        })
      }
    },
  },
  created() {
    this.init()
  },
  mounted() {},
}
</script>

<style scoped>
#body {
  /* background-image: url(../assets/01848_flow_1920x1080.jpg); */
}
.el-header,
.el-footer {
  /* background-color: #d1dfef; */
  /* background: url(../assets/01764_theiridescentstorm_1920x1080.jpg) repeat fixed
    center; */
  background: url(../assets/image/topimg04.png);
  background-size: cover;
  text-align: center;
  line-height: 66.66px;
  /* color: #333; */

  animation: footerColor 6s linear infinite;
}
@keyframes footerColor {
  0% {
    color: #fded04;
  }
  25% {
    color: #b10002;
  }
  50% {
    color: #06bcc9;
  }
  75% {
    color: #04b118;
  }
  100% {
    color: #fded04;
  }
}
.el-header {
  position: relative;
}
.el-header > div {
  float: left;
}
.el-header div.name {
  position: absolute;
  /* left: 47.2%; */
  right: 200px;
  /* left: 40px; */
}
.el-header .time {
  position: absolute;
  /* left: 120px; */
  left: 88.88px;
}
.el-header .countDown {
  position: absolute;
  right: 25px;
}
.el-header .countDown #escAdminOn {
  display: none;
}
.el-header .countDown:hover #escAdmin {
  display: none;
}
.el-header .countDown:hover #escAdminOn {
  display: inline;
  cursor: pointer;
}
.el-aside {
  color: #333;
  text-align: left;
  /* line-height: 0px; */
  height: 100%;
  overflow: hidden;
}
.el-aside .el-menu {
  /* background-color: #c4f8fc; */
  /* margin-left: -40px; */
}
.el-aside .el-menu a {
  color: #333333;
  text-decoration: none;
}
.el-aside .el-menu .el-menu-item {
  /* padding-left: 45px !important; */
  /* width: 100px !important; */
}
/* .el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 140px;
  text-align: center;
} */
.el-aside .el-col {
  width: 160px;
}
.el-aside .el-col h5 {
  /* text-align: left; */
  width: 100px;
  height: 50px;
  line-height: 50px;
  margin: 10px auto 0;
  font-size: 18px;
  /* background-color: #409EFF; */
  text-align-last: justify;
}
.el-aside .el-col .el-submenu {
}
.el-aside .el-col .el-menu-item-group {
  /* margin-left: 40px; */
}
.el-menu--vertical {
}
.el-main {
  color: #333;
  background-color: rgb(243, 243, 243);
  text-align: center;
  line-height: 0px;
  /* height: 610px; */
  /* max-height: 620px; */
  /* padding: 0px 20px; */
  padding: 0 20px 50px 20px;
}
.el-divider .el-divider__text {
  background-color: rgb(243, 243, 243);
  /* background-color: rgb(0, 0, 0); */
}

#body > .el-container {
  margin-bottom: 40px;
}
.menu-img-a {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  /* box-shadow: 0px 0px 5px #b1b0a0; */
  /* animation:imgborder 5s infinite; */
  overflow: hidden;
  left: 10px;
  /* padding: 5px; */
  margin-top: 6px;
  /* animation: imgborder 6s infinite; */
  animation: imgborder 6s linear infinite;
}
@keyframes imgborder {
  0% {
    /* box-shadow: 0px 0px 10px #b1b0a0; */
    box-shadow: 0px 0px 20px #fded04;
    transform: rotate(0deg);
  }
  25% {
    box-shadow: 0px 0px 20px #b10002;
    transform: rotate(90deg);
  }
  50% {
    box-shadow: 0px 0px 20px #06bcc9;
    /* box-shadow: 0px 0px 10px #b1b0a0; */
    transform: rotate(180deg);
  }
  75% {
    box-shadow: 0px 0px 20px #04b118;
    transform: rotate(270deg);
  }
  100% {
    /* box-shadow: 0px 0px 10px #b1a7aa; */
    box-shadow: 0px 0px 20px #fded04;
    transform: rotate(360deg);
  }
}

@keyframes slidein {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-3600deg);
  }
}
/* 添加伪类 鼠标滑过 */
.menu-img-a :hover {
  animation: slidein 3s infinite;
  cursor: zoom-in;
  /* transform: rotate(-180deg); */
  /* animation-play-state: paused; */
}

.menu-img-a img {
  width: 100%;
  height: 100%;
}
.my_top {
  /* font-size: 20px; */
  font-family: 'Courier New', Courier, monospace;
}
.my_top .title {
  /* font-size: 20px; */
  font-size: 22px;
}
.toggle-button {
  /* background-color: #4a5064; */
  font-size: 10px;
  line-height: 0px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  /* 显示鼠标指针为：小手 */
  animation: bgc 6s linear infinite;
}

@keyframes bgc {
  0% {
    /* box-shadow: 0px 0px 10px #b1b0a0; */
    background-color: #fded04;
  }
  25% {
    background-color: #b10002;
  }
  50% {
    background-color: #06bcc9;
    /* box-shadow: 0px 0px 10px #b1b0a0; */
  }
  75% {
    background-color: #04b118;
  }
  100% {
    /* box-shadow: 0px 0px 10px #b1a7aa; */
    background-color: #fded04;
  }
}

.el-menu-vertical-demo .el-menu--popup:before {
  width: 100px !important;
}
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
} */
</style>
