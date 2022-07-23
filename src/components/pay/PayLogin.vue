<!-- 登录 -->
<template>
  <div>

    <div class="body">
      <div class="bgimg">
        <!-- <img src="../../assets/01751_paperplanes_1920x1080.jpg"> -->
        <!-- <img src="../../assets/image/01737_elemental_1920x1080.jpg"> -->
        <!-- <img src="../../assets/image/01866_ageisbeauty_1920x1080.jpg"> -->
        <!-- <img src="../../assets/image/01880_galacticgeometry_1920x1080.jpg"> -->
        <!-- <img src="../../assets/image/01881_orionnebula_1920x1080.jpg"> -->
        <!-- <img src="../../assets/image/01958_hexillus_1920x1080.jpg"> -->
        <img src="../../assets/image/02031_ageeba_1920x1080.jpg">
      </div>
      <div class="title">
        <h2>Pay&nbsp;薪&nbsp;资&nbsp;平&nbsp;台</h2>
      </div>
      <div class="content">
        <!-- 头像 -->
        <div class="top">
          <img src="../../assets/login头像.jpg"
               width="100%"
               style="border-radius: 50%;">
        </div>
        <!-- 登录表单 -->
        <div class="form">
          <el-form :model="login"
                   status-icon
                   :rules="rulesLogin"
                   ref="loginForm"
                   label-width="50px"
                   class="demo-ruleForm">
            <el-form-item label="账号"
                          prop="username">
              <el-input type="text"
                        v-model="login.username"
                        autocomplete="off"
                        prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
              <el-input type="password"
                        v-model="login.password"
                        autocomplete="off"
                        prefix-icon="el-icon-key"
                        show-password></el-input>
            </el-form-item>
            <el-form-item label="验证"
                          style="text-align: left;"
                          prop="code">
              <div class="codediv">
                <el-input type="text"
                          v-model="login.code"
                          maxlength="4"
                          class="codeinput"
                          autocomplete="off"
                          prefix-icon="el-icon-coordinate"
                          @keyup.enter.native="submitLogin('loginForm')">
                </el-input>
                <img class="codeimg"
                     @click="getCaptcha"
                     :src="codeUrl" />
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="submitLogin('loginForm')">登录</el-button>
              <el-button @click="registerVisible=true">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 注册 -->
      <div class="register">
        <el-dialog title="账户注册"
                   :visible.sync="registerVisible"
                   width="500px"
                   class="reg_dialog"
                   top="15vh"
                   center="">
          <el-form :model="reg"
                   status-icon
                   :rules="rulesReg"
                   ref="regData"
                   label-width="80px"
                   class="demo-ruleForm">
            <el-form-item label="用户名"
                          prop="username">
              <el-input type="text"
                        v-model="reg.username"
                        autocomplete="off"
                        prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
              <el-input type="password"
                        v-model="reg.password"
                        autocomplete="off"
                        prefix-icon="el-icon-key"></el-input>
            </el-form-item>
            <el-form-item label="确认密码"
                          prop="passwordVerify">
              <el-input type="password"
                        v-model="reg.passwordVerify"
                        autocomplete="off"
                        prefix-icon="el-icon-key"></el-input>
            </el-form-item>
            <el-form-item label="身份证"
                          prop="idCard">
              <el-input type="text"
                        v-model="reg.idCard"
                        autocomplete="off"
                        prefix-icon="el-icon-s-custom"
                        maxlength="18"></el-input>
            </el-form-item>
            <el-form-item label="邮箱"
                          prop="mail">
              <el-input type="text"
                        v-model="reg.mail"
                        autocomplete="off"
                        prefix-icon="el-icon-eleme">
                <el-button slot="append"
                           @click="sendEmailVerify()"
                           :disabled="isSendEmail"
                           icon="el-icon-loading">{{verifyTitle}}
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码"
                          prop="verifyCode">
              <el-input type="text"
                        v-model="reg.verifyCode"
                        autocomplete="off"
                        maxlength="6"
                        prefix-icon="el-icon-eleme">
              </el-input>

            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="resetFormToReg('regData')">重 置</el-button>
            <el-button type="primary"
                       @click="submitRegister('regData')">注 册</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- 用户激活 -->
      <div class="activate">
        <el-dialog title="用户激活"
                   :visible.sync="activateVisible"
                   width="500px"
                   top="8vh"
                   center="">
          <el-form :model="userData"
                   status-icon
                   :rules="rulesUser"
                   ref="userData"
                   label-width="80px"
                   class="demo-ruleForm">
            <el-form-item label="角色"
                          prop="roleId">
              <el-select v-model="userData.roleId"
                         placeholder="选择角色"
                         size="medium"
                         style="width: 120px;">
                <el-option v-for="item in roles"
                           :key="item.roleId"
                           :label="item.rname"
                           :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门"
                          prop="deptId">
              <el-select v-model="userData.deptId"
                         @change="getPositions(userData.deptId)"
                         placeholder="选择部门"
                         size="medium"
                         style="width: 120px;">
                <el-option v-for="item in depts"
                           :key="item.deptId"
                           :label="item.dname"
                           :value="item.deptId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位"
                          prop="positionId">
              <el-select v-model="userData.positionId"
                         placeholder="选择职位"
                         size="medium"
                         style="width: 120px;">
                <el-option v-for="item in positions"
                           :key="item.positionId"
                           :label="item.pname"
                           :value="item.positionId"
                           :disabled="item.status==0">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职称"
                          prop="jobgradeId">
              <el-select v-model="userData.jobgradeId"
                         placeholder="选择职称"
                         size="medium"
                         style="width: 120px;">
                <el-option v-for="item in jobgrades"
                           :key="item.jobgradeId"
                           :label="item.jobtitle"
                           :value="item.jobgradeId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="真实姓名"
                          prop="realname">
              <el-input type="text"
                        v-model="userData.realname"
                        autocomplete="off"
                        prefix-icon="el-icon-s-custom"></el-input>
            </el-form-item>
            <el-form-item label="性别"
                          prop="sex">
              <el-radio v-model="userData.sex"
                        label="男">男</el-radio>
              <el-radio v-model="userData.sex"
                        label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="学历"
                          prop="name">
              <el-select v-model="userData.education"
                         placeholder="选择学历"
                         size="medium"
                         style="width: 120px;">
                <el-option v-for="item in educations"
                           :key="item.name"
                           :label="item.name"
                           :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电话"
                          prop="phone">
              <el-input type="text"
                        v-model="userData.phone"
                        oninput="value=value.replace(/\D/g,'')"
                        autocomplete="off"
                        prefix-icon="el-icon-mobile-phone"
                        maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="生日"
                          prop="birthday">
              <el-date-picker v-model="userData.birthday"
                              align="right"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="入职日期"
                          prop="hiredate">
              <el-date-picker v-model="userData.hiredate"
                              align="right"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="resetForm('userData')">重 置</el-button>
            <el-button type="primary"
                       @click="submitActivate('userData')">激 活</el-button>
          </div>
        </el-dialog>
      </div>
    </div>

  </div>
