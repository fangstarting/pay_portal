<!-- demo -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>审批中心</h2>
      </el-divider>
    </div>
    <div class="content">
      <template>
        <el-tabs type="border-card"
                 style="min-height:600px"
                 @tab-click="handleClick">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-edit-outline"></i> 审批申请</span>
            <div>
              <el-steps :active="active"
                        finish-status="success">

                <el-step title="流程审批">

                </el-step>
                <el-step title="选择业务">

                </el-step>
                <el-step title="填写信息">

                </el-step>
                <el-step title="申请提交">

                </el-step>
              </el-steps>
              <el-button style="margin-top: 12px;"
                         @click="back">上一步</el-button>
              <el-button style="margin-top: 12px;"
                         @click="next">下一步</el-button>
              <template>
                <el-tabs v-model="activeName_1"
                         @tab-click="handleClick_1">
                  <el-tab-pane label=""
                               name="0">
                    <div class="audit_state">
                      <div class="text_p">
                        <h2>欢迎使用流程审批</h2>
                        <p>注意事项：</p>
                        <p>1.审批类型必须符合流程要求</p>
                        <p>2.审批信息必须确保无误</p>
                        <p>3.审批后需要等待相应负责人批阅</p>
                        <p>4.审批结果会以系统通知的方式方式给您</p>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label=""
                               name="1">
                    <div>
                      <div class="table"
                           style="margin: 0 50px">
                        <el-table :data="audtypes">
                          <el-table-column type="index"
                                           align="center"
                                           label="序号">
                          </el-table-column>
                          <el-table-column prop="notes"
                                           label="审批说明"
                                           align="center">
                          </el-table-column>
                          <el-table-column label="选择审批类型"
                                           header-align="center"
                                           align="center">
                            <el-button-group slot-scope="scope">
                              <el-radio v-model="auditData.audtype"
                                        :disabled="scope.row.audtypeId===1"
                                        :label="scope.row.audtypeId"
                                        border>{{scope.row.name}}</el-radio>
                            </el-button-group>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label=""
                               name="2">
                    <div class="audit_form_div">
                      <!-- 请假 -->
                      <template v-if="auditData.audtype===2">

                        <el-form :model="auditData"
                                 :rules="ruleLeavex"
                                 ref="leavexForm"
                                 label-width="100px"
                                 class="demo-ruleForm">
                          <el-form-item label="审核描述"
                                        prop="notes">
                            <el-input type="textarea"
                                      v-model="auditData.notes"></el-input>
                          </el-form-item>
                          <el-form-item label="请假类型"
                                        prop="leavex.type">
                            <el-select v-model="auditData.leavex.type"
                                       placeholder="选择类型">
                              <el-option value="1"
                                         label="病假"></el-option>
                              <el-option value="2"
                                         label="事假"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="请假日期"
                                        prop="leavex.startdate">
                            <el-date-picker @change="leavexDateChange"
                                            value-format="yyyy-MM-dd"
                                            v-model="leavexDate"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                            </el-date-picker>
                          </el-form-item>
                          <el-form-item label="缘由描述"
                                        prop="leavex.notes">
                            <el-input type="textarea"
                                      v-model="auditData.leavex.notes"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="warning"
                                       plain
                                       @click="resetForm(subFormName)">重置</el-button>
                          </el-form-item>
                        </el-form>
                      </template>
                      <!-- 加班 -->
                      <template v-if="auditData.audtype===3">
                        <el-form :model="auditData"
                                 :rules="ruleExtrawork"
                                 ref="extraworkForm"
                                 label-width="100px"
                                 class="demo-ruleForm">
                          <el-form-item label="审核描述"
                                        prop="notes">
                            <el-input type="textarea"
                                      v-model="auditData.notes"></el-input>
                          </el-form-item>
                          <el-form-item label="加班类型"
                                        prop="extrawork.ewtypeId">
                            <el-select v-model="auditData.extrawork.ewtypeId"
                                       placeholder="选择类型">
                              <el-option v-for="item in ewtypes"
                                         :key="item.ewtypeId"
                                         :label="item.name"
                                         :value="item.ewtypeId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="加班日期"
                                        prop="extrawork.date">
                            <el-date-picker v-model="auditData.extrawork.date"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期">
                            </el-date-picker>
                          </el-form-item>
                          <el-form-item label="加班时长"
                                        prop="extrawork.duration">
                            <!-- <el-input oninput="value=value.replace(/[^0-9.]/g,'')"
                                      maxlength="5"
                                      v-model="auditData.extrawork.duration">
                              <template slot="append">小时</template>
                            </el-input> -->
                            <el-time-select @change="durationDateChange"
                                            style="width: 180px"
                                            v-model="auditData.extrawork.duration"
                                            :picker-options="{
    start: '00:30',
    step: '00:15',
    end: '10:00'
  }"
                                            placeholder="选择时间">

                            </el-time-select>
                            <span>
                              &nbsp;小时
                            </span>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="warning"
                                       plain
                                       @click="resetForm(subFormName)">重置</el-button>
                          </el-form-item>
                        </el-form>
                      </template>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label=""
                               name="3">
                    <div class="audit_state">
                      <div class="text_p">
                        <h2>你的填写的审批信息已完成</h2>
                        <p>阅读注意事项：</p>
                        <p>1.审批类型必须符合流程要求</p>
                        <p>2.审批信息必须确保无误</p>
                        <p>3.审批后需要等待相应负责人批阅</p>
                        <p>4.审批结果会以系统通知的方式方式给您</p>
                        <el-button type="primary"
                                   @click="submitAudit">确认提交申请</el-button>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-s-check"></i> 申请历史</span>
            <div>
              <div class="table">
                <el-table :data="myAuditList"
                          border>
                  <el-table-column type="index"
                                   align="center"
                                   label="序号">
                  </el-table-column>
                  <el-table-column prop="updatetime"
                                   label="更新时间"
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="notes"
                                   label="审核描述"
                                   align="center">
                  </el-table-column>
                  <el-table-column prop="status"
                                   label="状态"
                                   align="center">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status==1">
                        <el-tag type="success">已处理</el-tag>
                      </span>
                      <span v-else>
                        <el-tag type="warning">未处理</el-tag>
                      </span>
                      <!-- <span v-if="scope.row.status==2">
                  <el-tag type="warning">已搁置</el-tag>
                </span> -->
                    </template>
                  </el-table-column>
                  <el-table-column prop="auditoruserName"
                                   label="审核人"
                                   align="center"
                                   style="width: 10%">
                  </el-table-column>

                  <!-- <el-table-column label="操作"
                             header-align="center"
                             align="center"
                             style="width: 10%">
              <el-button-group slot-scope="scope">
                <el-tooltip content="审核"
                            placement="top"
                            :open-delay="1000">
                  <el-button @click="showAuditInfo(scope.row)"
                             type="primary"
                             size="mini"
                             icon="el-icon-view"></el-button>
                </el-tooltip>
                <el-tooltip content="删除"
                            placement="top"
                            :open-delay="1000">
                  <el-button @click="delAudit(scope.row.auditId)"
                             type="primary"
                             size="mini"
                             icon="el-icon-delete"></el-button>
                </el-tooltip>
              </el-button-group>
            </el-table-column> -->
                </el-table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayAuditCenter',
  data() {
    const validateBigDecimal = (rule, value, callback) => {
      value += ''
      if (!value) {
        callback(new Error('请填写加班时长'))
      } else if (value.indexOf('.') != -1 && value.split('.').length > 2) {
        callback(new Error('请输入正确格式的加班时长')) //防止输入多个小数点
      } else if (value.indexOf('.') != -1 && value.split('.')[1].length > 2) {
        callback(new Error('小数点后至多两位有效数字')) //小数点后两位
      } else {
        callback()
      }
    }
    const validateStartDate = (rule, value, callback) => {
      let flag = false
      if ((value !== null && value !== undefined) || value !== '') {
        var start = new Date(value).getTime()
        var curr = new Date().getTime() - 57600000
        if (start < curr) flag = true
      }
      if (!value) {
        callback(new Error('请选择请假日期'))
      } else if (flag) {
        callback(new Error('请假开始日期不能提前于当前日期'))
      } else {
        callback()
      }
    }
    return {
      myAuditList: [],
      active: 0,
      activeName_1: '0',
      audtypes: [],
      ewtypes: [],
      nextBtn: false,
      //审核表单数据
      auditData: {
        audtype: '',
        notes: '',
        leavex: {
          startdate: undefined,
          enddate: undefined,
          type: '',
          notes: '',
        },
        extrawork: {
          ewtypeId: '',
          duration: '',
          date: '',
        },
      },
      leavexDate: undefined,
      durationDate: undefined,
      subFormName: '',
      ruleAs: {},
      ruleLeavex: {
        notes: [
          { required: true, message: '请输入审核的描述信息', trigger: 'blur' },
          {
            min: 3,
            max: 30,
            message: '长度在 3 到 30 个字符',
            trigger: 'blur',
          },
        ],
        'leavex.type': [
          { required: true, message: '请选择请假类型', trigger: 'change' },
        ],
        'leavex.startdate': [
          // {
          //   type: 'string',
          //   required: true,
          //   message: '请选择请假日期',
          //   trigger: 'change',
          // },
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            validator: validateStartDate,
          },
        ],
        'leavex.notes': [
          { required: true, message: '请输入缘由描述信息', trigger: 'blur' },
          {
            min: 5,
            max: 500,
            message: '长度在 5 到 500 个字符',
            trigger: 'blur',
          },
        ],
      },
      ruleExtrawork: {
        notes: [
          { required: true, message: '请输入审核的描述信息', trigger: 'blur' },
          {
            min: 3,
            max: 30,
            message: '长度在 3 到 30 个字符',
            trigger: 'blur',
          },
        ],
        'extrawork.ewtypeId': [
          { required: true, message: '请选择加班类型', trigger: 'change' },
        ],
        'extrawork.date': [
          {
            type: 'string',
            required: true,
            message: '请选择加班日期',
            trigger: 'change',
          },
        ],
        'extrawork.duration': [
          { required: true, message: '请填写加班时长', trigger: 'blur' },
          // {
          //   type: 'string',
          //   required: true,
          //   trigger: 'blur',
          //   validator: validateBigDecimal,
          // },
        ],
      },
    }
  },
  methods: {
    init() {
      this.getAudtypes()
      this.getEwtypes()
      this.getMyAuditList()
    },
    getMyAuditList() {
      this.$axios.get('audit/mylist').then((e) => {
        this.myAuditList = e.data.data
      })
    },
    getAudtypes() {
      this.$axios.get('audtype/list').then((e) => {
        this.audtypes = e.data.data
      })
    },
    getEwtypes() {
      this.$axios.get('ewtype/list').then((e) => {
        this.ewtypes = e.data.data
      })
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    handleClick_1(tab, event) {
      // console.log(this.activeName_1)
    },
    next() {
      if (this.active === 1) {
        if (
          this.auditData.audtype === '' ||
          this.auditData.audtype === undefined ||
          this.auditData.audtype === null
        ) {
          this.$notify({
            title: '警告',
            message: '请选择选择正确的审批类型',
            type: 'warning',
          })
          return
        } else {
          if (this.auditData.audtype == 2) {
            //请假
            this.subFormName = 'leavexForm'
          } else if (this.auditData.audtype == 3) {
            //加班
            this.subFormName = 'extraworkForm'
          }
        }
      } else if (this.active === 2) {
        const flag = this.submitForm(this.subFormName)
        if (!flag) {
          this.$notify({
            title: '警告',
            message: '请正确填写审批信息',
            type: 'warning',
          })
          return
        }
      }
      if (this.active++ > 3) this.active = 3
      this.activeName_1 = '' + this.active
    },
    back() {
      if (this.active-- == 0) this.active = 0
      this.activeName_1 = '' + this.active
    },
    submitForm(formName) {
      let flag = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          flag = true
        } else {
          // console.log('error submit!!')
          flag = false
        }
      })
      return flag
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    leavexDateChange(e) {
      this.auditData.leavex.startdate = e[0]
      this.auditData.leavex.enddate = e[1]
    },
    durationDateChange(e) {
      if (e === undefined || e === null || e === '') return
      const ar = e.split(':')
      const ar0 = ar[0].substr(0, 1)
      let hh = ar[0]
      if (ar0 == '0') {
        hh = ar[0].substr(1, 1)
      }
      const minute = ar[1] / 60 + ''
      const mm = minute.split('.')[1]
      const mmstr = mm == undefined ? '0' : mm
      const durationStr = hh + '.' + mmstr
      this.auditData.extrawork.duration = durationStr
    },
    submitAudit() {
      console.log(this.auditData, 'this.auditData')
      this.$axios.post('audit/submitAudit', this.auditData).then((e) => {
        if (e.data.error === 1) {
          this.$message({
            type: 'success',
            message: '审批申请提交成功，即将返回！',
          })
          this.resetForm(this.subFormName)
          this.auditData.audtype = ''
          setTimeout(() => {
            this.active = 0
            this.activeName_1 = '' + this.active
          }, 1000)
        } else {
          this.$message({
            type: 'error',
            message: e.data.message,
          })
        }
      })
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
.audit_state {
  width: 100%;
  text-align: left;
  line-height: 1em;
  margin-top: 70px;
}
.audit_state .text_p {
  width: 300px;
  margin: 0 auto;
}
.audit_form_div {
  width: 500px;
  text-align: left;
  margin: 0 auto;
}
</style>