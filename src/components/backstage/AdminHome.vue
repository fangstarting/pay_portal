<!-- 后台主页 -->
<template>
  <div class="body">
    <div class="header">
      <el-divider><h2>AdminHome</h2></el-divider>
    </div>
    <div class="home">
      <!-- <video src="../../assets/vlog.mp4" autoplay="ture" loop="ture" ></video> -->
      <!-- <img src="../../assets/01751_paperplanes_1920x1080.jpg" width="100%" height="100%"> -->
      <h2>这里是后台管理主页面</h2>
      <div class="bgimg">
        <img src="../../assets/javatext1.jpg" >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdminHome',
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .body{
    /* position: relative; */
  }
  .header{
    height: 50px;
    margin: 20px 0px;
    border: 1px dashed #ffffff;
  }
  .home{
    position: relative;
  }
  .home>video{
    width: 100%;
    min-width: 1280px;
    position: absolute;
    left: 0;
    z-index: -10;
    top: 0;
    /* top: 50%; */
    /* left: 50%; */
    /* transform: translate(-50%,-50%); */
  }
  .home .bgimg img{
    opacity: 0.15;
  }
</style>