</template>

<script>
import idNumber from '@/assets/json/idNumber.js'
import { obj } from '@/mesconfig/mesconfig.js'
export default {
  name: 'PayLogin',

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error())
      } else {
        if (this.reg.passwordVerify !== '') {
          this.$refs.regData.validateField('passwordVerify')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error())
      } else if (value !== this.reg.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var phoenTest = (rule, value, callback) => {
      var reg = /^1[345789]\d{9}$/ //手机正则
      if (value === '' || value === undefined || value == null) {
        callback()
      } else {
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号码!'))
        } else {
          callback()
        }
      }
    }
    const rulesIdCard = (rule, value, callback) => {
      if (idNumber.cnid(value) === false) {
        callback('身份证信息错误')
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      var reg =
        /^(\w+([-.][A-Za-z0-9]+)*){3,18}@\w+([-.][A-Za-z0-9]+)*\.\w+([-.][A-Za-z0-9]+)*$/ //邮箱正则
      if (value === '' || value === undefined || value == null) {
        callback()
      } else {
        if (!reg.test(value)) {
          //邮箱错误
          if (this.isSendEmail === false) {
            this.isSendEmail = true
          }
          callback(new Error('请输入正确的邮箱地址!'))
        } else {
          //邮箱正确
          // console.log(this.isSendEmail, this.isTimeoutStatus, '邮箱正确')
          if (this.isSendEmail === true && this.isTimeoutStatus === 0) {
            this.isSendEmail = false
          }
          callback()
        }
      }
    }
    return {
      login: {
        username: '',
        password: '',
        code: '',
        id: '',
      },
      rulesLogin: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          {
            min: 5,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            min: 4,
            max: 4,
            message: '请输入有效四位验证码',
            trigger: 'blur',
          },
        ],
      },
      reg: {
        username: '',
        password: '',
        passwordVerify: '',
        idCard: '',
        id: '',
        mail: '',
        verifyCode: '',
      },
      registerVisible: false,
      rulesReg: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur',
          },
        ],
        passwordVerify: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          // { validator: false, message: '两次输入密码不一致!', trigger: 'blur' }
          { validator: validatePass2, trigger: 'blur' },
        ],
        mail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          // {
          //   type: 'email',
          //   message: '请输入正确的邮箱地址',
          //   trigger: ['blur', 'change'],
          // },
          { validator: validateEmail, trigger: ['blur', 'change'] },
        ],
        verifyCode: [
          { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
          {
            min: 6,
            max: 6,
            message: '输入验证码无效',
            trigger: 'blur',
          },
        ],
        // phone:[ //电话正则
        //   { validator: phoenTest, trigger: 'blur' }
        // ],
        idCard: [
          { required: true, message: '身份证不能为空', trigger: 'blur' },
          { validator: rulesIdCard, trigger: ['blur', 'change'] },
        ],
      },

      userData: {
        roleId: '', //角色Id
        deptId: '', //部门Id
        positionId: '', //职位Id
        jobgradeId: '', //职级Id
        realname: '', //真实姓名
        sex: '', //性别
        education: '', //学历
        phone: '', //电话
        birthday: '', //生日
        hiredate: '', //入职日期
      },
      roles: [], //{roleId,rname}
      depts: [], //{deptId,dname}
      positions: [], //{positionId,pname}
      jobgrades: [], //{jobgradeId,jobtitle}
      // educations: [{ name: '专科' }, { name: '本科' }, { name: '研究生' }],
      educations: obj.educations,
      activateVisible: false,
      rulesUser: {},

      rulesUser: {
        realname: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
        ],
        phone: [
          //电话正则
          { required: true, message: '电话不能为空', trigger: 'blur' },
          { validator: phoenTest, trigger: 'blur' },
        ],
      },
      isSendEmail: true,
      verifyTitle: '校验',
      testData: '',
      isTimeoutStatus: 0, //未触发
      //登录图片验证码
      codeUrl: undefined,
    }
  },
  methods: {
    submitLogin(formName) {
      window.sessionStorage.clear()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          // var fd = new FormData()
          // fd.append('username', this.login.username)
          // fd.append('password', this.login.password)
          // fd.append('code',this.login.code)
          // fd.append('id',this.login.id)

          let loadingInstance = this.$loading.service({
            text: '登录中...',
            spinner: 'el-icon-loading',
            lock: true,
            // spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)',
          })
          setTimeout(() => {
            this.$axios
              .post('account/login.action', this.login)
              .then((e) => {
                if (e.data.errorcode == 100) {
                  // console.log("登录成功！");
                  this.$message({
                    type: 'success',
                    message: '登录成功!',
                  })
                  var loginTime = new Date()
                  sessionStorage.setItem('loginTime', loginTime.getTime())
                  sessionStorage.setItem(
                    'userInfo',
                    JSON.stringify(e.data.userInfo)
                  )
                  sessionStorage.setItem('token', e.data.token) //登录成功后，将服务器返回的token存储在sessionStorage（会话存储仓库）当中
                  this.$router.push('/pay/home')
                } else if (e.data.errorcode == 121) {
                  this.userData = e.data.activateInfo
                  this.$alert('请填写激活信息!', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                  }).then(() => {
                    this.activateVisible = true
                    this.activateInit()
                  })
                  // this.$message({
                  //   type: 'warning',
                  //   message: '请填写激活信息!',
                  // })
                  // this.$router.push('/pay/activate')
                } else if (e.data.errorcode == 123 || e.data.errorcode == 103) {
                  this.$message({
                    type: 'warning',
                    message: e.data.message,
                  })
                } else if (e.data.errorcode == 120) {
                  this.$message({
                    type: 'warning',
                    message: '请等待人事审批！',
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: e.data.message,
                  })
                }
              })
              .catch((e) => {})
              .then(() => loadingInstance.close())
          }, 1400)
        } else {
          //表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    resetFormToReg(formName) {
      this.$refs[formName].resetFields()
      this.isSendEmail = true
    },
    //注册
    submitRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          console.log('//注册表单验证成功')
          this.$axios
            .post('account/reg.action', this.reg)
            .then((e) => {
              console.log(e)
              if (e.data.errorcode == 100) {
                this.$message({
                  type: 'success',
                  message: '注册成功!',
                })
                this.registerVisible = false
                this.resetForm('regData')
              } else if (e.data.errorcode == 101) {
                const mes = e.data.message
                this.$message({
                  type: 'warning',
                  message: mes,
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '注册失败！',
                })
              }
            })
            .catch()
        } else {
          //表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    },
    activateInit() {
      this.getRoles()
      this.getDepts()
      this.getJobgrades()
      this.getUserInfo()
    },
    getRoles() {
      this.$axios
        .get('role/getroles')
        .then((e) => {
          this.roles = e.data.roles
        })
        .catch()
    },
    getDepts() {
      this.$axios
        .get('dept/getdepts')
        .then((e) => {
          this.depts = e.data.depts
        })
        .catch()
    },
    getPositions(deptId) {
      this.$axios
        .get('position/getinbydeptid', { params: { deptId } })
        .then((e) => {
          this.positions = e.data.positions
        })
        .catch()
    },
    getJobgrades() {
      this.$axios
        .get('jobgrade/getjobgradesofit')
        .then((e) => {
          this.jobgrades = e.data.jobgrades
        })
        .catch()
    },
    getUserInfo() {
      //获取用户已存在信息
      this.$axios.get('user/getuserinfobyid').then((e) => {
        this.userData = e.data.user
        console.log(e)
      })
    },

    submitActivate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post('user/activate', this.userData)
            .then((e) => {
              // console.log(e);
              if (e.data.errorcode == 100) {
                this.$message({
                  type: 'success',
                  message: '激活信息已提交，等待人事审批中...',
                })
                // this.registerVisible=false; //隐藏模态框
                // this.resetForm('userData'); //重置表单
                this.activateVisible = false //隐藏模态框
              } else {
                this.$message({
                  type: 'error',
                  message: '提交信息失败!',
                })
              }
            })
            .catch()
        } else {
          //表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    },
    sendEmailVerify() {
      const isNotEmpty = this.countDown()
      if (isNotEmpty) {
        const email = this.reg.mail
        this.$axios
          .get('email/verify/send', { params: { email } })
          .then((e) => {
            if (e.data.error === 1 && e.data.sign) {
              this.$message({
                type: 'success',
                message: e.data.message,
              })
              this.reg.id = e.data.data
            } else {
              this.$message({
                type: 'error',
                message: e.data.message,
              })
            }
          })
      } else {
        this.$message({
          type: 'warning',
          message: '邮箱不能为空',
        })
      }
    },
    countDown() {
      if (this.reg.mail === '') {
        this.isSendEmail = true
        return false
      }
      this.isTimeoutStatus = 1 //计时状态
      this.isSendEmail = true
      this.verifyTitle = '90秒'
      let num = 90
      let last = '秒'
      let onTimer = setInterval(() => {
        myTimer()
      }, 1000)
      let myTimer = () => {
        num--
        if (num < 10) {
          this.verifyTitle = '0' + num + last
        } else {
          this.verifyTitle = num + last
        }
        if (num === 0) {
          //结束倒计时
          clearInterval(onTimer) //停止onTimer循环计时器
          this.isTimeoutStatus = 0 //停止计时状态
          this.verifyTitle = '校验'
        }
      }
      return true
    },
    //图片验证码
    getCaptcha() {
      this.$axios({
        methods: 'get',
        url: 'captcha/gain',
        responseType: 'arraybuffer',
      })
        .then((response) => {
          const { headers, data } = response
          // 从响应头中获取文件名，*如果network中能看到content-disposition，代码无法获取，需后端配置
          this.login.id = decodeURI(headers['id'])
          return (
            'data:image/png;base64,' +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            )
          )
        })
        .then((data) => {
          this.codeUrl = data //data可以直接放到img标签的src中
        })
    },
  },
  mounted() {
    this.getCaptcha()
  },
  created() {},
  watch: {},
}
</script>

