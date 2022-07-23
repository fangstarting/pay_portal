<!-- 订单提醒管理 -->
<template>
  <div>
    <div class="header">
      <el-divider><h2>OrderRemindOperate</h2></el-divider>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrderRemindOperate',
    data() {
      return {

      }
    },
    methods:{
      init(){
        this.getData();
      },
      getData(){
        this.$axios.get('bg/YouXinDingDanLe').then(e=>{
          console.log(e);
        }).catch(e=>{
          this.$message({
            type: 'info',
            message: e
          });
        });
      }
    },
    created() {

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
</style>
