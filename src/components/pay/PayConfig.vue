<!-- 薪资配置 -->
<template>
  <div>
    <div class="header">
      <el-divider>
        <h2>薪资配置</h2>
      </el-divider>
    </div>
    <div class="top">
      <el-button type="primary"
                 @click="addConfigVisible=true"
                 plain>添加配置项
      </el-button>
    </div>

    <div class="add">
      <el-dialog title="添加薪资配置"
                 :visible.sync="addConfigVisible"
                 width="400px"
                 top="8vh"
                 center="">
        <el-form :model="configData"
                 status-icon
                 ref="addDataFrom"
                 :rules="rulesAdd"
                 label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="薪资名称"
                        prop="name">
            <el-input type="text"
                      v-model="configData.name"
                      autocomplete="off"
                      style="width: 225px"
                      prefix-icon="el-icon-star-off"></el-input>
          </el-form-item>
          <el-form-item label="薪资类型"
                        prop="type">
            <el-select v-model="configData.type"
                       placeholder="选择类型">
              <el-option label="增加"
                         value="增加"></el-option>
              <el-option label="减少"
                         value="减少"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计算规则"
                        prop="">
            <el-select v-model="configData.rule"
                       placeholder="选择规则">
              <el-option label="直算"
                         value="直算"></el-option>
              <el-option label="计算"
                         disabled
                         value="计算"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="涉及金额"
                        prop="money">
            <el-input type="text"
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      v-model="configData.money"
                      style="width: 180px"
                      autocomplete="off">
            </el-input> 元
          </el-form-item>
          <el-form-item label="职称匹配"
                        prop="">
            <el-select v-model="configData.jobgradeId"
                       placeholder="选择配置的职称">
              <el-option label="通用"
                         value=""></el-option>
              <el-option v-for="item in jobgrades"
                         :key="item.jobgradeId"
                         :label="item.jobtitle"
                         :value="item.jobgradeId">
              </el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="状态"
                        prop="status">
            <el-tooltip :content="'状态: ' + configStatusText"
                        placement="top">
              <el-switch v-model="configStatusText"
                         active-color="#13ce66"
                         inactive-color="#7c7c7d"
                         @change="configStatusChange()"
                         active-value="启用"
                         inactive-value="停用">
              </el-switch>
            </el-tooltip>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="addConfig('addDataFrom')">添 加</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="up">
      <el-dialog title="修改薪资配置"
                 :visible.sync="upConfigVisible"
                 width="400px"
                 top="8vh"
                 center="">
        <el-form :model="upData"
                 status-icon
                 ref="configDataFrom"
                 :rules="rules"
                 label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="薪资名称"
                        prop="name">
            <el-input type="text"
                      v-model="upData.name"
                      autocomplete="off"
                      style="width: 225px"
                      prefix-icon="el-icon-star-off"></el-input>
          </el-form-item>
          <el-form-item label="薪资类型"
                        prop="">
            <el-select v-model="upData.type"
                       placeholder="选择类型">
              <el-option label="增加"
                         value="增加"></el-option>
              <el-option label="减少"
                         value="减少"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计算规则"
                        prop="">
            <el-select v-model="upData.rule"
                       placeholder="选择规则">
              <el-option label="直算"
                         value="直算"></el-option>
              <el-option label="计算"
                         value="计算"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="涉及金额"
                        prop="money">
            <el-input type="text"
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      v-model="upData.money"
                      style="width: 180px"
                      autocomplete="off">
            </el-input> 元
          </el-form-item>
          <el-form-item label="职称匹配"
                        prop="">
            <el-select v-model="upData.jobgradeId"
                       placeholder="选择配置的职称">
              <el-option label="通用"
                         :value="null"></el-option>
              <el-option v-for="item in jobgrades"
                         :key="item.jobgradeId"
                         :label="item.jobtitle"
                         :value="item.jobgradeId">
              </el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="状态"
                        prop="status">
            <el-tooltip :content="'状态: ' + upStatusText"
                        placement="top">
              <el-switch v-model="upStatusText"
                         active-color="#13ce66"
                         inactive-color="#7c7c7d"
                         @change="upStatusChange()"
                         active-value="启用"
                         inactive-value="停用">
              </el-switch>
            </el-tooltip>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="upConfig('configDataFrom')">修 改
          </el-button>
        </div>
      </el-dialog>
    </div>

    <div class="list">
      <div class="table">
        <el-table :data="configs"
                  border>
          <el-table-column type="index"
                           align="center"
                           label="序号"
                           width="50">
          </el-table-column>
          <el-table-column prop="name"
                           label="薪资名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="type"
                           label="薪资类型"
                           align="center">
          </el-table-column>
          <el-table-column prop="rule"
                           label="计算规则"
                           align="center">
          </el-table-column>
          <el-table-column prop="money"
                           label="涉及金额/元"
                           align="center">
          </el-table-column>
          <el-table-column prop="jobgrade.jobtitle"
                           label="适用职级"
                           align="center">
            <template slot-scope="scope">{{getJobtitle(scope.row)}}</template>
          </el-table-column>
          <el-table-column prop="status"
                           label="状态"
                           align="center">
            <template slot-scope="scope">

              <el-tag type="info"
                      v-if="scope.row.status==0">停用</el-tag>
              <el-tag type="success"
                      v-else>启用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updatetime"
                           label="更新时间"
                           align="center"
                           width="200">
          </el-table-column>
          <el-table-column label="操作"
                           header-align="center"
                           align="center">
            <el-button-group slot-scope="scope">
              <el-tooltip content="修改"
                          placement="top"
                          :open-delay="1000">
                <el-button @click="show(scope.row)"
                           type="primary"
                           size="mini"
                           icon="el-icon-edit"></el-button>
              </el-tooltip>
              <el-tooltip content="删除"
                          placement="top"
                          :open-delay="1000">
                <el-button @click="openDel(scope.row.payconfigId)"
                           type="primary"
                           size="mini"
                           icon="el-icon-delete"></el-button>
              </el-tooltip>
            </el-button-group>
          </el-table-column>
        </el-table>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'PayConfig',
  data() {
    const validateMoney = (rule, value, callback) => {
      value += ''
      if (!value) {
        callback(new Error('涉及金额不能为空'))
      } else if (value.indexOf('.') != -1 && value.split('.').length > 2) {
        callback(new Error('请输入正确格式的金额')) //防止输入多个小数点
      } else if (value.indexOf('.') != -1 && value.split('.')[1].length > 2) {
        callback(new Error('小数点后至多两位有效数字')) //小数点后两位
      } else {
        callback()
      }
    }
    return {
      configs: [],
      addConfigVisible: false,
      upConfigVisible: false,
      configData: {
        name: '',
        type: '',
        rule: '直算',
        money: '',
        status: 1,
        jobgradeId: '',
      },
      upData: {},
      jobgrades: [],
      configStatusText: '启用',
      upStatusText: '',
      rules: {
        money: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            validator: validateMoney,
          },
        ],
      },
      rulesAdd: {
        name: [
          { required: true, message: '薪资名称不能为空', trigger: 'blur' },
          {
            min: 2,
            max: 12,
            message: '名称长度在 2 到 12 个字符',
            trigger: 'blur',
          },
        ],
        type: [{ required: true, message: '请选择薪资类型', trigger: 'blur' }],
        money: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            validator: validateMoney,
          },
        ],
      },
    }
  },
  methods: {
    init() {
      this.getConfigs()
      this.getJobgrades()
    },
    getConfigs() {
      this.$axios.get('/payconfig/list').then((e) => {
        this.configs = e.data.data
      })
    },
    configStatusChange() {
      if (this.configStatusText == '启用') {
        this.configData.status = 1
      }
      if (this.configStatusText == '停用') {
        this.configData.status = 0
      }
    },
    upStatusChange() {
      if (this.upStatusText == '启用') {
        this.upData.status = 1
      }
      if (this.upStatusText == '停用') {
        this.upData.status = 0
      }
    },
    upStatusInit(val) {
      if (val === 1) {
        this.upStatusText = '启用'
      }
      if (val === 0) {
        this.upStatusText = '停用'
      }
    },
    addConfig(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post('/payconfig/addconfig', this.configData)
            .then((e) => {
              if (e.data.data == true) {
                this.$message({
                  type: 'success',
                  message: '添加成功!',
                })
                this.getConfigs()
              } else {
                this.$message({
                  type: 'error',
                  message: '添加失败!',
                })
              }
              this.addConfigVisible = false
            })
        } else {
          //表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    },
    getJobgrades() {
      this.$axios.get('/jobgrade/getjobgradesofit').then((e) => {
        this.jobgrades = e.data.jobgrades
      })
    },
    getJobtitle(e) {
      if (e.jobgradeId === null) return '通用'
      return e.jobgrade.jobtitle
    },
    show(e) {
      this.upData = JSON.parse(JSON.stringify(e))
      this.upStatusInit(e.status)
      this.upConfigVisible = true
    },
    upConfig(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          this.$axios.post('/payconfig/upconfig', this.upData).then((e) => {
            if (e.data.error === 1 && e.data.sign) {
              this.$message({
                type: 'success',
                message: '修改成功!',
              })
              this.getConfigs()
            } else {
              this.$message({
                type: 'error',
                message: e.data.message,
              })
            }
          })
          this.upConfigVisible = false
        } else {
          //表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    },
    del(id) {
      this.$axios.get('/payconfig/remove', { params: { id } }).then((e) => {
        if (e.data.error === 1 && e.data.sign) {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.getConfigs()
        } else {
          this.$message({
            type: 'error',
            message: e.data.message,
          })
        }
      })
    },
    openDel(id) {
      this.$confirm('此操作将永久删除该配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.del(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
  created() {
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
.top {
  text-align: left;
}
.top button {
  margin: 0px 0px 10px 10px;
}
</style>