<style scoped>
.body {
  /* margin: -8px; */
  /* background-color: #2C3E50; */
  width: 100%;
  position: inherit;
}
.body .bgimg img {
  /* 背景图片自适应 */
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0; */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
}
.title {
  /* position: absolute;
  top: 5%;
  left: 45%; */
  position: relative;
  margin-top: 5%;
  width: 100%;
  text-align: center;
}
.title h2 {
  font-family: 'Courier New', Courier, monospace;
  font-size: 2em;
  color: rgba(255, 255, 255, 0.9);
}
.content {
  background-color: rgba(255, 255, 255, 0.7);
  width: 360px;
  /* height: 300px; */
  height: 360px;
  padding: 30px 5px 10px 0px;
  border-radius: 30px;
  /* position: absolute;
  top: 25%;
  left: 60%; */
  position: relative;
  margin-top: 6%;
  margin-left: 60%;
  /* margin: 0 auto; */
}
.top {
  border: 1px solid #333333;
  box-shadow: 0px 0px 20px #333333;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-left: 135px;
}
.form {
  width: 300px;
  height: 0px;
  background-color: #55aaff;
  margin: 20px auto;
}
.form .el-form {
}
/* 注册 */
.register {
}
.reg_dialog {
  /* border-radius: 50px !important;
  background-color: rgba(255, 255, 255, 0.7); */
}
.register .el-dialog .el-form {
  padding-right: 40px;
}
/* 验证码样式 */
.codediv {
  position: inherit;
}
.codeimg {
  /* display: inline-block; */
  position: absolute;
  width: 100px;
  height: 38px;
  right: 0px;
  border-radius: 3px;
  border: 1px #333333 solid;
  cursor: pointer;
}
.codeinput {
  position: absolute;
  width: 140px;
  /* display: inline-block; */
}
.input-with-select {
  margin: 0 !important;
  padding: 0 !important;
}
.input-with-select .codebtn {
  /* width: 130px; */
  margin: 0 !important;
  padding: 0 !important;
}
</style>
