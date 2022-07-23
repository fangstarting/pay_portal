<!-- demo -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>考勤配置</h2>
      </el-divider>
    </div>
    <div class="content">
      <template>
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="考勤时间配置"
                       class="time_pane"
                       name="first">
            <div>
              <span>上班时间点：</span>
              <el-time-picker v-model="upTime"
                              :disabled="disUpTime"
                              value-format="HH:mm:ss"
                              placeholder="上班时间点">
              </el-time-picker>
              <el-tooltip content="配置"
                          placement="top"
                          effect="light">
                <el-button type="primary"
                           @click="disUpTime=false"
                           icon="el-icon-edit"
                           circle></el-button>
              </el-tooltip>
              <el-tooltip content="保存"
                          placement="top"
                          effect="light">
                <el-button type="success"
                           :disabled="disUpTime"
                           @click="saveTimeConfig(upTime,'disUpTime')"
                           icon="el-icon-check"
                           circle></el-button>
              </el-tooltip>

            </div>
            <div>
              <span>下班时间点：</span>
              <el-time-picker v-model="downTime"
                              :disabled="disDownTime"
                              value-format="HH:mm:ss"
                              placeholder="下班时间点">
              </el-time-picker>
              <el-tooltip content="配置"
                          placement="top"
                          effect="light">
                <el-button type="primary"
                           @click="disDownTime=false"
                           icon="el-icon-edit"
                           circle></el-button>
              </el-tooltip>
              <el-tooltip content="保存"
                          placement="top"
                          effect="light">
                <el-button type="success"
                           :disabled="disDownTime"
                           @click="saveTimeConfig(downTime,'disDownTime')"
                           icon="el-icon-check"
                           circle></el-button>
              </el-tooltip>
            </div>
            <div>
              <span>上班打卡时间范围：</span>
              <el-time-picker is-range
                              v-if="flag1"
                              v-model="upTimeScope"
                              :disabled="disUpTimeScope"
                              range-separator="至"
                              value-format="HH:mm:ss"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
              <el-time-picker is-range
                              v-else
                              v-model="value1"
                              :disabled="disUpTimeScope"
                              range-separator="至"
                              value-format="HH:mm:ss"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
              <el-tooltip content="配置"
                          placement="top"
                          effect="light">
                <el-button type="primary"
                           @click="disUpTimeScope=false"
                           icon="el-icon-edit"
                           circle></el-button>
              </el-tooltip>
              <el-tooltip content="保存"
                          placement="top"
                          effect="light">
                <el-button type="success"
                           :disabled="disUpTimeScope"
                           @click="saveTimeConfig(upTimeScope,'disUpTimeScope')"
                           icon="el-icon-check"
                           circle></el-button>
              </el-tooltip>
            </div>
            <div>
              <span>下班打卡时间范围：</span>
              <el-time-picker is-range
                              v-if="flag2"
                              v-model="downTimeScope"
                              :disabled="disDownTimeScope"
                              range-separator="至"
                              value-format="HH:mm:ss"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
              <el-time-picker is-range
                              v-else
                              v-model="value2"
                              :disabled="disUpTimeScope"
                              range-separator="至"
                              value-format="HH:mm:ss"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
              <el-tooltip content="配置"
                          placement="top"
                          effect="light">
                <el-button type="primary"
                           @click="disDownTimeScope=false"
                           icon="el-icon-edit"
                           circle></el-button>
              </el-tooltip>
              <el-tooltip content="保存"
                          placement="top"
                          effect="light">
                <el-button type="success"
                           :disabled="disDownTimeScope"
                           @click="saveTimeConfig(downTimeScope,'disDownTimeScope')"
                           icon="el-icon-check"
                           circle></el-button>
              </el-tooltip>
            </div>
          </el-tab-pane>
          <el-tab-pane label="缺勤类型配置"
                       name="second">
            <div>
              <div class="top">
                <el-button type="primary"
                           @click="addVisible=true"
                           plain
                           style="margin: 5px 0px 10px 50px;">添加缺勤类型</el-button>

              </div>
              <div>
                <el-dialog title="添加缺勤类型"
                           :visible.sync="addVisible"
                           width="500px"
                           top="8vh"
                           center="">
                  <el-form :model="addTypeData"
                           status-icon
                           ref="addTypeDataFrom"
                           :rules="rules"
                           label-width="80px"
                           class="demo-ruleForm">
                    <el-form-item label="类型名称"
                                  prop="name">
                      <el-input type="text"
                                v-model="addTypeData.name"
                                maxlength="8"
                                autocomplete="off"
                                clearable
                                prefix-icon="el-icon-star-off"
                                style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item label="描述信息"
                                  prop="notes">
                      <el-input type="textarea"
                                :autosize="{ minRows: 4, maxRows: 6}"
                                placeholder="请输入内容"
                                v-model="addTypeData.notes"
                                autocomplete="off"></el-input>
                    </el-form-item>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="类型状态"
                                      prop="status">
                          <el-tooltip :content="'状态: ' + statusText"
                                      placement="top">
                            <el-switch v-model="statusText"
                                       active-color="#13ce66"
                                       inactive-color="#7c7c7d"
                                       @change="statusChange()"
                                       active-value="启用"
                                       inactive-value="禁用">
                            </el-switch>
                          </el-tooltip>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                  <div slot="footer"
                       class="dialog-footer">
                    <el-button type="primary"
                               @click="resetForm('addTypeDataFrom')">重 置</el-button>
                    <el-button type="primary"
                               @click="add('addTypeDataFrom')">添 加</el-button>
                  </div>
                </el-dialog>
              </div>
              <div>
                <el-dialog title="修改缺勤类型"
                           :visible.sync="upVisible"
                           width="500px"
                           top="8vh"
                           center="">
                  <el-form :model="upTypeData"
                           status-icon
                           ref="upTypeDataFrom"
                           :rules="rules"
                           label-width="80px"
                           class="demo-ruleForm">
                    <el-form-item label="类型名称"
                                  prop="name">
                      <el-input type="text"
                                v-model="upTypeData.name"
                                maxlength="8"
                                autocomplete="off"
                                clearable
                                prefix-icon="el-icon-star-off"
                                style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item label="描述信息"
                                  prop="notes">
                      <el-input type="textarea"
                                :autosize="{ minRows: 4, maxRows: 6}"
                                placeholder="请输入内容"
                                v-model="upTypeData.notes"
                                autocomplete="off"></el-input>
                    </el-form-item>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="类型状态"
                                      prop="status">
                          <el-tooltip :content="'状态: ' + statusText1"
                                      placement="top">
                            <el-switch v-model="statusText1"
                                       active-color="#13ce66"
                                       inactive-color="#7c7c7d"
                                       @change="statusChange1()"
                                       active-value="启用"
                                       inactive-value="禁用">
                            </el-switch>
                          </el-tooltip>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                  <div slot="footer"
                       class="dialog-footer">
                    <el-button type="primary"
                               @click="resetForm('upTypeDataFrom')">重 置</el-button>
                    <el-button type="primary"
                               @click="up('upTypeDataFrom')">修 改</el-button>
                  </div>
                </el-dialog>
              </div>
              <div class="table">
                <el-table :data="dataList"
                          border>
                  <el-table-column type="index"
                                   align="center"
                                   label="序号"
                                   width="50">
                  </el-table-column>
                  <el-table-column prop="name"
                                   label="类型名称"
                                   align="center"
                                   width="">
                  </el-table-column>
                  <el-table-column prop="notes"
                                   label="描述信息"
                                   align="center"
                                   width="">
                  </el-table-column>
                  <el-table-column prop="status"
                                   label="状态"
                                   align="center"
                                   width="">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status==0">
                        <el-tag type="info">禁用</el-tag>
                      </span>
                      <span v-if="scope.row.status==1">
                        <el-tag type="success">启用</el-tag>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="updatetime"
                                   label="更新时间"
                                   align="center"
                                   width="">
                  </el-table-column>
                  <el-table-column label="操作"
                                   header-align="center"
                                   align="center"
                                   width="">
                    <el-button-group slot-scope="scope">
                      <el-tooltip content="修改"
                                  placement="top"
                                  :open-delay="1000">
                        <el-button @click="show(scope.row)"
                                   type="primary"
                                   size="mini"
                                   icon="el-icon-view"></el-button>
                      </el-tooltip>
                      <el-tooltip content="删除"
                                  placement="top"
                                  :open-delay="1000">
                        <el-button @click="remove(scope.row.abtypeId)"
                                   type="primary"
                                   size="mini"
                                   icon="el-icon-delete"></el-button>
                      </el-tooltip>
                    </el-button-group>
                  </el-table-column>
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
  name: 'PayCheckConfig',
  data() {
    return {
      activeName: 'first',
      upTime: '',
      disUpTime: true,
      downTime: '',
      disDownTime: true,
      upTimeScope: [],
      disUpTimeScope: true,
      downTimeScope: [],
      disDownTimeScope: true,
      dataList: [],
      addVisible: false,
      value1: ['00:00:00', '23:59:59'],
      value2: ['00:00:00', '23:59:59'],
      flag1: false,
      flag2: false,
      addTypeData: {
        name: '',
        notes: '',
        status: 1,
      },
      statusText: '启用',
      rules: {
        name: [{ required: true, message: '类型名不能为空', trigger: 'blur' }],
        notes: [
          { required: true, message: '描述信息不能为空', trigger: 'blur' },
        ],
      },
      upTypeData: {},
      upVisible: false,
      statusText1: '启用',
      rowData: {}, //引用地址
    }
  },
  methods: {
    init() {
      this.getAbtypeList()
      this.getTimeConfigs()
    },
    getAbtypeList() {
      this.$axios.get('abtype/listall').then((e) => {
        if (e.data.error === 1) {
          this.dataList = e.data.data
        }
      })
    },
    getTimeConfigs() {
      this.$axios.get('sysConfigs/timeConfigs').then((e) => {
        const list = e.data.data
        list.forEach((item) => {
          if (item.sysKey === 'work_up_time') this.upTime = item.sysValueString
          else if (item.sysKey === 'work_down_time')
            this.downTime = item.sysValueString
          else if (item.sysKey === 'work_up_start')
            this.upTimeScope[0] = item.sysValueString
          else if (item.sysKey === 'work_up_end')
            this.upTimeScope[1] = item.sysValueString
          else if (item.sysKey === 'work_down_start')
            this.downTimeScope[0] = item.sysValueString
          else if (item.sysKey === 'work_down_end')
            this.downTimeScope[1] = item.sysValueString
        })
        if (this.upTimeScope.length == 2) this.flag1 = true
        if (this.downTimeScope.length == 2) this.flag2 = true
      })
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    saveTimeConfig(date, disName) {
      if (date === null || date === undefined || date === '') {
        this.$notify({
          title: '警告',
          message: '数据不能为空！',
          type: 'warning',
        })
        return
      }
      if (disName === 'disUpTime') {
        this.disUpTime = true
        this.updateConfigTime('work_up_time', date)
      } else if (disName === 'disDownTime') {
        this.disDownTime = true
        this.updateConfigTime('work_down_time', date)
      } else if (disName === 'disUpTimeScope') {
        this.disUpTimeScope = true
        this.updateConfigTime('work_up_start', date[0])
        this.updateConfigTime('work_up_end', date[1])
      } else if (disName === 'disDownTimeScope') {
        this.disDownTimeScope = true
        this.updateConfigTime('work_down_start', date[0])
        this.updateConfigTime('work_down_end', date[1])
      }
    },
    updateConfigTime(key, value) {
      this.$axios
        .post('sysConfigs/update', {
          sysKey: key,
          sysValueString: value,
        })
        .then((e) => {
          if (e.data.error === 1) {
            this.$notify({
              title: '成功',
              message: '更新当前配置项成功',
              type: 'success',
            })
          } else {
            this.$notify({
              title: '警告',
              message: e.data.message,
              type: 'warning',
            })
          }
        })
    },
    show(e) {
      this.rowData = e
      this.upTypeData = JSON.parse(JSON.stringify(e))
      this.initStatus()
      this.upVisible = true
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post('abtype/add', this.addTypeData)
            .then((e) => {
              if (e.data.error === 1) {
                this.$message({
                  type: 'success',
                  message: '添加成功！',
                })
                this.resetForm(formName)
                this.getAbtypeList()
                this.addVisible = false
              } else {
                this.$message({
                  type: 'error',
                  message: e.data.message,
                })
              }
            })
            .catch()
        } else {
          //表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    },
    up(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post('abtype/update', this.upTypeData)
            .then((e) => {
              if (e.data.error === 1) {
                this.$message({
                  type: 'success',
                  message: '修改成功！',
                })
                // this.getAbtypeList()
                this.upRowData()
                this.upVisible = false
              } else {
                this.$message({
                  type: 'error',
                  message: e.data.message,
                })
              }
            })
            .catch()
        } else {
          //表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    },
    remove(id) {
      console.log(id)
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    statusChange() {
      if (this.statusText == '启用') {
        this.addTypeData.status = 1
      }
      if (this.statusText == '禁用') {
        this.addTypeData.status = 0
      }
    },
    statusChange1() {
      if (this.statusText1 == '启用') {
        this.upTypeData.status = 1
      }
      if (this.statusText1 == '禁用') {
        this.upTypeData.status = 0
      }
    },
    initStatus() {
      if (this.upTypeData.status === 1) {
        this.statusText1 = '启用'
      }
      if (this.upTypeData.status === 0) {
        this.statusText1 = '禁用'
      }
    },
    //数据修改成功，更新表格数据
    upRowData() {
      //遍历赋值给row当前行数据，可以避免一次请求。赋值对象会改变引用地址，导致表格数据无法同步，因此使用遍历赋值；
      for (let key in this.rowData) {
        // console.log(this.upTypeData[key])
        if (this.upTypeData[key] != null) {
          this.rowData[key] = this.upTypeData[key]
        }
      }
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
.content {
  text-align: left;
  padding: 20;
  width: 100%;
  height: 100%;
  /* border: 1px #333 dashed; */
}
.time_pane {
  padding: 20px 20px;
}
.time_pane > div {
  margin: 20px 0;
}
</style>