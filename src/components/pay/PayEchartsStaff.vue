<!-- demo -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>员工信息统计</h2>
      </el-divider>
    </div>
    <el-button type=""
               @click="echartsStart()">加载Echarts</el-button>
    <div class="list-left">
      <div id="Echarts_1"
           style="width: 500px; height: 500px;"></div>
    </div>
    <div class="list-rigth">
      <div id="Echarts_2"
           style="width: 500px; height: 500px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayEchartsStaff',
  data() {
    return {
      /**
       * Echarts Data
       */
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
          },
        ],
      },
    }
  },
  methods: {
    init() {
      this.echartsStart()
    },
    /**
     * Echarts
     */
    echartsStart() {
      let myChart = this.$echarts.init(document.getElementById('Echarts_1'))
      myChart.setOption(this.option)
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>
.header {
  height: 25px;
  margin-top: 10px;
}
.el-divider .el-divider__text {
  background-color: rgb(243, 243, 243);
}
</style>