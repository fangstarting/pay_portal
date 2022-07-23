<!-- 管理员登录 -->
<template>
  <div>
    <div class="body">
      <div class="bgimg">
        <!-- <img src="../../assets/01848_flow_1920x1080.jpg"> -->
        <video src="../../assets/vlog.mp4" autoplay="ture" loop="ture" ></video>
      </div>
      <div class="content">
        <div class="text">
          <span>管理员登录</span>
        </div>
        <!-- 头像 -->
        <div class="top">
          <img src="../../assets/icon-admin.png" width="100%" style="border-radius: 50%;">
        </div>
        <!-- 登录表单 -->
        <div class="form">
          <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="50px" class="demo-ruleForm">
            <el-form-item label="账号" prop="loginname">
              <el-input type="text" v-model="loginForm.loginname" autocomplete="off" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input type="password" v-model="loginForm.pwd" autocomplete="off" prefix-icon="el-icon-key" show-password></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="usertype">
              <el-select v-model="loginForm.usertype" placeholder="请选择" style="width: 250px;">
                <el-option
                  v-for="item in selectTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdminLogin',
    data() {
      return {
        loginForm:{
          loginname:'',
          pwd:'',
          usertype:''
        },
        rules:{
          loginname:[
             { required: true, message: '账号不能为空', trigger: 'blur' },
             { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          pwd:[
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          usertype:[
            { required: true, message: '请选择登录角色', trigger: 'blur,change' }
          ]
        },
        selectTypes: [
          {
            value: '1',
            label: '管理员'
          }, {
            value: '2',
            label: '超级管理员',
            disabled: true
          }, {
            value: '0',
            label: '普通用户',
            disabled: true
          }
        ]
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //表单验证成功
            console.log(">>表单验证成功");
            console.log(this.loginForm);

            this.$axios.get('userlogin',{params:{
              loginname:this.loginForm.loginname,
              pwd:this.loginForm.pwd,
              usertype:this.loginForm.usertype
            }})
            .then(e=>{
              console.log(e);
              if(e.data.LoginState){
                console.log("登录成功！");
                this.$message({
                  type: 'success',
                  message: '登录成功!'
                });
                //获取当前时间戳
                var loginTime = new Date();
                sessionStorage.setItem("time",loginTime.getTime());
                sessionStorage.setItem("user",JSON.stringify(this.loginForm));
                sessionStorage.setItem("token",e.data.token);//登录成功后，将服务器返回的token存储在sessionStorage（会话存储仓库）当中
                this.$router.push('/bg');
              }else{
                let mess = "错误："+e.data.status+"，"+e.data.desc;
                console.log("登录失败！");
                this.$message({
                  type: 'error',
                  message: mess
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
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .body{
    /* margin: -8px; */
    /* background-color: #2C3E50; */
  }
  .body .bgimg img{
    width: 100%;
  }
  .body .bgimg video{
    width: 100%;
    min-width: 1280px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -10;
  }
  .content{
    background-color: rgba(255,255,255,0.7);
    width: 360px;
    height: 420px;
    padding: 30px 5px 10px 0px;
    position: absolute;
    top: 15%;
    left: 40%;
    border-radius: 30px;
    box-shadow: 10px 10px 15px #333333;
  }
  .content .text{
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .content .top{
    border: 1px solid #333333;
    box-shadow: 0px 0px 20px #333333;
    width: 100px;
    height: 100px;
    border-radius: 30%;
    margin-left: 135px;
  }
  .content .form{
    width: 300px;
    height: 0px;
    background-color: #55AAFF;
    margin: 20px auto;
  }
</style>
