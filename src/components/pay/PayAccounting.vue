<!-- demo -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>薪资核算</h2>
      </el-divider>
    </div>
    <div class="topOperate">

      <el-button @click="getPayList"
                 icon="el-icon-search"
                 circle></el-button>

      <el-input placeholder="员工工号"
                oninput="value=value.replace(/\D/g,'')"
                maxlength="11"
                clearable
                style="width: 150px;"
                v-model="getPayDataParam.userId">
      </el-input>
      <el-date-picker v-model="getPayDataParam.date"
                      type="month"
                      style="width: 150px;"
                      value-format="yyyy-MM"
                      placeholder="选择月份">
      </el-date-picker>
      <el-select clearable
                 v-model="getPayDataParam.status"
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
      <el-button type="primary"
                 @click="accountingVisilbe = true"
                 plain>薪资核算</el-button>
      <el-button type="danger"
                 :disabled="disBtnSendPay"
                 @click="batchSendPay"
                 plain>薪资发放</el-button>
    </div>

    <div class="page">
      <el-pagination @size-change="pageSizechange"
                     :page-sizes="[10, 20, 50,100]"
                     :page-size="getPayDataParam.pageSize"
                     @current-change="pageNumchange"
                     :current-page="getPayDataParam.pageNum"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <div class="accounting">
      <el-dialog title="薪资核算"
                 :visible.sync="accountingVisilbe"
                 width="400px"
                 top="8vh"
                 center="">
        <el-form :model="accountingData"
                 status-icon
                 ref="accountingDataFrom"
                 :rules="rules"
                 label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="核算月份"
                        prop="dateStr">
            <el-date-picker v-model="accountingData.dateStr"
                            type="month"
                            value-format="yyyy-MM"
                            placeholder="选择月">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="考勤天数"
                        prop="daySum">
            <el-input type="text"
                      v-model="accountingData.daySum"
                      oninput="value=value.replace(/\D/g,'')"
                      autocomplete="off"
                      style="width: 225px"
                      prefix-icon="el-icon-star-off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="payAccounting('accountingDataFrom')">开始核算</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="table">
      <el-table :data="payList"
                border
                @selection-change="myPaySelectionChange"
                @row-click="opShow">
        <el-table-column type="selection"
                         width="">
        </el-table-column>
        <el-table-column type="index"
                         align="center"
                         label="序号">
        </el-table-column>
        <el-table-column prop="date"
                         label="工资月份"
                         sortable
                         align="center">
        </el-table-column>
        <el-table-column prop="userId"
                         label="工号"
                         sortable
                         align="center">
        </el-table-column>
        <el-table-column prop="realName"
                         label="姓名"
                         align="center">
        </el-table-column>
        <el-table-column prop="status"
                         label="发放状态"
                         align="center"
                         width="">
          <template slot-scope="scope">
            <el-tag type="warning"
                    v-if="scope.row.status===0">未发放</el-tag>
            <el-tag v-else
                    type="success">已发放</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deptName"
                         label="部门"
                         align="center">
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
        <el-table-column prop="late"
                         label="迟到早退(次)"
                         sortable
                         align="center"
                         width="">
        </el-table-column>
        <el-table-column prop="early"
                         label="考勤数(天)"
                         sortable
                         align="center"
                         width="">
        </el-table-column>
        <el-table-column prop="insure"
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
          <template slot-scope="scope">
            <el-tag type="success"
                    v-if="scope.row.absenteeism<=3">{{scope.row.absenteeism}}</el-tag>
            <el-tag v-else-if="scope.row.absenteeism<=10"
                    type="warning">{{scope.row.absenteeism}}</el-tag>
            <el-tag v-else
                    type="danger">{{scope.row.absenteeism}}</el-tag>
          </template>
        </el-table-column>
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
    <el-dialog title="薪资详情"
               :visible.sync="showVisible">
      <div class="matterText"><span>{{rowLeavex}}</span></div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   :disabled="showBtnDis"
                   @click="grantPay">{{showBtnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PayAccounting',
  data() {
    const validateDaySum = (rule, value, callback) => {
      if (!value) {
        callback(new Error('考勤天数不能为空'))
      } else if (value < 1 || value > 31) {
        callback(new Error('请输入有效的考勤天数'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()])
            },
          },
          {
            text: '今年至今',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().getFullYear(), 0)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 6)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      accountingVisilbe: false,
      accountingData: {
        dateStr: '', //yyyy-MM
        daySum: '', //考核天数
        cover: false, //是否覆盖
      },
      rules: {
        daySum: [
          {
            type: 'number',
            required: true,
            trigger: 'blur',
            validator: validateDaySum,
          },
        ],
      },
      getPayDataParam: {
        pageNum: 1,
        pageSize: 6,
        userId: '',
        date: '',
        status: '',
      },
      total: 0,
      payList: [],
      rowData: {},
      rowLeavex: '',
      showVisible: false,
      showBtnText: '发放工资',
      showBtnDis: true,
      enddata: '',
      disBtnSendPay: true,
      batchSendPayIds: [],
    }
  },
  methods: {
    init() {
      this.getPayList()
    },
    payAccounting(formName) {
      this.$refs[formName].validate((valid) => {
        if (!this.accountingData.dateStr) {
          this.$notify({
            title: '警告',
            message: '请完善薪资核算信息',
            type: 'warning',
          })
        }
        if (valid && this.accountingData.dateStr) {
          //表单验证成功
          console.log(this.accountingData)
          this.$axios
            .post('pay/wageAccounting', this.accountingData)
            .then((e) => {
              if (e.data.error === 1 && e.data.sign) {
                this.$message({
                  type: 'success',
                  message: e.data.message,
                })
                this.accountingData.dateStr = ''
                this.accountingData.daySum = ''
                this.accountingData.cover = false
                this.accountingVisilbe = false
                this.getPayList()
              } else if (e.data.error === 10) {
                const mes = e.data.message
                this.$confirm(mes, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                  .then(() => {
                    this.accountingData.cover = true
                    this.payAccounting('accountingDataFrom')
                  })
                  .catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消核算',
                    })
                  })
              } else {
                this.$message({
                  type: 'error',
                  message: e.data.message,
                })
              }
            })
        } else {
          //表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    },
    getPayList() {
      this.$axios.post('pay/lists', this.getPayDataParam).then((e) => {
        if (e.data.error === 1) {
          this.total = e.data.data.total
          this.payList = e.data.data.records
        }
      })
    },
    //业务区
    //表格点击时间row-click 参数 row, event, column
    opShow(row) {
      this.rowData = row
      //绑定row的model
      if (row.status === 0) {
        this.showBtnText = '发放工资'
        this.showBtnDis = false
      } else if (row.status === 1) {
        this.showBtnText = '工资已发放'
        this.showBtnDis = true
      }
      this.rowLeavex = row.leavex
      // this.userData = Object.assign(row);//浅拷贝一个对象，解除与源数据的绑定
      this.showVisible = true
    },
    //页码改变事件
    pageSizechange(e) {
      // console.log('页码改变事件>>' + e)
      this.getPayDataParam.pageSize = e
      this.getPayList()
    },
    pageNumchange(e) {
      // console.log(">>触发页面改变事件");
      // console.log('页面改变事件>>' + e)
      this.getPayDataParam.pageNum = e
      this.getPayList()
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
    //清空查询条件
    emptyQuery() {
      this.getPayDataParam.userId = ''
      this.getPayDataParam.date = ''
      this.getPayDataParam.status = ''
      this.getPayList()
    },
    grantPay() {
      //发放薪资
      let loadingInstance = this.$loading.service({
        text: '正在发放工资中...',
      })
      const payId = this.rowData.payId
      this.$axios
        .get('pay/grant', { params: { payId } })
        .then((e) => {
          if (e.data.error === 1) {
            this.$message({
              type: 'success',
              message: '工资发放成功！',
            })
            this.rowData.status = 1
            this.showVisible = false
          } else {
            this.$message({
              type: 'error',
              message: e.data.message,
            })
          }
        })
        .catch((e) => {})
        .then(() => loadingInstance.close())
    },
    batchSendPay() {
      this.$confirm('是否确认发放已选的工资信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          let loadingInstance = this.$loading.service({
            text: '正在批量发放工资中...',
          })
          this.$axios
            .post('pay/grants', this.batchSendPayIds)
            .then((e) => {
              if (e.data.error === 1) {
                this.$message({
                  type: 'success',
                  message: '批量发放工资成功！',
                })
                this.$notify({
                  title: '批量工资发放',
                  message: e.data.message,
                  duration: 0,
                })
                this.getPayList()
              } else {
                this.$message({
                  type: 'error',
                  message: e.data.message,
                })
              }
            })
            .catch((e) => {})
            .then(() => loadingInstance.close())
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消工资发放',
          })
        })
    },
    myPaySelectionChange(e) {
      if (e.length > 0) {
        this.disBtnSendPay = false
      } else {
        this.disBtnSendPay = true
      }
      let ids = []
      e.forEach((item) => ids.push(item.payId))
      this.batchSendPayIds = ids
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
.topOperate {
  /* text-align: left; */
}
.topOperate button {
  /* margin: 0 20px; */
}
.page {
  margin: 10px 0;
}
.top {
  text-align: left;
  /* line-height: 60px; */
  /* background-color: rgb(225, 239, 243); */
  /* width: 100%; */
  /* height: 60px; */
  /* border: 1px rgb(236, 194, 194) dashed; */
}
.matterText {
  /* border: 1px solid #000000; */
  line-height: 30px;
  /* text-align: center; */
  text-align: justify;
  font-size: 1.3em;
  text-indent: 2em;
  width: 85%;
  height: 100%;
  color: rgb(252, 150, 103);
  display: inline-block;
}
</style>