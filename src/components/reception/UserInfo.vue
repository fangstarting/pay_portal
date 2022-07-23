<!-- 用户信息 -->
<template>
  <div>
    <div class="top">
      <el-divider><h2>个&nbsp;人&nbsp;信&nbsp;息</h2></el-divider>
    </div>
    <div id="crumbs">
      <div class="left">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>我的订单</el-breadcrumb-item>
          <el-breadcrumb-item>购物车</el-breadcrumb-item>
           <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="user">
      <div class="userPohto">
        <div class="img">
          <img :src="userPohto">
        </div>
        <div class="upimg">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action="http://localhost:8080/BookShop/uploaduserinfophoto"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="insertUser">上传头像</el-button>
        </div>
      </div>
      <div class="userInfo">
        <div class="left">
          <p>用户编号</p>
          <p>登陆名</p>
          <p>登录密码</p>
          <p>真实姓名</p>
          <p>住址</p>
          <p>电子邮件</p>
          <p>角色名称</p>
          <p>电话</p>
        </div>
        <div class="right">
          <p>{{userData.id}}</p>
          <p>{{userData.LoginId}}</p>
          <p>{{userData.LoginPwd}}</p>
          <p>{{userData.Name}}</p>
          <p>{{userData.Address}}</p>
          <p>{{userData.Mail}}</p>
          <p>{{RoleName}}</p>
          <p>{{userData.Phone}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserInfo',
    data() {
      return {
         userData:{},
         userPohto:'',
         RoleName:'',
         imageUrl: '',
         upfile:''
      }
    },
    methods:{
      //初始化数据
      init(){
        this.getUserData();
      },
      getUserData(){
        this.$axios.get('getloginuserinfo').then(e=>{
          this.userData=e.data;
          this.userPohto='http://localhost:8080/BookShop/'+e.data.Photo;
          console.log(">>图片地址加载>>");
          console.log(this.userPohto);
          this.shiftRoleName();
        }).catch();
      },
      shiftRoleName(){
        if(this.userData.RoleName==0){
          this.RoleName='普通用户';
        }else{
          this.RoleName='管理员';
        }
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        this.upfile = file;
        return isJPG && isLt2M;
      },
      insertUser(){
        let formData = new FormData();
        formData.append('file',this.upfile);//把文件封装到formdata中
        this.$axios.post('uploaduserinfophoto',formData,{
          headers:{
            'content-type':'multipart/form-data' //固定
          }
        }).then(e=>{
          console.log(e.data);
          if(e.data.statedesc == "修改头像成功"){
            this.getUserData();
            this.$notify({
              title: '修改头像成功',
              type: 'success'
            });
          }else{
            this.$notify({
              title: '修改头像失败',
              type: 'error'
            });
          }
        }).catch(e=>{
          console.log(e);
        });
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  div{
    /* border: 1px dashed #333333; */
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
  .user{
    width: 800px;
    /* height: 500px; */
    margin: 0 auto;
    padding: 50px 0 10px 0;
    box-shadow: 0 0 20px #B3B3B3;
    border-radius: 50px;
  }
  .user .userPohto{
    height: 180px;
    width: 400px;
    margin: 0 auto;
    position: relative;
  }
  .user .userPohto .img{
    float: left;
    /* width: 120px; */
    height: 170px;
    margin: 0 20px 0 80px;
  }
  .user .userPohto .img img{
    width: 100%;
    height: 100%;
  }
  .user .userPohto .upimg{
    float: left;
    /* position: absolute; */
    bottom: 15px;
    right: 15px;
    margin-top: 55px;
  }
  /* elementUi */
  .user .userPohto .upimg .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .user .userPohto .upimg .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .user .userPohto .upimg .avatar-uploader-icon {
    font-size: 40px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .user .userPohto .upimg .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  /* end */
  .user .userInfo{
    height: 350px;
  }
  .user .userInfo .left{
    color: #888888;
    float: left;
    line-height: 20px;
    width: 70px;
    text-align-last: justify;
    margin-left: 300px;
    margin-right: 50px;
  }
  .user .userInfo .right{
    float: left;
    line-height: 20px;
    width: 150px;
    text-align: left;
  }
</style>
