<!-- demo -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>薪资中心</h2>
      </el-divider>
    </div>
    <div class="content">
      <template>
        <el-tabs type="border-card"
                 style="min-height:600px"
                 @tab-click="handleClick">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-grape"></i> 薪资信息</span>
            <div style="padding:20px;">

              <div class="s2_left">
                <el-descriptions title="基本工资项目"
                                 :column="3"
                                 border>

                  <el-descriptions-item label="姓名">
                    {{myPayInfo.realname}}
                  </el-descriptions-item>

                  <el-descriptions-item label="工号">
                    {{myPayInfo.userId}}
                  </el-descriptions-item>
                  <el-descriptions-item label="工龄">
                    {{myPayInfo.workage}}年
                  </el-descriptions-item>
                  <el-descriptions-item label="工作职称">
                    <el-tag>{{myPayInfo.jobtitle}}</el-tag>
                    <!-- <el-tag size="small">高级</el-tag> -->
                  </el-descriptions-item>
                  <el-descriptions-item label="职称奖金">{{myPayInfo.jobbonus}}元</el-descriptions-item>
                  <el-descriptions-item label="基本工资">{{myPayInfo.basepay}}元</el-descriptions-item>
                </el-descriptions>
                <!-- <div class="echarts_div"> -->
                <div id="echarts_1"></div>
                <!-- </div> -->
              </div>
              <div class="s2_right">
                <div class="add">
                  <p>工资增加项目</p>
                  <el-table :data="configsAdd"
                            border>
                    <el-table-column prop="name"
                                     label="薪资标题"
                                     align="center">
                    </el-table-column>

                    <el-table-column prop="rule"
                                     label="增加方式"
                                     align="center">
                    </el-table-column>
                    <el-table-column prop="money"
                                     label="涉及金额/元"
                                     align="center">
                      <template slot-scope="scope">
                        <el-tag type="success"
                                effect="plain">{{scope.row.money}}</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="jobgradeId"
                                     label="适用职级"
                                     align="center">
                      <template slot-scope="scope">

                        <el-tag v-if="scope.row.jobgradeId">{{getJobtitle(scope.row)}}</el-tag>
                        <el-tag v-else
                                type="info">{{getJobtitle(scope.row)}}</el-tag>
                      </template>
                    </el-table-column>

                  </el-table>
                </div>
                <div class="sub">
                  <p>工资扣减项目</p>
                  <el-table :data="configsSub"
                            border>
                    <el-table-column prop="name"
                                     label="薪资标题"
                                     align="center">
                    </el-table-column>

                    <el-table-column prop="rule"
                                     label="扣减方式"
                                     align="center">
                    </el-table-column>
                    <el-table-column prop="money"
                                     label="涉及金额/元"
                                     align="center">
                      <template slot-scope="scope">
                        <el-tag type="warning"
                                effect="plain">{{scope.row.money}}</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="jobgradeId"
                                     label="适用职级"
                                     align="center">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.jobgradeId">{{getJobtitle(scope.row)}}</el-tag>
                        <el-tag v-else
                                type="info">{{getJobtitle(scope.row)}}</el-tag>
                      </template>
                    </el-table-column>

                  </el-table>
                </div>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-apple"></i> 我的薪资</span>
            <div>
              <div class="topOperate">

                <el-button @click="getPayList"
                           icon="el-icon-search"
                           circle></el-button>

                <el-date-picker v-model="getPayListParams.date"
                                type="month"
                                style="width: 150px;"
                                value-format="yyyy-MM"
                                placeholder="选择月份">
                </el-date-picker>
                <el-select clearable
                           v-model="getPayListParams.status"
                           placeholder="发放状态"
                           style="width: 150px;">
                  <el-option label="未发放"
                             value="0"></el-option>
                  <el-option label="已发放"
                             value="1"></el-option>
                </el-select>
                <el-button icon="el-icon-refresh"
                           @click="emptyQuery"
                           circle></el-button>
              </div>
              <div class="table">
                <el-table :data="payList"
                          border
                          @row-click="opShow">
                  <!-- <el-table-column type="selection"
                                   width="">
                  </el-table-column> -->
                  <el-table-column prop="date"
                                   label="工资月份"
                                   sortable
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="status"
                                   label="发放状态"
                                   align="center"
                                   width="">

                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.status===0"
                              type="danger">{{getStatusText(scope.row.status)}}</el-tag>
                      <el-tag v-else
                              type="success">{{getStatusText(scope.row.status)}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="jobTitle"
                                   label="职称"
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="idealpay"
                                   label="应发工资(元)"
                                   sortable
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="factpay"
                                   label="实发工资(元)"
                                   sortable
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="basepay"
                                   label="基本工资(元)"
                                   sortable
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="subsidy"
                                   label="补贴(元)"
                                   sortable
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="jobbonus"
                                   label="职称奖金(元)"
                                   sortable
                                   align="center"
                                   width="">
                  </el-table-column>
                  <el-table-column prop="senioritypay"
                                   label="工龄工资(元)"
                                   sortable
                                   align="center"
                                   width="">
                  </el-table-column>
                  <el-table-column prop="attendance"
                                   label="全勤奖金(元)"
                                   sortable
                                   align="center"
                                   width="">
                  </el-table-column>
                  <el-table-column prop="overtime"
                                   label="加班费(元)"
                                   sortable
                                   align="center"
                                   width="">
                  </el-table-column>
                  <!-- <el-table-column prop="late"
                                   label="迟到早退(次)"
                                   sortable
                                   align="center"
                                   width="">
                  </el-table-column> -->
                  <el-table-column prop="early"
                                   label="考勤数(天)"
                                   sortable
                                   align="center"
                                   width="">
                  </el-table-column>
                  <!-- <el-table-column prop="insure"
                                   label="请假数(天)"
                                   sortable
                                   align="center"
                                   width="">
                  </el-table-column>
                  <el-table-column prop="absenteeism"
                                   label="缺勤数(天)"
                                   sortable
                                   align="center"
                                   width="">
                  </el-table-column> -->
                  <el-table-column prop="tax"
                                   label="个人所得税(元)"
                                   sortable
                                   align="center"
                                   width="">
                  </el-table-column>
                  <el-table-column prop="submoney"
                                   label="扣款金额(元)"
                                   sortable
                                   align="center"
                                   width="">
                  </el-table-column>
                  <el-table-column prop="updatetime"
                                   label="更新时间"
                                   sortable
                                   align="center"
                                   width="102">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>

        </el-tabs>
      </template>
    </div>
    <div class="matter_conten">
      <el-drawer :title="title"
                 :visible.sync="drawer"
                 direction="rtl">
        <div class="matterText"
             v-html="matter">
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaySalaryCenter',
  data() {
    return {
      payList: [],
      getPayListParams: {
        date: undefined,
        status: '',
      },
      //弹框
      drawer: false,
      title: '',
      matter: '',
      myPayInfo: {
        userId: '',
        realname: '',
        workage: '',
        basepay: '',
        jobtitle: '',
        jobbonus: '',
        payconfigs: [],
      },
      configsAdd: [],
      configsSub: [],
      echartsData1: [],
      colorRandoms: [],
    }
  },
  methods: {
    init() {
      this.getPayList()
      this.getMyPayConfigList()
    },
    handleClick(tab, event) {
      // console.log(tab.paneName, event)
      // if (tab.paneName === '1') {
      // }
    },
    getPayList() {
      this.$axios.post('pay/mylist', this.getPayListParams).then((e) => {
        this.payList = e.data.data
      })
    },
    getMyPayConfigList() {
      this.$axios.get('payconfig/mylist').then((e) => {
        this.myPayInfo = e.data.data
        // this.echartsData1.push({
        //   value: this.myPayInfo.basepay,
        //   name: '基本工资',
        // })
        // this.echartsData1.push({
        //   value: this.myPayInfo.jobbonus,
        //   name: '职称奖金',
        // })
        this.myPayInfo.payconfigs.forEach((e) => {
          if (e.type === '增加') {
            this.configsAdd.push(e)
          } else if (e.type === '减少') {
            this.configsSub.push(e)
          }
          //处理Echarts数据
          let data = {
            value: '',
            name: '',
          }
          data.value = e.money
          data.name = e.name
          this.echartsData1.push(data)
          this.colorRandoms.push(this.getRandomColor())
          this.loadEcharts()
        })
      })
    },
    //加载Echarts
    loadEcharts() {
      let myChart = this.$echarts.init(document.getElementById('echarts_1'))
      myChart.setOption({
        legend: {
          top: 'bottom',
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [20, 150],
            center: ['50%', '40%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 10,
            },
            data: this.echartsData1,
          },
        ],
        color: this.colorRandoms,
      })
      // Echarts大小自适应
      const _this = this
      window.addEventListener('resize', function () {
        let edom = this.document.getElementById('echarts_1')
        if (edom !== null) {
          _this.$echarts.init(edom).resize()
        }
      })
    },
    getStatusText(e) {
      if (e === 0) {
        return '未发放'
      } else if (e === 1) {
        return '已发放'
      } else {
        return e
      }
    },
    opShow(row) {
      this.drawer = true
      this.title = '工资详情'
      this.matter = row.leavex
    },
    emptyQuery() {
      this.getPayListParams.date = undefined
      this.getPayListParams.status = ''
      this.getPayList()
    },
    getJobtitle(e) {
      if (e.jobgradeId === null) return '通用'
      else return this.myPayInfo.jobtitle
    },
    //生成十六进制的颜色值
    getRandomColor() {
      // return '#' + ((Math.random() * 0xffffff) << 0).toString(16)
      return (
        '#' +
        ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
      )
    },
  },
  mounted() {
    this.init()
    //  根据窗口大小调整曲线大小
    // window.onresize = () => {
    //   // 基于准备好的dom，初始化echarts实例
    //   let myChart = this.$echarts.init(document.getElementById('echarts_1'))
    //   myChart.resize()
    // }
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
.topOperate {
  margin: 10px 0;
}
.matter_conten {
  line-height: 30px;
}
.matterText {
  /* border: 1px solid #000000; */
  line-height: 30px;
  /* text-align: center; */
  text-align: justify;
  text-indent: 2em;
  width: 85%;
  height: 100%;
  color: rgb(252, 150, 103);
  display: inline-block;
}
.my-label {
  background: #e1f3d8;
}

.my-content {
  background: #fde2e2;
}
.s2_left {
  width: 47%;
  float: left;
  position: inherit;
  padding-right: 2%;
}
.s2_right {
  width: 47%;
  text-align: left;
  float: left;
  position: inherit;

  margin-top: -18px;
  padding-left: 2%;
}
.s2_right p {
  font-size: 16px;
  font-weight: 700;
  margin: 19px 0;
}
.s2_right .add {
  position: relative;
}
.s2_right .sub {
  margin-top: 30px;
  position: relative;
}
.el-descriptions {
  margin-bottom: 25px;
}
.echarts_div {
  /* position: inherit; */
  /* padding: 15px 30px; */
  /* border: 1px #333 dashed; */
  /* margin-top: 25px; */
}
#echarts_1 {
  /* margin-top: 25px; */
  /* position: inherit; */
  /* position: relative; */
  height: 520px;
  /* width: 100%; */
  /* width: 550px auto; */
  margin: 0 auto;
  /* overflow: hidden; */
  /* padding: 50px; */
}
</style>