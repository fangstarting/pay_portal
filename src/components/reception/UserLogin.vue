<!-- 登录 -->
<template>
  <div>
    <div class="body">
      <div class="bgimg">
        <img src="../../assets/01764_theiridescentstorm_1920x1080.jpg" >
      </div>
      <div class="content">
        <!-- 头像 -->
        <div class="top">
          <img src="../../assets/login头像.jpg" width="100%" style="border-radius: 50%;">
        </div>
        <!-- 登录表单 -->
        <div class="form">
          <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="50px" class="demo-ruleForm">
            <el-form-item label="账号" prop="loginId">
              <el-input type="text" v-model="loginForm.loginId" autocomplete="off" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="loginPwd">
              <el-input type="password" v-model="loginForm.loginPwd" autocomplete="off" prefix-icon="el-icon-key" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
              <el-button @click="btnRegister()">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 注册 -->
      <div class="register">
        <el-dialog title="用户注册" :visible.sync="registerVisible" width="500px" top="8vh" center="">
          <el-form :model="userData" status-icon :rules="rulesUser" ref="userData" label-width="80px" class="demo-ruleForm">
                  <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="userData.username" autocomplete="off" prefix-icon="el-icon-user"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="userData.pwd" autocomplete="off" prefix-icon="el-icon-key"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="pwdTest">
                    <el-input type="password" v-model="userData.pwdTest" autocomplete="off" prefix-icon="el-icon-key"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="mail">
                    <el-input type="text" v-model="userData.mail" autocomplete="off" prefix-icon="el-icon-eleme"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" prop="name">
                    <el-input type="text" v-model="userData.name" autocomplete="off" prefix-icon="el-icon-s-custom"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="phone">
                    <el-input type="text" v-model="userData.phone" autocomplete="off" prefix-icon="el-icon-mobile-phone" maxlength="11"></el-input>
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-select v-model="address.pk" @change="getCity(address.pk)" placeholder="选择省" size="medium" style="width: 120px;">
                      <el-option
                        v-for="item in province"
                        :key="item.pk"
                        :label="item.pv"
                        :value="item.pk">
                      </el-option>
                    </el-select>
                    <span>&nbsp;省&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-select v-model="address.ck" placeholder="选择市" size="medium" style="width: 120px;">
                      <el-option
                        v-for="item in city"
                        :key="item.ck"
                        :label="item.cv"
                        :value="item.ck">
                      </el-option>
                    </el-select>
                    <span>&nbsp;市&nbsp;&nbsp;</span>
                    <i class="el-icon-location"></i>
                  </el-form-item>
                </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userData')">重 置</el-button>
            <el-button type="primary" @click="submitRegister('userData')">注 册</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error());
      } else {
        if (this.userData.pwdTest !== '') {
          this.$refs.userData.validateField('pwdTest');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error());
      } else if (value !== this.userData.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var phoenTest = (rule, value, callback) => {
      var reg = /^1[345789]\d{9}$/; //手机正则
      if (value ==='' || value === undefined || value == null){
        callback();
      }else{
        if(!reg.test(value)){
          callback(new Error('请输入正确的手机号码!'));
        }else{
          callback();
        }
      }
    };
    return{
      loginForm:{
        loginId:'',
        loginPwd:''
      },
      rules:{
        loginId:[
           { required: true, message: '账号不能为空', trigger: 'blur' },
           { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        loginPwd:[
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      userData:{
        username:'',
        pwd:'',
        mail:'',
        name:'',
        phone:'',
        //验证密码
        pwdTest:''
      },
      province: [],//省份
      city:[],//城市
      address:{
        pk:'',
        pv:'',
        ck:'',
        cv:''
      },
      registerVisible: false,
      rulesUser:{
        username:[
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        pwd:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        pwdTest:[
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          // { validator: false, message: '两次输入密码不一致!', trigger: 'blur' }
          { validator: validatePass2, trigger: 'blur' }
        ],
        mail:[
          { required: false, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        phone:[
          { validator: phoenTest, trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    init(){
      this.getProvince();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          // alert('submit!');
          let loginname=this.loginForm.loginId;
          let pwd=this.loginForm.loginPwd;
          // console.log("id:"+loginname+",pwd:"+pwd);
          this.$axios.get('userlogin',{params:{loginname,pwd}})
          .then(e=>{
            console.log(e);
            if(e.data.LoginState){
              console.log("登录成功！");
              this.$message({
                type: 'success',
                message: '登录成功!'
              });

              var loginTime = new Date();
              sessionStorage.setItem("loginTime",loginTime.getTime());
              /**
               * 返回登录状态
               * LoginState
               * loginname
               */
              this.$router.push({
                path:'/',
                // query:{
                //   loginname:loginname,
                //   LoginState:e.data.LoginState
                // }
              });
            }else{
              console.log("登录失败！");
              this.$message({
                type: 'error',
                message: '登录失败!'
              });
              // this.$router.push('/login');
            }
          })
          .catch();
        } else {
          //表单验证失败
          console.log('error submit!!');
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.address.pk='';
      this.address.ck='';
    },
    //注册
    submitRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功

          var mail = this.userData.mail==''?null:this.userData.mail;
          var name = this.userData.name==''?null:this.userData.name;
          var phone = this.userData.phone==''?null:this.userData.phone;

          this.pCitytoString();
          var addressString = ''+this.address.pv+this.address.cv;
          var address = addressString==''?null:addressString;
          console.log(address);

          this.$axios.get('regedituser',{params:{
            username:this.userData.username,
            pwd:this.userData.pwd,
            mail,
            name,
            phone,
            address
          }})
          .then(e=>{
            console.log(e);
            if(e.data.regeditState){
              this.$message({
                type: 'success',
                message: '注册成功!'
              });
              this.registerVisible=false;
              this.resetForm('userData');
            }else{
              this.$message({
                type: 'error',
                message: '注册失败!'
              });
            }
          })
          .catch();
        } else {
          //表单验证失败
          console.log('error submit!!');
          return false;
        }
      });
    },
    getProvince(){
      //省份
      this.$axios.get('getsheng').then(e=>{
        this.province = e.data;
      }).catch();
    },
    getCity(pk){
      //城市
      this.city.length=0;//初始化
      this.address.ck='';
      this.address.cv='';
      this.$axios.get('getchengshibysid?pk='+pk).then(e=>{
        this.city = e.data;
      }).catch();
    },
    //省市转换text
    pCitytoString(){
      for (let index in this.province) {
        if(this.province[index].pk==this.address.pk){
          this.address.pv = this.province[index].pv;
          break;
        }
      }
      for (let index in this.city) {
        if(this.city[index].ck==this.address.ck){
          this.address.cv = this.city[index].cv;
          break;
        }
      }
    },
    btnRegister(){
      this.registerVisible=true;
      this.address.pk='';
      this.address.ck='';
    },
    register(){

    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped="scoped">
  .body{
    /* margin: -8px; */
    /* background-color: #2C3E50; */
  }
  .body .bgimg img{
    width: 100%;
  }
  .content{
    background-color: rgba(255,255,255,0.7);
    width: 360px;
    height: 300px;
    padding: 30px 5px 10px 0px;
    position: absolute;
    top: 25%;
    left: 60%;
    border-radius: 30px;
  }
  .top{
    border: 1px solid #333333;
    box-shadow: 0px 0px 20px #333333;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-left: 135px;
  }
  .form{
    width: 300px;
    height: 0px;
    background-color: #55AAFF;
    margin: 20px auto;
  }
  .form .el-form{
  }
  /* 注册 */
  .register{}
  .register .el-dialog .el-form{
    padding-right: 40px;
  }
</style>
