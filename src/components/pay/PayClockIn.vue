<!-- PayClockIn -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>考勤打卡</h2>
      </el-divider>
    </div>
    <div class="clickin">
      <el-row>
        <el-button type="success"
                   plain
                   @click="ClockIn(0)">上班打卡</el-button>
        <el-button type="success"
                   plain
                   @click="ClockIn(1)">下班打卡</el-button>
      </el-row>
    </div>
    <div>
      <div id="EchartsMap"
           style="height: 600px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayClockIn',
  data() {
    return {
      option: {
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false,
        },
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
            ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
            ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
            ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
          ],
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
          },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            emphasis: {
              focus: 'self',
            },
            label: {
              formatter: '{b}: {@2012} ({d}%)',
            },
            encode: {
              itemName: 'product',
              value: '2012',
              tooltip: '2012',
            },
          },
        ],
      },
    }
  },
  methods: {
    ClockIn(type) {
      //type: 0上班 1下班
      this.$axios.get('check/clockin', { params: { type } }).then((e) => {
        var mes = e.data.message
        if (e.data.errorcode == 100) {
          this.$message({
            type: 'success',
            message: mes,
          })
        } else {
          this.$message({
            type: 'warning',
            message: mes,
          })
        }
      })
    },
    /**
     * Echarts
     */
    echartsStart() {
      const myChart = this.$echarts.init(document.getElementById('EchartsMap'))
      setTimeout(function () {
        myChart.on('updateAxisPointer', function (event) {
          const xAxisInfo = event.axesInfo[0]
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)',
                },
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },
              },
            })
          }
        })
      })
      myChart.setOption(this.option)
      // Echarts大小自适应
      const _this = this
      window.addEventListener('resize', function () {
        let edom = this.document.getElementById('EchartsMap')
        if (edom !== null) {
          _this.$echarts.init(edom).resize()
        }
      })
    },
  },
  created() {},
  mounted() {
    this.echartsStart()
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
#EchartsMap {
  margin-top: 35px;
}
</style>