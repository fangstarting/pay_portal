<!-- 考勤信息统计 -->
<template>
  <div>
    <div>
      <div class="header">
        <el-divider>
          <h2>考勤信息统计</h2>
        </el-divider>
      </div>
    </div>

    <div class="top">
      <el-col :span="5">
        <el-row :gutter="80">
          <el-col :span="5">
            <i class="el-icon-s-data"
               style="color: #f59910;font-size: 80px" />
          </el-col>
          <el-col :span="15"
                  style="font-size: 18px;padding-top: 10px">
            <el-progress color="#f59910"
                         :text-inside="true"
                         :stroke-width="15"
                         :percentage="30" />
            <span>理论考勤:120</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row :gutter="80">
          <el-col :span="5">
            <i class="el-icon-s-data"
               style="color: #01479d;font-size: 80px" />
          </el-col>
          <el-col :span="15"
                  style="font-size: 18px;padding-top: 10px">
            <el-progress color="#01479d"
                         :text-inside="true"
                         :stroke-width="15"
                         :percentage="14" /><br>
            <span>实际考勤:132</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row :gutter="80">
          <el-col :span="5">
            <i class="el-icon-s-data"
               style="color: #f3162b;font-size: 80px" />
          </el-col>
          <el-col :span="15"
                  style="font-size: 18px;padding-top: 10px">
            <el-progress color="#f3162b"
                         :text-inside="true"
                         :stroke-width="15"
                         :percentage="16" /><br>
            <span>异常状态:8</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row :gutter="80">
          <el-col :span="5">
            <i class="el-icon-s-data"
               style="color: #0073ff;font-size: 80px" />
          </el-col>
          <el-col :span="15"
                  style="font-size: 18px;padding-top: 10px">
            <el-progress color="#0073ff"
                         :text-inside="true"
                         :stroke-width="15"
                         :percentage="25" /><br>
            <span>正常状态:100</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row :gutter="80">
          <el-col :span="5">
            <i class="el-icon-s-data"
               style="color: #34ea7d;font-size: 80px" />
          </el-col>
          <el-col :span="15"
                  style="font-size: 18px;padding-top: 10px">
            <el-progress color="#34ea7d"
                         :text-inside="true"
                         :stroke-width="15"
                         :percentage="24" /><br>
            <span>迟到早退:90</span>
          </el-col>
        </el-row>
      </el-col>
    </div>

    <div class="date"
         style="">
      <el-radio-group v-model="tabPosition"
                      style="padding-right: 20px"
                      @change="handleClick">
        <el-radio-button label="0">周</el-radio-button>
        <el-radio-button label="1">月</el-radio-button>
        <el-radio-button label="2">季</el-radio-button>
        <el-radio-button label="3">年</el-radio-button>
      </el-radio-group>
      <el-date-picker v-model="value1"
                      v-if="flge==0"
                      type="week"
                      value-format="yyyy-MM-dd"
                      format="yyyy 第 WW 周"
                      @change="week"
                      placeholder="选择周">
      </el-date-picker>
      <el-date-picker v-model="value2"
                      v-else-if="flge==1"
                      value-format="yyyy-MM"
                      type="month"
                      @change="month"
                      placeholder="选择月">
      </el-date-picker>
      <el-date-picker v-model="value3"
                      v-else
                      value-format="yyyy"
                      type="year"
                      @change="year"
                      placeholder="选择年">
      </el-date-picker>
    </div>

    <div id="main"
         style="width: 95%;height: 550px;padding-top: 20px"></div>

  </div>
</template>

<script>
export default {
  name: 'PayEchartsCheck',
  data() {
    return {
      flge: 0,
      value1: '',
      value2: '',
      value3: '',
      tabPosition: '0',
      charts: '',
      datas: [],
      works: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      months: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
      quarters: ['第一季度', '第二季度', '第三季度', '第四季度'],
      years: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      statParams: {
        type: 1,
        startDate: '2022-05-01',
        endDate: '2022-06-01',
      },
    }
  },
  mounted() {
    this.handleClick('0')
    this.getCheckStatDate()
  },
  methods: {
    handleClick(row) {
      this.flge = row
      if (row === '0') {
        this.datas = this.works
      }
      if (row === '1') {
        this.datas = this.months
      }
      if (row === '2') {
        this.datas = this.quarters
      }
      if (row === '3') {
        this.datas = this.years
      }
      let myChart = this.$echarts.init(document.getElementById('main'))
      myChart.setOption({
        title: {
          text: '考勤走势图',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          right: '10px',
          data: ['理论考勤', '实际出勤', '异常缺勤', '迟到人数', '早退人数'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.datas,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '理论考勤',
            data: [
              820, 932, 901, 934, 1290, 1330, 1320, 901, 934, 934, 1290, 1330,
            ],
            type: 'line',
            color: '#f59910',
          },
          {
            name: '实际出勤',
            data: [
              620, 711, 823, 934, 1445, 1456, 1178, 901, 934, 823, 934, 1445,
            ],
            type: 'line',
            color: '#01479d',
          },
          {
            name: '异常缺勤',
            data: [
              612, 920, 1140, 1160, 1190, 1234, 920, 1140, 1160, 1321, 1231,
              890,
            ],
            type: 'line',
            color: '#f3162b',
          },
          {
            name: '迟到人数',
            data: [
              502, 590, 1640, 1020, 1590, 1334, 1821, 1160, 1190, 1234, 920,
              1232,
            ],
            type: 'line',
            color: '#0073ff',
          },
          {
            name: '早退人数',
            data: [
              212, 820, 1340, 1660, 1290, 1934, 1491, 1234, 1123, 1677, 879,
              1120,
            ],
            type: 'line',
            color: '#34ea7d',
          },
        ],
      })
    },
    getCheckStatDate() {
      this.$axios.post('check/stat', this.statParams).then((e) => {
        console.log(e)
      })
    },
    week(e) {
      console.log(this.value1)
    },
    month(e) {
      console.log(e)
    },
    year(e) {
      console.log(e)
    },
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
.top {
  padding: 20px 50px;
  margin-bottom: 70px;
  text-align: left;
}
.top span {
  font-size: 12px;
  display: inline-block;
  margin-top: 20px;
  margin-left: 10px;
}
.date {
  /* margin-top: 50px; */

  text-align: right;
  /* margin-bottom: 30px; */
  margin-right: 70px;
}
</style>